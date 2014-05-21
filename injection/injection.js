//= require ./global.js
//= require ./html5shiv
//= require ./header/header
//= require ./global-nav/nav
//= require ./footer/footer

if (window.attachEvent) {
  window.attachEvent('onload', function() {
    UOMinjectHeader();
    UOMinjectFooter();
    UOMinjectGlobalNav();
  });
} else {
  document.addEventListener('DOMContentLoaded', function() {
    UOMinjectHeader();
    UOMinjectFooter();
    UOMinjectGlobalNav();
  });
}
