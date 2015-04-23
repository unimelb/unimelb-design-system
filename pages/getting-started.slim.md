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
    <div class="no-js" id="navigation" role="navigation">
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
    <div class="no-js" id="navigation" role="navigation" data-absolute-root="/sitehome">
    ...
    </div>

hr

section
  h2#breadcrumbs Breadcrumbs

  p To use the breadcrumb navigation, include a <code>div class="page-local-history"</code> before the <code>div role="main"</code> with the following structure:

==syntax_highlight :html
  erb:
    <div class="page-local-history">
      <a class="root" href="/" title="Website Home">Home</a>
      <span>/</span>
      <a class="last" href="" title="A sub-page">A sub-page</a>
    </div>

section
  p The link with <code>class="last"</code> is the only one that will be shown in a responsive mobile view.

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
