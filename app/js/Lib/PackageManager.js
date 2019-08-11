const fs = require('fs');

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
     * Will fetch a specific package configuration from the updater service / memory.
     * @param {string} p: the package name.
     */
    async getPackage(p) {
        try {
            if (this.packageList.hasOwnProperty(p)) {
                return this.packageList(p);
            } else {
                let data = await fetch(`https://xenupdater.projectge.com/${this.serviceName}/xu/update/${p}.json`);
                return await data.json();
            }

        } catch (exception) {
            throw exception;
        }
    }

    /**
     * GetFiles
     * Gets a list of files from a specified package.
     * @param {string} p: the package name.
     */
    async getFiles(p) {
        if (this.packageList.hasOwnProperty(p)) {
            console.log(this.packageList);
        }
    }

    /**
     * ScanPackage
     * Scans a package to download / downloaded by the updater.
     * @param {String} localData: the local config data from disk
     */
    async scanPackage (localData) {
        if(localData != "") {
            // Compare the local system with the server data.#
            console.log(`[PackageManager] Checking updates for package ${p}`);
        } else {
            // Scan the local system based on the server data.
            console.log(`[PackageManager] Starting scan for package ${p}`);
        }
    }

    /**
     * CheckPackage
     * Will check if the current local package matches the server package.
     * @param {string} p: Name of the package to check.
     * @returns {object}: Files for the package that need to be updated.
     */
    async checkPackage(p) {
        let file = `./app/xu/${p}.json`;
        let localData = "";
        let serverData = await this.getPackage(p);

        console.log(serverData);

        // Check if there is already a configuration on the disk.
        await fs.open(file, 'r', async (err, fd) => {
            if (err) {
                // If the configruation does not exists, write data to disk.
                // We will need to check if there are files currently on the disk for this package.
                if (err.code === "ENOENT") {
                    await fs.writeFile(file, JSON.stringify(serverData), (err) => {
                        if (err) {
                            throw err;
                        }

                        console.log('[PackageManager] Configuration file has been saved.');
                    });
                } else {
                    throw err;
                }
            } else {
                // If the configruation does exists, read it's data.
                await fs.readFile(file, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    
                    localData = data;
                });
            }

            
            this.scanPackage(localData);
        });
    }
}