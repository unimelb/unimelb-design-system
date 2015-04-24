unless window.UOMTabs
  window.UOMTabs = ->
    class Tabbed
      constructor: (@el) ->
        if @el.countSelector('nav') > 0
          @el.querySelector('nav').addClass('active')

        if @el.countSelector('.mobile-nav') > 0
          @el.querySelector('.mobile-nav').addClass('active')
        else
          if @el.countSelector('div.full-width') == 1
            @buildMobileNav()

        if @el.hasAttribute('data-tabbed')
          t = this
          tabs = []

          for tab in @el.querySelectorAll('[role="tabpanel"]')
            tab.style.display = 'none'
            tabs.push tab.id || ''

          for item in @el.querySelectorAll('nav a')
            item.addEventListener 'click', (e) ->

              target = e.target || e.srcElement
              if target.hasAttribute('href')
                # go to href

                if target.getAttribute('href').substr(0, 1) == '#'
                  # nav tab
                  t.move(target)

              else
                # nav tab
                t.move(target)

          if @el.countSelector('select') > 0
            @el.querySelector('select').addEventListener 'change', (e) ->
              if this.value
                if this.value.substr(0, 1) != '#'
                  window.location = this.value
                else
                  curr = 1
                  tab = this.value
                  for opt, i in this.querySelectorAll('option')
                    curr = i+1 if opt.value==tab
                  t.moveindex(curr)
                  setTimeout(->
                    window.location.hash = tab.substr(1) if tab
                  , 600)

          curr = window.location.hash.substr(1) if window.location.hash

          idx = 0
          for tab, i in tabs
            idx = i+1 if curr == tab

          if idx > 0
            @moveindex idx
          else if @el.countSelector('[data-current]') == 0
            @move @el.querySelector('nav a:first-child')
          else
            @move @el.querySelector('[data-current]')

          for el in @el.querySelectorAll('[data-tab]')
            el.addEventListener 'click', (e) ->
              target = e.target || e.srcElement
              t.moveindex(target.getAttribute('data-tab'))
              setTimeout(->
                if target.getAttribute('href')
                  window.location.hash = target.getAttribute('href').substr(1)
              , 600)

      moveindex: (index) ->
        for tab, i in @el.querySelectorAll('nav a')
          if i == index-1
            tab.setAttribute('data-current', '')
          else
            tab.removeAttribute('data-current')

        for opt, i in @el.querySelectorAll('option')
          if i == index-1
            opt.setAttribute('selected', 'selected')
          else
            opt.removeAttribute('selected')

        for tab, i in @el.querySelectorAll('[role="tabpanel"]')
          if i == index-1
            tab.setAttribute('data-current', '')
            tab.style.display = 'block'
          else
            tab.removeAttribute('data-current')
            tab.style.display = 'none'

      move: (clicked) ->
        curr = 0
        for tab, i in @el.querySelectorAll('nav a')
          if tab == clicked
            tab.setAttribute('data-current', '')
            curr = i
          else
            tab.removeAttribute('data-current')

        for opt, i in @el.querySelectorAll('option')
          if i == curr
            opt.setAttribute('selected', 'selected')
          else
            opt.removeAttribute('selected')

        for tab, i in @el.querySelectorAll('[role="tabpanel"]')
          if i == curr
            tab.setAttribute('data-current', '')
            tab.style.display = 'block'
          else
            tab.removeAttribute('data-current')
            tab.style.display = 'none'

      buildMobileNav: ->
        mobile = document.createElement 'div'
        mobile.addClass('mobile-nav')

        selector = document.createElement 'select'
        selector.setAttribute('role', 'tablist')

        for tab, i in @el.querySelectorAll('nav a')
          opt = document.createElement 'option'
          opt.setAttribute('role', 'tab')
          opt.setAttribute('value', tab.getAttribute('href'))
          opt.appendChild document.createTextNode tab.firstChild.nodeValue

          selector.appendChild opt

        mobile.appendChild selector
        root = @el.querySelector('.full-width')
        root.insertBefore(mobile, root.firstChild)

    if (supportedmodernbrowser)
      new Tabbed(el) for el in document.querySelectorAll('[data-tabbed]')

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMTabs()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMTabs()

