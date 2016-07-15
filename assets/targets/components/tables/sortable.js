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
  this.setupHeadings();
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
    this.props.cols[i].addEventListener('click', this.sortByCol.bind(this));

  // Select first column
  this.props.selected = this.props.cols[0].innerText;
};

SortableTable.prototype.sortByCol = function(e) {
  this.selectHeading(e.target);
  this.store.sort(this.compare.bind(this));
  this.rewriteStore();
};

SortableTable.prototype.compare = function(a, b) {
  atxt = a[this.props.selected].textContent;
  btxt = b[this.props.selected].textContent;

  if (atxt.trim().charAt(0) == '$') {
    // Check for $ symbol, then drop and treat as number compare

    atxt = parseFloat(atxt.trim().substr(1));
    btxt = parseFloat(btxt.trim().substr(1));

  } else if (typeof atxt == 'number') {
    // Explicitly convert to number

    atxt = parseFloat(atxt.trim());
    btxt = parseFloat(btxt.trim());
  }

  if (atxt < btxt)
    return this.props.direction * -1;
  else if (atxt > btxt)
    return this.props.direction * 1;
  else
    return 0;
};

SortableTable.prototype.rewriteStore = function() {
  this.props.tbody.innerHTML = '';

  for (var rows=this.store.length - 1, i=rows; i >= 0; i--) {
    var row = document.createElement('tr');
    for (var cols=this.store[i].length - 1, j=cols; j >= 0; j--)
      row.appendChild(this.store[rows-i][cols-j]);

    this.props.tbody.appendChild(row);
  }
  window.UOMbind('tables');
};

SortableTable.prototype.selectHeading = function(th) {
  var i, ord;

  ord = th.classList.contains('asc') ? 'desc' : 'asc';

  for (i=this.props.cols.length - 1; i >= 0; i--) {
    this.props.cols[i].classList.remove('asc');
    this.props.cols[i].classList.remove('desc');

    if (this.props.cols[i].textContent == th.textContent ||
        this.props.cols[i].innerText == th.innerText)
      this.props.selected = i;
  }

  th.classList.add(ord);
  this.props.direction = ord == 'asc' ? 1 : -1;
};

module.exports = SortableTable;

//     for(var i=0, len=store.length; i<len; i++){
//         tbl.appendChild(store[i][1]);
//     }
