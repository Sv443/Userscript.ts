import { readFile, writeFile, access, constants as fsconstants } from "fs/promises";
import { join, relative } from "path";
import { exec } from "child_process";
import dotenv from "dotenv";

import webpackCfg from "../../webpack.config.js";
import pkg from "../../package.json" assert { type: "json" };

const { env, exit } = process;
dotenv.config();


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
/**
 * Whether to trigger the bell sound in some terminals when the code has finished compiling
 */
const ringBell = env.RING_BELL && (env.RING_BELL.length > 0 && env.RING_BELL.trim().toLowerCase() !== "false");


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

// set and read persistent values
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

    const finalUserscript = `${header}\n${userscript}${userscript.endsWith("\n") ? "" : "\n"}`;

    // overwrite with finished userscript
    await writeFile(scriptPath, finalUserscript);

    const envText = env.NODE_ENV === "production" ? "\x1b[32mproduction" : "\x1b[33mdevelopment";
    const sizeKiB = (Buffer.byteLength(finalUserscript, "utf8") / 1024).toFixed(2);

    console.info(`Successfully built for ${envText}\x1b[0m`);
    lastCommitSha && console.info(`Build number (last commit SHA): \x1b[34m${lastCommitSha}\x1b[0m`);
    console.info(`Outputted file '${relative("./", scriptPath)}' with a size of \x1b[32m${sizeKiB} KiB\x1b[0m\n`);

    ringBell && process.stdout.write("\u0007");

    // schedule exit after I/O finishes
    setImmediate(() => exit(0));
  }
  catch(err) {
    console.error("Error while adding userscript header:");
    console.error(err);

    // schedule exit after I/O finishes
    setImmediate(() => exit(1));
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
