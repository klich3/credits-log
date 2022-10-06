/*
Author: <Anthony Sychev> (hello at dm211 dot com | a.sychev at jfranc dot studio) 
Buy me a coffe: https://www.buymeacoffee.com/twooneone
install.js (c) 2022 
Created:  2022-10-06 18:18:17 
Desc: Install write to local package file
*/

const Command = require("../command");

class InstallCommand extends Command {
	constructor() {
		super();
	}

	run() {
		console.log(
			`ASCII web pages:\n\n https://fsymbols.com/generators/carty/\n https://patorjk.com/software/taag/#p=display&f=Abraxis-Small&t=too\n https://manytools.org/hacker-tools/convert-images-to-ascii-art/go/\n`
		);

		const data = {};
		let file = require(this.localPath);

		new Promise((resolve, reject) => {
			resolve({
				addCredits: () => Promise.resolve(),
			});
		})
			.then((res) => {
				return this.promtCli
					.promptFields("Enter project name", "projectName")
					.then((projectName) => {
						data.projectName = projectName;
					})
					.then(() =>
						this.promtCli.promptFields("Author", ["name", "email", "webpage"])
					)
					.then((resAuthor) => {
						const { name, email, webpage } = resAuthor;

						let out;

						if (name) out = name;
						if (email) out = `${out} <${email}>`;
						if (webpage) out = `${out} (${webpage})`;

						data.author = out;
					})
					.then(() =>
						this.promtCli.promptFields([
							{
								name: "Line",
								description: "Paste your ASCII text",
								type: "array",
								required: true,
								message: "Press Control+C or Ctrl+C to terminate insert.",
								conform: (value) => {
									return true;
								},
							},
						])
					)
					.then((ascii) => {
						data.ascii = ascii.Line.join("\n");
					});
			})
			.then(() => this.promtCli.promptToContinue())
			.then(() => {
				console.log(
					"package.json updated with next data ->\n",
					data,
					"Final result:\n"
				);

				file = { ...file, ...data };
				file.credits = this.utils.encryptCredits(file.ascii);
				delete file.ascii;

				console.log(file);

				this.fs.writeFileSync(this.localPath, JSON.stringify(file, null, 4));
			})
			.catch(this.promtCli.onFinalError)
			.then(this.promtCli.exit);
	}
}

module.exports = InstallCommand;
