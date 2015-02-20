//= require ./global.js
//= require ./components/forms/fancyselect
//= require ./components/forms/validation
//= require ./components/modal/modal
//= require ./components/accordion/accordion
//= require_self

window.UOMFormIcons = function() {
  var icons, page, bodyclass;

  if (/(MSIE 8.0)/g.test(navigator.userAgent)) {
    bodyclass = 'ie ie8';
  }
  if (/(MSIE 9.0)/g.test(navigator.userAgent)) {
    bodyclass = 'ie ie9';
  }
  if (/(MSIE 10.0)/g.test(navigator.userAgent)) {
    bodyclass = 'ie ie10';
  }
  if (!(document.body.hasClass('ie') || (typeof bodyclass === 'undefined'))) {
    document.body.addClass(bodyclass);
  }

  icons = document.createElement('div');
  icons.addClass('hidden');
  icons.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n  <symbol id=\"icon-search\" viewBox=\"5 5 20 20\">\n    <path d=\"M14.1,18.6c0.9,0,1.7-0.3,2.4-0.8l0.3-0.2l2.5,2.5c0.3,0.3,0.8,0,0.8-0.3c0-0.1,0-0.2-0.1-0.3L17.5,17l0.2-0.3 c0.5-0.7,0.8-1.6,0.8-2.4c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3S11.8,18.6,14.1,18.6z M14.1,10.9c1.9,0,3.4,1.5,3.4,3.4 s-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4S12.3,10.9,14.1,10.9z\"/>\n  </symbol>\n  <symbol id=\"icon-north-south\" viewBox=\"5 5 20 20\">\n    <polygon points=\"5,11.25 15,11.25 10,5 \"/>\n    <polygon points=\"5,13.75 15,13.75 10,20 \"/>\n  </symbol>\n\n</svg>";
  page = document.querySelector('.page-inner');
  return page.appendChild(icons);
};

window.UOMFormLoadComponents = function() {
  window.UOMFancySelect();
  window.UOMValid();
  window.UOMFormIcons();
  window.UOMModal();
  window.UOMAccordion();
};

if (window.attachEvent) {
  window.attachEvent('onload', window.UOMFormLoadComponents);
} else {
  document.addEventListener('DOMContentLoaded', window.UOMFormLoadComponents, false);
  document.addEventListener('page:change', function() {
    window.UOMFormLoadComponents();
  }, false);
}
