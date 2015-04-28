//= require ./global.js
//= require_tree ./components
//= require_self
//= require ./webfontloader.js

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

  window.UOMIconHelper();

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
