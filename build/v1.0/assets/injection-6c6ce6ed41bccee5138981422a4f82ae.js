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
(function() {
  window.UOMinjectHeader = function() {
    var assethost, bodyclass, defaultlink, footer, header, i, local, login, main, max, mobile, n, nav, navparent, opt, page, pagenav, parent, rootlink, selector, sep, sitemap, tools, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
    if (/(MSIE 8.0)/g.test(navigator.userAgent)) {
      bodyclass = 'ie ie8';
    }
    if (/(MSIE 9.0)/g.test(navigator.userAgent)) {
      bodyclass = 'ie ie9';
    }
    if (/(MSIE 10.0)/g.test(navigator.userAgent)) {
      bodyclass = 'ie10';
    }
    if (/(Trident\/7.0)/g.test(navigator.userAgent)) {
      bodyclass = 'ie11';
    }
    if (!(document.body.hasClass('ie') || (typeof bodyclass === 'undefined'))) {
      document.body.addClass(bodyclass);
    }
    defaultlink = 'https://www.unimelb.edu.au';
    if ("development" === 'development') {
      assethost = '/releases/v1.0/assets/shared';
    } else {
      assethost = '//uom-design-system.s3.amazonaws.com/shared';
    }
    if (document.countSelector('.page-header-tools') === 0) {
      parent = document.querySelector('.uomcontent');
      if (!parent) {
        parent = document.createElement('div');
        parent.addClass('uomcontent');
        document.body.appendChild(parent);
        _ref = document.body.childNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          if (n && n !== parent) {
            document.body.removeChild(n);
            parent.appendChild(n);
          }
        }
      }
      page = document.querySelector('.page-inner');
      if (!page) {
        page = document.createElement('div');
        page.addClass('page-inner');
      }
      header = document.querySelector('.page-header');
      if (!header) {
        header = document.createElement('div');
        header.addClass('page-header');
        if (document.countSelector('.page-inner > .floating') === 1) {
          header.innerHTML = "<a class=\"page-header-logo\" href=\"" + defaultlink + "\">\n  <svg width=\"100\" height=\"100\" viewBox=\"0 0 140 140\" aria-labelledby=\"aria-uom-title\" role=\"img\">\n    <title id=\"aria-uom-title\">The University of Melbourne Logo</title>\n    <image xlink:href=\"" + assethost + "/logo.svg\" src=\"" + assethost + "/logo.png\" alt=\"The University of Melbourne Logo\" width=\"140\" height=\"140\" preserveAspectRatio=\"xMaxYMin meet\"/>\n  </svg>\n</a>";
          header.addClass('floating');
          if (document.querySelector('.page-inner > .floating').hasClass('reverse')) {
            header.addClass('reverse');
          }
          _ref1 = document.querySelector('.floating').childNodes;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            n = _ref1[_j];
            header.appendChild(n);
          }
        } else {
          if (document.countSelector('.page-local-history .root') === 0) {
            rootlink = "<a href=\"https://unimelb.edu.au/\" title=\"The University of Melbourne\">The University of Melbourne</a>";
          } else {
            rootlink = "";
          }
          header.innerHTML = "<header>\n  <a class=\"page-header-logo\" href=\"" + defaultlink + "\">\n    <svg width=\"100\" height=\"100\" viewBox=\"0 0 140 140\" aria-labelledby=\"aria-uom-title\" role=\"img\">\n      <title id=\"aria-uom-title\">The University of Melbourne Logo</title>\n      <image xlink:href=\"" + assethost + "/logo.svg\" src=\"" + assethost + "/logo.png\" alt=\"The University of Melbourne Logo\" width=\"140\" height=\"140\" preserveAspectRatio=\"xMaxYMin meet\"/>\n    </svg>\n  </a>\n  <div class=\"page-header-navigation\">\n    " + rootlink + "\n  </div>\n</header>";
        }
        parent.insertBefore(header, page);
      } else {
        page.removeChild(header);
        parent.insertBefore(header, page);
      }
      local = document.querySelector('.page-local-history');
      if (local) {
        navparent = document.querySelector('.page-header-navigation');
        local.parentNode.removeChild(local);
        if (navparent) {
          if (rootlink !== "") {
            sep = document.createElement("span");
            sep.innerHTML = "/";
            navparent.appendChild(sep);
          }
          navparent.appendChild(local);
          mobile = document.createElement('div');
          mobile.addClass('mobile-nav');
          selector = document.createElement('select');
          selector.setAttribute('role', 'tablist');
          selector.addClass('alt');
          selector.addEventListener('change', function(e) {
            if (this.value) {
              if (this.value.substr(0, 1) !== '#') {
                return window.location = this.value;
              }
            }
          });
          max = local.countSelector('a') - 1;
          _ref2 = local.querySelectorAll('a');
          for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
            nav = _ref2[i];
            opt = document.createElement('option');
            opt.setAttribute('role', 'tab');
            opt.setAttribute('value', nav.getAttribute('href'));
            opt.appendChild(document.createTextNode(nav.firstChild.nodeValue));
            if (i === max) {
              opt.setAttribute('selected', 'selected');
            }
            selector.appendChild(opt);
          }
          mobile.appendChild(selector);
          pagenav = local.parentNode;
          pagenav.insertBefore(mobile, pagenav.firstChild);
        }
      }
      tools = document.querySelector('.page-header-tools');
      if (!tools) {
        tools = document.createElement("div");
        tools.addClass('page-header-tools');
        if (document.countSelector('[role="main"].no-login') === 0) {
          tools.innerHTML = "<a class=\"page-header-icon\" href=\"#sitemap\" title=\"Search\"><svg role=\"img\"><use xlink:href=\"#icon-search\"/></svg> Search</a><!--\n--><a class=\"page-header-icon\" href=\"#sitemap\" title=\"Login\" data-modal-target=\"uom-login\"><svg role=\"img\"><use xlink:href=\"#icon-user\" /></svg> Portals</a><!--\n--><a class=\"page-header-icon\" href=\"#sitemap\" title=\"Menu\"><svg role=\"img\"><use xlink:href=\"#icon-menu\"/></svg> Menu</a>";
        } else {
          tools.innerHTML = "<a class=\"page-header-icon\" href=\"#sitemap\" title=\"Search\"><svg role=\"img\"><use xlink:href=\"#icon-search\" /></svg> Search</a><!--\n--><a class=\"page-header-icon\" href=\"#sitemap\" title=\"Menu\"><svg role=\"img\"><use xlink:href=\"#icon-menu\" /></svg> Menu</a>";
        }
        navparent = header.querySelector('header');
        if (!navparent) {
          navparent = header;
        }
        navparent.appendChild(tools);
        window.addEventListener("scroll", function() {
          var outer;
          if (/(Firefox)/g.test(navigator.userAgent) || /(Trident)/g.test(navigator.userAgent)) {
            outer = document.querySelector('html');
          } else {
            outer = document.body;
          }
          if (outer.scrollTop > 40) {
            return header.addClass('fixed');
          } else {
            return header.removeClass('fixed');
          }
        });
      }
      header.setAttribute('role', 'banner');
      main = document.querySelector('[role="main"]');
      if (!main) {
        main = document.createElement('div');
        main.setAttribute('role', 'main');
      } else {
        main.parentNode.removeChild(main);
      }
      footer = document.querySelector('.page-footer');
      page.insertBefore(main, footer);
      sitemap = document.querySelector('#globalsitemap');
      _ref3 = parent.childNodes;
      for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
        n = _ref3[_l];
        if (n && n !== page && n !== sitemap && n !== header) {
          parent.removeChild(n);
          main.appendChild(n);
        }
      }
      parent.appendChild(page);
      login = document.querySelector('.page-login');
      if (!login) {
        if (document.countSelector('[role="main"].no-login') === 0) {
          login = document.createElement("div");
          login.addClass('modal__dialog');
          login.addClass('page-login');
          login.id = 'uom-login';
          login.innerHTML = "<a class=\"modal__close\">Close</a>\n<h2 class=\"title\">Please Choose</h2>\n<div class=\"half\">\n  <a class=\"button-fill\" href=\"https://my.unimelb.edu.au/studentportal/faces/home\">\n    <svg role=\"img\"><use xlink:href=\"#icon-students\" /></svg>\n    <h2>Current Students</h2>\n    <p>Go to my.unimelb</p>\n  </a>\n  <a class=\"button-fill\" href=\"https://staff.unimelb.edu.au\">\n    <svg role=\"img\"><use xlink:href=\"#icon-user\" /></svg>\n    <h2>Staff Members</h2>\n    <p>Go to the staff hub</p>\n  </a>\n</div>";
          return parent.appendChild(login);
        }
      }
    }
  };

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
  window.UOMinjectGlobalNav = function() {
    var UOMGlobalNavState, absroot, assethost, back, childgroup, elements, firstli, form, group, lastli, localnav, nav, navstate, navtitle, node, rootmenu, trigger, _i, _j, _len, _len1, _ref, _ref1;
    UOMGlobalNavState = (function() {
      function UOMGlobalNavState() {
        this.page = document.querySelector('.page-inner');
        this.header = document.querySelector('.page-header');
        this.sitemap = document.querySelector('#globalsitemap');
        this.trigger = document.querySelector('.sitemap-label');
        this.menutrigger = document.querySelector('.page-header-tools a[title="Menu"]');
        this.searchtrigger = document.querySelector('.page-header-tools a[title="Search"]');
        this.blanket = document.querySelector('.modal__blanket');
        this.setupEvents();
      }

      UOMGlobalNavState.prototype.setupEvents = function() {
        var t, trigger, _i, _j, _len, _len1, _ref, _ref1;
        t = this;
        if (document.countSelector('#sitemap') === 1) {
          this.localnav = document.querySelector('#sitemap');
          this.localsitemaptrigger = this.localnav.querySelector('.sitemap-link');
          this.menutrigger.addEventListener('click', function(e) {
            e.preventDefault();
            t.blanket.toggleClass('on');
            t.trigger.removeClass('active');
            t.page.removeClass('global-active');
            t.header.removeClass('global-active');
            t.localnav.removeClass('global-active');
            t.sitemap.removeClass('active');
            t.sitemap.addClass('reveal');
            t.page.toggleClass('active');
            t.localnav.toggleClass('active');
            t.header.removeClass('fixed');
            return t.header.toggleClass('active');
          });
          _ref = this.localnav.querySelectorAll('h2:first-child');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            trigger = _ref[_i];
            trigger.addEventListener('click', function(e) {
              e.preventDefault();
              if (t.page.hasClass('global-active')) {
                t.page.removeClass('global-active');
                t.page.addClass('active');
                t.header.addClass('active');
                t.localnav.removeClass('global-active');
                t.localnav.addClass('active');
                return t.sitemap.removeClass('active');
              } else {
                t.blanket.removeClass('on');
                t.trigger.addClass('active');
                t.page.removeClass('global-active');
                t.header.removeClass('global-active');
                t.localnav.removeClass('global-active');
                t.sitemap.removeClass('active');
                t.page.toggleClass('active');
                t.localnav.toggleClass('active');
                return t.header.toggleClass('active');
              }
            });
          }
          _ref1 = this.localnav.querySelectorAll('a');
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            trigger = _ref1[_j];
            if (trigger.getAttribute('href').indexOf('#') !== -1) {
              trigger.addEventListener('click', function(e) {
                if (t.page.hasClass('global-active')) {
                  t.page.removeClass('global-active');
                  t.page.addClass('active');
                  t.header.addClass('active');
                  t.localnav.removeClass('global-active');
                  t.localnav.addClass('active');
                  return t.sitemap.removeClass('active');
                } else {
                  t.blanket.removeClass('on');
                  t.trigger.addClass('active');
                  t.page.removeClass('global-active');
                  t.header.removeClass('global-active');
                  t.localnav.removeClass('global-active');
                  t.sitemap.removeClass('active');
                  t.page.toggleClass('active');
                  t.localnav.toggleClass('active');
                  return t.header.toggleClass('active');
                }
              });
            }
          }
          this.trigger.addEventListener('click', function(e) {
            e.preventDefault();
            t.blanket.addClass('on');
            t.trigger.addClass('active');
            t.page.addClass('global-active');
            t.header.addClass('global-active');
            t.localnav.removeClass('active');
            t.localnav.addClass('global-active');
            return t.sitemap.toggleClass('active');
          });
          this.sitemap.querySelector('.close-button').addEventListener('click', function(e) {
            e.preventDefault();
            t.page.removeClass('global-active');
            t.page.addClass('active');
            t.header.removeClass('global-active');
            t.header.addClass('active');
            t.trigger.removeClass('active');
            t.localnav.removeClass('global-active');
            t.localnav.addClass('active');
            return t.sitemap.removeClass('active');
          });
          this.localsitemaptrigger.addEventListener('click', function(e) {
            e.preventDefault();
            t.trigger.addClass('active');
            t.page.addClass('global-active');
            t.header.addClass('global-active');
            t.localnav.removeClass('active');
            t.localnav.addClass('global-active');
            return t.sitemap.toggleClass('active');
          });
        } else {
          this.menutrigger.addEventListener('click', function(e) {
            e.preventDefault();
            t.blanket.toggleClass('on');
            t.trigger.addClass('active');
            t.page.toggleClass('global-active');
            t.header.toggleClass('global-active');
            return t.sitemap.toggleClass('active');
          });
          this.sitemap.querySelector('.close-button').addEventListener('click', function(e) {
            e.preventDefault();
            t.blanket.removeClass('on');
            t.trigger.addClass('active');
            t.page.toggleClass('global-active');
            t.header.toggleClass('global-active');
            return t.sitemap.toggleClass('active');
          });
        }
        this.blanket.addEventListener('click', function(e) {
          e.preventDefault();
          t.blanket.removeClass('on');
          t.trigger.addClass('active');
          t.page.removeClass('global-active');
          t.page.removeClass('active');
          t.header.removeClass('global-active');
          t.header.removeClass('active');
          if (t.localnav) {
            t.localnav.removeClass('global-active');
            t.localnav.removeClass('active');
          }
          return t.sitemap.removeClass('active');
        });
        if (this.searchtrigger) {
          return this.searchtrigger.addEventListener('click', function(e) {
            e.preventDefault();
            t.blanket.toggleClass('on');
            t.trigger.addClass('active');
            t.page.addClass('global-active');
            t.header.addClass('global-active');
            if (t.localnav) {
              t.localnav.addClass('global-active');
            }
            t.sitemap.addClass('active');
            t.header.removeClass('fixed');
            if (!(/Firefox/.test(navigator.userAgent) && parseFloat(/[^\/|\s]?(?:\d*\.)?\d+$/.exec(navigator.userAgent)[0]) > 30.0)) {
              return t.sitemap.querySelector('input[type="search"]').focus();
            }
          });
        }
      };

      return UOMGlobalNavState;

    })();
    if (document.countSelector('#sitemap') === 1) {
      localnav = document.querySelector('#sitemap');
      if (localnav.countSelector('a.sitemap-link') === 0) {
        rootmenu = localnav.querySelector('ul');
        absroot = localnav.getAttribute('data-absolute-root') || '/';
        navtitle = localnav.querySelector('h2');
        firstli = document.createElement('li');
        firstli.addClass('home');
        firstli.innerHTML = '<a href="' + absroot + '">' + (navtitle.textContent || navtitle.innerText) + '</a>';
        rootmenu.insertBefore(firstli, rootmenu.firstChild);
        navtitle.textContent = 'Close';
        navtitle.innerText = 'Close';
        lastli = document.createElement('li');
        lastli.innerHTML = '<a class="sitemap-link" href="https://unimelb.edu.au/sitemap">Browse University</a>';
        rootmenu.appendChild(lastli);
        localnav.removeClass('no-js');
        document.querySelector('.uomcontent').appendChild(localnav);
        _ref = localnav.querySelectorAll('a');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          group = _ref[_i];
          elements = [];
          _ref1 = group.parentNode.childNodes;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            node = _ref1[_j];
            if (node.nodeType === 1 && !node.hasClass('sitemap-link') && node.nodeName !== 'H2') {
              elements.push(node);
            }
          }
          if (elements.length > 1) {
            childgroup = elements[1];
            back = document.createElement('span');
            back.addClass('back');
            back.innerHTML = group.firstChild.data;
            childgroup.insertBefore(back, childgroup.firstChild);
            childgroup.firstChild.addEventListener('click', function(e) {
              e.preventDefault();
              this.parentNode.toggleClass('hide');
              return this.parentNode.toggleClass('active');
            });
            group.addClass('parent');
            childgroup.addClass('hide');
            group.addEventListener('click', function(e) {
              e.preventDefault();
              this.parentNode.querySelector('div').toggleClass('hide');
              this.parentNode.querySelector('div').toggleClass('active');
              return localnav.scrollTop = 0;
            });
          }
        }
      }
    }
    trigger = document.querySelector('div.sitemap-label');
    if (!trigger) {
      trigger = document.createElement('div');
      trigger.setAttribute('class', 'sitemap-label active');
      trigger.innerHTML = "<span>University Sitemap</span>";
      document.querySelector('.uomcontent').appendChild(trigger);
    }
    nav = document.querySelector('#globalsitemap');
    if (!nav) {
      if ("development" === 'development') {
        assethost = '/releases/v1.0/assets/shared';
      } else {
        assethost = '//uom-design-system.s3.amazonaws.com/shared';
      }
      nav = document.createElement('div');
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('id', 'globalsitemap');
      nav.innerHTML = "<a class=\"close-button\" href=\"\">Close</a>\n<a href=\"https://www.unimelb.edu.au\" class=\"logo\">\n  <svg width=\"100\" height=\"100\" viewBox=\"0 0 140 140\" aria-labelledby=\"aria-uom-title\" role=\"img\">\n    <image xlink:href=\"" + assethost + "/logo.svg\" src=\"" + assethost + "/logo.png\" alt=\"The University of Melbourne Logo\" width=\"140\" height=\"140\" preserveAspectRatio=\"xMaxYMin meet\"/>\n  </svg>\n</a>\n<form action=\"https://search.unimelb.edu.au\" method=\"get\">\n  <fieldset>\n    <input data-required placeholder=\"Search\" name=\"q\" type=\"search\" title=\"Please enter a keyword\" aria-label=\"Search the University\" />\n    <button type=\"submit\" class=\"search-button\"><span>GO</span><svg class=\"icon\" role=\"img\"><use xlink:href=\"#icon-search\"></use></svg></button>\n  </fieldset>\n</form>\n<ul class=\"quicklinks\">\n  <li><a href=\"http://about.unimelb.edu.au/governance-and-leadership/faculties\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-faculties\" /></svg> Faculties and Graduate Schools</a></li>\n  <li><a href=\"http://students.unimelb.edu.au/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-students\" /></svg> Current Students</a></li>\n  <li><a href=\"http://library.unimelb.edu.au/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-library\" /></svg> Library</a></li>\n  <li><a href=\"http://www.unimelb.edu.au/contact/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-phone\" /></svg> Contact us</a></li>\n  <li><a href=\"http://maps.unimelb.edu.au/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-maps\" /></svg> Maps</a></li>\n  <li><a href=\"http://www.campaign.unimelb.edu.au/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-campaign\" /></svg> Support the Campaign</a></li>\n</ul>\n<div>\n  <div class=\"col-3\">\n    <div>\n      <h2><a href=\"http://coursesearch.unimelb.edu.au/\">Study at Melbourne</a></h2>\n      <ul>\n        <li><a href=\"http://coursesearch.unimelb.edu.au/undergrad\">Undergraduate study</a></li>\n        <li><a href=\"http://coursesearch.unimelb.edu.au/grad\">Graduate study</a></li>\n        <li><a href=\"http://futurestudents.unimelb.edu.au/\">Future students</a></li>\n        <li><a href=\"http://futurestudents.unimelb.edu.au/admissions\">Admissions, fees &amp; applications</a></li>\n        <li><a href=\"http://futurestudents.unimelb.edu.au/info/international\">International students</a></li>\n        <li><a href=\"http://www.unimelb.edu.au/campustour/\">Campus tour</a></li>\n      </ul>\n    </div>\n    <div>\n      <h2><a href=\"http://about.unimelb.edu.au/\">About us</a></h2>\n      <ul>\n        <li><a href=\"http://about.unimelb.edu.au/strategy-and-leadership\">Strategy and leadership</a></li>\n        <li><a href=\"http://about.unimelb.edu.au/tradition-of-excellence\">Tradition of excellence</a></li>\n        <li><a href=\"http://about.unimelb.edu.au/international-connections\">International connections</a></li>\n        <li><a href=\"http://about.unimelb.edu.au/campuses-and-facilities\">Campuses and facilities</a></li>\n        <li><a href=\"http://about.unimelb.edu.au/governance-and-leadership\">Structure and governance</a></li>\n        <li><a href=\"http://about.unimelb.edu.au/policy-and-publications\">Policy and publications</a></li>\n        <li><a href=\"http://hr.unimelb.edu.au/careers\">Careers at Melbourne</a></li>\n        <li><a href=\"http://newsroom.unimelb.edu.au\">Newsroom</a></li>\n\n      </ul>\n    </div>\n    <div>\n      <h2><a href=\"http://unimelb.edu.au/research/\">Research</a></h2>\n      <ul>\n        <li><a href=\"http://www.unimelb.edu.au/research/about-research-at-melbourne.html\">About Research at Melbourne</a></li>\n        <li><a href=\"http://ri.unimelb.edu.au/\">Research institutes</a></li>\n        <li><a href=\"http://www.unimelb.edu.au/research/research-institutes-centres.html\">Research Centres</a></li>\n        <li><a href=\"http://findanexpert.unimelb.edu.au/\">Find an expert or supervisor</a></li>\n        <li><a href=\"http://gradresearch.unimelb.edu.au/\">Graduate researchers</a></li>\n        <li><a href=\"https://pursuit.unimelb.edu.au/\">Pursuit: our research showcase</a></li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"col-3\">\n    <div>\n      <h2><a href=\"http://unimelb.edu.au/engage/\">Engagement</a></h2>\n      <ul>\n        <li><a href=\"http://events.unimelb.edu.au/\">Events</a></li>\n        <li><a href=\"http://engage.unimelb.edu.au/community-engagement\">Community</a></li>\n        <li><a href=\"http://engage.unimelb.edu.au/global-engagement\">Global Engagement</a></li>\n        <li><a href=\"http://businessconnect.unimelb.edu.au/\">Business &amp; Industry</a></li>\n        <li><a href=\"http://engage.unimelb.edu.au/cultural-engagement\">Arts &amp; Culture</a></li>\n        <li><a href=\"http://www.sport.unimelb.edu.au/facilities/index.html\">Sports Facilities</a></li>\n      </ul>\n    </div>\n    <div>\n      <h2><a href=\"http://alumni.unimelb.edu.au/\">Alumni &amp; friends</a></h2>\n      <ul>\n        <li><a href=\"http://alumni.unimelb.edu.au/benefits-services\">Benefits &amp; services</a></li>\n        <li><a href=\"http://www.campaign.unimelb.edu.au/\">Giving</a></li>\n        <li><a href=\"http://alumni.unimelb.edu.au/get-involved\">Get involved</a></li>\n        <li><a href=\"http://alumni.unimelb.edu.au/my-network\">Networks</a></li>\n        <li><a href=\"http://mag.alumni.unimelb.edu.au/?sl=1\">3010: alumni magazine</a></li>\n        <li><a href=\"http://alumni.unimelb.edu.au/news\">News</a></li>\n        <li><a href=\"http://alumni.online.unimelb.edu.au/s/1182/3col.aspx?sid=1182&gid=1&pgid=722\">Events</a></li>\n      </ul>\n    </div>\n    <div>\n      <h2><a href=\"http://www.unimelb.edu.au/contact/\">Contact &amp; Maps</a></h2>\n      <ul>\n        <li><a href=\"http://ask.unimelb.edu.au/app/contact\">Contact us</a></li>\n        <li><a href=\"http://ask.unimelb.edu.au\">Enquiries</a></li>\n        <li><a href=\"http://newsroom.melbourne.edu/\">Media</a></li>\n        <li><a href=\"http://findanexpert.unimelb.edu.au\">Find an expert</a></li>\n        <li><a href=\"http://maps.unimelb.edu.au/\">Campus maps</a></li>\n        <li><a href=\"http://pcs.unimelb.edu.au/traffic-and-parking/\">Traffic, parking &amp; bicycles</a></li>\n        <li><a href=\"http://directory.unimelb.edu.au/\">Find a staff member</a></li>\n      </ul>\n    </div>\n  </div>\n</div>";
      form = nav.querySelector('form');
      if (/(MSIE [8|9].0)/g.test(navigator.userAgent)) {
        form.elements[1].value = 'Search';
        form.elements[1].addEventListener('click', function(e) {
          return this.select();
        });
      }
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        return window.location = this.action + "#gsc.q=" + this.elements[1].value;
      });
      document.querySelector('.uomcontent').appendChild(nav);
      return navstate = new UOMGlobalNavState();
    }
  };

}).call(this);
(function() {
  window.UOMinjectFooter = function() {
    var assethost, footer, page;
    footer = document.querySelector('.page-footer');
    if (!footer) {
      if ("development" === 'development') {
        assethost = '/releases/v1.0/assets/shared';
      } else {
        assethost = '//uom-design-system.s3.amazonaws.com/shared';
      }
      footer = document.createElement('div');
      footer.addClass('page-footer');
      footer.innerHTML = "<footer>\n  <a class=\"unimelb-lge\" href=\"https://unimelb.edu.au\">\n    <svg width=\"300\" height=\"100\" viewBox=\"0 0 300 100\" aria-labelledby=\"aria-uom-title\" role=\"img\">\n      <image xlink:href=\"" + assethost + "/lockup.svg\" src=\"" + assethost + "/lockup.png\" alt=\"The University of Melbourne Logo\" width=\"300\" height=\"100\" preserveAspectRatio=\"xMaxYMin meet\"/>\n    </svg>\n  </a>\n  <ul class=\"quicklinks\">\n    <li><a href=\"http://about.unimelb.edu.au/governance-and-leadership/faculties\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-faculties\" /></svg> Faculties and Graduate Schools</a></li>\n    <li><a href=\"http://students.unimelb.edu.au/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-students\" /></svg> Current Students</a></li>\n    <li><a href=\"http://library.unimelb.edu.au/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-library\" /></svg> Library</a></li>\n    <li><a href=\"http://www.unimelb.edu.au/contact/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-phone\" /></svg> Contact us</a></li>\n    <li><a href=\"http://maps.unimelb.edu.au/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-maps\" /></svg> Maps</a></li>\n    <li><a href=\"http://www.campaign.unimelb.edu.au/\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-campaign\" /></svg> Support the Campaign</a></li>\n  </ul>\n  <ul class=\"page-footer-section nav\">\n    <li>\n      <a href=\"http://safety.unimelb.edu.au/about/contacts/emergency.html\">Emergency Information</a>\n    </li>\n    <li>\n      <a href=\"http://www.unimelb.edu.au/disclaimer/\">Disclaimer &amp; Copyright</a>\n    </li>\n    <li>\n      <a href=\"http://www.unimelb.edu.au/accessibility/index.html\">Accessibility</a>\n    </li>\n    <li>\n      <a href=\"http://www.unimelb.edu.au/disclaimer/privacy.html\">Privacy</a>\n    </li>\n  </ul>\n  <ul class=\"page-footer-section social\">\n    <li class=\"social-facebook\">\n      <a href=\"http://www.facebook.com/melbuni\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-facebook\" /></svg> Facebook</a>\n    </li>\n    <li class=\"social-twitter\">\n      <a href=\"http://www.twitter.com/unimelb\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-twitter\" /></svg> Twitter</a>\n    </li>\n    <li class=\"social-linkedin\">\n      <a href=\"http://au.linkedin.com/pub/the-university-of-melbourne/61/430/215\"><svg role=\"img\" class=\"icon\"><use xlink:href=\"#icon-linkedin\" /></svg> LinkedIn</a>\n    </li>\n  </ul>\n  <small>Phone: 13 MELB (13 6352) | International: +61 3 9035 5511</small>\n  <small>The University of Melbourne ABN: 84 002 705 224</small>\n  <small>CRICOS Provider Code: 00116K (<a href=\"http://www.services.unimelb.edu.au/international/visas/index.html\">visa information</a>)</small>\n</footer>";
      page = document.querySelector('.page-inner');
      return page.appendChild(footer);
    }
  };

}).call(this);
(function() {
  window.UOMinjectIcons = function() {
    var icons, page;
    icons = document.createElement('div');
    icons.addClass('hidden');
    icons.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n  <symbol id=\"icon-trash\" viewBox=\"5 5 20 20\">\n    <path d=\"M19.7,12.2c0,0.1-0.1,0.2-0.2,0.2h-0.6v6.4c0,0.7-0.5,1.4-1.1,1.4h-5.6c-0.6,0-1.1-0.6-1.1-1.3v-6.4h-0.6 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h2.1l0.5-1.1c0.1-0.3,0.5-0.6,0.9-0.6h2.1c0.4,0,0.8,0.3,0.9,0.6l0.5,1.1h2.1 c0.1,0,0.2,0.1,0.2,0.2V12.2z M18,12.4h-6v6.4c0,0.3,0.2,0.5,0.2,0.5h5.6c0,0,0.2-0.2,0.2-0.5V12.4z M13.7,17.8 c0,0.1-0.1,0.2-0.2,0.2h-0.4c-0.1,0-0.2-0.1-0.2-0.2v-3.9c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V17.8z M16.5,11.6 l-0.3-0.8c0,0-0.1-0.1-0.1-0.1h-2.1c0,0-0.1,0-0.1,0.1l-0.3,0.8H16.5z M15.4,17.8c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-3.9c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V17.8z M17.1,17.8c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-3.9c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V17.8z\"/>\n  </symbol>\n\n  <symbol id=\"icon-search\" viewBox=\"5 5 20 20\">\n    <path d=\"M14.1,18.6c0.9,0,1.7-0.3,2.4-0.8l0.3-0.2l2.5,2.5c0.3,0.3,0.8,0,0.8-0.3c0-0.1,0-0.2-0.1-0.3L17.5,17l0.2-0.3 c0.5-0.7,0.8-1.6,0.8-2.4c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3S11.8,18.6,14.1,18.6z M14.1,10.9c1.9,0,3.4,1.5,3.4,3.4 s-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4S12.3,10.9,14.1,10.9z\"/>\n  </symbol>\n\n  <symbol id=\"icon-user\" viewBox=\"5 5 20 20\">\n    <path d=\"M17.4,14.7c0,0-0.1,0.1-0.2,0.1c-0.4,0.3-1.2,0.8-2.2,0.8c-1,0-1.8-0.5-2.2-0.8c-0.1-0.1-0.2-0.1-0.2-0.1 c-1.8,0-2,2.4-2,3.7c0,0.9,0.6,1.6,1.5,1.6h5.9c0.9,0,1.5-0.7,1.5-1.6C19.5,17.1,19.2,14.7,17.4,14.7z\"/>\n    <circle cx=\"15\" cy=\"12.3\" r=\"2.3\"/>\n  </symbol>\n\n  <symbol id=\"icon-menu\" viewBox=\"5 5 20 20\">\n    <path d=\"M20.1,12c0,0.2-0.2,0.4-0.4,0.4h-9.4c-0.2,0-0.4-0.2-0.4-0.4v-0.9c0-0.2,0.2-0.4,0.4-0.4h9.4c0.2,0,0.4,0.2,0.4,0.4V12z M20.1,15.4c0,0.2-0.2,0.4-0.4,0.4h-9.4c-0.2,0-0.4-0.2-0.4-0.4v-0.9c0-0.2,0.2-0.4,0.4-0.4h9.4c0.2,0,0.4,0.2,0.4,0.4V15.4z M20.1,18.9c0,0.2-0.2,0.4-0.4,0.4h-9.4c-0.2,0-0.4-0.2-0.4-0.4V18c0-0.2,0.2-0.4,0.4-0.4h9.4c0.2,0,0.4,0.2,0.4,0.4V18.9z\"/>\n  </symbol>\n\n  <symbol id=\"icon-ellipsis\" viewBox=\"5 5 20 20\">\n    <path d=\"M19,14.4c0-0.2-0.2-0.4-0.4-0.4h-1.2c-0.2,0-0.4,0.2-0.4,0.4v1.2c0,0.2,0.2,0.4,0.4,0.4h1.2c0.2,0,0.4-0.2,0.4-0.4V14.4z\"/>\n    <path d=\"M16,14.4c0-0.2-0.2-0.4-0.4-0.4h-1.2c-0.2,0-0.4,0.2-0.4,0.4v1.2c0,0.2,0.2,0.4,0.4,0.4h1.2c0.2,0,0.4-0.2,0.4-0.4V14.4z\"/>\n    <path d=\"M13,14.4c0-0.2-0.2-0.4-0.4-0.4h-1.2c-0.2,0-0.4,0.2-0.4,0.4v1.2c0,0.2,0.2,0.4,0.4,0.4h1.2c0.2,0,0.4-0.2,0.4-0.4V14.4z\"/>\n  </symbol>\n\n  <symbol id=\"icon-facebook\" viewBox=\"5 5 20 20\">\n    <path d=\"M17.9,11.3h-1.1c-0.8,0-1,0.4-1,1v1.3h2l-0.3,2h-1.7v5.1h-2v-5.1h-1.7v-2h1.7V12c0-1.7,1-2.6,2.6-2.6 c0.7,0,1.3,0.1,1.5,0.1V11.3z\"/>\n  </symbol>\n\n  <symbol id=\"icon-twitter\" viewBox=\"5 5 20 20\">\n    <path d=\"M19.2,12.8c0,0.1,0,0.2,0,0.3c0,2.9-2.2,6.2-6.2,6.2c-1.2,0-2.4-0.4-3.3-1c0.2,0,0.3,0,0.5,0c1,0,1.9-0.3,2.7-0.9 c-1,0-1.7-0.6-2-1.5c0.1,0,0.3,0,0.4,0c0.2,0,0.4,0,0.6-0.1c-1-0.2-1.7-1.1-1.7-2.1c0,0,0,0,0,0c0.3,0.2,0.6,0.3,1,0.3 c-0.6-0.4-1-1.1-1-1.8c0-0.4,0.1-0.8,0.3-1.1c1.1,1.3,2.7,2.2,4.5,2.3c0-0.2-0.1-0.3-0.1-0.5c0-1.2,1-2.2,2.2-2.2 c0.6,0,1.2,0.3,1.6,0.7c0.5-0.1,1-0.3,1.4-0.5c-0.2,0.5-0.5,0.9-1,1.2c0.4,0,0.9-0.2,1.2-0.3C20,12.2,19.6,12.5,19.2,12.8z\"/>\n  </symbol>\n\n  <symbol id=\"icon-youtube\" viewBox=\"5 5 20 20\">\n    <path d=\"M19.8,19.9c-0.1,0.5-0.6,0.9-1.1,1C17.5,21,16.2,21,15,21s-2.5,0-3.7-0.1c-0.5-0.1-1-0.4-1.1-1C10,19.1,10,18.3,10,17.5 c0-0.8,0-1.6,0.2-2.3c0.1-0.5,0.6-0.9,1.1-1c1.2-0.1,2.5-0.1,3.7-0.1s2.5,0,3.7,0.1c0.5,0.1,1,0.4,1.1,1C20,16,20,16.8,20,17.5 C20,18.3,20,19.1,19.8,19.9z M12.9,15.9v-0.6h-2.1v0.6h0.7v3.8h0.7v-3.8H12.9z M14,9l-0.8,2.7v1.8h-0.7v-1.8 c-0.1-0.3-0.2-0.8-0.4-1.4c-0.1-0.4-0.3-0.8-0.4-1.3h0.7l0.5,1.8L13.3,9H14z M14.7,19.7v-3.3h-0.6v2.5c-0.1,0.2-0.3,0.3-0.4,0.3 c-0.1,0-0.1,0-0.1-0.1c0,0,0-0.1,0-0.2v-2.4H13V19c0,0.2,0,0.4,0.1,0.5c0.1,0.2,0.2,0.2,0.4,0.2c0.2,0,0.4-0.1,0.7-0.4v0.4H14.7z M15.8,12.4c0,0.4-0.1,0.6-0.2,0.8c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3C14,13,14,12.8,14,12.4v-1.2 c0-0.4,0.1-0.6,0.2-0.8c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3c0.1,0.2,0.2,0.4,0.2,0.8V12.4z M15.1,11.1 c0-0.3-0.1-0.5-0.3-0.5c-0.2,0-0.3,0.2-0.3,0.5v1.4c0,0.3,0.1,0.5,0.3,0.5c0.2,0,0.3-0.2,0.3-0.5V11.1z M17,17.4 c0-0.3,0-0.5-0.1-0.7c-0.1-0.2-0.2-0.4-0.5-0.4c-0.2,0-0.4,0.1-0.6,0.4v-1.5h-0.6v4.4h0.6v-0.3c0.2,0.2,0.4,0.4,0.6,0.4 c0.2,0,0.4-0.1,0.5-0.4c0-0.1,0.1-0.4,0.1-0.7V17.4z M16.4,18.7c0,0.3-0.1,0.4-0.3,0.4c-0.1,0-0.2,0-0.3-0.1v-2 c0.1-0.1,0.2-0.1,0.3-0.1c0.2,0,0.3,0.2,0.3,0.4V18.7z M18,13.5h-0.6v-0.4c-0.2,0.3-0.5,0.4-0.7,0.4c-0.2,0-0.3-0.1-0.4-0.2 c0-0.1-0.1-0.3-0.1-0.5v-2.6h0.6v2.5c0,0.1,0,0.2,0,0.2c0,0.1,0.1,0.1,0.1,0.1c0.1,0,0.2-0.1,0.4-0.3v-2.6H18V13.5z M19.2,18.5 h-0.6c0,0.2,0,0.4,0,0.4c0,0.2-0.1,0.2-0.3,0.2c-0.2,0-0.3-0.2-0.3-0.5v-0.6h1.2v-0.7c0-0.4-0.1-0.6-0.2-0.8 c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.1,0.2-0.2,0.4-0.2,0.8v1.2c0,0.4,0.1,0.6,0.2,0.8c0.2,0.2,0.4,0.3,0.7,0.3 c0.3,0,0.6-0.1,0.7-0.4c0.1-0.1,0.1-0.2,0.1-0.4C19.2,19,19.2,18.8,19.2,18.5L19.2,18.5z M18.6,17.6H18v-0.3c0-0.3,0.1-0.5,0.3-0.5 s0.3,0.2,0.3,0.5V17.6z\"/>\n  </symbol>\n\n  <symbol id=\"icon-instagram\" viewBox=\"5 5 20 20\">\n    <path d=\"M20.1,18.8c0,0.7-0.6,1.3-1.3,1.3h-7.6c-0.7,0-1.3-0.6-1.3-1.3v-7.6c0-0.7,0.6-1.3,1.3-1.3h7.6c0.7,0,1.3,0.6,1.3,1.3V18.8 z M19,14.2h-0.9c0.1,0.3,0.1,0.6,0.1,0.9c0,1.7-1.4,3.1-3.2,3.1c-1.8,0-3.2-1.4-3.2-3.1c0-0.3,0-0.6,0.1-0.9H11v4.3 c0,0.2,0.2,0.4,0.4,0.4h7.2c0.2,0,0.4-0.2,0.4-0.4V14.2z M15,13c-1.1,0-2.1,0.9-2.1,2c0,1.1,0.9,2,2.1,2c1.1,0,2.1-0.9,2.1-2 C17.1,13.9,16.2,13,15,13z M19,11.5c0-0.3-0.2-0.5-0.5-0.5h-1.2c-0.3,0-0.5,0.2-0.5,0.5v1.1c0,0.3,0.2,0.5,0.5,0.5h1.2 c0.3,0,0.5-0.2,0.5-0.5V11.5z\"/>\n  </symbol>\n\n  <symbol id=\"icon-linkedin\" viewBox=\"5 5 20 20\">\n    <path d=\"M20.1,18.2c0,1.1-0.9,1.9-1.9,1.9h-6.4c-1.1,0-1.9-0.9-1.9-1.9v-6.4c0-1.1,0.9-1.9,1.9-1.9h6.4c1.1,0,1.9,0.9,1.9,1.9V18.2 z M12.2,11.6c-0.5,0-0.9,0.3-0.9,0.8c0,0.4,0.3,0.8,0.9,0.8h0c0.5,0,0.9-0.4,0.9-0.8C13.1,11.9,12.8,11.6,12.2,11.6z M13,18.5v-4.6 h-1.5v4.6H13z M18.6,18.5v-2.7c0-1.4-0.8-2.1-1.8-2.1c-0.8,0-1.2,0.5-1.4,0.8h0v-0.7h-1.5c0,0,0,0.4,0,4.6h1.5v-2.6 c0-0.1,0-0.3,0-0.4c0.1-0.3,0.4-0.6,0.8-0.6c0.6,0,0.8,0.4,0.8,1.1v2.5H18.6z\"/>\n  </symbol>\n\n  <symbol id=\"icon-faculties\" viewBox=\"5 5 20 20\">\n    <path d=\"M19.7,20.6c0,0.2-0.2,0.4-0.4,0.4h-8.6c-0.2,0-0.4-0.2-0.4-0.4V9.4c0-0.2,0.2-0.4,0.4-0.4h8.6c0.2,0,0.4,0.2,0.4,0.4V20.6z M18.9,20.1V9.9h-7.7v10.3h2.6v-1.5c0-0.1,0.1-0.2,0.2-0.2h2.1c0.1,0,0.2,0.1,0.2,0.2v1.5H18.9z M12.9,11.4c0,0.1-0.1,0.2-0.2,0.2 h-0.4c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V11.4z M12.9,13.1c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V13.1z M12.9,14.8c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V14.8z M12.9,16.5c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V16.5z M12.9,18.2c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V18.2z M14.6,11.4c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V11.4z M14.6,13.1c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V13.1z M14.6,14.8c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V14.8z M14.6,16.5c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V16.5z M16.3,11.4c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V11.4z M16.3,13.1c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V13.1z M16.3,14.8c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V14.8z M16.3,16.5c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V16.5z M18,11.4c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V11.4z M18,13.1c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V13.1z M18,14.8c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V14.8z M18,16.5c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V16.5z M18,18.2c0,0.1-0.1,0.2-0.2,0.2h-0.4 c-0.1,0-0.2-0.1-0.2-0.2v-0.4c0-0.1,0.1-0.2,0.2-0.2h0.4c0.1,0,0.2,0.1,0.2,0.2V18.2z\"/>\n  </symbol>\n\n  <symbol id=\"icon-students\" viewBox=\"5 5 20 20\">\n    <path d=\"M22.6,12.6L15.1,15c0,0,0,0-0.1,0c0,0,0,0-0.1,0l-4.4-1.4c-0.4,0.3-0.6,1-0.7,1.9c0.3,0.1,0.4,0.4,0.4,0.7 c0,0.3-0.2,0.6-0.4,0.7l0.4,2.9c0,0.1,0,0.1-0.1,0.2c0,0-0.1,0.1-0.2,0.1H8.8c-0.1,0-0.1,0-0.2-0.1S8.6,20,8.6,19.9L9,17 c-0.2-0.2-0.4-0.4-0.4-0.7c0-0.3,0.2-0.6,0.4-0.7c0-0.8,0.2-1.6,0.7-2.2l-2.2-0.7c-0.1,0-0.1-0.1-0.1-0.2s0.1-0.2,0.1-0.2l7.5-2.4 c0,0,0,0,0.1,0c0,0,0,0,0.1,0l7.5,2.4c0.1,0,0.1,0.1,0.1,0.2S22.7,12.6,22.6,12.6z M19.3,16.7c0.1,0.9-1.9,1.7-4.3,1.7 c-2.4,0-4.3-0.8-4.3-1.7l0.1-2.1l3.8,1.2c0.1,0,0.2,0,0.3,0s0.2,0,0.3,0l3.8-1.2L19.3,16.7z\"/>\n  </symbol>\n\n  <symbol id=\"icon-library\" viewBox=\"5 5 20 20\">\n    <path d=\"M20.5,13.1l-1.8,6.1c-0.2,0.6-0.8,1-1.3,1h-6.2c-0.7,0-1.4-0.5-1.7-1.2c-0.1-0.3-0.1-0.6,0-0.9c0-0.1,0-0.3,0-0.4 c0-0.1-0.1-0.2,0-0.3c0-0.2,0.2-0.3,0.3-0.5c0.2-0.3,0.4-0.9,0.5-1.2c0-0.1,0-0.3,0-0.4c0-0.1,0.2-0.2,0.2-0.3 c0.2-0.3,0.4-0.9,0.4-1.2c0-0.1-0.1-0.3,0-0.4c0-0.2,0.2-0.2,0.3-0.4c0.2-0.2,0.4-0.9,0.5-1.2c0-0.1-0.1-0.2,0-0.3 c0-0.1,0.2-0.3,0.3-0.4c0.3-0.4,0.3-1.3,1.2-1.1l0,0c0.1,0,0.2-0.1,0.3-0.1h5.1c0.3,0,0.6,0.1,0.8,0.4c0.2,0.2,0.2,0.6,0.1,0.9 l-1.8,6.1c-0.3,1-0.5,1.3-1.3,1.3h-5.8c-0.1,0-0.2,0-0.3,0.1c-0.1,0.1-0.1,0.1,0,0.3c0.1,0.4,0.6,0.5,1,0.5h6.2 c0.2,0,0.5-0.1,0.6-0.4l2-6.6c0-0.1,0-0.3,0-0.4c0.2,0.1,0.3,0.2,0.4,0.3C20.6,12.4,20.6,12.8,20.5,13.1z M12.9,14.1h4.1 c0.1,0,0.2-0.1,0.3-0.2l0.1-0.4c0-0.1,0-0.2-0.1-0.2h-4.1c-0.1,0-0.2,0.1-0.3,0.2l-0.1,0.4C12.7,14,12.7,14.1,12.9,14.1z M13.4,12.4h4.1c0.1,0,0.2-0.1,0.3-0.2l0.1-0.4c0-0.1,0-0.2-0.1-0.2h-4.1c-0.1,0-0.2,0.1-0.3,0.2l-0.1,0.4 C13.2,12.3,13.3,12.4,13.4,12.4z\"/>\n  </symbol>\n\n  <symbol id=\"icon-phone\" viewBox=\"5 5 20 20\">\n    <path d=\"M19.5,18.7c-0.1,0.3-0.5,0.5-0.8,0.7c-0.4,0.2-0.8,0.3-1.2,0.3c-0.6,0-1.2-0.3-1.8-0.5c-0.4-0.1-0.8-0.3-1.2-0.6 c-1.1-0.7-2.5-2.1-3.2-3.2c-0.2-0.4-0.4-0.8-0.6-1.2c-0.2-0.6-0.5-1.1-0.5-1.8c0-0.4,0.1-0.9,0.3-1.2c0.2-0.3,0.4-0.7,0.7-0.8 c0.2-0.1,0.7-0.2,0.9-0.2c0,0,0.1,0,0.1,0c0.1,0,0.3,0.4,0.4,0.5c0.2,0.4,0.4,0.8,0.6,1.1c0.1,0.2,0.3,0.4,0.3,0.6 c0,0.4-1.2,1-1.2,1.4c0,0.2,0.2,0.4,0.3,0.6c0.7,1.2,1.5,2.1,2.7,2.7c0.2,0.1,0.4,0.3,0.6,0.3c0.4,0,1-1.2,1.4-1.2 c0.2,0,0.4,0.2,0.6,0.3c0.4,0.2,0.8,0.4,1.1,0.6c0.1,0.1,0.5,0.2,0.5,0.4c0,0,0,0.1,0,0.1C19.7,18,19.6,18.4,19.5,18.7z\"/>\n  </symbol>\n\n  <symbol id=\"icon-mail\" viewBox=\"5 5 20 20\">\n    <path d=\"M21,18.6c0,0.6-0.5,1.1-1.1,1.1h-9.9c-0.6,0-1.1-0.5-1.1-1.1v-7.3c0-0.6,0.5-1.1,1.1-1.1h9.9c0.6,0,1.1,0.5,1.1,1.1V18.6z M19.9,11.1h-9.9c-0.1,0-0.2,0.1-0.2,0.2c0,0.8,0.4,1.4,1,1.9c0.9,0.7,1.8,1.4,2.7,2.1c0.4,0.3,1,0.9,1.5,0.9h0h0 c0.5,0,1.1-0.6,1.5-0.9c0.9-0.7,1.8-1.4,2.7-2.1c0.4-0.3,1-1.1,1-1.7C20.1,11.4,20.2,11.1,19.9,11.1z M20.1,13.5 c-0.1,0.2-0.3,0.3-0.5,0.4c-1,0.7-1.9,1.5-2.9,2.3c-0.5,0.4-1.1,0.9-1.8,0.9h0h0c-0.7,0-1.3-0.5-1.8-0.9c-0.9-0.8-1.9-1.5-2.9-2.3 c-0.2-0.1-0.3-0.3-0.5-0.4v5.1c0,0.1,0.1,0.2,0.2,0.2h9.9c0.1,0,0.2-0.1,0.2-0.2V13.5z\"/>\n  </symbol>\n\n  <symbol id=\"icon-maps\" viewBox=\"5 5 20 20\">\n    <path d=\"M18.2,14.5l-2.4,5.2c-0.1,0.3-0.4,0.5-0.8,0.5s-0.6-0.2-0.8-0.5l-2.4-5.2c-0.2-0.4-0.2-0.8-0.2-1.2c0-1.9,1.5-3.4,3.4-3.4 s3.4,1.5,3.4,3.4C18.4,13.7,18.4,14.1,18.2,14.5z M15,11.6c-0.9,0-1.7,0.8-1.7,1.7S14.1,15,15,15s1.7-0.8,1.7-1.7 S15.9,11.6,15,11.6z\"/>\n  </symbol>\n\n  <symbol id=\"icon-campaign\" viewBox=\"5 5 20 20\">\n    <path d=\"M21.4,11.6v0.9h-0.9c0,0.2-0.2,0.4-0.5,0.4H9.9c-0.3,0-0.5-0.2-0.5-0.4H8.6v-0.9L15,9L21.4,11.6z M21.4,20.1V21H8.6v-0.9 c0-0.2,0.2-0.4,0.5-0.4H21C21.2,19.7,21.4,19.9,21.4,20.1z M12,13.3v5.1h0.9v-5.1h1.7v5.1h0.9v-5.1h1.7v5.1H18v-5.1h1.7v5.1h0.4 c0.3,0,0.5,0.2,0.5,0.4v0.4H9.4v-0.4c0-0.2,0.2-0.4,0.5-0.4h0.4v-5.1H12z\"/>\n  </symbol>\n\n  <symbol id=\"icon-north-south\" viewBox=\"5 5 20 20\">\n    <polygon points=\"5,11.25 15,11.25 10,5 \"/>\n    <polygon points=\"5,13.75 15,13.75 10,20 \"/>\n  </symbol>\n\n  <symbol id=\"icon-clock\" viewBox=\"0 0 1000 1000\">\n    <path d=\"M500,137.3C300,137.3,137.3,300,137.3,500S300,862.7,500,862.7c200,0,362.7-162.7,362.7-362.7S700,137.3,500,137.3z M500,792.5c-161.3,0-292.5-131.2-292.5-292.5S338.7,207.5,500,207.5c161.3,0,292.5,131.2,292.5,292.5S661.3,792.5,500,792.5z\"/>\n    <path d=\"M563.9,547.9c0,9-7,16-16,16H388.1c-9,0-16-7-16-16v-32c0-9,7-16,16-16H500V324.2c0-9,7-16,16-16h32c9,0,16,7,16,16V547.9z\"/>\n  </symbol>\n\n  <symbol id=\"icon-tag\" viewBox=\"0 0 1000 1000\">\n    <path d=\"M838.6,607.4L607.8,838.6c-11.3,10.8-26.8,17.4-42.8,17.4s-31.5-6.6-42.3-17.4l-336-336.5c-24-23.5-42.8-69.1-42.8-102.4 V204.2c0-32.9,27.3-60.1,60.1-60.1h195.5c33.4,0,78.9,18.8,102.9,42.8l336,335.5c10.8,11.3,17.4,26.8,17.4,42.8 S849.4,596.6,838.6,607.4z M294.4,234.3c-33.4,0-60.1,26.8-60.1,60.1s26.8,60.1,60.1,60.1s60.1-26.8,60.1-60.1 S327.8,234.3,294.4,234.3z\"/>\n  </symbol>\n\n  <symbol id=\"icon-zoom\" viewBox=\"0 0 1000 1000\">\n    <path d=\"M429.5,784.9c71.4,0,142.8-22.2,201-62.4l22.6-15.6l208.1,207.6c21.6,22.5,64,3.8,64-26.3c0-9.8-4-19.6-10.8-26.3 L706.2,653.7l15.6-22.6c40.3-58.1,62.4-129.4,62.4-200.9c0-195.6-159.1-354.7-354.6-354.7S74.9,234.7,74.9,430.2 S234,784.9,429.5,784.9z M429.5,150.7c154.1,0,279.5,125.4,279.5,279.5S583.6,709.7,429.5,709.7S150,584.4,150,430.2 S275.5,150.7,429.5,150.7z\"/>\n    <path d=\"M460.6,389.1h126.8v56.6H460.6v145.9H398V445.7H270.3v-56.6H398V254.7h62.6V389.1z\"/>\n  </symbol>\n\n  <symbol id=\"icon-bus\" viewBox=\"0 0 500 500\">\n    <path d=\"M431.711,401.426h-30.285v30.285c0,16.799-13.486,30.285-30.285,30.285s-30.285-13.486-30.285-30.285v-30.285H159.144 v30.285c0,16.799-13.486,30.285-30.285,30.285c-16.799,0-30.285-13.486-30.285-30.285v-30.285H68.289V258.755 c0-19.402,1.656-33.835,5.915-52.764l24.37-107.417c4.495-37.857,70.745-60.57,151.426-60.57s146.931,22.714,151.426,60.57 l24.843,107.417c4.259,18.93,5.442,33.363,5.442,52.764V401.426z M128.859,295.428c-16.799,0-30.285,13.486-30.285,30.285 s13.486,30.285,30.285,30.285c16.799,0,30.285-13.486,30.285-30.285S145.658,295.428,128.859,295.428z M373.506,141.162 c-1.419-7.097-7.571-12.302-14.905-12.302H141.399c-7.334,0-13.486,5.206-14.905,12.302l-17.036,90.856 c-1.656,9.465,5.442,17.983,14.907,17.983h251.272c9.465,0,16.563-8.518,14.907-17.983L373.506,141.162z M325.713,75.86H174.287 c-6.151,0-11.357,4.968-11.357,11.358c0,6.387,5.206,11.356,11.357,11.356h151.426c6.389,0,11.357-4.968,11.357-11.356 C337.07,80.828,332.102,75.86,325.713,75.86z M371.141,295.428c-16.799,0-30.285,13.486-30.285,30.285s13.486,30.285,30.285,30.285 s30.285-13.486,30.285-30.285S387.94,295.428,371.141,295.428z\"/>\n  </symbol>\n\n  <symbol id=\"icon-car\" viewBox=\"0 0 500 500\">\n    <path d=\"M492.282,355.998c0,4.259-3.312,7.571-7.571,7.571h-22.714v30.285c0,25.079-20.348,45.428-45.428,45.428 c-25.079,0-45.428-20.348-45.428-45.428V363.57H128.859v30.285c0,25.079-20.348,45.428-45.428,45.428s-45.428-20.348-45.428-45.428 V363.57H15.29c-4.259,0-7.571-3.312-7.571-7.571v-90.856c0-29.338,23.661-52.999,52.999-52.999h6.625l24.843-99.136 c7.335-29.813,36.2-52.29,66.959-52.29h181.711c30.759,0,59.624,22.477,66.959,52.29l24.843,99.136h6.625 c29.338,0,52.999,23.661,52.999,52.999V355.998z M83.431,250c-20.82,0-37.857,17.036-37.857,37.857 c0,20.82,17.036,37.857,37.857,37.857s37.856-17.036,37.856-37.857C121.288,267.036,104.252,250,83.431,250z M370.194,212.143 l-21.058-84.468c-0.709-2.6-5.442-6.387-8.281-6.387H159.144c-2.839,0-7.571,3.787-8.281,6.387l-21.058,84.468H370.194z M416.569,250c-20.82,0-37.857,17.036-37.857,37.857c0,20.82,17.036,37.857,37.857,37.857c20.82,0,37.857-17.036,37.857-37.857 C454.425,267.036,437.389,250,416.569,250z\"/>\n  </symbol>\n\n  <symbol id=\"icon-cart\" viewBox=\"0 0 500 500\">\n    <path d=\"M446.854,250c0,7.571-5.915,14.196-13.486,15.143l-247.014,28.866c1.183,5.44,3.076,10.884,3.076,16.561 c0,5.443-3.312,10.412-5.678,15.143h217.674c8.281,0,15.143,6.862,15.143,15.143c0,8.281-6.862,15.143-15.143,15.143H159.144 c-8.281,0-15.143-6.862-15.143-15.143c0-7.334,10.648-25.079,14.433-32.413l-41.88-194.726H68.289 c-8.281,0-15.143-6.862-15.143-15.143s6.862-15.143,15.143-15.143h60.57c15.852,0,16.325,18.93,18.692,30.285h284.16 c8.281,0,15.143,6.862,15.143,15.143V250z M174.287,416.569c-16.563,0-30.285-13.724-30.285-30.285s13.722-30.285,30.285-30.285 s30.285,13.724,30.285,30.285S190.85,416.569,174.287,416.569z M386.283,416.569c-16.563,0-30.285-13.724-30.285-30.285 s13.722-30.285,30.285-30.285s30.285,13.724,30.285,30.285S402.846,416.569,386.283,416.569z\"/>\n  </symbol>\n\n  <symbol id=\"icon-cutlery\" viewBox=\"0 0 500 500\">\n    <path d=\"M234.857,204.572c0,19.164-12.304,36.438-30.285,42.825v184.314c0,16.561-13.722,30.285-30.285,30.285h-30.285 c-16.563,0-30.285-13.724-30.285-30.285V247.397c-17.981-6.387-30.285-23.661-30.285-42.825V53.146 c0-8.281,6.862-15.143,15.143-15.143s15.143,6.862,15.143,15.143v98.427c0,8.281,6.862,15.143,15.143,15.143 c8.281,0,15.143-6.862,15.143-15.143V53.146c0-8.281,6.862-15.143,15.143-15.143c8.281,0,15.143,6.862,15.143,15.143v98.427 c0,8.281,6.862,15.143,15.143,15.143c8.281,0,15.143-6.862,15.143-15.143V53.146c0-8.281,6.862-15.143,15.143-15.143 c8.281,0,15.143,6.862,15.143,15.143V204.572z M416.569,431.711c0,16.561-13.722,30.285-30.285,30.285h-30.285 c-16.563,0-30.285-13.724-30.285-30.285V310.57h-52.999c-4.022,0-7.571-3.55-7.571-7.571V113.717 c0-41.641,34.071-75.713,75.713-75.713h60.57c8.281,0,15.143,6.862,15.143,15.143V431.711z\"/>\n  </symbol>\n\n  <symbol id=\"icon-pharmacy\" viewBox=\"0 0 500 500\">\n    <path d=\"M98.574,431.711h-7.571c-29.102,0-52.999-23.898-52.999-52.999V181.858c0-29.101,23.897-52.999,52.999-52.999h7.571 V431.711z M378.712,431.711H121.288V128.859h37.857V91.003c0-12.54,10.174-22.714,22.714-22.714h136.283 c12.54,0,22.714,10.174,22.714,22.714v37.856h37.857V431.711z M340.856,257.571c0-4.259-3.312-7.571-7.571-7.571h-52.999v-52.999 c0-4.259-3.312-7.571-7.571-7.571h-45.428c-4.259,0-7.571,3.312-7.571,7.571V250h-52.999c-4.259,0-7.571,3.312-7.571,7.571v45.428 c0,4.259,3.312,7.571,7.571,7.571h52.999v52.999c0,4.259,3.312,7.571,7.571,7.571h45.428c4.259,0,7.571-3.312,7.571-7.571V310.57 h52.999c4.259,0,7.571-3.312,7.571-7.571V257.571z M310.57,128.859V98.574H189.43v30.285H310.57z M461.996,378.712 c0,29.101-23.897,52.999-52.999,52.999h-7.571V128.859h7.571c29.102,0,52.999,23.898,52.999,52.999V378.712z\"/>\n  </symbol>\n\n  <symbol id=\"icon-share\" viewBox=\"0 0 500 500\">\n    <path d=\"M466.089,376.052c0,49.801-40.236,90.037-90.037,90.037s-90.037-40.236-90.037-90.037c0-3.096,0.282-6.471,0.564-9.567 L185.285,315.84c-16.037,14.912-37.702,24.197-61.337,24.197c-49.801,0-90.037-40.236-90.037-90.037s40.236-90.037,90.037-90.037 c23.636,0,45.3,9.286,61.337,24.197l101.293-50.645c-0.282-3.096-0.564-6.471-0.564-9.567c0-49.801,40.236-90.037,90.037-90.037 s90.037,40.236,90.037,90.037s-40.236,90.037-90.037,90.037c-23.636,0-45.3-9.286-61.337-24.197l-101.293,50.645 c0.282,3.096,0.564,6.471,0.564,9.567s-0.282,6.471-0.564,9.567l101.293,50.645c16.037-14.912,37.702-24.197,61.337-24.197 C425.853,286.015,466.089,326.251,466.089,376.052z\"></path>\n  </symbol>\n</svg>";
    page = document.querySelector('.page-inner');
    return page.appendChild(icons);
  };

}).call(this);
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-7JB9');








window.UOMloadInjection = function() {
  window.UOMinjectHeader();
  window.UOMModal()
  window.UOMinjectGlobalNav();
  window.UOMinjectFooter();
  window.UOMinjectIcons();
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadInjection);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadInjection, false);
  document.addEventListener('page:change', function() {
    window.UOMloadInjection();
  }, false);
}
;
