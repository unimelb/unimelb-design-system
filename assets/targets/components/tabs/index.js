// Dependencies
var Ps = require('perfect-scrollbar');
var debounce = require('just-debounce');

// Don't show sidebar until it's worth it
var OVERFLOW_PRECISION = 10;
// Debounce delay for resize event
var DEBOUNCE_DELAY = 100;


/**
 * Tabs
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function Tabs(el, props) {
  this.el = el;
  this.props = props;
  this.props.nav = this.el.querySelector('nav');
  this.props.navParent = this.props.nav.parentElement;
  this.props.tabs = this.el.querySelectorAll('nav a');
  this.props.panels = [];
  this.props.isOverflowing = false;
  this.props.isOverflowSetup = false;
  this.props.isLoadingPs = false;

  // Event bindings
  if (this.el.hasAttribute('data-tabbed')) {
    this.setupPanels();
    this.selectPanel();
    
    this.handleResize(false);
    window.addEventListener('resize', debounce(this.handleResize.bind(this, true), DEBOUNCE_DELAY));
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

/**
 * On page load and resize, check whether the tabs fit on one row.
 * If they don't, activate the overflow behaviour (horizontal scroll) 
 */
Tabs.prototype.handleResize = function(smooth, e) {
  // Check whether the full-width container is narrower than the navigation element
  var isOverflowing = this.el.clientWidth <= this.props.nav.clientWidth - OVERFLOW_PRECISION;
  
  // Update the horizontal scrollbar, if initialised
  if (isOverflowing && this.props.isOverflowSetup) {
    Ps.update(this.props.inner);
  }
  
  // Activate or deactivate the overflow behaviour when needed
  if (isOverflowing !== this.props.isOverflowing) {
    // Save overflow state
    this.props.isOverflowing = isOverflowing;
    
    if (isOverflowing) {
      if (!this.props.isOverflowSetup) {
        if (!this.props.isLoadingPs) {
          // Load the 'perfect-scrollbar' library then setup the overflow behaviour
          this.props.isLoadingPs = true;
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.10/js/min/perfect-scrollbar.min.js', this.setupOverflow.bind(this));
        }
      } else {
        // Bring up the horizontal scrollbar
        this.activateOverflow();
      }
    } else {
      // Remove the horizontal scrollbar
      this.destroyOverflow();
    }
  }
  
  // Scroll to the selected tab
  this.scrollToTab(this.el.querySelector('[data-current]'), smooth);
};

/**
 * Prepare the DOM for the overflow behaviour.
 */
Tabs.prototype.setupOverflow = function() {
  // Wrap nav in div to hold horizontal scrollbar
  var inner = document.createElement('div');
  inner.className = 'tabbed-nav__inner';
  inner.appendChild(this.props.nav);
  
  // Build arrows
  var leftArrow = document.createElement('button');
  leftArrow.className = 'button-ui tab-arrow';
  leftArrow.setAttribute('type', 'button');
  var rightArrow = leftArrow.cloneNode(false);
  leftArrow.innerHTML = '&lsaquo;';
  leftArrow.className += ' tab-arrow--left';
  rightArrow.innerHTML = '&rsaquo;';
  rightArrow.className += ' tab-arrow--right';
  
  // Store references to new elements
  this.props.inner = inner;
  this.props.leftArrow = leftArrow;
  this.props.rightArrow = rightArrow;
  
  // Append wrapper and arrows
  this.props.navParent.appendChild(inner);
  this.props.navParent.appendChild(leftArrow);
  this.props.navParent.appendChild(rightArrow);
  
  // Listen for clicks on arrows
  leftArrow.addEventListener('click', this.handleArrowClick.bind(this, 'left'));
  rightArrow.addEventListener('click', this.handleArrowClick.bind(this, 'right'));
  
  // Listen for scroll events to enable/disable arrows
  document.addEventListener('ps-scroll-right', this.updateArrow.bind(this, 'left', true));
  document.addEventListener('ps-scroll-left', this.updateArrow.bind(this, 'right', true));
  document.addEventListener('ps-x-reach-start', this.updateArrow.bind(this, 'left', false));
  document.addEventListener('ps-x-reach-end', this.updateArrow.bind(this, 'right', false));
  
  // Activate the overflow behaviour
  this.activateOverflow();
  
  this.props.isLoadingPs = false;
  this.props.isOverflowSetup = true;
};

/**
 * Activate the overflow behaviour and initialise the horizontal scrollbar.
 */
Tabs.prototype.activateOverflow = function() {
  this.props.navParent.addClass('overflow');
  Ps.initialize(this.props.inner, {
    useBothWheelAxes: true,
    wheelPropagation: true
  });
};

/**
 * Deactivate the overflow behaviour and destroy the horizontal scrollbar.
 */
Tabs.prototype.destroyOverflow = function() {
  this.props.navParent.removeClass('overflow');
  Ps.destroy(this.props.inner);
};

Tabs.prototype.updateArrow = function(arrow, enable, e) {
  var arrowElem = this.props[arrow + 'Arrow'];
  if (enable) {
    arrowElem.removeAttribute('disabled');
  } else {
    arrowElem.setAttribute('disabled', 'disabled');
  }
};

Tabs.prototype.handleArrowClick = function(direction, e) {
  var start = this.props.inner.scrollLeft;
  var multiplier = direction === 'left' ? -1 : 1;
  var to = start + multiplier * this.props.inner.clientWidth / 2;
  this.scrollTabs(to, true);
};

Tabs.prototype.handleClick = function(e) {
  var target = e.target;

  // IE8/no-svg fallback
  if (target.hasClass('icon-label')) {
    target = target.parentNode.parentNode;
  }

  if (target.hasClass('icon-over'))
    return;
  if (target.hasAttribute('href')) {
    // go to href

    if (target.getAttribute('href').charAt(0) == '#') {
      this.move(target, true);
      this.setLocation(target.getAttribute('href'));
    }
  } else {
    this.move(target, true);
    this.setLocation(target.getAttribute('href'));
  }
};

Tabs.prototype.panelExists = function(hash) {
  var exists = false;

  for (max=this.props.panels.length, i=0; i < max; i++)
    if (hash.substr(1) === this.props.panels[i])
      exists = true;

  return exists;
};

Tabs.prototype.setLocation = function(hash) {
  if (this.panelExists(hash)) {
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
  }
};

// Match index - could potentially match ID instead
Tabs.prototype.handleInternalClick = function(e) {
  var target = e.target,
      idx = target.getAttribute('data-tab') - 1;
  this.moveindex(idx);
  this.setLocation(this.props.tabs[idx].hash);
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
Tabs.prototype.move = function(target, smooth) {
  var current, panels, max, i;

  this.movetab(this.getIndex(target));
  this.scrollToTab(target, smooth);

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

Tabs.prototype.scrollToTab = function(tab, smooth) {
  if (this.props.isOverflowing) {
    var to = tab.offsetLeft - this.props.inner.clientWidth / 2 + tab.clientWidth / 2;
    this.scrollTabs(to, smooth);
  }
};

Tabs.prototype.scrollTabs = function(to, smooth) {
  if (smooth) {
    var start = this.props.inner.scrollLeft;
    var change = to - start;
    var increment = Math.abs(change / 500);
    var duration = Math.abs(change / 10);
    this.animateTabsScroll(0, start, change, duration, increment);
  } else {
    Ps.update(this.props.inner);
  }
};

Tabs.prototype.animateTabsScroll = function(curr, start, change, duration, increment) {
  curr += increment;
  this.props.inner.scrollLeft = Math.easeInOutQuad(curr, start, change, duration);
  
  if (curr < duration) {
    setTimeout(this.animateTabsScroll.bind(this, curr, start, change, duration, increment), increment);
  } else {
    // If the tabs are still overflowing when the scrolling ends, update the scrollbars
    if (this.props.isOverflowing) {
      Ps.update(this.props.inner);
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
