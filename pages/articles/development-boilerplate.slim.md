---
title: Design System Boilerplate
---
header.solid-paleblue
  h1 Design System Boilerplate

section.lead
  p Creating a new site using the UoM Design System requires setting up a basic page markup and then using either the [example layouts](/layouts) or [components](/components) to place component inside the ```div role="main"```.

section
  p Demonstration examples of this code can be found for many different page types in our [example layouts directory](/layouts) similar to these :

section
  h2#document-structure.subtitle Document structure

  p To use the design system, add the following three resource includes into the <code>head</code> section of your page:

==syntax_highlight :html
  erb:
    <!--[if lt IE 9]><script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script><![endif]-->
    <link rel="stylesheet" href="http://uom-design-system.s3-ap-southeast-2.amazonaws.com/v0.3/uom.css">
    <script src="http://uom-design-system.s3-ap-southeast-2.amazonaws.com/v0.3/uom.js"></script>

section
  p The first provides a universal <abbr title="Reproduce modern functionality in older browser">polyfill</abbr> for styling on HTML5 semantic elements such as <code>header</code>, <code>nav</code> and <code>section</code> We use these elements as selectors in the design system stylesheet.

  p At its most minimal, you should include the following "boilerplate" layout:

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
      <link rel="stylesheet" href="http://uom-design-system.s3-ap-southeast-2.amazonaws.com/v0.3/uom.css">
      <script src="http://uom-design-system.s3-ap-southeast-2.amazonaws.com/v0.3/uom.js"></script>
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

section
  p Please note that in the example above, <code>v0.3</code> refers to a specific version of the design system and may not be the current version! Please refer to the homepage.

