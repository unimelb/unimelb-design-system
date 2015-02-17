//= require ./global.js
//= require_tree ./components
//= require_self

window.UOMloadComponents = function() {
  window.UOMAccordion();
  window.UOMModal();
  window.UOMTabs();
  window.UOMInnerNavTab();
  window.UOMSidebarTabs(); // duplicate?
  window.UOMInpageScrolling();

  window.UOMListFilter();
  window.UOMStickyNav();

  window.UOMExtraLabel();
  window.UOMFancySelect();
  window.UOMValid();
  window.UOMUnlockChecklist(); // possibly unused
  window.UOMTableLabels();
  window.UOMGMap();
//  window.UOMYtEmbed(); // unused
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadComponents);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadComponents, false);
  document.addEventListener('page:change', function() {
    window.UOMloadComponents();
  }, false);
}
