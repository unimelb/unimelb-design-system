/**
 * IconHelper
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function IconHelper(el, props) {
  this.el = el;
  this.props = props;

  this.props.ref = this.el.getAttribute('data-icon');
  if (this.props.ref.substr(0,5) != '#icon-') {
    this.props.ref = '#icon-' + this.props.ref;
  }

  this.saveChildren();

  this.el.innerHTML = '<svg class="icon" role="img"><use xlink:href="' + this.props.ref + '"></use></svg>';

  if (this.props.inner.length > 0) {
    this.restoreChildren();
  }
}

IconHelper.prototype.saveChildren = function() {
  this.props.inner = [];
  for (var recs=this.el.childNodes, i=recs.length - 1; i >= 0; i--)
    this.props.inner.push(this.el.removeChild(recs[i]));
};

IconHelper.prototype.restoreChildren = function() {
  var label = document.createElement('div');
  label.addClass('icon-label');
  for (var recs=this.props.inner, i=recs.length - 1; i >= 0; i--)
    label.appendChild(recs[i]);

  this.el.appendChild(label);
};

module.exports = IconHelper;
