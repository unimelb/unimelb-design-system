//= require ./global.js
//= require_tree ./components
//= require_self

window.UOMloadComponents = function() {
  window.UOMAccordion()
  window.UOMExtraLabel()
  window.UOMValid()
  window.UOMListFilter()
  window.UOMGMap()
  window.UOMModal()
  window.UOMTabs()
  window.UOMInpageScrolling()
  window.UOMStickyNav()
  window.UOMYtEmbed() // unused?
};

if (!window.attachEvent) {
  document.addEventListener('page:change', function() {
    window.UOMloadComponents();
  }, false);
}
