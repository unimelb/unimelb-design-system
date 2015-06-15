// Dependencies
var SmoothScroll = require("../../shared/smoothscroll");
new SmoothScroll();

var Shims = require("../../shared/shims");
new Shims();

var GTM = require("./gtm");
new GTM();

window.UOMloadInjection = function() {
  var assethost = 'http://localhost:5001/assets'; //'//uom-design-system.s3.amazonaws.com/shared';

  var Header = require('./header');
  new Header({
    'assethost':   assethost,
    'defaultlink': 'https://www.unimelb.edu.au'
  });

  var Modal = require("../components/modal");
  for (recs=document.querySelectorAll('[data-modal-target]'), i=recs.length - 1; i >= 0; i--) {
    new Modal(recs[i], {});
  }

  var Nav = require('./nav');
  new Nav({
    'assethost': assethost
  });

  var Footer = require('./footer');
  new Footer({
    'assethost': assethost
  });

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