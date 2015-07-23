(function(root) {
  "use strict";

  var bodyclass = '';

  if (/(MSIE 8.0)/g.test(navigator.userAgent))
    bodyclass = 'ie ie8';
  else if (/(MSIE 9.0)/g.test(navigator.userAgent))
    bodyclass = 'ie ie9';
  else if (/(MSIE 10.0)/g.test(navigator.userAgent))
    bodyclass = 'ie10';
  else if (/(Trident\/7.0)/g.test(navigator.userAgent))
    bodyclass = 'ie11';

  if (!document.body.hasClass('ie') || (typeof bodyclass !== 'undefined')) {
    document.body.addClass(bodyclass);
  }

  // Create page wrapper if it doesn't already exist
  var parent = document.querySelector('.uomcontent');
  if (!parent) {
    parent = document.createElement('div');
    parent.addClass('uomcontent');
    document.body.appendChild(parent);
  }

  var page = document.querySelector('.page-inner');
  if (!page) {
    page = document.createElement('div');
    page.addClass('page-inner');

    for (var nodes=document.body.childNodes, i=nodes.length - 1; i >= 0; i--) {
      if (nodes[i] && nodes[i] != parent) {
        var move = document.body.removeChild(nodes[i]);
        page.appendChild(move);
      }
    }

    parent.appendChild(page);
  }
})(this);
