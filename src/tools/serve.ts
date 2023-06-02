import express, { NextFunction, Request, Response } from "express";
import webpackCfg from "../../webpack.config.js";
import { relative } from "path";
const app = express();

/** HTTP port of the dev server */
const devServerPort = 8710;
/** Whether to log requests to the console */
const enableLogging = false;
/** Whether to make a bell sound (in some terminals) when the userscript is ready to be fetched */
const ringBell = true;

app.use((_req, _res, next) => {
  enableLogging && process.stdout.write("*");
  next();
});

app.use((err: unknown, _req: Request, _res: Response, _next: NextFunction) => {
  if(typeof err === "string" || err instanceof Error)
    console.error("\x1b[31mError in dev server:\x1b[0m\n", err);
});

app.use(express.static(relative("../../", webpackCfg.output.path), {
  etag: false,
  maxAge: 5_000,
}));

app.listen(devServerPort, "0.0.0.0", () => {
  console.log(`The dev server is running.\nUserscript is served at \x1b[34m\x1b[4mhttp://localhost:${devServerPort}/${webpackCfg.output.filename}\x1b[0m`);
  if(enableLogging)
    process.stdout.write("\nRequests: ");
  else
    console.log("\x1b[2m(request logging is disabled)\x1b[0m");
  ringBell && process.stdout.write("\u0007");
});
