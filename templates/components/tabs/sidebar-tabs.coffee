unless window.UOMSidebarTabs
  window.UOMSidebarTabs = ->
    class window.UOMSidebarTabsComponent
      constructor: (@el, @selector) ->
        @nav = @el.querySelectorAll('a')
        @current = 0
        t = this

        for item in @nav
          item.addEventListener 'click', (e) ->
            e.preventDefault()

            for rec, i in t.nav
              if rec == this
                t.hide()
                t.current = i
                t.show()

        if window.location.hash
          for rec, i in @nav
            if rec.getAttribute('href')==window.location.hash
              @hide()
              @current = i
              @show()

              # TODO move the outer tab (edge)

      hide: ->
        root = document
        if document.countSelector('.tab') > 1
          root = document.querySelector('.tab[data-current]')

        @pages = root.querySelectorAll(@selector)

        p.removeClass('current') for p in @nav
        p.removeClass('current') for p in @pages

      show: ->
        for rec, i in @nav
          if i==@current
            target = document.querySelector(rec.getAttribute('href'))
            if target
              rec.addClass('current')
              target.addClass('current')

    if (supportedmodernbrowser)
      for el in document.querySelectorAll('.sidebar-tab-nav')
        new UOMSidebarTabsComponent(el, '.sidebar-tab')

      for el in document.querySelectorAll('.inner-nav-tab')
        new UOMSidebarTabsComponent(el, '.inner-nav-page')
