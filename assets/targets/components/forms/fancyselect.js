/**
 * FancySelect
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

    // Can't trigger select externally in IE
    if (!/(MSIE|Trident)/g.test(navigator.userAgent)) {
      for (var recs=this.props.parent.querySelectorAll('svg.icon'), i=recs.length - 1; i >= 0; i--)
        recs[i].addEventListener('click', this.handleClick);
    }
  }
}

FancySelect.prototype.handleClick = function(e) {
  var evt = new MouseEvent('mousedown', {
    bubbles:    true,
    cancelable: true,
    view:       window
  });
  this.parentNode.querySelector('select').dispatchEvent(evt);
};

FancySelect.prototype.buildWrapper = function() {
  var wrapper = document.createElement('div');
  wrapper.addClass('styled-select');

  if (this.el.hasClass('alt'))
    wrapper.addClass('alt');

  if (this.el.hasClass('clear'))
    wrapper.addClass('clear');

  if (this.el.hasClass('clear-dark'))
    wrapper.addClass('clear-dark');

  wrapper.innerHTML = '<svg class="icon" role="img"><use xlink:href="#icon-select"></use></svg>';

  this.props.parent.removeChild(this.el);
  wrapper.insertBefore(this.el, wrapper.firstChild);
  this.props.parent.appendChild(wrapper);
};

module.exports = FancySelect;
