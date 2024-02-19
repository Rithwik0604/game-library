let settingsFlag = true;

function toggleSettings() {
    // console.log("settings clicked");
    if (settingsFlag) {
        document.getElementById("settingsList").style.display = "unset";
        // let color = JSON.parse(localStorage.getItem("customTheme"))['buttonBackground'];
        document.getElementById("settingsIcon").style.backgroundColor =
            "var(--buttonBackground)";
        document.getElementById("settingsIcon").style.filter = "invert(0)";
        console.log("set it to active");
        settingsFlag = false;
    } else {
        // console.log(
        //     String(document.getElementById("settingsList").style.display)
        // );
        if (document.getElementById("settingsList").style.display === "none") {
            document.getElementById("settingsList").style.display = "unset";
            document.getElementById("settingsIcon").style.backgroundColor =
                "transparent";
            document.getElementById("settingsIcon").style.filter = "invert(1)";
        } else {
            document.getElementById("settingsList").style.display = "none";
            document.getElementById("settingsIcon").style.backgroundColor =
                "transparent";
                document.getElementById("settingsIcon").style.filter = "invert(1)";

        }
    }
}

document.body.addEventListener("click", (e) => {
    if (document.getElementById("settingsList").style.display === "unset") {
        if (
            e.target.closest("#aside") ||
            e.target.closest("#main") ||
            e.target.closest(".settingsItem")
        ) {
            // console.log("closing settings");
            document.getElementById("settingsList").style.display = "none";
            document.getElementById("settingsIcon").style.backgroundColor =
                "transparent";
        }
    }
});

const theme = localStorage.getItem("theme");
if (theme === null) {
    // console.info("Theme was null. Now Dark");
    localStorage.setItem("theme", "dark");
}

if (localStorage.getItem("theme") === "dark") {
    document.getElementById("themeIcon").innerText = "dark_mode";
    document.getElementById("body").className = "";
} else {
    document.getElementById("themeIcon").innerText = "light_mode";
    document.getElementById("body").className = "lightMode";
}

function toggleTheme() {
    // console.log("Changing Theme");
    body = document.getElementById("body").className;
    // console.log(body);
    if (body == "") {
        document.getElementById("body").className = "lightMode";
        localStorage.setItem("theme", "light");
        document.getElementById("themeIcon").innerText = "light_mode";

        // setTimeout(toggleSettings, 700);
    } else {
        document.getElementById("body").className = "";
        localStorage.setItem("theme", "dark");
        document.getElementById("themeIcon").innerText = "dark_mode";

        // setTimeout(toggleSettings, 700);
    }
}
