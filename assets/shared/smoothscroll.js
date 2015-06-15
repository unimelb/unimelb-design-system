function SmoothScroll() {
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
    window.smoothScrollTo = function(to) {
      var element = document.body;
      if (/(Firefox)/g.test(navigator.userAgent) || /(Trident)/g.test(navigator.userAgent)) {
        element = document.querySelector('html');
      }

      var duration  = 600;
      var start     = element.scrollTop;
      var curr      = 0;
      var increment = 10;
      var change    = to.offsetTop - start;

      if (document.countSelector('.floating') === 0) {
        change -= 40;
      }

      var animateScroll = function() {
        curr += increment;
        element.scrollTop = Math.easeInOutQuad(curr, start, change, duration);
        if (curr < duration)
          setTimeout(animateScroll, increment);
      };

      if (change !== 0) {
        animateScroll();
      }
    };
  }
}

module.exports = SmoothScroll;
