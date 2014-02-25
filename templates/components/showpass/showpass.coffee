class ShowPass
  constructor: (@el) ->
    @label = document.createElement 'span'
    @label.setAttribute('class', 'showpass__label')
    @label.appendChild document.createTextNode 'Hide'

    el = @el
    t = this
    @label.addEventListener 'click', (e) ->
      e.preventDefault()
      if this.textContent=='Hide'
        t.hide(el, this)
      else
        t.show(el, this)

    @el.parentNode.insertBefore(@label, @el)
    @el.setAttribute('type', 'text')

  hide: (el, label) ->
    label.textContent = 'Show'
    el.setAttribute('type', 'password')

  show: (el, label) ->
    label.textContent = 'Hide'
    el.setAttribute('type', 'text')

new ShowPass(f) for f in document.querySelectorAll('input[type="password"]')
