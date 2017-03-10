import { app } from 'electron';
import { createWindow } from './electron/createWindow';

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('ready', createWindow);
app.on('activate', createWindow);
