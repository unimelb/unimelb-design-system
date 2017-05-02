window.utag_data = window.utag_data || {};

// Track design system version
var uomScript = document.querySelector('script[src*="uom.js"]');
if (uomScript) {
  var uomVersion = /\/v([0-9]+\.[0-9]+(?:\.[0-9]+)?)\/uom\.js/.exec(uomScript.src);
  window.utag_data.uom_version = uomVersion.length >= 2 ? uomVersion[1] : 'cannot-parse-version';
} else {
  window.utag_data.uom_version = 'script-not-found';
}

// Load Tealium
var utag = document.createElement('script');
utag.src = 'https://tags.tiqcdn.com/utag/unimelb/main/prod/utag.js';
utag.async = true;

var firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(utag, firstScript);
