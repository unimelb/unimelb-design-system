//= require ./global.js
//= require_tree ./components
//= require_self

window.UOMloadComponents = function() {
  window.UOMAccordion()
  window.UOMExtraLabel()
  window.UOMformIcons();
  window.UOMValid()
  window.UOMListFilter()
  window.UOMGMap()
  window.UOMModal()
  window.UOMTabs()
  window.UOMInpageScrolling()
  window.UOMStickyNav()
  window.UOMUnlockChecklist()
  window.UOMInnerNavTab()
  window.UOMYtEmbed() // unused?
};

if (!window.attachEvent) {
  document.addEventListener('page:change', function() {
    window.UOMloadComponents();
  }, false);
}
