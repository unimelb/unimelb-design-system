window.UOMinjectGlobalNav = ->
  class UOMGlobalNavState
    constructor: ->
      @page = document.querySelector('.page-inner')
      @sitemap = document.querySelector('div[role="sitemap"]')
      @menutrigger = document.querySelector('.page-header-tools a[title="Menu"]')
      @searchtrigger = document.querySelector('.page-header-tools a[title="Search"]')
      @blanket = document.querySelector('.modal__blanket')

      @setupEvents()

    setupEvents: ->
      t = this
      if document.countSelector('div[role="navigation"]') == 1
        @localnav = document.querySelector('div[role="navigation"]')
        @localsitemaptrigger = @localnav.querySelector('.sitemap-link')

        @menutrigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.toggleClass 'on'
          t.page.removeClass('global-active')
          t.localnav.removeClass('global-active')
          t.sitemap.removeClass('active')
          t.sitemap.addClass('reveal')
          t.page.toggleClass('active')
          t.localnav.toggleClass('active')

        @localnav.querySelector('h2:first-child').addEventListener 'click', (e) ->
          e.preventDefault()
          if t.page.hasClass "global-active"
            t.page.removeClass('global-active')
            t.page.addClass('active')
            t.localnav.removeClass('global-active')
            t.localnav.addClass('active')
            t.sitemap.removeClass('active')
            t.sitemap.addClass('reveal')
          else
            t.blanket.removeClass 'on'
            t.page.removeClass('global-active')
            t.localnav.removeClass('global-active')
            t.sitemap.removeClass('active')
            t.sitemap.removeClass('reveal')
            t.page.toggleClass('active')
            t.localnav.toggleClass('active')

        document.querySelector('.sitemap-label').addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.addClass 'on'
          t.page.toggleClass('global-active')
          t.localnav.toggleClass('global-active')
          t.sitemap.toggleClass('active')
          t.sitemap.removeClass('reveal')

        @sitemap.querySelector('.close-button').addEventListener 'click', (e) ->
          e.preventDefault()
          t.page.removeClass('global-active')
          t.page.addClass('active')
          t.localnav.removeClass('global-active')
          t.localnav.addClass('active')
          t.sitemap.removeClass('active')
          t.sitemap.addClass('reveal')

        @localsitemaptrigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t.page.toggleClass('global-active')
          t.localnav.toggleClass('global-active')
          t.sitemap.toggleClass('active')
          t.sitemap.removeClass('reveal')

      else
        @menutrigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.toggleClass 'on'
          t.page.toggleClass('global-active')
          t.sitemap.toggleClass('active')
          t.sitemap.removeClass('reveal')

        @sitemap.querySelector('.close-button').addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.removeClass 'on'
          t.page.toggleClass('global-active')
          t.sitemap.toggleClass('active')
          t.sitemap.removeClass('reveal')

      @blanket.addEventListener 'click', (e) ->
        e.preventDefault()
        t.blanket.removeClass 'on'
        t.page.removeClass('global-active')
        t.page.removeClass('active')
        if t.localnav
          t.localnav.removeClass('global-active')
          t.localnav.removeClass('active')
        t.sitemap.removeClass('active')
        t.sitemap.removeClass('reveal')

      if @searchtrigger
        @searchtrigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.toggleClass 'on'
          t.page.toggleClass('global-active')
          t.localnav.removeClass('active')
          t.localnav.toggleClass('global-active')
          t.sitemap.toggleClass('active')
          t.sitemap.removeClass('reveal')

  # Move local nav outside page container
  if document.countSelector('div[role="navigation"]') == 1
    localnav = document.querySelector('div[role="navigation"]')

    sitemaplink = document.createElement 'a'
    sitemaplink.addClass 'sitemap-link'
    sitemaplink.appendChild document.createTextNode 'Browse University'
    sitemaplink.href = 'https://unimelb.edu.au/sitemap'
    localnav.appendChild sitemaplink

    localnav.removeClass('no-js')
    document.body.appendChild(localnav)

    for group in localnav.querySelectorAll('a')
      if group.nextSibling and group.nextSibling.nodeName == 'UL'
        childgroup = group.nextSibling

        back = document.createElement 'li'
        back.addClass 'back'
        back.innerHTML = "<span>" + group.firstChild.data + "</span>"
        childgroup.insertBefore(back, childgroup.firstChild)

        childgroup.firstChild.addEventListener 'click', (e) ->
          e.preventDefault()
          this.parentNode.toggleClass 'hide'
          this.parentNode.toggleClass 'active'

        group.addClass('parent')
        childgroup.addClass('hide')
        group.addEventListener 'click', (e) ->
          e.preventDefault()
          this.parentNode.querySelector('ul').toggleClass 'hide'
          this.parentNode.querySelector('ul').toggleClass 'active'
          localnav.scrollTop = 0


  # Create global nav
  nav = document.createElement('div')
  nav.setAttribute('role', 'sitemap')
  nav.innerHTML = """
    <a class="sitemap-label">University Sitemap</a>
    <a class="close-button" href="">Close</a>
    <h2 class="logo">University of Melbourne</h2>
    <form action="http://search.unimelb.edu.au" method="get">
      <fieldset>
        <div class="inline">
          <input data-required placeholder="Search" name="q" type="search" title="Please enter a keyword." />
          <input type="submit" class="search-button">
        </div>
      </fieldset>
    </form>
    <ul class="quicklinks">
      <li><a href="/pages/thanks.html"><i class="fa fa-building"></i> Faculties and Graduate Schools</a></li><!--
      --><li><a href="/pages/thanks.html"><i class="fa fa-book"></i> Library</a></li><!--
      --><li><a href="/pages/thanks.html"><i class="fa fa-phone"></i> Contact us</a></li><!--
      --><li><a href="/pages/thanks.html"><i class="fa fa-map-marker"></i> Maps</a></li><!--
      --><li><a href="/pages/thanks.html"><i class="fa fa-university"></i> Support the Campaign</a></li>
    </ul>
    <div>
      <div class="col-3">
        <div>
          <h2>Study at Melbourne</h2>
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
        </div>
        <div>
          <h2>About us</h2>
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
        </div>
        <div>
          <h2>Research</h2>
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
      </div>
      <div class="col-3">
        <div>
          <h2>Engagement</h2>
          <ul>
            <li><a href="#">Outreach programs</a></li>
            <li><a href="#">The arts &amp; culture</a></li>
            <li><a href="#">About engagement</a></li>
            <li><a href="#">Partnerships</a></li>
            <li><a href="#">Media</a></li>
            <li><a href="#">Why Melbourne?</a></li>
          </ul>
        </div>
        <div>
          <h2>Alumni &amp; friends</h2>
          <ul>
            <li><a href="#">Benefits</a></li>
            <li><a href="#">Giving</a></li>
            <li><a href="#">Your faculty</a></li>
            <li><a href="#">Get involved</a></li>
            <li><a href="#">Global alumni network</a></li>
            <li><a href="#">Career Centre</a></li>
            <li><a href="#">Future study</a></li>
          </ul>
        </div>
        <div>
          <h2>Business &amp; organisations</h2>
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
      </div>
    </div>
  """
  nav.querySelector('form').addEventListener 'submit', (e) ->
    e.preventDefault()
    window.location = this.action + "#gsc.q=" + this.elements[1].value

  document.body.appendChild(nav)


  # Add link state behaviour
  navstate = new UOMGlobalNavState()
