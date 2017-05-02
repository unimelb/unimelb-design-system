/**
 * Load one or more externally-hosted scripts.
 * @param {string|array} url - the URL of the script, or an array of URLs
 * @return {Promise} - promise that resolves when all scripts have loaded
 */
export default function loadScript(url) {
  // Prepare array of script URLs to load
  const urls = Array.isArray(url) ? url : [url];

  // For each URL, create a promise that injects a script tag into the DOM and resolves when the script has loaded
  const promises = urls.map(url => {
    return new Promise((resolve, reject) => {
      // Create script element
      const script = document.createElement('script');
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
