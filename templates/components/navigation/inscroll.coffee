Math.easeInOutQuad = (curr, start, change, duration) ->
  curr /= duration/2
  if (curr < 1)
    change/2*curr*curr + start
  else
    curr--
    -change/2 * (curr*(curr-2) - 1) + start

class InPage
  constructor: (@el) ->
    t = this
    unless @el.hasAttribute('data-tab')
      @el.addEventListener 'click', (e) ->

        if e.target
          tel = e.target
          if /(Firefox)/g.test(navigator.userAgent)
            outer = document.querySelector('html')
          else
            outer = document.body
        else
          tel = e.srcElement
          outer = document.documentElement

        target = tel.getAttribute('href')
        if target != "#" and target != "#sitemap"
          e.preventDefault()
          target = document.querySelector(tel.getAttribute('href'))
          if target
            t.to = target.offsetTop
            t.element = outer
            t.scrollTo()

  scrollTo: ->
    element = @element
    duration = 600
    start = element.scrollTop
    change = @to - start
    curr = 0
    increment = 10

    animateScroll = ->
      curr += increment
      element.scrollTop = Math.easeInOutQuad(curr, start, change, duration)
      setTimeout(animateScroll, increment) if curr < duration

    animateScroll()

if supportedmodernbrowser
  new InPage(el) for el in document.querySelectorAll('a[href^="#"]')
