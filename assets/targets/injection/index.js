// Dependencies
var SmoothScroll = require("../../shared/smoothscroll");
new SmoothScroll();

var Shims = require("../../shared/shims");
new Shims();

window.UOMloadInjection = function() {
  var Header = require('./header');
  new Header();

  // var GlobalNav = require('./global-nav');
  // new GlobalNav();

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
