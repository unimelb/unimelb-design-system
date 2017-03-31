/**
 * Flash message.
 * @param {Element} el
 * @param {Object} props
 */
function Flash(el, props) {
  this.el = el;
  this.props = props;

  var main = document.querySelector('[role="main"]');
  var headerless = document.querySelector('.headerless');
  var header = document.querySelector('[role="main"] > header:first-child');

  var baseElem = headerless || header || null;
  main.insertBefore(this.el, baseElem ? baseElem.nextSibling : main.firstChild);
}

Flash.name = 'Flash';
Flash.selector = '.flash';
Flash.firstOnly = true;

module.exports = Flash;
