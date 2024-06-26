import pluginTypeScript from "@rollup/plugin-typescript";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
import pluginJson from "@rollup/plugin-json";
import pluginHtml from "rollup-plugin-html";
import pluginCss from "rollup-plugin-import-css";
import pluginExecute from "rollup-plugin-execute";
import typescript from "typescript";

import pkg from "./package.json" assert { type: "json" };
import requireJson from "./assets/require.json" assert { type: "json" };

const globalPkgs = requireJson.reduce((acc, pkg) => {
  acc[pkg.pkgName] = pkg.global;
  return acc;
}, {});

const externalPkgs = requireJson.map(pkg => pkg.pkgName);

const outputDir = "dist";
const outputFile = getOutputFileName();

/** @param {string} [suffix] */
function getOutputFileName(suffix) {
  return `${pkg.userscriptName}${suffix ?? ""}.user.js`;
}

export default (/**@type {import("./src/types").RollupArgs}*/ args) => (async () => {
  /** @type {import("./src/types").RollupArgs} */
  const passCliArgs = {
    mode: args["config-mode"] ?? (process.env.NODE_ENV === "production" ? "production" : "development"),
    host: args["config-host"] ?? "github",
    assetSource: args["config-assetSource"] ?? "github",
    suffix: args["config-suffix"] ?? "",
  };
  const passCliArgsStr = Object.entries(passCliArgs).map(([key, value]) => `--${key}=${value}`).join(" ");

  const { mode, suffix } = passCliArgs;

  const linkedPkgs = requireJson.filter((pkg) => pkg.link === true);

  /** @type {import("rollup").RollupOptions} */
  const config = {
    input: "src/index.ts",
    plugins: [
      pluginNodeResolve({
        extensions: [".ts", ".mts", ".json"],
      }),
      pluginTypeScript({
        typescript,
        sourceMap: mode === "development",
      }),
      pluginJson(),
      pluginHtml(),
      pluginCss({
        output: "global.css",
      }),
      pluginExecute([
        `npm run --silent post-build -- ${passCliArgsStr}`,
        // #MARKER run own commands after build:
        // ...(mode === "development" ? ["npm run --silent invisible -- \"echo 'dev-only command'\""] : []),
      ]),
    ],
    output: {
      file: `${outputDir}/${getOutputFileName(suffix)}`,
      format: "iife",
      sourcemap: mode === "development",
      compact: mode === "development",
      globals: linkedPkgs.length > 0 ? Object.fromEntries(
        Object.entries(globalPkgs).filter(([key]) => !linkedPkgs.some((pkg) => pkg.pkgName === key))
      ) : globalPkgs,
    },
    onwarn(warning) {
      // ignore circular dependency warnings
      if(warning.code !== "CIRCULAR_DEPENDENCY") {
        const { message, ...rest } = warning;
        console.error(`\x1b[33m(!)\x1b[0m ${message}\n`, rest);
      }
    },
    external: linkedPkgs.length > 0 ? externalPkgs.filter(p => !linkedPkgs.map(lp => lp.pkgName).includes(p)) : externalPkgs,
  };

  return config;
})();

export { outputDir, outputFile };
