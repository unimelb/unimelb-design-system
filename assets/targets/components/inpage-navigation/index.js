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
  if (!this.el.getAttribute('data-no-scroll') && !this.el.getAttribute('data-modal-target')) {
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
  var tel = e.target || e.srcElement;

  if (tel && tel.hasAttribute('href')) {
    var target = tel.getAttribute('href');

    if (target != "#" && target != "#sitemap") {
      e.preventDefault();
      target = document.querySelector(target);

      var tabbed = this.up(tel);
      if (tabbed && tel.parentNode.parentNode.hasClass("jump-navigation") === false) {
        target = tabbed;
      }

      if (target) {
        smoothScrollTo(target);
      }
    }
  }
};

module.exports = InpageNavigation;
