import { SelectorListenerOptions, SelectorObserver, type SelectorObserverConstructorOptions } from "@sv443-network/userutils";

export type ObserverName =
  | "body";
//| "foo"
//| "bar";

/** Options that are applied to every SelectorObserver instance */
const defaultObserverOptions: SelectorObserverConstructorOptions = {
  defaultDebounce: 100,
  defaultDebounceEdge: "rising",
  subtree: false,
};

/** Global SelectorObserver instances usable throughout the script for improved performance */
export const globservers = {} as Record<ObserverName, SelectorObserver>;

/** Call after DOM load to initialize all SelectorObserver instances */
export function initObservers() {
  try {
    //#region body
    // -> the entire <body> element - use sparingly due to performance impacts!
    globservers.body = new SelectorObserver(document.body, {
      ...defaultObserverOptions,
      defaultDebounce: 150,
    });

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
  catch(err) {
    console.error("Failed to initialize observers:", err);
  }
}

/**
 * Interface function for adding listeners to the {@linkcode globservers}  
 * @param selector Relative to the observer's root element, so the selector can only start at of the root element's children at the earliest!
 * @param options Options for the listener
 * @template TElem The type of the element that the listener will be attached to. If set to `0`, the type HTMLElement will be used
 */
export function addSelectorListener<
  TElem extends HTMLElement | 0,
  TObserverName extends ObserverName,
> (
  observerName: TObserverName,
  selector: string,
  options: SelectorListenerOptions<
    TElem extends 0
      ? HTMLElement
      : TElem
  >
){
  globservers[observerName].addListener(selector, options);
}
