// Deps
require('classlist-polyfill');
require('es6-promise').polyfill();

require("../../shared/smoothscroll");
require("../../shared/findup");

window.UOMFormLoadComponents = function() {
  "use strict";

  // components
  var recs, i, Accordion, Modal, InPageNavigation, FancySelect, ValidateForm, Icons;

  recs = document.querySelectorAll('.accordion__title');
  if (recs.length > 0) {
    Accordion = require("../../components/accordion");
    for (i=recs.length - 1; i >= 0; i--)
      new Accordion(recs[i], {});
  }

  recs = document.querySelectorAll('[data-modal-target]');
  if (recs.length > 0) {
    Modal = require("../../components/modal");
    for (i=recs.length - 1; i >= 0; i--)
      new Modal(recs[i], {});
  }

  recs = document.querySelectorAll('a[href^="#"]');
  if (recs.length > 0) {
    InPageNavigation = require("../../components/inpage-navigation");
    for (i=recs.length - 1; i >= 0; i--)
      new InPageNavigation(recs[i], {});
  }

  recs = document.querySelectorAll('select');
  if (recs.length > 0) {
    FancySelect = require("../../components/forms/fancyselect");
    for (i=recs.length - 1; i >= 0; i--)
      new FancySelect(recs[i], {});
  }

  recs = document.querySelectorAll('form[data-validate]');
  if (recs.length > 0) {
    ValidateForm = require("../../components/forms");
    for (i=recs.length - 1; i >= 0; i--)
      new ValidateForm(recs[i], {});
  }

  Icons = require('../injection/icon-set');
  new Icons();
};

document.addEventListener('DOMContentLoaded', window.UOMFormLoadComponents, false);
