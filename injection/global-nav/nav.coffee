window.UOMinjectGlobalNav = ->
  class UOMGlobalNavState
    constructor: ->
      @page = document.querySelector('.page-inner')
      @sitemap = document.querySelector('div[role="sitemap"]')
      @menutrigger = document.querySelector('.page-header-tools').querySelector('a[title="Menu"]')
      @searchtrigger = document.querySelector('.page-header-tools').querySelector('a[title="Search"]')

      @setupBlanket()
      @blanket = document.querySelector('.modal__blanket')

      @setupEvents()

    setupBlanket: ->
      if Array.prototype.slice.call(document.querySelectorAll('.modal__blanket')).length==0
        el.remove() for el in document.querySelectorAll('.modal__blanket')
        blanket = document.createElement 'div'
        blanket.setAttribute('class', 'modal__blanket')
        document.querySelector('div[role="main"]').appendChild blanket

    setupEvents: ->
      t = this
      if Array.prototype.slice.call(document.querySelectorAll('div[role="navigation"]')).length==1
        @localnav = document.querySelector('div[role="navigation"]')
        @localsitemaptrigger = @localnav.querySelector('.sitemap-link')

        @menutrigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.toggleClass 'on'
          t.page.removeClass('global-active')
          t.localnav.removeClass('global-active')
          t.sitemap.removeClass('active')
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
          else
            t.blanket.removeClass 'on'
            t.page.removeClass('global-active')
            t.localnav.removeClass('global-active')
            t.sitemap.removeClass('active')
            t.page.toggleClass('active')
            t.localnav.toggleClass('active')

        document.querySelector('.sitemap-label').addEventListener 'click', (e) ->
          e.preventDefault()
          this.toggleClass 'open'
          t.page.toggleClass('global-active')
          t.localnav.toggleClass('global-active')
          t.sitemap.toggleClass('active')

        @sitemap.querySelector('.close-button').addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.removeClass 'on'
          t.page.removeClass('global-active')
          t.page.removeClass('active')
          t.localnav.removeClass('global-active')
          t.localnav.removeClass('active')
          t.sitemap.removeClass('active')

        @localsitemaptrigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t.page.toggleClass('global-active')
          t.localnav.toggleClass('global-active')
          t.sitemap.toggleClass('active')

      else
        @menutrigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.toggleClass 'on'
          t.page.toggleClass('global-active')
          t.sitemap.toggleClass('active')

        @sitemap.querySelector('.close-button').addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.removeClass 'on'
          t.page.toggleClass('global-active')
          t.sitemap.toggleClass('active')

      @blanket.addEventListener 'click', (e) ->
        e.preventDefault()
        t.blanket.removeClass 'on'
        t.page.removeClass('global-active')
        t.page.removeClass('active')
        if t.localnav
          t.localnav.removeClass('global-active')
          t.localnav.removeClass('active')
        t.sitemap.removeClass('active')

      if @searchtrigger
        @searchtrigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t.blanket.toggleClass 'on'
          t.page.toggleClass('global-active')
          t.localnav.removeClass('active')
          t.localnav.toggleClass('global-active')
          t.sitemap.toggleClass('active')


  # Move local nav outside page container
  if Array.prototype.slice.call(document.querySelectorAll('div[role="navigation"]')).length==1
    localnav = document.querySelector('div[role="navigation"]')

    sitemaplink = document.createElement 'a'
    sitemaplink.addClass 'sitemap-link'
    sitemaplink.appendChild document.createTextNode 'Browse University'
    sitemaplink.href = 'https://unimelb.edu.au/sitemap'
    localnav.appendChild sitemaplink

    localnav.removeClass('no-js')
    document.body.appendChild(localnav)

    for group in localnav.querySelectorAll('a')
      if group.nextSibling and group.nextSibling.localName == 'ul'
        childgroup = group.nextSibling

        back = document.createElement 'li'
        back.addClass 'back'
        back.innerHTML = "<span>" + group.text + "</span>"
        childgroup.insertBefore(back, childgroup.firstChild)

        childgroup.firstChild.addEventListener 'click', (e) ->
          e.preventDefault()
          this.parentNode.toggleClass 'hide'

        group.addClass('parent')
        childgroup.addClass('hide')
        group.addEventListener 'click', (e) ->
          e.preventDefault()
          this.parentNode.querySelector('ul').toggleClass 'hide'

  # Create global nav
  trigger = document.createElement('div')
  trigger.addClass('sitemap-label')
  trigger.innerHTML = "University Sitemap"
  document.body.appendChild(trigger)

  nav = document.createElement('div')
  nav.setAttribute('role', 'sitemap')
  nav.innerHTML = """
    <a class="close-button" href="">Close</a>
    <h2>University of Melbourne</h2>
    <form>
      <fieldset>
        <div class="inline">
          <input data-required placeholder="Search" name="f[search]" type="search" title="Please enter a keyword." />
          <input type="submit" class="search-button">
        </div>
      </fieldset>
    </form>
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
  document.body.appendChild(nav)

  # Add link state behaviour
  navstate = new UOMGlobalNavState()
