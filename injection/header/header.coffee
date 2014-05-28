window.UOMinjectHeader = ->
  # Only inject header if it doesn't already exist
  if Array.prototype.slice.call(document.querySelectorAll('.page-header')).length == 0

    # Create header and move local breadcrumb
    block = document.createElement('div')
    block.addClass('page-header')

    if Array.prototype.slice.call(document.querySelectorAll('div[role="main"].skip-header')).length > 0
      # Landing page header
      html = """
      <a class="page-header-logo floating" href="/">Home</a>
      <div class="page-header-tools floating">
        <a class="page-header-icon" href="#sitemap" title="Menu"><span class="menu"></span> Menu</a>
      </div>
      """

    else
      # General header
      html = """
      <header>
        <a class="page-header-logo" href="/">Home</a>
        <div class="page-header-navigation">
          <a href="https://unimelb.edu.au/" title="The University of Melbourne">The University of Melbourne</a>
        </div>
        <div class="page-header-tools">
          <a class="page-header-icon" href="#sitemap" title="Menu"><span class="menu"></span> Menu</a>
        </div>
      </header>
      """

    block.innerHTML = html
    parent = document.querySelector('.page-inner')
    parent.insertBefore(block, parent.firstChild)

    if Array.prototype.slice.call(document.querySelectorAll('.page-local-history')).length==1
      local = document.querySelector('.page-local-history')
      local.parentNode.removeChild(local)

      parent = document.querySelector('.page-header-navigation')
      sep = document.createElement "span"
      sep.innerHTML = "/"
      parent.appendChild(sep)
      parent.appendChild(local)
