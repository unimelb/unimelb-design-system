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

  // outdatedBrowser({
  //   bgColor: '#3f3f3f',
  //   color: '#e3e3e3',
  //   lowerThan: 'IE10'
  // });
};

if (window.attachEvent) {
  window.attachEvent('onload', loadEvents);
} else {
  document.addEventListener('DOMContentLoaded', loadEvents, false);
}
