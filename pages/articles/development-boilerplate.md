---
title: Template Boilerplate
hidden: true
---

Creating a new site using the UoM Design System requires setting up a basic page boilerplate and then using either the [example layouts](/layouts) or [components](/components) to place component inside the ```div role="main"```.

Demonstration examples of this code can be found for many different page types in our [example layouts directory](/layouts) similar to these :

- [A Homepage](/layouts/homepage) - [(Source)](/layouts/homepage?view=source)
- [A Subpage](/layouts/article) - [(Source)](/layouts/article?view=source)

### Document structure

To use the design system, two files ```uom-[vn].css``` and ```uom-[vn].js``` must be referenced in the head. 

Please note these two files listed here are *versioned* and may not be the latest available.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <meta content="IE=edge" http-equiv="X-UA-Compatible" />
  <title> (any page title) </title>

  <!--[if lt IE 9]><script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script><![endif]-->
  <script src="//uom-templates.s3.amazonaws.com/injection/injection.js"></script>
  <link href="//uom-templates.s3.amazonaws.com/injection/injection.css" media="all" rel="stylesheet" />
  <link href="//uom-templates.s3.amazonaws.com/templates/0.1/uom.css" media="all" rel="stylesheet" />
  <script src="//uom-templates.s3.amazonaws.com/templates/0.1/uom.js"></script>
</head>

<body>
  <div class="page-inner">
    <div role="main">

      (your website markup goes here)

    </div>
  </div>
</body>
</html>
```

### Local nav

To integrate the local nav into your site, the following structure should be included *after* the ```div role="main"```.

For nested navigation, use a ```div class="inner"``` after the section index.

```html
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
```

### Breadcrumbs

To use the breadcrumb navigation, include a ```div class="page-local-history"``` *before* the div role="main" with the following structure:

```html
<div class="page-local-history">
  <a class="last" href="/" title="This page">This page</a>
  <span>/</span>
  <a href="" title="A sub-page">A sub-page</a>
</div>
```

The link with ```class="last"``` is the only one that will be shown in a responsive mobile view.

### Homepage alternate

Include a ```div class="floating"``` *before* the ```div role="main"``` (and note that this page layout cannot include a breadcrumb as well)

Additionally, a header element must be included within the ```div role="main"```. Inline styles have been added to the header in the example below to illustrate how it should be styled in your local styles - the css provided in the full design system already has this defined.

```html
<div class="floating"></div>
<div role="main">
  <header style="background-image:url(//uom-templates.s3.amazonaws.com/templates/0.1/components/globals/bg-banner-2edd2279a97e316344e7831983ef6868.jpg);background-size:cover;min-height:300px"></header>

  (your website markup goes here)

</div>
```


