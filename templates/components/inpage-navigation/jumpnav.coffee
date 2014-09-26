# WIP

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
        jump.addClass "jump-navigation"
        jump.innerHTML = """
    <li>On this page</li>
    """
        @n = jump

        @nav = {}
        for h in @main.querySelectorAll('h2[id]')
          @nav[h.offsetTop] = document.createElement "a"
          @nav[h.offsetTop].href = "#"+h.id
          @nav[h.offsetTop].appendChild document.createTextNode h.textContent
          li = document.createElement "li"
          li.appendChild @nav[h.offsetTop]
          @n.appendChild li

        new window.InPage(el) for el in @n.querySelectorAll('a[href^="#"]')

        @nPadding = 30 # 15 top + 15 bottom
        @fPadding = 60 # 30 top + 30 bottom
        @arbitraryOffset = 50

        # Arbitrary delay to allow calculation of CSS block hiding - page load on local can run up to 400ms

        t = this
        timeout = setTimeout(->
          t.stickyTop = t.n.offsetTop
          console.log t.stickyTop
          t.stickyEnd = t.main.offsetHeight + t.main.offsetTop - t.n.offsetHeight - t.nPadding
          t.stickyEnd = t.stickyEnd - t.fPadding - document.querySelector('footer.cta').offsetHeight if Array.prototype.slice.call(document.querySelectorAll('footer.cta')).length>0

          window.addEventListener "scroll", ->
            t.stickify()
            t.progress()

          t.stickify()
          t.progress()
        , 400)

        window.addEventListener "scroll", ->
          t.progress()
          t.stickify() unless t.main.hasClass 'tab'

          if t.outer.scrollTop > 210
            jump.addClass 'fixed' unless jump.hasClass 'fixed'
          else
            jump.removeClass 'fixed' if jump.hasClass 'fixed'

        @progress()
        @stickify() unless @main.hasClass 'tab'

        if @main.countSelector('.with-aside aside') > 0
          @main.querySelector('.with-aside aside').appendChild jump
        else
          jump.id = 'outer'
          main = document.querySelector('[role="main"]')
          main.insertBefore(jump, main.firstChild.nextSibling)

      stickify: ->
        # if @stickyTop < @outer.scrollTop and @stickyEnd > @outer.scrollTop
        #   @n.parentElement.style.height = @n.offsetHeight+"px"
        #   @n.addClass('jump-fixed')
        # else
        #   @n.removeClass('jump-fixed')

      progress: ->
        for pos, link of @nav
          if @outer.scrollTop + @arbitraryOffset >= pos
            el.removeClass("current") for el in @n.querySelectorAll('a')
            link.addClass("current")
          else
            link.removeClass("current")

    if supportedmodernbrowser
      if document.countSelector('.tab') > 0
        for el in document.querySelectorAll('.tab')
          if el.countSelector('h2[id]') > 0
            new StickyNav(el)
      else
        if document.countSelector('h2[id]') > 0
          new StickyNav(document.querySelector('div[role="main"]'))

if window.attachEvent
  window.attachEvent 'onload', ->
    UOMStickyNav()
else
  document.addEventListener 'DOMContentLoaded', ->
    UOMStickyNav()
