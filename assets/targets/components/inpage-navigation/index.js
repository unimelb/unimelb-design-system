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
  if (e.target.nodeName === 'A') {
    var target = e.target.getAttribute('href');

    if (target) {
      if (target != "#" && target != "#sitemap") {
        e.preventDefault();
        target = document.querySelector(target);

        var tabbed = findUp(e.target, 'data-tabbed');
        if (tabbed && e.target.parentNode.parentNode.hasClass("jump-navigation") === false) {
          target = tabbed;
        }

        // If link is not a tab, or a full width tab
        if ((target && !tabbed) || (tabbed && tabbed.countSelector('.full-width nav') > 0)) {
          smoothScrollTo(target);
        }
      }
    }
  }
};

module.exports = InpageNavigation;
