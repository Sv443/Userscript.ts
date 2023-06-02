import { readFile, writeFile, stat, access, constants as fsconstants } from "fs/promises";
import { join } from "path";
import { exec } from "child_process";

import webpackCfg from "../../webpack.config.js";
import pkg from "../../package.json" assert { type: "json" };


/**
 * Namespace (user or organization) and repository name, separated by a slash.  
 * Don't add slashes at the beginning or end!
 */
const repo = "Sv443/Userscript.ts";
/**
 * Which URLs should the userscript be active on?  
 * See https://wiki.greasespot.net/Metadata_Block#%40match
 */
const matchUrls = [
  "https://example.org/*", "https://example.com/*"
];
/**
 * URL to the icon of the userscript.  
 * Recommended size is 32x32
 */
const iconUrl = `https://raw.githubusercontent.com/${repo}/main/assets/icon.png`;
/**
 * Whether to inject a build number (last Git commit SHA) anywhere where there's the text {{BUILD_NUMBER}} in the userscript.  
 * See `index.ts` for an example.
 */
const injectBuildNbr = true;


const userscriptDistFile = webpackCfg.output.filename;
const distFolderPath = webpackCfg.output.path;
const scriptUrl = `https://raw.githubusercontent.com/${repo}/main/dist/${userscriptDistFile}`;
const matchDirectives = matchUrls.reduce((a, c) => a + `// @match           ${c}\n`, "");

/** See https://wiki.greasespot.net/Metadata_Block */
const header = `\
// ==UserScript==
// @name            ${pkg.userscriptName}
// @homepageURL     ${pkg.homepage}#readme
// @namespace       ${pkg.homepage}
// @version         ${pkg.version}
// @description     ${pkg.description}
// @license         ${pkg.license}
// @author          ${pkg.author.name}
// @copyright       ${pkg.author.name} (${pkg.author.url})
// @icon            ${iconUrl}
// @run-at          document-start
${matchDirectives}\
// @connect         self
// @connect         github.com
// @connect         githubusercontent.com
// @downloadURL     ${scriptUrl}
// @updateURL       ${scriptUrl}
// ==/UserScript==
`;

// other directives you might want to add:

// for help with localization, see https://wiki.greasespot.net/Metadata_Block#@name
// @name:de         ${pkg["userscriptName:de"]}
// @description:de  ${pkg["description:de"]}

// @grant           GM.setValue
// @grant           GM.getValue


(async () => {
  try {
    // const rootPath = join(dirname(fileURLToPath(import.meta.url)), "../../");
    const lastCommitSha = injectBuildNbr ? await getLastCommitSha() : undefined;
    const scriptPath = join(distFolderPath, userscriptDistFile);
    const globalStylePath = join(distFolderPath, "main.css");
    const globalStyle = await exists(globalStylePath) ? String(await readFile(globalStylePath)).replace(/\n\s*\/\*.+\*\//gm, "") : undefined;

    // read userscript
    const userscriptRaw = String(await readFile(scriptPath));

    // inject values if found
    let userscript = userscriptRaw;

    if(globalStyle)
      userscript = userscript.replace(/"{{GLOBAL_STYLE}}"/gm, `\`${globalStyle}\``);
    if(lastCommitSha)
      userscript = userscript.replace(/\/?\*?{{BUILD_NUMBER}}\*?\/?/gm, lastCommitSha);

    // overwrite with finished userscript
    await writeFile(scriptPath, `${header}\n${userscript}${userscript.endsWith("\n") ? "" : "\n"}`);

    console.info("Successfully added the userscript header.");
    // console.info(`Build number: ${lastCommitSha}`);
    console.info(`Final size is \x1b[32m${((await stat(scriptPath)).size / 1024).toFixed(2)} KiB\x1b[0m\n`);
  }
  catch(err) {
    console.error("Error while adding userscript header:");
    console.error(err);
    setImmediate(() => process.exit(1));
  }
})();

// utility functions:

/** Tests if the current user has read and write access to the file at the given `path` and by extension, if it exists in the first place */
async function exists(path: string) {
  try {
    await access(path, fsconstants.R_OK | fsconstants.W_OK);
    return true;
  }
  catch(err) {
    return false;
  }
}

/**
 * Returns the first 7 characters of the last git commit SHA1 hash.  
 * This is used as a kind of historically traceable build number, though note it is always behind by at least one commit,
 * because the act of putting this number in the userscript changes the hash again, indefinitely.
 */
function getLastCommitSha() {
  return new Promise<string>((res, rej) => {
    exec("git rev-parse HEAD", (err, stdout, stderr) => {
      if(err) {
        console.error("\x1b[31mError while checking for last Git commit. Do you have Git installed?\x1b[0m\n", stderr);
        return rej(err);
      }
      return res(String(stdout).replace(/\r?\n/gm, "").trim().substring(0, 7));
    });
  });
}
