Math.easeInOutQuad = (curr, start, change, duration) ->
  curr /= duration/2
  if (curr < 1)
    change/2*curr*curr + start
  else
    curr--
    -change/2 * (curr*(curr-2) - 1) + start

scrollTo = (to, element) ->
  duration = 600

  start = element.scrollTop
  change = to - start
  curr = 0
  increment = 10

  animateScroll = ->
    curr += increment
    element.scrollTop = Math.easeInOutQuad(curr, start, change, duration)
    setTimeout(animateScroll, increment) if curr < duration

  animateScroll()

if supportedmodernbrowser
  for el in document.querySelectorAll('a[href^="#"]')
    unless el.hasAttribute('data-tab')
      el.addEventListener 'click', (e) ->
        e.preventDefault()

        if e.target
          t = e.target
          outer = document.body
        else
          t = e.srcElement
          outer = document.documentElement

        target = document.querySelector(t.getAttribute('href'))
        if target
          scrollTo(target.offsetTop, outer)
