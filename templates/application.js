//= require_self
//= require_tree ./components

(function() {
  'use strict';

  if (!Window.prototype.height) {
    Window.prototype.height = function() {
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

  if (!Element.prototype.hasClass) {
    Element.prototype.hasClass = function(q) {
      var re;
      re = new RegExp(q);
      return re.test(this.className);
    };
  }

  if (!Element.prototype.addClass) {
    Element.prototype.addClass = function(q) {
      var curr;
      curr = this.className + " ";
      if (this.className === null || curr === " ") {
        curr = "";
      }
      if (!this.hasClass(q)) {
        return this.className = curr + q;
      }
    };
  }

  if (!Element.prototype.removeClass) {
    Element.prototype.removeClass = function(q) {
      if (this.className === null || this.className === " ") {
        return this.classname = "";
      } else {
        this.className = this.className.replace(q, '');
        if (this.className === " ") {
          return this.className = "";
        }
      }
    };
  }

  if (!Element.prototype.toggleClass) {
    Element.prototype.toggleClass = function(q) {
      if (this.hasClass(q)) {
        return this.removeClass(q);
      } else {
        return this.addClass(q);
      }
    };
  }

  if (!Element.prototype.addEventListener) {
    Element.prototype.addEventListener = function(e,f) {
      this.attachEvent("on"+e, f);
    };
  }

  if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault = function() {
      this.returnValue = false;
    };
  }

}).call(this);

(function () {
  'use strict';
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
}());
