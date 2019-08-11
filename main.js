const electron = require('electron');
const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Create the browser window.
    let window = new BrowserWindow({
        width: 1110,
        height: 608,
        frame: false,
        transparent: true,
        icon: './app/images/launcher_logo.png',

        webPreferences: { nodeIntegration: true }
    });

    // and load the index.html of the app.
    window.setMenu(null);
    window.loadFile('./app/index.html');
    window.setMinimumSize(1110, 608);
    window.setFullScreenable(false);
}

app.on('ready', createWindow);