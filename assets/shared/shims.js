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

  // IE polyfill for Array.prototype.slice returning Object, source: MDN
  var _slice = Array.prototype.slice;

  try {
    // Can't be used with DOM elements in IE < 9
    _slice.call(document.documentElement);
  }
  catch (e) { // Fails in IE < 9
    Array.prototype.slice = function (begin, end) {
      var i, arrl = this.length, a = [];
      // Although IE < 9 does not fail when applying Array.prototype.slice
      // to strings, here we do have to duck-type to avoid failing
      // with IE < 9's lack of support for string indexes
      if (this.charAt) {
        for (i = 0; i < arrl; i++) {
          a.push(this.charAt(i));
        }
      }
      // This will work for genuine arrays, array-like objects,
      // NamedNodeMap (attributes, entities, notations),
      // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
      // and will not fail on other DOM objects (as do DOM elements in IE < 9)
      else {
        // IE < 9 (at least IE < 9 mode in IE 10) does not work with
        // node.attributes (NamedNodeMap) without a dynamically checked length here
        for (i = 0; i < this.length; i++) {
          a.push(this[i]);
        }
      }
      // IE < 9 gives errors here if end is allowed as undefined
      // (as opposed to just missing) so we default ourselves
      return _slice.call(a, begin, end || a.length);
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
