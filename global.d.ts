declare module "*.html" {
  /** Content of the HTML file as a string */
  const htmlContent: string;
  export default htmlContent;
}

declare module "*.md" {
  /** Content of the markdown file, converted to an HTML string */
  const htmlContent: string;
  export default htmlContent;
}
