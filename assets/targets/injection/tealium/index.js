(function () {
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
  (function(a,b,c,d){
    a='//tags.tiqcdn.com/utag/unimelb/main/prod/utag.js';
    b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
    a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
  })();
})();
