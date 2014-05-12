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
      if t.page.hasClass "evolve"
        t.page.toggleClass('evolve')
        t.localnav.toggleClass('evolve')
        t.sitemap.toggleClass('active')
      else
        t.page.removeClass('evolve')
        t.localnav.removeClass('evolve')
        t.sitemap.removeClass('active')
        t.page.toggleClass('active')
        t.localnav.toggleClass('active')

    @localnav.querySelector('.sitemap-label').addEventListener 'click', (e) ->
      e.preventDefault()
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
  <h2>University of Melbourne</h2>
  <form>
    <fieldset>
      <div class="inline">
        <input data-required placeholder="Search" name="f[search]" type="search" title="Please enter a keyword." />
        <input type="image" src="/assets/images/search-w.png">
      </div>
    </fieldset>
  </form>
  <div class="col-2">
    <h2><a href="#">Study at Melbourne</a></h2>
    <ul>
      <li><a href="#">Undergraduate</a></li>
      <li><a href="#">Graduate coursework</a></li>
      <li><a href="#">PhD &amp; research programs</a></li>
      <li><a href="#">International</a></li>
      <li><a href="#">Professional, executive &amp; community education</a></li>
      <li><a href="#">Schools &amp; parents</a></li>
      <li><a href="#">Student life @ Melbourne</a></li>
      <li><a href="#">Campus &amp; facilities</a></li>
    </ul>
    <h2><a href="#">About us</a></h2>
    <ul>
      <li><a href="#">International connections</a></li>
      <li><a href="#">Governance &amp; leadership</a></li>
      <li><a href="#">Strategy &amp; vision</a></li>
      <li><a href="#">Profile &amp; achievements</a></li>
      <li><a href="#">Faculties &amp; graduate schools</a></li>
      <li><a href="#">Policy &amp; publications</a></li>
      <li><a href="#">News</a></li>
      <li><a href="#">Events</a></li>
    </ul>
    <h2><a href="#">Research</a></h2>
    <ul>
      <li><a href="#">About research at Melbourne</a></li>
      <li><a href="#">Working at Melbourne</a></li>
      <li><a href="#">Research centres, institutes &amp; offices</a></li>
      <li><a href="#">Current research programs &amp; projects</a></li>
      <li><a href="#">Scholarships &amp; support</a></li>
      <li><a href="#">PhD &amp; research programs</a></li>
      <li><a href="#">Commercial research</a></li>
      <li><a href="#">Research services &amp; collaboration</a></li>
    </ul>
  </div>
  <div class="col-2">
    <h2><a href="#">Engagement</a></h2>
    <ul>
      <li><a href="#">Outreach programs</a></li>
      <li><a href="#">The arts &amp; culture</a></li>
      <li><a href="#">About engagement</a></li>
      <li><a href="#">Partnerships</a></li>
      <li><a href="#">Media</a></li>
      <li><a href="#">Why Melbourne?</a></li>
    </ul>
    <h2><a href="#">Alumni &amp; friends</a></h2>
    <ul>
      <li><a href="#">Benefits</a></li>
      <li><a href="#">Giving</a></li>
      <li><a href="#">Your faculty</a></li>
      <li><a href="#">Get involved</a></li>
      <li><a href="#">Global alumni network</a></li>
      <li><a href="#">Career Centre</a></li>
      <li><a href="#">Future study</a></li>
    </ul>
    <h2><a href="#">Business &amp; organisations</a></h2>
    <ul>
      <li><a href="#">Find an expert</a></li>
      <li><a href="#">Areas of expertise</a></li>
      <li><a href="#">Consultancy</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Professional development &amp; custom programs</a></li>
      <li><a href="#">Technology commercialisation</a></li>
      <li><a href="#">Facilities &amp; technology for hire</a></li>
    </ul>
  </div>
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
