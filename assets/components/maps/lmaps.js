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
  this.props.pins = this.el.getAttribute('data-pin');

  if (window.bound_lmaps[this.props.counter] !== undefined)
    window.bound_lmaps[this.props.counter].remove();

  window.bound_lmaps[this.props.counter] = L.map(this.el);
  window.bound_lmaps[this.props.counter].setView(this.props.latlng, this.props.zoom);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'unimelb.cifxgw7yf40guudlyrvtisese',
      accessToken: 'pk.eyJ1IjoidW5pbWVsYiIsImEiOiJjaWZ4Z3c5ZXo0M2R3dTdseGx0NXFyMmdiIn0.RIIkc7B1AboZclV3-JM5bA'
  }).addTo(window.bound_lmaps[this.props.counter]);

  if (this.props.pins) {
    var pins = this.props.pins.split('|');
    for (var i = pins.length - 1; i >= 0; i--) {
      L.marker(pins[i].split(',')).addTo(window.bound_lmaps[this.props.counter]);
    }
  }
}

module.exports = LMaps;
