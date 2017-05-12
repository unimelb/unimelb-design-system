var utils = require('../../utils');

var STORAGE_PREFIX = 'uom-announcement-';
var DISMISSED = 'dismissed';


function Announcement(el, props) {
  this.el = el;
  this.props = props;

  this.props.hasLocalStorage = utils.hasLocalStorage();
  this.props.parent = document.querySelector('.uomcontent');
  this.props.page = this.props.parent.querySelector('.page-inner');
  this.props.header = this.props.parent.querySelector('.page-header');

  this.checkDismissed();
  this.inject();
}

Announcement.label = 'Announcement';
Announcement.selector = '.page-announcement';

/**
 * Check whether the announcement was previously dismissed.
 */
Announcement.prototype.checkDismissed = function () {
  this.props.message = this.el.querySelector('.page-announcement__message');

  // Hash the announcement before storing
  this.props.hash = utils.hashString(this.props.message.textContent);

  // Check local storage for hash
  this.props.wasDismissed = this.props.hasLocalStorage &&
      window.localStorage.getItem(STORAGE_PREFIX + this.props.hash) === DISMISSED;
};

/**
 * Inject the announcement unless it was previously dismissed.
 */
Announcement.prototype.inject = function () {
  if (this.props.wasDismissed) return;

  // Insert announcement before header
  this.props.parent.insertBefore(this.el, this.props.header);

  // Register handler on close button
  this.props.closeBtn = this.el.querySelector('.page-announcement__close');
  this.props.closeBtn.addEventListener('click', this.dismiss.bind(this));

  // Register handler on announcement link
  // This does not close the announcement for performance reasons - it just marks it as dismissed in localStorage
  this.props.message.addEventListener('click', this.markDismissed.bind(this));
};

/**
 * Dismiss the announcement.
 */
Announcement.prototype.dismiss = function () {
  this.markDismissed();

  // Set the max-height to the current height of the announcement
  this.el.style['max-height'] = this.el.clientHeight + 'px';

  // Hide announcement after triggering a reflow
  this.el.clientHeight;
  this.hide();
};

/**
 * Mark the announcement as dismissed.
 */
Announcement.prototype.markDismissed = function () {
  this.props.wasDismissed = true;

  if (this.props.hasLocalStorage) {
    // Mark the announcement as dismissed in local storage
    localStorage.setItem(STORAGE_PREFIX + this.props.hash, DISMISSED);
  }
};

/**
 * Hide the announcement.
 */
Announcement.prototype.hide = function () {
  // Add class which sets max-height to 0
  this.el.classList.add('page-announcement--dismissed');

  // Hide the announcement to screen readers
  this.el.setAttribute('aria-hidden', true);
};

module.exports = Announcement;
