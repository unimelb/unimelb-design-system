/**
 * SortableTable
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function SortableTable(el, props) {
  this.el = el;
  this.props = props;
  this.props.tbody = this.el.querySelector('tbody');

  this.setupData();
  this.props.selected = 0;
  this.props.sortAs = '';
  this.setupHeadings();

  // Default, sort by first column
  this.sortByCol(this.props.cols[this.props.selected]);

  this.el.setAttribute('data-bound', true);
}

SortableTable.prototype.setupData = function() {
  var rows = this.props.tbody.querySelectorAll('tr');

  this.store = [];
  for (var i=0, max=rows.length; i < max; i++) {
    this.store[i] = [];

    for (var recs=rows[i].querySelectorAll('td'), cols=recs.length, j=0; j < cols; j++)
      this.store[i][j] = recs[j];
  }
};

SortableTable.prototype.setupHeadings = function() {
  var thead = this.el.querySelector('thead');
  this.props.cols = thead.querySelectorAll('th');

  // Bind click events
  for (var i=this.props.cols.length - 1; i >= 0; i--)
    this.props.cols[i].addEventListener('click', this.handleColClick.bind(this));
};

SortableTable.prototype.handleColClick = function(e) {
  this.sortByCol(e.target);
};

SortableTable.prototype.sortByCol = function(th) {
  this.selectHeading(th);

  if (th.hasAttribute('data-sort-as'))
    this.props.sortAs = th.getAttribute('data-sort-as');

  this.store.sort(this.compare.bind(this));

  this.props.sortAs = ''; // Clear override

  this.rewriteStore();
};

SortableTable.prototype.compare = function(a, b) {
  // Get text value of selected column, trim white space
  atxt = a[this.props.selected].textContent.trim();
  btxt = b[this.props.selected].textContent.trim();

  // Check for override
  if (this.props.sortAs != 'text') {

    // Check for currency symbol, then drop and treat as number compare
    if (['$', '¥', '£', '€'].some(function(el){return el === atxt.charAt(0);})) {
      atxt = parseFloat(atxt.substr(1));
      btxt = parseFloat(btxt.substr(1));
    } else if (['$', '¥', '£', '€'].some(function(el){return el === atxt.charAt(atxt.length-1);})) {
      atxt = parseFloat(atxt.substr(0, atxt.length-1));
      btxt = parseFloat(btxt.substr(0, btxt.length-1));
    }

    // If probably a number, explicitly convert to number before sort
    if (atxt % 1 === 0 || parseFloat(atxt) === atxt) {
      atxt = parseFloat(atxt);
      btxt = parseFloat(btxt);
    }
  }

  if (atxt < btxt)
    return this.props.direction * -1;
  else if (atxt > btxt)
    return this.props.direction * 1;
  else
    return 0;
};

SortableTable.prototype.selectHeading = function(th) {
  var i, ord;

  ord = th.classList.contains('asc') ? 'desc' : 'asc';

  for (i=this.props.cols.length - 1; i >= 0; i--) {
    this.props.cols[i].classList.remove('asc');
    this.props.cols[i].classList.remove('desc');

    if (this.props.cols[i].textContent == th.textContent)
      this.props.selected = i;
  }

  th.classList.add(ord);
  this.props.direction = ord == 'asc' ? 1 : -1;
};

SortableTable.prototype.rewriteStore = function() {
  // Clear table data
  this.props.tbody.innerHTML = '';

  for (var rows=this.store.length - 1, i=rows; i >= 0; i--) {
    var row = document.createElement('tr');
    for (var cols=this.store[i].length - 1, j=cols; j >= 0; j--)
      row.appendChild(this.store[rows-i][cols-j]);

    this.props.tbody.appendChild(row);
  }

  // Rebind mobile labels
  window.UOMbind('tables');
};

module.exports = SortableTable;
