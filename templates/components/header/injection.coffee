class NavState
  constructor: ->
    @page = document.querySelector('.page-inner')
    @localnav = document.querySelector('div[role="navigation"]')
    @sitemap = document.querySelector('div[role="sitemap"]')
    t = this

    document.querySelector('.page-header-tools a[title="Menu"]').addEventListener 'click', (e) ->
      if t.page.offsetWidth > 768
        e.preventDefault()
        t.page.removeClass('evolve')
        t.localnav.removeClass('evolve')
        t.sitemap.removeClass('active')
        t.page.toggleClass('active')
        t.localnav.toggleClass('active')

    @localnav.querySelector('h2:first-child').addEventListener 'click', (e) ->
      e.preventDefault()
      t.switch(t)

    @localnav.querySelector('.sitemap-label').addEventListener 'click', (e) ->
      e.preventDefault()
      t.switch(t)

  switch: (t) ->
    t.page.toggleClass('evolve')
    t.localnav.toggleClass('evolve')
    t.sitemap.toggleClass('active')

# Header
if Array.prototype.slice.call(document.querySelectorAll('div[role="main"].skip-header')).length==0
  block = document.createElement('div')
  block.addClass('page-header')
  block.innerHTML = """
  <header>
    <a class="page-header-logo" href="http://www.unimelb.edu.au">
    <!--[if lt IE 9]>
      <img alt="UoM Logo" src="/assets/components/header/header-logo-192bc4fc856e753fa3ae99bbe58e8af7.png" /><![endif]-->
    <!--[if gte IE 9]><!--><img alt="UoM Logo" src="/assets/components/header/header-logo-1934166fed7fa00bf1e069d490c4e5fd.svg"><!--<![endif]-->
    </a>
    <div class="page-header-navigation">
      <a href="https://unimelb.edu.au" title="The University of Melbourne">The University of Melbourne</a>
    </div>
    <div class="page-header-tools">
      <a class="page-header-icon menu" href="#sitemap" title="Menu">
      <!--[if lt IE 9]>
        <img alt="" src="/assets/components/header/menu-e38e5801aa0e2e4eb23e375093157f92.png" />
      <![endif]-->
      <!--[if gte IE 9]><!-->
        <img alt="" src="/assets/components/header/menu-783164750fe6981e545a91b4d63bf863.svg">
      <!--<![endif]-->Menu
      </a>
    </div>
  </header>
  """
  parent = document.querySelector('.page-inner')
  parent.insertBefore(block, parent.firstChild)

  if Array.prototype.slice.call(document.querySelectorAll('.page-local-history')).length==1
    local = document.querySelector('.page-local-history')
    local.parentNode.removeChild(local)

    parent = document.querySelector('.page-header-navigation')
    sep = document.createElement "span"
    sep.innerHTML = "/"
    parent.appendChild(sep)
    parent.appendChild(local)

# Global Nav
if Array.prototype.slice.call(document.querySelectorAll('div[role="navigation"]')).length==1
  localnav = document.querySelector('div[role="navigation"]')
  localnav.removeClass('no-js')

  trigger = document.createElement('div')
  trigger.addClass('sitemap-label')
  trigger.innerHTML = "University Sitemap"
  localnav.appendChild(trigger)

  nav = document.createElement('div')
  nav.setAttribute('role', 'sitemap')
  nav.innerHTML = """
  <form>
    <fieldset>
      <div class="inline">
        <input data-required placeholder="Search" name="f[search]" type="search" title="Please enter a keyword." />
        <input type="image" src="/assets/images/search-w.png">
      </div>
    </fieldset>
  </form>
  """
  document.querySelector('body').appendChild(nav)

  # Nav link states
  navstate = new NavState()

# Footer
block = document.createElement('div')
block.addClass('page-footer')
block.innerHTML = """
<footer>
  <a href="https://unimelb.edu.au">
    <img alt="The University of Melbourne" class="page-footer-lockup" src="/assets/components/footer/lockup-ed77b523b7a63d3eecc814b659716ae8.png">
  </a>
  <ul class="page-footer-section nav">
    <li><a href="http://safety.unimelb.edu.au/about/contacts/emergency.html">Emergency Information</a></li>
    <li><a href="http://www.unimelb.edu.au/disclaimer/">Disclaimer &amp; Copyright</a></li>
    <li><a href="http://www.unimelb.edu.au/accessibility/index.html">Accessibility</a></li>
    <li><a href="http://www.unimelb.edu.au/disclaimer/privacy.html">Privacy</a></li>
  </ul>
  <ul class="page-footer-section social">
    <li class="social-facebook"><a href="http://www.facebook.com/melbuni"><img alt="Facebook" src="/assets/components/footer/fb-e9b850d4238309570da9eb8b7cb3b286.png"></a></li>
    <li class="social-twitter"><a href="http://www.twitter.com/unimelb"><img alt="Twitter" src="/assets/components/footer/tw-7eec1ff39bee826791779bc93afdc3ba.png"></a></li>
    <li class="social-linkedin"><a href="http://au.linkedin.com/pub/the-university-of-melbourne/61/430/215"><img alt="LinkedIn" src="/assets/components/footer/li-c7042edb2f977b63beff6dadaa7c8ff6.png"></a></li>
  </ul>
  <img alt="Est. 1853" class="page-footer-est1853" src="/assets/components/footer/est1853-b875ccd020df349069de030ac95c6437.png">
  <small>Phone: 13 MELB (13 6352) | International: +61 3 9035 5511</small><small>The University of Melbourne ABN: 84 002 705 224</small>
  <small>CRICOS Provider Code: 00116K (<a href="http://www.services.unimelb.edu.au/international/visas/index.html">visa information</a>)</small>
</footer>
"""
document.querySelector('body').appendChild(block)
