/**
 * Adds global CSS style through a `<style>` element in the document's `<head>`  
 * Can be run before `DOMContentLoaded` is emitted
 * @param style CSS string
 */
export function addGlobalStyle(style: string) {
  const styleElem = document.createElement("style");
  styleElem.innerHTML = style;
  document.head.appendChild(styleElem);
}

/**
 * Tries to insert `node` as a sibling just after the provided `beforeNode`
 * @returns Returns the passed `node`
 */
export function insertAfter(beforeNode: HTMLElement, node: HTMLElement) {
  beforeNode.parentNode?.insertBefore(node, beforeNode.nextSibling);
  return node;
}
