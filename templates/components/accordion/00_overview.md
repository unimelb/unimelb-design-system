## Implementation
Modular open/close content sections, with gracefully degrading CSS3 animation.

## Dependencies
Some minor DOM extensions (IE8+ only)

## Options
<ul class="nobullet">
  <li><code>.accordion__title</code> &ndash; Toggle switch open/close <small>required</small></li>
  <li><code>.accordion__hidden</code> &ndash; Content container (hidden by default), must be next adjacent element to toggle switch <small>required</small></li>
  <li><code>.accordion__noanim</code> &ndash; Disable animation <small class="opt">optional</small></li>
  <li><code>.accordion__visible</code> &ndash; Accordion container is visible by default <small class="opt">optional</small></li>
  <li><code>data-single-focus</code> &ndash; Close all other sections when opening an accordion <small class="opt">optional</small></li>
</ul>

<em>* The animation is CSS3 transition-based, so most of the options are tied to classes.</em>

The two parts (toggle switch and content container) must be wrapped inside their own container, but this can be any block level element.

## Example
