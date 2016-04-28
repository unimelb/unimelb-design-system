var supportedmodernbrowser = !/(MSIE 7.0)/g.test(navigator.userAgent);

(function() {
  'use strict';

  if (supportedmodernbrowser) {
    // Count selectors
    if (typeof document.countSelector === "undefined") {
      document.countSelector = function(selectors) {
        try {
          if (document.querySelectorAll(selectors) === null) {
            return 0;
          } else {
            return Array.prototype.slice.call(document.querySelectorAll(selectors)).length
          }
        } catch(e) {
          // IE8 throws an invalid argument when querySelectorAll returns null (0)
        }
      }
    }

    if (!Element.prototype.countSelector) {
      Element.prototype.countSelector = function(selectors) {
        return Array.prototype.slice.call(this.querySelectorAll(selectors)).length
      }
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
(function() {
  if (!window.UOMAccordion) {
    window.UOMAccordion = function() {
      var clickWithEnter, el, _i, _len, _ref;
      window.UOMAccordionComponent = (function() {
        function UOMAccordionComponent(el) {
          var close, t;
          this.el = el;
          this.container = this.el.parentNode;
          this.hidden = this.container.querySelector('.accordion__hidden');
          t = this;
          close = this.container.querySelector('.accordion__close');
          if (!close) {
            close = document.createElement('a');
            close.addClass('accordion__close');
            if (this.hidden.countSelector('.accordion__close') === 0) {
              if (this.hidden.nodeName === 'TR') {
                this.hidden.firstChild.appendChild(close);
              } else {
                this.hidden.appendChild(close);
              }
            }
          }
          close.addEventListener('click', function(e) {
            e.preventDefault();
            return t.container.toggleClass('accordion__visible');
          });
          this.el.setAttribute('tabindex', '0');
          this.el.addEventListener('click', function(e) {
            var container, s, target, _i, _len, _ref;
            e.preventDefault();
            target = e.target || e.srcElement;
            container = t.container.parentNode;
            if (container.nodeName === 'TR' || container.parentNode.nodeName === 'TR') {
              while (container.nodeName !== 'TABLE') {
                if (container.parentNode) {
                  container = container.parentNode;
                }
              }
            }
            if (container && container.getAttribute('data-single-focus') === "") {
              _ref = container.querySelectorAll('.accordion__visible');
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                s = _ref[_i];
                s.removeClass('accordion__visible');
              }
            }
            return t.container.toggleClass('accordion__visible');
          });
        }

        return UOMAccordionComponent;

      })();
      if (supportedmodernbrowser) {
        _ref = document.querySelectorAll('.accordion__title');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          new UOMAccordionComponent(el);
        }
      }
      clickWithEnter = function(e) {
        var elem;
        elem = document.activeElement;
        if (elem !== document.body && elem.getAttribute('tabindex') !== null) {
          if (typeof e === 'undefined' && window.event) {
            e = window.event;
          }
          if (e.keyCode === 13) {
            return elem.click();
          }
        }
      };
      if (window.addEventListener) {
        return window.addEventListener('keydown', clickWithEnter);
      } else if (window.attachEvent) {
        return window.attachEvent('KeyboardEvent', clickWithEnter);
      }
    };
  }

}).call(this);
(function() {
  if (!window.UOMExtraLabel) {
    window.UOMExtraLabel = function() {
      var ExtraLabel, control, _i, _len, _ref, _results;
      ExtraLabel = (function() {
        function ExtraLabel(el) {
          var t;
          this.el = el;
          t = this;
          this.el.parentNode.addEventListener('click', function(e) {
            if (t.el.checked) {
              return this.addClass("on");
            } else {
              return this.removeClass("on");
            }
          });
        }

        return ExtraLabel;

      })();
      _ref = document.querySelectorAll('input[type="radio"],input[type="checkbox"]');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        control = _ref[_i];
        _results.push(new ExtraLabel(control));
      }
      return _results;
    };
  }

}).call(this);
(function() {
  if (!window.UOMUnlockChecklist) {
    window.UOMUnlockChecklist = function() {
      var UnlockChecklist, list, _i, _len, _ref, _results;
      UnlockChecklist = (function() {
        function UnlockChecklist(el) {
          var item, t, _i, _len, _ref;
          this.el = el;
          t = this;
          this.target = document.getElementById(this.el.getAttribute('data-unlock-target'));
          this.target.addEventListener('click', function(e) {
            if (this.hasClass('disabled')) {
              return e.preventDefault();
            }
          });
          this.items = this.el.querySelectorAll('li');
          this.active = this.el.countSelector('.on');
          this.toggleDisable();
          _ref = this.items;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            item.addEventListener('click', function(e) {
              var target;
              target = e.target || e.srcElement;
              if (target.nodeName === 'LABEL' || target.nodeName === 'SPAN') {
                if (this.hasClass('on')) {
                  t.active -= 1;
                } else {
                  t.active += 1;
                }
                return t.toggleDisable();
              }
            });
          }
        }

        UnlockChecklist.prototype.toggleDisable = function() {
          if (this.active === this.items.length) {
            this.target.removeClass('disabled');
            return this.target.removeAttribute('disabled');
          } else {
            this.target.addClass('disabled');
            return this.target.setAttribute('disabled', 'disabled');
          }
        };

        return UnlockChecklist;

      })();
      _ref = document.querySelectorAll('ul.checklist[data-unlock-target]');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        list = _ref[_i];
        _results.push(new UnlockChecklist(list));
      }
      return _results;
    };
  }

}).call(this);
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (!window.UOMListFilter) {
    window.UOMListFilter = function() {
      var ListFilter, el, _i, _len, _ref, _results;
      ListFilter = (function() {
        function ListFilter(el) {
          var filter, i, pair, preselected, q, q2, t, table, tmp, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
          this.el = el;
          t = this;
          this.tables = document.querySelectorAll('ul.filtered-listing-grid');
          this.select = this.el.querySelector('select');
          if (this.select) {
            this.curr = this.select.value;
          } else {
            this.curr = -1;
          }
          if (typeof Isotope !== 'undefined') {
            this.isos = new Array;
            _ref = this.tables;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              table = _ref[i];
              this.isos[i] = new Isotope(table, {
                itemSelector: '.item',
                layoutMode: 'fitRows',
                masonry: {
                  columnWidth: '.item'
                }
              });
            }
          }
          this.categories = this.el.querySelectorAll('input.checkbox:not([data-tag="all"])');
          this.allcategories = this.el.querySelector('input.checkbox[data-tag="all"]');
          q = window.location.search.split(/\?/);
          if (q.length > 1) {
            q = q[1];
          }
          if (q.length > 1) {
            q = q.split("&");
          }
          q2 = "";
          if (q.length > 0) {
            for (_j = 0, _len1 = q.length; _j < _len1; _j++) {
              pair = q[_j];
              tmp = pair.split("=");
              if (tmp[0] === "filter") {
                q2 = tmp[1];
              }
            }
          }
          if (q2.length > 1) {
            q2 = q2.split(",");
          }
          _ref1 = this.el.querySelectorAll('input.checkbox');
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            filter = _ref1[_k];
            filter.addEventListener('click', function(e) {
              return t.process(e.target || e.srcElement);
            });
            for (_l = 0, _len3 = q2.length; _l < _len3; _l++) {
              preselected = q2[_l];
              if (preselected === filter.getAttribute('data-tag')) {
                filter.click();
              }
            }
          }
          this.process();
          if (this.select) {
            this.select.addEventListener('change', function(e) {
              t.curr = this.value;
              return t.redraw();
            });
          }
        }

        ListFilter.prototype.process = function(target) {
          var category, displayed_categories, table, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
          if (this.allcategories && target && target.getAttribute('data-tag') === 'all' && target.checked) {
            _ref = this.categories;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              category = _ref[_i];
              category.checked = false;
            }
            this.showAllTables();
          } else {
            if (this.allcategories) {
              this.allcategories.checked = false;
            }
            displayed_categories = [];
            _ref1 = this.categories;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              category = _ref1[_j];
              if (category.checked) {
                displayed_categories.push(category.getAttribute('data-tag'));
              }
            }
            if (displayed_categories.length === 0) {
              if (this.allcategories) {
                this.allcategories.checked = true;
              } else {
                _ref2 = this.categories;
                for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                  category = _ref2[_k];
                  category.checked = true;
                }
              }
              this.showAllTables();
            } else {
              _ref3 = this.tables;
              for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
                table = _ref3[_l];
                this.showTable(table, displayed_categories);
              }
            }
          }
          return this.redraw();
        };

        ListFilter.prototype.redraw = function() {
          var category, iso, table, _i, _j, _len, _len1, _ref, _ref1, _ref2, _results;
          _ref = this.tables;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            table = _ref[_i];
            category = table.parentNode.parentNode;
            if ((!this.select && table.countSelector('.item') > 0) || (table.countSelector('.item') > 0 && (this.curr === '-1' || (category.hasAttribute('data-category') && (_ref1 = this.curr, __indexOf.call(category.getAttribute('data-category').split('|'), _ref1) >= 0))))) {
              category.removeClass('hide');
            } else {
              category.addClass('hide');
            }
          }
          if (typeof Isotope !== 'undefined') {
            _ref2 = this.isos;
            _results = [];
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              iso = _ref2[_j];
              _results.push(iso.arrange({
                filter: '.item'
              }));
            }
            return _results;
          }
        };

        ListFilter.prototype.showTable = function(table, selectedtags) {
          var el, show, tag, _i, _j, _len, _len1, _ref, _results;
          _ref = table.querySelectorAll('li');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            show = false;
            for (_j = 0, _len1 = selectedtags.length; _j < _len1; _j++) {
              tag = selectedtags[_j];
              if (el.hasClass(tag)) {
                show = true;
              }
            }
            if (show) {
              _results.push(el.addClass('item'));
            } else {
              _results.push(el.removeClass('item'));
            }
          }
          return _results;
        };

        ListFilter.prototype.showAllTables = function() {
          var el, table, _i, _len, _ref, _results;
          _ref = this.tables;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            table = _ref[_i];
            _results.push((function() {
              var _j, _len1, _ref1, _results1;
              _ref1 = table.querySelectorAll('li');
              _results1 = [];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                el = _ref1[_j];
                _results1.push(el.addClass('item'));
              }
              return _results1;
            })());
          }
          return _results;
        };

        return ListFilter;

      })();
      _ref = document.querySelectorAll('form.filtered-listing-select');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(new ListFilter(el));
      }
      return _results;
    };
  }

}).call(this);
(function() {
  if (!window.UOMFancySelect) {
    window.UOMFancySelect = function() {
      var FancySelect, f, _i, _len, _ref, _results;
      FancySelect = (function() {
        function FancySelect(el) {
          var i, wrapper, _i, _len, _ref;
          this.el = el;
          this.parent = this.el.parentNode;
          wrapper = document.createElement('div');
          wrapper.addClass('styled-select');
          if (this.el.hasClass('alt')) {
            wrapper.addClass('alt');
          }
          if (this.el.hasClass('clear')) {
            wrapper.addClass('clear');
          }
          if (this.el.hasClass('clear-dark')) {
            wrapper.addClass('clear-dark');
          }
          wrapper.innerHTML = "<svg class=\"icon\" role=\"img\"><use xlink:href=\"#icon-north-south\"></use></svg>";
          this.el.parentNode.removeChild(this.el);
          wrapper.insertBefore(this.el, wrapper.firstChild);
          this.parent.appendChild(wrapper);
          if (!/(MSIE|Trident)/g.test(navigator.userAgent)) {
            _ref = this.parent.querySelectorAll('svg.icon');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              i = _ref[_i];
              i.addEventListener('click', function(e) {
                var event;
                event = new MouseEvent('mousedown', {
                  bubbles: true,
                  cancelable: true,
                  view: window
                });
                return this.parentNode.querySelector('select').dispatchEvent(event);
              });
            }
          }
        }

        return FancySelect;

      })();
      if (supportedmodernbrowser && !/(MSIE 9)/g.test(navigator.userAgent)) {
        _ref = document.querySelectorAll("select");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          _results.push(new FancySelect(f));
        }
        return _results;
      }
    };
  }

}).call(this);
(function() {
  if (!window.UOMValid) {
    window.UOMValid = function() {
      var Valid, f, _i, _len, _ref, _results;
      Valid = (function() {
        function Valid(el) {
          var f, t, _i, _len, _ref;
          this.el = el;
          this.patterns = {
            alpha: /[a-zA-Z]+/,
            alpha_numeric: /[a-zA-Z0-9]+/,
            integer: /-?\d+/,
            number: /-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            email: /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z][a-zA-Z]+$/,
            datetime: /([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,
            time: /(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,
            dateISO: /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,
            day_month_year: /(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/
          };
          _ref = this.el.querySelectorAll('[aria-required],[data-pattern]');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            f = _ref[_i];
            this.setupMsg(f);
          }
          t = this;
          this.el.addEventListener('submit', function(e) {
            var checked, invalid, outer, re, req, target, _j, _len1, _ref1;
            invalid = 0;
            target = e.target || e.srcElement;
            _ref1 = target.querySelectorAll('input,select,textarea');
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              f = _ref1[_j];
              if (f.hasAttribute('aria-required')) {
                req = f.getAttribute('aria-required');
                if (req === "true") {
                  if (f.tagName === 'SELECT') {
                    if (f.value !== "-1") {
                      t.valid(f);
                    } else {
                      t.invalid(f);
                      invalid++;
                    }
                  } else if (f.getAttribute('type') === 'checkbox') {
                    checked = t.el.countSelector('[name="' + f.getAttribute('name') + '"]:checked');
                    if (checked > 0) {
                      t.valid(f);
                    } else {
                      t.invalid(f);
                      invalid++;
                    }
                  } else {
                    if (f.value.length > 0) {
                      t.valid(f);
                    } else {
                      t.invalid(f);
                      invalid++;
                    }
                  }
                }
              }
              if (f.hasAttribute('data-pattern')) {
                if (t.patterns.hasOwnProperty(f.getAttribute('data-pattern'))) {
                  re = new RegExp(t.patterns[f.getAttribute('data-pattern')]);
                } else {
                  re = new RegExp(f.getAttribute('data-pattern'));
                }
                if (re.test(f.value)) {
                  t.valid(f);
                } else {
                  t.invalid(f);
                  invalid++;
                }
              }
            }
            if (invalid) {
              e.preventDefault();
              if (/(Firefox)/g.test(navigator.userAgent)) {
                outer = document.querySelector('html');
              } else {
                outer = document.body;
              }
              return outer.scrollTop = t.el.offsetTop;
            }
          });
        }

        Valid.prototype.setupMsg = function(f) {
          var error, nameval, parent;
          parent = f.parentNode;
          if (f.nodeName === 'SELECT') {
            parent = parent.parentNode;
          }
          if (f.getAttribute('type') === 'checkbox') {
            nameval = '[name="' + f.getAttribute('name') + '"]';
            parent = parent.parentNode.querySelector(nameval).parentNode.parentNode.querySelector('div:last-child').querySelector(nameval).parentNode;
          }
          if (parent.countSelector('small') === 0) {
            error = document.createElement('small');
            if (f.hasAttribute('data-error')) {
              error.appendChild(document.createTextNode(f.getAttribute('data-error')));
            } else {
              error.appendChild(document.createTextNode('Required'));
            }
            return parent.appendChild(error);
          }
        };

        Valid.prototype.invalid = function(f) {
          var parent;
          parent = f.parentNode;
          if (parent.hasClass('invalid')) {
            return window.setTimeout(function() {
              if (f.nodeName === 'SELECT') {
                parent.parentNode.removeClass('invalid');
              }
              parent.removeClass('invalid');
              f.removeClass('invalid');
              return window.setTimeout(function() {
                if (f.nodeName === 'SELECT') {
                  parent.parentNode.addClass('invalid');
                }
                parent.addClass('invalid');
                return f.addClass('invalid');
              }, 0);
            }, 100);
          } else {
            if (f.nodeName === 'SELECT') {
              parent.parentNode.addClass('invalid');
            }
            parent.addClass('invalid');
            return f.addClass('invalid');
          }
        };

        Valid.prototype.valid = function(f) {
          if (f.nodeName === 'SELECT') {
            f.parentNode.parentNode.removeClass('invalid');
          }
          f.parentNode.removeClass('invalid');
          return f.removeClass('invalid');
        };

        return Valid;

      })();
      if (supportedmodernbrowser) {
        _ref = document.querySelectorAll("[data-validate]");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          _results.push(new Valid(f));
        }
        return _results;
      }
    };
  }

}).call(this);
if(typeof UOMImageGallery === 'undefined') {
  window.UOMImageGallery = function() {
    var ImageGallery = function(el) {
      var imageLinks = el.querySelectorAll('li a');
      for (var i = imageLinks.length - 1; i >= 0; i--) {
        var imageLink = imageLinks[i],
            img = imageLink.querySelector('img'),
            ratio = img.offsetWidth / img.offsetHeight,
            span = document.createElement('span');
        span.innerHTML = '<svg role="img" class="icon"><use xlink:href="#icon-zoom"></use></svg>';
        imageLink.parentNode.addClass(ratio < 1 ? 'portrait' : ratio > 2 ? 'panorama' : 'landscape');
        imageLink.style.backgroundImage = 'url(' + img.src + ')';
        img.addClass('hidden');
        imageLink.appendChild(span);
      };

      if (typeof Isotope !== 'undefined') {
        new Isotope(el, {
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: 1,
            gutter: 0
          }
        });
      }

      if (typeof initPhotoSwipeFromDOM !== 'undefined') {
        initPhotoSwipeFromDOM(el);
      }
    }

    var galleries = document.querySelectorAll('ul.image-gallery');

    if(galleries.length){
        var PhotoSwipeHTML = document.createElement('div');
        PhotoSwipeHTML.innerHTML = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>';
        document.querySelectorAll('div.uomcontent')[0].appendChild(PhotoSwipeHTML);

        for (var i = galleries.length - 1; i >= 0; i--) {
          var gallery = galleries[i];
          imagesLoaded(gallery, function(){
            ImageGallery(gallery);
          });
        };
    }
  }
}

var initPhotoSwipeFromDOM = function(gallerySelector) {

    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            liEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            liEl = thumbElements[i];
            if(liEl.nodeType !== 1) {
                continue;
            }

            linkEl = liEl.children[0]; // <a> element
            figureEl = linkEl.children[0]

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
                item.msrc = figureEl.children[0].getAttribute('src');
            }

            item.el = liEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(this, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'LI');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        if(!params.hasOwnProperty('pid')) {
            return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);


        // define options (if needed)
        options = {
            index: index,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('a')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x:rect.left, y:rect.top + pageYScroll + 20, w:rect.width};
            }

        };

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    var galleryElements = gallerySelector.querySelectorAll('a');

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    var hashData = photoswipeParseHash();
    if(hashData.pid > 0 && hashData.gid > 0) {
        openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
    }
};
(function() {
  if (!window.UOMInpageScrolling) {
    window.UOMInpageScrolling = function() {
      var el, _i, _len, _ref, _results;
      Math.easeInOutQuad = function(curr, start, change, duration) {
        curr /= duration / 2;
        if (curr < 1) {
          return change / 2 * curr * curr + start;
        } else {
          curr--;
          return -change / 2 * (curr * (curr - 2) - 1) + start;
        }
      };
      window.smoothScrollTo = function(to) {
        var animateScroll, change, curr, duration, element, increment, start;
        if (/(Firefox)/g.test(navigator.userAgent) || /(Trident)/g.test(navigator.userAgent)) {
          element = document.querySelector('html');
        } else {
          element = document.body;
        }
        duration = 600;
        start = element.scrollTop;
        change = to.offsetTop - start;
        if (document.countSelector('.floating') === 0) {
          change = change - 40;
        }
        curr = 0;
        increment = 10;
        animateScroll = function() {
          curr += increment;
          element.scrollTop = Math.easeInOutQuad(curr, start, change, duration);
          if (curr < duration) {
            return setTimeout(animateScroll, increment);
          }
        };
        if (change !== 0) {
          return animateScroll();
        }
      };
      window.InPage = (function() {
        function InPage(el) {
          var t;
          this.el = el;
          t = this;
          if (!(this.el.hasAttribute('data-no-scroll') || this.el.hasAttribute('data-modal-target'))) {
            this.el.addEventListener('click', function(e) {
              var outer, tabbed, target, tel, up;
              tel = e.srcElement;
              outer = document.documentElement;
              if (e.target) {
                tel = e.target;
              }
              if (tel && tel.hasAttribute('href')) {
                target = tel.getAttribute('href');
                if (target !== "#" && target !== "#sitemap") {
                  e.preventDefault();
                  target = document.querySelector(tel.getAttribute('href'));
                  up = function(el) {
                    if (el.hasAttribute('data-tabbed')) {
                      return el;
                    } else {
                      if (el.parentNode && el.parentNode !== document) {
                        return up(el.parentNode);
                      } else {
                        return false;
                      }
                    }
                  };
                  tabbed = up(tel);
                  if (tabbed && this.parentNode.parentNode.hasClass("jump-navigation") === false) {
                    target = tabbed;
                  }
                  if (target) {
                    return smoothScrollTo(target);
                  }
                }
              }
            });
          }
        }

        return InPage;

      })();
      if (supportedmodernbrowser) {
        _ref = document.querySelectorAll('a[href^="#"]');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          _results.push(new InPage(el));
        }
        return _results;
      }
    };
  }

}).call(this);
(function() {
  if (!window.UOMStickyNav) {
    window.UOMStickyNav = function() {
      var StickyNav, el, _i, _len, _ref, _results;
      StickyNav = (function() {
        function StickyNav(el) {
          var className, elements, h, jump, li, main, node, t, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
          this.main = el;
          if (/(Firefox)/g.test(navigator.userAgent) || /(Trident)/g.test(navigator.userAgent)) {
            this.outer = document.querySelector('html');
          } else {
            this.outer = document.body;
          }
          jump = document.createElement("ul");
          className = document.countSelector('.indexnav') === 1 ? "index-navigation" : "jump-navigation";
          jump.addClass(className);
          jump.innerHTML = "<li>On this page</li>";
          this.n = jump;
          this.nav = {};
          _ref = this.main.querySelectorAll('h2[id]');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            h = _ref[_i];
            this.nav[h.offsetTop] = document.createElement("a");
            this.nav[h.offsetTop].href = "#" + h.id;
            this.nav[h.offsetTop].appendChild(document.createTextNode(h.textContent || h.innerText));
            li = document.createElement("li");
            li.appendChild(this.nav[h.offsetTop]);
            this.n.appendChild(li);
          }
          _ref1 = this.n.querySelectorAll('a[href^="#"]');
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            el = _ref1[_j];
            new window.InPage(el);
          }
          this.nPadding = 60;
          this.fPadding = 60;
          this.arbitraryOffset = 50;
          t = this;
          window.addEventListener("scroll", function() {
            t.progress();
            if (t.contained()) {
              if (!jump.hasClass('fixed')) {
                return jump.addClass('fixed');
              }
            } else {
              if (jump.hasClass('fixed')) {
                return jump.removeClass('fixed');
              }
            }
          });
          this.progress();
          if (document.countSelector('.floating') > 0) {
            jump.addClass('floating');
          }
          if (this.main.countSelector('.tab .with-aside aside') > 0) {
            this.main.querySelector('.tab .with-aside aside').appendChild(jump);
          } else {
            jump.id = 'outer';
            main = document.querySelector('[role="main"]');
            elements = [];
            _ref2 = main.childNodes;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              node = _ref2[_k];
              if (node.nodeType === 1) {
                elements.push(node);
              }
            }
            if (elements.length > 1) {
              main.insertBefore(jump, elements[1]);
            } else {
              main.appendChild(jump);
            }
          }
          document.body.addClass(document.countSelector('.indexnav') === 1 ? "indexnav-active" : "jumpnav-active");
          this.fixPoint = this.n.offsetTop - 80;
          if (jump.hasClass('floating')) {
            this.fixPoint = this.fixPoint + 35;
          }
        }

        StickyNav.prototype.contained = function() {
          this.stickyEnd = this.main.offsetHeight + this.main.offsetTop - this.n.offsetHeight - this.nPadding;
          if (document.countSelector('[role="main"] > footer:last-of-type') > 0) {
            this.stickyEnd = this.stickyEnd - this.fPadding - document.querySelector('[role="main"] > footer:last-of-type').offsetHeight;
          }
          return this.outer.scrollTop > this.fixPoint && this.outer.scrollTop < this.stickyEnd;
        };

        StickyNav.prototype.progress = function() {
          var el, link, pos, _i, _len, _ref, _ref1, _results;
          _ref = this.nav;
          _results = [];
          for (pos in _ref) {
            link = _ref[pos];
            if (this.outer.scrollTop + this.arbitraryOffset >= pos) {
              _ref1 = this.n.querySelectorAll('a');
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                el = _ref1[_i];
                el.removeClass("current");
              }
              _results.push(link.addClass("current"));
            } else {
              _results.push(link.removeClass("current"));
            }
          }
          return _results;
        };

        return StickyNav;

      })();
      if (supportedmodernbrowser) {
        if (document.countSelector('.tab') > 0) {
          _ref = document.querySelectorAll('.tab');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            if (el.countSelector('h2[id]') > 0) {
              _results.push(new StickyNav(el));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        } else {
          if (document.countSelector('h2[id]') > 0 && document.countSelector('.jumpnav, .indexnav') === 1) {
            return new StickyNav(document.querySelector('div[role="main"]'));
          }
        }
      }
    };
  }

}).call(this);
(function() {
  if (!window.UOMGMap) {
    window.UOMGMap = function() {
      var Gmap, script;
      Gmap = (function() {
        function Gmap(el) {
          var _ref;
          this.el = el;
          this.width = parseInt(this.el.getAttribute('data-width')) || 400;
          this.height = parseInt(this.el.getAttribute('data-height')) || 300;
          this.zoom = parseInt(this.el.getAttribute('data-zoom')) || 17;
          this.pin = this.el.getAttribute('data-pin');
          if (this.el.hasAttribute('data-latlng')) {
            _ref = this.el.getAttribute('data-latlng').split(','), this.lat = _ref[0], this.lng = _ref[1];
            this.options = {
              center: new google.maps.LatLng(this.lat, this.lng),
              zoom: this.zoom,
              scrollwheel: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.draw();
          }
          if (this.el.hasAttribute('data-address')) {
            this.geolookup();
          }
        }

        Gmap.prototype.draw = function() {
          this.el.style.width = this.width + 'px';
          this.el.style.height = this.height + 'px';
          this.map = new google.maps.Map(this.el, this.options);
          if (this.el.getAttribute('data-pin')) {
            this.marker();
          }
          if (this.el.getAttribute('data-grayscale') === '') {
            return this.stylemap();
          }
        };

        Gmap.prototype.geolookup = function() {
          var geocoder, t;
          t = this;
          geocoder = new google.maps.Geocoder();
          return geocoder.geocode({
            address: this.el.getAttribute('data-address')
          }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              t.options = {
                center: results[0].geometry.location,
                zoom: t.zoom,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              return t.draw();
            }
          });
        };

        Gmap.prototype.marker = function() {
          var ll, marker, markerOptions;
          ll = this.pin.split(',');
          markerOptions = {
            map: this.map,
            position: new google.maps.LatLng(ll[0], ll[1])
          };
          return marker = new google.maps.Marker(markerOptions);
        };

        Gmap.prototype.stylemap = function() {
          var styleOptions, styledMap;
          styleOptions = [
            {
              stylers: [
                {
                  hue: '#203D65'
                }, {
                  saturation: -80
                }
              ]
            }
          ];
          styledMap = new google.maps.StyledMapType(styleOptions, {
            name: 'Styled Map'
          });
          this.map.mapTypes.set('map_style', styledMap);
          return this.map.setMapTypeId('map_style');
        };

        return Gmap;

      })();
      if (supportedmodernbrowser) {
        if (Array.prototype.slice.call(document.querySelectorAll('[data-latlng],[data-address]')).length > 0) {
          script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://maps.googleapis.com/maps/api/js?callback=maps_loaded";
          document.body.appendChild(script);
        }
      }
      return window.maps_loaded = function() {
        var m, _i, _len, _ref, _results;
        _ref = document.querySelectorAll('[data-latlng],[data-address]');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          _results.push(new Gmap(m));
        }
        return _results;
      };
    };
  }

}).call(this);
(function() {
  if (!window.UOMLeafletMap) {
    window.UOMLeafletMap = function() {
      var LeafletMap, script;
      LeafletMap = (function() {
        function LeafletMap(el) {
          this.el = el;
          this.zoom = parseInt(this.el.getAttribute('data-zoom')) || 15;
          this.map = L.map(this.el).setView(this.el.getAttribute('data-leaflet-latlng').split(','), this.zoom);
          L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'examples.map-i875mjb7'
          }).addTo(this.map);
          if (this.el.getAttribute('data-pin')) {
            L.marker(this.el.getAttribute('data-pin').split(',')).addTo(this.map);
          }
        }

        return LeafletMap;

      })();
      if (supportedmodernbrowser) {
        if (document.countSelector('[data-leaflet-latlng]') > 0) {
          script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js";
          document.body.appendChild(script);
          return window.setTimeout(function() {
            var m, _i, _len, _ref, _results;
            _ref = document.querySelectorAll('[data-leaflet-latlng]');
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              m = _ref[_i];
              _results.push(new LeafletMap(m));
            }
            return _results;
          }, 2000);
        }
      }
    };
  }

}).call(this);
(function() {
  if (!window.UOMYtEmbed) {
    window.UOMYtEmbed = function() {
      var YtEmbed, el, script, _i, _len, _ref, _results;
      YtEmbed = (function() {
        function YtEmbed(el) {
          var t;
          this.el = el;
          this.ytid = this.el.getAttribute('data-ytid');
          this.trigger = document.createElement('div');
          this.trigger.setAttribute('class', 'embed-video-button');
          this.trigger.innerHTML = '<svg x="0px" y="0px" viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve"><circle class="st0" cx="500" cy="500" r="368.3"/><polygon points="398.5,309.5 700.3,500 398.5,690.5 "/></svg>';
          t = this;
          this.el.addEventListener('click', function(e) {
            e.preventDefault();
            return t.video = new YT.Player(t.el.id, {
              height: '320',
              width: '570',
              videoId: t.ytid,
              playerVars: {
                rel: 0
              },
              events: {
                'onReady': t.onPlayerReady
              }
            });
          });
          this.el.appendChild(this.trigger);
        }

        YtEmbed.prototype.onPlayerReady = function(event) {
          if (!/(iPad|iPhone|iPod|Android)/g.test(navigator.userAgent)) {
            return event.target.playVideo();
          }
        };

        return YtEmbed;

      })();
      if (supportedmodernbrowser) {
        if (Array.prototype.slice.call(document.querySelectorAll('[data-ytid]')).length > 0) {
          script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(script);
          _ref = document.querySelectorAll('[data-ytid]');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            _results.push(new YtEmbed(el));
          }
          return _results;
        }
      }
    };
  }

}).call(this);
(function() {
  if (!window.UOMModal) {
    window.UOMModal = function() {
      var blanket, el, modal, parent, trigger, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      blanket = document.querySelector('.modal__blanket');
      if (!blanket) {
        blanket = document.createElement('div');
        blanket.setAttribute('class', 'modal__blanket');
        document.querySelector('.uomcontent').appendChild(blanket);
      }
      parent = document.querySelector('.uomcontent');
      _ref = document.querySelectorAll('.modal__dialog');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        modal = _ref[_i];
        modal.parentNode.removeChild(modal);
        parent.appendChild(modal);
      }
      _ref1 = document.querySelectorAll("[data-modal-target]");
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        trigger = _ref1[_j];
        trigger.addEventListener('click', function(e) {
          var target, top, viewport;
          e.preventDefault();
          target = document.getElementById(this.getAttribute('data-modal-target'));
          if (this.getAttribute('data-modal-offset') === '') {
            target.style.top = this.offsetTop - 160 + 'px';
            target.addClass('on');
          } else {
            viewport = document.body.getBoundingClientRect();
            top = parseInt((window.height() - target.offsetHeight) / 2);
            target.style.top = (top - viewport.top) + 'px';
            target.addClass('on');
          }
          return blanket.addClass('on');
        });
      }
      _ref2 = document.querySelectorAll('.modal__blanket,.modal__close');
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        el = _ref2[_k];
        _results.push(el.addEventListener('click', function(e) {
          var _l, _len3, _ref3;
          e.preventDefault();
          _ref3 = document.querySelectorAll('.modal__dialog');
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            modal = _ref3[_l];
            modal.removeClass('on');
          }
          return blanket.removeClass('on');
        }));
      }
      return _results;
    };
  }

}).call(this);
(function() {
  if (!window.UOMTableLabels) {
    window.UOMTableLabels = function() {
      var TableLabels, table, _i, _len, _ref, _results;
      TableLabels = (function() {
        function TableLabels(el) {
          var cell, index, labels, row, t, _i, _j, _len, _len1, _ref, _ref1;
          this.el = el;
          t = this;
          labels = t.el.querySelectorAll('thead th');
          _ref = t.el.querySelectorAll('tr:not(.header)');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            row = _ref[_i];
            _ref1 = row.querySelectorAll('td');
            for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
              cell = _ref1[index];
              if (labels[index]) {
                cell.setAttribute("data-label", labels[index].textContent || labels[index].innerText);
              }
            }
          }
        }

        return TableLabels;

      })();
      _ref = document.querySelectorAll('table');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        table = _ref[_i];
        _results.push(new TableLabels(table));
      }
      return _results;
    };
  }

}).call(this);
(function() {
  if (!window.UOMSidebarTabs) {
    window.UOMSidebarTabs = function() {
      var SidebarTabs, el, _i, _j, _len, _len1, _ref, _ref1, _results;
      SidebarTabs = (function() {
        function SidebarTabs(el, selector) {
          var i, item, rec, t, _i, _j, _len, _len1, _ref, _ref1;
          this.el = el;
          this.selector = selector;
          this.nav = this.el.querySelectorAll('a');
          this.current = 0;
          t = this;
          _ref = this.nav;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            item.addEventListener('click', function(e) {
              var i, rec, _j, _len1, _ref1, _results;
              e.preventDefault();
              _ref1 = t.nav;
              _results = [];
              for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
                rec = _ref1[i];
                if (rec === this) {
                  t.hide();
                  t.current = i;
                  _results.push(t.show());
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            });
          }
          if (window.location.hash) {
            _ref1 = this.nav;
            for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
              rec = _ref1[i];
              if (rec.getAttribute('href') === window.location.hash) {
                this.hide();
                this.current = i;
                this.show();
              }
            }
          }
        }

        SidebarTabs.prototype.hide = function() {
          var p, root, _i, _j, _len, _len1, _ref, _ref1, _results;
          root = document;
          if (document.countSelector('.tab') > 1) {
            root = document.querySelector('.tab[data-current]');
          }
          this.pages = root.querySelectorAll(this.selector);
          _ref = this.nav;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            p.removeClass('current');
          }
          _ref1 = this.pages;
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            p = _ref1[_j];
            _results.push(p.removeClass('current'));
          }
          return _results;
        };

        SidebarTabs.prototype.show = function() {
          var i, rec, target, _i, _len, _ref, _results;
          _ref = this.nav;
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            rec = _ref[i];
            if (i === this.current) {
              target = document.querySelector(rec.getAttribute('href'));
              if (target) {
                rec.addClass('current');
                _results.push(target.addClass('current'));
              } else {
                _results.push(void 0);
              }
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };

        return SidebarTabs;

      })();
      if (supportedmodernbrowser) {
        _ref = document.querySelectorAll('.sidebar-tab-nav');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          new SidebarTabs(el, '.sidebar-tab');
        }
        _ref1 = document.querySelectorAll('.inner-nav-tab');
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          el = _ref1[_j];
          _results.push(new SidebarTabs(el, '.inner-nav-page'));
        }
        return _results;
      }
    };
  }

}).call(this);
(function() {
  if (!window.UOMTabs) {
    window.UOMTabs = function() {
      var Tabbed, el, _i, _len, _ref, _results;
      Tabbed = (function() {
        function Tabbed(el) {
          var curr, i, idx, item, t, tab, tabs, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
          this.el = el;
          if (this.el.countSelector('nav') > 0) {
            this.el.querySelector('nav').addClass('active');
          }
          if (this.el.countSelector('.mobile-nav') > 0) {
            this.el.querySelector('.mobile-nav').addClass('active');
          } else {
            if (this.el.countSelector('div.full-width') === 1) {
              this.buildMobileNav();
            }
          }
          if (this.el.hasAttribute('data-tabbed')) {
            t = this;
            tabs = [];
            _ref = this.el.querySelectorAll('[role="tabpanel"]');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              tab = _ref[_i];
              tab.style.display = 'none';
              tabs.push(tab.id || '');
            }
            _ref1 = this.el.querySelectorAll('nav a');
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              item = _ref1[_j];
              item.addEventListener('click', function(e) {
                var target;
                target = e.target || e.srcElement;
                if (target.hasAttribute('href')) {
                  if (target.getAttribute('href').substr(0, 1) === '#') {
                    return t.move(target);
                  }
                } else {
                  return t.move(target);
                }
              });
            }
            if (this.el.countSelector('select') > 0) {
              this.el.querySelector('select').addEventListener('change', function(e) {
                var curr, i, opt, _k, _len2, _ref2;
                if (this.value) {
                  if (this.value.substr(0, 1) !== '#') {
                    return window.location = this.value;
                  } else {
                    curr = 1;
                    tab = this.value;
                    _ref2 = this.querySelectorAll('option');
                    for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
                      opt = _ref2[i];
                      if (opt.value === tab) {
                        curr = i + 1;
                      }
                    }
                    t.moveindex(curr);
                    return setTimeout(function() {
                      if (tab) {
                        return window.location.hash = tab.substr(1);
                      }
                    }, 600);
                  }
                }
              });
            }
            if (window.location.hash) {
              curr = window.location.hash.substr(1);
            }
            idx = 0;
            for (i = _k = 0, _len2 = tabs.length; _k < _len2; i = ++_k) {
              tab = tabs[i];
              if (curr === tab) {
                idx = i + 1;
              }
            }
            if (idx > 0) {
              this.moveindex(idx);
            } else if (this.el.countSelector('[data-current]') === 0) {
              this.move(this.el.querySelector('nav a:first-child'));
            } else {
              this.move(this.el.querySelector('[data-current]'));
            }
            _ref2 = this.el.querySelectorAll('[data-tab]');
            for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
              el = _ref2[_l];
              el.addEventListener('click', function(e) {
                var target;
                target = e.target || e.srcElement;
                t.moveindex(target.getAttribute('data-tab'));
                return setTimeout(function() {
                  if (target.getAttribute('href')) {
                    return window.location.hash = target.getAttribute('href').substr(1);
                  }
                }, 600);
              });
            }
          }
        }

        Tabbed.prototype.moveindex = function(index) {
          var i, opt, tab, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
          _ref = this.el.querySelectorAll('nav a');
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            tab = _ref[i];
            if (i === index - 1) {
              tab.setAttribute('data-current', '');
            } else {
              tab.removeAttribute('data-current');
            }
          }
          _ref1 = this.el.querySelectorAll('option');
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            opt = _ref1[i];
            if (i === index - 1) {
              opt.setAttribute('selected', 'selected');
            } else {
              opt.removeAttribute('selected');
            }
          }
          _ref2 = this.el.querySelectorAll('[role="tabpanel"]');
          _results = [];
          for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
            tab = _ref2[i];
            if (i === index - 1) {
              tab.setAttribute('data-current', '');
              _results.push(tab.style.display = 'block');
            } else {
              tab.removeAttribute('data-current');
              _results.push(tab.style.display = 'none');
            }
          }
          return _results;
        };

        Tabbed.prototype.move = function(clicked) {
          var curr, i, opt, tab, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
          curr = 0;
          _ref = this.el.querySelectorAll('nav a');
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            tab = _ref[i];
            if (tab === clicked) {
              tab.setAttribute('data-current', '');
              curr = i;
            } else {
              tab.removeAttribute('data-current');
            }
          }
          _ref1 = this.el.querySelectorAll('option');
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            opt = _ref1[i];
            if (i === curr) {
              opt.setAttribute('selected', 'selected');
            } else {
              opt.removeAttribute('selected');
            }
          }
          _ref2 = this.el.querySelectorAll('[role="tabpanel"]');
          _results = [];
          for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
            tab = _ref2[i];
            if (i === curr) {
              tab.setAttribute('data-current', '');
              _results.push(tab.style.display = 'block');
            } else {
              tab.removeAttribute('data-current');
              _results.push(tab.style.display = 'none');
            }
          }
          return _results;
        };

        Tabbed.prototype.buildMobileNav = function() {
          var i, mobile, opt, root, selector, tab, _i, _len, _ref;
          mobile = document.createElement('div');
          mobile.addClass('mobile-nav');
          selector = document.createElement('select');
          selector.setAttribute('role', 'tablist');
          _ref = this.el.querySelectorAll('nav a');
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            tab = _ref[i];
            opt = document.createElement('option');
            opt.setAttribute('role', 'tab');
            opt.setAttribute('value', tab.getAttribute('href'));
            opt.appendChild(document.createTextNode(tab.firstChild.nodeValue));
            selector.appendChild(opt);
          }
          mobile.appendChild(selector);
          root = this.el.querySelector('.full-width');
          return root.insertBefore(mobile, root.firstChild);
        };

        return Tabbed;

      })();
      if (supportedmodernbrowser) {
        _ref = document.querySelectorAll('[data-tabbed]');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          _results.push(new Tabbed(el));
        }
        return _results;
      }
    };
    if (window.attachEvent) {
      window.attachEvent('onload', function() {
        return UOMTabs();
      });
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        return UOMTabs();
      });
    }
  }

}).call(this);





WebFontConfig = {
  google: { families: [ 'Roboto:400,300,100,700,100italic,300italic,400italic,700italic:latin' ] }
};

window.UOMloadComponents = function() {
  window.UOMAccordion();
  window.UOMModal();
  window.UOMTabs();
  window.UOMSidebarTabs();
  window.UOMInpageScrolling();

  window.UOMListFilter();
  window.UOMStickyNav();

  window.UOMExtraLabel();
  window.UOMFancySelect();
  window.UOMValid();
  window.UOMTableLabels();

  window.UOMGMap();
  window.UOMLeafletMap();

  window.UOMImageGallery();
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadComponents);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadComponents, false);
  document.addEventListener('page:change', function() {
    window.UOMloadComponents();
  }, false);
}
;
/* Web Font Loader v1.5.18 - (c) Adobe Systems, Google. License: Apache 2.0 */

;(function(window,document,undefined){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function k(a,b,c){k=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return k.apply(null,arguments)}var n=Date.now||function(){return+new Date};function q(a,b){this.K=a;this.w=b||a;this.G=this.w.document}q.prototype.createElement=function(a,b,c){a=this.G.createElement(a);if(b)for(var d in b)b.hasOwnProperty(d)&&("style"==d?a.style.cssText=b[d]:a.setAttribute(d,b[d]));c&&a.appendChild(this.G.createTextNode(c));return a};function r(a,b,c){a=a.G.getElementsByTagName(b)[0];a||(a=document.documentElement);a&&a.lastChild&&a.insertBefore(c,a.lastChild)}function ca(a,b){function c(){a.G.body?b():setTimeout(c,0)}c()}
function s(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function t(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function u(a){if("string"===typeof a.na)return a.na;var b=a.w.location.protocol;"about:"==b&&(b=a.K.location.protocol);return"https:"==b?"https:":"http:"}function v(a,b){var c=a.createElement("link",{rel:"stylesheet",href:b,media:"all"}),d=!1;c.onload=function(){d||(d=!0)};c.onerror=function(){d||(d=!0)};r(a,"head",c)}
function w(a,b,c,d){var e=a.G.getElementsByTagName("head")[0];if(e){var f=a.createElement("script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);window.setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function x(a,b){this.Y=a;this.ga=b};function y(a,b,c,d){this.c=null!=a?a:null;this.g=null!=b?b:null;this.D=null!=c?c:null;this.e=null!=d?d:null}var da=/^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;y.prototype.compare=function(a){return this.c>a.c||this.c===a.c&&this.g>a.g||this.c===a.c&&this.g===a.g&&this.D>a.D?1:this.c<a.c||this.c===a.c&&this.g<a.g||this.c===a.c&&this.g===a.g&&this.D<a.D?-1:0};y.prototype.toString=function(){return[this.c,this.g||"",this.D||"",this.e||""].join("")};
function z(a){a=da.exec(a);var b=null,c=null,d=null,e=null;a&&(null!==a[1]&&a[1]&&(b=parseInt(a[1],10)),null!==a[2]&&a[2]&&(c=parseInt(a[2],10)),null!==a[3]&&a[3]&&(d=parseInt(a[3],10)),null!==a[4]&&a[4]&&(e=/^[0-9]+$/.test(a[4])?parseInt(a[4],10):a[4]));return new y(b,c,d,e)};function A(a,b,c,d,e,f,g,h){this.N=a;this.m=h}A.prototype.getName=function(){return this.N};function B(a){this.a=a}var ea=new A("Unknown",0,0,0,0,0,0,new x(!1,!1));
B.prototype.parse=function(){var a;if(-1!=this.a.indexOf("MSIE")||-1!=this.a.indexOf("Trident/")){a=C(this);var b=z(D(this)),c=null,d=E(this.a,/Trident\/([\d\w\.]+)/,1),c=-1!=this.a.indexOf("MSIE")?z(E(this.a,/MSIE ([\d\w\.]+)/,1)):z(E(this.a,/rv:([\d\w\.]+)/,1));""!=d&&z(d);a=new A("MSIE",0,0,0,0,0,0,new x("Windows"==a&&6<=c.c||"Windows Phone"==a&&8<=b.c,!1))}else if(-1!=this.a.indexOf("Opera"))a:if(a=z(E(this.a,/Presto\/([\d\w\.]+)/,1)),z(D(this)),null!==a.c||z(E(this.a,/rv:([^\)]+)/,1)),-1!=this.a.indexOf("Opera Mini/"))a=
z(E(this.a,/Opera Mini\/([\d\.]+)/,1)),a=new A("OperaMini",0,0,0,C(this),0,0,new x(!1,!1));else{if(-1!=this.a.indexOf("Version/")&&(a=z(E(this.a,/Version\/([\d\.]+)/,1)),null!==a.c)){a=new A("Opera",0,0,0,C(this),0,0,new x(10<=a.c,!1));break a}a=z(E(this.a,/Opera[\/ ]([\d\.]+)/,1));a=null!==a.c?new A("Opera",0,0,0,C(this),0,0,new x(10<=a.c,!1)):new A("Opera",0,0,0,C(this),0,0,new x(!1,!1))}else/OPR\/[\d.]+/.test(this.a)?a=F(this):/AppleWeb(K|k)it/.test(this.a)?a=F(this):-1!=this.a.indexOf("Gecko")?
(a="Unknown",b=new y,z(D(this)),b=!1,-1!=this.a.indexOf("Firefox")?(a="Firefox",b=z(E(this.a,/Firefox\/([\d\w\.]+)/,1)),b=3<=b.c&&5<=b.g):-1!=this.a.indexOf("Mozilla")&&(a="Mozilla"),c=z(E(this.a,/rv:([^\)]+)/,1)),b||(b=1<c.c||1==c.c&&9<c.g||1==c.c&&9==c.g&&2<=c.D),a=new A(a,0,0,0,C(this),0,0,new x(b,!1))):a=ea;return a};
function C(a){var b=E(a.a,/(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,1);if(""!=b)return/BB\d{2}/.test(b)&&(b="BlackBerry"),b;a=E(a.a,/(Linux|Mac_PowerPC|Macintosh|Windows|CrOS|PlayStation|CrKey)/,1);return""!=a?("Mac_PowerPC"==a?a="Macintosh":"PlayStation"==a&&(a="Linux"),a):"Unknown"}
function D(a){var b=E(a.a,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(b||(b=E(a.a,/Windows Phone( OS)? ([^;)]+)/,2))||(b=E(a.a,/(iPhone )?OS ([\d_]+)/,2)))return b;if(b=E(a.a,/(?:Linux|CrOS|CrKey) ([^;)]+)/,1))for(var b=b.split(/\s/),c=0;c<b.length;c+=1)if(/^[\d\._]+$/.test(b[c]))return b[c];return(a=E(a.a,/(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/,2))?a:"Unknown"}
function F(a){var b=C(a),c=z(D(a)),d=z(E(a.a,/AppleWeb(?:K|k)it\/([\d\.\+]+)/,1)),e="Unknown",f=new y,f="Unknown",g=!1;/OPR\/[\d.]+/.test(a.a)?e="Opera":-1!=a.a.indexOf("Chrome")||-1!=a.a.indexOf("CrMo")||-1!=a.a.indexOf("CriOS")?e="Chrome":/Silk\/\d/.test(a.a)?e="Silk":"BlackBerry"==b||"Android"==b?e="BuiltinBrowser":-1!=a.a.indexOf("PhantomJS")?e="PhantomJS":-1!=a.a.indexOf("Safari")?e="Safari":-1!=a.a.indexOf("AdobeAIR")?e="AdobeAIR":-1!=a.a.indexOf("PlayStation")&&(e="BuiltinBrowser");"BuiltinBrowser"==
e?f="Unknown":"Silk"==e?f=E(a.a,/Silk\/([\d\._]+)/,1):"Chrome"==e?f=E(a.a,/(Chrome|CrMo|CriOS)\/([\d\.]+)/,2):-1!=a.a.indexOf("Version/")?f=E(a.a,/Version\/([\d\.\w]+)/,1):"AdobeAIR"==e?f=E(a.a,/AdobeAIR\/([\d\.]+)/,1):"Opera"==e?f=E(a.a,/OPR\/([\d.]+)/,1):"PhantomJS"==e&&(f=E(a.a,/PhantomJS\/([\d.]+)/,1));f=z(f);g="AdobeAIR"==e?2<f.c||2==f.c&&5<=f.g:"BlackBerry"==b?10<=c.c:"Android"==b?2<c.c||2==c.c&&1<c.g:526<=d.c||525<=d.c&&13<=d.g;return new A(e,0,0,0,0,0,0,new x(g,536>d.c||536==d.c&&11>d.g))}
function E(a,b,c){return(a=a.match(b))&&a[c]?a[c]:""};function G(a){this.ma=a||"-"}G.prototype.e=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.ma)};function H(a,b){this.N=a;this.Z=4;this.O="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.O=c[1],this.Z=parseInt(c[2],10))}H.prototype.getName=function(){return this.N};function I(a){return a.O+a.Z}function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.d=a;this.q=a.w.document.documentElement;this.Q=b;this.j="wf";this.h=new G("-");this.ha=!1!==b.events;this.F=!1!==b.classes}function J(a){if(a.F){var b=t(a.q,a.h.e(a.j,"active")),c=[],d=[a.h.e(a.j,"loading")];b||c.push(a.h.e(a.j,"inactive"));s(a.q,c,d)}K(a,"inactive")}function K(a,b,c){if(a.ha&&a.Q[b])if(c)a.Q[b](c.getName(),I(c));else a.Q[b]()};function ia(){this.C={}};function L(a,b){this.d=a;this.I=b;this.k=this.d.createElement("span",{"aria-hidden":"true"},this.I)}function M(a){r(a.d,"body",a.k)}
function N(a){var b;b=[];for(var c=a.N.split(/,\s*/),d=0;d<c.length;d++){var e=c[d].replace(/['"]/g,"");-1==e.indexOf(" ")?b.push(e):b.push("'"+e+"'")}b=b.join(",");c="normal";"o"===a.O?c="oblique":"i"===a.O&&(c="italic");return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+b+";"+("font-style:"+c+";font-weight:"+(a.Z+"00")+";")}
L.prototype.remove=function(){var a=this.k;a.parentNode&&a.parentNode.removeChild(a)};function O(a,b,c,d,e,f,g,h){this.$=a;this.ka=b;this.d=c;this.o=d;this.m=e;this.I=h||"BESbswy";this.v={};this.X=f||3E3;this.ca=g||null;this.H=this.u=this.t=null;this.t=new L(this.d,this.I);this.u=new L(this.d,this.I);this.H=new L(this.d,this.I);a=new H("serif",I(this.o));a=N(a);this.t.k.style.cssText=a;a=new H("sans-serif",I(this.o));a=N(a);this.u.k.style.cssText=a;a=new H("monospace",I(this.o));a=N(a);this.H.k.style.cssText=a;M(this.t);M(this.u);M(this.H);this.v.serif=this.t.k.offsetWidth;this.v["sans-serif"]=
this.u.k.offsetWidth;this.v.monospace=this.H.k.offsetWidth}var P={sa:"serif",ra:"sans-serif",qa:"monospace"};O.prototype.start=function(){this.oa=n();var a=new H(this.o.getName()+",serif",I(this.o)),a=N(a);this.t.k.style.cssText=a;a=new H(this.o.getName()+",sans-serif",I(this.o));a=N(a);this.u.k.style.cssText=a;Q(this)};function R(a,b,c){for(var d in P)if(P.hasOwnProperty(d)&&b===a.v[P[d]]&&c===a.v[P[d]])return!0;return!1}
function Q(a){var b=a.t.k.offsetWidth,c=a.u.k.offsetWidth;b===a.v.serif&&c===a.v["sans-serif"]||a.m.ga&&R(a,b,c)?n()-a.oa>=a.X?a.m.ga&&R(a,b,c)&&(null===a.ca||a.ca.hasOwnProperty(a.o.getName()))?S(a,a.$):S(a,a.ka):ja(a):S(a,a.$)}function ja(a){setTimeout(k(function(){Q(this)},a),50)}function S(a,b){a.t.remove();a.u.remove();a.H.remove();b(a.o)};function T(a,b,c,d){this.d=b;this.A=c;this.S=0;this.ea=this.ba=!1;this.X=d;this.m=a.m}function ka(a,b,c,d,e){c=c||{};if(0===b.length&&e)J(a.A);else for(a.S+=b.length,e&&(a.ba=e),e=0;e<b.length;e++){var f=b[e],g=c[f.getName()],h=a.A,m=f;h.F&&s(h.q,[h.h.e(h.j,m.getName(),I(m).toString(),"loading")]);K(h,"fontloading",m);h=null;h=new O(k(a.ia,a),k(a.ja,a),a.d,f,a.m,a.X,d,g);h.start()}}
T.prototype.ia=function(a){var b=this.A;b.F&&s(b.q,[b.h.e(b.j,a.getName(),I(a).toString(),"active")],[b.h.e(b.j,a.getName(),I(a).toString(),"loading"),b.h.e(b.j,a.getName(),I(a).toString(),"inactive")]);K(b,"fontactive",a);this.ea=!0;la(this)};
T.prototype.ja=function(a){var b=this.A;if(b.F){var c=t(b.q,b.h.e(b.j,a.getName(),I(a).toString(),"active")),d=[],e=[b.h.e(b.j,a.getName(),I(a).toString(),"loading")];c||d.push(b.h.e(b.j,a.getName(),I(a).toString(),"inactive"));s(b.q,d,e)}K(b,"fontinactive",a);la(this)};function la(a){0==--a.S&&a.ba&&(a.ea?(a=a.A,a.F&&s(a.q,[a.h.e(a.j,"active")],[a.h.e(a.j,"loading"),a.h.e(a.j,"inactive")]),K(a,"active")):J(a.A))};function U(a){this.K=a;this.B=new ia;this.pa=new B(a.navigator.userAgent);this.a=this.pa.parse();this.U=this.V=0;this.R=this.T=!0}
U.prototype.load=function(a){this.d=new q(this.K,a.context||this.K);this.T=!1!==a.events;this.R=!1!==a.classes;var b=new ha(this.d,a),c=[],d=a.timeout;b.F&&s(b.q,[b.h.e(b.j,"loading")]);K(b,"loading");var c=this.B,e=this.d,f=[],g;for(g in a)if(a.hasOwnProperty(g)){var h=c.C[g];h&&f.push(h(a[g],e))}c=f;this.U=this.V=c.length;a=new T(this.a,this.d,b,d);d=0;for(g=c.length;d<g;d++)e=c[d],e.L(this.a,k(this.la,this,e,b,a))};
U.prototype.la=function(a,b,c,d){var e=this;d?a.load(function(a,b,d){ma(e,c,a,b,d)}):(a=0==--this.V,this.U--,a&&0==this.U?J(b):(this.R||this.T)&&ka(c,[],{},null,a))};function ma(a,b,c,d,e){var f=0==--a.V;(a.R||a.T)&&setTimeout(function(){ka(b,c,d||null,e||null,f)},0)};function na(a,b,c){this.P=a?a:b+oa;this.s=[];this.W=[];this.fa=c||""}var oa="//fonts.googleapis.com/css";na.prototype.e=function(){if(0==this.s.length)throw Error("No fonts to load!");if(-1!=this.P.indexOf("kit="))return this.P;for(var a=this.s.length,b=[],c=0;c<a;c++)b.push(this.s[c].replace(/ /g,"+"));a=this.P+"?family="+b.join("%7C");0<this.W.length&&(a+="&subset="+this.W.join(","));0<this.fa.length&&(a+="&text="+encodeURIComponent(this.fa));return a};function pa(a){this.s=a;this.da=[];this.M={}}
var qa={latin:"BESbswy",cyrillic:"&#1081;&#1103;&#1046;",greek:"&#945;&#946;&#931;",khmer:"&#x1780;&#x1781;&#x1782;",Hanuman:"&#x1780;&#x1781;&#x1782;"},ra={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},sa={i:"i",italic:"i",n:"n",normal:"n"},ta=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
pa.prototype.parse=function(){for(var a=this.s.length,b=0;b<a;b++){var c=this.s[b].split(":"),d=c[0].replace(/\+/g," "),e=["n4"];if(2<=c.length){var f;var g=c[1];f=[];if(g)for(var g=g.split(","),h=g.length,m=0;m<h;m++){var l;l=g[m];if(l.match(/^[\w-]+$/)){l=ta.exec(l.toLowerCase());var p=void 0;if(null==l)p="";else{p=void 0;p=l[1];if(null==p||""==p)p="4";else var fa=ra[p],p=fa?fa:isNaN(p)?"4":p.substr(0,1);l=l[2];p=[null==l||""==l?"n":sa[l],p].join("")}l=p}else l="";l&&f.push(l)}0<f.length&&(e=f);
3==c.length&&(c=c[2],f=[],c=c?c.split(","):f,0<c.length&&(c=qa[c[0]])&&(this.M[d]=c))}this.M[d]||(c=qa[d])&&(this.M[d]=c);for(c=0;c<e.length;c+=1)this.da.push(new H(d,e[c]))}};function V(a,b){this.a=(new B(navigator.userAgent)).parse();this.d=a;this.f=b}var ua={Arimo:!0,Cousine:!0,Tinos:!0};V.prototype.L=function(a,b){b(a.m.Y)};V.prototype.load=function(a){var b=this.d;"MSIE"==this.a.getName()&&1!=this.f.blocking?ca(b,k(this.aa,this,a)):this.aa(a)};
V.prototype.aa=function(a){for(var b=this.d,c=new na(this.f.api,u(b),this.f.text),d=this.f.families,e=d.length,f=0;f<e;f++){var g=d[f].split(":");3==g.length&&c.W.push(g.pop());var h="";2==g.length&&""!=g[1]&&(h=":");c.s.push(g.join(h))}d=new pa(d);d.parse();v(b,c.e());a(d.da,d.M,ua)};function W(a,b){this.d=a;this.f=b;this.p=[]}W.prototype.J=function(a){var b=this.d;return u(this.d)+(this.f.api||"//f.fontdeck.com/s/css/js/")+(b.w.location.hostname||b.K.location.hostname)+"/"+a+".js"};
W.prototype.L=function(a,b){var c=this.f.id,d=this.d.w,e=this;c?(d.__webfontfontdeckmodule__||(d.__webfontfontdeckmodule__={}),d.__webfontfontdeckmodule__[c]=function(a,c){for(var d=0,m=c.fonts.length;d<m;++d){var l=c.fonts[d];e.p.push(new H(l.name,ga("font-weight:"+l.weight+";font-style:"+l.style)))}b(a)},w(this.d,this.J(c),function(a){a&&b(!1)})):b(!1)};W.prototype.load=function(a){a(this.p)};function X(a,b){this.d=a;this.f=b;this.p=[]}X.prototype.J=function(a){var b=u(this.d);return(this.f.api||b+"//use.typekit.net")+"/"+a+".js"};X.prototype.L=function(a,b){var c=this.f.id,d=this.d.w,e=this;c?w(this.d,this.J(c),function(a){if(a)b(!1);else{if(d.Typekit&&d.Typekit.config&&d.Typekit.config.fn){a=d.Typekit.config.fn;for(var c=0;c<a.length;c+=2)for(var h=a[c],m=a[c+1],l=0;l<m.length;l++)e.p.push(new H(h,m[l]));try{d.Typekit.load({events:!1,classes:!1})}catch(p){}}b(!0)}},2E3):b(!1)};
X.prototype.load=function(a){a(this.p)};function Y(a,b){this.d=a;this.f=b;this.p=[]}Y.prototype.L=function(a,b){var c=this,d=c.f.projectId,e=c.f.version;if(d){var f=c.d.w;w(this.d,c.J(d,e),function(e){if(e)b(!1);else{if(f["__mti_fntLst"+d]&&(e=f["__mti_fntLst"+d]()))for(var h=0;h<e.length;h++)c.p.push(new H(e[h].fontfamily));b(a.m.Y)}}).id="__MonotypeAPIScript__"+d}else b(!1)};Y.prototype.J=function(a,b){var c=u(this.d),d=(this.f.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return c+"//"+d+"/"+a+".js"+(b?"?v="+b:"")};
Y.prototype.load=function(a){a(this.p)};function Z(a,b){this.d=a;this.f=b}Z.prototype.load=function(a){var b,c,d=this.f.urls||[],e=this.f.families||[],f=this.f.testStrings||{};b=0;for(c=d.length;b<c;b++)v(this.d,d[b]);d=[];b=0;for(c=e.length;b<c;b++){var g=e[b].split(":");if(g[1])for(var h=g[1].split(","),m=0;m<h.length;m+=1)d.push(new H(g[0],h[m]));else d.push(new H(g[0]))}a(d,f)};Z.prototype.L=function(a,b){return b(a.m.Y)};var $=new U(this);$.B.C.custom=function(a,b){return new Z(b,a)};$.B.C.fontdeck=function(a,b){return new W(b,a)};$.B.C.monotype=function(a,b){return new Y(b,a)};$.B.C.typekit=function(a,b){return new X(b,a)};$.B.C.google=function(a,b){return new V(b,a)};this.WebFont||(this.WebFont={},this.WebFont.load=k($.load,$),this.WebFontConfig&&$.load(this.WebFontConfig));})(this,document);
