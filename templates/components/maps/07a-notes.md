The above component provides a simple alternative to google maps, using Leaflet.js with Open Street Map data.

To use this provider instead, use the attr <code>data-leaflet-latlng</code> instead of <code>data-latlng</code> used in the google examples.

Differences to the gmap: height and width are not needed (this map will expand to fill its container), and there is no grayscale option at the moment. <code>data-pin</code> and <code>data-zoom</code> will work as expected.
