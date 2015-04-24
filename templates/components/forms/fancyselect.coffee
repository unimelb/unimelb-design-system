unless window.UOMFancySelect
  window.UOMFancySelect = ->
    class FancySelect
      constructor: (@el) ->
        @parent = @el.parentNode

        wrapper = document.createElement('div')
        wrapper.addClass('styled-select')
        wrapper.addClass('alt') if @el.hasClass('alt')
        wrapper.addClass('clear') if @el.hasClass('clear')
        wrapper.addClass('clear-dark') if @el.hasClass('clear-dark')
        wrapper.innerHTML = """<svg class="icon" role="img"><use xlink:href="#icon-north-south"></use></svg>"""

        @el.parentNode.removeChild(@el)
        wrapper.insertBefore(@el, wrapper.firstChild)

        @parent.appendChild(wrapper)

        unless /(MSIE|Trident)/g.test(navigator.userAgent)
          for i in @parent.querySelectorAll('svg.icon')
            i.addEventListener 'click', (e) ->
              event = new MouseEvent 'mousedown',
                bubbles: true
                cancelable: true
                view: window
              this.parentNode.querySelector('select').dispatchEvent(event)

    if (supportedmodernbrowser) and !/(MSIE 9)/g.test(navigator.userAgent)
      new FancySelect(f) for f in document.querySelectorAll("select")
