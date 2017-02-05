// Deps
require('es6-promise').polyfill();
require("../../shared/smoothscroll");
require("../../shared/findup");

window.cssesc = require("cssesc");
window.loadScript = require('../../shared/loadscript');
window.loadStylesheet = require('../../shared/loadstylesheet');

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

  var recs, i, g, SidebarTabs, JumpNav, CheckboxHelper, FancySelect, Flash, FilteredListing,
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

  recs = document.querySelectorAll('form.filtered-listing-select');
  if (recs.length > 0) {
    window.loadScript('https://unpkg.com/isotope-layout@3.0/dist/isotope.pkgd.min.js')
      .then(function (recs) {
        FilteredListing = require("./filtered-listings");
        for (i=recs.length - 1; i >= 0; i--)
          new FilteredListing(recs[i], {});
      }.bind(null, recs));
  }

  window.UOMbind('icons');
  window.UOMbind('sortable-table');
  window.UOMbind('tables');

  recs = document.querySelectorAll('ul.image-gallery');
  if (recs.length > 0) {
    window.loadScript([
      'https://unpkg.com/photoswipe@4.1.1/dist/photoswipe.min.js',
      'https://unpkg.com/photoswipe@4.1.1/dist/photoswipe-ui-default.min.js',
      'https://unpkg.com/isotope-layout@3.0/dist/isotope.pkgd.min.js'
    ])
      .then(function (recs) {
        ImageGallery = require("./gallery");
        for (i=recs.length - 1; i >= 0; i--)
          new ImageGallery(recs[i], { index: i });
      }.bind(null, recs));
  }

  recs = document.querySelectorAll('[data-leaflet-latlng]');
  if (recs.length > 0) {
    if (typeof(L) === 'undefined') {
      window.loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css');
      window.loadScript('https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js')
        .then(function() {
          window.bound_lmaps = [];
          lmaps_loaded_go(recs);
        });
    } else {
      lmaps_loaded_go(recs);
    }
  }

  if (document.querySelector('[data-latlng], [data-address]')) {
    if (typeof(google) === 'undefined') {
      // GMaps loads via global callback
      window.loadScript('https://maps.googleapis.com/maps/api/js?key=' + process.env.GMAPSJSAPIKEY + '&callback=maps_loaded_go');
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
