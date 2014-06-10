window.UOMinjectFooter= ->
  # Only inject footer if it doesn't already exist
  if document.countSelector('.page-footer') == 0
    block = document.createElement('div')
    block.addClass('page-footer')
    block.innerHTML = """
    <footer>
      <a class="unimelb-lge" href="https://unimelb.edu.au">The University of Melbourne</a>
      <ul class="page-footer-section nav">
        <li>
          <a href="http://safety.unimelb.edu.au/about/contacts/emergency.html">Emergency Information</a>
        </li>
        <li>
          <a href="http://www.unimelb.edu.au/disclaimer/">Disclaimer &amp; Copyright</a>
        </li>
        <li>
          <a href="http://www.unimelb.edu.au/accessibility/index.html">Accessibility</a>
        </li>
        <li>
          <a href="http://www.unimelb.edu.au/disclaimer/privacy.html">Privacy</a>
        </li>
      </ul>
      <ul class="page-footer-section social">
        <li class="social-facebook">
          <a href="http://www.facebook.com/melbuni">Facebook</a>
        </li>
        <li class="social-twitter">
          <a href="http://www.twitter.com/unimelb">Twitter</a>
        </li>
        <li class="social-linkedin">
          <a href="http://au.linkedin.com/pub/the-university-of-melbourne/61/430/215">LinkedIn</a>
        </li>
      </ul>
      <span class="page-footer-est1853">Est. 1853</span>
      <small>Phone: 13 MELB (13 6352) | International: +61 3 9035 5511</small>
      <small>The University of Melbourne ABN: 84 002 705 224</small>
      <small>CRICOS Provider Code: 00116K (<a href="http://www.services.unimelb.edu.au/international/visas/index.html">visa information</a>)</small>
    </footer>
    """
    document.querySelector('.page-inner').appendChild(block)
