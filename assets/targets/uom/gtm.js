window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'gtm.start': new Date().getTime(),
  event: 'gtm.js'
});

var gtm = document.createElement('script');
gtm.async = true;
gtm.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-7JB9';

var firstScript= document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(gtm, firstScript);
