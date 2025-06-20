<div style="text-align:center;" align="center">

<h1><img alt="icon" src="./assets/icon.png"><br>Userscript.ts</h1>

Extensive Typescript ESNext template and boilerplate for [userscripts.](https://en.wikipedia.org/wiki/Userscript)  
Supports importing and parsing HTML and Markdown files directly in code, packing it all up with rollup and applying custom injections for the userscript header and more.  
It also offers ESLint to lint and auto-fix the code and GitHub Actions with ESLint to lint the code in pull requests and CodeQL to check it for vulnerabilities on every push.  
Requires a Git repo to be used as the asset CDN and for the build versioning system of the userscript.  
Supports distribution on GitHub, GreasyFork and OpenUserJS out of the box.  
  
Like this template? Please consider [supporting the development ❤️](https://github.com/sponsors/Sv443)

---
#### [Installation](#installation) &bull; [First&nbsp;steps](#first-steps) &bull; [Project&nbsp;Structure](#project-structure) &bull; [Commands](#commands) &bull; [Development&nbsp;tips&nbsp;&&nbsp;notes](#development-tips-and-notes)

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
2. Search for `#REPLACE:` with your IDE in the entire project and replace all placeholders with your own values
3. Replace the icon at `assets/icon.png` with your own or use [Google's or DuckDuckGo's favicon API](https://codepen.io/djekl/pen/QWKNNjv) in the userscript header (see step 5)
4. Replace the LICENSE.txt file with your own license or remove it if you want your code to be "all rights reserved"  
  The `license` prop of `package.json` needs to have its [SPDX identifier](https://spdx.org/licenses) adjusted too! (Set it to `"UNLICENSED"` in case of "all rights reserved")
5. Modify the userscript header inside `src/tools/post-build.ts` to whatever you need (see also [GM header reference](https://wiki.greasespot.net/Metadata_Block))
6. The eslint configuration at `.eslintrc.cjs` is what I use, feel free to remove rules if there are too many or modify them to your preferences
7. Refer to the entrypoints `init()` and `run()` inside the file `src/index.ts` for hooking up your own runtime code. Read the comments in said file for more info.
8. Next, refer to the sections [project structure](#project-structure), [commands](#commands) and [development](#development-tips-and-notes).  
  If you need a real world example, you can take a look at my [BetterYTM](https://github.com/Sv443/BetterYTM) project, which was the origin of this template.

<br>

## Project structure:
- **`assets/`**  
  Contains all the assets that are used in the userscript, like images, stylesheets, and any other misc files.
  - **`assets/require.json`**  
    Contains a list of all modules that should be loaded using the `@require` directive.  
    Props:  
    - `pkgName` (required) - The npm name of the package
    - `baseUrl` - The base URL of the CDN to load from (defaults to `https://cdn.jsdelivr.net/npm/`)
    - `path` - The path to the file inside the package (uses jsdelivr's standard path by default)
    - `link` - Set this to `true` if you have linked this package locally using [`npm link`](https://docs.npmjs.com/cli/v8/commands/npm-link) and want to explicitly have the latest code included in the bundle.
  - **`assets/resources.json`**  
    Contains a list of all resources that should be loaded using the `@resource` directive.  
    This is useful for loading files like stylesheets, images, and other assets that should not be included in the code bundle, but loaded in and cached by the userscript extension.  
    The object's key is used with the `getResourceUrl()` function in `src/utils.ts` to get the URL of the resource. The value is the path to the file inside the `assets/` folder.  
    If the path starts with a slash, it will be resolved relative to the root of the project (where the `package.json` file is located).
- **`src/`**  
  Contains all the source files for the userscript.  
  - **`src/tools/`**  
    Contains all scripts that are used in the build process.  
    - **`src/tools/post-build.ts`**  
      Contains the post-build script that is run after the userscript is built.  
      This script inserts the userscript header and other custom injections into the final userscript file.  
      If you need to modify userscript directives or add custom injections, this is the place to do it.
    - **`src/tools/serve.ts`**  
      Contains the development server that serves the userscript on port 8710 (by default).
  - **`src/index.ts`**  
    The entrypoint for the userscript. This is where you should call your own code from.
  - **`src/config.ts`**  
    This file contains the DataStore instance that should be used to hold your userscript's configuration object.  
    The DataStore class is very powerful and does a lot of the heavy lifting for you. More instances can also be created to hold different types of data that should be persisted between sessions, cached in-memory for fast, synchronous access and be tagged with a version number, so migration functions can be used to migrate the data to any upcoming format.  
    For more info, please read the [DataStore documentation.](https://github.com/Sv443-Network/UserUtils/blob/main/docs.md#datastore)
  - **`src/constants.ts`**  
    Contains some constant variables that are used throughout the userscript's runtime code.  
    This is where arguments are injected into the userscript's runtime code by `tools/post-build.ts`
  - **`src/declarations.d.ts`**  
    The declarations in this file allow you to import HTML and MD files directly in your code, using rollup plugins.
  - **`src/observers.ts`**  
    This file should be filled up with many `SelectorObserver` instances. These observe a designated part of the DOM for changes.  
    With the function `addSelectorListener()`, you can then add a listener, given a specific CSS selector, that gets called when the selector has been found in the DOM.  
    For more info, please read the [SelectorObserver documentation.](https://github.com/Sv443-Network/UserUtils/blob/main/docs.md#selectorobserver)
  - **`src/types.ts`**  
    Contains all generic TypeScript types that are used in multiple files.  
  - **`src/utils.ts`**  
    Contains utility functions that are used throughout the userscript's runtime code.  
    This is where you should put functions that are used in multiple places in your code.  
    Once it gets too big you should split it up into multiple files.


<br>

## Commands:
- **`npm i`**  
  Run once to install dependencies
- **`npm run dev`**  
  This is the command you want to use to locally develop and test your script.  
  It watches for any changes, then rebuilds and serves the userscript on port 8710, so it can be updated live if set up correctly in the userscript manager (see [development tips](#development-tips-and-notes)).  
  Once it has finished building, a link will be printed to the console. Open it to install the userscript.  
  You can also configure request logging and more in `.env` and `src/tools/serve.ts`, just make sure to restart the dev server after changing anything.  
- **`npm run build-prod`**  
  Builds the userscript for production for all host platforms (GitHub, GreasyFork and OpenUserJS) with their respective options already set.  
  Outputs the files using a suffix predefined in the `package.json` file.  
  Use this to build the userscript for distribution on all hosts.
- **`npm run build -- <arguments>`**  
  Builds the userscript with custom options  
  Arguments:  
  - `--config-mode=<value>` - The mode to build in. Can be either `production` or `development` (default)
  - `--config-branch=<value>` - The GitHub branch to target. Can be any branch name, but should be `main` for production and `develop` for development (default)
  - `--config-host=<value>` - The host to build for. Can be either `github` (default), `greasyfork` or `openuserjs`
  - `--config-assetSource=<value>` - Where to get the resource files from. Can be either `local` or `github` (default)
  - `--config-suffix=<value>` - Suffix to add just before the `.user.js` extension. Defaults to an empty string
    
  Shorthand commands:
  - `npm run build-prod-base` - Sets `--config-mode=production` and `--config-branch=main`  
    Used for building for production, targeting the main branch
  - `npm run build-develop` - Sets `--config-mode=development`, `--config-branch=develop` and `--config-assetSource=github`  
    Used for building for experimental versions, targeting the develop branch
- **`npm run lint`**  
  Builds the userscript with the TypeScript compiler and lints it with ESLint. Doesn't verify *all* of the functionality of the script, only syntax and TypeScript errors!
- **`npm run --silent invisible -- "<command>"`**  
  Runs the passed command as a detached child process without giving any console output.  
  Remove `--silent` to see npm's info and error messages.
- **`npm run node-ts -- <path>`**  
  Runs the TypeScript file at the given path using the regular node binary and the node-ts loader.  
  Also enables source map support and disables experimental warnings.

<br>

## Development tips and notes:
- If you're using the [ViolentMonkey extension](https://violentmonkey.github.io/) (which I recommend), after running the command `npm run watch`, you may open the URL shown in the console in your browser and select the `Track local file` option in the installation dialog.  
  This makes it so the userscript automatically updates when the code changes (reloading the website is still necessary).  
  Note: the tab needs to stay open on Firefox or the script won't keep updating itself.
- My library [UserUtils](https://github.com/Sv443-Network/UserUtils) is already included as a dependency. It offers lots of utilities for userscripts like registering listeners for when CSS selectors exist, intercepting events, creating persistent JSON databases, modifying the DOM more easily, various math and array functions and more. You can find the full list of features and their documentation [here.](https://github.com/Sv443-Network/UserUtils/blob/main/docs.md#table-of-contents)
- Libraries that are required at runtime should be declared inside `require.json`, as long as they are hosted on a CDN and expose a global variable.  
  This way, they will be loaded using the `@require` directive and will be exempt from [minification rules](https://greasyfork.org/en/help/code-rules) on platforms like GreasyFork.  
  You may use a service like [jsDelivr](https://www.jsdelivr.com/) to include any npm library this way.  
  You will still be able to import and use the libraries as usual in your code, the bundler will handle everything else.
- The final bundled userscript file in the `dist/` folder should be committed and pushed to GitHub.  
  This way, the `@downloadURL` and `@updateURL` directives make it so the script is automatically updated from that same file.  
  For this to work properly, don't forget to bump the version in `package.json` before building, so that every user of your userscript may receive the update.
- The name of the emitted bundle inside `dist/` is bound to `userscriptName` in `package.json`  
  You may want to hard-code it or create a separate property for it if the userscript name contains characters that aren't allowed in a file path.
- If you want other people to use your userscript, I recommend publishing it to [GreasyFork](https://greasyfork.org) and/or [OpenUserJS.](https://openuserjs.org)  
  Make sure to check out and follow their rules and guidelines before publishing.
- Use an IDE like [VS Code](https://code.visualstudio.com/) so Intellisense and Typescript can work together to give you really awesome code completion and warn you about potential runtime errors before you even build the code.
- If you are using VS Code, install the ESLint extension ([`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)) and bind a hotkey for the `ESLint: Fix all auto-fixable problems` command so you can quickly format the currently active file according to the rules in `.eslintrc.cjs`
- Try to get familiar with the [rollup config](https://rollupjs.org/configuration-options/) at `rollup.config.mjs`  
  In there you may add and configure rollup plugins and configure the build process.

<br><br><br>

<div align="center" style="text-align: center;">

Made with ❤️ by [Sv443](https://github.com/Sv443)  
If you like this template, please consider [supporting me](https://github.com/sponsors/Sv443)  
  
© 2024 Sv443 - [WTFPL license](./LICENSE.txt)

</div>
