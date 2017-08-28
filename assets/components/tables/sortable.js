/**
 * SortableTable
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function SortableTable(el, props) {
  this.el = el;
  this.props = props || {};
  this.props.tbody = this.el.querySelector('tbody');
  this.tableInfo = [];
  this.tableFragment = document.createDocumentFragment();
  this.colCount = this.props.tbody.rows[0].cells.length;

  this.setupData();
  this.props.selected = 0;
  this.props.sortAs = '';
  this.setupHeadings();
  this.initSearchFields(el);
  this.cacheTable();
  this.populateSearchOptions();
}

SortableTable.label = 'SortableTable';
SortableTable.selector = 'table[data-sortable]';
SortableTable.defaultOption = "__all";

SortableTable.prototype.setupData = function() {
  var rows = this.props.tbody.querySelectorAll('tr');

  this.store = [];
  for (var i=0, max=rows.length; i < max; i++) {
    this.store[i] = [];

    for (var recs=rows[i].querySelectorAll('td'), cols=recs.length, j=0; j < cols; j++)
      this.store[i][j] = recs[j];
  }
};

SortableTable.prototype.selectWithKeyboard = function(e) {
  // Use window.event if available
  if (typeof e === 'undefined' && window.event) {
    e = window.event;
  }

  // Trigger click on ENTER (13)
  if (e.keyCode == 13) {
    document.activeElement.click();
  }
};

SortableTable.prototype.setupHeadings = function() {
  var thead = this.el.querySelector('thead');
  this.props.cols = thead.querySelectorAll('th');

  // Bind click events
  for (var i=this.props.cols.length - 1; i >= 0; i--) {
    if (!this.props.cols[i].hasAttribute('data-sort-skip')) {
      if (!this.props.cols[i].hasAttribute('tabindex'))
        this.props.cols[i].setAttribute('tabindex', 0);

      var place = document.createElement('span');
      place.classList.add('sortable');
      this.props.cols[i].appendChild(place);

      window.addEventListener('keydown', this.selectWithKeyboard);

      this.props.cols[i].addEventListener('click', this.handleColClick.bind(this));
      if (this.props.cols[i].hasAttribute('data-sort-initial'))
        this.sortByCol(this.props.cols[i]);
    }
  }
};

SortableTable.prototype.initSearchField = function(el) {
  var type = el.dataset.sortableSearchType;
  var searchNode = document.createElement('span');
  switch (type) {
    case "text":
      var field = '<input type="search" name="' + el.innerText + '" placeholder="Search by ' + el.innerText + '"/>';
      searchNode.innerHTML = field;
      var searchel = searchNode.querySelector('input');
      searchel.addEventListener('keyup', this.handleSearch.bind(this));
      break;
    case "select":
      var field = '<select name="' + el.innerText + '"><option value="' + SortableTable.defaultOption + '">Please select</option></select>';
      searchNode.innerHTML = field;
      var searchel = searchNode.querySelector('select');
      searchel.addEventListener('change', this.handleSearch.bind(this));
      break;
  }
  return searchNode;
}

SortableTable.prototype.initSearchFields = function(el) {
  var searchableCols = el.querySelectorAll('[data-sortable-search-type]');
  var row = document.createElement('tr');
  searchableCols.forEach(function(th) {
    var cellRef = row.insertCell(-1);
    cellRef.insertAdjacentElement('beforeend', this.initSearchField(th));
  }, this);
  this.insertAfter(el.querySelectorAll('tr')[0], row);
}

SortableTable.prototype.cacheTable = function() {
  var element  = this.props.tbody;
  this.tableFragment = this.tableFragment.appendChild(element.cloneNode(true));
}

SortableTable.prototype.populateSearchOptions = function() {
  this.el.querySelectorAll('[data-sortable-search-type]').forEach(function(el, index) {
    var options = new Set();

    if (el.dataset.sortableSearchType === 'select') {
      this.store.forEach(function(row){
        options.add(row[index].innerText);
      });
    }

    options.forEach(function(option){
      var optionField = document.createElement('option');
      optionField.value = option;
      optionField.innerHTML = option;
      this.el.querySelector('select[name="' + el.innerText + '"]').appendChild(optionField);
    }, this);
  }, this)
}

SortableTable.prototype.handleSearch = function(e) {
  var table = this.tableFragment.cloneNode(true); // create a copy of the cached table Node

  inputs = this.el.querySelectorAll('input, select');

  // build an array of input field data
  this.criteria = Array.prototype.map.call( inputs, function(input){
    return input.value.toLocaleLowerCase();
  });

  // check rows for select / input data
  var rows = table.querySelectorAll("tr");
  rows.forEach(function(row){
    var cells = row.querySelectorAll("td");
    var results = []; // build up an array of true / false if the cell matches the filter
    cells.forEach(function(cell, index){
      // naive comparison of cell data to input
      if (cell.innerText.toLocaleLowerCase().indexOf(this.criteria[index]) >= 0 || this.criteria[index] == SortableTable.defaultOption) {
        results.push(true);
      } else {
        results.push(false);
      }
    }, this);

    // remove the row if it doesn't match every filter
    if (!results.every(this.isTrue)) {
      row.remove();
    }
  }, this);

  // replace the table in the DOM with a new table
  this.props.tbody.innerHTML = table.innerHTML;

  if(this.props.tbody.innerText.length === 0) {
    this.addNoResultsRow();
  }

  // rebuild this.store
  this.setupData();
}

SortableTable.prototype.addNoResultsRow = function() {
  var noResultsRow = document.createElement('tr');
  noResultsRow.innerHTML = '<td colspan="' + this.colCount + '">No Results</td>';
  this.props.tbody.append(noResultsRow);
}

SortableTable.prototype.handleColClick = function(e) {
  var col = e.target;

  // Check for indicator span
  if (col.classList.contains('sortable'))
    col = col.parentNode;

  this.sortByCol(col);
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

  if (this.props.sortAs == 'text') {
    // Specific sort by text
    if (atxt < btxt)
      return this.props.direction * -1;
    else if (atxt > btxt)
      return this.props.direction * 1;
    else
      return 0;

  } else {
    // Natural sort
    if (this.props.direction > 0) {
      return atxt.localeCompare(btxt, undefined, {numeric: true, sensitivity: 'base'});
    } else {
      return btxt.localeCompare(atxt, undefined, {numeric: true, sensitivity: 'base'});
    }
  }
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
  var rows;

  // Clean up old rows
  for (rows=this.props.tbody.querySelectorAll('tr'), i=rows.length - 1; i >= 0; i--)
    this.props.tbody.removeChild(rows[i]);

  for (rows=this.store.length - 1, i=rows; i >= 0; i--) {
    var row = document.createElement('tr');
    for (var cols=this.store[i].length - 1, j=cols; j >= 0; j--)
      row.appendChild(this.store[rows-i][cols-j]);

    this.props.tbody.appendChild(row);
  }

  // Rebind mobile labels
  window.uom.initComponent('MobileTableHelper');
};

SortableTable.prototype.insertAfter = function(el, content){
  el.parentNode.insertBefore(content, el.nextSibling);
}

SortableTable.prototype.isTrue = function(el, index, array){
  return el === true;
}

module.exports = SortableTable;
