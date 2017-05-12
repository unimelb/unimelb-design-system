/**
 * CheckboxHelper
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function CheckboxHelper(el, props) {
  this.el = el;
  this.props = props || {};
  this.props.parent = this.el.parentNode;
  this.props.parent.addEventListener('click', this.handleClick.bind(this));
}

CheckboxHelper.label = 'CheckboxHelper';
CheckboxHelper.selector = 'input[type="radio"],input[type="checkbox"]';

CheckboxHelper.prototype.handleClick = function(e) {
  if (this.el.checked) {
    this.props.parent.classList.add('on');
  } else {
    this.props.parent.classList.remove('on');
  }
};

module.exports = CheckboxHelper;
