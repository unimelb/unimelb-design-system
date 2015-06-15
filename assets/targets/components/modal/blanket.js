/**
 * Blanket
 *
 * @returns dom element
 */
function Blanket(props) {
  this.props = props;
  this.initBlanket();
}

/**
 * Set up page covering "blanket" to prevent accidental interactions
 */
Blanket.prototype.initBlanket = function() {
  this.props.el = document.querySelector('.modal__blanket');
  if (!this.props.el) {
    this.props.el = document.createElement('div');
    this.props.el.addClass('modal__blanket');
    this.props.root.appendChild(this.props.el);
    this.props.el.addEventListener('click', this.hideDialog.bind(this));
  }
};

/**
 * Deactivate blanket, hide ~all~ modal dialogs
 */
Blanket.prototype.hideDialog = function(e) {
  e.preventDefault();

  for (var recs=document.querySelectorAll('.modal__dialog'), i=recs.length - 1; i >= 0; i--) {
    recs[i].removeClass('on');
  }
  this.hide();
};

/**
 * Helpers
 */
Blanket.prototype.show = function() {
  this.props.el.addClass('on');
};

Blanket.prototype.hide = function() {
  this.props.el.removeClass('on');
};

Blanket.prototype.toggle = function() {
  this.props.el.toggleClass('on');
};

module.exports = Blanket;
