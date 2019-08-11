const electron = require('electron');

document.getElementById("minimise").addEventListener("click", function(e) {
    var window = electron.remote.getCurrentWindow();
    window.minimize();
});

document.getElementById("close").addEventListener("click", function(e) {
    var window = electron.remote.getCurrentWindow();
    window.close();
});

function updateProgress (p) {
    document.querySelector("div.progress-back").setAttribute("style", `width: ${p}%;`);
}

async function doProgressTest () {
    let p = 0;
    setInterval(() => {
        if(p < 100) {
            updateProgress(++p);
        } else {
            p = 0;
        }
    }, 100);
}

doProgressTest();