class PackageManager {
    constructor(s) {
        this.service = s;
        this.server = `https://xenupdater.projectge.com/${this.service}/xu/update/updater_cfg.json`;
    }

    async getPackages() {
        let data = await fetch(`https://xenupdater.projectge.com/${this.service}/xu/update/updater_cfg.json`, {});
        return await data.json();
    }

    async getPackage() {
        let data = await fetch(url, {});
        return await data.json();
    }
}
