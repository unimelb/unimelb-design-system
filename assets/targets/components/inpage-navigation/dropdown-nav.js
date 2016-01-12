/**
 * Drop-down navigation
 * @param  {Element} el
 * @param  {Object} props
 */
function DropdownNav(el, props) {
  this.el = el;
  this.props = props || {};
  this.props.btn = this.el.querySelector('.dropdown-nav__btn');
  this.props.list = this.el.querySelector('.dropdown-nav__list');
  this.props.firstLink = this.props.list.querySelectorAll('.dropdown-nav__link')[0];

  // Event bindings, exclude noscroll and modal and rebind
  if (!this.el.hasAttribute('data-bound')) {
    this.props.btn.addEventListener('click', this.toggle.bind(this));
    this.props.btn.addEventListener('keypress', function (evt) {
      if (evt.keyCode === 13) {
        evt.preventDefault(); // Prevent key-press events from triggering clicks
        this.toggle(evt, true);
      }
    }.bind(this));
    
    this.el.setAttribute('data-bound', true);
  }
}

/**
 * Expand or collapse the drop-down menu.
 * @param {Boolean} focus - whether to give focus to the first link after expanding
 */
DropdownNav.prototype.toggle = function(evt, focus) {
  if (this.el.getAttribute('aria-expanded') === 'false') {
    // Expand
    this.el.setAttribute('aria-expanded', 'true');
    this.props.list.removeAttribute('hidden');
  
    if (focus) {
      // Give focus to the first link in the list
      this.props.firstLink.focus();
    }
  } else {
    // Collapse
    this.el.setAttribute('aria-expanded', 'false');
    this.props.list.setAttribute('hidden', 'hidden');
  }
};

module.exports = DropdownNav;
