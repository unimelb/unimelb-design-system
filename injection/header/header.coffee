window.UOMinjectHeader = ->
  # Only inject header if it doesn't already exist
  if Array.prototype.slice.call(document.querySelectorAll('.page-header')).length == 0

    # Create header and move local breadcrumb
    block = document.createElement('div')
    block.addClass('page-header')

    if Array.prototype.slice.call(document.querySelectorAll('.page-inner > .floating')).length > 0
      # Landing page header
      block.innerHTML = """
      <a class="page-header-logo" href="/">Home</a>
      """
      block.addClass('floating')

    else
      # General header
      block.innerHTML = """
      <header>
        <a class="page-header-logo" href="/">Home</a>
        <div class="page-header-navigation">
          <a href="https://unimelb.edu.au/" title="The University of Melbourne">The University of Melbourne</a>
        </div>
      </header>
      """

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

  # Page logo overriden
  parent = document.querySelector('.page-header')

  tools = document.createElement "div"
  tools.addClass('page-header-tools')
  tools.innerHTML = """
        <a class="page-header-icon" href="#sitemap" title="Search"><span class="search"></span> Search</a>
        <a class="page-header-icon" href="#sitemap" title="Login"><span class="login"></span> Login</a>
        <a class="page-header-icon" href="#sitemap" title="Menu"><span class="menu"></span> Menu</a>
  """
  parent.appendChild(tools)
