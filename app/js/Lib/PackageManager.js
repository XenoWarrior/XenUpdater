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
     * @param {string} packageName: the package name.
     */
    async getPackage(packageName) {
        try {
            if (this.packageList.hasOwnProperty(packageName)) {
                return this.packageList(packageName);
            } else {
                let data = await fetch(`https://xenupdater.projectge.com/${this.serviceName}/xu/update/${packageName}.json`);
                return await data.json();
            }

        } catch (exception) {
            throw exception;
        }
    }

    /**
     * GetFiles
     * Gets a list of files from a specified package.
     * @param {string} packageName: the package name.
     */
    async getFiles(packageName) {
        if (this.packageList.hasOwnProperty(packageName)) {
            console.log(this.packageList);
        }
    }

    /**
     * CheckPackage
     * Will check if the current local package matches the server package.
     * @param {string} packageName: Name of the package to check.
     * @returns {object}: Files for the package that need to be updated.
     */
    async checkPackage(packageName) {
        let dir = "./app/xu/";
        let file = packageName + ".json";

        let localData = "";
        let serverData = JSON.stringify(await this.getPackage(packageName));

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        if (fs.existsSync(dir + file)) {
            localData = fs.readFileSync(dir + file).toString();
        } else {
            fs.writeFile(dir + file, serverData, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("[PackageManager] The configuration file was saved!");
            });
        }

        return this.scanPackageDir(packageName, localData, serverData);
    }

    /**
     * ScanPackage
     * Scans a package to download / downloaded by the updater.
     * @param {String} packageName: the package name.
     * @param {String} localData: the local config data from disk.
     * @param {String} serverData: the config data from server.
     */
    async scanPackageDir(packageName, localData, serverData) {
        serverData = JSON.parse(serverData);

        let serverFiles = Object.keys(serverData.package_files);
        let downloadList = [];

        if (localData != "") {
            // A build already exists on the system.
            console.log(`[PackageManager] Build exists, checking updates for package ${packageName}`);

            localData = JSON.parse(localData);

            let localFiles = Object.keys(localData.package_files);
            serverFiles.forEach(f => {
                // If a new file, or changed file, add it to download.
                if (!fs.existsSync(`${packageName}/${f}`) || !localFiles.hasOwnProperty(f) || serverFiles[f] != localFiles[f]) {
                    downloadList.push(f);
                }
            });
        } else {
            console.log(`[PackageManager] Local config does not exist, checking if ${packageName} has files.`);

            let dir = [];
            try {
                dir = this.readPackageDir(packageName);

                console.log("DIR", dir);

                serverFiles.forEach(f => {
                    if (!dir.includes(f)) {
                        downloadList.push(f);
                    }
                })
            } catch (ex) {
                console.log(`[PackageManager] No build files for ${packageName}, downloading all files.`);
                serverFiles.forEach(f => {
                    downloadList.push(f);
                });
            }
        }

        return downloadList;
    }

    /**
     * ReadPackageDir
     * Will read all the contents of a package directory
     * @param {string} packageName: the package name.
     * @throws {exception}: if the directory does not exist.
     * @returns {array}: the files in a directory.
     */
    readPackageDir(packageName) {
        try {
            let dir = fs.readdirSync(`./${packageName}`);
            return dir;
        } catch (ex) {
            throw ex;
        }
    }

}