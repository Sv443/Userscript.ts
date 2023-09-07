import { exec } from "child_process";
import dotenv from "dotenv";
import { resolve } from "path";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import pkg from "./package.json" assert { type: "json" };
import deps from "./dependencies.json" assert { type: "json" };

dotenv.config();

/** Set to true to suppress all webpack output but errors */
const silent = true;

/** If no "mode" argument is passed to the webpack command, the value of NODE_ENV or "development" is used as a fallback */
const defaultMode = ["development", "production"].includes(process.env.NODE_ENV) ? String(process.env.NODE_ENV) : "development";

export const output = {
  filename: `${pkg.userscriptName}.user.js`,
  path: resolve("./dist"),
  clean: true,
  module: true,
};

/** @param {({ "mode": boolean })} env */
export default (env) => {
  const mode = env.mode ?? defaultMode;

  const externals = Object.entries(deps)
    .reduce((acc, [name, value]) => {
      acc[name] = value.global;
      return acc;
    }, {});

  /** @type {import("webpack-cli").WebpackConfiguration} */
  const cfg = {
    entry: "./src/index.ts",
    output,
    mode,
    target: "web",
    experiments: {
      outputModule: true,
    },
    externalsType: "var",
    externals,
    optimization: {
      moduleIds: "named",
      // since sites like greasyfork don't allow minified userscripts:
      minimize: false,
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(htm|html)$/i,
          loader: "html-loader",
        },
        {
          test: /\.md$/i,
          use: [
            {
              loader: "html-loader",
            },
            {
              loader: "markdown-loader",
            },
          ],
        },
        {
          test: /\.css$/i,
          // test: /\.(scss|css)$/i, // replace above with this when using sass-loader
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader" },
            // { loader: "sass-loader" }, // uncomment if you want to be able to import and compile .scss files (also install with `npm i -D sass-loader`)
          ],
        },
        // uncomment to import any file as a string (install with `npm i -D raw-loader`):
        // {
        //   test: /\.txt$/i,
        //   use: "raw-loader",
        // },
      ],
    },
    resolve: {
      extensions: [
        ".ts",
        ".tsx",
        ".js",
      ],
    },
    // enable sourcemaps if NODE_ENV === "development"
    ...(mode === "development" ? { devtool: "source-map" } : {}),
    ...(silent ? { stats: "errors-only", } : {}),
    plugins: [
      new MiniCssExtractPlugin({
        // name of the emitted css bundle
        // if this is changed, the value of globalStylePath in post-build.ts must be changed too
        filename: "global.css",
      }),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
            console.log("Running post-build script...");
            exec(`npm run --silent post-build -- mode=${env.mode ?? defaultMode}`, (err, stdout, stderr) => {
              if(err)
                console.error(`\x1b[31mError while calling post-build script:\x1b[0m\n${err}`);
              stdout && process.stdout.write(stdout);
              stderr && process.stderr.write(stderr);
            });
          });
        },
      },
    ],
  };
  return cfg;
};
