//= require ./global.js
//= require ./header/header
//= require ./global-nav/modal
//= require ./global-nav/nav
//= require ./footer/footer

var loadEvents = function() {
  UOMinjectHeader();
  UOMinjectFooter();
  UOMModal()
  UOMinjectGlobalNav();
};

if (window.attachEvent) {
  window.attachEvent('onload', loadEvents);
} else {
  document.addEventListener('DOMContentLoaded', loadEvents, false);
}
