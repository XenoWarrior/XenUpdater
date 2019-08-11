class PackageManager {
    constructor(s) {
        this.serviceName = s;
        this.serviceUrl = `https://xenupdater.projectge.com/${this.serviceName}/xu/update/updater_cfg.json`;
        this.packageList = {};
        this.serviceConfig = {};
    }

    async initialiseService() {
        try {
            let r = await fetch(this.serviceUrl, {});
            this.serviceConfig = await r.json();

            let packageNames = Object.keys(this.serviceConfig.apps);
            for (let i = 0; i < packageNames.length; i++) {
                let data = await fetch(`https://xenupdater.projectge.com/${this.serviceName}/xu/update/${packageNames[i]}.json`);
                this.packageList[packageNames[i]] = await data.json();
            }

            return true;
        } catch (exception) {
            throw exception;
        }
    }

    async getPackage(url) {
        try {
            // let r = await fetch(url, {});
            // return await r.json();
        } catch (exception) {
            throw exception;
        }
    }
}