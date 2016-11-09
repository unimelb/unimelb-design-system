// Deps
require('classlist-polyfill');
require("../../shared/smoothscroll");
require("../../shared/findup");
require("../../shared/loadscript");

// Simple sniff
if (typeof window.MSIE_version === "undefined")
  window.MSIE_version = /MSIE\s(\d{1,2})/g.exec(navigator.userAgent) === null ? 100 : /MSIE\s(\d{1,2})/g.exec(navigator.userAgent)[1];

window.UOMFormLoadComponents = function() {
  "use strict";

  // components
  var recs, i, Accordion, Modal, InpageNavigation, FancySelect, ValidateForm, Icons;

  recs = document.querySelectorAll('.accordion__title');
  if (recs.length > 0) {
    Accordion = require("../components/accordion");
    for (i=recs.length - 1; i >= 0; i--)
      new Accordion(recs[i], {});
  }

  recs = document.querySelectorAll('[data-modal-target]');
  if (recs.length > 0) {
    Modal = require("../components/modal");
    for (i=recs.length - 1; i >= 0; i--)
      new Modal(recs[i], {});
  }

  recs = document.querySelectorAll('a[href^="#"]');
  if (recs.length > 0) {
    InpageNavigation = require("../components/inpage-navigation");
    for (i=recs.length - 1; i >= 0; i--)
      new InpageNavigation(recs[i], {});
  }

  recs = document.querySelectorAll('select');
  if (recs.length > 0) {
    FancySelect = require("../components/forms/fancyselect");
    for (i=recs.length - 1; i >= 0; i--)
      new FancySelect(recs[i], {});
  }

  recs = document.querySelectorAll('form[data-validate]');
  if (recs.length > 0) {
    ValidateForm = require("../components/forms");
    for (i=recs.length - 1; i >= 0; i--)
      new ValidateForm(recs[i], {});
  }

  Icons = require('../injection/icons');
  new Icons();
};

document.addEventListener('DOMContentLoaded', window.UOMFormLoadComponents, false);
document.addEventListener('page:load', window.UOMFormLoadComponents, false);
document.addEventListener('page:restore', window.UOMFormLoadComponents, false);
