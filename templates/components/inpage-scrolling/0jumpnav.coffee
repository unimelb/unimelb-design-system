class StickyNav
  constructor: ->
    @main = document.querySelector('div[role="main"]')
    @jump = document.createElement "section"
    @jump.innerHTML = """
<ul id="jump-navigation"><li>On this page</li></ul>
"""
    @main.insertBefore(@jump, @main.firstChild.nextSibling)
    @n = document.getElementById('jump-navigation')

    @nPadding = 30 # 15 top + 15 bottom
    @fPadding = 60 # 30 top + 30 bottom

    if /(Firefox)/g.test(navigator.userAgent)
      @outer = document.querySelector('html')
    else
      @outer = document.body

    for h in document.querySelectorAll('h2[id]')
      link = document.createElement "a"
      link.href = "#"+h.id
      link.appendChild document.createTextNode h.textContent
      li = document.createElement "li"
      li.appendChild link
      @n.appendChild li

    # Arbitrary delay to allow calculation of CSS block hiding - page load on local can run up to 400ms
    t = this
    timeout = setTimeout(->
      t.stickyTop = t.n.offsetTop
      t.stickyEnd = t.main.offsetHeight + t.main.offsetTop - t.n.offsetHeight - t.nPadding
      t.stickyEnd = t.stickyEnd - t.fPadding - document.querySelector('footer.cta').offsetHeight if Array.prototype.slice.call(document.querySelectorAll('footer.cta')).length>0

      window.addEventListener "scroll", ->
        t.stickify()

      t.stickify()
    , 400)

  stickify: ->
    if @stickyTop < @outer.scrollTop and @stickyEnd > @outer.scrollTop
      @n.parentElement.style.height = @n.offsetHeight+"px"
      @n.addClass('jump-fixed')
    else
      @n.removeClass('jump-fixed')

el = new StickyNav() if Array.prototype.slice.call(document.querySelectorAll('h2[id]')).length>0
