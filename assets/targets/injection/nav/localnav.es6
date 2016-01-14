/**
 * LocalNav
 *
 * @param  {Object} props
 */
function LocalNav(props) {
  this.props = props;
  this.moveLocalNav();
}

LocalNav.prototype.moveLocalNav = function() {
  // Move local nav outside page container
  if (this.props.localnav.countSelector('a.sitemap-link') === 0) {
    var rootmenu, lastmenu, noderoot;

    // Check for deprecated markup
    noderoot = this.props.localnav.querySelector('.w');
    if (!noderoot)
      noderoot = this.props.localnav;

    for (var recs=noderoot.childNodes, max=recs.length, i=0; i < max; i++) {
      if (recs[i].nodeType == 1 && recs[i].nodeName == 'UL') {
        lastmenu = recs[i];
        if (rootmenu === undefined)
          rootmenu = recs[i];
      }
    }
    var absroot = (this.props.localnav.getAttribute('data-absolute-root') || '/');

    var navtitle = noderoot.querySelector('h2');
    var firstli = document.createElement('li');
    firstli.addClass('home');
    firstli.innerHTML = `<a href="${absroot}">${(navtitle.textContent || navtitle.innerText)}</a>`;
    rootmenu.insertBefore(firstli, rootmenu.firstChild);

    navtitle.textContent = 'Close';
    navtitle.innerText = 'Close';

    // Create inner link to sitemap
    if (lastmenu == rootmenu) {
      lastmenu = document.createElement('ul');
      lastmenu.addClass('meta');
      noderoot.appendChild(lastmenu);
    }

    var lastli = document.createElement('li');
    lastli.innerHTML = '<a class="sitemap-link" href="https://unimelb.edu.au/sitemap">Browse University</a>';
    lastmenu.appendChild(lastli);

    this.props.localnav.removeClass('no-js');
    this.props.root.appendChild(this.props.localnav);

    var innerElements = this.props.localnav.querySelectorAll('.inner');
    var innerElem, parent, back, handler;
    
    for (i = innerElements.length - 1; i >= 0; i--) {
      innerElem = innerElements[i];
      handler = toggleActive.bind(this, innerElem);
      
      parent = innerElem.parentNode.querySelector('a');
      parent.addClass('parent');
      parent.addEventListener('click', handler);

      back = document.createElement('span');
      back.addClass('back');
      back.innerHTML = parent.textContent || parent.innerText;
      back.addEventListener('click', handler);
      innerElem.insertBefore(back, innerElem.firstChild);
    }

    function toggleActive(elem, evt) {
      evt.preventDefault();
      elem.toggleClass('active');
      this.props.localnav.scrollTop = 0;
      this.props.localnav.toggleClass('inner-open');
    }
  }
};

module.exports = LocalNav;
