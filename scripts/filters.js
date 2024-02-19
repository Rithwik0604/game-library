function search() {
    const text = document.getElementById("searchBar").value;

    if (localStorage.getItem("accountLinked") !== "1") {
        return;
    }

    var isInstalled = getInstalled();

    loadGames(true, text,isInstalled);
}

document.getElementById("searchBar").addEventListener("input", search);

function getInstalled() {
    const check = document.getElementById("installed");
    var isChecked = check.checked;
    console.log("Check is: ", isChecked);
    return isChecked;
    // loadGames((installed = isChecked));
}

document.getElementById("installed").addEventListener("change",() => {
    var isInstalled = getInstalled();
    loadGames(false,undefined,isInstalled);
} );
