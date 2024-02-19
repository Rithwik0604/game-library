function ipcSend(request) {
    const { ipcRenderer } = window.electron;
    ipcRenderer.send(request);
}

function openCustomTheme() {
    ipcSend("customThemeWindow");
}

addEventListener("DOMContentLoaded", (e) => {
    let colours = JSON.parse(localStorage.getItem("customTheme"));
    if (colours !== null) {
        let root = document.documentElement;
        root.style.setProperty("--background", colours["background"]);
        root.style.setProperty("--foreground", colours["foreground"]);
        root.style.setProperty("--leftSide", colours["leftSide"]);
        root.style.setProperty(
            "--buttonBackground",
            colours["buttonBackground"]
        );
        root.style.setProperty(
            "--scrollbarBackground",
            colours["scrollbarBackground"]
        );
        root.style.setProperty("--scrollbarThumb", colours["scrollbarThumb"]);
        root.style.setProperty(
            "--scrollbarThumbActive",
            colours["scrollbarThumbActive"]
        );
    }
});
