unless window.UOMGMap
  window.UOMGMap = ->
    class Gmap
      constructor: (@el) ->
        @width = parseInt(@el.getAttribute 'data-width') || 400
        @height = parseInt(@el.getAttribute 'data-height') || 300
        @zoom = parseInt(@el.getAttribute 'data-zoom') || 17
        @pin = @el.getAttribute('data-pin')

        if @el.hasAttribute('data-latlng')
          [@lat, @lng] = @el.getAttribute('data-latlng').split(',')
          @options =
            center: new google.maps.LatLng @lat, @lng
            zoom: @zoom
            scrollwheel: false
            mapTypeId: google.maps.MapTypeId.ROADMAP
          @draw()

        @geolookup() if @el.hasAttribute('data-address')

      draw: ->
        @el.style.width = @width+'px'
        @el.style.height = @height+'px'
        @map = new google.maps.Map(@el, @options)

        @marker() if @el.getAttribute('data-pin')
        @stylemap() if @el.getAttribute('data-grayscale')==''

      geolookup: ->
        t = this
        geocoder = new google.maps.Geocoder()
        geocoder.geocode
          address: @el.getAttribute('data-address')
          (results, status) ->
            if status == google.maps.GeocoderStatus.OK
              t.options =
                center: results[0].geometry.location
                zoom: t.zoom
                scrollwheel: false
                mapTypeId: google.maps.MapTypeId.ROADMAP
              t.draw()

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
      if document.countSelector('[data-latlng],[data-address]') > 0
        script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "https://maps.googleapis.com/maps/api/js?callback=maps_loaded"
        document.body.appendChild script

    window.maps_loaded = ->
      new Gmap(m) for m in document.querySelectorAll '[data-latlng],[data-address]'
