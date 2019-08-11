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
        result ? launcher.switchWindow("main") : launcher.handleError("Unable to connect to server.");

        // launcher.doProgressTest();
    } catch (exception) {
        console.error(exception);
        launcher.handleError(exception.message);
    }
}

initialiseLauncher();