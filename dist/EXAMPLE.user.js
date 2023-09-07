// ==UserScript==
// @name            Userscript.ts Example
// @homepageURL     https://github.com/Sv443/Userscript.ts#readme
// @namespace       https://github.com/Sv443/Userscript.ts
// @version         0.1.0
// @description     Example script - install and visit example.org for a quick and dirty demo
// @license         WTFPL
// @author          Sv443
// @copyright       Sv443 (https://github.com/Sv443)
// @icon            https://raw.githubusercontent.com/Sv443/Userscript.ts/main/assets/icon.png
// @run-at          document-start
// @match           https://example.org/*
// @match           https://example.com/*
// @require         https://greasyfork.org/scripts/472956-userutils/code/UserUtils.js
// @downloadURL     https://raw.githubusercontent.com/Sv443/Userscript.ts/main/dist/EXAMPLE.user.js
// @updateURL       https://raw.githubusercontent.com/Sv443/Userscript.ts/main/dist/EXAMPLE.user.js
// ==/UserScript==

// this code was built in production mode with `npm run build-prod`

var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "UserUtils"
const external_UserUtils_namespaceObject = UserUtils;
;// CONCATENATED MODULE: ./changelog.md
// Module
var code = "<!--\n## 0.2.0\n- ...\n\n<br>\n--> <h2 id=\"010\">0.1.0</h2> <ul> <li>Initial release</li> </ul> ";
// Exports
/* harmony default export */ const changelog = (code);
;// CONCATENATED MODULE: ./src/example.html
// Module
var example_code = "<div id=\"my-example-element\"> You may import any HTML file in code and it will automatically be converted to an HTML string. Using it is as easy as creating an element and assigning its innerHTML this string. </div> ";
// Exports
/* harmony default export */ const example = (example_code);
;// CONCATENATED MODULE: ./src/example.ts
// all CSS files imported like this will be included in the final bundle,
// and will be automatically minified and inserted into the site's <head> (by the addGlobalStyle() in onDomLoad() in `index.ts`)

// markdown is automatically parsed and converted to an HTML string which can be assigned to an element's innerHTML property

// HTML is imported as a simple string that can also be assigned to an element's innerHTML property

/** Gets called after DOMContentLoaded is emitted in `index.ts` */
function insertExampleElements() {
    // add a custom element with its contents set to an imported markdown file
    const changelogElement = document.createElement("div");
    // innerHTML is usually very unsafe but in this case we know the source can be trusted
    changelogElement.innerHTML = changelog;
    document.body.appendChild(changelogElement);
    // replace the content of the first div found in the document with the contents of example.html
    const randomElement = document.querySelector("div");
    if (randomElement)
        randomElement.innerHTML = example;
}

;// CONCATENATED MODULE: ./src/index.ts


/**
 * Called whenever the script is initialized, depending on the value of `@run-at` inside the userscript header.
 * Note: if you set `@run-at` to something like `document-end`, the `DOMContentLoaded` event may not be called depending on the userscript extension. In this case you may remove the onDomLoad() function and modify the DOM directly in init().
 */
function init() {
    const buildNbr = "301fc8c";
    const buildNbrText = !buildNbr.match(/^{{.+}}$/) ? `-${buildNbr}` : "";
    // watermark in the console based on values grabbed out of the userscript header
    console.log(`${GM.info.script.name} (${GM.info.script.version}${buildNbrText}) - ${GM.info.script.namespace}`);
    document.addEventListener("DOMContentLoaded", onLoad);
}
/** In here you can freely insert or delete elements as the DOM is now guaranteed to be modifiable */
function onLoad() {
    // this string gets replaced with the minified bundle of all imported CSS files by the script in src/tools/post-build.ts
    const globalStyle = `:root {
    --myscript-bg-col: #282c34;
    --myscript-fg-col: white;
}

#my-example-element {
    padding: 10px;
    background-color: var(--myscript-bg-col);
    color: var(--myscript-fg-col);
    font-family: "Segoe UI", "San Francisco", sans-serif;
}

`;
    // if no css file is imported anywhere, no bundle is emitted and so addGlobalStyle has to be skipped
    if (!globalStyle.match(/^{{.+}}$/))
        (0,external_UserUtils_namespaceObject.addGlobalStyle)(globalStyle);
    // go to this function's definition in `example.ts` for an example on how to import HTML, CSS and markdown
    insertExampleElements();
}
init();
