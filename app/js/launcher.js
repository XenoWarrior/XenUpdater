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
    let packageManager = new PackageManager(private.env.SERVICE_URL, private.env.SERVICE_NAME);
    try {
        if (await packageManager.initialiseService()) {
            launcher.switchWindow("main");

            let packages = await packageManager.getPackages();
            for (let i = 0; i < packages.length; i++) {
                launcher.setMessage(`Checking ${packages[i]}...`);
                let download = await packageManager.checkPackage(packages[i]);

                launcher.setMessage(`Need to download ${download.length} file(s) for ${packages[i]}... Starting in 3 seconds!`);

                setTimeout(async () => {
                    for (let x = 0; x < download.length; x++) {
                        await packageManager.downloadFile(download[x], packages[i], (bytes, percent, length) => {
                            let done = Math.round(bytes / 1000000) || 1;
                            let total = Math.round(length / 1000000) || 1;
                            launcher.updateProgress(`Downloading file ${x + 1} of ${download.length} (${done}MB of ${total}MB) | `, percent, x + 1, download.length);
                        });
                    }
                }, 3000);
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