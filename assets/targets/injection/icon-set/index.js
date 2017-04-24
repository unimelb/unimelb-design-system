var IconSet = require('./iconset.es6');

/**
 * Inject icon set
 */
function InjectIconSet() {
  if (document.querySelector('#iconset')) return;

  var el = document.createElement('div');
  el.id = 'iconset';
  el.setAttribute('hidden', 'hidden');
  el.innerHTML = new IconSet().render();

  document.querySelector('.uomcontent').appendChild(el);
}

module.exports = InjectIconSet;
