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
  this.props.root = document.querySelector('.uomcontent');
  this.props.targetElement = document.getElementById(this.el.getAttribute('data-modal-target'));

  // Only bind if modal has a target
  if (this.props.targetElement) {
    Blanket = require('./blanket');
    this.props.blanketElement = new Blanket({
      'root': this.props.root
    });

    this.initTarget();

    // Event bindings
    this.el.addEventListener('click', this.activateDialog.bind(this));
    for (var recs=this.props.targetElement.querySelectorAll('.modal__close'), i=recs.length - 1; i >= 0; i--) {
      recs[i].addEventListener('click', this.props.blanketElement.hideDialog.bind(this));
    }
  }
}

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

  if (this.props.offset) {
    this.props.targetElement.style.top = (this.el.offsetTop - 160) + 'px';

  } else {
    var viewport = document.body.getBoundingClientRect();
    var top = parseInt( (window.height() - this.props.targetElement.offsetHeight) / 2 );
    this.props.targetElement.style.top = (top - viewport.top) + 'px';
  }

  this.props.targetElement.addClass('on');
  this.props.blanketElement.show();
};

module.exports = Modal;