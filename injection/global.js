var supportedmodernbrowser = !/(MSIE 7.0)/g.test(navigator.userAgent);

(function() {
  'use strict';

  if (supportedmodernbrowser) {
    // Window height helper
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

    // jQuery-style Element class helpers
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

    // IE Polyfill for event handling
    (function(win, doc){
      if(win.addEventListener)return;   //No need to polyfill

      function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
      function addEvent(on, fn, self){
        return (self = this).attachEvent('on' + on, function(e){
          var e = e || win.event;
          e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
          e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
          fn.call(self, e);
        });
      }
      function addListen(obj, i){
        if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
        else obj.addEventListener = addEvent;
        return obj;
      }

      addListen([doc, win]);
      if('Element' in win)win.Element.prototype.addEventListener = addEvent;      //IE8
      else{                                     //IE < 8
        doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});    //Make sure we also init at domReady
        docHijack('getElementsByTagName');
        docHijack('getElementById');
        docHijack('createElement');
        addListen(doc.all);
      }
    })(window, document);

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

}).call(this);
