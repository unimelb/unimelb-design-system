/**
 * Tabs
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function Tabs(el, props) {
  this.el = el;
  this.props = props;
  this.props.tabs = this.el.querySelectorAll('nav a');
  this.props.panels = [];

  this.activateContainer();

  // Event bindings
  if (this.el.hasAttribute('data-tabbed')) {
    this.setupPanels();
    this.selectPanel();
  }
}

Tabs.prototype.setupPanels = function() {
  var recs, i, tabs;
  // Hide all tabs by default
  for (recs=this.el.querySelectorAll('[role="tabpanel"]'), i=recs.length - 1; i >= 0; i--) {
    recs[i].style.display = 'none';
    this.props.panels.push(recs[i].id || '');
  }

  // Event binding
  for (i=this.props.tabs.length - 1; i >= 0; i--)
    this.props.tabs[i].addEventListener('click', this.handleClick.bind(this));

  for (tabs=this.el.querySelectorAll('[data-tab]'), i = tabs.length - 1; i >= 0; i--)
    tabs[i].addEventListener('click', this.handleInternalClick.bind(this));
};

/*
 * There are four ways of selecting which tab to start on!
 */
Tabs.prototype.selectPanel = function() {
  var idx = 0, max, i, search;

  if (window.location.hash) {
    for (max=this.props.tabs.length, i=0; i < max; i++)
      if (window.location.hash == this.props.tabs[i].hash)
        idx = i;
  }

  // Check for inner tabs
  if (idx === 0 && window.location.hash) {
    search = this.el.querySelector(window.location.hash);
    if (search) {
      search = findUp(search, 'tab');
      search = this.el.querySelector('nav a[href="#' + search.id + '"]');
      this.move(search);
    }
  }

  // Preselect via js props
  if (this.props.preselect) {
    this.move(this.props.preselect);

  // Match window hash
  } else if (idx > 0) {
    this.move(this.el.querySelector('[href="' + window.location.hash + '"]'));

  // Default to 1st
  } else if (this.el.countSelector('[data-current]') === 0) {
    this.move(this.el.querySelector('nav a:first-child'));

  // Selected in markup
  } else {
    this.move(this.el.querySelector('[data-current]'));
  }
};

Tabs.prototype.handleClick = function(e) {
  var target = e.target;
  if (target.hasClass('icon-over'))
    return;
  if (target.hasAttribute('href')) {
    // go to href

    if (target.getAttribute('href').substr(0,1) == '#') {
      this.move(target);
      this.setLocation(target.getAttribute('href'));
    }
  } else {
    this.move(target);
    this.setLocation(target.getAttribute('href'));
  }
};

Tabs.prototype.setLocation = function(hash) {
  var pos = document.body.scrollTop, slug;

  if (hash.charAt(0) === '#') {
    window.location.hash = hash.split('#')[1];
  } else {
    window.location = hash;
  }

  document.body.scrollTop = pos;

  if (history.pushState) {
    slug = window.location.href;
    history.pushState({'title': document.title, 'url': slug}, document.title, slug);
  }
};

// Match index - could potentially match ID instead
Tabs.prototype.handleInternalClick = function(e) {
  var target = e.target,
      idx = target.getAttribute('data-tab') - 1;
  this.moveindex(idx);
  this.setLocation(this.props.tabs[idx].hash);
};

Tabs.prototype.activateContainer = function() {
  this.props.nav = this.el.querySelector('nav');
  if (this.props.nav) {
    this.props.nav.addClass('active');
  }

  this.props.mobilenav = this.el.querySelector('.mobile-nav');
  if (this.props.mobilenav) {
    this.props.mobilenav.addClass('active');
  } else if (this.el.countSelector('div.full-width') == 1) {
    this.props.root = this.el.querySelector('.full-width');
    this.buildMobileNav();
    this.props.mobilenav.addClass('active');
  }
};

Tabs.prototype.buildMobileNav = function() {
  var selector, i, max, FancySelect, opt, label;
  this.props.mobilenav = document.createElement('div');
  this.props.mobilenav.addClass('mobile-nav');

  selector = document.createElement('select');
  selector.setAttribute('role', 'tablist');

  for (i=0, max=this.props.tabs.length; i < max; i++) {
    label = this.props.tabs[i].firstChild.nodeValue;
    if (label === null)
      label = this.props.tabs[i].firstChild.firstChild.nodeValue;

    opt = document.createElement('option');
    opt.setAttribute('role', 'tab');
    opt.setAttribute('value', this.props.tabs[i].getAttribute('href'));
    opt.appendChild(document.createTextNode(label));
    selector.appendChild(opt);
  }

  this.props.mobilenav.appendChild(selector);
  this.props.root.insertBefore(this.props.mobilenav, this.props.root.firstChild);

  selector.addEventListener('change', this.handleChange.bind(this));
  if (!/(MSIE 9)/g.test(navigator.userAgent)) {
    FancySelect = require("../forms/fancyselect");
    new FancySelect(selector, {});
  }
};

Tabs.prototype.handleChange = function(e) {
  var target = e.target.value;
  if (target) {
    if (target.substr(0,1) != '#') {
      window.location = target;
    } else {
      this.move(this.el.querySelector('nav a[href="' + target + '"]'));
      this.setLocation(target.substr(1));
    }
  }
};

/**
 * Match target
 */
Tabs.prototype.getIndex = function(target) {
  var curr = 0, max, i;

  for (max=this.props.tabs.length, i=0; i < max; i++)
    if (this.props.tabs[i] === target)
      curr = i;

  return curr;
};

/**
 * Match target
 */
Tabs.prototype.move = function(target) {
  var current, panels, max, i;

  this.movetab(this.getIndex(target));

  if (this.props.panels.length === 1) {
    current = this.el.querySelector('[role="tabpanel"]');
    this.showPanel(current);

  } else {
    current = this.el.querySelector(target.getAttribute('href'));

    for (panels=this.el.querySelectorAll('[role="tabpanel"]'), max=panels.length, i=0; i < max; i++) {
      if (target.getAttribute('href') === '#'+panels[i].id) {
        this.showPanel(panels[i]);
      } else {
        this.hidePanel(panels[i]);
      }
    }
  }
};

Tabs.prototype.moveindex = function(index) {
  var panels, max, i;

  this.movetab(index);

  for (panels=this.el.querySelectorAll('[role="tabpanel"]'), max=panels.length, i=0; i < max; i++) {
    if (index === i) {
      this.showPanel(panels[i]);
    } else {
      this.hidePanel(panels[i]);
    }
  }
};

Tabs.prototype.movetab = function(index) {
  var max, i, opts, panels, current;

  for (max=this.props.tabs.length, i=0; i < max; i++) {
    if (i === index) {
      this.props.tabs[i].setAttribute('data-current', '');
    } else {
      this.props.tabs[i].removeAttribute('data-current');
    }
  }

  for (opts=this.el.querySelectorAll('option'), max=opts.length, i=0; i < max; i++) {
    if (i === index) {
      opts[i].setAttribute('selected', 'selected');
    } else {
      opts[i].removeAttribute('selected');
    }
  }
};

Tabs.prototype.showPanel = function(panel) {
  panel.setAttribute('data-current', '');
  panel.style.display = 'block';
};

Tabs.prototype.hidePanel = function(panel) {
  panel.removeAttribute('data-current');
  panel.style.display = 'none';
};

module.exports = Tabs;
