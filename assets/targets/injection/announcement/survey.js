(function(root) {

  if (document.cookie.replace(/(?:(?:^|.*;\s*)UOMsurveyTaken\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true" && document.countSelector('.page-announcement') === 0) {
    var body = document.body,
        content = document.createElement('div');

    content.setAttribute('class', 'page-announcement');
    content.id = 'UOMannounce';
    content.innerHTML = '<a class="page-announcement__message" target="_blank" href="https://www.surveymonkey.com/r/JP3VPSV"><h2>Do you have a minute?</h2><p>Help us improve our website by completing a short survey.</p></a><button id="UOMannounceClose" class="page-announcement__close" type="button">&times;</button>';

    body.insertBefore(content, body.firstChild);
    body.addClass('with-announcement');

    var el = document.getElementById('UOMannounce');

    // Hide on dismiss
    document.getElementById('UOMannounceClose').addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.style.display = 'none';
      document.body.removeClass('with-announcement');

      // Dismiss forever, practically
      document.cookie = "UOMsurveyTaken=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    });

    // Hide on link click
    el.addEventListener('click', function(e) {
      this.style.display = 'none';
      document.body.removeClass('with-announcement');

      // Dismiss forever, practically
      document.cookie = "UOMsurveyTaken=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    });
  }

})(this);
