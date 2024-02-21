const { call,on } = window.electronAPI;

function requestData(request, info) {
    call(request, info);
}

async function loadGames(searching, searchText, installed) {
    gameCounter = 0;

    if (launcher === "all") {
        let steam = allGames["steam"];
        steamLoader(steam, searching, searchText, installed);
    } else if (launcher === "steam") {
        let steam = allGames["steam"];
        steamLoader(steam, searching, searchText, installed);
    }

    console.log("Reached reEvaluate");
    await reEvaluate();
    console.log("Launcher: ", launcher);
    document.getElementById("totalGamesText").innerText =
        "Total Games: " + gameCounter;
}

on("steamData-response", (event, data) => {
    removePlaceHolders();
    allGames["steam"] = data['games'];
    localStorage.setItem("steamFolder",data['steamFolder'])
    loadGames();
});

addEventListener("DOMContentLoaded", (e) => {
    let accountLinked = localStorage.getItem("accountLinked");
    let steamAccount = localStorage.getItem("steamAccount");

    removePlaceHolders();

    if (accountLinked === "1") {
        if (steamAccount === "1") {
            let info = {};
            info["message"] = "steam";
            info["steamID"] = localStorage.getItem("steamID");
            info["steamFolder"] = localStorage.getItem("steamFolder");
            requestData("steamAccount", info);
        }
    } else {
    }
});

function gameButtonClick(buttonID) {

    document.getElementById("installed").checked = false;

    buttons = ["all", "favorite", "steam", "epic", "xbox", "ea", "ubisoft"];
    document.getElementById(buttonID).className = "gameButton active";
    for (let index = 0; index < buttons.length; index++) {
        if (buttons[index] != buttonID) {
            document.getElementById(buttons[index]).className = "gameButton";
            document.getElementById("main" + buttons[index]).className =
                "mainPages";
        }
    }
    launcher = buttonID;
    document.getElementById(`main${buttonID}`).className = "mainPages visible";
    loadGames(false);
}
