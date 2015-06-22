/**
 * CheckboxHelper
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function CheckboxHelper(el, props) {
  "use strict";

  this.el = el;
  this.props = props;
  this.el.parentNode.addEventListener('click', this.handleClick.bind(this));
}

CheckboxHelper.prototype.handleClick = function(e) {
  if (this.el.checked) {
    this.el.parentNode.addClass('on');
  } else {
    this.el.parentNode.removeClass('on');
  }
};

module.exports = CheckboxHelper;