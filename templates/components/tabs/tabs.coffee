class Tabbed
  constructor: (@el) ->
    t = this

    for tab in @el.querySelectorAll('nav a')
      tab.addEventListener 'click', (e) ->
        e.preventDefault()
        target = e.target || e.srcElement
        t.move(target)

    for el in @el.querySelectorAll('[data-tab]')
      el.addEventListener 'click', (e) ->
        e.preventDefault()
        t.moveindex(el.getAttribute('data-tab')-1)

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
      else
        tab.removeAttribute('data-current')

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
      else
        tab.removeAttribute('data-current')

if (supportedmodernbrowser)
  new Tabbed(el) for el in document.querySelectorAll('[data-tabbed]')
