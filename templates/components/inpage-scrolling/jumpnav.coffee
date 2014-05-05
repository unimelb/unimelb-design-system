# class Jumpnav
#   constructor: (@el) ->
#     t = this

#   buildJump = ->
#     for tab in @el.querySelectorAll('.tab')
#       tab.style.display = 'none'

#     for nav in @el.querySelectorAll('nav')
#       nav.style.display = 'block'

#     for item in @el.querySelectorAll('nav a')
#       item.addEventListener 'click', (e) ->
#         e.preventDefault()
#         target = e.target || e.srcElement
#         t.move(target)

#     for el in @el.querySelectorAll('[data-tab]')
#       el.addEventListener 'click', (e) ->
#         target = e.target || e.srcElement
#         t.moveindex(target.getAttribute('data-tab')-1)
#         e.preventDefault() unless (target.hasAttribute('href') and target.getAttribute('href')[0]=="#")

#     @move(@el.querySelector('[data-current]')) if @el.querySelector('[data-current]')
#     @move(@el.querySelector('nav a:first-child')) if Array.prototype.slice.call(@el.querySelectorAll('[data-current]')).length==0

#   moveindex: (index) ->
#     for tab, i in @el.querySelectorAll('nav a')
#       if i == index
#         tab.setAttribute('data-current', '')
#       else
#         tab.removeAttribute('data-current')

#     for tab, i in @el.querySelectorAll('.tab')

# # Add blanket if not already on page
# if (supportedmodernbrowser)
#   if Array.prototype.slice.call(document.querySelectorAll('.modal__blanket')).length==0
#     el.remove() for el in document.querySelectorAll('.modal__blanket')
#     blanket = document.createElement 'div'
#     blanket.setAttribute('class', 'modal__blanket')
#     document.body.appendChild blanket

#   for trigger in document.querySelectorAll("[data-modal-target]")
#     trigger.addEventListener 'click', (e) ->
#       e.preventDefault()
#       t = e.target || e.srcElement
#       target = document.getElementById(t.getAttribute 'data-modal-target')
#       if t.getAttribute('data-modal-offset')==''
#         target.style.top = t.offsetTop-160+'px'
#         target.addClass('on')
#       else
#         target.style.top = parseInt((window.height()-target.offsetHeight)/2)-document.body.getBoundingClientRect().top+'px'
#         target.addClass('on')

#       document.querySelector('.modal__blanket').toggleClass 'on'

#   for el in document.querySelectorAll('.modal__blanket,.modal__close')
#     el.addEventListener 'click', (e) ->
#       e.preventDefault()
#       modal.removeClass 'on' for modal in document.querySelectorAll('.modal__dialog')
#       document.querySelector('.modal__blanket').toggleClass 'on'

#if Array.prototype.slice.call(document.querySelectorAll('.modal__blanket')).length==0
