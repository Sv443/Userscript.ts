// all CSS files imported like this will be included in the final bundle,
// and will be automatically minified and inserted into the site's <head> (by the addGlobalStyle() in onDomLoad() in `index.ts`)
import "./example.css";

// markdown is automatically parsed and converted to an HTML string which can be assigned to an element's innerHTML property
import changelogContent from "../changelog.md";

// HTML is imported as a simple string that can also be assigned to an element's innerHTML property
import exampleContent from "./example.html";

/** Gets called after DOMContentLoaded is emitted in `index.ts` */
export function insertExampleElements() {
  // add a custom element with its contents set to an imported markdown file
  const changelogElement = document.createElement("div");
  // innerHTML is usually very unsafe but in this case we know the source can be trusted
  changelogElement.innerHTML = changelogContent;
  document.body.appendChild(changelogElement);

  // replace the content of the first div found in the document with the contents of example.html
  const randomElement = document.querySelector("div");
  if(randomElement)
    randomElement.innerHTML = exampleContent;
}
