#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";

import path from "node:path";
import fs from "node:fs";

import { decryptCredits, encryptCredits, finalResult } from "./utils.mjs";

program.name("Credits-Log").version("1.0.4").description("Credits-Log CLI");

/**
 * basic response function
 * @param {*} result
 */
const resFn = async (result) => {
	const { choice } = result;

	const localPath = path.join(process.cwd(), "package.json");
	if (!fs.existsSync(localPath)) {
		console.log(chalk.red("In this directory package.json file no exist."));
		return;
	}

	const packageJsonRaw = fs.readFileSync(localPath, "utf8");
	let packageJson = JSON.parse(packageJsonRaw);

	if (choice === "Check FrontEnd Log") {
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
		console.log(
			chalk.green(
				`\nHere you can access and generate letters in ASCII format:\n\n https://fsymbols.com/generators/carty/\n https://patorjk.com/software/taag/#p=display&f=Abraxis-Small&t=too\n https://manytools.org/hacker-tools/convert-images-to-ascii-art/go/\n---------------------\n\nThis is the information I have:\n`
			)
		);

		await checkToRefill(packageJson)
			.then((itms) => {
				console.log(
					`\nI will then ask you for missing information to complete the setup.`
				);

				itms.push({
					type: "confirm",
					name: "write",
					message: "Write changes to package.json file ?",
					choices: ["Yes", "No"],
				});

				inquirer.prompt(itms).then((res) => {
					packageJson = { ...packageJson, ...res };
					delete packageJson.write;

					packageJson.credits = encryptCredits(packageJson.ascii);
					delete packageJson.ascii;

					if (res.write || res.write === "Yes")
						fs.writeFileSync(localPath, JSON.stringify(packageJson, null, 4));

					backToMenu();
				});
			})
			.catch(() => {
				console.log(chalk.green("All data exist. Nothing to refill.\n"));
				backToMenu();
			});
	}

	if (choice === "Uinstall") {
		inquirer
			.prompt({
				type: "confirm",
				name: "uninstall",
				message: "Do you want to remove all credits from package.json file ?",
				choices: ["Yes", "No"],
			})
			.then((res) => {
				if (res.uninstall) {
					delete packageJson.ascii;
					delete packageJson.numContributors;
					delete packageJson.credits;
					delete packageJson.projectName;
					fs.writeFileSync(localPath, JSON.stringify(packageJson, null, 4));
					console.log("Credit-Log removed thanks for all.");
				}

				backToMenu();
			});
	}

	if (choice === "Edit/Update") {
		inquirer
			.prompt({
				type: "list",
				name: "edit",
				message: "What do you want to edit ?",
				choices: [
					{
						name: "Description",
						value: "description",
					},
					{
						name: "Project Name",
						value: "projectName",
					},
					new inquirer.Separator(),
					{
						name: "Ascii Logotype",
						value: "ascii",
					},
					"Back to menu",
				],
			})
			.then((res) => {
				if (res.edit === "description")
					inquirer
						.prompt({
							type: "input",
							name: "description",
							message: "Please enter a description for the project: ",
						})
						.then((res) => {
							packageJson.description = res.description;
							fs.writeFileSync(localPath, JSON.stringify(packageJson, null, 4));
							console.log(chalk.green("Description updated."));
							resFn({ choice: "Edit/Update" });
						});

				if (res.edit === "projectName")
					inquirer
						.prompt({
							type: "input",
							name: "projectName",
							message: `Please enter text name for the project`,
						})
						.then((res) => {
							packageJson.projectName = res.projectName;
							fs.writeFileSync(localPath, JSON.stringify(packageJson, null, 4));
							console.log(chalk.green("Project Name updated."));
							resFn({ choice: "Edit/Update" });
						});

				if (res.edit === "ascii")
					inquirer
						.prompt({
							type: "editor",
							name: "ascii",
							message:
								"Enter your ASCII logotype (Command in editor like a VI)\nShift + C = Insert mode\nEsc = command mode\n:exit + Enter = Exit",
							validate(text) {
								return true;
							},
						})
						.then((res) => {
							packageJson.credits = encryptCredits(res.ascii);
							delete packageJson.ascii;
							fs.writeFileSync(localPath, JSON.stringify(packageJson, null, 4));
							console.log(chalk.green("ASCII logotype updated."));
							resFn({ choice: "Edit/Update" });
						});

				if (res.edit === "Back to menu") menu();
			});
	}
};

/**
 * Check if all data is present in package.json
 * @param {*} packageJson
 * @returns array
 */
const checkToRefill = (packageJson) => {
	return new Promise((resolve, reject) => {
		console.log(`Project NPM name: ${packageJson.name}`);
		console.log(`Build Version: ${packageJson.version}`);

		let prompts = [];

		if (packageJson.description) {
			console.log(`✅ Description: ${packageJson.description}`);
		} else {
			console.log(chalk.red("⚠️ No description found in package.json"));
			prompts.push({
				type: "input",
				name: "description",
				message: "Please enter a description for the project: ",
			});
		}

		//---

		if (packageJson.author) {
			console.log(`✅ Author: ${packageJson.author}`);
		} else {
			console.log(chalk.red("⚠️ No author found in package.json"));
		}

		//---

		if (packageJson.contributors) {
			console.log(`✅ Contributors: ${packageJson.contributors}`);
		} else {
			console.log(chalk.red("⚠️ No contributors found in package.json"));
		}

		//---

		if (packageJson.license) {
			console.log(`✅ License: ${packageJson.license}`);
		} else {
			console.log(chalk.red("⚠️ License found in your's package.json"));
		}

		//---

		if (packageJson.projectName) {
			console.log(`✅ Project Name: ${packageJson.projectName}`);
		} else {
			console.log(chalk.red("⚠️ No project name found in package.json"));
			prompts.push({
				type: "input",
				name: "projectName",
				message: `Please enter text name for the project`,
			});
		}

		//---

		if (packageJson.credits) {
			console.log(`✅ ASCII LOGOTYPE are present.`);
		} else {
			console.log(chalk.red("⚠️ No ASCII LOGOTYPE found in package.json"));
			prompts.push({
				type: "editor",
				name: "ascii",
				message:
					"Enter your ASCII logotype (Command in editor like a VI)\nShift + C = Insert mode\nEsc = command mode\n:exit + Enter = Exit",
				validate(text) {
					return true;
				},
			});
		}

		//---

		if (!prompts) reject();
		resolve(prompts);
	});
};

/**
 * Initial Menu
 */
const menu = async () =>
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
const backToMenu = () =>
	inquirer
		.prompt({
			type: "confirm",
			name: "back",
			message: "Do you want to back to main menu?",
			choices: ["Yes", "No"],
		})
		.then((res) => {
			if (res.back || res.back === "Yes") menu();
		});

program.action(() => menu());
program.parse(process.argv);
