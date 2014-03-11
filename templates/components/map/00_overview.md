## When to use this component

The map component is especially useful when trying to describe a location. 
## When to avoid this component? 

## Content recommendations

## Planning tools 

The map components requires that you know the latitude and longditude of the location you are referencing to a high degree of fidelity. 

// Need to find a foolproof way to find a latlng for this piece. The easiest way to find a LATLGN for a specific place is to...

## Examples

### Good examples

### Poor examples

## References

## Implementation

Basic google map (v3), with a few options:

* Pin with different LatLng to center
* Set width and height of object
* Set initial zoom
* Alternate greyscale style

Anything more complex should work directly on the google maps API.

### Dependencies

[Google Maps API](https://developers.google.com/maps/)

### Options

<ul class="nobullet">
  <li><code>data-latlng</code> &ndash; Comma separated LatLng for map center <small>required</small></li>
  <li><code>data-width</code> &ndash; Width in px (default 400) <small class="opt">optional</small></li>
  <li><code>data-height</code> &ndash; Height in px (default 300) <small class="opt">optional</small></li>
  <li><code>data-zoom</code> &ndash; Initial zoom (default 17) <small class="opt">optional</small></li>
  <li><code>data-pin</code> &ndash; Comma separated LatLng for pin  <small class="opt">optional</small></li>
  <li><code>data-grayscale</code> &ndash; Alternate style  <small class="opt">optional</small></li>
</ul>
    
## Implementation Examples
