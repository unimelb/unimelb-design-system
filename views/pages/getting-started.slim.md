---
title: Getting started
---
.headerless
.jumpnav

h1.aligned-title Design System Usage Instructions

section.lead.left
  p Creating a new site using the Design System requires setting up a basic page markup and then using either the <a href="/layouts">example layouts</a> or <a href="/components">components</a> to place component inside the <code>div role="main"</code>.

p Demonstration examples of this code can be found for many different page types in our <a href="/layouts">example layouts directory</a> similar to these:

hr

section
  h2#document-structure.subtitle Document structure

  p To use the design system, add the following resource includes into the <code>head</code> section of your page:

  pre: code.html
    ==convert_tags
      erb:
        <link rel="stylesheet" href="<%=opts[:cdnurl]%>/<%=opts[:version]%>/uom.css">
        <script src="<%=opts[:cdnurl]%>/<%=opts[:version]%>/uom.js"></script>

  p At a bare minimum, you should include the following markup in your page:

  pre: code.html
    ==convert_tags
      erb:
        <!DOCTYPE html>
        <html lang="en" class="no-js">
        <head>
          <meta charset="utf-8" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <meta content="IE=edge" http-equiv="X-UA-Compatible" />
          <title> (any page title) </title>
          <link rel="stylesheet" href="<%=opts[:cdnurl]%>/<%=opts[:version]%>/uom.css">
          <script src="<%=opts[:cdnurl]%>/<%=opts[:version]%>/uom.js"></script>
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

  p For nested navigation, use a <code>div class="inner"</code> as demonstrated below. You can have multiple levels of nesting, but this is not recommended. If your system doesn't allow you to add <code>inner</code> containers, you may omit them and just use nested lists.

  pre: code.html
    ==convert_tags
      erb:
        <div id="sitemap" role="navigation">
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

  p In situations where the site does not sit at the root of its domain (ie. within a subdirectory), the site root can be set to any arbitrary value by adding a <code>data-absolute-root</code> attribute to the local nav div. This value will be inserted before any nav links, so make sure you use relative links, eg.

  pre: code.html
    ==convert_tags
      erb:
        <div id="sitemap" role="navigation" data-absolute-root="/sitehome">
        ...
        </div>

  p This is part of a much larger discussion, but please be aware that the local navigation only displays <strong>end pages</strong> in the structure, so in the example listed above there is no direct link to <code>/sub-section</code> or <code>/sub-section/another</code>. This is intentional, and in most circumstances this type of page ("landing" page) should only contain a basic list of links to its children, eg. <a href="/components">the index of components on this site</a>.

hr

section
  h2#breadcrumbs Breadcrumbs

  p We use <a href="http://schema.org/itemListElement">schema.org microdata for breadcrumbs</a> to enhance machine understanding. To use the breadcrumb navigation on your site, include the following markup structure before the <code>div role="main"</code>:

  pre: code.html
    ==convert_tags
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

  p Each <code>meta itemprop="position"</code> should be numbered consecutively, and remember to duplicate the link text in the parent link <code>title</code>.

  p The mobile breadcrumb selector is generated from the above markup (you can try it <a href="#top">on this page</a> at less than 768px width).

hr

section
  h2#homepage Homepage alternate

  p Include a <code>div class="floating"</code> *before* the <code>div role="main"</code> (and note that this page layout cannot include a breadcrumb as well)

  p Additionally, a header element must be included within the <code>div role="main"</code>. Inline styles have been added to the header in the example below to illustrate how it should be styled in your local styles - the css provided in the full design system already has this defined.

  pre: code.html
    ==convert_tags
      erb:
        <div class="floating"></div>
        <div role="main">
          <header style="background-image:url(<%=opts[:cdnurl]%>/templates/0.1/components/globals/bg-banner-2edd2279a97e316344e7831983ef6868.jpg);background-size:cover;min-height:300px"></header>
          (your website markup goes here)
        </div>

  p Occasionally, a site will need to co-brand the logo space - this can be done by adding a special link inside the <code>div class="floating"</code> as shown in the example below:

  pre: code.html
    ==convert_tags
      erb:
        <div class="floating">
          <a class="page-header-home" href="/">Faculty of Veterinary and Agricultural Sciences</a>
        </div>

  p: img src="/assets/fvas-header.jpg" alt=""

hr

section
  h2#login Login link
  p To show a login link in the header between the <em>Search</em> and <em>Menu</em> buttons, add the following snippet before <code>div role="main</code>, as demonstrated in <a href="/layouts/with-login">this example layout</a>:

  pre: code.html
    ==convert_tags
      erb:
        <div class="page-local-login" data-href="/login"></div>

  p Don't forget to specify the correct login URL in the <code>data-href</code> attribute. The text of the link can be manipulated using the <code>data-title</code> attribute on this element, if for example you want to change the title to "Logout" when a user is logged in. The text will be "Login" by default, and there is a hard limit of 7 characters to protect the header design.

  p.notice.notice--info <strong>Note:</strong> Up to v4.4 of the design system, it was a requirement to add class <code>with-login</code> to <code>div role="main</code>. This is no longer the case.
  p.notice.notice--warning <strong>Beware:</strong> The login modal feature present in v4.4 and below is no longer supported. The login button may only link to an external URL.
