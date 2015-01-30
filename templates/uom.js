//= require ./global.js
//= require_tree ./components
//= require_self

window.UOMloadComponents = function() {
  window.UOMAccordion();
  window.UOMExtraLabel();
  window.UOMFancySelect();
  window.UOMValid();
  window.UOMListFilter();
  window.UOMGMap();
  window.UOMModal();
  window.UOMTabs();
  window.UOMInpageScrolling();
  window.UOMStickyNav();
  window.UOMUnlockChecklist();
  window.UOMInnerNavTab();
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadComponents);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadComponents, false);
  document.addEventListener('page:change', function() {
    window.UOMloadComponents();
  }, false);
}
