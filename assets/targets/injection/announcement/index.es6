
var hashString = require('../../../shared/vendor/hash-string');
var hasLocalStorage = require('../../../shared/has-local-storage')();

var STORAGE_PREFIX = 'uom-announcement-';
var DISMISSED = 'dismissed';


function InjectAnnouncement(props) {
  this.props = props;
  this.props.parent = document.querySelector('.uomcontent');
  this.props.page = this.props.parent.querySelector('.page-inner');
  this.props.header = this.props.parent.querySelector('.page-header');
  this.props.announcement = this.props.page.querySelector('.page-announcement');

  // Continue only if an announcement is present but not already injected
  if (this.props.announcement && !document.querySelector('.uomcontent > .page-announcement')) {
    this.checkDismissed();
    this.inject();
  }
}

/**
 * Check whether the announcement was previously dismissed.
 */
InjectAnnouncement.prototype.checkDismissed = function () {
  this.props.message = this.props.announcement.querySelector('.page-announcement__message');

  // Hash the announcement before storing
  this.props.hash = hashString(this.props.message.textContent || this.props.message.innerText);

  // Check local storage for hash
  // (Support for local storage goes as far back as IE8, so falling back to cookies would be excessive)
  this.props.wasDismissed = hasLocalStorage && localStorage.getItem(STORAGE_PREFIX + this.props.hash) === DISMISSED;
};

/**
 * Inject the announcement unless it was previously dismissed.
 */
InjectAnnouncement.prototype.inject = function () {
  if (!this.props.wasDismissed) {
    // Insert announcement before header
    this.props.parent.insertBefore(this.props.announcement, this.props.header);

    // Register handler on close button
    this.props.closeBtn = this.props.announcement.querySelector('.page-announcement__close');
    this.props.closeBtn.addEventListener('click', this.dismiss.bind(this));

    // Register handler on announcement link
    // This does not close the announcement for performance reasons - it just marks it as dismissed in localStorage
    this.props.message.addEventListener('click', this.markDisimissed.bind(this));
  }
};

/**
 * Dismiss the announcement.
 */
InjectAnnouncement.prototype.dismiss = function () {
  this.markDisimissed();

  // Set the max-height to the current height of the announcement
  this.props.announcement.style['max-height'] = this.props.announcement.clientHeight + 'px';

  // Hide announcement after triggering a reflow
  this.props.announcement.clientHeight;
  this.hide();
};

/**
 * Mark the announcement as dismissed.
 */
InjectAnnouncement.prototype.markDisimissed = function () {
  this.props.wasDismissed = true;

  if (hasLocalStorage) {
    // Mark the announcement as dismissed in local storage
    localStorage.setItem(STORAGE_PREFIX + this.props.hash, DISMISSED);
  }
};

/**
 * Hide the announcement.
 */
InjectAnnouncement.prototype.hide = function () {
  // Add class which sets max-height to 0
  this.props.announcement.classList.add('page-announcement--dismissed');

  // Hide the announcement to screen readers
  this.props.announcement.setAttribute('aria-hidden', true);
};

module.exports = InjectAnnouncement;
