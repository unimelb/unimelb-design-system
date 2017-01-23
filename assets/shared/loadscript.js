/**
 * Load one or more externally-hosted scripts.
 * @param {String|Array} url - the URL of the script, or an array of URLs
 * @return {Promise} - promise that resolves when all scripts have loaded
 */
function loadScript(url) {
  // Prepare array of script URLs to load
  var urls = Array.isArray(url) ? url : [url];

  // For each URL, create a promise that injects a script tag into the DOM and resolves when the script has loaded
  var promises = urls.map(function (url) {
    return new Promise(function (resolve, reject) {
      // Create script element
      var script = document.createElement('script');
      script.src = url;

      // Resolve or reject
      script.addEventListener('load', resolve);
      script.addEventListener('error', reject);

      // Inject script
      document.body.appendChild(script);
    });
  });

  // Return a promise that resolves when all of the scripts have loaded
  return Promise.all(promises);
}

// Export function
module.exports = loadScript;
