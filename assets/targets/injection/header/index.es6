/**
 * InjectHeader
 *
 * @param  {Object} props
 */
function InjectHeader(props) {
  this.props = props;

  require('./createnamespace');

  this.props.parent = document.querySelector('.uomcontent');
  this.props.page = document.querySelector('.page-inner');

  // Only add if the header is not already present
  if (document.countSelector('.page-header-tools') === 0) {
    this.renderPageHeader();
    this.renderBreadcrumb();
    this.renderHeaderTools();
    this.reorderStructure();
  }

  window.addEventListener("scroll", this.handleScroll.bind(this));
}

InjectHeader.prototype.renderPageHeader = function() {
  // Create header if it doesn't already exist
  this.props.header = document.querySelector('.page-header');
  if (!this.props.header) {
    // Create header and move local breadcrumb
    this.props.header = document.createElement('div');
    this.props.header.addClass('page-header');

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
      this.props.header.addClass('floating');
      if (document.querySelector('.page-inner > .floating').hasClass('reverse')) {
        this.props.header.addClass('reverse');
      }

      // Add any customisations
      for (var nodes=document.querySelector('.floating').childNodes, i=nodes.length - 1; i >= 0; i--) {
        this.props.header.appendChild(nodes[i]);
      }

    } else {

      this.props.rootlink = '';
      if (document.countSelector('.page-local-history .root') === 0) {
        this.props.rootlink = `
<a href="https://unimelb.edu.au/" title="The University of Melbourne">The University of Melbourne</a>
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
      mobile.addClass('mobile-nav');
      mobile.setAttribute('role', 'navigation');

      var selector = document.createElement('select');
      selector.setAttribute('role', 'tablist');
      selector.setAttribute('aria-label', 'Breadcrumb list');
      selector.addClass('alt');
      selector.addEventListener('change', function(e) {
        if (this.value)
          if (this.value.substr(0, 1) != '#')
            window.location = this.value;
      });

      var max = this.props.local.countSelector('a') - 1;

      for (var nodes=this.props.local.querySelectorAll('span[itemprop="name"]'), i=nodes.length - 1; i >= 0; i--) {
        var opt = document.createElement('option');
        opt.setAttribute('role', 'tab');
        opt.setAttribute('value', nodes[i].parentNode.getAttribute('href'));
        opt.appendChild(document.createTextNode(nodes[i].firstChild.nodeValue));

        if (i==max)
          opt.setAttribute('selected', 'selected');

        selector.appendChild(opt);
      }

      mobile.appendChild(selector);
      var pagenav = this.props.local.parentNode;
      pagenav.insertBefore(mobile, pagenav.firstChild);

      if (!/(MSIE 9)/g.test(navigator.userAgent)) {
        var FancySelect = require("../../components/forms/fancyselect");
        new FancySelect(selector, {});
      }
    }
  }
};

InjectHeader.prototype.renderHeaderTools = function() {
  var tools = document.querySelector('.page-header-tools');
  if (!tools) {
    tools = document.createElement("div");
    tools.addClass('page-header-tools');

    var template = `
<a class="page-header-icon" href="#sitemap" title="Search"><svg role="img"><use xlink:href="#icon-search" /></svg> Search</a><!--
--><a class="page-header-icon" href="#sitemap" title="Menu"><svg role="img"><use xlink:href="#icon-menu" /></svg> Menu</a>
`;

    // Need to use innerHTML for <svg><use>
    if (document.countSelector('[role="main"].with-login') === 0) {
      tools.innerHTML = template;

    } else {
      tools.addClass('with-login');
      var modalContent = document.querySelector('.page-local-login');
      if (modalContent) {
        // Title override for logout
        var title = 'Login';
        if (modalContent.hasAttribute('data-title') && modalContent.getAttribute('data-title').length < 8) {
          title = modalContent.getAttribute('data-title');
        }
        tools.innerHTML = `
<a class="page-header-icon" href="#sitemap" title="Search"><svg role="img"><use xlink:href="#icon-search"/></svg> Search</a><!--
--><a class="page-header-icon" href="#${title}" title="${title}" data-modal-target="uom-login"><svg role="img"><use xlink:href="#icon-profile" /></svg> ${title}</a><!--
--><a class="page-header-icon" href="#sitemap" title="Menu"><svg role="img"><use xlink:href="#icon-menu"/></svg> Menu</a>
`;
        var Modal = require('../../components/modal'),
            modalDialog = document.createElement('div'),
            trigger = tools.querySelector('[data-modal-target]');

        modalDialog.id = 'uom-login';
        modalDialog.addClass('modal__dialog');
        modalContent.parentNode.removeChild(modalContent);
        modalDialog.appendChild(modalContent);
        tools.appendChild(modalDialog);

        new Modal(trigger, {});

      } else {
        // Fall back to default
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
    this.props.header.addClass('fixed');
  } else {
    this.props.header.removeClass('fixed');
  }
};

module.exports = InjectHeader;
