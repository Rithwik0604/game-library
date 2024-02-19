// const {ipcRenderer} = window.electron

function linkAccount() {
    ipcRenderer.send("accountsPage");
}

ipcRenderer.on("getTheme", () => {
    ipcRenderer.send(2, "giveTheme", localStorage.getItem("theme"));
});
