// //= require ./global.js
// //= require ./header/header
// //= stub ./global-nav/modal
// //= require ./global-nav/nav
// //= require ./footer/footer
// //= require ./footer/icons
// //= require ./tracking/gtm

// window.UOMloadInjection = function() {
//   window.UOMinjectHeader();
//   // window.UOMModal()
//   // window.UOMinjectGlobalNav();
//   window.UOMinjectFooter();
//   window.UOMinjectIcons();
// };

require("../../shared/shims");

// replace with viewloader
window.UOMloadInjection = function() {
  var Footer = require('./footer');
  new Footer();

  var Icons = require('./icons');
  new Icons();
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadInjection);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadInjection, false);
  document.addEventListener('page:change', function() {
    window.UOMloadInjection();
  }, false);
}
