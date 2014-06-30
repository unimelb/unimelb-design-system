//= require ./global.js
//= require_tree ./components
//= require_self

window.UOMloadComponents = function() {
  window.UOMAccordion()
  window.UOMExtraLabel()
  window.UOMValid()
  window.UOMListFilter()
  window.UOMGMap()
  window.UOMModal()
  window.UOMInpageScrolling()
  window.UOMFeed()
  window.UOMTabs()
  window.UOMYtEmbed()
};

if (!window.attachEvent) {
  document.addEventListener('page:change', function() {
    window.UOMloadComponents();
  }, false);
}
