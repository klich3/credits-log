/*
Author: <Anthony Sychev> (hello at dm211 dot com | a.sychev at jfranc dot studio) 
Buy me a coffe: https://www.buymeacoffee.com/twooneone
index.js (c) 2022 
Created:  2022-09-29 22:03:30 
Desc: Credits-log plugin add credits to your porject             
*/

//TODO: correct shell global install script
//TODO: in vite plugin config if have multiply entries inputs, set where you want to add credits

const { resolve } = require("path");

module.exports = function (options = {}) {
	return {
		name: "credits-log",

		async renderChunk(code, chunk) {
			if (chunk.isEntry) {
				const pkg = require(resolve(".", "package.json"));

				if (!pkg.credits) {
					console.log(
						"No credits array found in your 'pkg.json' file. Run command 'credits-log help'."
					);
					return;
				}

				const cl_data = pkg.credits.join("");
				let authorEntry = `.replace("%a", "")`;
				let contributorsEntry = `.replace("%c", "")`;
				let licenseEntry = `.replace("%l", "")`;
				const version = `.replace("%b", "Build: ${pkg.version}")`;

				const name = pkg.projectName || pkg.name;
				let projectName = `.replace("%p", "Project: ${name}")`;

				if (pkg.author) {
					const author = /string/gim.test(typeof pkg.author)
						? "\\t" + pkg.author
						: "\\t" + pkg.author.join("\\n");
					authorEntry = `.replace("%a", "Author: \\n${author}")`;
				}

				if (pkg.contributors) {
					const contributors = /string/gim.test(typeof pkg.contributors)
						? "\\t" + pkg.contributors
						: "\\t" + pkg.contributors.join("\\n\\t");

					contributorsEntry = `.replace("%c", "Contributors: \\n${contributors}")`;
				}

				if (pkg.license)
					licenseEntry = `.replace("%l", "License: ${pkg.license}")`;

				const resultOut = String.raw`(function(){const d="${cl_data}";const c=['color:#808080;font-size:12px;font-family:"Helvetica Light", "Helvetica",Arial,sans-serif;font-weight:lighter;', d.match(new RegExp(".{1,4}", "g")).map((r) => String.fromCodePoint(r)).join("")${projectName}${authorEntry}${contributorsEntry}${licenseEntry}${version}];console.info("%c "+c[1],c[0])})();`;

				return `${resultOut}${code}`;
			}
		},

		buildEnd() {
			const banner = [
				"0010003200320032003200320032003200320032003200320032004500640064006400580032003200320032",
				"0032003200320061003700640064003700430032003200320032003200320032003200320032003200320032",
				"0032003200320032001000320032003200320032003200320032003200320032003200640064006400350032",
				"0032003200320032003200610064006400640064006400640043003200320032003200320032003200320032",
				"0032003200320032003200320032001000320032003200320032003200320032003200320032003200450064",
				"0064006400350032003200320032003200580064006400640064006400640045003200320032003200320032",
				"0032003200320032003200320032003200320032001000320032003200320032003200320032003200320032",
				"0032003200450064006400640064004300460032003200320032006100430043006100460032003200320032",
				"0032003200320032003200320032003200320032003200320032001000320032003200320032003200320032",
				"0032003200320032003200320032004300640064006400640064003500430043004300430043004300430061",
				"0045004600320032003200320032003200320032003200320032003200320032001000320032003200320032",
				"0032003200320032003200320032003200320032003200320045004200370064006400640064006400640064",
				"0064006400640064006400350058003200320032003200320032003200320032003200320032001000320032",
				"0032003200320032003200320032003200320032003200320032003200320032003200320045006400640064",
				"0064006400640064006400640064006400640037003200320032003200320032003200320032003200320032",
				"0010003200320032003200320032003200320032003200320032003200320032003200320032003200320045",
				"0064006400640064006400640064006400640037003700640035003200320032003200320032003200320032",
				"0032003200320010003200320032003200320032003200320032003200320032003200320032003200320032",
				"0032003200450064006400640064006400640064006400640042006400640058003200320032003200320032",
				"0032003200320032003200320010003200320032003200320032003200320032003200320032003200320032",
				"0032003200320032003200450064006400640064006400640064006400350037006400350032003200320032",
				"0032003200320032003200320032003200320010003200320032003200320032003200320032003200320032",
				"0032003200320032003200320032003200450064006400640064006400640064006400420064006400580032",
				"0032003200320032003200320032003200320032003200320010003200320032003200320032003200320032",
				"0032003200320032003200320032003200320032003200450064006400640064006400640064006400350035",
				"0042003200320032003200320032003200320032003200320032003200320010003200320032003200320032",
				"0032003200320032003200320032003200320032003200320032003200450064006400640042004200420042",
				"0064006400640061003200320032003200320032003200320032003200320032003200320010003200320032",
				"0032003200320032003200320032003200320032003200320032003200320032003200450064006400640058",
				"0032003200460064006400640061003200320032003200320032003200320032003200320032003200320010",
				"0032003200320032003200320032003200320032003200320032003200320032003200320032003200450064",
				"0064006400580032003200460064006400640061003200320032003200320032003200320032003200320032",
				"0032003200100032003200320032003200320032003200320032003200320032003200320032003200320032",
				"0032004500640064006400580032003200460064006400640061003200320032003200320032003200320032",
				"0032003200320032003200100032003200320032003200320032003200320032003200320032003200320032",
				"0032003200320032004500640064006400580032003200460064006400640061003200320032003200320032",
				"0032003200320032003200320032003200100032003200320032003200320032003200320032003200320032",
				"0032003200320032003200320032004500640064006400580032003200460064006400640061003200320032",
				"0010003200320032003200320032003200320032003200320032003200320032003200320032003200320010",
				"0032003200320032003200320032003200320032003200320084010400970110010700320121011101170032",
				"0102011101140032011701150101003200910067008200690068007300840083004500760079007100930032",
				"0010003200320032003200320032003200320032003200320032003200320032003200320032003200320032",
				"003200320032900400320050004900490010003200320032003200320032003200320032003200320032",
			];

			console.log(
				banner
					.join("")
					.match(new RegExp(".{1,4}", "g"))
					.map((r) => String.fromCodePoint(r))
					.join("")
			);
		},
	};
};
