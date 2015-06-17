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

Tabs.prototype.selectPanel = function() {
  var idx = 0;
  if (window.location.hash) {
    for (max=this.props.tabs.length, i=0; i < max; i++)
      if (window.location.hash == this.props.tabs[i].hash)
        idx = i;
  }

  // Matches window hash
  if (idx > 0) {
    this.moveindex(idx);

  // Default to 1st
  } else if (this.el.countSelector('[data-current]') === 0) {
    this.move(this.el.querySelector('nav a:first-child'));

  // Preselect
  } else {
    this.move(this.el.querySelector('[data-current]'));
  }
};

Tabs.prototype.handleClick = function(e) {
  var target = e.target || e.srcElement;
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
  var pos = document.body.scrollTop;
  window.location.hash = hash;
  document.body.scrollTop = pos;

  if (history.pushState) {
    var slug = this.href;
    history.pushState({'title': document.title, 'url': slug}, document.title, slug);
  }
};

// Match index - could potentially match ID instead
Tabs.prototype.handleInternalClick = function(e) {
  var target = e.target || e.srcElement;
  var idx = target.getAttribute('data-tab') - 1;
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
  this.props.mobilenav = document.createElement('div');
  this.props.mobilenav.addClass('mobile-nav');

  var selector = document.createElement('select');
  selector.setAttribute('role', 'tablist');

  for (i=0, max=this.props.tabs.length; i < max; i++) {
    var opt = document.createElement('option');
    opt.setAttribute('role', 'tab');
    opt.setAttribute('value', this.props.tabs[i].getAttribute('href'));
    opt.appendChild(document.createTextNode(this.props.tabs[i].firstChild.nodeValue));
    selector.appendChild(opt);
  }

  selector.addEventListener('change', this.handleChange.bind(this));
  this.props.mobilenav.appendChild(selector);
  this.props.root.insertBefore(this.props.mobilenav, this.props.root.firstChild);
};

Tabs.prototype.handleChange = function(e) {
  var target = e.srcElement.value;
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
  var curr = 0;

  for (max=this.props.tabs.length, i=0; i < max; i++)
    if (this.props.tabs[i] == target)
      curr = i;

  return curr;
};

/**
 * Match target
 */
Tabs.prototype.move = function(target) {
  this.moveindex(this.getIndex(target));
};

Tabs.prototype.moveindex = function(index) {
  for (max=this.props.tabs.length, i=0; i < max; i++) {
    if (i == index) {
      this.props.tabs[i].setAttribute('data-current', '');
    } else {
      this.props.tabs[i].removeAttribute('data-current');
    }
  }

  for (opts=this.el.querySelectorAll('option'), max=opts.length, i=0; i < max; i++) {
    if (i == index) {
      opts[i].setAttribute('selected', 'selected');
    } else {
      opts[i].removeAttribute('selected');
    }
  }

  for (panels=this.el.querySelectorAll('[role="tabpanel"]'), max=panels.length, i=0; i < max; i++) {
    if (i == index) {
      panels[i].setAttribute('data-current', '');
      panels[i].style.display = 'block';
    } else {
      panels[i].removeAttribute('data-current');
      panels[i].style.display = 'none';
    }
  }
};

module.exports = Tabs;
