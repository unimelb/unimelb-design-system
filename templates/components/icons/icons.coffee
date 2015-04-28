unless window.UOMIconHelper
  window.UOMIconHelper = ->
    class IconHelper
      constructor: (@el) ->
        @ref = @el.getAttribute('data-icon')
        @ref = '#' + @ref if @ref.substr(1) != '#'

        svg = document.createElement('svg')
        svg.setAttribute('class', 'icon')
        svg.setAttribute('role', 'img')

        use = document.createElement('use')
        use.setAttribute('xlink:href', @ref)
        svg.appendChild(use)
        @el.appendChild(svg)

    if (supportedmodernbrowser)
      new IconHelper(m) for m in document.querySelectorAll '[data-icon]'
