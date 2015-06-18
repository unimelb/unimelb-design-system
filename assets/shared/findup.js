function FindUp() {
  "use strict";

  if (typeof window.findUp === "undefined") {
    window.findUp = function(el, match) {
      if (el.hasClass(match) || el.hasAttribute(match)) {
        return el;
      } else {
        if (el.parentNode && el.parentNode!=document) {
          return findUp(el.parentNode, match);
        } else {
          return false;
        }
      }
    };
  }
}

module.exports = FindUp;