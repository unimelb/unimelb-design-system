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
  this.props.active = this.el.countSelector('.on');

  this.toggleDisable();

  for (var i=this.props.items.length - 1; i >= 0; i--)
    this.props.items[i].addEventListener('click', this.handleClick.bind(this));
}

Checklist.prototype.handleClick = function(e) {
  var parent = e.target.parentNode;
  if (e.target.nodeName=='LABEL' || e.target.nodeName=='SPAN') {
    if (e.target.nodeName=='SPAN')
      parent = parent.parentNode;

    if (parent.hasClass('on'))
      this.props.active--;
    else
      this.props.active++;

    this.toggleDisable();
  }
};

Checklist.prototype.handleTargetClick = function(e) {
  if (e.target.hasClass('disabled'))
    e.preventDefault();
};

Checklist.prototype.toggleDisable = function() {
  if (this.props.active == this.props.items.length) {
    this.props.target.classList.remove('disabled');
    this.props.target.removeAttribute('disabled');
  } else {
    this.props.target.classList.add('disabled');
    this.props.target.setAttribute('disabled', 'disabled');
  }
};

module.exports = Checklist;
