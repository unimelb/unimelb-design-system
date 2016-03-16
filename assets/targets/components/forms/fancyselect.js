// Deps
require("../../../shared/shims");

/**
 * FancySelect
 *
 * It's a wrapper for selects, so you can @-moz-document url-prefix() and then hide under the desk crying
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function FancySelect(el, props) {
  "use strict";

  this.el = el;
  this.props = props;
  this.props.parent = this.el.parentNode;

  // Only fancify if it hasn't already been done
  if (!this.props.parent.hasClass('styled-select')) {
    this.buildWrapper();
  }

  if (this.el.hasClass('select--nav')) {
    this.makeNav();
  }
}

FancySelect.prototype.buildWrapper = function () {
  var wrapper = document.createElement('div');
  wrapper.className = 'styled-select';

  if (this.el.hasClass('alt'))
    wrapper.classList.add('alt');

  if (this.el.hasClass('clear'))
    wrapper.classList.add('clear');

  if (this.el.hasClass('clear-dark'))
    wrapper.classList.add('clear-dark');

  this.props.parent.removeChild(this.el);
  wrapper.appendChild(this.el);
  this.props.parent.appendChild(wrapper);
};

FancySelect.prototype.makeNav = function () {
  var options = this.el.querySelectorAll('option');

  // Listen for changes
  this.el.addEventListener('change', function (e) {
    var option = options[this.selectedIndex];
    var val = option ? option.getAttribute('value') : null;

    // Don't change the location if the `value` attribute is not provided, empty or equal to '#'
    if (val && val !== '#') {
      window.location = val;
    }
  });

  // If user comes back to the page with the back button, the previously selected option remains selected.
  // If they want to then re-select the same option to re-visit the same page, the change listener is not triggered.
  // Work around this issue by always resetting to the first, placeholder option.
  this.el.selectedIndex = 0;
};

module.exports = FancySelect;
