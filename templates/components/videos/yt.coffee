class YtEmbed
  constructor: (@el) ->
    @ytid = @el.getAttribute('data-ytid')

    @trigger = document.createElement 'div'
    @trigger.setAttribute('class', 'video-trigger')

    t = this
    @trigger.addEventListener 'click', (e) ->
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
