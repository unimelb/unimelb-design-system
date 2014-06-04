unless window.UOMAccordion
  window.UOMAccordion = ->
    class Accordion
      constructor: (@el) ->
        @el.addEventListener 'click', (e) ->
          e.preventDefault()
          t = e.target || e.srcElement
          container = t.parentNode.parentNode

          if container.getAttribute('data-single-focus')==""
            s.removeClass('accordion__visible') for s in container.querySelectorAll('.accordion__visible')
            t.parentNode.addClass('accordion__visible')
          else
            t.parentNode.toggleClass('accordion__visible')

    if (supportedmodernbrowser)
      new Accordion(el) for el in document.querySelectorAll('.accordion__title')

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMAccordion()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMAccordion()

