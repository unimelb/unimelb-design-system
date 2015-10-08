// Deps
require("../../shared/shims");
require("./gtm");

window.UOMloadInjection = function() {
  "use strict";

  var assethostFooter, assethostHeader, Header, Nav, Footer, Icons, Accouncement;

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

  Icons = require('./icons');
  new Icons();
  
  Accouncement = require('./announcement/index.es6');
  new Accouncement({});
};

// Execute when ready
if (window.attachEvent) {
  window.attachEvent('onload', window.UOMloadInjection);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMloadInjection, false);
  document.addEventListener('page:load', window.UOMloadInjection, false);
  document.addEventListener('page:restore', window.UOMloadInjection, false);
}
