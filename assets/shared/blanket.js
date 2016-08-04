/**
 * Blanket
 */
function Blanket() {
  this.el = document.querySelector('.modal__blanket');

  // Don't re-initialise blanket if it already exists
  if (!this.el) {
    this.el = document.createElement('div');
    this.el.className = 'modal__blanket';

    var CreateNameSpace = require('./createnamespace');
    new CreateNameSpace();

    // Add the blanket to the DOM
    document.querySelector('.uomcontent').appendChild(this.el);
  }
}

/**
 * Visibility helpers
 */
Blanket.prototype.show = function() {
  this.el.classList.add('on');
};

Blanket.prototype.hide = function() {
  this.el.classList.remove('on');
};

Blanket.prototype.toggle = function(force) {
  this.el.classList.toggle('on', force);
};

module.exports = Blanket;
