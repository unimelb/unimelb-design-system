/**
 * Local navigation
 * @param  {Element} el
 * @param  {Object} props
 *         {Element} root - the root element of the page with class `uomcontent`
 */
function LocalNav(el, props) {
  this.el = el;
  this.props = props;

  // Don't initialise local nav twice
  if (this.el.hasAttribute('data-bound')) return;
  this.el.setAttribute('data-bound', true);

  this.initLocalNav();
  this.initMetaMenu();
  this.initNestedMenus();
}

/**
 * Initialise local nav and move it to the root container of the page.
 */
LocalNav.prototype.initLocalNav = function () {
  var rootMenu = this.el.querySelector('ul'); // first `ul`
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
  closeBtn.setAttribute('type', 'button');
  closeBtn.className = 'localnav__close button-ui';
  closeBtn.textContent = 'Close';
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
 * Initialise nested menus.
 */
LocalNav.prototype.initNestedMenus = function () {
  var nestedMenus = this.el.querySelectorAll('.inner');
  var menu, trigger, back;

  for (i = nestedMenus.length - 1; i >= 0; i--) {
    menu = nestedMenus[i];

    trigger = menu.parentNode.querySelector('a');
    trigger.classList.add('parent');

    back = document.createElement('span');
    back.className = 'back';
    back.innerHTML = trigger.textContent;
    menu.insertBefore(back, menu.firstChild);

    trigger.addEventListener('click', this.toggleNestedMenu.bind(this, menu, true));
    back.addEventListener('click', this.toggleNestedMenu.bind(this, menu, false));
  }
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
