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
    var rootmenu = this.props.localnav.querySelector('ul');
    var absroot = (this.props.localnav.getAttribute('data-absolute-root') || '/');

    var navtitle = this.props.localnav.querySelector('h2');
    var firstli = document.createElement('li');
    firstli.addClass('home');
    firstli.innerHTML = `<a href="${absroot}">${(navtitle.textContent || navtitle.innerText)}</a>`;
    rootmenu.insertBefore(firstli, rootmenu.firstChild);
    navtitle.textContent = 'Close';
    navtitle.innerText = 'Close';

    // Create inner link to sitemap
    var lastli = document.createElement('li');
    lastli.innerHTML = '<a class="sitemap-link" href="https://unimelb.edu.au/sitemap">Browse University</a>';
    rootmenu.appendChild(lastli);

    this.props.localnav.removeClass('no-js');
    this.props.root.appendChild(this.props.localnav);

    for (var groups=this.props.localnav.querySelectorAll('a'), i=groups.length - 1; i >= 0; i--) {
      var elements = [];
      for (var nodes=groups[i].parentNode.childNodes, j=nodes.length - 1; j >= 0; j--) {
        if (nodes[j].nodeType==1 && !nodes[j].hasClass('sitemap-link') && nodes[j].nodeName != 'H2') {
          elements.push(nodes[j]);
        }
      }

      if (elements.length > 1) {
        var childgroup = elements[1];

        var back = document.createElement('span');
        back.addClass('back');
        back.innerHTML = groups[i].firstChild.data;
        childgroup.insertBefore(back, childgroup.firstChild);

        childgroup.firstChild.addEventListener('click', function(e) {
          e.preventDefault();
          this.parentNode.toggleClass('hide');
          this.parentNode.toggleClass('active');
        });

        groups[i].addClass('parent');
        childgroup.addClass('hide');
        groups[i].addEventListener('click', function(e) {
          e.preventDefault();
          var div = this.parentNode.querySelector('div');
          div.toggleClass('hide');
          div.toggleClass('active');
        });
      }
    }
  }
};

module.exports = LocalNav;
