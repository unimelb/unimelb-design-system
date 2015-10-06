
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
  this.props.wasDismissed = false;
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
  }
};

/**
 * Dismiss the announcement
 */
InjectAnnouncement.prototype.dismiss = function () {
  this.props.announcement.addClass('page-announcement--dismissed');
};

module.exports = InjectAnnouncement;
