import { app, BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

// Supress warning
// https://github.com/electron/electron/issues/18397
app.allowRendererProcessReuse = false;

const isDev = process.env.NODE_ENV === 'development';

let mainWindow: Electron.BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile('html/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
};

app.whenReady().then(() => {
  if (isDev) {
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    Promise.all([
      installExtension(REACT_DEVELOPER_TOOLS, forceDownload),
      installExtension(REDUX_DEVTOOLS, forceDownload),
    ])
      .finally(() => {
        createWindow();
      })
      .catch(console.error);
  } else {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
