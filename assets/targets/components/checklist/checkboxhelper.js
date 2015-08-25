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
  this.props.parent = this.el.parentNode;
  this.props.parent.addEventListener('click', this.handleClick.bind(this));
}

CheckboxHelper.prototype.handleClick = function(e) {
  if (this.el.checked) {
    this.props.parent.addClass('on');
  } else {
    this.props.parent.removeClass('on');
  }
};

module.exports = CheckboxHelper;