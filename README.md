<div style="text-align:center;" align="center">

<h1><img alt="icon" src="./assets/icon.png"><br>Userscript.ts</h1>

Typescript ESM template for making [userscripts](https://en.wikipedia.org/wiki/Userscript) that supports importing and parsing HTML, CSS, Markdown and misc. files directly in code, packing it all up with webpack and applying custom injections for the userscript header and more.  
It also offers ESLint to lint and auto-fix the code and GitHub Actions with ESLint to lint the code in pull requests and CodeQL to check it for vulnerabilities on every push.  
  
Like this template? Please consider [supporting the development ❤️](https://github.com/sponsors/Sv443)

---
#### [Installation](#installation) &bull; [First&nbsp;steps](#first-steps) &bull; [Commands](#commands) &bull; [Development&nbsp;tips&nbsp;&&nbsp;notes](#development-tips-and-notes)

</div>
<br>

## Installation:
1. Make sure [Node.js](https://nodejs.org) and a userscript manager are installed (I recommend [ViolentMonkey](https://violentmonkey.github.io/))
2. [Click here](https://github.com/Sv443/Userscript.ts/generate) to create a repository on GitHub using this template
3. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the repository you created
4. Open a terminal in the root of the folder and use `npm i` to install dependencies
5. Refer to [first steps](#first-steps)

<br>

## First steps:
1. Copy `.env.template` to `.env` and change the values inside if needed
2. Inside `package.json`, update the properties `name`, `userscriptName`, `description`, `homepage`, `author`, `license` and `repository.url`
3. Replace the icon at `assets/icon.png` with your own or use [Google's or DuckDuckGo's favicon API](https://codepen.io/djekl/pen/QWKNNjv) in the userscript header
4. Replace the LICENSE.txt file with your own license or remove it if you want your code to be "all rights reserved"
5. Modify the variables and userscript header inside `src/tools/post-build.ts` to whatever you need (see also [GM header reference](https://wiki.greasespot.net/Metadata_Block))
6. The eslint configuration at `.eslintrc.cjs` is what I use, feel free to remove rules if there are too many or modify them to your preferences
7. Add your own initialization functions to `init()` and `onLoad()` inside the entrypoint file at `src/index.ts` (read the comments for more info)
8. Remove the example HTML, CSS and TS files
9. Refer to [commands](#commands) and [development](#development-tips-and-notes)

<br>

## Commands:
| Command | Description |
| --- | --- |
| `npm i` | Run once to install dependencies |
| `npm run lint` | Lints the userscript with ESLint |
| `npm run build-dev` | Builds the userscript in development mode (sourcemaps enabled) |
| `npm run build-prod` | Builds the userscript in production mode (optimized code, sourcemaps disabled) |
| `npm run dev` | Watches, rebuilds and serves the userscript so it can be updated live ([more info below](#development-tips-and-notes)) |
<!-- first column uses non-breaking space U+00A0 (' ') -->

<br>

## Development tips and notes:
- If you're using the [ViolentMonkey extension](https://violentmonkey.github.io/) (which I recommend), after running the command `npm run watch`, you may open the URL shown in the console in your browser and select the `Track local file` option in the installation dialog.  
  This makes it so the userscript automatically updates when the code changes (reloading the website is still necessary).  
  Note: the tab needs to stay open on Firefox or the script won't keep updating itself.
- My library [UserUtils](https://github.com/Sv443-Network/UserUtils) is already included as a dependency. It offers lots of utilities for userscripts like registering listeners for when CSS selectors exist, intercepting events, managing persistent user configurations, modifying the DOM more easily, various math and array functions and more. You can find the full list of features and its documentation [here.](https://github.com/Sv443-Network/UserUtils#table-of-contents)
- Libraries that are required at runtime should be declared inside `dependencies.json`, as long as they are hosted on a CDN and expose a global variable.  
  This way, they will be loaded using the `@require` directive and will be exempt from [minification rules](https://greasyfork.org/en/help/code-rules) on platforms like GreasyFork.  
  You may use a service like [jsDelivr](https://www.jsdelivr.com/) to include any npm library this way.  
  You will still be able to import and use the libraries as usual in your code.
- The final bundled userscript file in the `dist/` folder should be committed and pushed to GitHub.  
  This way, the `@downloadURL` and `@updateURL` directives make it so the script is automatically updated from that same file.  
  For this to work properly, don't forget to bump the version in `package.json` before building, so that every user of your userscript may receive the update.
- The name of the emitted bundle inside `dist/` is bound to `userscriptName` in `package.json`  
  You may want to hard-code it or create a separate property for it if the userscript name contains characters that aren't allowed in a file path.
- If you want other people to use your userscript, I recommend publishing it to [GreasyFork](https://greasyfork.org) and/or [OpenUserJS.](https://openuserjs.org)  
  Make sure to check out and follow their rules and guidelines before publishing.
- Use an IDE like [VS Code](https://code.visualstudio.com/) so Intellisense and Typescript can work together to give you really awesome code completion and warn you about potential runtime errors before you even build the code.
- If you are using VS Code, install the ESLint extension ([`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)) and bind a hotkey for the `ESLint: Fix all auto-fixable problems` command so you can quickly format the currently active file according to the rules in `.eslintrc.cjs`
- Try to get familiar with the [webpack config](https://webpack.js.org/configuration/) at `webpack.config.js`  
  In there you may add and configure webpack plugins and configure the build process.
- To see an example of how the code in `src/index.ts` will be packed in production mode, check out the file at [`dist/EXAMPLE.user.js`](./dist/EXAMPLE.user.js)

<br><br><br>

<div align="center" style="text-align: center;">

Made with ❤️ by [Sv443](https://github.com/Sv443)  
If you like this template, please consider [supporting me](https://github.com/sponsors/Sv443)  
  
© 2023 Sv443 - [WTFPL license](./LICENSE.txt)

</div>
