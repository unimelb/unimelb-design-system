/**
 * InpageNavigation
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function InpageNavigation(el, props) {
  this.el = el;
  this.props = props;

  // Event bindings, exclude noscroll and modal
  if (!el.getAttribute('data-no-scroll') && !el.getAttribute('data-modal-target')) {
    this.el.addEventListener('click', this.delegateScroll.bind(this));
  }
}

/**
 * Traverse upward
 */
InpageNavigation.prototype.up = function(el) {
  if (el.hasAttribute('data-tabbed')) {
    return el;
  } else {
    if (el.parentNode && el.parentNode!=document) {
      return this.up(el.parentNode);
    } else {
      return false;
    }
  }
};

InpageNavigation.prototype.delegateScroll = function(e) {
  var outer = document.documentElement;
  var tel = e.srcElement;
  if (e.target) {
    tel = e.target;
  }

  console.log(tel);
  if (tel && tel.hasAttribute('href')) {
    var target = tel.getAttribute('href');

    if (target != "#" && target != "#sitemap") {
      e.preventDefault();
      target = document.querySelector(tel.getAttribute('href'));

      var tabbed = this.up(tel);
      if (tabbed && this.parentNode.parentNode.hasClass("jump-navigation") === false) {
        target = tabbed;
      }

      if (target) {
        smoothScrollTo(target);
      }
    }
  }
};

module.exports = InpageNavigation;
