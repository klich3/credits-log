/*
Author: <Anthony Sychev> (hello at dm211 dot com | a.sychev at jfranc dot studio) 
Buy me a coffe: https://www.buymeacoffee.com/twooneone
utils.js (c) 2022 
Created:  2022-10-06 18:36:22 
Desc: Tools untilities
*/

class UtilsCreditsLog {
	/**
	 * Decrypt credits array to template
	 * @param {Array} array
	 */
	static decryptCredits(array) {
		return array
			.join("")
			.match(new RegExp(".{1,4}", "g"))
			.map((r) => String.fromCodePoint(r))
			.join("");
	}

	/**
	 * Create credit array replacing ASCII text
	 * @param {String} ascii
	 */
	static encryptCredits(ascii) {
		let template = `\n%p\n%b\n\nascii%\n%a\n%c\n%l\n✂ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nCREDITS-LOG ⌬ 211`;

		template = template.replace("ascii%", ascii);

		console.log(template);

		let dataLoc = [];
		for (var l of template) {
			const ch = l.charCodeAt().toString();

			if (ch.length === 2) {
				dataLoc.push("00" + ch);
				continue;
			}

			if (ch.length === 3) {
				dataLoc.push("0" + ch);
				continue;
			}

			dataLoc.push(ch);
		}

		template = dataLoc.join("").match(new RegExp(".{1,88}", "g"));

		return template;
	}

	/**
	 * Replace items by other in tempalte
	 * @param {String} template
	 * @param {Object} replaceToArray
	 */
	static finalResult(template, replaceToArray) {
		const name = replaceToArray.projectName || replaceToArray.name;

		template = template.replace("%b", "Build: " + replaceToArray.version);
		template = template.replace("%p", "Project: " + name);

		if (replaceToArray.author) {
			const author = /string/gim.test(typeof replaceToArray.author)
				? "\t" + replaceToArray.author
				: "\t" + replaceToArray.author.join("\n");
			template = template.replace("%a", "Author: \n" + author);
		} else {
			template = template.replace("%a", "");
		}

		if (replaceToArray.contributors) {
			const contributors = /string/gim.test(typeof replaceToArray.contributors)
				? "\t" + replaceToArray.contributors
				: "\t" + replaceToArray.contributors.join("\n\t");

			template = template.replace("%c", "Contributors: \n" + contributors);
		} else {
			template = template.replace("%c", "");
		}

		if (replaceToArray.license) {
			template = template.replace("%l", "License: " + replaceToArray.license);
		} else {
			template = template.replace("%l", "");
		}

		return template;
	}
}

module.exports = UtilsCreditsLog;
