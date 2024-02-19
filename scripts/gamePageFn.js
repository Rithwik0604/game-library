function removePlaceHolders() {
    if (localStorage.getItem("accountLinked") === "1") {
        const all = document.getElementById("allPlaceholder");
        if (all) {
            all.remove();
        }
    }

    if (localStorage.getItem("steamAccount") === "1") {
        const steam = document.getElementById("steamPlaceholder");
        if (steam) {
            steam.remove();
        }
    }

    if (localStorage.getItem("epicAccount") === "1") {
        const epic = document.getElementById("epicPlaceholder");
        if (epic) {
            epic.remove();
        }
    }

    if (localStorage.getItem("xboxAccount") === "1") {
        const xbox = document.getElementById("xboxPlaceholder");
        if (xbox) {
            xbox.remove();
        }
    }

    if (localStorage.getItem("eaAccount") === "1") {
        const ea = document.getElementById("eaPlaceholder");
        if (ea) {
            ea.remove();
        }
    }

    if (localStorage.getItem("ubisoftAccount") === "1") {
        const ubisoft = document.getElementById("ubisoftPlaceholder");
        if (ubisoft) {
            ubisoft.remove();
        }
    }
}

function steamLoader(steam, searching, searchText, installed) {
    if (steam.length <= 0) {
        return;
    }

    document.getElementById(`${launcher}GameWidgetsContainer`).innerHTML = "";

    console.log(launcher);
    for (let game in steam) {
        let widgetWrapper = document.createElement("div");
        widgetWrapper.setAttribute("class", "widgetWrapper");

        let widget = document.createElement("div");
        widget.setAttribute("class", "widget");
        // console.log(searching);

        console.log("reached installed", installed);
        if (installed) {
            console.log("went into installed");
            // console.log('')
            if (steam[game]["installed"] === "false") {
                console.log(steam[game]["name"], steam[game]["installed"]);
                continue;
            } else {
                console.log(steam[game]["name"]);
            }
        }

        if (searching) {
            gameName = steam[game]["name"].toLowerCase();
            searchText = searchText.toLowerCase();
            if (!gameName.includes(searchText)) {
                continue;
            }
        }

        let path = localStorage.getItem("steamFolder");

        let image = new Image();
        image.src = `${path}/appcache/librarycache/${steam[game]["appid"]}_library_600x900.jpg`;

        image.onload = () => {
            widget.style.backgroundImage = `url(${image.src})`;
        };
        image.onerror = (event) => {
            console.log("Error loading header image!", steam[game]["name"]);
            // Prevent the default action (browser attempting to display the broken image icon)
            event.preventDefault();
            // Set a fallback image in case of an error
            widget.style.backgroundImage = `url(./assets/notFound.svg)`;
            // widget.style.backgroundImage = `url(${path}/appcache/librarycache/${steam[game]["appid"]}_icon.jpg)` ;
        };

        let textWrapper = document.createElement("div");
        textWrapper.setAttribute("class", "textWrapper");

        let name = document.createElement("p");
        name.textContent = steam[game]["name"];

        let hours = document.createElement("p");
        let tempToHours =
            parseFloat(steam[game]["playtime_forever"] / 60).toFixed(2) == 0.0
                ? parseFloat(steam[game]["playtime_forever"] / 60)
                : parseFloat(steam[game]["playtime_forever"] / 60).toFixed(2);
        let toHours = String(tempToHours);
        hours.textContent = "Hours Played: " + toHours;

        widgetWrapper.appendChild(widget);

        textWrapper.appendChild(name);
        textWrapper.appendChild(hours);

        widget.append(textWrapper);

        const GameWidgetsContainer = document.getElementById(
            `${launcher}GameWidgetsContainer`
        );
        GameWidgetsContainer.append(widgetWrapper);

        // document
        //     .getElementById(`${launcher}GameWidgetsContainer`)
        //     .append(widget);
        gameCounter += 1;
    }
}
