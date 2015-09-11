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
}

FancySelect.prototype.buildWrapper = function() {
  var wrapper = document.createElement('div');
  wrapper.addClass('styled-select');

  if (this.el.hasClass('alt'))
    wrapper.addClass('alt');

  if (this.el.hasClass('clear'))
    wrapper.addClass('clear');

  if (this.el.hasClass('clear-dark'))
    wrapper.addClass('clear-dark');

  this.props.parent.removeChild(this.el);
  wrapper.insertBefore(this.el, wrapper.firstChild);
  this.props.parent.appendChild(wrapper);
};

module.exports = FancySelect;
