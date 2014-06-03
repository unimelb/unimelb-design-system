window.UOMFeed = ->
  class Feed
    constructor: (@el) ->
      @url        = @el.getAttribute('data-feed-url')
      @entries    = @el.getAttribute('data-entries')
      @dateFormat = @el.getAttribute('data-data-format') || "htt, mmmm d, yyyy"
      @noDate     = @el.hasAttribute('data-no-date')

      @load()

    load: ->
      feed = new google.feeds.Feed(@url)
      if @entries
        feed.includeHistoricalEntries()
        feed.setNumEntries(@entries)
      el         = @el
      dateFormat = @dateFormat
      dateFormat = '' if @noDate
      feed.load (result) ->
        unless result.error
          ul = document.createElement 'ul'
          for entry in result.feed.entries
            title = document.createElement 'span'
            title.appendChild document.createTextNode entry.title
            link = document.createElement 'a'
            link.setAttribute 'href', entry.link
            if dateFormat.length > 0
              published = new Date(Date.parse entry.publishedDate)
              date = document.createElement 'time'
              time = document.createAttribute('datetime')
              time.nodeValue = published.format('isoUtcDateTime')
              date.setAttributeNode(time)
              date.appendChild document.createTextNode published.format(dateFormat)+' '
              link.appendChild date
            link.appendChild title
            li = document.createElement 'li'
            li.appendChild link
            ul.appendChild li

          el.appendChild ul
          el.setAttribute 'class', el.getAttribute('class') + ' loaded'

  if (supportedmodernbrowser)
    if (typeof google != "undefined")
      google.load "feeds", "1"
      google.setOnLoadCallback ->
        new Feed(f) for f in document.querySelectorAll('[data-feed-url]')

if window.attachEvent
  window.attachEvent 'onload', ->
    UOMFeed()
else
  document.addEventListener 'DOMContentLoaded', ->
    UOMFeed()

