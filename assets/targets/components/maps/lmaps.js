/**
 * LMaps
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function LMaps(el, props) {
  this.el = el;
  this.props = props;

  this.props.latlng = this.el.getAttribute('data-leaflet-latlng').split(',');
  this.props.zoom = parseInt(this.el.getAttribute('data-zoom')) || 15;

  this.props.map = L.map(this.el);
  this.props.map.setView(this.props.latlng, this.props.zoom);

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'examples.map-i875mjb7'
  }).addTo(this.props.map);

  if (this.el.getAttribute('data-pin')) {
    L.marker(this.el.getAttribute('data-pin').split(',')).addTo(this.props.map);
  }
}

module.exports = LMaps;
