//= require ./svg4everybody.js
//= require ./global.js
//= require ./header/header
//= require ./global-nav/modal
//= require ./global-nav/nav
//= require ./footer/footer
//= require ./tracking/gtm

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
  }, false);
}
