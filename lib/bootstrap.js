/*
Author: <Anthony Sychev> (hello at dm211 dot com | a.sychev at jfranc dot studio) 
Buy me a coffe: https://www.buymeacoffee.com/twooneone
bootstrap.js (c) 2022 
Created:  2022-09-29 22:26:58 
Desc: Cli options for create / edit / and del credits-log
*/

const path = require("path");
const fs = require("fs-extra");

const aliases = {
	i: "install",
	install: "install",
	"--install": "install",
	u: "uninstall",
	uninstall: "uninstall",
	"--uninstall": "uninstall",
	c: "check",
	check: "check",
	"--check": "check",
};

// Ensure if any promises aren't handled correctly then they get logged
process.on("unhandledRejection", (reason, promise) => {
	console.warn("A promise was rejected but did not have a .catch() handler:");
	console.warn((reason && reason.stack) || reason || promise);
	throw reason;
});

const bootstrap = {
	/**
	 * Discovers any commands inside of an extension folder
	 *
	 * @param {Object} commands Current commands hash
	 * @param {string} dir Directory to look for commands in
	 * @return {Object} Object hash with any discovered commands added
	 */
	discoverCommands: (commands, dir) => {
		const commandsDir = path.join(dir, "commands");

		// No commands here if commands dir doesn't exist
		if (!fs.existsSync(commandsDir)) {
			return commands;
		}

		// Read the directory and find the commands
		fs.readdirSync(commandsDir)
			.filter(
				// Don't treat non-js files as commands, but also make sure any commands that are folders
				// with index.js files in them are loaded
				(command) =>
					path.extname(command) === ".js" ||
					fs.existsSync(path.join(commandsDir, command, "index.js"))
			)
			.forEach((command) => {
				const basename = path.basename(command, ".js");
				const commandName = commands[basename]
					? `${extensionName}:${basename}`
					: basename;
				commands[commandName] = path.resolve(commandsDir, basename);
			});

		return commands;
	},

	/**
	 * Run specific command
	 * @param {String} command
	 */
	runCommand: (command) => {
		let commands = bootstrap.discoverCommands({}, __dirname);

		const CommandClass = require(commands[command]);
		const ClassInstance = new CommandClass();
		ClassInstance.run();
	},

	/**
	 * Runs the CLI!
	 * This is where the magic happens
	 *
	 * @param {Array} Array of string arguments (taken from process.argv)
	 * @param Yargs yargs instance
	 */
	run: (argv, yargs) => {
		// Get the first argument so we can not load all the commands at once
		const firstArg = argv.shift();

		if (firstArg === "help" || firstArg === "--help") {
			argv.unshift("help");
		} else if (aliases[firstArg]) {
			//run command
			bootstrap.runCommand(aliases[firstArg]);
		} else {
			// Command not found :( Error and exit
			console.error(
				`Unrecognized command: '${firstArg}'. Run \`credits-log help\` for usage.`
			);
			process.exit(1);
		}

		// Yargs magic
		yargs
			.wrap(Math.min(150, yargs.terminalWidth()))
			.epilogue("For more information, see our repo.")
			.group("help", "Global Options:")
			.option("i", {
				alias: "install",
				describe: "Install insert parameters to your package.json file",
				group: "Global Options:",
			})
			.option("u", {
				alias: "uninstall",
				describe: "Remove parameters form your package.json file",
				group: "Global Options:",
			})
			.option("c", {
				alias: "check",
				describe: "Show result in terminal",
				group: "Global Options:",
			})
			.version(false)
			.parse(argv);
	},
};

module.exports = bootstrap;
