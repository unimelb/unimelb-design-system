unless window.UOMGMap
  window.UOMGMap = ->
    class Gmap
      constructor: (@el) ->
        @center = @el.getAttribute('data-latlng').split(',')
        @width = parseInt(@el.getAttribute 'data-width') || 400
        @height = parseInt(@el.getAttribute 'data-height') || 300
        @zoom = parseInt(@el.getAttribute 'data-zoom') || 17
        @pin = @el.getAttribute('data-pin')
        @options =
          center: new google.maps.LatLng @center[0], @center[1]
          zoom: @zoom
          scrollwheel: false
          mapTypeId: google.maps.MapTypeId.ROADMAP

        @el.style.width = @width+'px'
        @el.style.height = @height+'px'
        @map = new google.maps.Map(@el, @options)

        @marker() if @el.getAttribute('data-pin')
        @stylemap() if @el.getAttribute('data-grayscale')==''

      marker: ->
        ll = @pin.split(',')
        markerOptions =
          map: @map
          position: new google.maps.LatLng ll[0], ll[1]
        marker = new google.maps.Marker markerOptions

      stylemap: ->
        styleOptions = [
          stylers: [
           { hue: '#203D65' }
           { saturation: -80 }
          ]
        ]
        styledMap = new google.maps.StyledMapType(styleOptions, { name: 'Styled Map' })
        @map.mapTypes.set('map_style', styledMap)
        @map.setMapTypeId('map_style')

    # Only load if element with data attribute exists
    if (supportedmodernbrowser)
      if Array.prototype.slice.call(document.querySelectorAll('[data-latlng]')).length > 0
        script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "https://maps.googleapis.com/maps/api/js?sensor=true&callback=maps_loaded"
        document.body.appendChild script

    window.maps_loaded = ->
      new Gmap(m) for m in document.querySelectorAll '[data-latlng]'

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMGMap()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMGMap()
