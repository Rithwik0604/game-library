steamGames = {};
epicGames = {};
xboxGames = {};
eaGames = {};
ubisoftGames = {};

let allGames = {
    steam: steamGames,
    epic: epicGames,
    xbox: xboxGames,
    ea: eaGames,
    ubisoft: ubisoftGames,
    favorite: {},
};

let totalGames = {
    all: 0,
    steam: 0,
    epic: 0,
    ea: 0,
    xbox: 0,
    ubisoft: 0,
    favorite: 0,
};

let gameCounter = 0;

let launcher = "all";

function reEvaluate() {
    let totalSteamGames =
        allGames["steam"].length === undefined ? 0 : allGames["steam"].length;
    let totalEpicGames =
        allGames["epic"].length === undefined ? 0 : allGames["epic"].length;
    let totalXboxGames =
        allGames["xbox"].length === undefined ? 0 : allGames["xbox"].length;
    let totalEAGames =
        allGames["ea"].length === undefined ? 0 : allGames["ea"].length;
    let totalUbisoftGames =
        allGames["ubisoft"].length === undefined
            ? 0
            : allGames["ubisoft"].length;
    let totalFavoriteGames =
        allGames["favorite"].length === undefined
            ? 0
            : allGames["favorite"].length;

    totalAllGames =
        totalSteamGames +
        totalEpicGames +
        totalXboxGames +
        totalEAGames +
        totalUbisoftGames;

    console.log("TotalAllGames is: " + totalAllGames);

    totalGames = {
        all: totalAllGames,
        steam: totalSteamGames,
        epic: totalEpicGames,
        ea: totalEAGames,
        xbox: totalXboxGames,
        favorite: totalFavoriteGames,
    };
}
