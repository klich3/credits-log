let textInput =
	"%p\n \
%b\n \
\n \
▀█▀ █░█░█ █▀█   █▀█ █▄░█ █▀▀   █▀█ █▄░█ █▀▀\n \
░█░ ▀▄▀▄▀ █▄█   █▄█ █░▀█ ██▄   █▄█ █░▀█ ██▄\n \
\n \
%a\n \
%c\n \
%l\n \
✂ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n \
CREDITS-LOG ⌬ 211\n";

let res = [];

Array.from(textInput).forEach((e) => {
	res.push(String(e.codePointAt()).padStart(4, "0"));
});

res = res
	.join("")
	.split(/(.{88})/)
	.filter((r) => r);
console.log("---> res:", res);

//on production
const msg_loc = res
	.join("")
	.match(new RegExp(".{1,4}", "g"))
	.map((r) => String.fromCodePoint(r))
	.join("")
	.replace("%p", "Project name")
	.replace("%b", "0.0.1");

console.info(
	`%c ${msg_loc}`,
	'color:#808080;font-size:12px;font-family:"Helvetica Light", "Helvetica",Arial,sans-serif;font-weight:lighter;'
);
