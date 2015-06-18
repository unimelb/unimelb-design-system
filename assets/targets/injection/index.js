// Dep
var Shims = require("../../shared/shims");
new Shims();

// Tag manager setup
var GTM = require("./gtm");
new GTM();

window.UOMloadInjection = function() {
  "use strict";

  var assethost, Header, Nav, Footer, Icons;

  //var assethost = 'http://localhost:5001/assets';
  assethost = '//uom-design-system.s3.amazonaws.com/shared/assets';

  Header = require('./header');
  new Header({
    'assethost':   assethost, // + '/injection/header',
    'defaultlink': 'https://www.unimelb.edu.au'
  });

  Nav = require('./nav');
  new Nav({
    'assethost': assethost, // + '/injection/header'
  });

  Footer = require('./footer');
  new Footer({
    'assethost': assethost, // + '/injection/footer'
  });

  Icons = require('./icons');
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
