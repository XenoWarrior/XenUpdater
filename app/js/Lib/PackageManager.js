
class PackageManager {
    constructor(service) {
        this.server = `https://xenupdater.projectge.com/${service}/xu/update/updater_cfg.json`;
    }

    async getPackages() {
        let data = await fetch("https://xenupdater.projectge.com/ageofaincrad/xu/update/updater_cfg.json", {});
        return await data.json();
    }

    async getPackage() {
        let data = await fetch(url, {});
        return await data.json();
    }
}
