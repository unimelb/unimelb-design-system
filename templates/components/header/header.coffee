if Array.prototype.slice.call(document.querySelectorAll('div[role="main"].skip-header')).length==0
  block = document.createElement('div')
  block.addClass('page-header')
  block.innerHTML = """
  <header><a class="page-header-logo" href="http://www.unimelb.edu.au"><!--[if lt IE 9]><img alt="UoM Logo" src="/assets/components/header/header-logo-192bc4fc856e753fa3ae99bbe58e8af7.png" /><![endif]--><!--[if gte IE 9]><!--><img alt="UoM Logo" src="/assets/components/header/header-logo-1934166fed7fa00bf1e069d490c4e5fd.svg"><!--<![endif]--></a><div class="page-header-navigation"><a href="https://unimelb.edu.au" title="The University of Melbourne">The University of Melbourne</a><span>/</span><a class="last" href="/" title="Web Templates">Web Templates</a><span>/</span><a href="" title="Buttons">Buttons</a></div><div class="page-header-tools"><a class="page-header-icon menu" href="#index" title="Menu"><!--[if lt IE 9]><img alt="" src="/assets/components/header/menu-e38e5801aa0e2e4eb23e375093157f92.png" /><![endif]--><!--[if gte IE 9]><!--><img alt="" src="/assets/components/header/menu-783164750fe6981e545a91b4d63bf863.svg"><!--<![endif]-->Menu </a></div></header>
  """
  parent = document.querySelector('.page-inner')
  parent.insertBefore(block, parent.firstChild)
