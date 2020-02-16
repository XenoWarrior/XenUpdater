
const electron = require('electron');
/**
 * Main launcher handling class
 */
class Launcher {
    /**
     * Launcher constructor.
     * @param {bool} v: Enables debugging for the launcher.
     */
    constructor(v) {
        this.verbose = v || false;
        this.verbose ? console.log("[Launcher] Creating new instance.") : "";
        this.currentWindow = "connection";
    }

    /**
     * BindEventListeners
     * Used to bind events to clicks of elements in the DOM.
     */
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

    /**
     * SwitchWindow
     * Switches the current window in view within the updater.
     */
    switchWindow(w) {
        this.verbose ? console.log(`[Launcher] Switching window: [${this.currentWindow} => ${w}]`) : "";

        document.querySelector(`#${this.currentWindow}`).setAttribute("style", `display:none;`);
        document.querySelector(`#${w}`).setAttribute("style", `display: block`);

        this.currentWindow = w;
    }

    /**
     * ChangeBackground
     * Changes the current background.
     * @param {int} id: ID of the image within /backgrounds.
     */
    changeBackroung(id) {
        this.verbose ? console.log(`[Launcher] Switching background: [${id}]`) : "";

        document.querySelector("main").setAttribute("style", `background-image: url('./images/backgrounds/background_${id}.png')`);
    }

    /**
     * UpdateProgress
     * Updates the main progress bar on the updater.
     * TODO: Add support for multiple progress bars.
     * @param {int} p 
     */
    updateProgress(message, filePercent, fileIndex, fileTotal) {

        let p = this.getWholePercent(fileIndex, fileTotal);
        this.verbose ? console.log(`[Launcher] Updating progress: [${p}]`) : "";

        if (p === 100) {
            document.querySelector("#main-progress-back").setAttribute("style", `width: ${p}%;box-shadow: 0px 0px 50px green;`);
            document.querySelector("#secondary-progress-back").setAttribute("style", `width: ${p}%;box-shadow: 0px 0px 50px green;`);
            document.querySelector("div.progress").setAttribute("style", `box-shadow: 0px 0px 50px rgba(32, 143, 233, 0.6)`);
            document.querySelector("#percent").innerText = "";
        } else {
            document.querySelector("#main-progress-back").setAttribute("style", `width: ${p}%;`);
            document.querySelector("#secondary-progress-back").setAttribute("style", `width: ${filePercent}%;`);
            document.querySelector("#percent").innerText = `${message} (${filePercent}%)`;
        }
    }

    getWholePercent(percentFor, percentOf) {
        return Math.floor(percentFor / percentOf * 100);
    }

    setMessage(m) {
        document.querySelector("#percent").innerText = `${m}`;
    }

    /**
     * HandleError
     * Display a message in the launcher when something goes wrong.
     * @param {string} m: The message to be displayed.
     */
    handleError(m) {
        this.switchWindow("error");
        // document.querySelector("div.error-message").innerHTML = m;
    }

    /**
     * DoProgressTest
     * Progress bar testing function.
     */
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

}
