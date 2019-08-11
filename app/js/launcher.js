const electron = require('electron');

document.getElementById("minimise").addEventListener("click", function(e) {
    var window = electron.remote.getCurrentWindow();
    window.minimize();
});

document.getElementById("close").addEventListener("click", function(e) {
    var window = electron.remote.getCurrentWindow();
    window.close();
});