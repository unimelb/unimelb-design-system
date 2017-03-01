/**
 * Local navigation
 * @param  {Element} el
 * @param  {Object} props
 */
function LocalNav(el, props) {
  this.el = el;
  this.props = props;

  this.moveLocalNav();
  this.initNestedLists();
}

LocalNav.prototype.moveLocalNav = function () {
  if (this.el.querySelector('a.sitemap-link')) return;

  // Move local nav outside page container
  var rootmenu, lastmenu, noderoot;

  // Check for deprecated markup
  noderoot = this.el.querySelector('.w');
  if (!noderoot)
    noderoot = this.el;

  for (var recs=noderoot.childNodes, max=recs.length, i=0; i < max; i++) {
    if (recs[i].nodeType == 1 && recs[i].nodeName == 'UL') {
      lastmenu = recs[i];
      if (rootmenu === undefined)
        rootmenu = recs[i];
    }
  }
  var absroot = (this.el.getAttribute('data-absolute-root') || '/');

  // Retrieve nav title and remove from DOM
  var navtitle = noderoot.querySelector('h2');
  navtitle.parentNode.removeChild(navtitle); // Remove from parent if out of order

  // Make nav title a list item instead
  var firstli = document.createElement('li');
  firstli.className = 'home';
  firstli.innerHTML = `<a href="${absroot}">${(navtitle.textContent)}</a>`;
  rootmenu.insertBefore(firstli, rootmenu.firstChild);

  // Create and insert close button
  var closeli = document.createElement('li');
  closeli.innerHTML = '<a href="#" class="localnav__close">Close</a>';
  rootmenu.insertBefore(closeli, firstli);

  // Create inner link to sitemap
  if (lastmenu == rootmenu) {
    lastmenu = document.createElement('ul');
    lastmenu.className = 'meta';
    noderoot.appendChild(lastmenu);
  }

  var lastli = document.createElement('li');
  lastli.innerHTML = '<a class="sitemap-link" href="https://unimelb.edu.au/sitemap">Browse University</a>';
  lastmenu.appendChild(lastli);

  this.props.root.appendChild(this.el);
};

/**
 * Initialise nested lists.
 */
LocalNav.prototype.initNestedLists = function () {
  var nestedLists = this.el.querySelectorAll('.inner');
  var list, link, back;

  for (i = nestedLists.length - 1; i >= 0; i--) {
    list = nestedLists[i];

    link = list.parentNode.querySelector('a');
    link.classList.add('parent');

    back = document.createElement('span');
    back.className = 'back';
    back.innerHTML = link.textContent;
    list.insertBefore(back, list.firstChild);

    link.addEventListener('click', this.toggleNestedList.bind(this, list, true));
    back.addEventListener('click', this.toggleNestedList.bind(this, list, false));
  }
};

/**
 * Open/close a nested navigation list.
 * @param  {Element} list
 * @param  {Boolean} open
 * @param  {Event} evt
 */
LocalNav.prototype.toggleNestedList = function (list, open, evt) {
  evt.preventDefault();
  list.classList.toggle('active', open);
  this.el.scrollTop = 0;
  this.el.classList.toggle('inner-open');
};

module.exports = LocalNav;
