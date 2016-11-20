/**
 * Load one or more externally-hosted stylesheets.
 * @param {String|Array} url - the URL of the script, or an array of URLs
 */
function loadStylesheet(url) {
  // Prepare array of stylesheet URLs to load
  var urls = Array.isArray(url) ? url : [url];

  // For each URL, inject a stylesheet tag into the head
  urls.forEach(function (url) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = url;
    document.head.appendChild(style);
  });
}

// Export function
module.exports = loadStylesheet;
