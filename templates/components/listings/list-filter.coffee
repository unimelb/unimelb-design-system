class ListFilter
  constructor: (@el) ->
    t = this
    @tables = document.querySelectorAll('ul.course-grid')

    for filter in @el.querySelectorAll('input.checkbox')
      filter.addEventListener 'change', (e) ->
        if this.checked
          t.showTable(table, this.getAttribute 'data-tag') for table in t.tables
        else
          t.hideTable(table, this.getAttribute 'data-tag') for table in t.tables

  showTable: (table, tag) ->
    for el in table.querySelectorAll('li')
      el.removeClass('hide') if el.hasClass(tag)

  hideTable: (table, tag) ->
    for el in table.querySelectorAll('li')
      el.addClass('hide') if el.hasClass(tag)

new ListFilter(el) for el in document.querySelectorAll('form.course-select')