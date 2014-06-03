window.UOMExtraLabel = ->
  class ExtraLabel
    constructor: (@el) ->
      t = this
      @el.parentNode.addEventListener 'click', (e) ->
        if t.el.checked
          this.addClass("on")
        else
          this.removeClass("on")
        target = e.target || e.srcElement
        t.el.click() unless (target.nodeName=='INPUT' or target.nodeName=='LABEL')

  new ExtraLabel(control) for control in document.querySelectorAll('input[type="radio"],input[type="checkbox"]')

if window.attachEvent
  window.attachEvent 'onload', ->
    UOMModal()
else
  document.addEventListener 'DOMContentLoaded', ->
    UOMModal()
