/**
 * SidebarTabs
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function SidebarTabs(el, props) {
  this.el = el;
  this.props = props;
  this.props.nav = this.el.querySelectorAll('a');
  this.props.current = 0;

  for (var i=this.props.nav.length - 1; i >= 0; i--)
    this.props.nav[i].addEventListener('click', this.handleClick.bind(this));

  if (window.location.hash) {
    var search = this.el.querySelector('a[href="' + window.location.hash + '"]');
    if (search) {
      this.matchEl(search);
    }
  }
}

SidebarTabs.prototype.handleClick = function(e) {
  e.preventDefault();
  this.matchEl(e.target);
};

SidebarTabs.prototype.matchEl = function(el) {
  for (var i=this.props.nav.length - 1; i >= 0; i--) {
    if (this.props.nav[i] == el) {
      this.hide();
      this.props.current = i;
      this.show();
    }
  }
};

SidebarTabs.prototype.hide = function() {
  var root = document;
  if (document.countSelector('.tab') > 1)
    root = document.querySelector('.tab[data-current]');

  for (var pages=root.querySelectorAll(this.props.selector), i=pages.length - 1; i >= 0; i--)
    pages[i].removeClass('current');

  for (i=this.props.nav.length - 1; i >= 0; i--)
    this.props.nav[i].removeClass('current');
};

SidebarTabs.prototype.show = function() {
  for (var i=this.props.nav.length - 1; i >= 0; i--) {
    if (i == this.props.current) {
      var target = document.querySelector(this.props.nav[i].getAttribute('href'));
      if (target) {
        this.props.nav[i].classList.add('current');
        target.classList.add('current');
      }
    }
  }
};

module.exports = SidebarTabs;
