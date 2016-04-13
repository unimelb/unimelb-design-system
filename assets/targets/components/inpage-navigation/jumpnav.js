/**
 * JumpNav
 *
 * @param  {Object} props
 */
function JumpNav(props) {
  this.el = document.querySelector('.jump-navigation');
  this.props = props;

  if (/(Firefox)/g.test(navigator.userAgent) || /(Trident)/g.test(navigator.userAgent)) {
    this.props.outer = document.querySelector('html');
  } else {
    this.props.outer = document.body;
  }

  // Arbitrary delay to allow calculation of CSS block hiding
  var offsets = {
    'root':            document.querySelector('div[role="main"]'),
    'topmode':         (document.countSelector('.jumpnav.top') === 1),
    'arbitraryOffset': 60  // scroll clearance
  };

  // Add to props
  for (var prop in offsets) { this.props[prop] = offsets[prop]; }

  // Does layout contain a header at the top
  var firstElem = this.props.root.findFirstElementChild();
  if (firstElem && firstElem.nodeName === 'HEADER')
    this.props.header = firstElem;

  // Build nav menu
  if (!this.el || !this.el.hasAttribute('data-bound')) {
    this.buildNavMenu();

    if (MSIE_version > 8) {
      // Calculations for transition points, delay after page render
      setTimeout(this.initCalcs.bind(this), 1000);

      // Event binding
      if ('onscroll' in window.window)
        window.addEventListener('scroll', this.handleScroll.bind(this));

      if ('onresize' in window.window)
        window.addEventListener('resize', this.handleResize.bind(this)); // causing trouble

      // Initial calc
      this.trackProgress();
    }

    this.el.setAttribute('data-bound', true);
  }
}

JumpNav.prototype.handleResize = function() {
  this.initCalcs();

  this.trackProgress();
  this.setEndpoint();
  this.setFixed();
};

JumpNav.prototype.handleScroll = function() {
  this.trackProgress();
  this.setEndpoint();
  this.setFixed();
};

/*
 * Progress
 */
JumpNav.prototype.trackProgress = function() {
  for (var pos in this.props.items) {
    if (this.props.outer.scrollTop + this.props.arbitraryOffset >= pos) {
      for (var k in this.props.items) {
        this.props.items[k].classList.toggle('current', k === pos);
      }
    } else {
      this.props.items[pos].classList.remove('current');
    }
  }
};

JumpNav.prototype.buildNavMenu = function() {
  this.el = document.createElement('ul');
  this.el.className = (document.countSelector('.indexnav') > 0 ? 'index-navigation' : 'jump-navigation');
  this.el.innerHTML = '<li>On this page</li>';

  this.props.items = {};
  for (var recs=this.props.root.querySelectorAll('h2[id]'), i=0, max=recs.length; i < max; i++) {
    var at = recs[i].offsetTop;
    this.props.items[at] = document.createElement('a');
    this.props.items[at].href = '#' + recs[i].id;
    this.props.items[at].appendChild(document.createTextNode(recs[i].textContent || recs[i].innerText));
    var li = document.createElement('li');
    li.appendChild(this.props.items[at]);
    this.el.appendChild(li);
  }

  if (document.countSelector('.floating') > 0)
    this.el.classList.add('floating');

  if (!this.props.header) {
    this.el.classList.add('headless');
    this.el.classList.add('fixed');
  }

  // Insert after heading
  if (this.props.header) {
    this.props.root.insertBefore(this.el, this.props.header.nextSibling);

  // Insert into top of role=main
  } else {
    var refElem = this.props.root.findFirstElementChild();
    // If first element is `.headerless`, take the next sibling so that the jumpnav appears below the blue bar on mobile and tablet
    if (refElem.classList.contains('headerless'))
      refElem = refElem.findNextElementSibling();
    this.props.root.insertBefore(this.el, refElem);
  }

  if (!this.props.topmode) {
    this.el.id = 'outer';

    if (document.countSelector('.indexnav') == 1) {
      document.body.classList.add('indexnav-active');
    } else {
      document.body.classList.add('jumpnav-active');
    }

    this.initCalcs();
  }

  // Rebind smooth scrolling to new links
  var InpageNavigation = require("../inpage-navigation");
  for (recs=document.querySelectorAll('a[href^="#"]'), i=recs.length - 1; i >= 0; i--) {
    new InpageNavigation(recs[i], {});
  }
};

JumpNav.prototype.initCalcs = function() {
  if (MSIE_version > 8) {
    var headerOffset =  (this.props.header ? this.props.header.offsetHeight: 0);
    this.props.fixPoint = this.props.root.offsetTop + headerOffset - 20;

    if (this.props.root.classList.contains('floating'))
      this.props.fixPoint = this.props.fixPoint + 35;

    // Does the page include an inner footer
    var innerFooterHeight = document.querySelector('[role="main"] > footer:last-of-type');
    if (innerFooterHeight) {
      innerFooterHeight = innerFooterHeight.offsetHeight;
    } else {
      innerFooterHeight = 0;
    }

    var outerFooterHeight = document.querySelector('.page-footer');
    if (outerFooterHeight) {
      outerFooterHeight = outerFooterHeight.offsetHeight;
    } else {
      outerFooterHeight = 0;
    }

    // Not really sure what this 60 represents, but it makes it Good
    this.props.stickyEnd = this.props.root.offsetTop + this.props.root.offsetHeight - this.el.offsetHeight - innerFooterHeight - 60;

    // 10px margin-top
    this.props.footerOffset = (innerFooterHeight + outerFooterHeight + 10) + 'px';

    if (this.el.classList.contains('fixed')) {
      this.el.style.bottom = this.props.footerOffset;
    } else {
      this.el.style.bottom = '';
    }

    this.setEndpoint();
  }
};

// Will now check if a header is present, otherwise leave fixed
JumpNav.prototype.setFixed = function() {
  if (this.props.outer.scrollTop > this.props.fixPoint) {
    this.el.classList.remove('headless');
    this.el.classList.add('fixed');
    this.el.style.bottom = this.props.footerOffset;

  } else {
    if (this.props.header) {
      this.el.style.bottom = '';
      this.el.classList.remove('fixed');

    } else {
      this.el.classList.add('headless');
    }
  }
};

JumpNav.prototype.setEndpoint = function() {
  this.el.classList.toggle('endpoint', this.props.outer.scrollTop > this.props.stickyEnd);
};

module.exports = JumpNav;
