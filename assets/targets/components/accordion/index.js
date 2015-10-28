/**
 * Accordion
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function Accordion(el, props) {
  this.el = el;
  this.props = props;

  this.props.container = this.el.parentNode;
  this.props.hidden = this.props.container.querySelector('.accordion__hidden');

  this.setupCloseButton();
  this.el.setAttribute('tabindex', '0');

  // Event bindings
  this.el.addEventListener('click', this.handleClick.bind(this));

  if ('onkeydown' in window.window)
    window.addEventListener('keydown', this.clickWithEnter.bind(this));

  if (window.attachEvent) { // IE 10 down
    window.attachEvent('KeyboardEvent', this.clickWithEnter.bind(this));
  }
}

Accordion.prototype.handleClick = function(e) {
  e.preventDefault();

  // Determine overall container to check for single focus
  var container = this.props.container.parentNode;

  // Reasonable expectations, if the trigger is wrapped
  if (container.nodeName == 'TR' || container.parentNode.nodeName == 'TR') {
    while (container.nodeName != 'TABLE') {
      if (container.parentNode)
        container = container.parentNode;
    }
  }

  if (container && container.getAttribute('data-single-focus') === '') {
    for (var recs=container.querySelectorAll('.accordion__visible'), i=recs.length - 1; i >= 0; i--) {
      recs[i].removeClass('accordion__visible');
    }
  }

  this.props.container.toggleClass('accordion__visible');
};

Accordion.prototype.setupCloseButton = function() {
  var close = this.props.container.querySelector('.accordion__close');
  if (!close) {
    close = document.createElement('a');
    close.addClass('accordion__close');

    if (this.props.hidden.countSelector('.accordion__close') === 0) {
      if (this.props.hidden.nodeName == 'TR') {
          var firstElem = this.props.hidden.findFirstElementChild();
          if (firstElem) {
            firstElem.appendChild(close);
          }
      } else {
        this.props.hidden.appendChild(close);
      }
    }

    close.addEventListener('click', function(e){
      e.preventDefault();
      this.props.container.toggleClass('accordion__visible');
    }.bind(this));
  }
};

Accordion.prototype.clickWithEnter = function(e) {
  var elem = document.activeElement;
  if (elem == this.el) {
    // Use window.event if available
    if (typeof e === 'undefined' && window.event) {
      e = window.event;
    }

    // Trigger click on ENTER (13)
    if (e.keyCode == 13) {
      elem.click();
    }
  }
};

module.exports = Accordion;