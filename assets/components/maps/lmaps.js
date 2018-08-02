/**
 * Leaflet map
 * @param  {Element} el
 * @param  {Object} props
 */
function LMaps(el, props) {
  this.el = el;
  this.props = props || {};

  if (this.el.getAttribute('data-leaflet-latlng')) {
    this.props.latlng = this.el.getAttribute('data-leaflet-latlng').split(',');
  } else if (this.el.getAttribute('data-latlng')) {
    this.props.latlng = this.el.getAttribute('data-latlng').split(',');
  }
  this.props.zoom = parseInt(this.el.getAttribute('data-zoom')) || 15;
  this.props.pins = this.el.getAttribute('data-pin');

  this.props.width = parseInt(this.el.getAttribute('data-width')) || 440;
  this.props.height = parseInt(this.el.getAttribute('data-height')) || 330;

  this.map = L.map(this.el);
  this.map.setView(this.props.latlng, this.props.zoom);

  this.el.style.width = this.props.width + 'px';
  this.el.style.height = this.props.height + 'px';
  this.redraw();

	const credentials = {
    style: 'maps-unimelb/cj1rdzyxl000d2rlbhzhdt62x',
    token: 'pk.eyJ1IjoibWFwcy11bmltZWxiIiwiYSI6ImNqa2J3aDlwaDAzMmIzcnFtYm8xcnQwN2gifQ.CcmJEN3wgYOs0qclbPrw_w'
  };

	L.tileLayer('https://api.mapbox.com/styles/v1/'+ credentials.style +'/tiles/256/{z}/{x}/{y}?access_token=' + credentials.token, {
		maxZoom: 18,
		attribution: `Map data &copy; <a class="em" target="_blank" href="https://www.openstreetmap.org/#map=${this.props.zoom + 1}/${this.props.latlng[0]}/${this.props.latlng[1]}">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
		id: 'mapbox.streets'
	}).addTo(this.map);

  if (this.props.pins) {
    var pins = this.props.pins.split('|');
    for (var i = pins.length - 1; i >= 0; i--) {
      L.marker(pins[i].split(',')).addTo(this.map);
    }
  }
}

LMaps.prototype.redraw = function() {
  var e;
  if (document.createEvent) {
    e = document.createEvent("HTMLEvents");
    e.initEvent("resize", true, true);
  } else {
    e = document.createEventObject();
    e.eventType = "resize";
  }

  e.eventName = "resize";

  if (document.createEvent) {
    window.dispatchEvent(e);
  } else {
    window.fireEvent("on" + e.eventType, e);
  }
};

LMaps.label = 'LMaps';
LMaps.selector = '[data-leaflet-latlng], [data-latlng]';
LMaps.dependencies = {
  stylesheets: ['https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css'],
  scripts: ['https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js'],
  shouldLoadScripts: function () {
    return !window.L;
  }
};

module.exports = LMaps;
