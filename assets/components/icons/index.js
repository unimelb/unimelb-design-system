/**
 * Icon helper
 * @param  {Element} el
 * @param  {Object} props
 */
function IconHelper(el, props) {
  this.el = el;
  this.props = props;

  // Allow providing icon target with or without the `#icon-` prefix
  this.props.ref = this.el.getAttribute('data-icon');
  if (!/^#icon-/.test(this.props.ref)) {
    this.props.ref = '#icon-' + this.props.ref;
  }

  // Inject the icon's SVG markup (without losing the label and any other pre-existing children)
  this.saveChildren();
  this.el.innerHTML = '<svg class="icon" role="img" focusable="false"><use xlink:href="' + this.props.ref + '"></use></svg>';
  this.restoreChildren();
}

IconHelper.name = 'IconHelper';
IconHelper.selector = '[data-icon]';

IconHelper.prototype.saveChildren = function() {
  this.props.children = [];
  for (var recs = this.el.childNodes, i = recs.length - 1; i >= 0; i--)
    this.props.children.push(this.el.removeChild(recs[i]));
};

IconHelper.prototype.restoreChildren = function() {
  // Skip if icon has no label
  if (this.props.children.length === 0) return;

  // Create label wrapper and move all pre-existing children into it
  var label = document.createElement('div');
  label.className = 'icon-label';
  for (var recs = this.props.children, i = recs.length - 1; i >= 0; i--)
    label.appendChild(recs[i]);

  // Append the label to the DOM (after the SVG element)
  this.el.appendChild(label);
};

module.exports = IconHelper;
