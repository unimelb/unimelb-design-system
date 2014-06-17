unless window.UOMListFilter
  window.UOMListFilter = ->
    class ListFilter
      constructor: (@el) ->
        t = this

        @isos = new Array

        for grid, i in document.querySelectorAll('.course-grid')
          @isos[i] = new Isotope grid,
            itemSelector: '.item'
            layoutMode: 'fitRows'

        @tables = document.querySelectorAll('ul.course-grid')

        for filter in @el.querySelectorAll('input.checkbox')
          filter.addEventListener 'change', (e) ->
            for table in t.tables
              if this.checked
                t.showTable(table, this.getAttribute 'data-tag')
              else
                t.hideTable(table, this.getAttribute 'data-tag')

            for iso in t.isos
              iso.arrange
                filter: '.item'

            for grid in document.querySelectorAll('.course-section')
              if grid.countSelector('.item') == 0
                grid.addClass('hide')
              else
                grid.removeClass('hide')

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
