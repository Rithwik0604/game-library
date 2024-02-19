const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");
const { startPythonProcess } = require("./scripts/ipc");

let mainWindow;
let accountWindow;

let deviceWidth;
let deviceHeight;

async function createWindow(width, height) {
    // const reso = await startPythonProcess({ message: "resolution" });

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 500,
        webPreferences: {
            nodeIntegration: false, // Disable Node.js integration
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
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

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on("ready", (e) => {
        mainWindow.on("close", (event) => {
            if (!accountWindow.isDestroyed()) {
                event.preventDefault();
            }
        });
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("accountsPage", async (event, args) => {
    // const resolution = await startPythonProcess({ message: "smallResolution" });
    let windowWidth = parseInt(deviceWidth * 0.4);
    let windowHeight = parseInt(deviceHeight * 0.35);

    accountWindow = await new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        modal: true,
        parent: mainWindow,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });
    accountWindow.loadFile("./html/accounts.html");
});

ipcMain.on("steamAccount", async (event, info) => {
    if (accountWindow) {
        accountWindow.close();
    }

    info["message"] = "steam";
    const data = await startPythonProcess(info);

    mainWindow.webContents.send("steamData-response", data);
});

ipcMain.on("customThemeWindow", async (event, info) => {
    let windowWidth = parseInt(deviceWidth * 0.35);
    let windowHeight = parseInt(deviceHeight * 0.50);

    customThemeWindow = await new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        modal: true,
        parent: mainWindow,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    customThemeWindow.loadFile("./html/customTheme.html");
});
