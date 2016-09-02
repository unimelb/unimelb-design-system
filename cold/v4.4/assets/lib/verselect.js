(function(root) {
  window.buildVersionToolbar = function() {
    "use strict";

    var versions = [
      'v4.4'
    ];

    var supported = [
      'v4.4'
    ];

    var toolbar = document.querySelector('#version-toolbar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.id = 'version-toolbar';
      var nav = document.createElement('ul');
      var current = document.body.getAttribute('data-version');

      for (var i=0,max=versions.length; i<max; i++) {
        var li = document.createElement('li');
        var v = versions[i];
        if (v===current)
          li.classList.add('selected');

        var isSupported = 0;
        for (var j in supported)
          if (v===supported[j])
            isSupported++;

        if (isSupported===0) {
          li.innerHTML = v;
        } else {
          li.classList.add('supported');
          li.innerHTML = '<a href="'+window.location.pathname+'">'+v+'</a>';
        }

        nav.appendChild(li);
      }
      toolbar.appendChild(nav);

      document.body.insertBefore(toolbar, document.body.firstChild);
    }
  };

  if (window.attachEvent) {
    window.attachEvent('onload', window.buildVersionToolbar);
  } else {
    document.addEventListener('DOMContentLoaded', window.buildVersionToolbar, false);
    document.addEventListener('page:load', window.buildVersionToolbar, false);
    document.addEventListener('page:restore', window.buildVersionToolbar, false);
  }
})(this);
