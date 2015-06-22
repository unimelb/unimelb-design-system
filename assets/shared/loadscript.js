(function(root) {
  "use strict";

  // Load external js via promise
  if (typeof window.loadScript === "undefined") {
    window.loadScript = function(url, callback) {
      var Promise = require('promise');
      var p = new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
        script.addEventListener('load', resolve);
      }).done(callback);
    };
  }

})(this);
