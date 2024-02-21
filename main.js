const { app, BrowserWindow, ipcMain, screen, Menu } = require("electron");
const path = require("path");
const { startPythonProcess } = require("./scripts/ipc");
const { send } = require("process");

let mainWindow = BrowserWindow;
let accountWindow;

let deviceWidth;
let deviceHeight;

let webPreferences = {
    contextIsolation: true,
    preload: path.join(__dirname, "preload.js"),
    devTools: true,
};

let menuTemplate = [
    {
        label: "Reset",
        submenu: [
            { label: "Reset Theme", click: resetTheme },
            { label: "Reset Accounts", click: resetAccounts },
            { label: " ☠️ Hard Reset ☠️ ", click: hardReset },
            { role: "undo", visible: false },
            { role: "redo", visible: false },
            { role: "copy", visible: false },
            { role: "paste", visible: false },
            { role: "cut", visible: false },
        ],
    },
    {
        label: "Dev",
        submenu: [
            { role: "reload" }, // Standard "Reload" option
            { role: "forceReload" }, // Standard "Force Reload" option
            { role: "toggleDevTools" }, // Standard "Toggle Developer Tools" option
        ],
    },
];

function hardReset() {
    mainWindow.webContents.send("hard-reset");
}

function resetTheme() {
    mainWindow.webContents.send("changeMainPageTheme", { reset: true });
}

ipcMain.handle("restart-reply", (event, args) => {
    // Once the reply is received, relaunch the app and then quit
    app.relaunch();
    app.quit();
});

function resetAccounts() {
    // Send the resetAccounts signal to the renderer process
    mainWindow.webContents.send("resetAccounts");
}

async function createWindow(width, height) {
    // const reso = await startPythonProcess({ message: "resolution" });

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 500,
        webPreferences: webPreferences,
    });

    // Load the window with additional data if needed
    // module.exports = { width: width, height: height };
    mainWindow.loadFile("./html/index.html");
}

app.whenReady().then(() => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const resolution = primaryDisplay.workAreaSize;

    deviceWidth = resolution["width"];
    deviceHeight = resolution["height"];

    let windowWidth = parseInt(deviceWidth * 0.65);
    let windowHeight = parseInt(deviceHeight * 0.65);

    createWindow(windowWidth, windowHeight);
    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on("ready", (e) => {});
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.handle("accountsPage", async (event, args) => {
    // const resolution = await startPythonProcess({ message: "smallResolution" });
    console.log("Accounts Page ipc");
    let windowWidth = parseInt(deviceWidth * 0.4);
    let windowHeight = parseInt(deviceHeight * 0.4);

    accountWindow = await new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        modal: true,
        parent: mainWindow,
        autoHideMenuBar: true,
        webPreferences: webPreferences,
    });
    accountWindow.loadFile("./html/accounts.html");
});

ipcMain.handle("customThemeWindow", async (event, info) => {
    let windowWidth = parseInt(deviceWidth * 0.35);
    let windowHeight = parseInt(deviceHeight * 0.5);

    customThemeWindow = await new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        modal: true,
        parent: mainWindow,
        autoHideMenuBar: true,
        webPreferences: webPreferences,
    });

    customThemeWindow.loadFile("./html/customTheme.html");
});

ipcMain.handle("changeCustomTheme", async (event) => {
    console.log("got signal change theme");
    mainWindow.webContents.send("changeMainPageTheme", { reset: false });
});

ipcMain.handle("test", (event, args) => {
    console.log("Test working!");
    console.log(args);
    // mainWindow.webContents.send("test back", { say: "this" });
});

// ipcMain.handle("show-loader", () => {
//     mainWindow.webContents.send("show-loader");
// });

ipcMain.handle("steamAccount", async (event, args) => {
    console.log("Reached SteamAccount ipc");
    if (accountWindow && !accountWindow.isDestroyed()) {
        accountWindow.close();
    }

    args["message"] = "steam";
    const data = await startPythonProcess(args);
    mainWindow.webContents.send("steamData-response", data);
});
