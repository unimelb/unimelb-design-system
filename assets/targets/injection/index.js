// Deps
require("../../shared/shims");
require("./gtm");
require("./tealium");

// Simple sniff
if (typeof window.MSIE_version === "undefined")
  window.MSIE_version = /MSIE\s(\d{1,2})/g.exec(navigator.userAgent) === null ? 100 : /MSIE\s(\d{1,2})/g.exec(navigator.userAgent)[1];

window.UOMbindIcons = function() {
  "use strict";

  var recs, i, Base;

  recs = document.querySelectorAll('[data-icon]');
  if (recs.length > 0) {
    Base = require('./icons/iconhelper.js');

    for (i=recs.length - 1; i >= 0; i--)
      new Base(recs[i], {});
  }
};

window.UOMloadInjection = function() {
  "use strict";

  var assethostFooter, assethostHeader, Header, Nav, Footer, Icons, Accouncement;

  assethostHeader = assethostFooter = '//d2h9b02ioca40d.cloudfront.net/shared/assets';
  // assethostHeader = assethostFooter = 'http://localhost:5001/assets';
  // assethostHeader += '/injection/header';
  // assethostFooter += '/injection/footer';

  Header = require('./header/index.es6');
  new Header({
    'assethost':   assethostHeader,
    'defaultlink': 'https://www.unimelb.edu.au'
  });

  Nav = require('./nav/index.es6');
  new Nav({
    'assethost': assethostHeader,
  });

  Footer = require('./footer/index.es6');
  new Footer({
    'assethost': assethostFooter
  });

  Icons = require('./icons');
  new Icons();

  window.UOMbindIcons();

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
