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
  this.el = document.querySelector('.modal__blanket');
  if (!this.el) {
    this.el = document.createElement('div');
    this.el.addClass('modal__blanket');

    // White version for search with header offset
    if (this.props.inverse) {
      this.el.addClass('inverse');
    }

    this.props.root.appendChild(this.el);
  }
};


/**
 * Visibility helpers
 */
Blanket.prototype.show = function() {
  this.el.addClass('on');
};

Blanket.prototype.hide = function() {
  this.el.removeClass('on');
};

Blanket.prototype.toggle = function() {
  this.el.toggleClass('on');
};

module.exports = Blanket;
