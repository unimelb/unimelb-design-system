import easeInOutQuad from './easeInOutQuad';

/**
 * Visually scroll the viewport to the given element using custom easing.
 * @param  {element} to
 * @param  {function} cb - optional callback invoked when scrolling finishes
 */
export default function smoothScrollTo(to, cb) {
  var headerElem = document.querySelector('.page-header');

  // Incr and dur numbers are completely arbitrary, but seem good
  var start     = window.scrollY || window.pageYOffset,
      curr      = 0,
      change    = to.getBoundingClientRect().top,
      offset    = 0,
      increment = Math.abs(change / 500),
      duration  = Math.abs(change / 10);

  // If the page contains a non-floating header AND it is fixed in the current viewport, substract the height of the fixed header (40px)
  if (headerElem && !headerElem.classList.contains('floating')) {
    // Assume fixed position when unable to retrieve the computed position
    var headerPosition = window.getComputedStyle ? window.getComputedStyle(headerElem).getPropertyValue('position') : 'fixed';
    if (headerPosition === 'fixed' || headerPosition === 'absolute') {
      offset = 40;
      change -= offset;
    }
  }

  // Start scrolling
  if (change !== 0) {
    animateScroll();
  } else if (cb) {
    cb();
  }

  function animateScroll() {
    curr += increment;
    window.scrollTo(0, easeInOutQuad(curr, start, change, duration));

    if (curr < duration) {
      setTimeout(animateScroll, increment);
    } else {
      // Fix scrolling inaccuracy (always 1 or 2 pixels off without it)
      window.scrollTo(0, start + change);

      // Invoke callback if any
      if (cb) {
        cb();
      }
    }
  }
}
