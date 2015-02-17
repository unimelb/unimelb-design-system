unless window.UOMInnerNavTab
  window.UOMInnerNavTab = ->
    class window.InnerNavTab
      constructor: (@el) ->
        @nav = @el.querySelectorAll('a')
        @pages = document.querySelectorAll('.inner-nav-page')
        @current = 0
        t = this

        if window.location.hash
          for rec, i in @nav
            if rec.getAttribute('href')==window.location.hash
              @current = i
              @update(@current)
              # TODO move to outer tab (edge)

        for item in @nav
          item.addEventListener 'click', (e) ->
            e.preventDefault()
            p.removeClass('current') for p in t.nav
            p.removeClass('current') for p in t.pages

            for rec, i in t.nav
              if rec = this
                target = document.querySelector(rec.getAttribute('href'))
                if target
                  rec.addClass('current')
                  target.addClass('current')

      update: (c) ->
        p.removeClass('current') for p in @nav
        p.removeClass('current') for p in @pages

        for rec, i in @nav
          if i==c
            target = document.querySelector(rec.getAttribute('href'))
            if target
              rec.addClass('current')
              target.addClass('current')


    if (supportedmodernbrowser)
      for el in document.querySelectorAll('.inner-nav-tab')
        new InnerNavTab(el)
