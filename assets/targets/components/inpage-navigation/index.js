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

InpageNavigation.prototype.delegateScroll = function(e) {
  var tel = e.target;

  if (tel && tel.hasAttribute('href')) {
    var target = tel.getAttribute('href');

    if (target != "#" && target != "#sitemap") {
      e.preventDefault();
      target = document.querySelector(target);

      var tabbed = findUp(tel, 'data-tabbed');
      if (tabbed && tel.parentNode.parentNode.hasClass("jump-navigation") === false) {
        target = tabbed;
      }

      // If link is not a tab, or a full width tab
      if ((target && !tabbed) || (tabbed && tabbed.countSelector('.full-width nav') > 0)) {
        smoothScrollTo(target);
      }
    }
  }
};

module.exports = InpageNavigation;
