import { insertExampleElements } from "./example";
import { addGlobalStyle } from "./utils";

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
}

/** In here you can freely insert or delete elements as the DOM is now guaranteed to be modifiable */
function onDomLoad() {
  // don't remove this - this string gets replaced with the minified bundle of all imported CSS files by the script in src/tools/post-build.ts
  addGlobalStyle("{{GLOBAL_STYLE}}");

  // go to this function's definition in `example.ts` for an example on how to import HTML, CSS and markdown
  insertExampleElements();
}

init();
