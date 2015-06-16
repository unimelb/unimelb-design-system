/**
 * JumpNav
 *
 * @param  {Object} props
 */
function JumpNav(props) {
  this.props = props;

  if (/(Firefox)/g.test(navigator.userAgent) || /(Trident)/g.test(navigator.userAgent)) {
    this.props.outer = document.querySelector('html');
  } else {
    this.props.outer = document.body;
  }

  // Arbitrary delay to allow calculation of CSS block hiding
  var offsets = {
    'root':            document.querySelector('div[role="main"]'),
    'header':          document.querySelector('div[role="main"] > header'),
    'navOffset':       60, // 30 top + 30 bottom
    'arbitraryOffset': 50  // scroll clearance
  };

  // Add to props
  for (var prop in offsets) { this.props[prop] = offsets[prop]; }

  // Does the page include an inner footer
  var innerFooter = document.querySelector('[role="main"] > footer:last-of-type');
  if (innerFooter) {
    this.props.footerOffset = innerFooter.offsetHeight - 60; // 30 top + 30 bottom
  } else {
    this.props.footerOffset = 0;
  }


  // Build nav menu
  this.buildNavMenu();

  // Event binding
  window.addEventListener('scroll', this.handleScroll.bind(this));

  // Initial calc
  this.trackProgress();
}

JumpNav.prototype.handleScroll = function() {
  this.trackProgress();

  if (this.contained()) {
    this.el.addClass('fixed');
  } else {
    this.el.removeClass('fixed');
  }
};

/*
 * Is element contained in viewport
 */
JumpNav.prototype.contained = function() {
  var stickyEnd = this.props.root.offsetHeight + this.props.root.offsetTop -
   this.el.offsetHeight - this.props.navOffset - this.props.footerOffset;

  return (this.props.outer.scrollTop > this.props.fixPoint && this.props.outer.scrollTop < stickyEnd);
};

/*
 * Progress
 */
JumpNav.prototype.trackProgress = function() {
  for (var pos in this.props.items) {
    if (this.props.outer.scrollTop + this.props.arbitraryOffset >= pos) {
      for (var k in this.props.items) {
        this.props.items[k].removeClass('current');
      }
      this.props.items[pos].addClass('current');
    } else {
      this.props.items[pos].removeClass('current');
    }
  }
};

JumpNav.prototype.buildNavMenu = function() {
  this.el = document.createElement('ul');

  var className = 'jump-navigation';
  if (document.countSelector('.indexnav') == 1) {
    className = 'index-navigation';
  }
  this.el.addClass(className);
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
    this.el.addClass('floating');

  if (this.props.root.countSelector('.tab .with-aside aside') > 0) {
    this.props.root.querySelector('.tab .with-aside aside').appendChild(this.el);

  } else {
    this.el.id = 'outer';

    // Insert into top of role=main after heading, exclude white space
    var elements = [];
    for (recs=this.props.root.childNodes, i=0, max=recs.length; i < max; i++) {
      if (recs[i].nodeType == 1)
        elements.push(recs[i]);
    }
    if (elements.length > 1) {
      this.props.root.insertBefore(this.el, elements[1]);
    } else {
      this.props.root.appendChild(this.el);
    }
  }

  if (document.countSelector('.indexnav') == 1) {
    document.body.addClass('indexnav-active');
  } else {
    document.body.addClass('jumpnav-active');
  }

  this.props.fixPoint = this.props.root.offsetTop + this.props.header.offsetHeight - 20;

  if (this.props.root.hasClass('floating'))
    this.props.fixPoint = this.props.fixPoint + 35;

  // Rebind smooth scrolling to new links
  var InpageNavigation = require("../inpage-navigation");
  for (recs=document.querySelectorAll('a[href^="#"]'), i=recs.length - 1; i >= 0; i--) {
    new InpageNavigation(recs[i], {});
  }
};


module.exports = JumpNav;
