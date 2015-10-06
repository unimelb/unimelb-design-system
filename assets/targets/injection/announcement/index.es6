
function InjectAnnouncement() {
  this.el = document.querySelector('.page-announcement');

  if (this.el) {
    // Only add if no announcement has been injected yet
    if (document.countSelector('.uomcontent > .page-announcement') === 0) {
      this.props = {};
      this.props.parent = document.querySelector('.uomcontent');
      this.props.header = document.querySelector('.page-header');
      this.props.page = document.querySelector('.page-inner');

      this.renderAnnouncement();
    }
  }
}

InjectAnnouncement.prototype.renderAnnouncement = function () {
  // Insert announcement before header
  this.props.parent.insertBefore(this.el, this.props.header);
};

module.exports = InjectAnnouncement;
