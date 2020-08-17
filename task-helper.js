import fs from 'fs';
import path from 'path';
import hbs from 'handlebars';
import mkdirp from 'mkdirp';
import del from 'del';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import pkg from './package.json';

const tasks = new Map(); // The collection of automation tasks ('clean', 'build', 'publish', etc.)
const webpackStatsConfig = {
  chunks: false, // Makes the build much quieter
  colors: true, // Shows colors in the console
};

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
        (err) => console.error(err.stack),
      );
  } else {
    console.log(`No available task for "${task}"`);
  }
}

// Clean up the "src/dist" directory
// -----------------------------------------------------------------------------
tasks.set('clean-dist', () =>
  del(
    [
      'src/dist/**',
      '!src/dist',
      '!src/dist/dll',
      '!src/dist/dll/renderer.dev.dll.js',
      '!src/dist/dll/renderer.json',
    ],
    { dot: true },
  ),
);

// Clean up the "release" directory
// -----------------------------------------------------------------------------
tasks.set('clean-release', () => del(['release/**'], { dot: true }));

// Generate html from handlebars template
// -----------------------------------------------------------------------------
tasks.set('generate-html', () => {
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
    mkdirp(path.dirname(targetPath)).then((made) => {
      console.log(`"${targetPath}" created.`);
      fs.writeFile(targetPath, contents, cb);
    });
  }

  return new Promise((resolve, reject) => {
    readFiles(
      path.normalize(`${__dirname}/src/hbs/`),
      function (filename, content) {
        const filenameNoExt = filename.split('.').slice(0, -1).join('.');
        const template = hbs.compile(content);
        const html = template({
          pkg,
        });
        const target = path.join(__dirname, 'src', 'dist', 'html', `${filenameNoExt}.html`);
        writeFile(target, html, resolve);
      },
      function (err) {
        reject(err);
      },
    );
  });
});

// Bundle dll with Webpack
// -----------------------------------------------------------------------------
tasks.set('build-dll', () => {
  const config = require('./webpack.config.renderer.dev.dll').default;
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackStatsConfig));
        resolve();
      }
    });
  });
});

// Build main electron file for development
// -----------------------------------------------------------------------------
tasks.set('build-main-dev', () => {
  const config = require('./webpack.config.main.dev').default;
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackStatsConfig));
        resolve();
      }
    });
  });
});

// Start develop
// -----------------------------------------------------------------------------
tasks.set('dev-renderer', async () => {
  return new Promise((resolve, reject) => {
    const config = require('./webpack.config.renderer.dev').default;
    const port = process.env.PORT || 4040;
    const publicPath = `http://localhost:${port}`;
    const distDir = path.join(__dirname, 'src', 'dist');

    const server = new WebpackDevServer(webpack(config), {
      publicPath,
      compress: true,
      inline: true,
      lazy: false,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
      contentBase: distDir,
      historyApiFallback: {
        verbose: true,
        disableDotRule: false,
      },
      after() {
        // Start electron main process...
      },
    });

    server.listen(port, 'localhost', function (err) {
      if (err) {
        throw new Error(err);
      }
    });
  });
});

tasks.set('dev', async () => {
  return Promise.resolve()
    .then(() => run('clean-dist'))
    .then(() => run('generate-html'))
    .then(() => run('build-main-dev'))
    .then(() => run('dev-renderer'));
});

// Start build
// -----------------------------------------------------------------------------
tasks.set('build', async () => {
  return Promise.resolve()
    .then(() => run('generate-html'))
    .then(
      () =>
        new Promise((resolve, reject) => {
          const config = require('./webpack.config.main.prod').default;
          webpack(config).run((err, stats) => {
            if (err) {
              reject(err);
            } else {
              console.log(stats.toString(webpackStatsConfig));
              resolve();
            }
          });
        }),
    );
});

// Execute the specified task or default one. E.g.: node task-helper build
run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : undefined);
