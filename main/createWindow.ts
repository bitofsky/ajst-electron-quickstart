import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { watch } from './sourceMonitor';

const isDev = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);

let win: Electron.BrowserWindow | null;

/**
 * Create Electron Main Window
 */
export const createWindow = () => {

    if (win) return;

    // Create the renderer window.
    win = new BrowserWindow({ width: 1400, height: 800, frame: false, minWidth: 400 });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../renderer/tpl/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });

    isDev && isDevInit(win);

    const { session } = require('electron');
};

const setWindowTop = (win: Electron.BrowserWindow) => {
    if (win.isFocused()) return;
    win.focus();
    win.setAlwaysOnTop(true);
    win.setAlwaysOnTop(false);
    win.blur();
};

const isDevInit = (win: Electron.BrowserWindow) => {
    watch(async () => {
        await win.webContents.reloadIgnoringCache();
        console.log('Electron win.webContents.reload()');
        setWindowTop(win);
    });
    // win.webContents.openDevTools();
};
