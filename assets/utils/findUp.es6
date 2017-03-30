export default function findUp(el, match) {
  if (el.classList.contains(match) || el.hasAttribute(match)) {
    return el;
  }

  if (el.parentNode && el.parentNode != document) {
    return findUp(el.parentNode, match);
  }

  return false;
}
