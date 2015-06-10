unless window.UOMModal
  window.UOMModal = ->
    # Add blanket if not already on page
    blanket = document.querySelector('.modal__blanket')
    unless blanket
      blanket = document.createElement 'div'
      blanket.setAttribute('class', 'modal__blanket')
      document.querySelector('.uomcontent').appendChild blanket

    # Move modal dialogs to document root
    parent = document.querySelector('.uomcontent')
    for modal in document.querySelectorAll('.modal__dialog')
      modal.parentNode.removeChild(modal)
      parent.appendChild modal

    for trigger in document.querySelectorAll("[data-modal-target]")
      trigger.addEventListener 'click', (e) ->
        e.preventDefault()
        target = document.getElementById(this.getAttribute 'data-modal-target')

        if this.getAttribute('data-modal-offset')==''
          target.style.top = this.offsetTop-160+'px'
          target.addClass('on')
        else
          viewport = document.body.getBoundingClientRect()
          top = parseInt( (window.height() - target.offsetHeight) / 2 )
          target.style.top = (top - viewport.top)+'px'
          target.addClass('on')

        blanket.addClass 'on'

    for el in document.querySelectorAll('.modal__blanket,.modal__close')
      el.addEventListener 'click', (e) ->
        e.preventDefault()
        for modal in document.querySelectorAll('.modal__dialog')
          modal.removeClass 'on'
        blanket.removeClass 'on'
