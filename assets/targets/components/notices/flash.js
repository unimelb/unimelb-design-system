/**
 * Flash message.
 * @param {Element} el
 * @param {Object} props
 *        {Element} props.root - the root element of the page (with role="main")
 *        {Element} props.headerless (optional) - the headerless element, if it exists
 *        {Element} props.header (optional) - the header element, if it exists
 */
function Flash(el, props) {
  this.el = el;
  this.props = props;

  var baseElem = this.props.headerless || this.props.header || null;
  this.props.root.insertBefore(this.el, baseElem ? baseElem.nextSibling : this.props.root.firstChild);
}

module.exports = Flash;
