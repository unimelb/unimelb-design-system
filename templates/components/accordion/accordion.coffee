class Accordion
  constructor: (@el) ->
    @el.addEventListener 'click', (e) ->
      e.preventDefault()
      container = this.parentNode.parentNode

      if container.getAttribute('data-single-focus')==""
        s.removeClass('accordion__visible') for s in container.querySelectorAll('.accordion__visible')
        this.parentNode.addClass('accordion__visible')
      else
        this.parentNode.toggleClass('accordion__visible')

new Accordion(el) for el in document.querySelectorAll('.accordion__title')
