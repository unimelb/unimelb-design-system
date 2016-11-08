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

  // Window height helper
  if (typeof window.height === "undefined") {
    window.height = function() {
      var h;
      if (window.innerHeight) {
        h = window.innerHeight;
      } else if (document.compatMode === 'CSS1Compat' && document.documentElement && document.documentElement.offsetHeight) {
        h = document.documentElement.offsetHeight;
      } else if (document.body && document.body.offsetHeight) {
        h = document.body.offsetHeight;
      } else {
        h = 0;
      }
      return h;
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

  // Find the next element sibling of an element (i.e. skip white-space nodes)
  if (!Element.prototype.findNextElementSibling) {
    Element.prototype.findNextElementSibling = function () {
      var sibling = this.nextSibling;
      while (sibling && sibling.nodeType !== 1) {
        sibling = sibling.nextSibling;
      }
      return sibling;
    };
  }

})(this);
