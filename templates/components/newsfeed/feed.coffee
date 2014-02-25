class Feed
  constructor: (@el) ->
    @url = @el.getAttribute('data-feed-url')
    @entries = @el.getAttribute('data-entries')
    @dateFormat = @el.getAttribute('data-data-format') || "htt, mmmm d, yyyy"
    @noDate = @el.getAttribute('data-no-date')
    
    @load()

  load: ->
    feed = new google.feeds.Feed(@url)
    if @entries
      feed.includeHistoricalEntries()
      feed.setNumEntries(@entries)
    el = @el
    feed.load (result) ->
      unless result.error
        ul = document.createElement 'ul'
        for entry in result.feed.entries
          title = document.createElement 'span'
          title.appendChild document.createTextNode entry.title
          link = document.createElement 'a'
          link.setAttribute 'href', entry.link
          if @noDate
            published = new Date(Date.parse entry.publishedDate)
            date = document.createElement '<em>'
            date.appendChild document.createTextNode published.format(dateFormatMask)+' '
            link.appendChild date
          link.appendChild title
          li = document.createElement 'li'
          li.appendChild link
          ul.appendChild li

        el.appendChild ul
        el.setAttribute 'class', el.getAttribute('class') + ' loaded'

google.load "feeds", "1"
google.setOnLoadCallback ->
  new Feed(f) for f in document.querySelectorAll('[data-feed-url]')
