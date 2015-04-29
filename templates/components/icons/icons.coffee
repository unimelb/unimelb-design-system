unless window.UOMIconHelper
  window.UOMIconHelper = ->
    class IconHelper
      constructor: (@el) ->
        @ref = @el.getAttribute('data-icon')
        @ref = '#' + @ref if @ref.substr(0,1) != '#'

        @el.innerHTML = """
        <svg class="icon" role="img">
          <use xlink:href="#{@ref}"></use>
        </svg>
"""

    if (supportedmodernbrowser)
      new IconHelper(m) for m in document.querySelectorAll '[data-icon]'
