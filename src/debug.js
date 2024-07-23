/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
debug.js (c) 2024
Created:  2024-07-23 22:19:00 
Desc: Debug console log script
Docs: 
 	1) Copy and paste in your browser conssole press enter and you have a final code.
 	2) Copy again and paste it to console and press enter.
	3) Press F1 to show the credits.
*/

const pkg = {
	projectName: "test",
	authorEntry: "test 2",
	contributorsEntry: "aaaa",
	licenseEntry: "MIT",
	version: "3.0.2",
	credits:
		"0010003701120010003700980010001096009608960081959608961796089617960881959608960096088195003281959608960096088195960896049617960881959608960096008195003281959608960096088195960896049617960881959608960096000010961796089617819596009604960096049600819596089604960881950032819596089604960881959608961796009608819596089608960481950032819596089604960881959608961796009608819596089608960400100037009700100037009900100037010800109986003294809480948094809480948094809480948094809480948094809480948094809480948094809480948094809480948094809480948094809480001000670082006900680073008400830045007600790071003290040032005000490049",
};

const cl_data = pkg.credits;
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

if (pkg.license) licenseEntry = `.replace("%l", "License: ${pkg.license}")`;

const r = String.raw`(function(){
  const d="${cl_data}",
  c=[
    'color:#808080;font-size:12px;font-family:"Helvetica Light", "Helvetica",Arial,sans-serif;font-weight:lighter;', 
    d.match(new RegExp(".{1,4}", "g")).map((r) => String.fromCodePoint(r)).join("")${projectName}${authorEntry}${contributorsEntry}${licenseEntry}${version},
    (x)=>x.replace(new RegExp("(\<|\>)", "g"),"").replace(new RegExp("\t", "g"), "&emsp;").replace(new RegExp("\n", "g"),"<br>")
  ];
  console.info("%c "+c[1],c[0]);

  window.addEventListener("keyup", (e) => {e.preventDefault();if(e.keyCode===112){const clBody=document.querySelector('.cl-body');if(clBody) clBody.remove();document.body.innerHTML += '<div class="cl-body" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);padding: 1em;font-size: 12px;font-family: Helvetica Light, Helvetica, Arial, sans-serif;font-weight: lighter;color: #808080;min-height: 200px;background: #fff;border-radius: 12px;border: 1px solid #ccccccb5;z-index: 999;"><span class="cl-x" style="position:absolute;top:10px;right:10px;cursor:pointer">&times;</span><div style="display:flex;justify-content:center;align-items:center;">'+
  c[2](c[1])
  +'</div></div>';document.querySelector('.cl-x').addEventListener("click", (e) => {e.preventDefault();if(e.target.classList.contains('cl-x')) document.querySelector('.cl-body').remove()});}})
})();`;

console.log(r);
