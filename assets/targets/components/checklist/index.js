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
  var target = e.target;
  if (target.nodeName=='LABEL' || target.nodeName=='SPAN') {
    if (target.hasClass('on')) {
      this.props.active--;
    } else {
      this.props.active++;
    }
    this.toggleDisable();
  }
};

Checklist.prototype.handleTargetClick = function(e) {
  if (e.target.hasClass('disabled'))
    e.preventDefault();
};

Checklist.prototype.toggleDisable = function() {
  if (this.props.active == this.props.items.length) {
    this.props.target.removeClass('disabled');
    this.props.target.removeAttribute('disabled');

  } else {
    this.props.target.addClass('disabled');
    this.props.target.setAttribute('disabled', 'disabled');
  }
};

module.exports = Checklist;
