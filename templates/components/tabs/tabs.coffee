window.UOMTabs = ->
  class Tabbed
    constructor: (@el) ->
      t = this
      tabs = []

      @el.querySelector('nav').addClass('active') if Array.prototype.slice.call(@el.querySelectorAll('nav')).length > 0
      @el.querySelector('.mobile-nav').addClass('active') if Array.prototype.slice.call(@el.querySelectorAll('.mobile-nav')).length > 0

      for tab in @el.querySelectorAll('.tab')
        tab.style.display = 'none'
        tabs.push tab.id || ''

      for item in @el.querySelectorAll('nav a')
        item.addEventListener 'click', (e) ->
          target = e.target || e.srcElement
          t.move(target)
          setTimeout(->
            window.location.hash = target.getAttribute('href').substr(1)
          , 600)

      if Array.prototype.slice.call(@el.querySelectorAll('select')).length > 0
        @el.querySelector('select').addEventListener 'change', (e) ->
          if this.value
            curr = 1
            tab = this.value
            for opt, i in this.querySelectorAll('option')
              curr = i+1 if opt.value==tab
            t.moveindex(curr)
            setTimeout(->
              window.location.hash = tab.substr(1)
            , 600)

      curr = window.location.hash.substr(1)

      if (curr in tabs)
        @moveindex tabs.indexOf(curr)+1
      else if Array.prototype.slice.call(@el.querySelectorAll('[data-current]')).length==0
        @move @el.querySelector('nav a:first-child')
      else
        @move @el.querySelector('[data-current]')

      for el in @el.querySelectorAll('[data-tab]')
        el.addEventListener 'click', (e) ->
          target = e.target || e.srcElement
          t.moveindex(target.getAttribute('data-tab'))
          setTimeout(->
            window.location.hash = target.getAttribute('href').substr(1)
          , 600)

    moveindex: (index) ->
      for tab, i in @el.querySelectorAll('nav a')
        if i == index-1
          tab.setAttribute('data-current', '')
        else
          tab.removeAttribute('data-current')

      for opt, i in @el.querySelectorAll('option')
        if i == index-1
          opt.setAttribute('selected', 'selected')
        else
          opt.removeAttribute('selected')

      for tab, i in @el.querySelectorAll('.tab')
        if i == index-1
          tab.setAttribute('data-current', '')
          tab.style.display = 'block'
        else
          tab.removeAttribute('data-current')
          tab.style.display = 'none'

    move: (clicked) ->
      curr = 0
      for tab, i in @el.querySelectorAll('nav a')
        if tab == clicked
          tab.setAttribute('data-current', '')
          curr = i
        else
          tab.removeAttribute('data-current')

      for opt, i in @el.querySelectorAll('option')
        if i == curr
          opt.setAttribute('selected', 'selected')
        else
          opt.removeAttribute('selected')

      for tab, i in @el.querySelectorAll('.tab')
        if i == curr
          tab.setAttribute('data-current', '')
          tab.style.display = 'block'
        else
          tab.removeAttribute('data-current')
          tab.style.display = 'none'

  if (supportedmodernbrowser)
    new Tabbed(el) for el in document.querySelectorAll('[data-tabbed]')

if window.attachEvent
  window.attachEvent 'onload', ->
    UOMTabs()
else
  document.addEventListener 'DOMContentLoaded', ->
    UOMTabs()

