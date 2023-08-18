import { addGlobalStyle } from "@sv443-network/userutils";
import { insertExampleElements } from "./example";

/**
 * Called whenever the script is initialized, depending on the value of `@run-at` inside the userscript header.  
 * Note: if you set `@run-at` to something like `document-end`, the `DOMContentLoaded` event may not be called depending on the userscript extension. In this case you may remove the onDomLoad() function and modify the DOM directly in init().
 */
function init() {
  const buildNbr = "{{BUILD_NUMBER}}";
  const buildNbrText = !buildNbr.match(/^{{.+}}$/) ? `-${buildNbr}` : "";

  // watermark in the console based on values grabbed out of the userscript header
  console.log(`${GM.info.script.name} (${GM.info.script.version}${buildNbrText}) - ${GM.info.script.namespace}`);

  document.addEventListener("DOMContentLoaded", onLoad);
}

/** In here you can freely insert or delete elements as the DOM is now guaranteed to be modifiable */
function onLoad() {
  // this string gets replaced with the minified bundle of all imported CSS files by the script in src/tools/post-build.ts
  const globalStyle = "{{GLOBAL_STYLE}}";
  // if no css file is imported anywhere, no bundle is emitted and so addGlobalStyle has to be skipped
  if(!globalStyle.match(/^{{.+}}$/))
    addGlobalStyle(globalStyle);

  // go to this function's definition in `example.ts` for an example on how to import HTML, CSS and markdown
  insertExampleElements();
}

init();
