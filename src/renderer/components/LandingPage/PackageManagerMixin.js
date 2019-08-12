export default {
	data() {
		return {
			serviceName: 'ageofaincrad',
			serviceUrl: `https://xenupdater.projectge.com/ageofaincrad/xu/update/updater_cfg.json`,
			packageList: {},
			serviceConfig: {},
		}
	},
	methods: {
		async initialiseService() {
			fetch(this.serviceUrl)
			.then(response => {
				this.serviceConfig = response.json();
				
				let packageNames = Object.keys(this.serviceConfig.apps);
				for (let i = 0; i < packageNames.length; i++) {
					this.packageList[packageNames[i]] = this.getPackage(packageNames[i]);
				}
				
				return true;
			}).then(error => console.error(error));
		},
		
		async getPackage(p) {
			if (this.packageList.hasOwnProperty(p)) {
				return this.packageList(p);
			} else {
				fetch(`https://xenupdater.projectge.com/${this.serviceName}/xu/update/${p}.json`)
				.then(data => {
					return data.json
				});
			}
		},
		
		async getFiles(p) {
			if (this.packageList.hasOwnProperty(p)) {
				console.log(this.packageList);
			}
		},
		
		async scanPackage(localData) {
			if (localData != "") {
				// Compare the local system with the server data.#
				console.log(`[PackageManager] Checking updates for package ${p}`);
			} else {
				// Scan the local system based on the server data.
				console.log(`[PackageManager] Starting scan for package ${p}`);
			}
		},
		
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
}