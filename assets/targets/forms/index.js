// Deps
require("../../shared/shims");
require("../../shared/smoothscroll");
require("../../shared/findup");
require("../../shared/loadscript");

window.UOMFormLoadComponents = function() {
  "use strict";

  // components
  var recs, i, Accordion, Modal, FancySelect, ValidateForm;

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

  // IE9 unsupported at this stage
  if (!/(MSIE 9)/g.test(navigator.userAgent)) {
    recs = document.querySelectorAll('select');
    if (recs.length > 0) {
      FancySelect = require("../components/forms/fancyselect");
      for (i=recs.length - 1; i >= 0; i--)
        new FancySelect(recs[i], {});
    }
  }

  recs = document.querySelectorAll('form[data-validate]');
  if (recs.length > 0) {
    ValidateForm = require("../components/forms");
    for (i=recs.length - 1; i >= 0; i--)
      new ValidateForm(recs[i], {});
  }

  require('../injection/icons');
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMFormLoadComponents);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMFormLoadComponents, false);
  document.addEventListener('page:change', function() {
    window.UOMFormLoadComponents();
  }, false);
}
