/**
 * ListFilter
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function ListFilter(el, props) {
  "use strict";

  this.el = el;
  this.props = props;

  this.props.tables = document.querySelectorAll('ul.filtered-listing-grid');

  this.props.curr = -1;
  this.props.select = this.el.querySelector('select');
  if (this.props.select) {
    this.props.curr = this.props.select.value;
    this.props.select.addEventListener('change', this.handleChange.bind(this));
  }

  this.props.categories = [];
  for (var recs=this.el.querySelectorAll('input.checkbox'), i=recs.length - 1; i >= 0; i--)
    if (recs[i].getAttribute('data-tag') == 'all')
      this.props.allcategories = recs[i];
    else
      this.props.categories.push(recs[i]);

  if (MSIE_version > 8)
    this.setupIsotope();

  this.filterQuerystring();
  this.process();
}

ListFilter.prototype.handleChange = function(e) {
  this.props.curr = e.target.value;
  this.filterCategories();
};

ListFilter.prototype.setupIsotope = function() {
  this.props.isos = [];

  var Isotope = require('isotope-layout');
  for (var i=this.props.tables.length - 1; i >= 0; i--) {
    this.props.isos.push(new Isotope(this.props.tables[i], {
      itemSelector: '.item',
      layoutMode: 'fitRows',
      masonry: {
        columnWidth: '.item-grid'
      },
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      }
    }));
  }
};

ListFilter.prototype.triggerIsotope = function() {
  if (MSIE_version > 8)
    for (var i=this.props.isos.length - 1; i >= 0; i--)
      this.props.isos[i].arrange({
        filter: '.item'
      });
};

// Preselect via query ?filter=data-tag,other-data-tag&category=a
ListFilter.prototype.filterQuerystring = function() {
  var q = window.location.search.split(/\?/), q2 = '', q3 = '';

  if (q.length > 1)
    q = q[1];

  if (q.length > 1)
    q = q.split("&");

  for (var i=q.length - 1; i >= 0; i--) {
    var tmp = q[i].split("=");
    if (tmp[0] == "filter") {
      q2 = tmp[1].split(",");
    }
    if (tmp[0] == "section") {
      q3 = tmp[1];
    }
  }

  for (recs=this.el.querySelectorAll('input.checkbox'), i=recs.length - 1; i >= 0; i--) {
    recs[i].addEventListener('click', this.handleClick.bind(this));

    // Check preselects
    for (var j=q2.length - 1; j >= 0; j--)
      if (q2[j] == recs[i].getAttribute('data-tag'))
        recs[i].click();
  }

  if (q3 !== '') {
    this.props.curr = q3;
    this.filterCategories();
  }
};

ListFilter.prototype.handleClick = function(e) {
  this.process(e.target);
};

ListFilter.prototype.process = function(target) {
  var i;

  if (this.props.allcategories && target && target.getAttribute('data-tag') == 'all' && target.checked) {
    for (i=this.props.categories.length - 1; i >= 0; i--)
      this.props.categories[i].checked = false;

    this.showAllItems();

  } else {
    if (this.props.allcategories)
      this.props.allcategories.checked = false;

    var displayed_categories = [];
    for (i=this.props.categories.length - 1; i >= 0; i--)
      if (this.props.categories[i].checked)
        displayed_categories.push(this.props.categories[i].getAttribute('data-tag'));

    if (displayed_categories.length === 0) {
      if (this.props.allcategories) {
        this.props.allcategories.checked = true;

      } else {
        for (i=this.props.categories.length - 1; i >= 0; i--)
          this.props.categories[i].checked = true;
      }
      this.showAllItems();

    } else {
      for (i=this.props.tables.length - 1; i >= 0; i--) {
        this.filterTags(this.props.tables[i], displayed_categories);
      }
    }
  }

  this.filterCategories();
};

ListFilter.prototype.filterCategories = function() {
  for (var i=this.props.tables.length - 1; i >= 0; i--) {
    var category = this.props.tables[i].parentNode.parentNode;

    var showcategory = false;
    if (this.props.tables[i].countSelector('.item') > 0) {
      // No category selector
      if (!this.props.select)
        showcategory = true;

      // "All categories" selected
      if (this.props.curr == '-1')
        showcategory = true;

      // Category matches
      var recs = category.getAttribute('data-category').split('|');
      for (var j=recs.length - 1; j >= 0; j--) {
        if (recs[j].replace(' ','%20') == this.props.curr.replace(' ','%20'))
          showcategory = true;
      }
    }

    if (showcategory) {
      category.removeClass('hide');
    } else {
      category.addClass('hide');
    }
  }
  this.triggerIsotope();
};

ListFilter.prototype.filterTags = function(table, tags) {
  for (var el=table.querySelectorAll('li'), i=el.length - 1; i >= 0; i--) {
    var showitem = false;
    for (var j=tags.length - 1; j >= 0; j--) {
      if (el[i].hasClass(tags[j]))
        showitem = true;
    }

    if (showitem) {
      el[i].addClass('item');
    } else {
      el[i].removeClass('item');
    }
  }
  this.triggerIsotope();
};

ListFilter.prototype.showAllItems = function() {
  for (var i=this.props.tables.length - 1; i >= 0; i--)
    for (var recs=this.props.tables[i].querySelectorAll('li'), j=recs.length - 1; j >= 0; j--)
      recs[j].addClass('item');
};

module.exports = ListFilter;
