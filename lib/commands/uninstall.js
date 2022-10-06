/*
Author: <Anthony Sychev> (hello at dm211 dot com | a.sychev at jfranc dot studio) 
Buy me a coffe: https://www.buymeacoffee.com/twooneone
uninstall.js (c) 2022 
Created:  2022-10-06 18:21:32 
Desc: remove parameters from local package file
*/

const Command = require("../command");

class UninstallCommand extends Command {
	constructor() {
		super();
	}

	run() {
		let file = require(this.localPath);

		delete file.credits;
		delete file.projectName;

		this.fs.writeFileSync(this.localPath, JSON.stringify(file, null, 4));

		console.log("Credit-Log removed.");
	}
}

module.exports = UninstallCommand;
