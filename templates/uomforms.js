//= require ./global.js
//= require ./components/forms/validation
//= require ./components/modal/modal
//= require_self

window.UOMformIcons = function() {
  var icons, page;
  icons = document.createElement('div');
  icons.addClass('hidden');
  icons.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n  <symbol id=\"icon-search\" viewBox=\"5 5 20 20\">\n    <path d=\"M14.1,18.6c0.9,0,1.7-0.3,2.4-0.8l0.3-0.2l2.5,2.5c0.3,0.3,0.8,0,0.8-0.3c0-0.1,0-0.2-0.1-0.3L17.5,17l0.2-0.3 c0.5-0.7,0.8-1.6,0.8-2.4c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3S11.8,18.6,14.1,18.6z M14.1,10.9c1.9,0,3.4,1.5,3.4,3.4 s-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4S12.3,10.9,14.1,10.9z\"/>\n  </symbol>\n</svg>";
  page = document.querySelector('.page-inner');
  return page.appendChild(icons);
};

window.UOMformloadComponents = function() {
  window.UOMformIcons();
  window.UOMValid();
  window.UOMModal();
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMformloadComponents);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMformloadComponents, false);
  document.addEventListener('page:change', function() {
    window.UOMformloadComponents();
  }, false);
}
