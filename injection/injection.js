//= require ./global.js
//= require ./header/header
//= require ./global-nav/modal
//= require ./global-nav/nav
//= require ./footer/footer

window.UOMloadInjection = function() {
  UOMinjectHeader();
  UOMModal()
  UOMinjectGlobalNav();
  UOMinjectFooter();
};

if (window.attachEvent) {
  window.attachEvent('onload', UOMloadInjection);
} else {
  document.addEventListener('DOMContentLoaded', UOMloadInjection, false);
}
