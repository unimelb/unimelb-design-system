var utils = require('utils');

/**
 * ValidateForm
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function ValidateForm(el, props) {
  this.el = el;
  this.props = props || {};

  this.props.patterns = {
    alpha         : /[a-zA-Z]+/,
    alpha_numeric : /[a-zA-Z0-9]+/,
    integer       : /-?\d+/,
    number        : /-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,
    card          : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    cvv           : /^([0-9]){3,4}$/,
    datetime      : /([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,
    date          : /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,
    time          : /(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,
    dateISO       : /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,
    day_month_year: /(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/,

    // generic password: upper-case, lower-case, number/special character, and min 8 characters
    password      : /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
    email         : /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

    // abc.de
    domain        : /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z][a-zA-Z]+$/

    // url: /(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)|\/|\?)*)?/
  };

  for (var fields=this.el.querySelectorAll('[aria-required],[data-pattern]'), i=fields.length - 1; i >= 0; i--)
    this.setupMessage(fields[i]);

  this.el.addEventListener('submit', this.handleSubmit.bind(this));
}

ValidateForm.label = 'ValidateForm';
ValidateForm.selector = 'form[data-validate]';

ValidateForm.prototype.handleSubmit = function(e) {
  this.props.invalid = 0;

  for (var fields=e.target.querySelectorAll('input,select,textarea'), i=fields.length - 1; i >= 0; i--)
    this.processField(fields[i]);

  // Prevent submit and snap to top for error display
  if (this.props.invalid > 0) {
    e.preventDefault();
    e.stopImmediatePropagation();
    utils.smoothScrollTo(this.el);
  }
};

ValidateForm.prototype.processField = function(field) {
  var req = field.getAttribute('aria-required'),
      pattern = field.getAttribute('data-pattern'),
      re;

  if (req && req == "true") {
    if (field.tagName == 'SELECT') {
      if (field.value!="-1") {
        this.toggleValid(field, true);
      } else {
        this.toggleValid(field, false);
        this.props.invalid++;
      }
    } else if (field.getAttribute('type') == 'checkbox' || field.getAttribute('type') == 'radio') {
      if (this.el.querySelector('[name="' + field.getAttribute('name') + '"]:checked')) {
        this.toggleValid(field, true);
      } else {
        this.toggleValid(field, false);
        this.props.invalid++;
      }
    } else {
      if (field.value.length > 0) {
        this.toggleValid(field, true);
      } else {
        this.toggleValid(field, false);
        this.props.invalid++;
      }
    }
  }

  if (pattern) {
    if (this.props.patterns.hasOwnProperty(pattern)) {
      re = new RegExp(this.props.patterns[pattern]);
    } else {
      re = new RegExp(pattern);
    }

    if (re.test(field.value)) {
      this.toggleValid(field, true);
    } else {
      this.toggleValid(field, false);
      this.props.invalid++;
    }
  }
};

ValidateForm.prototype.setupMessage = function(field) {
  var parent = field.parentNode;

  // Go up another level if field is a select
  if (field.nodeName == 'SELECT')
    parent = parent.parentNode;

  // Do a crazy search if field is checkbox/radio
  if (field.getAttribute('type') == 'checkbox' || field.getAttribute('type') == 'radio') {
    var nameval = '[name="' + field.getAttribute('name') + '"]';
    parent = this.el.querySelectorAll(nameval);
    parent = parent[parent.length-1].parentNode;
  }

  if (!parent.querySelector('small')) {
    var error = document.createElement('small');
    if (field.hasAttribute('data-error')) {
      error.appendChild(document.createTextNode(field.getAttribute('data-error')));
    } else {
      error.appendChild(document.createTextNode('Required'));
    }
    parent.appendChild(error);
  }
};

ValidateForm.prototype.toggleValid = function(field, isValid) {
  var parent = field.parentNode;
  if (field.nodeName == 'SELECT')
    parent.parentNode.classList.toggle('invalid', !isValid);
  parent.classList.toggle('invalid', !isValid);
  field.classList.toggle('invalid', !isValid);
};

module.exports = ValidateForm;
