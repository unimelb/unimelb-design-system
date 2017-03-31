// Async load fonts from google
var WebFont = require("webfontloader");
WebFont.load({
  google: { families: [
    'Roboto:400,300,100,700,100italic,300italic,400italic,700italic:latin'
  ] }
});

window.UOMbind = function(component) {
  if (!component)
    return -1;

  var recs, i, attachment, Base;

  if (component === 'icons') {
    window.UOMbindIcons();
    attachment = false;

  } else if (component === 'tables') {
    attachment = 'table';

  // Non-index file
  } else if (component === 'sortable-table') {
    recs = document.querySelectorAll('table[data-sortable]');
    if (recs.length > 0) {
      Base = require('../../components/tables/sortable.js');
      for (i=recs.length - 1; i >= 0; i--)
        new Base(recs[i], {});
    }

  // Different setup proc
  } else if (component === 'announcement') {
    var Accouncement = require('../injection/announcement/index.es6');
    new Accouncement({});
  }

  if (attachment) {
    recs = document.querySelectorAll(attachment);
    if (recs.length > 0) {

      Base = require("../../components/" + component + '/index.js');

      for (i=recs.length - 1; i >= 0; i--)
        new Base(recs[i], {});
    }
  }
};

window.UOMloadComponents = function() {
  var recs = document.querySelectorAll('[data-leaflet-latlng]');
  if (recs.length > 0) {
    if (typeof(L) === 'undefined') {
      window.loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css');
      window.loadScript('https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js')
        .then(function() {
          window.bound_lmaps = [];
          lmaps_loaded_go(recs);
        });
    } else {
      lmaps_loaded_go(recs);
    }
  }

  if (document.querySelector('[data-latlng], [data-address]')) {
    if (typeof(google) === 'undefined') {
      // GMaps loads via global callback
      window.loadScript('https://maps.googleapis.com/maps/api/js?key=' + process.env.GMAPSJSAPIKEY + '&callback=maps_loaded_go');
    } else {
      maps_loaded_go();
    }
  }
};

// GMaps callback
window.maps_loaded_go = function() {
  var GMaps = require("../../components/maps/gmaps.es6");
  for (var recs = document.querySelectorAll('[data-latlng],[data-address]'), i=recs.length - 1; i >= 0; i--)
    new GMaps(recs[i], {counter: i});
};

// LMaps callback
window.lmaps_loaded_go = function(recs) {
  var LMaps = require("../../components/maps/lmaps");
  for (var i=recs.length - 1; i >= 0; i--)
    new LMaps(recs[i], {counter: i});
};

document.addEventListener('DOMContentLoaded', window.UOMloadComponents, false);
document.addEventListener('page:load', window.UOMloadComponents, false);
document.addEventListener('page:restore', window.UOMloadComponents, false);
