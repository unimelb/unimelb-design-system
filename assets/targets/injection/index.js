// Deps
require("../../shared/shims");
require("./gtm");

window.UOMloadInjection = function() {
  "use strict";

  var assethostFooter, assethostHeader, Header, Nav, Footer;

  assethostHeader = assethostFooter = '//uom-design-system.s3.amazonaws.com/shared/assets';
  // assethostHeader = assethostFooter = 'http://localhost:5001/assets';
  // assethostHeader += '/injection/header';
  // assethostFooter += '/injection/footer';

  Header = require('./header/index.es6');
  new Header({
    'assethost':   assethostHeader,
    'defaultlink': 'https://www.unimelb.edu.au'
  });

  Nav = require('./nav');
  new Nav({
    'assethost': assethostHeader,
  });

  Footer = require('./footer/index.es6');
  new Footer({
    'assethost': assethostFooter
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
