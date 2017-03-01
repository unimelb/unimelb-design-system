/**
 * Local navigation
 * @param  {Element} el
 * @param  {Object} props
 *         {Element} root - the root element of the page with class `uomcontent`
 */
function LocalNav(el, props) {
  this.el = el;

  // Don't initialise local nav twice
  if (this.el.hasAttribute('data-bound')) return;
  this.el.setAttribute('data-bound', true);

  this.props = props;
  this.props.rootMenu = this.el.querySelector('h2 + ul');
  this.props.metaMenu = this.el.querySelector('ul.meta');
  this.props.absRootPath = this.el.getAttribute('data-absolute-root') || '/';

  this.moveLocalNav();
  this.initMetaMenu();
  this.initNestedMenus();
}

LocalNav.prototype.moveLocalNav = function () {
  // Retrieve nav title and remove from DOM
  var navtitle = this.el.querySelector('h2');
  navtitle.parentNode.removeChild(navtitle);

  // Make nav title a list item instead
  var firstli = document.createElement('li');
  firstli.className = 'home';
  firstli.innerHTML = `<a href="${this.props.absRootPath}">${(navtitle.textContent)}</a>`;
  this.props.rootMenu.insertBefore(firstli, this.props.rootMenu.firstChild);

  // Create and insert close button
  var closeli = document.createElement('li');
  closeli.innerHTML = '<a href="#" class="localnav__close">Close</a>';
  this.props.rootMenu.insertBefore(closeli, firstli);

  // Move local nav outside page container
  this.props.root.appendChild(this.el);
};

/**
 * Initialise meta menu.
 */
LocalNav.prototype.initMetaMenu = function () {
  var metaMenu = this.props.metaMenu;

  // Create meta menu if it doesn't exist
  if (!metaMenu) {
    metaMenu = this.props.metaMenu = document.createElement('ul');
    metaMenu.className = 'meta';
    this.el.appendChild(metaMenu);
  }

  // Inject link to sitemap if it doesn't exist
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
