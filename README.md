# Credits-log | Vite / Rollup plugin

![logotype](logotype/logo.svg?raw=true)

Add credits message in debug console to your FrontEnd project's. 
Showing credits and / or ASCII logotype.

***Idea***: Read attributes from your `package.json` file:
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

and show it on debug panel.

![Screenshot](images/sceenshot.png)

## Install

First install dependece you have two choices 
   1) `npm i credits-log -g` with cli tool
   2) `npm i credits-log --save-dev` only Vite / Rollup plugin


In your Vite or Rollup config file add import and use `creditslog()` function in plugins section like this: 

```javascript
import { creditslog } from "credits-log"

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

## Cli 

For preview all help options run `credits-log help`

* ***install:*** Interactive installation step by step.
* ***uninstall:*** This option remove from your file next parameters: `projectName`, `credits`.
* ***check:*** It's show result of your configuration.

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