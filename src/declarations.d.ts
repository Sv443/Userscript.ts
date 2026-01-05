/** Import HTML as modules - https://stackoverflow.com/a/47705264/3323672 */
declare module "*.html" {
  /** Content of the HTML file as a string */
  const content: string;
  export default content;
}

declare module "*.css" {
  /** Content of the CSS file as a string */
  const content: string;
  export default content;
}

declare module "*.md" {
  interface Exports {
    /** Content of the markdown file, converted to an HTML string */
    html: string;
    metadata: Record<string, unknown>;
    filename: string;
    path: string;
  }
  export default {} as Exports;
}
