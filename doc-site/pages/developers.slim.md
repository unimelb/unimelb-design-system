---
title: For Developers
---
header.solid-paleblue
  h1 Developers

section

  / p How to get started

  / ol
  /   li: a href="/articles/development-boilerplate" Development boilerplate
  /   li: a href="/articles/using-example-layouts" Using example layouts
  /   li: a href="/articles/development-adding-components" Adding components

  / p Contributing to the templates

  / ol
  /   li: a href="" Understanding the template repository
  /   li: a href="" Setting up a development environment to contribute
  /   li: a href="" Component based front-end architecture (and why we use it)

  / p General background

  / ol
  /   li: a href="" Why Custom.css has to die (hint: it has to do with / maintainability)

  / p Note: If you are not a developer and do not need your site to do / especially complicated things, we strongly (strongly, strongly) recommend / that you use a university supported CMS. This will make your life much easier.


  p The design system has been created with the following principles in mind.

  ol
    li You should never <em>need</em> a custom.css or custom.js file.
    li Code for example layouts and components should be provided along with examples of implementation.
    li The design system is technology agnostic in the first instance. We cannot support CMS implementations of template code.
    li However, we will work with CMS experts (eg. Squiz) to integrate with major, university supported CMS's
    li Assets are stored centrally on a CDN to ensure maximum performance and maintainability over time.
    li If something is broken, you should <a href="/articles/how-to-contribute">contribute a fix</a>.
    li If something is not there, it is better to <a href="/articles/how-to-contribute">contribute it</a>.
    li Component code should be isolated and stored separately as far as is practical.
    li The documentation site should immediately show you the effect of changes made to enable contribution
    li Pull-requests should be used to
