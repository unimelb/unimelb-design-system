var constants = require('./constants');
var FilteredListingSection = require('./section');

/**
 * FilteredListing
 * @param  {Element} el
 * @param  {Object} props
 */
function FilteredListing(el, props) {
  var i, recs;
  
  this.el = el;
  this.props = props || {};
  this.props.sectionSelect = el.querySelector('select');
  this.props.tagCheckboxes = el.querySelectorAll('.checkbox');
  
  // Initialise sections
  this.props.sections = [];
  recs = document.querySelectorAll('.filtered-listing-section');
  for (i = recs.length - 1; i >= 0; i--) {
    this.props.sections.push(new FilteredListingSection(recs[i]));
  }
  
  // Parse querystring and use result (i.e. `section` and `tags`) as the initial state of the filters
  this.state = this.parseQuery();
  
  // Initialise form elements:
  // - If initial state is provided, update the elements accordingly.
  // - If initial state is missing, invalid or incomplete, retrieve it from the relevant elements.
  this.initSectionSelect();
  this.initTagCheckboxes();

  // Listen for events
  this.props.sectionSelect.addEventListener('change', this.handleSectionSelectChanged.bind(this));
  el.addEventListener('click', this.handleTagCheckboxesClicked.bind(this));
  
  // Update once
  this.update();
}

/**
 * Parse the querystring looking for the 'filter' and 'section' parameters:
 * `?filter=category-a,category-b&section=all`
 * @return {Object}
 *         {Array<String>} filter
 *         {String} section
 */
FilteredListing.prototype.parseQuery = function () {
  var params = {};
  
  if (window.location.search.length === 0) {
    return params;
  }
  
  var i, query = window.location.search.substr(1).split('&');
  for (i = query.length - 1; i >= 0; i--) {
    var param = query[i].split("=");
    var val = decodeURIComponent(param[1]).toLowerCase();
    switch (param[0]) {
      case 'section':
        params.section = val;
        break;
      case 'filter':
        params.tags = val.split(',');
        break;
    }
  }
  
  return params;
};

/**
 * Initialise section drop-down menu.
 */
FilteredListing.prototype.initSectionSelect = function () {
  if (this.props.sectionSelect) {
    // Check whether a section was specified in the querystring
    if (this.state.section) {
      // Section specified; check if valid option
      if (this.props.sectionSelect.querySelector('option[value="' + this.state.section + '"]')) {
        // Valid option; update value of drop-down menu
        this.props.sectionSelect.value = this.state.section;
      } else {
        // Invalid option; set state to `all sections` and update drop-down menu
        this.state.section = this.props.sectionSelect.value = constants.ALL_SECTIONS;
      }
    } else {
      // Section not specified; retrieve current value of drop-down menu
      this.state.section = this.props.sectionSelect.value.toLowerCase();
    }
  }
};

/**
 * Initialise tag checkboxes.
 */
FilteredListing.prototype.initTagCheckboxes = function () {
  var i, j, tc, tag;
  
  if (this.state.tags) {
    // Tags specified in querystring; check/uncheck the checkboxes accordingly
    for (i = this.props.tagCheckboxes.length - 1; i >= 0; i--) {
      tc = this.props.tagCheckboxes[i];
      tc.checked = false;
      tag = tc.getAttribute('data-tag').toLowerCase();
      
      for (j = this.state.tags.length - 1; j >= 0; j--) {
        if (this.state.tags[j] === tag) {
          tc.checked = true;
          break;
        }
      }
    }
  }
  
  // Retrieve the current state of the checkboxes
  // This deals with cases where no tags are specified in the querystring, or some of the specified tags are invalid (if all are invalid, the `all tags` checkbox has to be checked)
  this.state.tags = this.retrieveTagsState();
};

/**
 * Retrieve the current tags based on the state of the checkboxes.
 * If no tag turns out to be selected, check the `all tags` checkbox.
 * @return {Array<String>}
 */
FilteredListing.prototype.retrieveTagsState = function () {
  var i, tc, tags = [];
  
  for (i = this.props.tagCheckboxes.length - 1; i >= 0; i--) {
    tc = this.props.tagCheckboxes[i];
    if (tc.checked) {
      tags.push(tc.getAttribute('data-tag').toLowerCase());
    }
  }
  
  // If no tag is selected, re-check the `all tags` checkbox
  if (tags.length === 0) {
    this.props.tagCheckboxes[0].checked = true;
    tags.push(constants.ALL_TAGS);
  }
  
  return tags;
};

/**
 * Handle `change` event on section drop-down menu.
 * @param  {Event} e
 */
FilteredListing.prototype.handleSectionSelectChanged = function (e) {
  this.state.section = e.target.value.toLowerCase();
  this.update();
};

/**
 * Handle `click` event on tag checkboxes via event delegation.
 * @param  {Event} e
 */
FilteredListing.prototype.handleTagCheckboxesClicked = function (e) {
  if (e.target.hasClass('checkbox')) {
    // If checking the `all tags` checkbox, update state and uncheck all other checkboxes
    if (e.target === this.props.tagCheckboxes[0] && e.target.checked) {
      this.state.tags = [constants.ALL_TAGS];
      for (var i = this.props.tagCheckboxes.length - 1; i > 0; i--) { // i > 0 to skip the `all tags` checkbox
        this.props.tagCheckboxes[i].checked = false;
      }
    } else {
      // Otherwise, uncheck the `all tags` checkbox
      this.props.tagCheckboxes[0].checked = false;

      // Retrieve new tags state
      this.state.tags = this.retrieveTagsState();
    }

    this.update();
  }
};

/**
 * Update the sections based on the current state.
 */
FilteredListing.prototype.update = function () {
  for (var i = this.props.sections.length - 1; i >= 0; i--) {
    var s = this.props.sections[i];
    s.update(this.state.section, this.state.tags);
  }
};

module.exports = FilteredListing;
