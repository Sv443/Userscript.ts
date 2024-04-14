// ==UserScript==
// @name              Userscript Name
// @namespace         https://github.com/#REPLACE:User/Repo#readme
// @version           1.0.0
// @description       #REPLACE:Userscript Description
// @homepageURL       https://github.com/#REPLACE:User/Repo#readme#readme
// @supportURL        https://github.com/#REPLACE:User/Repo/issues
// @license           WTFPL
// @author            #REPLACE:Author name
// @copyright         #REPLACE:Author name (#REPLACE:Author URL)
// @icon              https://raw.githubusercontent.com/#REPLACE:User/Repo/develop/assets/images/logo_48.png?b=aab91c6
// @match             #REPLACE:Match URL(s) - i.e. *://*.example.com/*
// @run-at            document-start
// @downloadURL       https://raw.githubusercontent.com/#REPLACE:User/Repo/develop/dist/Userscript Name.user.js
// @updateURL         https://raw.githubusercontent.com/#REPLACE:User/Repo/develop/dist/Userscript Name.user.js
// @connect           github.com
// @connect           raw.githubusercontent.com
// @grant             GM.getValue
// @grant             GM.setValue
// @grant             GM.deleteValue
// @grant             GM.getResourceUrl
// @grant             GM.xmlHttpRequest
// @grant             GM.openInTab
// @noframes
// @resource          img-icon      https://raw.githubusercontent.com/#REPLACE:User/Repo/develop/assets/images/icon.png?b=aab91c6
// @resource          doc-changelog https://raw.githubusercontent.com/#REPLACE:User/Repo/develop/CHANGELOG.md?b=aab91c6
// @require           https://cdn.jsdelivr.net/npm/@sv443-network/userutils@6.3.0/dist/index.global.js
// @grant             GM.registerMenuCommand
// @grant             GM.listValues
// ==/UserScript==

(function(userutils){'use strict';/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};const buildNumberRaw = "aab91c6";
/** The build number of the userscript */
const buildNumber = (buildNumberRaw.match(/^#{{.+}}$/) ? "BUILD_ERROR!" : buildNumberRaw); // asserted as generic string instead of literal
/** Default compression format used throughout the entire script */
const compressionFormat = "deflate-raw";
/** Whether sessionStorage is available and working */
typeof (sessionStorage === null || sessionStorage === void 0 ? void 0 : sessionStorage.setItem) !== "undefined"
    && (() => {
        try {
            const key = `_ses_test_${userutils.randomId(4)}`;
            sessionStorage.setItem(key, "test");
            sessionStorage.removeItem(key);
            return true;
        }
        catch (_a) {
            return false;
        }
    })();
/** Info about the userscript, parsed from the userscript header (tools/post-build.js) */
const scriptInfo = {
    name: GM.info.script.name,
    version: GM.info.script.version,
    namespace: GM.info.script.namespace,
};let canCompress;
const config = new userutils.DataStore({
    id: "script-config",
    defaultData: {
    // add data here
    },
    // increment this value if the data format changes:
    formatVersion: 1,
    // functions that migrate data from older versions to newer ones:
    migrations: {
    // migrate from v1 to v2:
    // 2: (oldData) => {
    //   return { ...oldData, newProp: "foo" };
    // },
    },
    encodeData: (data) => canCompress ? userutils.compress(data, compressionFormat, "string") : data,
    decodeData: (data) => canCompress ? userutils.decompress(data, compressionFormat, "string") : data,
});
function initConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        canCompress = yield compressionSupported();
        yield config.loadData();
    });
}
function compressionSupported() {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof canCompress === "boolean")
            return canCompress;
        try {
            yield userutils.compress(".", compressionFormat, "string");
            return canCompress = true;
        }
        catch (e) {
            return canCompress = false;
        }
    });
}//| "foo"
//| "bar";
/** Options that are applied to every SelectorObserver instance */
const defaultObserverOptions = {
    defaultDebounce: 100,
    defaultDebounceEdge: "rising",
    subtree: false,
};
/** Global SelectorObserver instances usable throughout the script for improved performance */
const globservers = {};
/** Call after DOM load to initialize all SelectorObserver instances */
function initObservers() {
    try {
        //#region body
        // -> the entire <body> element - use sparingly due to performance impacts!
        globservers.body = new userutils.SelectorObserver(document.body, Object.assign(Object.assign({}, defaultObserverOptions), { defaultDebounce: 150 }));
        globservers.body.enable();
        //#region foo
        // -> some other subdivision of the <body> element - the selector can't start higher or on the same level as `body`!
        // const fooSelector = "#foo";
        // globservers.foo = new SelectorObserver(fooSelector, {
        //   ...defaultObserverOptions,
        // });
        // globservers.body.addListener(fooSelector, {
        //   listener: () => globservers.foo.enable(),
        // });
    }
    catch (err) {
        console.error("Failed to initialize observers:", err);
    }
}//#region DOM utils
let domLoaded = document.readyState === "complete" || document.readyState === "interactive";
document.addEventListener("DOMContentLoaded", () => domLoaded = true);
/**
 * Adds a style element to the DOM at runtime.
 * @param css The CSS stylesheet to add
 * @param ref A reference string to identify the style element - defaults to a random 5-character string
 */
function addStyle(css, ref) {
    if (!domLoaded)
        throw new Error("DOM has not finished loading yet");
    const elem = userutils.addGlobalStyle(css);
    elem.id = `global-style-${ref !== null && ref !== void 0 ? ref : userutils.randomId(5, 36)}`;
    return elem;
}/** Runs when the userscript is loaded initially */
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield initConfig();
        if (domLoaded)
            run();
        else
            document.addEventListener("DOMContentLoaded", run);
    });
}
/** Runs after the DOM is available */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`Initializing ${scriptInfo.name} v${scriptInfo.version} (#${buildNumber})...`);
            // post-build these double quotes are replaced by backticks (because if backticks are used here, the bundler converts them to double quotes)
            addStyle("#{{GLOBAL_STYLE}}", "global");
            initObservers();
        }
        catch (err) {
            console.error("Fatal error:", err);
            return;
        }
    });
}
init();})(UserUtils);//# sourceMappingURL=http://localhost:8710/Userscript Name.user.js.map
