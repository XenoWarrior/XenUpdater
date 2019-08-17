const fs = require('fs');
const md5 = require('md5-file');
const path = require('path');

/**
 * Manager for service packages
 */
class PackageManager {
    /**
     * Constructor 
     * @param {string} s: Name of the service to fetch configuration for.
     */
    constructor(sv, s) {
        this.serviceName = s;
        this.serverUrl = sv;

        this.serviceUrl = `${this.serverUrl}/${this.serviceName}/xu/update/updater_cfg.json`;
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
     * GetPackages
     * Fetches all known packages, for use after initialisation.
     * @returns: the package list
     */
    async getPackages() {
        return Object.keys(this.packageList);
    }

    /**
     * GetPackage
     * Will fetch a specific package configuration from the updater service / memory.
     * @param {string} packageName: the package name.
     */
    async getPackage(packageName) {
        try {
            if (this.packageList.hasOwnProperty(packageName)) {
                return this.packageList[packageName];
            } else {
                let data = await fetch(`${this.serverUrl}/${this.serviceName}/xu/update/${packageName}.json`);
                return await data.json();
            }

        } catch (exception) {
            throw exception;
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

        if (localData) {
            // A build already exists on the system.
            console.log(`[PackageManager] Build exists, checking updates for package ${packageName}`);

            localData = JSON.parse(localData);
            let localFiles = Object.keys(localData.package_files);
            serverFiles.forEach(f => {
                // Add new files if they do not exist on the file system, the local config and if they do not match the server file hash.
                if (!fs.existsSync(`${packageName}/${f}`) || !localFiles.hasOwnProperty(f) || serverFiles[f] != localFiles[f]) {
                    downloadList.push(f);
                }
            });
        } else {
            // No local cache found.
            console.log(`[PackageManager] Local config does not exist, checking if ${packageName} has files.`);

            // Check if there are files
            let dir = [];
            try {
                dir = this.readPackageDir(packageName);
                console.log(`[PackageManager] Files in ${packageName}: `, dir);

                serverFiles.forEach(f => {
                    // Check if the file does not exist, or does not match the server file.
                    if (!dir.includes(f) || serverFiles[f] != md5(`${packageName}/${f}`)) {
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

    async streamWithProgress(length, reader, writer, progressCallback, finalLength) {
        let bytesDone = 0;

        while (true) {
            const result = await reader.read();
            if (result.done) {
                if (progressCallback != null) {
                    progressCallback(length, 100);
                }
                return;
            }

            const chunk = result.value;
            if (chunk == null) {
                throw Error('Empty chunk received during download');
            } else {
                writer.write(Buffer.from(chunk));
                if (progressCallback != null) {
                    bytesDone += chunk.byteLength;
                    const percent = length === 0 ? null : Math.floor(bytesDone / length * 100);
                    progressCallback(bytesDone, percent, finalLength);
                }
            }
        }
    }

    async downloadFile(fileName, packageName, progressCallback, length) {
        const request = new Request(`${this.serverUrl}/${this.serviceName}/xu/release/${packageName}/${fileName}`, {
            headers: new Headers({ 'Content-Type': 'application/octet-stream' })
        });

        const response = await fetch(request);
        if (!response.ok) {
            throw Error(`Unable to download, server returned ${response.status} ${response.statusText}`);
        }

        const body = response.body;
        if (body == null) {
            throw Error('No response body');
        }

        let fullFile = `./packages/${packageName}/${fileName}`;
        if (!fs.existsSync(path.dirname(fullFile))) {
            fs.mkdirSync(path.dirname(fullFile), { recursive: true });
        }

        const finalLength = length || parseInt(response.headers.get('Content-Length' || '0'), 10);
        const reader = body.getReader();
        const writer = fs.createWriteStream(fullFile);

        await this.streamWithProgress(finalLength, reader, writer, progressCallback, finalLength);
        writer.end();
    }

}
