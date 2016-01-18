var constants = require('./constants');
var FilteredListingSection = require('./section');

/**
 * FilteredListing
 * @param  {Element} el
 * @param  {Object} props
 */
function FilteredListing(el, props) {
  var i, recs, tc;
  
  this.el = el;
  this.props = props || {};
  
  // Parse querystring
  this.state = this.parseQuery();
  
  // Initialise sections
  this.props.sections = [];
  recs = document.querySelectorAll('.filtered-listing-section');
  for (i = recs.length - 1; i >= 0; i--) {
    this.props.sections.push(new FilteredListingSection(recs[i]));
  }
  
  // Initialise section drop-down menu (restore state from querystring if available; else retrieve current state of drop-down menu)
  this.props.sectionSelect = this.el.querySelector('select');
  if (this.props.sectionSelect) {
    if (this.state.section) {
      // Section given in querystring; use it as the value of the drop-down menu
      if (this.props.sectionSelect.querySelector('option[value="' + this.state.section + '"]')) {
        this.props.sectionSelect.value = this.props.sectionSelect.querySelector('option[value="' + this.state.section + '"]');
      } else {
        // No such option in drop-down; default to `all`
        this.state.section = this.props.sectionSelect.value = constants.ALL_SECTIONS;
      }
    } else {
      // Section not given in querystring; retrieve the current state of the drop-down menu
      this.state.section = this.props.sectionSelect.value;
    }
  }
  
  // Initialise tag checkboxes (restore state from querystring if available; else retrieve current state of checkboxes)
  this.props.tagCheckboxes = this.el.querySelectorAll('.checkbox');
  if (this.state.tags) {
    // Tags given in querystring; check/uncheck the checkboxes accordingly
    for (i = this.props.tagCheckboxes.length - 1; i >= 0; i--) {
      tc = this.props.tagCheckboxes[i];
      tc.checked = this.state.tags.indexOf(tc.getAttribute('data-tag').toLowerCase()) !== -1;
    }
  } else {
    // Tags not given in querystring; retrieve the current state of the checkboxes
    this.state.tags = this.retrieveTagsState();
  }
  
  // Listen for change events
  this.el.addEventListener('change', this.handleChange.bind(this));
  
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
 * Retrieve the current tags based on the state of the tag checkboxes.
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
  
  return tags;
};

/**
 * Handle change of section or tags.
 * @param  {Event} e
 */
FilteredListing.prototype.handleChange = function (e) {
  // Section drop-down menu
  if (e.target === this.props.sectionSelect) {
    this.state.section = e.target.value;
    this.update();
    return;
  }
  
  // Tag checkbox
  if (e.target.hasClass('checkbox')) {
    // If checking `all` checkbox, update state and uncheck all other checkboxes
    if (e.target === this.props.tagCheckboxes[0] && e.target.checked) {
      this.state.tags = [constants.ALL_TAGS];
      for (var i = this.props.tagCheckboxes.length - 1; i > 0; i--) { // i > 0 to skip the `all` checkbox
        this.props.tagCheckboxes[i].checked = false;
      }
    } else {
      // Otherwise, uncheck the `all` checkbox
      this.props.tagCheckboxes[0].checked = false;
      
      // Retrieve new tags state
      this.state.tags = this.retrieveTagsState();
      
      // If no tag is selected, re-check the `all` checkbox`
      if (this.state.tags.length === 0) {
        this.props.tagCheckboxes[0].checked = true;
        this.state.tags.push(constants.ALL_TAGS);
      }
    }
    
    this.update();
    return;
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
