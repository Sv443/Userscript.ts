import { dirname, join } from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import pkg from "./package.json" assert { type: "json" };

export default {
  entry: "./src/index.ts",
  output: {
    filename: `${pkg.userscriptName}.user.js`,
    path: join(dirname(fileURLToPath(import.meta.url)), "/dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.md$/,
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
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader" /*, "sass-loader"*/],
      },
      // bundle and import any file as a string (install with `npm i -D raw-loader` first):
      // {
      //   test: /\.txt$/i,
      //   use: "raw-loader",
      // },
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
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
  devtool: "source-map",
};
