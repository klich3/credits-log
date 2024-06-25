#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

import path from "node:path";
import fs from "node:fs";

import { decryptCredits, encryptCredits, finalResult } from "./utils.mjs";

program.name("Credits-Log").version("1.0.4").description("Credits-Log CLI");

/**
 * basic response function
 * @param {*} result
 */
const resFn = (result) => {
	const { choice } = result;

	const spinner = ora(`Doing ${result.choice}...`).start();

	const localPath = path.join(process.cwd(), "package.json");
	if (!fs.existsSync(localPath))
		spinner.fail("In this directory package.json file no exist.");

	const packageJsonRaw = fs.readFileSync(localPath, "utf8");
	const packageJson = JSON.parse(packageJsonRaw);

	if (choice === "Check FrontEnd Log") {
		spinner.succeed("Done!");

		const decryptArray = decryptCredits(packageJson.credits);
		const showResult = finalResult(decryptArray, packageJson);

		console.log(
			chalk.green("\nFinal result in FrontEnd Console: ---------------------\n")
		);
		console.log(showResult);
		console.log(
			chalk.green("\n-------------------------------------------------------\n")
		);

		backToMenu();
	}

	if (choice === "Install") {
	}

	if (choice === "Uinstall") {
	}

	if (choice === "Edit/Update") {
	}
};

/**
 * Initial Menu
 */
const menu = () =>
	inquirer
		.prompt([
			{
				type: "list",
				name: "choice",
				message: "Hi there!\nWelcome to Credits-Log Cli\nChoose an option:",
				choices: ["Check FrontEnd Log", "Install", "Uinstall", "Edit/Update"],
			},
		])
		.then((result) => resFn(result));

/**
 * Ask for back to menu
 */
const backToMenu = () => {
	inquirer
		.prompt({
			type: "confirm",
			name: "back",
			message: "Do you want to back to menu?",
			choices: ["Yes", "No"],
		})
		.then((res) => menu());
};

program.action(() => menu());
program.parse(process.argv);
