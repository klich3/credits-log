/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
uninstall.js (c) 2022
Created:  2022-10-06 18:21:32
Desc: remove parameters from local package file
*/

import Command from "./command.mjs";

class UninstallCommand extends Command {
	constructor() {
		super();
	}

	/**
	 * Remove custom credits fields from local package file
	 */
	run() {
		let file = require(this.localPath);

		delete file.credits;
		delete file.projectName;

		this.fs.writeFileSync(this.localPath, JSON.stringify(file, null, 4));

		console.log("Credit-Log removed.");
	}
}

module.exports = UninstallCommand;
