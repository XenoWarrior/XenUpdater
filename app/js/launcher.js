/**
 * Main launcher code.
 */

// Create an instance of the launcher
async function Initialise() {
    var launcher = new Launcher();
    launcher.bindEventListeners();
    launcher.doProgressTest();

    let manager = new PackageManager("ageofaincrad");
    let packages = await manager.getPackages();

    console.log(packages);
}

Initialise();