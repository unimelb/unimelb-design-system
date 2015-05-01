unless window.UOMLeafletMap
  window.UOMLeafletMap = ->
    class LeafletMap
      constructor: (@el) ->
        @zoom = parseInt(@el.getAttribute 'data-zoom') || 15
        @map = L.map(@el).setView(@el.getAttribute('data-leaflet-latlng').split(','), @zoom);

        L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png',
          maxZoom: 18
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>'
          id: 'examples.map-i875mjb7'
        ).addTo(@map)

        if @el.getAttribute('data-pin')
          L.marker(@el.getAttribute('data-pin').split(',')).addTo(@map)

    # Only load if element with data attribute exists
    if (supportedmodernbrowser)
      if document.countSelector('[data-leaflet-latlng]') > 0
        script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js"
        document.body.appendChild script

        # style = document.createElement("link")
        # style.rel = "stylesheet"
        # style.href = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
        # document.body.appendChild style

        window.setTimeout(->
          new LeafletMap(m) for m in document.querySelectorAll '[data-leaflet-latlng]'
        , 2000)
