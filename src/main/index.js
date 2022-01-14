import { ipcMain } from "electron";

ipcMain.on("changeWindowSize", (event, arg) => {
    mainWindow && mainWindow.setSize(arg.width, arg.height);
    // mainWindow为主进程new的BrowserWindow实例
});