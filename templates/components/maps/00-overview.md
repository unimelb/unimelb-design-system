<div class="jumpnav"></div>
## Overview

Adding a map to a page is a great way to describe a location in addition to a text-based description. This component uses the Google Maps API to embed a functional google map into one of your pages easily.

To use the Maps component, you will need to know the latitude and longitude of the location you are looking to map. These can be found easily using [Google Maps](http://maps.google.com) (the latitude and longitude can be found in the url) or a service like [itouchmap.com](http://itouchmap.com/latlong.html).

## Implementation

Basic google map (v3), with a few options:

* Pin with different LatLng to center
* Set width and height of object
* Set initial zoom
* Alternate greyscale style

Anything more complex should work directly on the google maps API.

## Dependencies

[Google Maps API](https://developers.google.com/maps/)

## Options

<ul class="nobullet">
  <li><code>data-latlng</code> &ndash; Comma separated LatLng for map center <small>required</small></li>
  <li><code>data-width</code> &ndash; Width in px (default 400) <small class="opt">optional</small></li>
  <li><code>data-height</code> &ndash; Height in px (default 300) <small class="opt">optional</small></li>
  <li><code>data-zoom</code> &ndash; Initial zoom (default 17) <small class="opt">optional</small></li>
  <li><code>data-pin</code> &ndash; Comma separated LatLng for pin  <small class="opt">optional</small></li>
  <li><code>data-grayscale</code> &ndash; Alternate style  <small class="opt">optional</small></li>
</ul>
