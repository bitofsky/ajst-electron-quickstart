"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
const sourceMonitor_1 = require("./sourceMonitor");
const isDev = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);
let win;
/**
 * Create Electron Main Window
 */
exports.createWindow = () => {
    if (win)
        return;
    // Create the renderer window.
    win = new electron_1.BrowserWindow({ width: 1400, height: 800, frame: false, minWidth: 400 });
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
const setWindowTop = (win) => {
    if (win.isFocused())
        return;
    win.focus();
    win.setAlwaysOnTop(true);
    win.setAlwaysOnTop(false);
    win.blur();
};
const isDevInit = (win) => {
    sourceMonitor_1.watch(() => __awaiter(this, void 0, void 0, function* () {
        yield win.webContents.reloadIgnoringCache();
        console.log('Electron win.webContents.reload()');
        setWindowTop(win);
    }));
    // win.webContents.openDevTools();
};
//# sourceMappingURL=createWindow.js.map