/**
 * Look for the closest parent of an element with a given class.
 * @param el
 * @param className
 */
export default function findUp(el, className) {
  // Return matched element
  if (el.classList.contains(className)) return el;

  // Recurse if no match and document root not reached
  if (el.parentNode && el.parentNode !== document) {
    return findUp(el.parentNode, className);
  }

  // No match
  return false;
}
