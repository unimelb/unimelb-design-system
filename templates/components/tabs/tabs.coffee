class Tabbed
  constructor: (@el) ->
    t = this
    for tab in @el.querySelectorAll('nav a')
      tab.addEventListener 'click', (e) ->
        e.preventDefault()
        target = e.target || e.srcElement
        t.move(target)

    @move(@el.querySelector('[data-current]')) if @el.querySelector('[data-current]')
    @move(@el.querySelector('nav a:first-child')) if Array.prototype.slice.call(@el.querySelectorAll('[data-current]')).length==0

  move: (clicked) ->
    curr = 0
    for tab, i in @el.querySelectorAll('nav a')
      if tab == clicked
        tab.setAttribute('data-current', '')
        curr = i
      else
        tab.removeAttribute('data-current')

    for tab, i in @el.querySelectorAll('section')
      if i == curr
        tab.setAttribute('data-current', '')
      else
        tab.removeAttribute('data-current')

if (supportedmodernbrowser)
  new Tabbed(el) for el in document.querySelectorAll('[data-tabbed]')
