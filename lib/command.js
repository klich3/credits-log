/*
Author: <Anthony Sychev> (hello at dm211 dot com | a.sychev at jfranc dot studio) 
Buy me a coffe: https://www.buymeacoffee.com/twooneone
command.js (c) 2022 
Created:  2022-10-06 19:22:22 
Desc: command class basics
*/

const path = require("path");
const fs = require("fs-extra");
const UtilsCreditsLog = require("./utils");
const promtCli = require("interactive-cli");

class Command {
	constructor() {
		this.fs = fs;
		this.utils = UtilsCreditsLog;
		this.promtCli = promtCli;
		this.localPath = path.join(process.cwd(), "package.json");

		if (!fs.existsSync(this.localPath)) {
			console.log("In this directory package.json file no exist.");
			return;
		}

		const {
			name,
			projectName,
			version,
			author,
			contributors,
			license,
			credits,
		} = require(this.localPath);

		this.name = name;
		this.projectName = projectName;
		this.version = version;
		this.author = author;
		this.contributors = contributors;
		this.license = license;
		this.credits = credits;
	}
}

module.exports = Command;
