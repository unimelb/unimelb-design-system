unless window.UOMStickyNav
  window.UOMStickyNav = ->
    class StickyNav
      constructor: (el) ->
        @main = el

        if /(Firefox)/g.test(navigator.userAgent) or /(Trident)/g.test(navigator.userAgent)
          @outer = document.querySelector('html')
        else
          @outer = document.body

        jump = document.createElement "ul"
        className = if document.countSelector('.indexnav')==1 then "index-navigation" else "jump-navigation"
        jump.addClass className
        jump.innerHTML = """
    <li>On this page</li>
    """
        @n = jump

        @nav = {}
        for h in @main.querySelectorAll('h2[id]')
          @nav[h.offsetTop] = document.createElement "a"
          @nav[h.offsetTop].href = "#"+h.id
          @nav[h.offsetTop].appendChild document.createTextNode (h.textContent || h.innerText)
          li = document.createElement "li"
          li.appendChild @nav[h.offsetTop]
          @n.appendChild li

        new window.InPage(el) for el in @n.querySelectorAll('a[href^="#"]')

        # Arbitrary delay to allow calculation of CSS block hiding
        @nPadding = 60 # 30 top + 30 bottom
        @fPadding = 60 # 30 top + 30 bottom
        @arbitraryOffset = 50

        t = this
        window.addEventListener "scroll", ->
          t.progress()
          if t.contained()
            jump.addClass 'fixed' unless jump.hasClass 'fixed'
          else
            jump.removeClass 'fixed' if jump.hasClass 'fixed'

        @progress()

        jump.addClass 'floating' if document.countSelector('.floating') > 0

        if @main.countSelector('.tab .with-aside aside') > 0
          @main.querySelector('.tab .with-aside aside').appendChild jump
        else
          jump.id = 'outer'
          main = document.querySelector('[role="main"]')

          elements = []
          for node in main.childNodes
            if node.nodeType==1
              elements.push node

          if elements.length > 1
            main.insertBefore(jump, elements[1])
          else
            main.appendChild(jump)

        document.body.addClass if document.countSelector('.indexnav')==1 then "indexnav-active" else "jumpnav-active"

        @fixPoint = @n.offsetTop - 80
        @fixPoint = @fixPoint + 35 if jump.hasClass('floating')

      contained: ->
        @stickyEnd = @main.offsetHeight + @main.offsetTop - @n.offsetHeight - @nPadding
        if document.countSelector('[role="main"] > footer:last-of-type')>0
          @stickyEnd = @stickyEnd - @fPadding - document.querySelector('[role="main"] > footer:last-of-type').offsetHeight

        @outer.scrollTop > @fixPoint and @outer.scrollTop < @stickyEnd

      progress: ->
        for pos, link of @nav
          if @outer.scrollTop + @arbitraryOffset >= pos
            el.removeClass("current") for el in @n.querySelectorAll('a')
            link.addClass("current")
          else
            link.removeClass("current")

    if supportedmodernbrowser

      # Static tab aside
      if document.countSelector('.tab') > 0
        for el in document.querySelectorAll('.tab')
          if el.countSelector('h2[id]') > 0
            new StickyNav(el)

      # Scrolling jump nav
      else
        if document.countSelector('h2[id]') > 0 and document.countSelector('.jumpnav, .indexnav')==1
          new StickyNav(document.querySelector('div[role="main"]'))

if window.attachEvent
  window.attachEvent 'onload', ->
    UOMStickyNav()
else
  document.addEventListener 'DOMContentLoaded', ->
    UOMStickyNav()
