/**
 * Modal
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function Modal(el, props) {
  this.el = el;
  this.props = props;

  this.props.offset = el.hasAttribute('data-modal-offset');

  var CreateNameSpace = require('../../../shared/createnamespace');
  new CreateNameSpace();

  this.props.root = document.querySelector('.uomcontent');

  this.props.targetElement = document.getElementById(this.el.getAttribute('data-modal-target'));

  // Only bind if modal has a target
  if (this.props.targetElement) {

    // Setup a blanket object
    Blanket = require('../../../shared/blanket');
    this.props.blanketElement = new Blanket({
      'root': this.props.root
    });

    // this.initTarget();
    this.setupCloseButton();

    // Event bindings
    if (!this.el.hasAttribute('data-bound')) {
      this.el.addEventListener('click', this.activateDialog.bind(this));
      for (var recs=this.props.targetElement.querySelectorAll('.modal__close'), i=recs.length - 1; i >= 0; i--) {
        recs[i].addEventListener('click', this.hideAllDialogs.bind(this));
      }

      // Attach closing event to blanket
      this.props.blanketElement.el.addEventListener('click', this.hideAllDialogs.bind(this));
      this.el.setAttribute('data-bound', true);
    }
  }
}

Modal.prototype.setupCloseButton = function() {
  var close = this.props.targetElement.querySelector('.modal__close');
  if (!close) {
    close = document.createElement('a');
    close.className = 'modal__close';
    close.innerText = 'Close';
    this.props.targetElement.insertBefore(close, this.props.targetElement.firstChild);

    close.addEventListener('click', this.hideAllDialogs.bind(this));
  }
};

/**
 * Move modal dialogs back to document root (default higher z-index)
 */
Modal.prototype.initTarget = function() {
  this.props.targetElement.parentNode.removeChild(this.props.targetElement);
  this.props.root.appendChild(this.props.targetElement);
};

/**
 * Activate blanket, modal dialog
 */
Modal.prototype.activateDialog = function(e) {
  e.preventDefault();

  this.initTarget();

  if (this.props.offset) {
    this.props.targetElement.style.top = (this.el.offsetTop - 160) + 'px';
  } else {
    var viewport = document.body.getBoundingClientRect();
    var top = parseInt((window.height() - this.props.targetElement.offsetHeight) / 2, 10);

    // Postion the modal, making sure it never goes past the top of the viewport
    this.props.targetElement.style.top = (Math.max(top, 40) - viewport.top) + 'px';
  }

  this.props.targetElement.classList.add('on');
  this.props.blanketElement.show();
};

/**
 * Deactivate blanket, hide ~all~ modal dialogs
 */
Modal.prototype.hideAllDialogs = function(e) {
  e.preventDefault();

  for (var recs=document.querySelectorAll('.modal__dialog'), i=recs.length - 1; i >= 0; i--) {
    recs[i].classList.remove('on');
  }

  this.props.blanketElement.hide();
};

module.exports = Modal;