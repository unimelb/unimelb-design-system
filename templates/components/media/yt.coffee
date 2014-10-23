unless window.UOMYtEmbed
  window.UOMYtEmbed = ->
    class YtEmbed
      constructor: (@el) ->
        @ytid = @el.getAttribute('data-ytid')

        @trigger = document.createElement 'div'
        @trigger.setAttribute('class', 'embed-video-button')
        @trigger.innerHTML = '<svg x="0px" y="0px" viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve"><circle class="st0" cx="500" cy="500" r="368.3"/><polygon points="398.5,309.5 700.3,500 398.5,690.5 "/></svg>'

        t = this
        @el.addEventListener 'click', (e) ->
          e.preventDefault()
          t.video = new YT.Player(t.el.id,
            height: '320'
            width: '570'
            videoId: t.ytid
            playerVars:
              rel: 0
            events:
              'onReady': t.onPlayerReady
          )
          

        @el.appendChild @trigger


      onPlayerReady: (event) ->
        event.target.playVideo() unless /(iPad|iPhone|iPod|Android)/g.test(navigator.userAgent)

    # Only load if element with data attribute exists
    if (supportedmodernbrowser)
      if Array.prototype.slice.call(document.querySelectorAll('[data-ytid]')).length > 0
        script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "https://www.youtube.com/iframe_api"

        document.body.appendChild script
        new YtEmbed(el) for el in document.querySelectorAll '[data-ytid]'

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMYtEmbed()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMYtEmbed()
