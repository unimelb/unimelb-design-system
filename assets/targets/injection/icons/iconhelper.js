/**
 * IconHelper
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function IconHelper(el, props) {
  this.el = el;
  this.props = props;

  /*
   * Check that UOMbind exists and that the icon hasn't been bound already.
   *
   * In v4.0, this IconHelper class was moved to the injection. As a result, in versions prior to 4.0, the helper gets called twice for each icon.
   * This is fine as long as the helper checks the `data-bound` attribute to ensure the same icon doesn't get initialised twice.
   * Unfortunately, this attribute was only added in v3.6 with `UOMbind`; hence the need to check that it exists.
   * Without it, icons would get initialised twice in v3.5.2 and below.
   */
  if (window.UOMbind && !this.el.hasAttribute('data-bound')) {
    if (MSIE_version > 8) {
      this.props.ref = this.el.getAttribute('data-icon');
      if (this.props.ref.substr(0,5) != '#icon-') {
        this.props.ref = '#icon-' + this.props.ref;
      }

      this.saveChildren();

      this.el.innerHTML = '<svg class="icon" role="img"><use xlink:href="' + this.props.ref + '"></use></svg><span class="icon-over"></span>';

      if (this.props.inner.length > 0) {
        this.restoreChildren();
      }

      this.el.querySelector('.icon-over').addEventListener('click', this.passClickThrough.bind(this));

    } else {
      this.saveChildren();
      if (this.props.inner.length > 0) {
        this.restoreChildren();
      }
    }

    this.el.setAttribute('data-bound', true);
  }
}

IconHelper.prototype.saveChildren = function() {
  this.props.inner = [];
  for (var recs=this.el.childNodes, i=recs.length - 1; i >= 0; i--)
    this.props.inner.push(this.el.removeChild(recs[i]));
};

IconHelper.prototype.restoreChildren = function() {
  var label = document.createElement('div');
  label.className = 'icon-label';
  for (var recs=this.props.inner, i=recs.length - 1; i >= 0; i--)
    label.appendChild(recs[i]);

  this.el.appendChild(label);
};

IconHelper.prototype.passClickThrough = function(e) {
  e.preventDefault();
  this.el.parentNode.click();
};

module.exports = IconHelper;
