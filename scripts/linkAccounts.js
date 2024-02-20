// const {ipcRenderer} = window.electron

function linkAccount() {
    ipcRenderer.send("accountsPage");
}