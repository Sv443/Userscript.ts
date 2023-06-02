// ==UserScript==
// @name            EXAMPLE
// @homepageURL     https://github.com/Sv443/Userscript.ts#readme
// @namespace       https://github.com/Sv443/Userscript.ts
// @version         0.1.0
// @description     EXAMPLE
// @license         WTFPL
// @author          Sv443
// @copyright       Sv443 (https://github.com/Sv443)
// @icon            https://raw.githubusercontent.com/Sv443/Userscript.ts/main/assets/icon.png
// @run-at          document-start
// @match           https://example.org/*
// @match           https://example.com/*
// @connect         self
// @connect         github.com
// @connect         githubusercontent.com
// @downloadURL     https://raw.githubusercontent.com/Sv443/Userscript.ts/main/dist/EXAMPLE.user.js
// @updateURL       https://raw.githubusercontent.com/Sv443/Userscript.ts/main/dist/EXAMPLE.user.js
// ==/UserScript==

// (I added line breaks for a little better readability)
(() => {
  "use strict";
  console.log(`${GM.info.script.name} (${GM.info.script.version}) - ${GM.info.script.namespace}`),
  document.addEventListener("DOMContentLoaded", (function() {
    const e = document.createElement("div");
    e.innerHTML = '\x3c!--\n## 0.2.0\n- ...\n\n<br>\n--\x3e <h2 id="010">0.1.0</h2> <ul> <li>Added base template</li> </ul> ';
    document.body.appendChild(e);
    const n = document.querySelector("#some-random-element");
    n && (n.innerHTML = '<div id="my-example-element"> You may import any HTML file in code and it will automatically be converted to an HTML string. Using it is as easy as creating an element and assigning its innerHTML this string. </div> ');
  })),
  function(e) {
    const n = document.createElement("style");
    n.innerHTML = `::root{--myscript-bg-col:#282c34;--myscript-fg-col:#fff}#my-example-element{background-color:var(--myscript-bg-col);color:var(--myscript-fg-col);font-family:Segoe UI,San Francisco,sans-serif;padding:10px}`;
    document.head.appendChild(n);
  }()
})();
