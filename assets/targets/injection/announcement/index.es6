
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
  if (this.props.announcement && document.countSelector('.uomcontent > .page-announcement') === 0) {
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
  this.props.hash = hashString(this.props.message.text);
  
  // Check local storage for hash
  // (Support for local storage goes as far back as IE8, so falling back to cookies would be excessive)
  this.props.wasDismissed = hasLocalStorage && localStorage.getItem(STORAGE_PREFIX + this.props.hash) === DISMISSED;
};

/**
 * Inject the announcement unless it was previously dismissed.
 */
InjectAnnouncement.prototype.inject = function () {
  // Insert announcement before header
  this.props.parent.insertBefore(this.props.announcement, this.props.header);
  
  if (this.props.wasDismissed) {
    this.hide();
  } else {
    // Set max-height to height of element
    this.props.announcement.style['max-height'] = this.props.announcement.clientHeight + 'px';
    
    // Register handler on close button
    this.props.closeBtn = this.props.announcement.querySelector('.page-announcement__close');
    this.props.closeBtn.addEventListener('click', this.dismiss.bind(this));
  }
};

/**
 * Dismiss the announcement
 */
InjectAnnouncement.prototype.dismiss = function () {
  this.props.wasDismissed = true;
  
  if (hasLocalStorage) {
    // Mark the announcement as dismissed in local storage
    localStorage.setItem(STORAGE_PREFIX + this.props.hash, DISMISSED);
  }
  
  this.hide();
};

/**
 * Hide the announcement.
 */
InjectAnnouncement.prototype.hide = function () {
  this.props.announcement.addClass('page-announcement--dismissed');
  
  // Current implementation of closing animation (max-height) prevents the use of `display:none`
  // Hide the announcement to screen readers with ARIA
  this.props.announcement.setAttribute('aria-hidden', true);
};

module.exports = InjectAnnouncement;
