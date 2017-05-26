var cssesc = require('cssesc');
var utils = require('utils');

/**
 * In-page Navigation
 * @param  {Element} el
 * @param  {Object} props
 */
function InPageNavigation(el, props) {
  this.el = el;
  this.props = props || {};
  this.el.addEventListener('click', this.delegateScroll.bind(this));
}

InPageNavigation.label = 'InPageNavigation';
InPageNavigation.selector = [
  'a[href^="#"]',
  ':not([href="#"])', // no target
  ':not([href="#sitemap"])', // global nav
  ':not([data-no-scroll])', // opt-out attribute
  ':not([data-modal-target])', // modal triggers
  ':not([role="tab"])' // tabs
].join('');

InPageNavigation.prototype.delegateScroll = function (evt) {
  evt.preventDefault();

  // Find target
  var selector = evt.currentTarget.getAttribute('href');
  var id = cssesc(selector.substr(1), { 'isIdentifier': true });
  var target = document.querySelector('#' + id);

  // Smooth-scroll to target
  if (target) {
    utils.smoothScrollTo(target);
  }
};

module.exports = InPageNavigation;
