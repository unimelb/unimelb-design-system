class ShowPass
  constructor: (@el) ->
    @container = @el.parentNode

    @label = document.createElement 'span'
    @label.setAttribute('class', 'showpass__label')
    @label.appendChild document.createTextNode 'Show'

    @alt = document.createElement('input')
    for v in @el.attributes
      @alt.setAttribute(v.name, v.value) if v.name != 'type'
    @alt.type = 'text'

    t = this
    @label.addEventListener 'click', (e) ->
      e.preventDefault()
      if t.label.textContent=='Hide' or t.label.innerText=='Hide'
        t.label.innerText = 'Show'
        t.label.textContent = 'Show'
        t.el.value = t.alt.value
        t.container.replaceChild(t.el, t.alt)
      else
        t.label.innerText = 'Hide'
        t.label.textContent = 'Hide'
        t.alt.value = t.el.value
        t.container.replaceChild(t.alt, t.el)

    @container.insertBefore(@label, @el)

if (supportedmodernbrowser)
  new ShowPass(f) for f in document.querySelectorAll('input[type="password"]')
