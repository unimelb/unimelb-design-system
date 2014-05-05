if Array.prototype.slice.call(document.querySelectorAll('h2[id]')).length>0
  main = document.querySelector('div[role="main"]')
  jump = document.createElement "section"
  jump.innerHTML = """
  <ul id="jump-navigation"><li>On this page</li></ul>
  """
  main.insertBefore(jump, main.firstChild.nextSibling)
  n = document.getElementById('jump-navigation')

  for h in document.querySelectorAll('h2[id]')
    link = document.createElement "a"
    link.href = "#"+h.id
    link.appendChild document.createTextNode h.textContent
    li = document.createElement "li"
    li.appendChild link
    n.appendChild li

  stickyTop = n.offsetTop
  firstFooterTop = document.querySelector('footer').offsetTop - main.offsetTop - (2 * n.offsetHeight)
  window.addEventListener "scroll", ->
    if /(Firefox)/g.test(navigator.userAgent)
      outer = document.querySelector('html')
    else
      outer = document.body
    if stickyTop < outer.scrollTop and firstFooterTop > outer.scrollTop
      n.style.setProperty('position','fixed')
      n.style.setProperty('padding','15px')
      n.parentElement.style.height = n.offsetHeight+"px"
    else
      n.style.setProperty('position','static')
