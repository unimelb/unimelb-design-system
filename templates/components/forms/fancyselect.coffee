unless window.UOMFancySelect
  window.UOMFancySelect = ->
    class FancySelect
      constructor: (@el) ->
        @parent = @el.parentNode

        wrapper = document.createElement('div')
        wrapper.addClass('styled-select')
        wrapper.innerHTML = """<svg class="icon" role="img"><use xlink:href="#icon-north-south"></use></svg>"""

        @el.parentNode.removeChild(@el)
        wrapper.appendChild(@el)
        wrapper.insertBefore(@el, wrapper.firstChild)

        @parent.appendChild(wrapper)

    if (supportedmodernbrowser)
      new FancySelect(f) for f in document.querySelectorAll("select")

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMFancySelect()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMFancySelect()

