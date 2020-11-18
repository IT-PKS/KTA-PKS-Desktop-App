/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const del = require('del');
const fs = require('fs');
const mkdirp = require('mkdirp');
const {
  spawn
} = require('child_process');

const port = process.env.PORT || 8080;
const distDir = path.normalize(`${__dirname}/app/dist`);
const dllDir = path.join(distDir, 'dll');
const dllManifest = path.resolve(dllDir, 'renderer.json');
const tasks = new Map(); // The collection of automation tasks ('clean', 'build', 'publish', etc.)

function run(task) {
  const taskFn = tasks.get(task);
  if (taskFn) {
    const start = new Date();
    console.log(`Starting ${task}...`);
    return Promise.resolve()
      .then(() => taskFn())
      .then(
        () => {
          console.log(
            `${'\x1b[36m'}Finished ${task} after ${
              new Date().getTime() - start.getTime()
            }ms${'\x1b[0m'}`,
          );
          return false;
        },
        err => console.error(err.stack),
      );
  } else {
    console.log(`No available task for "${task}"`);
  }
}

// Clean up the "app/dist" directory
// -----------------------------------------------------------------------------
tasks.set('clean-dist', () =>
  del(
    [
      'app/dist/**',
      '!app/dist',
      '!app/dist/dll',
      '!app/dist/dll/renderer.dev.dll.js',
      '!app/dist/dll/renderer.json',
    ], {
      dot: true
    },
  ),
);

// Clean up the "release" directory
// -----------------------------------------------------------------------------
tasks.set('clean-release', () =>
  del(['release/**', '!release', '!release/.gitkeep'], {
    dot: true
  }),
);

// Copy html files from "app/html" to "app/dist/html"
// -----------------------------------------------------------------------------
tasks.set('cp-html-to-dist', () => {
  function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (readdirErr, filenames) {
      if (readdirErr) {
        onError(readdirErr);
        return;
      }
      filenames.forEach(function (filename) {
        fs.readFile(dirname + filename, 'utf-8', (readFileErr, content) => {
          if (readFileErr) {
            onError(readFileErr);
            return;
          }
          onFileContent(filename, content);
        });
      });
    });
  }

  function writeFile(targetPath, contents, cb = () => {}) {
    mkdirp(path.dirname(targetPath)).then(made => {
      console.log(`"${targetPath}" created.`);
      fs.writeFile(targetPath, contents, cb);
    });
  }

  return new Promise((resolve, reject) => {
    readFiles(
      path.normalize(`${__dirname}/app/html/`),
      function (filename, content) {
        const target = path.normalize(`${__dirname}/app/dist/html/${filename}`);
        writeFile(target, content, resolve);
      },
      function (err) {
        reject(err);
      },
    );
  });
});

// Start dev server
// -----------------------------------------------------------------------------
tasks.set('dev-server', async () => {
  return new Promise((resolve, reject) => {
    const config = require('./webpack.config.renderer');
    const server = new WebpackDevServer(webpack(config), {
      port,
      hot: true,
      after() {
        // Start electron main process...
        spawn('electron --inspect=5858', [path.normalize(`${__dirname}/app/dist/main.js`)], {
            shell: true,
            env: process.env,
            stdio: 'inherit',
          })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      },
    });

    server.listen(port, 'localhost', function (err) {
      if (err) {
        throw new Error(err);
      }
    });
  });
});

// Build electron main file
// -----------------------------------------------------------------------------
tasks.set('build-main', () => {
  const config = require('./webpack.config.main');
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(
          stats.toString({
            colors: true,
          }),
        );
        resolve();
      }
    });
  });
});

// Bundle renderer dll
// -----------------------------------------------------------------------------
tasks.set('build-renderer-dll', () => {
  const config = require('./webpack.config.renderer.dll');
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(
          stats.toString({
            colors: true,
          }),
        );
        resolve();
      }
    });
  });
});

// Bundle electron renderer file
// -----------------------------------------------------------------------------
tasks.set('build-renderer', () => {
  const config = require('./webpack.config.renderer');
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(
          stats.toString({
            colors: true,
          }),
        );
        resolve();
      }
    });
  });
});

// Run AFTER the package is installed
// -----------------------------------------------------------------------------
tasks.set('postinstall', async () => {
  return Promise.resolve()
    .then(() => run('build-renderer-dll'))
    .then(() => {
      return new Promise((resolve, reject) => {
        spawn('electron-builder', ['install-app-deps'], {
            shell: true,
            env: process.env,
            stdio: 'inherit',
          })
          .on('close', code => {
            resolve();
            process.exit(code);
          })
          .on('error', spawnError => {
            reject(spawnError);
            console.error(spawnError);
          });
      });
    });
});

// Development task sequence
// -----------------------------------------------------------------------------
tasks.set('dev', async () => {
  return Promise.resolve()
    .then(async () => {
      /**
       * Warn if the DLL is not built
       */
      if (!(fs.existsSync(dllDir) && fs.existsSync(dllManifest))) {
        process.stdout.write('The DLL files are missing. Sit back while we build them for you..\n');
        return Promise.resolve()
          .then(() => run('build-renderer-dll'))
          .then(() => run('clean-dist'));
      } else {
        return run('clean-dist');
      }
    })
    .then(() => run('cp-html-to-dist'))
    .then(() => run('build-main'))
    .then(() => run('dev-server'));
});

// Production task sequence
// -----------------------------------------------------------------------------
tasks.set('build-win', async () => {
  return Promise.resolve()
    .then(async () => {
      /**
       * Warn if the DLL is not built
       */
      if (!(fs.existsSync(dllDir) && fs.existsSync(dllManifest))) {
        process.stdout.write('The DLL files are missing. Sit back while we build them for you..\n');
        return Promise.resolve()
          .then(() => run('build-renderer-dll'))
          .then(() => run('clean-dist'));
      } else {
        return run('clean-dist');
      }
    })
    .then(() => run('cp-html-to-dist'))
    .then(() => run('build-main'))
    .then(() => run('build-renderer'))
    .then(() => {
      return new Promise((resolve, reject) => {
        spawn('electron-builder', ['--win'], {
            shell: true,
            env: process.env,
            stdio: 'inherit',
          })
          .on('close', code => {
            resolve();
            process.exit(code);
          })
          .on('error', spawnError => {
            reject(spawnError);
            console.error(spawnError);
          });
      });
    });
});

tasks.set('build-mac', async () => {
  return Promise.resolve()
    .then(async () => {
      /**
       * Warn if the DLL is not built
       */
      if (!(fs.existsSync(dllDir) && fs.existsSync(dllManifest))) {
        process.stdout.write('The DLL files are missing. Sit back while we build them for you..\n');
        return Promise.resolve()
          .then(() => run('build-renderer-dll'))
          .then(() => run('clean-dist'));
      } else {
        return run('clean-dist');
      }
    })
    .then(() => run('cp-html-to-dist'))
    .then(() => run('build-main'))
    .then(() => run('build-renderer'))
    .then(() => {
      return new Promise((resolve, reject) => {
        spawn('electron-builder', ['--mac'], {
            shell: true,
            env: process.env,
            stdio: 'inherit',
          })
          .on('close', code => {
            resolve();
            process.exit(code);
          })
          .on('error', spawnError => {
            reject(spawnError);
            console.error(spawnError);
          });
      });
    });
});

// Execute the specified task or default one. E.g.: node task-helper build
run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : undefined);