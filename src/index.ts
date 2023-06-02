import { addGlobalStyle } from "./utils";

// all CSS files imported like this will be included in the final bundle,
// and will be automatically minified and inserted into the site's <head> (see init()),
// so they are available globally on the website
import "./example.css";

// markdown is automatically parsed and converted to an HTML string which can be assigned to an element's innerHTML property
import changelogContent from "../changelog.md";

// HTML is imported as a simple string that can also be assigned to an element's innerHTML property
import exampleContent from "./example.html";

/**
 * Called whenever the script is initialized, depending on the value of `@run-at` inside the userscript header.  
 * Note: if you set `@run-at` to something like `document-end`, the `DOMContentLoaded` event may not be called depending on the userscript extension. In this case you may remove the onDomLoad() function and modify the DOM directly in init().
 */
function init() {
  const buildNbr = "{{BUILD_NUMBER}}";
  const buildNbrText = buildNbr !== "{{BUILD_NUMBER}}" ? `-${buildNbr}` : "";

  // watermark in the console based on values grabbed out of the userscript header
  console.log(`${GM.info.script.name} (${GM.info.script.version}${buildNbrText}) - ${GM.info.script.namespace}`);

  document.addEventListener("DOMContentLoaded", onDomLoad);

  // don't remove this - this string gets replaced with the minified bundle of all imported CSS files by the script in src/tools/post-build.ts
  addGlobalStyle("{{GLOBAL_STYLE}}");
}

/** In here you can freely insert or delete elements as the DOM is now guaranteed to be modifiable */
function onDomLoad() {
  // add a custom element with its contents set to an imported markdown file
  const changelogElement = document.createElement("div");
  // innerHTML is usually very unsafe but in this case we know the source can be trusted
  changelogElement.innerHTML = changelogContent;
  document.body.appendChild(changelogElement);

  // insert the contents of example.html into #some-random-element
  const randomElement = document.querySelector("#some-random-element");
  if(randomElement)
    randomElement.innerHTML = exampleContent;
}

init();
