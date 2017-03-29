/**
 * MobileTableHelper
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function MobileTableHelper(el, props) {
  this.el = el;
  this.props = props;

  this.props.labels = this.el.querySelectorAll('thead th');

  if (!this.el.parentNode.classList.contains('mobile-wrap')) {
    this.el.classList.add('mobile-friendly');
    this.insertLabels();
  }
}

MobileTableHelper.prototype.insertLabels = function() {
  for (var rows=this.el.querySelectorAll('tr:not(.header)'), i=rows.length - 1; i >= 0; i--)
    for (var cells=rows[i].querySelectorAll('td'), j=cells.length - 1; j >= 0; j--)
      if (this.props.labels[j])
        cells[j].setAttribute('data-label', (this.props.labels[j].textContent));
};

module.exports = MobileTableHelper;
