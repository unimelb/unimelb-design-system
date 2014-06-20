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
          t.page.addClass('global-active')
          t.localnav.removeClass('active')
          t.localnav.addClass('global-active')
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
          t.page.addClass('global-active')
          t.localnav.removeClass('active')
          t.localnav.addClass('global-active')
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
          t.page.addClass('global-active')
          t.localnav.removeClass('active')
          t.localnav.addClass('global-active')
          t.sitemap.addClass('active')
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

      elements = []
      for node in group.parentNode.childNodes
        if node.nodeType==1 and !node.hasClass('sitemap-link') and node.nodeName != 'H2'
          elements.push node

      console.log elements

      if elements.length > 1
        childgroup = elements[1]

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
    <div class="sitemap-label">University Sitemap</div>
    <a class="close-button" href="">Close</a>
    <h2 class="logo">University of Melbourne</h2>
    <form action="http://search.unimelb.edu.au" method="get">
      <fieldset>
        <div class="inline">
          <input data-required placeholder="Search" name="q" type="search" title="Please enter a keyword." />
          <input type="submit" value="Go" class="search-button">
        </div>
      </fieldset>
    </form>
    <ul class="quicklinks">
      <li><a href="http://www.unimelb.edu.au/az/faculties.html"><span class="icon faculties"></span> Faculties and Graduate Schools</a></li><!--
      --><li><a href="http://library.unimelb.edu.au/"><span class="icon library"></span> Library</a></li><!--
      --><li><a href="http://www.unimelb.edu.au/contact/"><span class="icon contact"></span> Contact us</a></li><!--
      --><li><a href="http://maps.unimelb.edu.au/"><span class="icon maps"></span> Maps</a></li><!--
      --><li><a href="http://campaign.unimelb.edu.au/"><span class="icon support"></span> Support the Campaign</a></li>
    </ul>
    <div>
      <div class="col-3">
        <div>
          <h2><a href="http://coursesearch.unimelb.edu.au">Study at Melbourne</a></h2>
          <ul>
            <li><a href="http://coursesearch.unimelb.edu.au/undergrad">Undergraduate study</a></li>
            <li><a href="http://coursesearch.unimelb.edu.au/grad">Graduate study</a></li>
            <li><a href="http://futurestudents.unimelb.edu.au/">Future students</a></li>
            <li><a href="http://futurestudents.unimelb.edu.au/admissions">Admissions, fees &amp; applications</a></li>
            <li><a href="http://futurestudents.unimelb.edu.au/info/international">International students</a></li>
            <li><a href="http://futurestudents.unimelb.edu.au/admissions/scholarships">Scholarships</a></li>
            <li><a href="http://futurestudents.unimelb.edu.au/courses/single_subject_study">Single subjects &amp; short courses</a></li>
            <li><a href="http://www.coursera.org/unimelb">Online learning with Coursera</a></li>
          </ul>
        </div>
        <div>
          <h2><a href="http://about.unimelb.edu.au/home">About us</a></h2>
          <ul>
            <li><a href="http://about.unimelb.edu.au/strategy-and-leadership">Strategy and leadership</a></li>
            <li><a href="http://about.unimelb.edu.au/tradition-of-excellence">Tradition of excellence</a></li>
            <li><a href="http://about.unimelb.edu.au/international-connections">International connections</a></li>
            <li><a href="http://about.unimelb.edu.au/campuses-and-facilities">Campuses and facilities</a></li>
            <li><a href="http://about.unimelb.edu.au/governance-and-leadership">Structure and governance</a></li>
            <li><a href="http://about.unimelb.edu.au/policy-and-publications">Policy and publications</a></li>
            <li><a href="http://about.unimelb.edu.au/careers">Careers at Melbourne</a></li>
            <li><a href="http://newsroom.unimelb.edu.au">News</a></li>

          </ul>
        </div>
        <div>
          <h2><a href="http://unimelb.edu.au/research/">Research</a></h2>
          <ul>
            <li><a href="http://www.unimelb.edu.au/research/faculty-and-graduate-school-research-areas.html">Faculty and graduate school research areas</a></li>
            <li><a href="http://ri.unimelb.edu.au/">Research institutes</a></li>
            <li><a href="http://www.unimelb.edu.au/research/research-institutes-centres.html">Research Centres</a></li>
            <li><a href="http://findanexpert.unimelb.edu.au/">Find an expert or supervisor</a></li>
            <li><a href="http://futurestudents.unimelb.edu.au/admissions/applications/research">Apply for graduate research</a></li>
            <li><a href="http://services.unimelb.edu.au/scholarships/research">Graduate research scholarships</a></li>
            <li><a href="http://gradresearch.unimelb.edu.au/">Information for graduate researchers</a></li>
          </ul>
        </div>
      </div>
      <div class="col-3">
        <div>
          <h2><a href="http://unimelb.edu.au/engage/">Engagement</a></h2>
          <ul>
            <li><a href="http://events.unimelb.edu.au">Events</a></li>
            <li><a href="http://www.unimelb.edu.au/alumni">Alumni</a></li>
            <li><a href="http://engage.unimelb.edu.au/community-engagement">Community</a></li>
            <li><a href="http://engage.unimelb.edu.au/global-engagement">Global Engagement</a></li>
            <li><a href="http://businessconnect.unimelb.edu.au/">Business &amp; Industry</a></li>
            <li><a href="http://engage.unimelb.edu.au/cultural-engagement">Arts &amp; Culture</a></li>
            <li><a href="http://www.sport.unimelb.edu.au/facilities/index.html">Sports Facilities</a></li>
            <li><a href="http://services.unimelb.edu.au/venuehire/">Venue Hire</a></li>
          </ul>
        </div>
        <div>
          <h2><a href="http://alumni.unimelb.edu.au">Alumni &amp; friends</a></h2>
          <ul>
            <li><a href="http://alumni.unimelb.edu.au/benefits-services/alumni-benefits">Benefits</a></li>
            <li><a href="http://campaign.unimelb.edu.au">Giving</a></li>
            <li><a href="http://alumni.unimelb.edu.au/get-involved">Get involved</a></li>
            <li><a href="http://alumni.unimelb.edu.au/my-network/global-alumni-network">Global alumni network</a></li>
            <li><a href="http://alumni.unimelb.edu.au/career-centre">Career Centre</a></li>
            <li><a href="http://alumni.unimelb.edu.au/career-centre/future-study">Future study</a></li>
          </ul>
        </div>
        <div>
          <h2><a href="http://www.unimelb.edu.au/contact/">Contact & Maps</a></h2>
          <ul>
            <li><a href="http://www.research.unimelb.edu.au/contact">Research enquiries</a></li>
            <li><a href="http://newsroom.melbourne.edu/about">Media enquiries</a></li>
            <li><a href="http://www.commercial.unimelb.edu.au/contact-us/">Industry and business enquiries</a></li>
            <li><a href="http://directory.unimelb.edu.au">Find a staff member</a></li>
            <li><a href="http://maps.unimelb.edu.au">Find a location on campus</a></li>
            <li><a href="http://pcs.unimelb.edu.au/traffic-and-parking/">Traffic, parking &amp; bicycles</a></li>
          </ul>
        </div>
      </div>
    </div>
  """

  form = nav.querySelector('form')

  if /(MSIE [8|9].0)/g.test(navigator.userAgent)
    form.elements[1].value = 'Search'
    form.elements[1].addEventListener 'click', (e) ->
      this.select()

  form.addEventListener 'submit', (e) ->
    e.preventDefault()
    window.location = this.action + "#gsc.q=" + this.elements[1].value

  document.body.appendChild(nav)


  # Add link state behaviour
  navstate = new UOMGlobalNavState()
