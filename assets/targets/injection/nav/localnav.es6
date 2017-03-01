/**
 * Local navigation
 * @param  {Element} el
 * @param  {Object} props
 *         {Element} root - the root element of the page with class `uomcontent`
 */
function LocalNav(el, props) {
  this.el = el;
  this.props = props;
  this.props.rootMenu = this.el.querySelector('ul'); // first `ul`

  // Don't initialise local nav twice
  if (this.el.hasAttribute('data-bound')) return;
  this.el.setAttribute('data-bound', true);

  this.initLocalNav();
  this.initMetaMenu();

  // Loop through all list items (including nested items) looking for nested menus
  var items = [].slice.call(this.props.rootMenu.querySelectorAll('li'));
  items.forEach(this.initNestedMenu.bind(this));
}

/**
 * Initialise local nav and move it to the root container of the page.
 */
LocalNav.prototype.initLocalNav = function () {
  var rootMenu = this.props.rootMenu;
  var absRootPath = this.el.getAttribute('data-absolute-root') || '/';

  // Retrieve nav title and remove it from the DOM
  var title = this.el.querySelector('h2');
  title.parentNode.removeChild(title);

  // Inject item with link to homepage
  var homeItem = document.createElement('li');
  homeItem.className = 'home';
  homeItem.innerHTML = `<a href="${absRootPath}">${(title.textContent)}</a>`;
  rootMenu.insertBefore(homeItem, rootMenu.firstChild);

  // Inject close button
  var closeBtn = document.createElement('button');
  closeBtn.className = 'localnav__close button-ui';
  closeBtn.textContent = 'Close';
  closeBtn.setAttribute('type', 'button');
  this.el.insertBefore(closeBtn, rootMenu);

  // Move local nav to root container
  this.props.root.appendChild(this.el);
};

/**
 * Initialise meta menu.
 */
LocalNav.prototype.initMetaMenu = function () {
  var metaMenu = this.el.querySelector('ul.meta');

  // Create meta menu if it doesn't already exist
  if (!metaMenu) {
    metaMenu = document.createElement('ul');
    metaMenu.className = 'meta';
    this.el.appendChild(metaMenu);
  }

  // Inject list item with link to sitemap if it doesn't already exist
  if (!metaMenu.querySelector('a.sitemap-link')) {
    var sitemapItem = document.createElement('li');
    sitemapItem.innerHTML = '<a class="sitemap-link" href="https://unimelb.edu.au/sitemap">Browse University</a>';
    metaMenu.appendChild(sitemapItem);
  }
};

/**
 * Initialise the first nested menu inside a list item, if one exists.
 * @param {Element} item
 */
LocalNav.prototype.initNestedMenu = function (item) {
  // Look for first `inner` container and nested list
  var nestedMenu = item.querySelector('.inner');
  var nestedList = item.querySelector('ul');
  if (!nestedList) return; // no nested menu found

  // If `inner` container is omitted, inject it
  // Second condition is for when `inner` is omitted at current nesting level, but provided at deeper level
  if (!nestedMenu || nestedList.parentElement !== nestedMenu) {
    // Wrap list with `inner` container
    nestedMenu = document.createElement('div');
    nestedMenu.className = 'inner';
    nestedMenu.appendChild(nestedList);
    item.appendChild(nestedMenu);
  }

  // Look for the item's link and use it as the trigger for opening the nested menu
  var trigger = item.querySelector('a');
  trigger.classList.add('localnav__nested-trigger');
  trigger.addEventListener('click', this.toggleNestedMenu.bind(this, nestedMenu, true));

  // Inject button to close nested menu
  var backBtn = document.createElement('button');
  backBtn.className = 'localnav__close localnav__close--back button-ui';
  backBtn.textContent = trigger.textContent;
  backBtn.setAttribute('type', 'button');
  backBtn.addEventListener('click', this.toggleNestedMenu.bind(this, nestedMenu, false));
  nestedMenu.insertBefore(backBtn, nestedList);
};

/**
 * Open/close a nested navigation menu.
 * @param  {Element} menu
 * @param  {Boolean} open
 * @param  {Event} evt
 */
LocalNav.prototype.toggleNestedMenu = function (menu, open, evt) {
  evt.preventDefault();
  this.el.scrollTop = 0;
  this.el.classList.toggle('inner-open');
  menu.classList.toggle('active', open);
};

module.exports = LocalNav;
