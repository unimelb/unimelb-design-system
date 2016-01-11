(function(root) {
  "use strict";

  if (typeof Math.easeInOutQuad === "undefined") {
    Math.easeInOutQuad = function(curr, start, change, duration) {
      curr /= duration/2;
      if (curr < 1) {
        return change/2 * curr * curr + start;
      } else {
        curr--;
        return -change/2 * (curr*(curr-2) - 1) + start;
      }
    };
  }

  /**
   * Visually scroll viewport to inner page element (to) using custom easing,
   * expose function to global scope
   *
   * @param  {Element} to
   */
  if (typeof window.smoothScrollTo === "undefined") {
    window.smoothScrollTo = function(to, cb) {
      var element = document.body,
          headerElem = document.querySelector('.page-header');
      
      if (/(Firefox)/g.test(navigator.userAgent) || /(Trident)/g.test(navigator.userAgent)) {
        element = document.querySelector('html');
      }

      // Incr and dur numbers are completely arbitrary, but seem good
      var start     = element.scrollTop,
          curr      = 0,
          change    = to.getBoundingClientRect().top,
          offset    = 0,
          increment = Math.abs(change / 500),
          duration  = Math.abs(change / 10);
      
      // If the page contains a non-floating header AND it is fixed in the current viewport, substract the height of the fixed header (40px)
      if (headerElem && !headerElem.hasClass('floating')) {
        // Assume fixed position when unable to retrieve the computed position (e.g. in IE8)
        var headerPosition = window.getComputedStyle ? window.getComputedStyle(headerElem).getPropertyValue('position') : 'fixed';
        if (headerPosition === 'fixed' || headerPosition === 'absolute') {
          offset = 40;
        }
      }
      
      // Deduct offset
      change -= offset;
      
      var animateScroll = function(cb) {
        curr += increment;
        element.scrollTop = Math.easeInOutQuad(curr, start, change, duration);
        if (curr < duration) {
          setTimeout(animateScroll, increment);
        } else {
          // Fix scrolling inaccuracy (always 1 or 2 pixels off without it)
          element.scrollTop += to.getBoundingClientRect().top - offset;
          
          // Invoke callback if any
          if (cb) {
            cb();
          }
        }
      };

      if (change !== 0) {
        animateScroll(cb);
      }
    };
  }
})(this);
