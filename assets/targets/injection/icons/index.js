/**
 * Icons
 *
 * @param  {Object} props
 */
function Icons() {
  "use strict";

  var el = document.querySelector('div#iconset.hidden');

  if (!el) {
    // Require ES6 for multiline enclosure
    var Set = require('./iconset.es6'),
        page = document.querySelector('.uomcontent');

    el = document.createElement('div');
    el.addClass('hidden');
    el.id = 'iconset';
    el.innerHTML = new Set().render();

    page.appendChild(el);
  }
}

module.exports = Icons;