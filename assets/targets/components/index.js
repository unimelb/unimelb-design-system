// Deps
require('classlist-polyfill');
require("../../shared/smoothscroll");
require("../../shared/findup");
require("../../shared/loadscript");

window.cssesc = require("cssesc");

// Also need one to find non-text nodes in a list of children

// Simple sniff
if (typeof window.MSIE_version === "undefined")
  window.MSIE_version = /MSIE\s(\d{1,2})/g.exec(navigator.userAgent) === null ? 100 : /MSIE\s(\d{1,2})/g.exec(navigator.userAgent)[1];

// Async load fonts from google
var WebFont = require("webfontloader");
WebFont.load({
  google: { families: [
    'Roboto:400,300,100,700,100italic,300italic,400italic,700italic:latin'
  ] }
});

window.UOMbind = function(component) {
  "use strict";

  if (!component)
    return -1;

  var recs, i, attachment, Base;

  if (component === 'accordion') {
    attachment = '.accordion__title';

  } else if (component === 'modal') {
    attachment = '[data-modal-target]';

  } else if (component === 'tabs') {
    attachment = '[data-tabbed]';

  } else if (component === 'inpage-navigation') {
    attachment = 'a[href^="#"]';

  } else if (component === 'checklist') {
    attachment = 'ul.checklist[data-unlock-target]';

  } else if (component === 'filtered-listings') {
    attachment = 'form.filtered-listing-select';

  } else if (component === 'icons') {
    window.UOMbindIcons();
    attachment = false;

  } else if (component === 'forms') {
    attachment = 'form[data-validate]';

  } else if (component === 'tables') {
    attachment = 'table';

  // Non-index file
  } else if (component === 'sortable-table') {
    recs = document.querySelectorAll('table[data-sortable]');
    if (recs.length > 0) {
      Base = require('./tables/sortable.js');
      for (i=recs.length - 1; i >= 0; i--)
        new Base(recs[i], {});
    }

  // Different setup proc
  } else if (component === 'announcement') {
    var Accouncement = require('../injection/announcement/index.es6');
    new Accouncement({});
  }

  if (attachment) {
    recs = document.querySelectorAll(attachment);
    if (recs.length > 0) {

      Base = require("./" + component + '/index.js');

      for (i=recs.length - 1; i >= 0; i--)
        new Base(recs[i], {});
    }
  }
};

window.UOMloadComponents = function() {
  "use strict";

  var recs, i, g, SidebarTabs, JumpNav, CheckboxHelper, FancySelect, Flash,
    ImageGallery, imagesLoaded, slingshot, style, script, keyscript;

  window.UOMbind('accordion');
  window.UOMbind('modal');

  recs = document.querySelectorAll('select');
  if (recs.length > 0) {
    FancySelect = require("./forms/fancyselect");
    for (i=recs.length - 1; i >= 0; i--)
      new FancySelect(recs[i], {});
  }

  window.UOMbind('tabs');

  recs = document.querySelectorAll('.sidebar-tabs');
  if (recs.length > 0) {
    SidebarTabs = require("./tabs/sidebar-tabs");
    for (i=recs.length - 1; i >= 0; i--) {
      new SidebarTabs(recs[i], {
        scrollTarget: document.querySelector('.tabbed-nav[data-tabbed], .tabbed-course[data-tabbed]')
      });
    }
  }

  window.UOMbind('inpage-navigation');

  recs = document.querySelectorAll('input[type="radio"],input[type="checkbox"]');
  if (recs.length > 0) {
    CheckboxHelper = require("./checklist/checkboxhelper");
    for (i=recs.length - 1; i >= 0; i--)
      new CheckboxHelper(recs[i], {});
  }

  window.UOMbind('checklist');
  window.UOMbind('forms');

  if (document.querySelector('h2[id]') && document.querySelectorAll('.jumpnav, .indexnav').length === 1) {
    JumpNav = require("./inpage-navigation/jumpnav");
    new JumpNav({});
  }

  recs = document.querySelector('.flash');
  if (recs) {
    Flash = require("./notices/flash");
    new Flash(recs, {
      root: document.querySelector('[role="main"]'),
      headerless: document.querySelector('.headerless'),
      header: document.querySelector('[role="main"] > header:first-child')
    });
  }

  window.UOMbind('filtered-listings');
  window.UOMbind('icons');

  window.UOMbind('sortable-table');

  // IE9+
  if (MSIE_version > 8) {
    window.UOMbind('tables');

    recs = document.querySelectorAll('ul.image-gallery');
    if (recs.length > 0) {
      loadScript('https://d2h9b02ioca40d.cloudfront.net/shared/photoswipe.pkgd.min.js', function (recs) {
        imagesLoaded = require("imagesloaded");
        ImageGallery = require("./gallery");

        slingshot = function (g) {
          new ImageGallery(g);
        };

        for (i=recs.length - 1; i >= 0; i--) {
          g = recs[i];
          imagesLoaded(g, slingshot.bind(null, g));
        }
      }.bind(null, recs));
    }

    recs = document.querySelectorAll('[data-leaflet-latlng]');
    if (recs.length > 0) {
      if (typeof(L) === 'undefined') {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js', function() {
          style = document.createElement('link');
          style.rel = 'stylesheet';
          style.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css';
          document.body.appendChild(style);
          window.bound_lmaps = [];
          lmaps_loaded_go(recs);
        });
      } else {
        lmaps_loaded_go(recs);
      }
    }
  }

  // GMaps will load via callback
  if (document.querySelector('[data-latlng], [data-address]')) {
    if (typeof(google) === 'undefined') {
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://maps.googleapis.com/maps/api/js?key=" + process.env.GMAPSJSAPIKEY + "&callback=maps_loaded_go";
      document.body.appendChild(script);
    } else {
      maps_loaded_go();
    }
  }
};

// GMaps callback
window.maps_loaded_go = function() {
  var GMaps = require("./maps/gmaps.es6");
  for (var recs = document.querySelectorAll('[data-latlng],[data-address]'), i=recs.length - 1; i >= 0; i--)
    new GMaps(recs[i], {counter: i});
};

// LMaps callback
window.lmaps_loaded_go = function(recs) {
  var LMaps = require("./maps/lmaps");
  for (var i=recs.length - 1; i >= 0; i--)
    new LMaps(recs[i], {counter: i});
};

document.addEventListener('DOMContentLoaded', window.UOMloadComponents, false);
document.addEventListener('page:load', window.UOMloadComponents, false);
document.addEventListener('page:restore', window.UOMloadComponents, false);
