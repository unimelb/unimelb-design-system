var constants = require('./constants');

/**
 * Filtered listing section
 * @param  {Element} el
 * @param  {Object} props
 */
function FilteredListingSection(el, props) {
  this.el = el;
  this.props = props || {};

  this.props.name = decodeURIComponent(el.getAttribute('data-section')).toLowerCase();
  this.props.grid = el.querySelector('.filtered-listing-grid');
  this.props.items = this.props.grid.querySelectorAll('.filtered-listing-item');

  if (MSIE_version > 8) {
    var Isotope = require('isotope-layout');
    this.props.isotope = new Isotope(this.props.grid, {
      itemSelector: '.filtered-listing-item',
      filter: '.filtered-listing-item--visible',
      layoutMode: 'fitRows',
      hiddenStyle: { opacity: 0 },
      visibleStyle: { opacity: 1 }
    });
  }
}

/**
 * Update the visibility of the section and the items inside it.
 * @param {String} currSection
 * @param {Array<String>} currTags
 */
FilteredListingSection.prototype.update = function (currSection, currTags) {
  var showSection = currSection === constants.ALL_SECTIONS || currSection === this.props.name;
  var isAnyItemVisible = false;

  // Show or hide each item based on the current section and tags
  for (var i = this.props.items.length - 1; i >= 0; i--) {
    var item = this.props.items[i];

    var showItem = showSection;
    if (showItem) {
      // The section is to be shown; check the tags
      showItem = currTags[0] === constants.ALL_TAGS;
      if (!showItem) {
        // The `all` tag is not selected; check if the item matches any of the filters
        for (var j = currTags.length - 1; j >= 0; j--) {
          if (item.getAttribute('data-tag') === currTags[j]) {
            // The item matches a tag
            showItem = true;
            break;
          }
        }
      }
    }

    // Toggle the visibility of the item
    item.toggleClass('filtered-listing-item--visible', showItem);

    if (showItem) {
      isAnyItemVisible = true;
    }
  }

  // Toggle the visibility of the section
  if (isAnyItemVisible) {
    this.el.removeAttribute('hidden');
  } else {
    this.el.setAttribute('hidden', 'hidden');
  }

  // Re-arrange Isotope layout
  var iso = this.props.isotope;
  if (iso) {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(iso.arrange.bind(iso));
    } else {
      iso.arrange();
    }
  }
};

module.exports = FilteredListingSection;
