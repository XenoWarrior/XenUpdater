/**
 * Manager for service packages
 */
class PackageManager {
    /**
     * Constructor 
     * @param {string} s: Name of the service to fetch configuration for.
     */
    constructor(s) {
        this.serviceName = s;
        this.serviceUrl = `https://xenupdater.projectge.com/${this.serviceName}/xu/update/updater_cfg.json`;
        this.packageList = {};
        this.serviceConfig = {};
    }

    /**
     * InitialiseService
     * Fetches the service configuration for the defined service
     * and loads related packages.
     */
    async initialiseService() {
        try {
            let r = await fetch(this.serviceUrl, {});
            this.serviceConfig = await r.json();

            let packageNames = Object.keys(this.serviceConfig.apps);
            for (let i = 0; i < packageNames.length; i++) {
                this.packageList[packageNames[i]] = await this.getPackage(packageNames[i]);
            }

            return true;
        } catch (exception) {
            throw exception;
        }
    }

    /**
     * GetPackage
     * Will fetch a specific package configuration from the updater service.
     * @param {string} p: the package name
     */
    async getPackage(p) {
        try {
            let data = await fetch(`https://xenupdater.projectge.com/${this.serviceName}/xu/update/${p}.json`);
            return await data.json();
        } catch (exception) {
            throw exception;
        }
    }
}