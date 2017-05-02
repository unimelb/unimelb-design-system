// === GTM ===
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'gtm.start': new Date().getTime(),
  event: 'gtm.js'
});

// === Tealium ===
window.utag_data = window.utag_data || {};

// Track design system version
var uomScript = document.querySelector('script[src*="uom.js"]');
if (uomScript) {
  var uomVersion = /\/v([0-9]+\.[0-9]+(?:\.[0-9]+)?)\/uom\.js/.exec(uomScript.src);
  window.utag_data.uom_version = uomVersion && uomVersion.length >= 2 ? uomVersion[1] : 'cannot-parse-version';
} else {
  window.utag_data.uom_version = 'script-not-found';
}

// Load GTM and Tealium scripts
[
  'https://www.googletagmanager.com/gtm.js?id=GTM-7JB9',
  'https://tags.tiqcdn.com/utag/unimelb/main/prod/utag.js'
].forEach(src => {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});
