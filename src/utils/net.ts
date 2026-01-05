import { openInNewTab } from "@sv443-network/userutils";

/**
 * Sends a request with the specified parameters and returns the response as a Promise.  
 * Ignores the CORS policy, contrary to `fetch` and CoreUtils' `fetchAdvanced`.  
 * ⚠️ Requires the directive `@grant GM.xmlhttpRequest`  
 * ⚠️ To fetch sites on other domains, they need to be allowlisted via `@connect` directives
 */
export function sendRequest<T = any>(details: GM.Request<T>) {
  return new Promise<GM.Response<T>>((resolve, reject) => {
    GM.xmlHttpRequest({
      timeout: 10_000,
      ...details,
      onload: resolve,
      onerror: reject,
      ontimeout: reject,
      onabort: reject,
    });
  });
}

/**
 * Opens the given URL in a new tab, using GM.openInTab if available  
 * ⚠️ Requires the directive `@grant GM.openInTab`
 */
export function openInTab(href: string, background = true) {
  try {
    openInNewTab(href, background);
  }
  catch(err) {
    window.open(href, "_blank", "noopener noreferrer");
  }
}
