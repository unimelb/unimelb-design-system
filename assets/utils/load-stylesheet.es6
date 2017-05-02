/**
 * Load one or more externally-hosted stylesheets.
 * @param {string|array} url - the URL of the script, or an array of URLs
 */
export default function loadStylesheet(url) {
  // Prepare array of stylesheet URLs to load
  const urls = Array.isArray(url) ? url : [url];

  // For each URL, inject a stylesheet tag into the head
  urls.forEach(url => {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = url;
    document.head.appendChild(style);
  });
}
