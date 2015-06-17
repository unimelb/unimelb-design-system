// Dep
var Shims = require("../../shared/shims");
new Shims();

// Global scoped smooth inner scroll
var SmoothScroll = require("../../shared/smoothscroll");
new SmoothScroll();

// Async load fonts from google
var WebFont = require("webfontloader");
WebFont.load({
  google: { families: [ 'Roboto:400,300,100,700,100italic,300italic,400italic,700italic:latin' ] }
});

// replace with viewloader eventually
window.UOMloadComponents = function() {
  var Accordion = require("./accordion");
  for (var recs=document.querySelectorAll('.accordion__title'), i=recs.length - 1; i >= 0; i--)
    new Accordion(recs[i], {});

  var Modal = require("./modal");
  for (recs=document.querySelectorAll('[data-modal-target]'), i=recs.length - 1; i >= 0; i--)
    new Modal(recs[i], {});

  var Tabs = require("./tabs");
  for (recs=document.querySelectorAll('[data-tabbed]'), i=recs.length - 1; i >= 0; i--)
    new Tabs(recs[i], {});

  // window.UOMSidebarTabs();

  var InpageNavigation = require("./inpage-navigation");
  for (recs=document.querySelectorAll('a[href^="#"]'), i=recs.length - 1; i >= 0; i--)
    new InpageNavigation(recs[i], {});

//       # Static tab aside
//       if document.countSelector('.tab') > 0
//         for el in document.querySelectorAll('.tab')
//           if el.countSelector('h2[id]') > 0
//             new StickyNav(el)

//       # Scrolling jump nav
//       else
  var JumpNav = require("./inpage-navigation/jumpnav");
  if (document.countSelector('h2[id]') > 0 && document.countSelector('.jumpnav, .indexnav') == 1)
    new JumpNav({});

  // window.UOMExtraLabel();
  // window.UOMFancySelect();
  // window.UOMValid();
  // window.UOMTableLabels();
  // Checklist?

  // window.UOMGMap();
  // window.UOMLeafletMap();

  // window.UOMListFilter();

  // Require deps only if galleries exist
  var galleries = document.querySelectorAll('ul.image-gallery');
  if (galleries.length > 0) {
    var imagesLoaded = require('imagesloaded');
    var ImageGallery = require("./gallery");

    var slingshot = function() {
      new ImageGallery(g, {});
    };

    for (i=galleries.length - 1; i >= 0; i--) {
      var g = galleries[i];
      imagesLoaded(g, slingshot);
    }
  }

};

// Execute when ready
if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadComponents);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadComponents, false);
  document.addEventListener('page:change', function() {
    window.UOMloadComponents();
  }, false);
}
