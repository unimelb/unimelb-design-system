class Tabbed
  constructor: (@el) ->
    t = this

    for tab in @el.querySelectorAll('.tab')
      tab.style.display = 'none'

    for nav in @el.querySelectorAll('nav')
      nav.style.display = 'block'

    for item in @el.querySelectorAll('nav a')
      item.addEventListener 'click', (e) ->
        e.preventDefault()
        target = e.target || e.srcElement
        t.move(target)

    for el in @el.querySelectorAll('[data-tab]')
      el.addEventListener 'click', (e) ->
        target = e.target || e.srcElement
        t.moveindex(target.getAttribute('data-tab')-1)
        e.preventDefault() unless (target.hasAttribute('href') and target.getAttribute('href')[0]=="#")

    @move(@el.querySelector('[data-current]')) if @el.querySelector('[data-current]')
    @move(@el.querySelector('nav a:first-child')) if Array.prototype.slice.call(@el.querySelectorAll('[data-current]')).length==0

  moveindex: (index) ->
    for tab, i in @el.querySelectorAll('nav a')
      if i == index
        tab.setAttribute('data-current', '')
      else
        tab.removeAttribute('data-current')

    for tab, i in @el.querySelectorAll('.tab')
      if i == index
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

    for tab, i in @el.querySelectorAll('.tab')
      if i == curr
        tab.setAttribute('data-current', '')
        tab.style.display = 'block'
      else
        tab.removeAttribute('data-current')
        tab.style.display = 'none'

if (supportedmodernbrowser)
  new Tabbed(el) for el in document.querySelectorAll('[data-tabbed]')
