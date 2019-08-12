/**
 * Main launcher code.
 */

// Create an instance of the launcher
async function initialiseLauncher() {
    // Initialise launcher
    let launcher = new Launcher(true);
    try {
        launcher.bindEventListeners();
    } catch (exception) {
        console.error(exception);
    }

    // Initialise packages from server
    let packageManager = new PackageManager("ageofaincrad");
    try {
        let result = await packageManager.initialiseService();
        if (result) {
            launcher.switchWindow("main");

            let packages = await packageManager.getPackages();
            for(let i = 0; i < packages.length; i++) {
                launcher.setMessage(`Checking ${packages[i]}...`);
                let download = await packageManager.checkPackage(packages[i]);
                launcher.setMessage(`Need to download ${download.length} file(s) for ${packages[i]}...`);
            }
        } else {
            launcher.handleError("Unable to connect to server.");
        }
    } catch (exception) {
        console.error(exception);
        launcher.handleError(exception.message);
    }
}

initialiseLauncher();