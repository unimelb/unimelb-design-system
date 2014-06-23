unless window.UOMListFilter
  window.UOMListFilter = ->
    class ListFilter
      constructor: (@el) ->
        t = this

        @tables = document.querySelectorAll('ul.course-grid')
        @select = @el.querySelector('select')
        @curr = @select.value

        if typeof Isotope != 'undefined'
          @isos = new Array

          for table, i in @tables
            @isos[i] = new Isotope table,
              itemSelector: '.item'
              layoutMode: 'fitRows'
              masonry:
                columnWidth: '.item'

        for filter in @el.querySelectorAll('input.checkbox')
          filter.addEventListener 'change', (e) ->
            for table in t.tables
              if this.checked
                t.showTable(table, this.getAttribute 'data-tag')
              else
                t.hideTable(table, this.getAttribute 'data-tag')

          # IE8
          filter.addEventListener 'click', (e) ->
            for table in t.tables
              if this.checked
                t.showTable(table, this.getAttribute 'data-tag')
              else
                t.hideTable(table, this.getAttribute 'data-tag')

            t.redraw()

        @select.addEventListener 'change', (e) ->
          t.curr = this.value
          t.redraw()

      redraw: ->
        for table in @tables
          category = table.parentNode.parentNode
          if table.countSelector('.item') > 0 and (@curr == '-1' or (category.hasAttribute('data-category') and @curr in category.getAttribute('data-category').split('|')))
            category.removeClass('hide')
          else
            category.addClass('hide')

        if typeof Isotope != 'undefined'
          for iso in @isos
            iso.arrange
              filter: '.item'

      showTable: (table, tag) ->
        for el in table.querySelectorAll('li')
          el.addClass('item') if el.hasClass(tag)

      hideTable: (table, tag) ->
        for el in table.querySelectorAll('li')
          el.removeClass('item') if el.hasClass(tag)

    new ListFilter(el) for el in document.querySelectorAll('form.course-select')

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMListFilter()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMListFilter()
