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

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'unimelb.cifxgw7yf40guudlyrvtisese',
      accessToken: 'pk.eyJ1IjoidW5pbWVsYiIsImEiOiJjaWZ4Z3c5ZXo0M2R3dTdseGx0NXFyMmdiIn0.RIIkc7B1AboZclV3-JM5bA'
  }).addTo(this.props.map);

  if (this.el.getAttribute('data-pin')) {
    L.marker(this.el.getAttribute('data-pin').split(',')).addTo(this.props.map);
  }
}

module.exports = LMaps;
