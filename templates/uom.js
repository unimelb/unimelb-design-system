//= require ./global.js
//= require ../injection/header/header
//= require ../injection/global-nav/modal
//= require ../injection/global-nav/nav
//= require ../injection/footer/footer
//= require ../injection/tracking/gtm
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

window.UOMloadInjection = function() {
  window.UOMinjectHeader();
  window.UOMModal()
  window.UOMinjectGlobalNav();
  window.UOMinjectFooter();
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadInjection);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadInjection, false);
  document.addEventListener('page:change', function() {
    window.UOMloadInjection();
    window.UOMloadComponents();
  }, false);
}
