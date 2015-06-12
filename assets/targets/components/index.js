var Shims = require("../../shared/shims");
new Shims();

// Async load fonts from google
var WebFont = require("webfontloader");
WebFont.load({
  google: { families: [ 'Roboto:400,300,100,700,100italic,300italic,400italic,700italic:latin' ] }
});

// replace with viewloader
window.UOMloadComponents = function() {
  var Accordion = require("./accordion");
  for (var recs=document.querySelectorAll('.accordion__title'), i=recs.length - 1; i >= 0; i--) {
    new Accordion(recs[i], {});
  }

  var Modal = require("./modal");
  for (recs=document.querySelectorAll('[data-modal-target]'), i=recs.length - 1; i >= 0; i--) {
    new Modal(recs[i], {});
  }

  // window.UOMTabs();
  // window.UOMSidebarTabs();
  // window.UOMInpageScrolling();

  // window.UOMListFilter();
  // window.UOMStickyNav();

  // window.UOMExtraLabel();
  // window.UOMFancySelect();
  // window.UOMValid();
  // window.UOMTableLabels();

  // window.UOMGMap();
  // window.UOMLeafletMap();

  // window.UOMImageGallery();

};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadComponents);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadComponents, false);
  document.addEventListener('page:change', function() {
    window.UOMloadComponents();
  }, false);
}
