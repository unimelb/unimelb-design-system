unless window.UOMTableLabels
  window.UOMTableLabels = ->
    class TableLabels
      constructor: (@el) ->
        t = this
        labels = t.el.querySelectorAll('thead th')
        for row in t.el.querySelectorAll('tr:not(.header)')
          for cell, index in row.querySelectorAll('td')
            if labels[index]
              cell.setAttribute "data-label", labels[index].innerText


    for table in document.querySelectorAll('table')
      new TableLabels(table)
