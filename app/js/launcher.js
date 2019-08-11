const electron = require('electron');
var currWindow = "main";

function bindEventListeners() {
    document.querySelector("li.minimise").addEventListener("click", function (e) {
        var window = electron.remote.getCurrentWindow();
        window.minimize();
    });

    document.querySelector("li.close").addEventListener("click", function (e) {
        var window = electron.remote.getCurrentWindow();
        window.close();
    });
}

function switchWindow(w) {
    console.log(w);
    document.querySelector(`#${currWindow}`).setAttribute("style", `display:none;`);
    document.querySelector(`#${w}`).setAttribute("style", `display: block`);
}

function changeBackroung(id) {
    document.querySelector("main").setAttribute("style", `background-image: url('./images/backgrounds/background_${id}.png')`);
}

function updateProgress(p) {
    if (p === 100) {
        document.querySelector("div.progress-back").setAttribute("style", `width: ${p}%;box-shadow: 0px 0px 50px green;`);
        document.querySelector("div.progress").setAttribute("style", `box-shadow: 0px 0px 50px rgba(32, 143, 233, 0.6)`);
        document.querySelector(".play.disabled").setAttribute("class", `play`);
    } else {
        document.querySelector("div.progress-back").setAttribute("style", `width: ${p}%;`);
    }
}

function doProgressTest() {
    let p = 0;
    let interval = setInterval(() => {
        if (p < 100) {
            updateProgress(++p);
        } else {
            clearInterval(interval);
        }
    }, 40);
}

bindEventListeners();
doProgressTest();
