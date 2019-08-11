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
    if(p === 100) {
        document.querySelector("div.progress-back").setAttribute("style", `width: ${p}%;box-shadow: 0px 0px 50px green;`);
        document.querySelector("div.progress").setAttribute("style", `box-shadow: 0px 0px 50px rgba(32, 143, 233, 0.6)`);
        document.querySelector(".play.disabled").setAttribute("class", `play`);
    } else {
        document.querySelector("div.progress-back").setAttribute("style", `width: ${p}%;`);
    }
}

async function doProgressTest () {
    let p = 0;
    let interval = setInterval(() => {
        if(p < 100) {
            updateProgress(++p);
        } else {
            clearInterval(interval);
        }
    }, 40);
}

doProgressTest();