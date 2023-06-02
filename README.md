<div style="text-align:center;" align="center">

<h1><img alt="icon" src="./assets/icon.png"><br>Userscript.ts</h1>

Typescript ESM template for making [userscripts](https://en.wikipedia.org/wiki/Userscript) that supports importing, parsing and minifying HTML, CSS, Markdown and misc. files directly in code, packing it all up with webpack and applying custom injections for the userscript header and more.  
It also offers ESLint to lint and auto-fix the code and GitHub Actions with CodeQL and ESLint to lint the code in CI and check it for vulnerabilities.  
  
Like this template? Please consider [supporting the development ❤️](https://github.com/sponsors/Sv443)

---
#### [Installation](#installation) &bull; [First&nbsp;steps](#first-steps) &bull; [Commands](#commands) &bull; [Development&nbsp;&&nbsp;Notes](#development-and-notes)

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
1. Inside `package.json`, update the properties `name`, `userscriptName`, `description`, `homepage`, `author`, `license` and `repository.url`
2. Modify the userscript header and variables at the top of `src/tools/post-build.ts` to whatever your heart desires (see [reference](https://wiki.greasespot.net/Metadata_Block))
3. The eslint configuration at `.eslintrc.cjs` is what I use, feel free to remove rules if there are too many or modify them to your preferences
4. Hook your own initialization functions in `init()` and `onDomLoad()` inside the entrypoint file at `src/index.ts` (read the comments for more info)
5. Refer to [commands](#commands) and [development](#development-and-notes)

<br>

## Commands:
| Command | Description |
| --- | --- |
| `npm i` | Run once to install dependencies |
| `npm run lint` | Lints the userscript with ESLint |
| `npm run build` | Builds the userscript with webpack |
| `npm run watch` | Watches, rebuilds and serves the userscript so it can be updated live (more info @ [development](#development-and-notes)) |
<!-- first column uses non-breaking space U+00A0 (' ') -->

<br>

## Development and Notes:
- If you're using the [ViolentMonkey extension](https://violentmonkey.github.io/) (which I recommend), after running the command `npm run watch`, you may open the URL shown in the console in your browser and select the `Track local file` option in the installation dialog.  
  This makes it so the userscript automatically updates when the code changes (reloading the website is still necessary).  
  Note: the tab needs to stay open on Firefox or the script won't keep updating itself.
- To see an example of how the code in `src/index.ts` will be packed, check out the file at [`dist/EXAMPLE.user.js`](./dist/EXAMPLE.user.js)
- Use an IDE like [VS Code](https://code.visualstudio.com/) so Intellisense and Typescript can work together to give you really awesome code completion and warn you about potential runtime errors before you even build the code.
- If you are using VS Code, install the ESLint extension ([`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)) and bind a hotkey for the `ESLint: Fix all auto-fixable problems` command so you can quickly format the currently active file according to the rules in `.eslintrc.cjs`
- The final bundled userscript file in the `dist/` folder should be committed and pushed to GitHub.  
  This way, the `@downloadURL` and `@updateURL` directives make it so the script is automatically updated from that same file.  
  For this to work properly, don't forget to bump the version in `package.json` if you want every user of your userscript to receive the update.
- The name of the emitted bundle inside `dist/` is bound to `userscriptName` in `package.json`  
  You may want to hard-code it or create a separate property for it if the userscript name contains characters that aren't allowed in a file path.

<br><br><br>

<div align="center" style="text-align: center;">

Made with ❤️ by [Sv443](https://github.com/Sv443)  
If you like this template, please consider [supporting me](https://github.com/sponsors/Sv443)  
  
© 2023 Sv443 - [WTFPL license](./LICENSE.txt)

</div>
