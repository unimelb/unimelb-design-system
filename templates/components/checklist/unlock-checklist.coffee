unless window.UOMUnlockChecklist
  window.UOMUnlockChecklist = ->
    class UnlockChecklist
      constructor: (@el) ->
        t = this
        @target = document.getElementById(@el.getAttribute 'data-unlock-target')
        @target.addEventListener 'click', (e) ->
          e.preventDefault() if this.hasClass 'disabled'

        @items = @el.querySelectorAll('li')
        @active = @el.countSelector('.on')
        @toggleDisable()

        for item in @items
          item.addEventListener 'click', (e) ->
            target = e.target || e.srcElement
            if (target.nodeName=='INPUT' or target.nodeName=='LABEL')
              if this.hasClass('on')
                t.active -= 1
              else
                t.active += 1

              t.toggleDisable()

      toggleDisable: ->
        if @active == @items.length
          @target.removeClass 'disabled'
          @target.removeAttribute('disabled')
        else
          @target.addClass 'disabled'
          @target.setAttribute('disabled', 'disabled')

    for list in document.querySelectorAll('ul.checklist[data-unlock-target]')
      new UnlockChecklist(list)

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMUnlockChecklist()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMUnlockChecklist()
