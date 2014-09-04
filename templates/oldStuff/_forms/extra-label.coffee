unless window.UOMExtraLabel
  window.UOMExtraLabel = ->
    class ExtraLabel
      constructor: (@el) ->
        t = this
        @el.parentNode.addClass "cursor"
        @el.parentNode.addEventListener 'click', (e) ->
          if t.el.checked
            this.addClass("on")
          else
            this.removeClass("on")
          target = e.target || e.srcElement
          unless (target.nodeName=='INPUT' or target.nodeName=='LABEL')
            t.el.click()

    for control in document.querySelectorAll('input[type="radio"],input[type="checkbox"]')
      new ExtraLabel(control)

  if window.attachEvent
    window.attachEvent 'onload', ->
      UOMExtraLabel()
  else
    document.addEventListener 'DOMContentLoaded', ->
      UOMExtraLabel()
