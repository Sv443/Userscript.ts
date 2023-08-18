/**
 * All imported HTML files will automatically be converted to a string of HTML and inlined in the bundle.
 * @example ```ts
 * import htmlContent from "./template.html";
 * console.log(htmlContent); // "<h1>My HTML</h1>"
 * ```
 */
declare module "*.html" {
  /** Content of the HTML file as a string */
  const htmlContent: string;
  export default htmlContent;
}

/**
 * All CSS files that are imported by the entrypoint file or its dependencies will be bundled into a single CSS file in the dist folder.  
 * The `tools/post-build.ts` script will inject this bundle into the userscript after building is finished (see also `src/index.ts`).
 * @example ```ts
 * import "./styles/main.css";
 * import "some-package/dist/style.css";
 * ```
 */
declare module "*.css" {}

/**
 * All imported Markdown files will automatically be converted to an HTML string and inlined in the bundle.
 * @example ```ts
 * import htmlContent from "./README.md";
 * console.log(htmlContent); // "<h1>My cool project</h1><br><b>...</b>"
 * ```
 */
declare module "*.md" {
  /** Content of the markdown file, converted to an HTML string */
  const htmlContent: string;
  export default htmlContent;
}
