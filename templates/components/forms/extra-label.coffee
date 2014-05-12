class ExtraLabel
  constructor: (@el) ->
    t = this
    @el.parentNode.addEventListener 'click', (e) ->
      this.querySelector('input[type="radio"],input[type="checkbox"]').click()

new ExtraLabel(control) for control in document.querySelectorAll('input[type="radio"],input[type="checkbox"]')
