---
title: Getting started
---
header
  / uncomment below to demonstrate header image
  / style="background:url(/assets/components/headers/assets/repeating-dk.png) center repeat;"

  h1 Design System Usage Instructions

  .jumpnav

section.lead
  p Creating a new site using the Design System requires setting up a basic page markup and then using either the <a href="/layouts">example layouts</a> or <a href="/components">components</a> to place component inside the <code>div role="main"</code>.

section
  p Demonstration examples of this code can be found for many different page types in our <a href="/layouts">example layouts directory</a> similar to these:

hr

section
  h2#document-structure.subtitle Document structure

  p To use the design system, add the following three resource includes into the <code>head</code> section of your page:

==syntax_highlight :html
  erb:
    <!--[if lt IE 9]><script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script><![endif]-->
    <link rel="stylesheet" href="//uom-design-system.s3.amazonaws.com/<%=settings.version%>/uom.css">
    <script src="//uom-design-system.s3.amazonaws.com/<%=settings.version%>/uom.js"></script>

section
  p The first provides a universal <abbr title="Reproduce modern functionality in older browser">polyfill</abbr> for styling on HTML5 semantic elements such as <code>header</code>, <code>nav</code> and <code>section</code> We use these elements as selectors in the design system stylesheet.

  p At a bare minimum, you should include the following markup in your page:

==syntax_highlight :html
  erb:
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <title> (any page title) </title>

      <!--[if lt IE 9]><script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script><![endif]-->
      <link rel="stylesheet" href="//uom-design-system.s3.amazonaws.com/<%=settings.version%>/uom.css">
      <script src="//uom-design-system.s3.amazonaws.com/<%=settings.version%>/uom.js"></script>
    </head>

    <body>
      <div class="uomcontent">
        <div class="page-inner">
          <div role="main">

            (your website markup goes here)

          </div>
        </div>
      </div>
    </body>
    </html>

hr

section
  h2#local-nav Local nav

  p To integrate a local nav into your site, include the following structure after the <code>div role="main"</code>.

  p For nested navigation, use a <code>div class="inner"</code> as demonstrated below.

==syntax_highlight :html
  erb:
    <div class="no-js" id="sitemap" role="navigation">
      <h2>Section title</h2>
      <ul>
        <li>
          <a href="/another">Link to another page</a>
        </li>
        <li>
          <a href="/sub-section">Sub-section</a>

          <div class="inner">
            <ul>
              <li>
                <a href="/sub-section/a-page">A page in the sub-section</a>
              </li>
              <li>
                <a href="/sub-section/another">Another page</a>

                <div class="inner">
                  <ul>
                    <li>
                      <a href="/sub-section/another/another">3rd level</a>
                    </li>
                  </ul>
                </div>

              </li>
            </ul>
          </div>

        </li>
        <li><a href="/last-one">Last one</a></li>
      </ul>
    </div>

section
  p In situations where the site does not sit at the root of its domain (ie. within a subdirectory), the site root can be set to any arbitrary value by adding a <code>data-absolute-root</code> attribute to the local nav div. This value will be inserted before any nav links, so make sure you use relative links, eg.

==syntax_highlight :html
  erb:
    <div class="no-js" id="sitemap" role="navigation" data-absolute-root="/sitehome">
    ...
    </div>

section
  p This is part of a much larger discussion, but please be aware that the local navigation only displays <strong>end pages</strong> in the structure, so in the example listed above there is no direct link to <code>/sub-section</code> or <code>/sub-section/another</code>. This is intentional, and in most circumstances this type of page ("landing" page) should only contain a basic list of links to its children, eg. <a href="/components">the index of components on this site</a>.

hr

section
  h2#breadcrumbs Breadcrumbs

  p We use <a href="http://schema.org/itemListElement">schema.org microdata for breadcrumbs</a> to enhance machine understanding. To use the breadcrumb navigation on your site, include the following markup structure before the <code>div role="main"</code>:

==syntax_highlight :html
  erb:
    <ol class="page-local-history" itemscope="" itemtype="http://schema.org/BreadcrumbList">
      <li class="root" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
        <a href="/" title="Website Home" itemprop="item">
          <span itemprop="name">Website Home</span>
        </a>
        <meta content="1" itemprop="position" />
      </li>
      <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
        <a href="/layouts" itemprop="item" title="Layouts">
          <span itemprop="name">Layouts</span>
        </a>
        <meta content="2" itemprop="position" />
      </li>
      <li class="last" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
        <a href="" itemprop="item" title="Source">
          <span itemprop="name">Source</span>
        </a>
        <meta content="3" itemprop="position" />
      </li>
    </ol>

section
  p Please note this replaces the previous markup used in v1.0 and earlier.

  p Each <code>meta itemprop="position"</code> should be numbered consecutively, and remember to duplicate the link text in the parent link <code>title</code>.

  p The mobile breadcrumb selector is generated from the above markup (you can try it <a href="#top">on this page</a> at less than 768px width).

hr

section
  h2#homepage Homepage alternate

  p Include a <code>div class="floating"</code> *before* the <code>div role="main"</code> (and note that this page layout cannot include a breadcrumb as well)

  p Additionally, a header element must be included within the <code>div role="main"</code>. Inline styles have been added to the header in the example below to illustrate how it should be styled in your local styles - the css provided in the full design system already has this defined.

==syntax_highlight :html
  erb:
    <div class="floating"></div>
    <div role="main">
      <header style="background-image:url(//uom-design-system.s3.amazonaws.com/templates/0.1/components/globals/bg-banner-2edd2279a97e316344e7831983ef6868.jpg);background-size:cover;min-height:300px"></header>

      (your website markup goes here)

    </div>

section
  p Occasionally, a site will need to co-brand the logo space - this can be done by adding a special link inside the <code>div class="floating"</code> as shown in the example below:

==syntax_highlight :html
  erb:
    <div class="floating">
      <a class="page-header-home" href="/">Faculty of Veterinary and Agricultural Sciences</a>
    </div>

section
  p
    <img src="/assets/images/fvas-header.jpg" alt="">

hr

section
  h2#login Login section

  h3 Login modal dialog (popup box)

  p To include a login section in the page header, add a code block as with the breadcrumbs above, but this time include a <code>div class="page-local-login"</code> before the <code>div role="main"</code>. Everything inside this div will be moved to a modal window, so you can use the login markup you require:

==syntax_highlight :html
  erb:
    <div class="page-local-login">
      <h1>
        Login
      </h1>
      <form action="" data-validate="" method="post">
        <fieldset>
          <div>
            <label data-required="true" for="f-email">Email: </label><input aria-required="true" data-error="Please enter a valid email." data-pattern="email" id="f-email" name="f[email]" type="email" />
          </div>
          <div>
            <label data-required="true" for="f-password">Password: </label><input aria-required="true" data-error="Please enter your password." id="f-password" name="f[password]" type="password" />
          </div>
        </fieldset>
        <footer>
          <input type="submit" value="Login" />
        </footer>
      </form>
    </div>

section
  p You will also need to add a class <code>with-login</code> to the main section below it:

==syntax_highlight :html
  erb:
    <div role="main" class="with-login">
      ...

section
  p An example of this can be seen on <a href="/layouts/with-login">this example layout</a>. Note that the title of the login button in the header can be manipulated by using the <code>data-title</code> attribute on this element, if for example you want to change the title to "Logout" when a user is logged in. The title will be "Login" by default, and there is a hard limit of 7 characters to protect the header design.

  h3 Login link

  p If your login requires a direct link to a known page instead, you can leave the <code>div class="page-local-login"</code> empty and add a <code>data-href</code> attribute with the link location. This method is demonstrated on <a href="/layouts/with-login-link">this example layout</a> instead.

==syntax_highlight :html
  erb:
    <div class="page-local-login" data-href="/login"></div>

footer
