// Deps
require("./gtm");
require("./tealium");

window.UOMloadInjection = function() {
  var Header, Nav, Footer, Accouncement;

  Header = require('./header/index.es6');
  new Header({
    'defaultlink': 'https://www.unimelb.edu.au'
  });

  Nav = require('./nav/index.es6');
  new Nav();

  Footer = require('./footer/index.es6');
  new Footer();

  Icons = require('./icons');
  new Icons();
};

document.addEventListener('DOMContentLoaded', window.UOMloadInjection, false);
document.addEventListener('page:load', window.UOMloadInjection, false);
document.addEventListener('page:restore', window.UOMloadInjection, false);
