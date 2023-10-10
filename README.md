# Credits-log | Vite / Rollup plugin | so as not to leave the creators in a drawer of oblivion


[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
![npm](https://img.shields.io/npm/dm/credits-log?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcredits-log)

![logotype](logotype/logo.svg?raw=true)

"Credits-Log is a module for Rollup. When doing a "Build" it adds a small part of the code that shows the credits of creators in the console of the "FrontEnd" for example in Chrome, Firefox, IE or Safari.

It contains a CLI application from which you can add, remove or edit data to be displayed.
The message can have several lines and/or Logo in "ASCII".

![Screenshot](images/sceenshot.png)

## Installation process:
  1) run `npm i credits-log -G` for global installation of the ***CLI*** tool.
  2) run `npm i credits-log --save-dev` to integrate into your project
  3) run `credits-log --help` to see the commands
  4) in your project you just have to edit the `vite.config.js` file.

```javascript
//vite.config.json
import creditslog from "credits-log"

export default defineConfig({
    ...
    plugins: [
		    ...
        creditslog()
        ...
    ],
    ...
});
```

***Modifications that will be applied to your "Package.json" file***: Read attributes from your `package.json` file:
* `name: ""` (Optional)
* `projectName: "Name of your project"`
* `version: "0.0.1"`
* `"author": "Anthony Sychev <hello at dm211 dot com> https://dm211.com | https://twooneone.xyz",`
* `"author": ["Anthony Sychev <hello at dm211 dot com> https://dm211.com | https://twooneone.xyz", "..."],`
* `"contributors": [
		"name <email> (https://webpage)",
        ...
	]`
* `license: "MIT"`
* `credits`: []


## Cli 

For preview all help options run `credits-log --help`

* ***--install:*** Interactive installation step by step.
* ***--uninstall:*** This option remove from your file next parameters: `projectName`, `credits`.
* ***--check:*** It's show result of your configuration.

## Links

In this sites you can create your custom ASCII logotypes
* https://fsymbols.com/generators/carty/
* https://patorjk.com/software/taag/#p=display&f=Abraxis-Small&t=too
* https://manytools.org/hacker-tools/convert-images-to-ascii-art/go/

like this:

```javascript
▀█▀ █░█░█ █▀█   █▀█ █▄░█ █▀▀   █▀█ █▄░█ █▀▀
░█░ ▀▄▀▄▀ █▄█   █▄█ █░▀█ ██▄   █▄█ █░▀█ ██▄
```

```javascript
            -@@@:       =%@@%+                 
            @@@#      =@@@@@@+                
            -@@@#     :@@@@@@-                
             -@@@@+.    =++=.                 
               +@@@@@#+++++++=-.              
                 -*%@@@@@@@@@@@@#:            
                    -@@@@@@@@@@@@%            
                    -@@@@@@@@@%%@#            
                    -@@@@@@@@@*@@:            
                    -@@@@@@@@#%@#             
                    -@@@@@@@@*@@:             
                    -@@@@@@@@##*              
                    -@@@****@@@=              
                    -@@@:  .@@@=              
                    -@@@:  .@@@=              
                    -@@@:  .@@@=              
                    -@@@:  .@@@=              
                    -@@@:  .@@@=   
                    
            Thank you for use [CREDITS-LOG] 
                        ⌬ 211
```

### DOCS
Rollup.js: 
  * https://rollupjs.org/guide/en/#exporting
  * https://rollupjs.org/guide/en/#a-simple-example

### NPM Publish

NPM publish command: `npm publish --access=public ./`
