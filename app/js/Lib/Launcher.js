
const electron = require('electron');
class Launcher {
    constructor(v) {
        this.verbose = v || false;
        this.verbose ? console.log("[Launcher] Creating new instance.") : "";
        this.currentWindow = "connection";
    }

    bindEventListeners() {
        this.verbose ? console.log("[Launcher] Binding event listeners.") : "";
        document.querySelector("li.minimise").addEventListener("click", function (e) {
            electron.remote.getCurrentWindow().minimize();
        });

        document.querySelector("li.close").addEventListener("click", function (e) {
            electron.remote.getCurrentWindow().close();
        });

        document.querySelector("li.settings").addEventListener("click", () => {
            this.switchWindow('settings');
        });

        document.querySelector("#settings-back").addEventListener("click", () => {
            this.switchWindow('main');
        });
    }

    switchWindow(w) {
        this.verbose ? console.log(`[Launcher] Switching window: [${this.currentWindow} => ${w}]`) : "";

        document.querySelector(`#${this.currentWindow}`).setAttribute("style", `display:none;`);
        document.querySelector(`#${w}`).setAttribute("style", `display: block`);

        this.currentWindow = w;
    }

    changeBackroung(id) {
        this.verbose ? console.log(`[Launcher] Switching background: [${id}]`) : "";

        document.querySelector("main").setAttribute("style", `background-image: url('./images/backgrounds/background_${id}.png')`);
    }

    updateProgress(p) {
        this.verbose ? console.log(`[Launcher] Updating progress: [${p}]`) : "";

        if (p === 100) {
            document.querySelector("div.progress-back").setAttribute("style", `width: ${p}%;box-shadow: 0px 0px 50px green;`);
            document.querySelector("div.progress").setAttribute("style", `box-shadow: 0px 0px 50px rgba(32, 143, 233, 0.6)`);
            document.querySelector(".play.disabled").setAttribute("class", `play`);
        } else {
            document.querySelector("div.progress-back").setAttribute("style", `width: ${p}%;`);
        }
    }

    doProgressTest() {
        this.verbose ? console.log(`[Launcher] Updating test running.`) : "";
        let p = 0;
        let interval = setInterval(() => {
            if (p < 100) {
                this.updateProgress(++p);
            } else {
                clearInterval(interval);
            }
        }, 40);
    }

    handleError(m) {
        this.switchWindow("error");
        document.querySelector("div.error-message").innerText = m;
    }
}
