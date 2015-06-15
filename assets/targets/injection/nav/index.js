/**
 * InjectNav
 *
 * @param  {Object} props
 */
function InjectNav(props) {
  this.props = props;

  var elements = {
    'root':           document.querySelector('.uomcontent'),
    'page':           document.querySelector('.page-inner'),
    'header':         document.querySelector('.page-header'),
    'sitemap':        document.querySelector('#globalsitemap'),
    'sitemaptrigger': document.querySelector('.sitemap-label'),
    'menutrigger':    document.querySelector('.page-header-tools a[title="Menu"]'),
    'searchtrigger':  document.querySelector('.page-header-tools a[title="Search"]'),
    'localnav':       (document.countSelector('#sitemap') == 1)
  };

  // Add to props
  for (var prop in elements) { this.props[prop] = elements[prop]; }

  Blanket = require('../../components/modal/blanket');
  this.props.blanket = new Blanket({
    'root': this.props.root
  });

  this.moveLocalNav();
  this.renderGlobalSitemap();

  // Event bindings
  this.setupEventBindings();
}

InjectNav.prototype.setupEventBindings = function() {
  // Local nav is defined
  if (this.props.localnav) {
    this.props.menutrigger.addEventListener('click', this.handleMenuTrigger.bind(this));

    for (var triggers=this.props.localnav.querySelectorAll('h2:first-child'), i=triggers.length - 1; i >= 0; i--) {
      triggers[i].addEventListener('click', this.handleInnerTrigger.bind(this));
    }

    for (triggers=this.props.localnav.querySelectorAll('a'), i=triggers.length - 1; i >= 0; i--) {
      if (triggers[i].getAttribute('href').indexOf('#') != -1) {
        triggers[i].addEventListener('click', this.handleInnerTrigger.bind(this));
      }
    }

    if (this.props.sitemaptrigger)
      this.props.sitemaptrigger.addEventListener('click', this.handleTrigger.bind(this));
    if (this.props.sitemap)
      this.props.sitemap.querySelector('.close-button').addEventListener('click', this.handleSitemap.bind(this));

    this.props.localsitemaptrigger = this.props.localnav.querySelector('.sitemap-link');
    if (this.props.localsitemaptrigger)
      this.props.localsitemaptrigger.addEventListener('click', this.handleSitemapTrigger.bind(this));

  } else {
    if (this.props.menutrigger)
      this.props.menutrigger.addEventListener('click', this.handleTrigger.bind(this));
    if (this.props.sitemap)
      this.props.sitemap.querySelector('.close-button').addEventListener('click', this.handleInnerTrigger.bind(this));
  }

  if (this.props.blanket)
    this.props.blanket.props.el.addEventListener('click', this.handleBlanket.bind(this));

  if (this.props.searchtrigger) {
    this.props.searchtrigger.addEventListener('click', this.handleSearchTrigger.bind(this));
  }
};

InjectNav.prototype.handleBlanket = function(e) {
  e.preventDefault();
  this.props.blanket.hide();
  this.props.sitemaptrigger.addClass('active');
  this.props.page.removeClass('global-active');
  this.props.page.removeClass('active');
  this.props.header.removeClass('global-active');
  this.props.header.removeClass('active');
  if (this.props.localnav) {
    this.props.localnav.removeClass('global-active');
    this.props.localnav.removeClass('active');
  }
  this.props.sitemap.removeClass('active');
};

InjectNav.prototype.handleSearchTrigger = function(e) {
  e.preventDefault();
  this.props.blanket.toggle();
  this.props.sitemaptrigger.addClass('active');
  this.props.page.addClass('global-active');
  this.props.header.addClass('global-active');
  if (this.props.localnav) {
    this.props.localnav.addClass('global-active');
  }
  this.props.sitemap.addClass('active');
  this.props.header.removeClass('fixed');
  if (!(/Firefox/.test(navigator.userAgent) && parseFloat(/[^\/|\s]?(?:\d*\.)?\d+$/.exec(navigator.userAgent)[0]) > 30.0)) {
    this.props.sitemap.querySelector('input[type="search"]').focus();
  }
};

InjectNav.prototype.handleTrigger = function(e) {
  e.preventDefault();
  this.props.blanket.show();
  this.props.sitemaptrigger.addClass('active');
  this.props.page.addClass('global-active');
  this.props.header.addClass('global-active');
  if (this.props.localnav) {
    this.props.localnav.removeClass('active');
    this.props.sitemap.addClass('active');
  } else {
    this.props.sitemap.toggleClass('active');
  }
};

InjectNav.prototype.handleSitemap = function(e) {
  e.preventDefault();
  this.props.sitemaptrigger.removeClass('active');
  this.props.page.removeClass('global-active');
  this.props.page.addClass('active');
  this.props.header.removeClass('global-active');
  this.props.header.addClass('active');
  this.props.localnav.removeClass('global-active');
  this.props.localnav.addClass('active');
  this.props.sitemap.removeClass('active');
};

InjectNav.prototype.handleSitemapTrigger = function(e) {
  e.preventDefault();
  this.props.sitemaptrigger.addClass('active');
  this.props.page.addClass('global-active');
  this.props.header.addClass('global-active');
  this.props.localnav.removeClass('active');
  this.props.sitemap.addClass('active');
};

InjectNav.prototype.handleMenuTrigger = function(e) {
  e.preventDefault();
  this.props.localnav.offsetTop = 0; // Snap to top

  this.props.blanket.toggle();
  this.props.sitemaptrigger.removeClass('active');
  this.props.page.toggleClass('active');
  this.props.page.removeClass('global-active');
  this.props.header.toggleClass('active');
  this.props.header.removeClass('global-active');
  this.props.header.removeClass('fixed');
  this.props.localnav.toggleClass('active');
  this.props.localnav.removeClass('global-active');
  this.props.sitemap.removeClass('active');
  this.props.sitemap.addClass('reveal');
};

InjectNav.prototype.handleInnerTrigger = function(e) {
  e.preventDefault();
  if (this.props.page.hasClass('global-active')) {
    this.props.page.removeClass('global-active');
    this.props.page.addClass('active');
    this.props.header.addClass('active');
    this.props.localnav.removeClass('global-active');
    this.props.localnav.addClass('active');
    this.props.sitemap.removeClass('active');
  } else {
    this.props.blanket.hide();
    this.props.sitemaptrigger.addClass('active');
    if (this.props.localnav) {
      this.props.page.toggleClass('active');
      this.props.page.removeClass('global-active');
      this.props.header.toggleClass('active');
      this.props.header.removeClass('global-active');
      this.props.localnav.toggleClass('active');
      this.props.localnav.removeClass('global-active');
      this.props.sitemap.removeClass('active');
    } else {
      this.props.page.toggleClass('global-active');
      this.props.header.toggleClass('global-active');
      this.props.sitemap.toggleClass('active');
    }
  }
};

InjectNav.prototype.moveLocalNav = function() {
  // Move local nav outside page container
  if (this.props.localnav) {
    this.props.localnav = document.querySelector('#sitemap');

    if (this.props.localnav.countSelector('a.sitemap-link') === 0) {
      var rootmenu = this.props.localnav.querySelector('ul');
      var absroot = (this.props.localnav.getAttribute('data-absolute-root') || '/');

      var navtitle = this.props.localnav.querySelector('h2');
      var firstli = document.createElement('li');
      firstli.addClass('home');
      firstli.innerHTML = '<a href="' + absroot + '">' + (navtitle.textContent || navtitle.innerText) + '</a>';
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
          back.innerHTML = group.firstChild.data;
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
  }
};

InjectNav.prototype.renderGlobalSitemap = function() {
  // Create global nav trigger
  if (!this.props.sitemaptrigger) {
    this.props.sitemaptrigger = document.createElement('div');
    this.props.sitemaptrigger.setAttribute('class', 'sitemap-label active');
    this.props.sitemaptrigger.innerHTML = '      <span>University Sitemap</span>';
    this.props.root.appendChild(this.props.sitemaptrigger);
  }

  // Create global nav
  if (!this.props.sitemap) {
    this.props.sitemap = document.createElement('div');
    this.props.sitemap.setAttribute('role', 'navigation');
    this.props.sitemap.id = 'globalsitemap';
    this.props.sitemap.innerHTML = '     <a class="close-button" href="">Close</a>      <a href="https://www.unimelb.edu.au" class="logo">        <svg width="100" height="100" viewBox="0 0 140 140" aria-labelledby="aria-uom-title" role="img">          <image xlink:href="' + this.props.assethost + '/logo.svg" src="' + this.props.assethost + '/logo.png" alt="The University of Melbourne Logo" width="140" height="140" preserveAspectRatio="xMaxYMin meet"/>        </svg>      </a>      <form action="https://search.unimelb.edu.au" method="get">        <fieldset>          <input data-required placeholder="Search" name="q" type="search" title="Please enter a keyword" aria-label="Search the University" />          <button type="submit" class="search-button"><span>GO</span><svg class="icon" role="img"><use xlink:href="#icon-search"></use></svg></button>        </fieldset>      </form>      <ul class="quicklinks">        <li><a href="http://about.unimelb.edu.au/governance-and-leadership/faculties"><svg role="img" class="icon"><use xlink:href="#icon-faculties" /></svg> Faculties and Graduate Schools</a></li>        <li><a href="http://students.unimelb.edu.au/"><svg role="img" class="icon"><use xlink:href="#icon-students" /></svg> Current Students</a></li>        <li><a href="http://library.unimelb.edu.au/"><svg role="img" class="icon"><use xlink:href="#icon-library" /></svg> Library</a></li>        <li><a href="http://www.unimelb.edu.au/contact/"><svg role="img" class="icon"><use xlink:href="#icon-phone" /></svg> Contact us</a></li>        <li><a href="http://maps.unimelb.edu.au/"><svg role="img" class="icon"><use xlink:href="#icon-maps" /></svg> Maps</a></li>        <li><a href="http://www.campaign.unimelb.edu.au/"><svg role="img" class="icon"><use xlink:href="#icon-campaign" /></svg> Support the Campaign</a></li>      </ul>      <div>        <div class="col-3">          <div>            <h2><a href="http://coursesearch.unimelb.edu.au/">Study at Melbourne</a></h2>            <ul>              <li><a href="http://coursesearch.unimelb.edu.au/undergrad">Undergraduate study</a></li>              <li><a href="http://coursesearch.unimelb.edu.au/grad">Graduate study</a></li>              <li><a href="http://futurestudents.unimelb.edu.au/">Future students</a></li>              <li><a href="http://futurestudents.unimelb.edu.au/admissions">Admissions, fees &amp; applications</a></li>              <li><a href="http://futurestudents.unimelb.edu.au/info/international">International students</a></li>              <li><a href="http://www.unimelb.edu.au/campustour/">Campus tour</a></li>            </ul>          </div>          <div>            <h2><a href="http://about.unimelb.edu.au/">About us</a></h2>            <ul>              <li><a href="http://about.unimelb.edu.au/strategy-and-leadership">Strategy and leadership</a></li>              <li><a href="http://about.unimelb.edu.au/tradition-of-excellence">Tradition of excellence</a></li>              <li><a href="http://about.unimelb.edu.au/international-connections">International connections</a></li>              <li><a href="http://about.unimelb.edu.au/campuses-and-facilities">Campuses and facilities</a></li>              <li><a href="http://about.unimelb.edu.au/governance-and-leadership">Structure and governance</a></li>              <li><a href="http://about.unimelb.edu.au/policy-and-publications">Policy and publications</a></li>              <li><a href="http://hr.unimelb.edu.au/careers">Careers at Melbourne</a></li>              <li><a href="http://newsroom.unimelb.edu.au">Newsroom</a></li>            </ul>          </div>          <div>            <h2><a href="http://unimelb.edu.au/research/">Research</a></h2>            <ul>              <li><a href="http://www.unimelb.edu.au/research/about-research-at-melbourne.html">About Research at Melbourne</a></li>              <li><a href="http://ri.unimelb.edu.au/">Research institutes</a></li>              <li><a href="http://www.unimelb.edu.au/research/research-institutes-centres.html">Research Centres</a></li>              <li><a href="http://findanexpert.unimelb.edu.au/">Find an expert or supervisor</a></li>              <li><a href="http://gradresearch.unimelb.edu.au/">Graduate researchers</a></li>              <li><a href="https://pursuit.unimelb.edu.au/">Pursuit: our research showcase</a></li>            </ul>          </div>        </div>        <div class="col-3">          <div>            <h2><a href="http://unimelb.edu.au/engage/">Engagement</a></h2>            <ul>              <li><a href="http://events.unimelb.edu.au/">Events</a></li>              <li><a href="http://engage.unimelb.edu.au/community-engagement">Community</a></li>              <li><a href="http://engage.unimelb.edu.au/global-engagement">Global Engagement</a></li>              <li><a href="http://businessconnect.unimelb.edu.au/">Business &amp; Industry</a></li>              <li><a href="http://engage.unimelb.edu.au/cultural-engagement">Arts &amp; Culture</a></li>              <li><a href="http://www.sport.unimelb.edu.au/facilities/index.html">Sports Facilities</a></li>            </ul>          </div>          <div>            <h2><a href="http://alumni.unimelb.edu.au/">Alumni &amp; friends</a></h2>            <ul>              <li><a href="http://alumni.unimelb.edu.au/benefits-services">Benefits &amp; services</a></li>              <li><a href="http://www.campaign.unimelb.edu.au/">Giving</a></li>              <li><a href="http://alumni.unimelb.edu.au/get-involved">Get involved</a></li>              <li><a href="http://alumni.unimelb.edu.au/my-network">Networks</a></li>              <li><a href="http://mag.alumni.unimelb.edu.au/?sl=1">3010: alumni magazine</a></li>              <li><a href="http://alumni.unimelb.edu.au/news">News</a></li>              <li><a href="http://alumni.online.unimelb.edu.au/s/1182/3col.aspx?sid=1182&gid=1&pgid=722">Events</a></li>            </ul>          </div>          <div>            <h2><a href="http://www.unimelb.edu.au/contact/">Contact &amp; Maps</a></h2>            <ul>              <li><a href="http://ask.unimelb.edu.au/app/contact">Contact us</a></li>              <li><a href="http://ask.unimelb.edu.au">Enquiries</a></li>              <li><a href="http://newsroom.melbourne.edu/">Media</a></li>              <li><a href="http://findanexpert.unimelb.edu.au">Find an expert</a></li>              <li><a href="http://maps.unimelb.edu.au/">Campus maps</a></li>              <li><a href="http://pcs.unimelb.edu.au/traffic-and-parking/">Traffic, parking &amp; bicycles</a></li>              <li><a href="http://directory.unimelb.edu.au/">Find a staff member</a></li>            </ul>          </div>        </div>      </div>';

    var form = this.props.sitemap.querySelector('form');

    if (/(MSIE [8|9].0)/g.test(navigator.userAgent)) {
      form.elements[1].value = 'Search';
      form.elements[1].addEventListener('click', function(e) {
        this.select();
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      window.location = this.action + "#gsc.q=" + this.elements[1].value;
    });

    this.props.root.appendChild(this.props.sitemap);
  }
};

module.exports = InjectNav;
