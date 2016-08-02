// Deps
require("../../shared/shims");
require("../../shared/smoothscroll");
require("../../shared/findup");
require("../../shared/loadscript");

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

// replace with viewloader eventually
window.DSComponentsLoad = function() {
  "use strict";

  var recs, i, g, Accordion, Modal, Tabs, SidebarTabs, InpageNavigation,
    JumpNav, CheckboxHelper, UnlockChecklist, FancySelect, ValidateForm,
    FilteredListing, IconHelper, ImageGallery, imagesLoaded, slingshot, LMaps,
    style, script, CreateNameSpace, Icons;

  CreateNameSpace = require('../../shared/createnamespace');
  new CreateNameSpace();

  Icons = require('../injection/icons');
  new Icons();

  recs = document.querySelectorAll('.accordion__title');
  if (recs.length > 0) {
    Accordion = require("../components/accordion");
    for (i=recs.length - 1; i >= 0; i--)
      new Accordion(recs[i], {});
  }

  recs = document.querySelectorAll('[data-modal-target]');
  if (recs.length > 0) {
    Modal = require("../components/modal");
    for (i=recs.length - 1; i >= 0; i--)
      new Modal(recs[i], {});
  }

  recs = document.querySelectorAll('select');
  if (recs.length > 0) {
    FancySelect = require("../components/forms/fancyselect");
    for (i=recs.length - 1; i >= 0; i--)
      new FancySelect(recs[i], {});
  }

  recs = document.querySelectorAll('[data-tabbed]');
  if (recs.length > 0) {
    Tabs = require("../components/tabs");
    for (i=recs.length - 1; i >= 0; i--)
      new Tabs(recs[i], {});
  }

  recs = document.querySelectorAll('.sidebar-tabs');
  if (recs.length > 0) {
    SidebarTabs = require("../components/tabs/sidebar-tabs");
    for (i=recs.length - 1; i >= 0; i--)
      new SidebarTabs(recs[i]);
  }

  recs = document.querySelectorAll('a[href^="#"]');
  if (recs.length > 0) {
    InpageNavigation = require("../components/inpage-navigation");
    for (i=recs.length - 1; i >= 0; i--)
      new InpageNavigation(recs[i], {});
  }

  if (document.countSelector('h2[id]') > 0 && document.countSelector('.jumpnav, .indexnav') == 1) {
    JumpNav = require("../components/inpage-navigation/jumpnav");
    new JumpNav({});
  }

  recs = document.querySelectorAll('input[type="radio"],input[type="checkbox"]');
  if (recs.length > 0) {
    CheckboxHelper = require("../components/checklist/checkboxhelper");
    for (i=recs.length - 1; i >= 0; i--)
      new CheckboxHelper(recs[i], {});
  }

  recs = document.querySelectorAll('ul.checklist[data-unlock-target]');
  if (recs.length > 0) {
    UnlockChecklist = require("../components/checklist");
    for (i=recs.length - 1; i >= 0; i--)
      new UnlockChecklist(recs[i], {});
  }

  recs = document.querySelectorAll('form[data-validate]');
  if (recs.length > 0) {
    ValidateForm = require("../components/forms");
    for (i=recs.length - 1; i >= 0; i--)
      new ValidateForm(recs[i], {});
  }

  // window.UOMTableLabels();

  recs = document.querySelectorAll('form.filtered-listing-select');
  if (recs.length > 0) {
    FilteredListing = require("../components/filtered-listings");
    for (i=recs.length - 1; i >= 0; i--)
      new FilteredListing(recs[i], {});
  }

  recs = document.querySelectorAll('[data-icon]');
  if (recs.length > 0) {
    IconHelper = require("../injection/icons/iconhelper");
    for (i=recs.length - 1; i >= 0; i--)
      new IconHelper(recs[i], {});
  }

  recs = document.querySelectorAll('ul.image-gallery');
  if (recs.length > 0) {
    loadScript('https://d2h9b02ioca40d.cloudfront.net/shared/photoswipe.pkgd.min.js', function (recs) {
      imagesLoaded = require('imagesloaded');
      ImageGallery = require("../components/gallery");

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
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js', function() {
      style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = '//cdn.leafletjs.com/leaflet-0.7.3/leaflet.css';
      document.body.appendChild(style);

      LMaps = require("../components/maps/lmaps");
      for (i=recs.length - 1; i >= 0; i--) {
        new LMaps(recs[i], {});
      }
    });
  }

  // GMaps will load via callback
  if (document.countSelector('[data-latlng],[data-address]') > 0) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key=#{process.env.GMAPSJSAPIKEY}&callback=maps_loaded_go";
    document.body.appendChild(script);
  }
};

// GMaps callback
window.maps_loaded_go = function() {
  var GMaps = require("../components/maps/gmaps.es6");
  for (var recs = document.querySelectorAll('[data-latlng],[data-address]'), i=recs.length - 1; i >= 0; i--)
    new GMaps(recs[i], {});
};

// Execute when ready
if (window.attachEvent) {
  window.attachEvent('onload', window.DSComponentsLoad);
} else {
  document.addEventListener('DOMContentLoaded', window.DSComponentsLoad, false);
  document.addEventListener('page:load', window.DSComponentsLoad, false);
  document.addEventListener('page:restore', window.DSComponentsLoad, false);
}
