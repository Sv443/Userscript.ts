import { exec } from "child_process";
import dotenv from "dotenv";
import { resolve } from "path";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import pkg from "./package.json" assert { type: "json" };

dotenv.config();

/** Set to true to suppress all webpack output but errors */
const silent = true;

const defaultMode = ["development", "production"].includes(process.env.NODE_ENV) ? String(process.env.NODE_ENV) : "development";

const output = {
  filename: `${pkg.userscriptName}.user.js`,
  path: resolve("./dist"),
  clean: true,
  module: true,
};

/** @param {import("./src/types").WebpackEnv} env */
const getConfig = (env) => {
  const mode = env.mode ?? defaultMode;
  /** @type {import("webpack-cli").ConfigOptions} */
  const cfg = {
    entry: "./src/index.ts",
    output,
    mode,
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.html?$/i,
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
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader" },
            // { loader: "sass-loader" }, // if you want to be able to import .scss files (install with `npm i -D sass-loader` first)
          ],
        },
        // import any file as a string (install with `npm i -D raw-loader` first):
        // {
        //   test: /\.txt$/i,
        //   use: "raw-loader",
        // },
      ],
    },
    resolve: {
      extensions: [
        ".ts",
        ".js",
        ".css",
        // ".scss",
        ".md",
      ],
    },
    // enable sourcemaps if NODE_ENV === "development"
    ...(mode === "development" ? { devtool: "source-map" } : {}),
    ...(silent ? { stats: "errors-only", } : {}),
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // name of the emitted css bundle
        // if this is changed, globalStylePath in post-build.ts must be changed too
        filename: "global.css",
      }),
      {
        apply: (compiler) => {
          console.log("Running post-build script...");
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
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

export default getConfig;
export { output };
