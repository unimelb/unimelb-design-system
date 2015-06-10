/**
 * Modal
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function Modal(el, props) {
  this.el = el;
  this.props = props;

  this.props.offset = el.getAttribute('data-modal-offset');
  this.rootElement = document.querySelector('.uomcontent');
  this.targetElement = document.getElementById(this.el.getAttribute('data-modal-target'));

  this.initBlanket();
  this.initTarget();

  // Event bindings
  this.el.addEventListener('click', this.activateDialog.bind(this));
  for (var recs=this.targetElement.querySelectorAll('.modal__close'), i=recs.length - 1; i >= 0; i--) {
    recs[i].addEventListener('click', this.hideDialog.bind(this));
  }
}

/**
 * Set up page covering "blanket" to prevent accidental interactions
 */
Modal.prototype.initBlanket = function() {
  this.blanketElement = document.querySelector('.modal__blanket');
  if (!this.blanketElement) {
    this.blanketElement = document.createElement('div');
    this.blanketElement.setAttribute('class', 'modal__blanket');
    this.rootElement.appendChild(this.blanketElement);

    this.blanketElement.addEventListener('click', this.hideDialog.bind(this));
  }
};

/**
 * Move modal dialogs back to document root (default higher z-index)
 */
Modal.prototype.initTarget = function() {
  this.targetElement.parentNode.removeChild(this.targetElement);
  this.rootElement.appendChild(this.targetElement);
};

/**
 * Activate blanket, modal dialog
 */
Modal.prototype.activateDialog = function(e) {
  e.preventDefault();

  if (this.props.offset) {
    this.targetElement.style.top = (this.el.offsetTop - 160) + 'px';

  } else {
    var viewport = document.body.getBoundingClientRect();
    var top = parseInt( (window.height() - this.targetElement.offsetHeight) / 2 );
    this.targetElement.style.top = (top - viewport.top) + 'px';
  }

  this.targetElement.addClass('on');
  this.blanketElement.addClass('on');
};

/**
 * Deactivate blanket, hide ~all~ modal dialogs
 */
Modal.prototype.hideDialog = function(e) {
  e.preventDefault();
  for (var recs=document.querySelectorAll('.modal__dialog'), i=recs.length - 1; i >= 0; i--) {
    recs[i].removeClass('on');
  }
  this.blanketElement.removeClass('on');
};

module.exports = Modal;