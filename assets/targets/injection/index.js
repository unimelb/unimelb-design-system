// Deps
require("../../shared/shims");
require("./gtm");

window.UOMloadInjection = function() {
  "use strict";

  var assethost, Header, Nav, Footer;

  //var assethost = 'http://localhost:5001/assets';
  assethost = '//uom-design-system.s3.amazonaws.com/shared/assets';

  Header = require('./header/index.es6');
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

  require('./icons');
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
