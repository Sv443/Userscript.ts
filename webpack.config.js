import { exec } from "child_process";
import dotenv from "dotenv";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import pkg from "./package.json" assert { type: "json" };

dotenv.config();

const mode = ["development", "production"].includes(process.env.NODE_ENV) ? process.env.NODE_ENV : "development";

export default {
  entry: "./src/index.ts",
  output: {
    filename: `${pkg.userscriptName}.user.js`,
    path: "/dist",
    clean: true,
  },
  mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
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
        test: /.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          // { loader: "sass-loader" }, // if you want to be able to import .scss files (install with `npm i -D sass-loader` first)
        ],
      },
      // bundle and import any file as a string (install with `npm i -D raw-loader` first):
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
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
          exec("npm run post-build", (err, stdout, stderr) => {
            if(err)
              console.error(`\x1b[31mError while calling post-build script:\x1b[0m\n${err}`);
            stdout && process.stdout.write(stdout);
            stderr && process.stderr.write(stderr);
          });
        });
      },
    },
  ],
  devtool: "source-map",
};
