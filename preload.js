const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
    call: (message, data) => ipcRenderer.invoke(message, data),
    on: (message, data) => ipcRenderer.on(message, data),
});
