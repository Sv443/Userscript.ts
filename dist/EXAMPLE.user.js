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

// this code was built in production mode with `npm run build-prod`

var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@sv443-network/userutils/dist/index.mjs
var h=Object.defineProperty,y=Object.defineProperties;var g=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var f=(t,e,n)=>e in t?h(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,c=(t,e)=>{for(var n in e||(e={}))w.call(e,n)&&f(t,n,e[n]);if(p)for(var n of p(e))v.call(e,n)&&f(t,n,e[n]);return t},b=(t,e)=>y(t,g(e));var T=(t,e,n)=>new Promise((r,o)=>{var i=s=>{try{a(n.next(s));}catch(m){o(m);}},u=s=>{try{a(n.throw(s));}catch(m){o(m);}},a=s=>s.done?r(s.value):Promise.resolve(s.value).then(i,u);a((n=n.apply(t,e)).next());});function S(t,e,n){return Math.max(Math.min(t,n),e)}function A(t,e,n,r,o){return Number(e)===0&&Number(r)===0?t*(o/n):(t-e)*((o-r)/(n-e))+r}function d(...t){let e,n;if(typeof t[0]=="number"&&typeof t[1]=="number")[e,n]=t;else if(typeof t[0]=="number"&&typeof t[1]!="number")e=0,n=t[0];else throw new TypeError(`Wrong parameter(s) provided - expected: "number" and "number|undefined", got: "${typeof t[0]}" and "${typeof t[1]}"`);if(e=Number(e),n=Number(n),isNaN(e)||isNaN(n))throw new TypeError(`Parameters "min" and "max" can't be NaN`);if(e>n)throw new TypeError(`Parameter "min" can't be bigger than "max"`);return Math.floor(Math.random()*(n-e+1))+e}function H(t){return x(t)[0]}function x(t){if(t.length===0)return [void 0,void 0];let e=d(t.length-1);return [t[e],e]}function I(t){let[e,n]=x(t);if(n!==void 0)return t.splice(n,1),e}function P(t){let e=[...t];if(t.length===0)return t;for(let n=e.length-1;n>0;n--){let r=Math.floor(d(0,1e4)/1e4*(n+1));[e[n],e[r]]=[e[r],e[n]];}return e}function O(){try{return unsafeWindow}catch(t){return window}}function j(t,e){var n;return (n=t.parentNode)==null||n.insertBefore(e,t.nextSibling),e}function R(t,e){let n=t.parentNode;if(!n)throw new Error("Element doesn't have a parent node");return n.replaceChild(e,t),e.appendChild(t),e}function F(t){let e=document.createElement("style");e.innerHTML=t,document.head.appendChild(e);}function W(t,e=!1){let n=t.map(r=>new Promise((o,i)=>{let u=new Image;u.src=r,u.addEventListener("load",()=>o(u)),u.addEventListener("error",a=>e&&i(a));}));return Promise.allSettled(n)}function $(t){let e=document.createElement("a");Object.assign(e,{className:"userutils-open-in-new-tab",target:"_blank",rel:"noopener noreferrer",href:t}),e.style.display="none",document.body.appendChild(e),e.click(),setTimeout(e.remove,50);}function L(t,e,n){typeof Error.stackTraceLimit=="number"&&Error.stackTraceLimit<1e3&&(Error.stackTraceLimit=1e3),function(r){element.__proto__.addEventListener=function(...o){if(!(o[0]===e&&n()))return r.apply(this,o)};}(t.__proto__.addEventListener);}function B(t,e){return L(O(),t,e)}function q(t,e=1){let n=new(window.AudioContext||window.webkitAudioContext),r={mediaElement:t,amplify:o=>{r.gain.gain.value=o;},getAmpLevel:()=>r.gain.gain.value,context:n,source:n.createMediaElementSource(t),gain:n.createGain()};return r.source.connect(r.gain),r.gain.connect(n.destination),r.amplify(e),r}function z(t,e){return (Array.isArray(e)||e instanceof NodeList)&&(e=e.length),`${t}${e===1?"":"s"}`}function U(t){return new Promise(e=>{setTimeout(e,t);})}function D(t,e=300){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>t.apply(this,r),e);}}function J(n){return T(this,arguments,function*(t,e={}){let{timeout:r=1e4}=e,o=new AbortController,i=setTimeout(()=>o.abort(),r),u=yield fetch(t,b(c({},e),{signal:o.signal}));return clearTimeout(i),u})}var l=new Map;function V(t,e){let n=[];l.has(t)&&(n=l.get(t)),n.push(e),l.set(t,n),E(t,n);}function X(t){return l.delete(t)}function E(t,e){let n=[];if(e.forEach((r,o)=>{try{let i=r.all?document.querySelectorAll(t):document.querySelector(t);(i!==null&&i instanceof NodeList&&i.length>0||i!==null)&&(r.listener(i),r.continuous||n.push(o));}catch(i){console.error(`Couldn't call listener for selector '${t}'`,i);}}),n.length>0){let r=e.filter((o,i)=>!n.includes(i));r.length===0?l.delete(t):l.set(t,r);}}function Y(t={}){new MutationObserver(()=>{for(let[n,r]of l.entries())E(n,r);}).observe(document.body,c({subtree:!0,childList:!0},t));}function Z(){return l}



;// CONCATENATED MODULE: ./changelog.md
// Module
var code = "<!--\n## 0.2.0\n- ...\n\n<br>\n--> <h2 id=\"010\">0.1.0</h2> <ul> <li>Initial release</li> </ul> ";
// Exports
/* harmony default export */ const changelog = (code);
;// CONCATENATED MODULE: ./src/example.html
// Module
var example_code = "<div id=\"my-example-element\"> You may import any HTML file in code and it will automatically be converted to an HTML string. Using it is as easy as creating an element and assigning its innerHTML this string. </div> ";
// Exports
/* harmony default export */ const example = (example_code);
;// CONCATENATED MODULE: ./src/example.ts
// all CSS files imported like this will be included in the final bundle,
// and will be automatically minified and inserted into the site's <head> (by the addGlobalStyle() in onDomLoad() in `index.ts`)

// markdown is automatically parsed and converted to an HTML string which can be assigned to an element's innerHTML property

// HTML is imported as a simple string that can also be assigned to an element's innerHTML property

/** Gets called after DOMContentLoaded is emitted in `index.ts` */
function insertExampleElements() {
    // add a custom element with its contents set to an imported markdown file
    const changelogElement = document.createElement("div");
    // innerHTML is usually very unsafe but in this case we know the source can be trusted
    changelogElement.innerHTML = changelog;
    document.body.appendChild(changelogElement);
    // replace the content of the first div found in the document with the contents of example.html
    const randomElement = document.querySelector("div");
    if (randomElement)
        randomElement.innerHTML = example;
}

;// CONCATENATED MODULE: ./src/index.ts


/**
 * Called whenever the script is initialized, depending on the value of `@run-at` inside the userscript header.
 * Note: if you set `@run-at` to something like `document-end`, the `DOMContentLoaded` event may not be called depending on the userscript extension. In this case you may remove the onDomLoad() function and modify the DOM directly in init().
 */
function init() {
    const buildNbr = "c79d7df";
    const buildNbrText = !buildNbr.match(/^{{.+}}$/) ? `-${buildNbr}` : "";
    // watermark in the console based on values grabbed out of the userscript header
    console.log(`${GM.info.script.name} (${GM.info.script.version}${buildNbrText}) - ${GM.info.script.namespace}`);
    document.addEventListener("DOMContentLoaded", onLoad);
}
/** In here you can freely insert or delete elements as the DOM is now guaranteed to be modifiable */
function onLoad() {
    // this string gets replaced with the minified bundle of all imported CSS files by the script in src/tools/post-build.ts
    const globalStyle = `:root {
    --myscript-bg-col: #282c34;
    --myscript-fg-col: white;
}

#my-example-element {
    padding: 10px;
    background-color: var(--myscript-bg-col);
    color: var(--myscript-fg-col);
    font-family: "Segoe UI", "San Francisco", sans-serif;
}

`;
    // if no css file is imported anywhere, no bundle is emitted and so addGlobalStyle has to be skipped
    if (!globalStyle.match(/^{{.+}}$/))
        F(globalStyle);
    // go to this function's definition in `example.ts` for an example on how to import HTML, CSS and markdown
    insertExampleElements();
}
init();
