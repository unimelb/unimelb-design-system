/**
 * InjectHeader
 *
 * @param  {Object} props
 */
function InjectHeader(props) {
  this.props = props;

  var CreateNameSpace = require('../../../shared/createnamespace');
  new CreateNameSpace();

  this.props.parent = document.querySelector('.uomcontent');
  this.props.page = document.querySelector('.page-inner');

  // Only add if the header is not already present
  if (document.countSelector('.page-header-tools') === 0) {
    this.renderPageHeader();
    this.renderBreadcrumb();
    this.renderHeaderTools();
    this.reorderStructure();
  } else {
    this.props.header = document.querySelector('.page-header');
  }

  // Exclude IE8, can't polyfill window scroll event
  if (!/(MSIE 8.0)/g.test(navigator.userAgent)) {
    window.addEventListener("scroll", this.handleScroll.bind(this));
    this.handleScroll(); // Check once on page load
  }
}

InjectHeader.prototype.renderPageHeader = function() {
  // Create header if it doesn't already exist
  this.props.header = document.querySelector('.page-header');
  if (!this.props.header) {
    // Create header and move local breadcrumb
    this.props.header = document.createElement('div');
    this.props.header.className = 'page-header';

    if (document.countSelector('.page-inner > .floating') == 1) {
      // Landing page header
      this.props.header.innerHTML = `
<a class="page-header-logo" href="${this.props.defaultlink}">
  <svg width="100" height="100" viewBox="0 0 140 140" aria-labelledby="aria-uom-title" role="img">
    <title id="aria-uom-title">The University of Melbourne Logo</title>
    <image xlink:href="${this.props.assethost}/logo.svg" src="${this.props.assethost}/logo.png" alt="The University of Melbourne Logo" width="140" height="140" preserveAspectRatio="xMaxYMin meet"/>
  </svg>
</a>
`;

      // Copy over the `floating`, `reverse` and `short` classes
      this.props.header.classList.add('floating');

      var floating = document.querySelector('.page-inner > .floating');
      if (floating.classList.contains('reverse')) {
        this.props.header.classList.add('reverse');
      }

      if (floating.classList.contains('short')) {
        this.props.header.classList.add('short');
      }

      // Copy over inline background-image, if provided
      var bgImg = floating.style.backgroundImage;
      if (bgImg) {
        this.props.header.style.backgroundImage = bgImg;
      }

      // Add any customisations
      for (var nodes=document.querySelector('.floating').childNodes, i=nodes.length - 1; i >= 0; i--) {
        this.props.header.appendChild(nodes[i]);
      }

    } else {

      this.props.rootlink = '';
      if (document.countSelector('.page-local-history .root') === 0) {
        this.props.rootlink = `
<a href="https://unimelb.edu.au/" title="The University of Melbourne"><span data-icon="home"></span>The University of Melbourne</a>
`;
      }

      // General header
      this.props.header.innerHTML = `
<header>
  <a class="page-header-logo" href="${this.props.defaultlink}">
    <svg width="100" height="100" viewBox="0 0 140 140" aria-labelledby="aria-uom-title" role="img">
      <title id="aria-uom-title">The University of Melbourne Logo</title>
      <image xlink:href="${this.props.assethost}/logo.svg" src="${this.props.assethost}/logo.png" alt="The University of Melbourne Logo" width="140" height="140" preserveAspectRatio="xMaxYMin meet"/>
    </svg>
  </a>
  <div class="page-header-navigation">
    ${this.props.rootlink}
  </div>
</header>
`;
    }

  } else {
    this.props.page.removeChild(this.props.header);
  }

  this.props.parent.insertBefore(this.props.header, this.props.page);
};

InjectHeader.prototype.renderBreadcrumb = function() {
  this.props.local = document.querySelector('.page-local-history');
  if (this.props.local) {
    this.props.navparent = document.querySelector('.page-header-navigation');
    this.props.local.parentNode.removeChild(this.props.local);

    if (this.props.navparent) {
      this.props.navparent.appendChild(this.props.local);

      // Mobile nav
      var mobile = document.createElement('div');
      mobile.className = 'mobile-nav';
      mobile.setAttribute('role', 'navigation');

      var select = document.createElement('select');
      select.className = 'alt';
      select.setAttribute('role', 'tablist');
      select.setAttribute('aria-label', 'Breadcrumb list');
      select.addEventListener('change', function(e) {
        if (this.value)
          if (this.value.substr(0, 1) != '#')
            window.location = this.value;
      });

      var max = this.props.local.countSelector('a') - 1;

      // Backwards compat
      var selector = 'span[itemprop="name"]';
      if (this.props.local.countSelector(selector) === 0)
        selector = 'a';

      for (var nodes=this.props.local.querySelectorAll(selector), i=nodes.length - 1; i >= 0; i--) {

        var opt = document.createElement('option'),
            link = nodes[i].parentNode;

        // Backwards compat
        if (selector === 'a')
          link = nodes[i];

        opt.setAttribute('role', 'tab');
        opt.setAttribute('value', link.getAttribute('href'));
        opt.appendChild(document.createTextNode(nodes[i].firstChild.nodeValue));

        if (i === max)
          opt.setAttribute('selected', 'selected');

        select.appendChild(opt);

        // Inject icon for first (root) item
        if (i === 0) {
          var homeIcon = document.createElement('span');
          homeIcon.setAttribute('data-icon', 'home');
          nodes[i].insertBefore(homeIcon, nodes[i].firstChild);
        }
      }

      mobile.appendChild(select);
      var pagenav = this.props.local.parentNode;
      pagenav.insertBefore(mobile, pagenav.firstChild);

      if (!/(MSIE 9)/g.test(navigator.userAgent)) {
        var FancySelect = require("../../components/forms/fancyselect");
        new FancySelect(select, {});
      }
    }
  }
};

/**
 * Render page header tools (search, login and menu links)
 */
InjectHeader.prototype.renderHeaderTools = function () {
  let tools = document.querySelector('.page-header-tools');
  if (tools) return;

  tools = document.createElement('div');
  tools.className = 'page-header-tools';

  // Prepare tools links
  let links = [
    '<a class="page-header-icon" href="#sitemap" title="Search"><svg role="img" focusable="false"><use xlink:href="#icon-search" /></svg> Search</a>',
    '<a class="page-header-icon" href="#sitemap" title="Menu"><svg role="img" focusable="false"><use xlink:href="#icon-menu" /></svg> Menu</a>'
  ];

  // Look for local login setup
  const loginContent = document.querySelector('.page-local-login');
  if (loginContent && loginContent.hasAttribute('data-href')) {
    // Parse custom login link text or default to "Login"
    const customText = loginContent.getAttribute('data-title');
    const text = customText && customText.length < 8 ? customText : 'Login';

    // Add custom class to tools
    tools.classList.add('with-login');

    // Insert login link in between search and menu links
    const href = loginContent.getAttribute('data-href');
    links.splice(1, 0, `<a class="page-header-icon page-header-icon--login" href="${href}" title="${text}"><svg role="img" focusable="false"><use xlink:href="#icon-profile" /></svg> ${text}</a>`);
  }

  // Add links to tools
  tools.innerHTML = links.join('');

  // Add tools to page header
  const parent = this.props.header.querySelector('header') || this.props.header;
  parent.appendChild(tools);

  // Render the search box
  this.renderSearchBox();
};

InjectHeader.prototype.renderSearchBox = function() {
  var search = document.createElement('div');
  search.className = 'page-header-search';
  search.innerHTML = `
<form class="search" action="https://search.unimelb.edu.au" method="get">
  <fieldset>
    <div class="inline attached">
      <span class="fill">
        <input aria-label="Search" aria-required="true" autocomplete="off" data-error="Please enter a keyword" name="q" id="header_q" placeholder="Search the University" type="search" />
      </span>
      <span>
        <button class="inline-button" type="submit">
          <span class="small icon--hide-label" data-icon="search">Go</span>
        </button>
      </span>
    </div>
  </fieldset>
  <a class="page-header-icon" href="#"><svg class="icon" role="img"><use xlink:href="#icon-close" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg> Close</a>
</form>
`;
  var navparent = this.props.header.querySelector('header');
  if (!navparent) {
    navparent = this.props.header;
  }
  navparent.appendChild(search);
};

InjectHeader.prototype.reorderStructure = function() {
  this.props.header.setAttribute('role', 'banner');

  this.props.main = document.querySelector('[role="main"]');
  if (!this.props.main) {
    this.props.main = document.createElement('div');
    this.props.main.setAttribute('role', 'main');
  } else {
    this.props.main.parentNode.removeChild(this.props.main);
  }

  this.props.footer = document.querySelector('.page-footer');
  this.props.page.insertBefore(this.props.main, this.props.footer);

  this.props.sitemap = document.querySelector('#globalsitemap');
  for (var nodes=this.props.parent.childNodes, i=nodes.length - 1; i >= 0; i--) {
    if (nodes[i] && nodes[i] != this.props.page && nodes[i] != this.props.sitemap && nodes[i] != this.props.header) {
      var move = this.props.parent.removeChild(nodes[i]);
      this.props.main.appendChild(move);
    }
  }

  this.props.parent.appendChild(this.props.page);
};

InjectHeader.prototype.handleScroll = function(e) {
  var outer = document.body;
  if (/(Firefox)/g.test(navigator.userAgent) || /(Trident)/g.test(navigator.userAgent)) {
    outer = document.querySelector('html');
  }

  this.props.header.classList.toggle('fixed', outer.scrollTop > 40);
};

module.exports = InjectHeader;
