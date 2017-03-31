var utils = require('../../utils/index.es6');

/**
 * Sidebar Tabs
 * @param  {Element} el
 * @param  {Object} props
 *         {Element} scrollTarget (optional) - element to which to scroll when switching tabs
 */
function SidebarTabs(el, props) {
  this.el = el;
  this.props = props || {};

  this.props.currentIndex = 0;
  this.props.tabs = el.querySelectorAll('.sidebar-tabs__tab');
  this.props.panels = el.querySelectorAll('.sidebar-tabs__panel');
  this.props.panelsContainer = el.querySelector('.sidebar-tabs__panels');
  this.props.scrollTarget = this.determineScrollTarget();

  var hash = window.location.hash;
  var matchFoundForHash = false;

  // Ensure scroll target can receive focus
  if (!this.props.scrollTarget.hasAttribute('tabindex')) {
    this.props.scrollTarget.setAttribute('tabindex', '-1');
  }

  // Register event handlers on tabs and find initial tab based on location hash, if present
  for (var i = 0, len = this.props.tabs.length; i < len; i++) {
    var tab = this.props.tabs[i];
    tab.addEventListener('click', this.handleTabClicked.bind(this, tab));

    // If the hash matches the tab's href, store it
    if (hash.slice(1) === tab.getAttribute('aria-controls')) {
      matchFoundForHash = true;
      this.props.currentIndex = i;
    }
  }

  // Switch tab when user navigates back/forward
  if (history.pushState) {
    window.addEventListener('popstate', this.handleStatePopped.bind(this));
  }

  // Select initial tab and, if a hash was provided, scroll to it
  this.selectTab(this.props.tabs[this.props.currentIndex], !!hash);

  // If hash matches a tab, scroll to panels container
  if (matchFoundForHash) {
    setTimeout(function () {
      window.scroll(0, 0); // prevent scroll jump due to URL hash
      this.scroll();
    }.bind(this));
  }
}

SidebarTabs.name = 'SidebarTabs';
SidebarTabs.selector = '.sidebar-tabs';

/**
 * Determine to which element to smooth-scroll after selecting a tab.
 * Resolves to, in order:
 * 1. the element refered to in the optional `data-scroll-target` attribute
 * 2. the root of any full-width tabs component on the page
 * 3. the panels container of the sidebar tab component itself
 */
SidebarTabs.prototype.determineScrollTarget = function () {
  // Use `data-scroll-target` attribute if provided
  if (this.el.hasAttribute('data-scroll-target')) {
    return document.querySelector(this.el.getAttribute('data-scroll-target'));
  }

  // Otherwise, look for full-width tabs or default to panels containerr
  return document.querySelector('.tabbed-nav[data-tabbed]') || this.props.panelsContainer;
};

/**
 * A tab has been clicked.
 * @param {Element} tab
 * @param {MouseEvent} evt
 */
SidebarTabs.prototype.handleTabClicked = function (tab, evt) {
  evt.preventDefault();
  var prevIndex = this.props.currentIndex;

  // Select the tab, show its panel, then scroll to the panels container unless data-no-scroll is set
  this.selectTab(tab, true);
  if (!tab.hasAttribute('data-no-scroll'))
    setTimeout(this.scroll.bind(this));

  // If selected tab has changed, update the page's location
  if (prevIndex !== this.props.currentIndex) {
    var hash = '#' + tab.getAttribute('aria-controls');
    if (history.pushState) {
      // Pass current index to help popstate handler
      history.pushState({ index: this.props.currentIndex }, document.title, hash);
    } else {
      window.location.hash = hash;
    }
  }
};

/**
 * User has navigated back or forward.
 * If new hash matches a tab, select it.
 * @param {PopStateEvent} evt
 */
SidebarTabs.prototype.handleStatePopped = function (evt) {
  // Restore selected tab based on index saved in history state
  var index = evt.state ? (evt.state.index || 0) : 0;
  this.selectTab(this.props.tabs[index], true);
};

/**
 * Select a tab.
 * @param {Element} tab
 */
SidebarTabs.prototype.selectTab = function (tab) {
  // Loop through the tabs
  for (var i = 0, len = this.props.tabs.length; i < len; i++) {
    var t = this.props.tabs[i];
    var p = this.props.panels[i];

    // Determine if this is the current tab
    var isCurrent = t === tab;

    // Select/deselect the tab and show/hide its corresponding panel
    if (isCurrent) {
      this.props.currentIndex = i;
      t.setAttribute('aria-selected', 'true');
      p.removeAttribute('hidden');
    } else {
      t.removeAttribute('aria-selected');
      p.setAttribute('hidden', 'hidden');
    }
  }
};

/**
 * Scroll to target element passed in props (or the panels' container by default).
 * When scroll has finished, give focus to the panels' container for accessibility.
 */
SidebarTabs.prototype.scroll = function () {
  utils.smoothScrollTo(this.props.scrollTarget, function () {
    var scrollPosition = window.scrollY || window.pageYOffset; // save scroll position to work around focus jump
    this.props.panelsContainer.focus(); // focus
    window.scroll(0, scrollPosition); // restore scroll position
  }.bind(this));
};

module.exports = SidebarTabs;
