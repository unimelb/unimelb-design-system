unless window.UOMSidebarTabs
  window.UOMSidebarTabs = ->
    class window.UOMSidebarTabsComponent
      constructor: (@el) ->
        @nav = @el.querySelectorAll('a')
        @plans = document.querySelectorAll('.sidebar-tab')
        @current = 0
        t = this

        if window.location.hash
          for rec, i in @nav
            if rec.getAttribute('href')==window.location.hash
              @current = i
              @update(@, @current)

        for item in @nav
          item.addEventListener 'click', (e) ->
            e.preventDefault()
            for i in t.nav
              i.removeClass('current')

            for i in t.plans
              i.removeClass('current')

            for rec, i in t.nav
              if rec = this
                target = document.querySelector(rec.getAttribute('href'))
                if target
                  rec.addClass('current')
                  target.addClass('current')

      update: (t, c) ->
        for i in t.nav
          i.removeClass('current')

        for i in t.plans
          i.removeClass('current')

        for rec, i in t.nav
          if i==c
            target = document.querySelector(rec.getAttribute('href'))
            if target
              rec.addClass('current')
              target.addClass('current')


    if (supportedmodernbrowser)
      for el in document.querySelectorAll('.sidebar-tab-nav')
        new UOMSidebarTabsComponent(el)
