if supportedmodernbrowser
  for el in document.querySelectorAll('a[href^="#"]')
    unless el.hasAttribute('data-tab')
      el.addEventListener 'click', (e) ->
        e.preventDefault()
        target = document.querySelector(this.getAttribute('href'))
        console.log target.offsetTop
        scrollTo(target.offsetTop, 600)
