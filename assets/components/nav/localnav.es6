/**
 * Local navigation
 * @param  {Element} el
 * @param  {Object} props
 *         {Element} root - the root element of the page with class `uomcontent`
 *         {Function} closeLocalNav
 *         {Function} openGlobalNav
 */
function LocalNav(el, props) {
  this.el = el;
  this.props = props;

  this.el.classList.remove('no-js'); // HACK class is deprecated and needs to be removed from v5.0- markup
  this.state = { open: [this.el] }; // store nested panels that are currently open (include root)

  // Don't initialise local nav twice
  if (this.el.hasAttribute('data-bound')) return;
  this.el.setAttribute('data-bound', true);

  this.initLocalNav();
  this.initMetaMenu();
  this.initInternalLinks();

  // Loop through all list items (including nested items) to initialise nested panels
  var items = [].slice.call(this.props.rootList.querySelectorAll('li'));
  items.forEach(this.initNestedPanel.bind(this));
}

/**
 * Initialise local nav and move it to the root container of the page.
 */
LocalNav.prototype.initLocalNav = function () {
  // Retrieve root list (create it if it doesn't exist)
  this.props.rootList = this.el.querySelector('ul'); // first `ul`
  if (!this.props.rootList) {
    this.props.rootList = document.createElement('ul');
    this.el.appendChild(this.props.rootList);
  }

  // Add custom classes to root element and list
  this.el.classList.add('localnav', 'localnav__panel');
  this.props.rootList.classList.add('localnav__list');

  // Retrieve nav title and remove it from the DOM
  var title = this.el.querySelector('h2');
  title.parentNode.removeChild(title);

  // Inject item with link to homepage
  var absRootPath = this.el.getAttribute('data-absolute-root') || '/';
  var homeItem = document.createElement('li');
  homeItem.className = 'home';
  homeItem.innerHTML = `<a href="${absRootPath}">${(title.textContent)}</a>`;
  this.props.rootList.insertBefore(homeItem, this.props.rootList.firstChild);

  // Inject close button
  var closeBtn = document.createElement('button');
  closeBtn.className = 'localnav__back-btn button-ui';
  closeBtn.textContent = 'Close';
  closeBtn.setAttribute('type', 'button');
  closeBtn.addEventListener('click', this.props.closeLocalNav);
  // Don't use `this.el.insertBefore()` in case the root list is wrapped in an extra container
  this.props.rootList.parentNode.insertBefore(closeBtn, this.props.rootList);

  // Move local nav to root container
  this.props.root.appendChild(this.el);
};

/**
 * Initialise meta menu.
 */
LocalNav.prototype.initMetaMenu = function () {
  var metaMenu = this.el.querySelector('.meta');

  // Create meta menu if it doesn't already exist
  if (!metaMenu) {
    metaMenu = document.createElement('ul');
    metaMenu.className = 'meta';
    this.el.appendChild(metaMenu);
  }

  // Add custom class to meta menu
  metaMenu.classList.add('localnav__meta');

  // Inject list item with link to sitemap
  var sitemapItem = document.createElement('li');
  sitemapItem.innerHTML = '<a href="https://unimelb.edu.au/sitemap">Browse University</a>';
  metaMenu.appendChild(sitemapItem);

  // Open global nav when newly created sitemap link is clicked
  var sitemapLink = sitemapItem.querySelector('a');
  sitemapLink.addEventListener('click', this.props.openGlobalNav);
};

/**
 * Close local nav when an internal link is clicked.
 */
LocalNav.prototype.initInternalLinks = function () {
  var internalLinks = [].slice.call(this.el.querySelectorAll('a[href^="#"]'));
  internalLinks.forEach(function (link) {
    link.addEventListener('click', this.props.closeLocalNav);
  }, this);
};

/**
 * Initialise a nested panel (`<div class="inner"><ul>...</ul></div>`) inside a list item, if one exists.
 * For convenience, `inner` wrappers can omitted, in which case they are injected automatically.
 * @param {Element} item
 */
LocalNav.prototype.initNestedPanel = function (item) {
  // Look for nested panel and list
  var panel = item.querySelector('.inner');
  var list = item.querySelector('ul');
  if (!list) return; // no nested list found

  // If `inner` container is omitted, inject it (i.e. wrap nested list in panel)
  // Second condition is for when `inner` is omitted at current nesting level, but provided at deeper level
  if (!panel || list.parentElement !== panel) {
    panel = document.createElement('div');
    panel.className = 'inner';
    panel.appendChild(list);
    item.appendChild(panel);
  }

  // Add custom classes to `inner` wrapper and list
  panel.classList.add('localnav__panel', 'localnav__panel--nested');
  list.classList.add('localnav__list');

  // Look for the item's link and use it as the trigger for opening the nested panel
  var trigger = item.querySelector('a');
  trigger.classList.add('localnav__nested-trigger');
  trigger.addEventListener('click', this.openNestedPanel.bind(this, panel, true));

  // Inject button to close nested panel
  var backBtn = document.createElement('button');
  backBtn.className = 'localnav__back-btn button-ui';
  backBtn.textContent = trigger.textContent;
  backBtn.setAttribute('type', 'button');
  backBtn.addEventListener('click', this.closeNestedPanel.bind(this, panel, false));
  panel.insertBefore(backBtn, list);
};

/**
 * Open a nested panel.
 * @param  {Element} panel
 * @param  {Boolean} open
 * @param  {Event} evt
 */
LocalNav.prototype.openNestedPanel = function (panel, open, evt) {
  evt.preventDefault();

  // Retrieve parent panel (i.e. the panel that was last opened)
  var parent = this.state.open[this.state.open.length - 1];

  // Hide parent sidebar (and scroll back to top to work around nested absolute positioning)
  parent.classList.add('localnav__panel--nested-open');
  parent.scrollTop = 0;

  // Open panel and push to state
  panel.classList.add('localnav__panel--open');
  this.state.open.push(panel);
};

/**
 * Close a nested panel.
 * @param  {Element} panel
 * @param  {Boolean} open
 * @param  {Event} evt
 */
LocalNav.prototype.closeNestedPanel = function (panel, open, evt) {
  evt.preventDefault();

  // Close panel and remove from state
  panel.classList.remove('localnav__panel--open');
  this.state.open.pop();

  // Scroll to top to avoid confusion when re-opening the panel
  panel.scrollTop = 0;

  // Show parent sidebar (i.e. vertical overflow)
  var parent = this.state.open[this.state.open.length - 1];
  parent.classList.remove('localnav__panel--nested-open');
};

module.exports = LocalNav;
