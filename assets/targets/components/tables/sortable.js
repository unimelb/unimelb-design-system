/**
 * SortableTable
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function SortableTable(el, props) {
  this.el = el;
  this.props = props;

  this.setupData();
  this.setupHeadings();
  this.el.setAttribute('data-bound', true);
}

SortableTable.prototype.setupData = function() {
  var tbody = this.el.querySelector('tbody');
  this.props.rows = tbody.querySelectorAll('tr');

  this.struct = [];
  for (var i=0,rows=this.props.rows.length; i < rows; i++) {
    this.struct[i] = [];

    for (var recs=this.props.rows[i].querySelectorAll('td'),cols=recs.length,j=0; j < cols; j++)
      this.struct[i][j] = recs[j];
  }
};

SortableTable.prototype.setupHeadings = function() {
  var thead = this.el.querySelector('thead');
  this.props.cols = thead.querySelectorAll('th');

  // Bind click events
  for (var i=this.props.cols.length - 1; i >= 0; i--)
    this.props.cols[i].addEventListener('click', this.sortByCol.bind(this));

  // Select first column
  this.props.selected = this.props.cols[0].innerText;
};

SortableTable.prototype.sortByCol = function(e) {
  // Update selected
  this.props.selected = e.target.innerText;
};

module.exports = SortableTable;
