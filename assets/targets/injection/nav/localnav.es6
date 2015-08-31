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
    var menus = this.props.localnav.querySelectorAll('ul');
    var rootmenu = menus[0];
    var absroot = (this.props.localnav.getAttribute('data-absolute-root') || '/');

    var navtitle = this.props.localnav.querySelector('h2');
    var firstli = document.createElement('li');
    firstli.addClass('home');
    firstli.innerHTML = `<a href="${absroot}">${(navtitle.textContent || navtitle.innerText)}</a>`;
    rootmenu.insertBefore(firstli, rootmenu.firstChild);

    navtitle.textContent = 'Close';
    navtitle.innerText = 'Close';

    // Create inner link to sitemap
    rootmenu = menus[menus.length - 1];
    var lastli = document.createElement('li');
    lastli.innerHTML = '<a class="sitemap-link" href="https://unimelb.edu.au/sitemap">Browse University</a>';
    rootmenu.appendChild(lastli);

    this.props.localnav.removeClass('no-js');
    this.props.root.appendChild(this.props.localnav);

    var elements = [];
    for (var groups=this.props.localnav.querySelectorAll('.inner'), i=groups.length - 1; i >= 0; i--) {
      elements.push(groups[i]);
    }

    for (i=elements.length - 1; i >= 0; i--) {
      var childgroup = elements[i], parent = childgroup.parentNode.querySelector('a');
      childgroup.addClass('hide');

      var back = document.createElement('span');
      back.addClass('back');
      back.innerHTML = parent.textContent || parent.innerText;
      childgroup.insertBefore(back, childgroup.firstChild);

      back.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.toggleClass('hide');
        this.parentNode.toggleClass('active');
      });

      parent.addClass('parent');
      parent.addEventListener('click', function(e) {
        e.preventDefault();
        var div = this.parentNode.querySelector('div');
        div.toggleClass('hide');
        div.toggleClass('active');
      });
    }
  }
};

module.exports = LocalNav;
