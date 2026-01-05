import { randomId } from "@sv443-network/coreutils";
import { addGlobalStyle } from "@sv443-network/userutils";

export let domLoaded = document.readyState === "complete" || document.readyState === "interactive";
document.addEventListener("DOMContentLoaded", () => domLoaded = true);

/**
 * Adds generic, accessible interaction listeners to the passed element.  
 * All listeners have the default behavior prevented and stop immediate propagation.
 * @param listenerOptions Provide a {@linkcode listenerOptions} object to configure the listeners
 */
export function onInteraction<TElem extends HTMLElement>(elem: TElem, listener: (evt: MouseEvent | KeyboardEvent) => void, listenerOptions?: AddEventListenerOptions) {
  const proxListener = (e: MouseEvent | KeyboardEvent) => {
    if(e instanceof KeyboardEvent && !(["Enter", " ", "Space", "Spacebar"].includes(e.key)))
      return;
    e.preventDefault();
    e.stopImmediatePropagation();
    listenerOptions?.once && e.type === "keydown" && elem.removeEventListener("click", proxListener, listenerOptions);
    listenerOptions?.once && e.type === "click" && elem.removeEventListener("keydown", proxListener, listenerOptions);
    listener(e);
  };
  elem.addEventListener("click", proxListener, listenerOptions);
  elem.addEventListener("keydown", proxListener, listenerOptions);
}

/** Removes all child nodes of an element without invoking the slow-ish HTML parser */
export function clearInner(element: Element) {
  while(element.hasChildNodes())
    clearNode(element!.firstChild as Element);
}

function clearNode(element: Element) {
  while(element.hasChildNodes())
    clearNode(element!.firstChild as Element);
  element.parentNode!.removeChild(element);
}

/**
 * Adds a style element to the DOM at runtime.
 * @param css The CSS stylesheet to add
 * @param ref A reference string to identify the style element - defaults to a random 5-character string
 */
export function addStyle(css: string, ref?: string) {
  if(!domLoaded)
    throw new Error("DOM has not finished loading yet");
  const elem = addGlobalStyle(css);
  elem.id = `global-style-${ref ?? randomId(5, 36)}`;
  return elem;
}

/** Creates an invisible link element and clicks it to download the provided string or Blob data as a file. */
export function downloadFile(fileName: string, data: string | Blob, mimeType = "text/plain") {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
  const a = document.createElement("a");
  a.classList.add("bytm-hidden");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => a.remove(), 1);
}
