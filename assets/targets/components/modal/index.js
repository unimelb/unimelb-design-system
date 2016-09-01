var Blanket = require('../../../shared/blanket');

/**
 * Modal
 * @param {Element} el
 * @param {Object} props
 */
function Modal(el, props) {
  this.el = el;
  this.props = props;
  this.props.target = document.getElementById(el.getAttribute('data-modal-target'));

  var CreateNameSpace = require('../../../shared/createnamespace');
  new CreateNameSpace();

  // Bind only if modal has target
  if (this.props.target) {
    this.props.root = document.querySelector('.uomcontent');
    this.props.offset = el.hasAttribute('data-modal-offset');
    this.props.blanket = new Blanket();

    this.setupCloseButton();

    // Event bindings
    if (!this.el.hasAttribute('data-bound')) {
      // Bind open trigger
      this.el.addEventListener('click', this.show.bind(this));

      // Bind close triggers
      var recs = this.props.target.querySelectorAll('.modal__close');
      for (var i = recs.length - 1; i >= 0; i--) {
        recs[i].addEventListener('click', this.dismiss.bind(this));
      }

      // Mark modal as bound
      this.el.setAttribute('data-bound', true);
    }
  }
}

/**
 * Create and add close button to modal if one doesn't already exist.
 */
Modal.prototype.setupCloseButton = function () {
  var close = this.props.target.querySelector('.modal__close');

  if (!close) {
    close = document.createElement('button');
    close.className = 'modal__close button-ui';
    close.innerHTML = 'Close';

    this.props.target.insertBefore(close, this.props.target.firstChild);
  }
};

/**
 * Activate blanket, modal dialog
 */
Modal.prototype.show = function (e) {
  e.preventDefault();

  // Move modal dialog to document root (default higher z-index)
  this.props.root.appendChild(this.props.target);

  // Position modal either near the trigger or in the middle of the viewport
  if (this.props.offset) {
    this.props.target.style.top = (this.el.offsetTop - 160) + 'px';
  } else {
    var viewport = document.body.getBoundingClientRect();
    var top = parseInt((window.height() - this.props.target.offsetHeight) / 2, 10);

    // Make sure modal never goes past the top of the viewport
    this.props.target.style.top = (Math.max(top, 40) - viewport.top) + 'px';
  }

  // Show modal
  this.props.target.classList.add('on');

  // Show blanket, passing a dismiss handler to be registered dynamically
  this.props.blanket.show({
    onClick: this.dismiss.bind(this)
  });
};

/**
 * Hide modal and blanket.
 */
Modal.prototype.dismiss = function () {
  this.props.target.classList.remove('on');
  this.props.blanket.hide();
};

module.exports = Modal;
