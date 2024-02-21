const { call } = window.electronAPI;
addEventListener("DOMContentLoaded", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.className = "";
    } else {
        document.body.className = "lightMode";
    }

    let storageColours = localStorage.getItem("customTheme");
    console.log(storageColours);
    if (storageColours !== null) {
        let colours = JSON.parse(storageColours);
        console.log(colours);

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

function gameButtonClick(buttonID) {
    buttons = ["steam", "epic", "xbox", "ea", "ubisoft"];
    document.getElementById(buttonID).className = "gameButton active";
    for (let index = 0; index < buttons.length; index++) {
        if (buttons[index] != buttonID) {
            document.getElementById(buttons[index]).className = "gameButton";
            document.getElementById("main" + buttons[index]).className =
                "mainPages";
        }
    }

    document.getElementById(`main${buttonID}`).className = "mainPages visible";
}

async function steamLink() {
    const steamIDValue = document.getElementById("steamID").value;
    if (steamIDValue === "") {
        alert(
            "Can't submit blank. If you want to back you, just close the window"
        );
        return;
    }
    localStorage.setItem("accountLinked", "1");
    localStorage.setItem("steamAccount", "1");
    localStorage.setItem("steamID", steamIDValue);
    await window.alert(
        "This window will close now. If you need to re-link, just come back here."
    );
    // Check if ipcRenderer is available

    window.electronAPI.call("steamAccount", {
        steamID: steamIDValue,
    });
}
