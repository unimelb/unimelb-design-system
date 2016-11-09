/**
 * Checklist
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function Checklist(el, props) {
  "use strict";

  this.el = el;
  this.props = props;

  this.props.target = document.getElementById(this.el.getAttribute('data-unlock-target'));
  this.props.target.addEventListener('click', this.handleTargetClick.bind(this));

  this.props.items = this.el.querySelectorAll('li');
  this.props.active = this.el.querySelectorAll('.on').length;

  this.toggleDisable();

  for (var i=this.props.items.length - 1; i >= 0; i--)
    this.props.items[i].addEventListener('click', this.handleClick.bind(this));
}

Checklist.prototype.handleClick = function(e) {
  var parent = e.target.parentNode;
  if (e.target.nodeName=='LABEL' || e.target.nodeName=='SPAN') {
    if (e.target.nodeName=='SPAN')
      parent = parent.parentNode;

    this.props.active += (parent.classList.contains('on') ? -1 : 1);
    this.toggleDisable();
  }
};

Checklist.prototype.handleTargetClick = function(e) {
  if (e.target.getAttribute('disabled') !== null) {
    e.preventDefault();
  }
};

Checklist.prototype.toggleDisable = function() {
  if (this.props.active == this.props.items.length) {
    this.props.target.removeAttribute('disabled');
    this.props.target.removeAttribute('tabindex');
  } else {
    this.props.target.setAttribute('disabled', 'disabled');
    this.props.target.setAttribute('tabindex', '-1');
  }
};

module.exports = Checklist;
