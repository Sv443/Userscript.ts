import { initConfig } from "./config";
import { buildNumber, scriptInfo } from "./constants";
import { initObservers } from "./observers";
import { addStyle, domLoaded } from "./utils";

/** Runs when the userscript is loaded initially */
async function init() {
  await initConfig();

  if(domLoaded)
    run();
  else
    document.addEventListener("DOMContentLoaded", run);
}

/** Runs after the DOM is available */
async function run() {
  try {
    console.log(`Initializing ${scriptInfo.name} v${scriptInfo.version} (#${buildNumber})...`);

    // post-build these double quotes are replaced by backticks (because if backticks are used here, the bundler converts them to double quotes)
    addStyle("#{{GLOBAL_STYLE}}", "global");

    initObservers();
  }
  catch(err) {
    console.error("Fatal error:", err);
    return;
  }
}

init();
