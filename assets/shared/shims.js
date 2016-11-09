require('classlist-polyfill');

(function(root) {

  if (typeof document.countSelector === "undefined") {
    document.countSelector = function(selectors) {
      try {
        if (document.querySelectorAll(selectors) === null) {
          return 0;
        } else {
          return Array.prototype.slice.call(document.querySelectorAll(selectors)).length;
        }
      } catch(e) {
        // IE8 throws an invalid argument when querySelectorAll returns null (0)
      }
    };
  }

  if (!Element.prototype.countSelector) {
    Element.prototype.countSelector = function(selectors) {
      try {
        if (this.querySelectorAll(selectors) === null) {
          return 0;
        } else {
          return Array.prototype.slice.call(this.querySelectorAll(selectors)).length;
        }
      } catch(e) {
        // IE8 throws an invalid argument when querySelectorAll returns null (0)
      }
    };
  }

  // Find the first element child of an element (`Node.firstElementChild()` is not supported on IE8)
  if (!Element.prototype.findFirstElementChild) {
    Element.prototype.findFirstElementChild = function () {
      if ('firstElementChild' in this) {
        return this.firstElementChild;
      }

      var child = this.firstChild;
      while (child && child.nodeType !== 1) {
        child = child.nextSibling;
      }
      return child;
    };
  }

})(this);
