// Dep
var Shims = require("../../shared/shims");
new Shims();

// Global scoped smooth inner scroll
var SmoothScroll = require("../../shared/smoothscroll");
new SmoothScroll();

// Async load fonts from google
// var WebFont = require("webfontloader");
// WebFont.load({
//   google: { families: [ 'Roboto:400,300,100,700,100italic,300italic,400italic,700italic:latin' ] }
// });

// Tag manager setup
var GTM = require("./gtm");
new GTM();

window.UOMloadInjection = function() {
  //var assethost = 'http://localhost:5001/assets';
  var assethost = '//uom-design-system.s3.amazonaws.com/shared/assets';

  var Header = require('./header');
  new Header({
    'assethost':   assethost, // + '/injection/header',
    'defaultlink': 'https://www.unimelb.edu.au'
  });

  var Nav = require('./nav');
  new Nav({
    'assethost': assethost, // + '/injection/header'
  });

  var Footer = require('./footer');
  new Footer({
    'assethost': assethost, // + '/injection/footer'
  });

  var Icons = require('./icons');
  new Icons();
};

// Execute when ready
if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadInjection);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadInjection, false);
  document.addEventListener('page:change', function() {
    window.UOMloadInjection();
  }, false);
}
