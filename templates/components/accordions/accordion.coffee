unless window.UOMAccordion
  window.UOMAccordion = ->
    class Accordion
      constructor: (@el) ->
        @container = @el.parentNode
        @hidden = @container.querySelector('.accordion__hidden')
        t = this

        close = document.createElement 'a'
        close.addClass 'accordion__close'
        close.addEventListener 'click', (e) ->
          e.preventDefault()
          target = e.target || e.srcElement
          t.container.toggleClass('accordion__visible')

        if @hidden.nodeName == 'TR'
          @hidden.firstChild.appendChild(close)
        else
          @hidden.appendChild(close)

        @el.addEventListener 'click', (e) ->
          e.preventDefault()
          target = e.target || e.srcElement
          container = t.container.parentNode

          if container.getAttribute('data-single-focus')==""
            for s in container.querySelectorAll('.accordion__visible')
              s.removeClass('accordion__visible')
            target.parentNode.addClass('accordion__visible')
          else
            t.container.toggleClass('accordion__visible')

    if (supportedmodernbrowser)
      new Accordion(el) for el in document.querySelectorAll('.accordion__title')

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMAccordion()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMAccordion()

