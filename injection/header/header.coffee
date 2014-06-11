window.UOMinjectHeader = ->
  # Only inject header if it doesn't already exist
  if document.countSelector('.page-header') == 0

    # Create header and move local breadcrumb
    block = document.createElement('div')
    block.addClass('page-header')

    if document.countSelector('.page-inner > .floating') > 0
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

    if document.countSelector('.page-local-history') == 1
      local = document.querySelector('.page-local-history')
      local.parentNode.removeChild(local)

      parent = document.querySelector('.page-header-navigation')
      sep = document.createElement "span"
      sep.innerHTML = "/"
      parent.appendChild(sep)
      parent.appendChild(local)


  # Set up login modal and attach to page
  unless document.querySelector('[role="main"]').hasClass "no-login"
    parent = document.querySelector('.page-inner')
    loginmodal = document.createElement "div"
    loginmodal.addClass('modal__dialog')
    loginmodal.id = 'uom-login'
    loginmodal.innerHTML = """
            <h2 class="title">Please Choose</h2>
            <div class="half">
              <a class="button-fill" href="">
                <i class="icon-student"></i>
                <h2>Current Student</h2>
                <p>Click here to get to the student portal</p>
              </a>
              <a class="button-fill" href="">
                <i class="icon-staff"></i>
                <h2>Staff Member</h2>
                <p>Click here to get to the staff portal</p>
              </a>
            </div>
    """
    parent.appendChild loginmodal

  # Header tools
  parent = document.querySelector('.page-header')
  tools = document.createElement "div"
  tools.addClass('page-header-tools')
  if document.querySelector('[role="main"]').hasClass "no-login"
    tools.innerHTML = """
          <a class="page-header-icon" href="#sitemap" title="Search"><span class="icon search"></span> Search</a><!--
          --><a class="page-header-icon" href="#sitemap" title="Menu"><span class="icon menu"></span> Menu</a>
    """
  else
    tools.innerHTML = """
          <a class="page-header-icon" href="#sitemap" title="Search"><span class="icon search"></span> Search</a><!--
          --><a class="page-header-icon" href="#sitemap" title="Login" data-modal-target="uom-login"><span class="icon login"></span> Portal</a><!--
          --><a class="page-header-icon" href="#sitemap" title="Menu"><span class="icon menu"></span> Menu</a>
    """
  parent.appendChild(tools)
