// Deps
require("../../shared/shims");
require("./gtm");
require("./tealium");

// Simple sniff
if (typeof window.MSIE_version === "undefined")
  window.MSIE_version = /MSIE\s(\d{1,2})/g.exec(navigator.userAgent) === null ? 100 : /MSIE\s(\d{1,2})/g.exec(navigator.userAgent)[1];

window.UOMbindIcons = function() {
  "use strict";

  /*
   * Check that UOMbind exists.
   *
   * In v4.0, the IconHelper class was moved to the injection. As a result, in versions prior to 4.0, the helper gets called twice for each icon.
   * This is fine as long as the helper checks the `data-bound` attribute to ensure the same icon doesn't get initialised twice.
   * Unfortunately, this attribute was added only in v3.6 with `UOMbind`; hence the need to check that `UOMbind` exists.
   * Without it, icons would get initialised twice in v3.5.2 and below.
   */
  if (!UOMbind) { return; }

  var recs, i, IconHelper;

  recs = document.querySelectorAll('[data-icon]');
  if (recs.length > 0) {
    IconHelper = require('./icons/iconhelper.js');

    for (i=recs.length - 1; i >= 0; i--)
      new IconHelper(recs[i], {});
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
