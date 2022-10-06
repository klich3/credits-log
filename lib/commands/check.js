/*
Author: <Anthony Sychev> (hello at dm211 dot com | a.sychev at jfranc dot studio) 
Buy me a coffe: https://www.buymeacoffee.com/twooneone
check.js (c) 2022 
Created:  2022-10-06 18:21:47 
Desc: description
*/

const Command = require("../command");

class CheckCommand extends Command {
	constructor() {
		super();
	}

	run() {
		const decryptArray = this.utils.decryptCredits(this.credits);
		const showResult = this.utils.finalResult(decryptArray, this);

		console.log("Final result: ---------------------\n");
		console.log(showResult);
		console.log("-----------------------------------\n");
	}
}

module.exports = CheckCommand;
