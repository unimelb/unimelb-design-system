/**
 * GMaps
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function GMaps(el, props) {
  this.el = el;
  this.props = props;

  this.props.width = parseInt(this.el.getAttribute('data-width')) || 400;
  this.props.height = parseInt(this.el.getAttribute('data-height')) || 300;
  this.props.zoom = parseInt(this.el.getAttribute('data-zoom')) || 17;
  this.props.pins = this.el.getAttribute('data-pin');

  if (this.el.hasAttribute('data-latlng')) {
    // ES6 ;_; [this.props.lat, this.props.lng] = this.el.getAttribute('data-latlng').split(',');
    var ll = this.el.getAttribute('data-latlng').split(',');
    this.props.lat = ll[0];
    this.props.lng = ll[1];

    this.props.options = {
      center:      new google.maps.LatLng(this.props.lat, this.props.lng),
      zoom:        this.props.zoom,
      scrollwheel: false,
      mapTypeId:   google.maps.MapTypeId.ROADMAP
    };
    this.draw();
  }

  if (this.el.hasAttribute('data-address'))
    this.geolookup();
}

GMaps.prototype.draw = function() {
  this.el.style.width = this.props.width + 'px';
  this.el.style.height = this.props.height + 'px';
  this.props.map = new google.maps.Map(this.el, this.props.options);

  if (this.props.pins) {
    this.markers();
  }

  if (this.el.hasAttribute('data-grayscale')) {
    this.stylemap();
  }
};

GMaps.prototype.geolookup = function() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: this.el.getAttribute('data-address') }, this.handleResult.bind(this));
};

GMaps.prototype.handleResult = function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    this.props.options = {
      center:      results[0].geometry.location,
      zoom:        this.props.zoom,
      scrollwheel: false,
      mapTypeId:   google.maps.MapTypeId.ROADMAP
    };
    this.draw();
  }
};

GMaps.prototype.markers = function() {
  var pins = this.props.pins.split('|');
  for (var i = pins.length - 1; i >= 0; i--) {
    var ll = pins[i].split(',');
    new google.maps.Marker({
      map:      this.props.map,
      position: new google.maps.LatLng(ll[0], ll[1])
    });
  }
};

GMaps.prototype.stylemap = function() {
  var styleOptions = [{
    stylers: [
     { hue: '#203D65' }, { saturation: -80 }
    ]
  }];
  var styledMap = new google.maps.StyledMapType(styleOptions, { name: 'Styled Map' });
  this.props.map.mapTypes.set('map_style', styledMap);
  this.props.map.setMapTypeId('map_style');
};

module.exports = GMaps;
