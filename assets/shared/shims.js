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

  if (!Element.prototype.toggleClass) {
    Element.prototype.toggleClass = function(q, force) {
      var has = typeof force !== 'boolean' ? this.classList.contains(q) : !force;
      if (has) {
        this.classList.remove(q);
      } else {
        this.classList.add(q);
      }
    };
  }

  (function(win, doc){
    if(win.addEventListener)return;   //No need to polyfill

    function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v));};}
    function addEvent(on, fn, self){
      return (self = this).attachEvent('on' + on, function(e){
        e = e || win.event;
        e.preventDefault  = e.preventDefault  || function(){e.returnValue = false;};
        e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true;};
        e.target          = e.srcElement;
        fn.call(self, e);
      });
    }
    function addListen(obj, i){
      if(i == obj.length)while(i--)obj[i].addEventListener = addEvent;
      else obj.addEventListener = addEvent;
      return obj;
    }

    addListen([doc, win]);
    if('Element' in win)win.Element.prototype.addEventListener = addEvent;      //IE8
    else{                                     //IE < 8
      doc.attachEvent('onreadystatechange', function(){addListen(doc.all);});    //Make sure we also init at domReady
      docHijack('getElementsByTagName');
      docHijack('getElementById');
      docHijack('createElement');
      addListen(doc.all);
    }
  })(window, document);

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

  // Function.prototype.bind polyfill for IE8
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function(){},
          fBound  = function(){
            return fToBind.apply(this instanceof fNOP ? this : oThis,aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
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
