<div style="text-align:center;" align="center">

<h1><img alt="icon" src="./assets/icon.png"><br>Userscript.ts</h1>

Typescript template for making [userscripts](https://en.wikipedia.org/wiki/Userscript) that supports importing, parsing and minifying HTML, CSS, Markdown and misc. files directly in code, packing it all up with webpack and applying custom injections for the userscript header and more.  
  
Like this template? Please consider [supporting the development ❤️](https://github.com/sponsors/Sv443)

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
1. Inside `package.json`, change the properties `name`, `userscriptName`, `description`, `description:de`, `homepage`, `author`, `license` and `repository.url`
2. Modify the userscript header and variables at the top of `src/tools/post-build.ts`
3. The eslint configuration at `.eslintrc.cjs` is what I use, feel free to remove rules if there are too many or modify them to your preferences
4. Hook your own initialization functions in `init()` and `onDomLoad()` inside `src/index.ts` (read the comments for more info)
5. Refer to [commands](#commands) and [development](#development)

<br>

## Commands:
| Command | Description |
| --- | --- |
| `npm i` | Run once to install dependencies |
| `npm run lint` | Lints the userscript with ESLint |
| `npm run build` | Builds the userscript with webpack |
| `npm run watch` | Watches, rebuilds and serves the userscript so it can be updated live (more info @ [development](#development)) |
<!-- first column uses non-breaking space U+00A0 (' ') -->

<br>

## Development:
- Use an IDE like [VS Code](https://code.visualstudio.com/) so Intellisense and Typescript can work together to give you really awesome code completion and warn you about potential runtime errors before you even build the code.
- If you're using the [ViolentMonkey extension](https://violentmonkey.github.io/) (which I recommend), after running the command `npm run watch`, you may open the URL shown in the console in your browser and select the `Track local file` option in the installation dialog.  
  This makes it so the userscript automatically updates when the code changes (reloading the website is still necessary).  
  Note: the tab needs to stay open on Firefox or the script won't keep updating itself.

<br><br><br>

<div align="center" style="text-align: center;">

Made with ❤️ by [Sv443](https://github.com/Sv443)  
If you like this template, please consider [supporting me](https://github.com/sponsors/Sv443)  
  
© 2023 Sv443 - [WTFPL license](./LICENSE.txt)

</div>
