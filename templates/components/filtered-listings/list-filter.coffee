unless window.UOMListFilter
  window.UOMListFilter = ->
    class ListFilter
      constructor: (@el) ->
        t = this

        @tables = document.querySelectorAll('ul.filtered-listing-grid')
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

        @categories = @el.querySelectorAll('input.checkbox:not([data-tag="all"])')
        @allcategories = @el.querySelector('input.checkbox[data-tag="all"]')

        # Preselect via query ?filter=data-tag,other-data-tag
        q = window.location.search.split(/\?/)
        q = q[1] if q.length > 1
        q = q.split("&") if q.length > 1
        q2 = ""
        if q.length > 0
          for pair in q
            tmp = pair.split("=")
            if tmp[0] == "filter"
              q2 = tmp[1]
        q2 = q2.split(",") if q2.length > 1

        for filter in @el.querySelectorAll('input.checkbox')
          filter.addEventListener 'click', (e) ->
            t.process(e.target || e.srcElement)

          # Check preselects
          for preselected in q2
            if preselected == filter.getAttribute 'data-tag'
              filter.click()

        @process()

        @select.addEventListener 'change', (e) ->
          t.curr = this.value
          t.redraw()

      process: (target) ->
        if @allcategories and target and target.getAttribute('data-tag') == 'all' and target.checked
          for category in @categories
            category.checked = false
          @showAllTables()

        else
          @allcategories.checked = false if @allcategories

          displayed_categories = []
          for category in @categories
            if category.checked
              displayed_categories.push category.getAttribute('data-tag')

          if displayed_categories.length == 0
            if @allcategories
              @allcategories.checked = true
            else
              for category in @categories
                category.checked = true
            @showAllTables()

          else
            for table in @tables
              @showTable(table, displayed_categories)

        @redraw()

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

      showTable: (table, selectedtags) ->
        for el in table.querySelectorAll('li')
          show = false
          for tag in selectedtags
            if el.hasClass(tag)
              show = true

          if show
            el.addClass('item')
          else
            el.removeClass('item')

      hideTable: (table, tag) ->
        for el in table.querySelectorAll('li')
          el.removeClass('item') if el.hasClass(tag)

      showAllTables: ->
        for table in @tables
          for el in table.querySelectorAll('li')
            el.addClass('item')

    new ListFilter(el) for el in document.querySelectorAll('form.filtered-listing-select')
