unless window.UOMModal
  window.UOMModal = ->
    # Add blanket if not already on page
    if (supportedmodernbrowser)
      if Array.prototype.slice.call(document.querySelectorAll('.modal__blanket')).length==0
        blanket = document.createElement 'div'
        blanket.setAttribute('class', 'modal__blanket')
        document.querySelector('div[role="main"]').appendChild blanket

      blanket = document.querySelector('.modal__blanket')

      for trigger in document.querySelectorAll("[data-modal-target]")
        trigger.addEventListener 'click', (e) ->
          e.preventDefault()
          t = e.target || e.srcElement
          target = document.getElementById(t.getAttribute 'data-modal-target')
          if t.getAttribute('data-modal-offset')==''
            target.style.top = t.offsetTop-160+'px'
            target.addClass('on')
          else
            target.style.top = parseInt((window.height()-target.offsetHeight)/2)-document.body.getBoundingClientRect().top+'px'
            target.addClass('on')

          blanket.addClass 'on'

      for el in document.querySelectorAll('.modal__blanket,.modal__close')
        el.addEventListener 'click', (e) ->
          e.preventDefault()
          modal.removeClass 'on' for modal in document.querySelectorAll('.modal__dialog')
          blanket.removeClass 'on'
