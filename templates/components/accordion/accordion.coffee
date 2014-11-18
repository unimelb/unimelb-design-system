unless window.UOMAccordion
  window.UOMAccordion = ->
    class window.UOMAccordionComponent
      constructor: (@el) ->
        @container = @el.parentNode
        @hidden = @container.querySelector('.accordion__hidden')
        t = this

        close = document.createElement 'a'
        close.addClass 'accordion__close'
        close.addEventListener 'click', (e) ->
          e.preventDefault()
          t.container.toggleClass('accordion__visible')

        if @hidden.countSelector('.accordion__close') == 0
          if @hidden.nodeName == 'TR'
            @hidden.firstChild.appendChild(close)
          else
            @hidden.appendChild(close)

        @el.setAttribute('tabindex', '0')

        @el.addEventListener 'click', (e) ->
          e.preventDefault()
          target = e.target || e.srcElement

          # Determine overall container to check for single focus
          container = t.container.parentNode

          # Reasonable expectations, if the trigger is wrapped
          if container.nodeName == 'TR' or container.parentNode.nodeName == 'TR'
            while container.nodeName != 'TABLE'
              if container.parentNode
                container = container.parentNode

          if container and container.getAttribute('data-single-focus')==""
            for s in container.querySelectorAll('.accordion__visible')
              s.removeClass('accordion__visible')

          t.container.toggleClass('accordion__visible')

    if (supportedmodernbrowser)
      for el in document.querySelectorAll('.accordion__title')
        new UOMAccordionComponent(el)

  if window.attachEvent
    window.attachEvent 'onload', (x) ->
      UOMAccordion()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMAccordion()

    window.addEventListener('keydown', ->
      elem = document.activeElement
      if (elem != document.body && elem.getAttribute('tabindex') != null)
      # look for window.event in case event isn't passed in
      e = window.event if (typeof e == 'undefined' && window.event)
      # trigger click if ENTER is clicked
      elem.click() if (e.keyCode == 13)
    )
