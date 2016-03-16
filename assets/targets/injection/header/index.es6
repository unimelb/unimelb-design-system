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
      if (floating.hasClass('reverse')) {
        this.props.header.classList.add('reverse');
      }

      if (floating.hasClass('short')) {
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

InjectHeader.prototype.renderHeaderTools = function() {
  var tools = document.querySelector('.page-header-tools');
  if (!tools) {
    tools = document.createElement('div');
    tools.className = 'page-header-tools';

    var template = `
<a class="page-header-icon" href="#sitemap" title="Search"><svg role="img"><use xlink:href="#icon-search" /></svg> Search</a><!--
--><a class="page-header-icon" href="#sitemap" title="Menu"><svg role="img"><use xlink:href="#icon-menu" /></svg> Menu</a>
`;

    // Need to use innerHTML for <svg><use>
    if (document.countSelector('[role="main"].with-login') === 0) {
      tools.innerHTML = template;

    } else {
      tools.classList.add('with-login');

      var loginContent = document.querySelector('.page-local-login');
      if (loginContent) {
        // Title override for logout
        var title = 'Login';
        if (loginContent.hasAttribute('data-title') && loginContent.getAttribute('data-title').length < 8) {
          title = loginContent.getAttribute('data-title');
        }

        // Link only
        if (loginContent.hasAttribute('data-href')) {
          var link = loginContent.getAttribute('data-href');
          tools.innerHTML = `
<a class="page-header-icon" href="#sitemap" title="Search"><svg role="img"><use xlink:href="#icon-search"/></svg> Search</a><!--
--><a class="page-header-icon" href="${link}" title="${title}" data-modal-target="uom-login"><svg role="img"><use xlink:href="#icon-profile" /></svg> ${title}</a><!--
--><a class="page-header-icon" href="#sitemap" title="Menu"><svg role="img"><use xlink:href="#icon-menu"/></svg> Menu</a>
`;
        // Modal content
        } else {
          tools.innerHTML = `
<a class="page-header-icon" href="#sitemap" title="Search"><svg role="img"><use xlink:href="#icon-search"/></svg> Search</a><!--
--><a class="page-header-icon" href="#login" title="${title}" data-modal-target="uom-login"><svg role="img"><use xlink:href="#icon-profile" /></svg> ${title}</a><!--
--><a class="page-header-icon" href="#sitemap" title="Menu"><svg role="img"><use xlink:href="#icon-menu"/></svg> Menu</a>
`;
          var Modal = require('../../components/modal'),
              modalDialog = document.createElement('div'),
              trigger = tools.querySelector('[data-modal-target]');

          modalDialog.id = 'uom-login';
          modalDialog.className = 'modal__dialog';
          loginContent.parentNode.removeChild(loginContent);
          modalDialog.appendChild(loginContent);
          tools.appendChild(modalDialog);

          new Modal(trigger, {});
        }

      } else {
        // Fallback to default
        tools.innerHTML = template;
      }
    }

    var navparent = this.props.header.querySelector('header');
    if (!navparent) {
      navparent = this.props.header;
    }
    navparent.appendChild(tools);
  }
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

  if (outer.scrollTop > 40) {
    this.props.header.classList.add('fixed');
  } else {
    this.props.header.removeClass('fixed');
  }
};

module.exports = InjectHeader;
