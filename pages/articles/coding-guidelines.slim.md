---
title: Coding guidelines
---
header.solid-paleblue
  h1 Coding guidelines

section.lead
  p The design system has been built using <a href="http://sass-lang.com">Sass</a>, a CSS pre-processor that adds program logic, variables and nesting to simplify long and complicated stylesheet files.

section
  h2#css.title CSS Rules

  p To make style code easier to maintain, we use a few rules to keep it consistent.

  p Styles are defined one property-per-line, all lines end in a semi-colon, indented by 2 spaces, ordered alphabetically.

==syntax_highlight :html, 'css'
  erb:
    a {
      color #036;
      text-decoration: none;
    }

section
  p A new element should always have an empty line separating it from the element above, unless stacking elements.

  p Never use IDs (<code>#</code>) for style, always classes (<code>.</code>) or attributes (<code>[]</code>).

  p Named elements should be followed by their related pseudo-classes, and then anonymous classes.

==syntax_highlight :html, 'css'
  erb:
    a,
    [data-link] {
      color #036;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .error {
      color: #d33;
    }

section
  p For numbers less than one, do not use a leading 0.

==syntax_highlight :html, 'css'
  erb:
    .disabled {
      opacity: .6;
    }

section
  h2#sass.title Sass Rules

  p We use the SCSS (CSS-compatible) syntax of Sass.

  p Properties should be ordered:

  ol
    li: code @extend
    li: code @include
    li Own properties
    li Child elements

  p Where possible, follow the "inception rule": no nesting more than 3 levels deep.

  p Always use <code>$variables</code> in place of raw color values, and remember that these can still be used in <code>lighten()</code> and <code>darken()</code> SASS functions, as well as <code>rgba()</code> values.

==syntax_highlight :html, 'scss'
  erb:
    $navy: #036;
    $highlight: #69e;

    h1,
    p {
      @extend %wrapper;
      @include rem(padding-top, 15px);
      line-height: 1;
      padding-bottom: 0;

      .tight {
        padding: 0;
      }

      a {
        color: $highlight;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      span {
        display: inline-block;
      }
    }

    small {
      color: $navy;
    }

section
  p Styles are defined mobile-first, with media queries added to adjust for each larger device width/height.

==syntax_highlight :html, 'scss'
  erb:
    .box {
      margin: 0 auto;
      width: 94%;

      @media screen and (min-width: 769px) {
        width: 700px;
      }
    }

section
  p Use the <code>breakpoint</code> mixin to reduce media query boilerplate.

==syntax_highlight :html, 'scss'
  erb:
    .box {
      margin: 0 auto;
      width: 94%;

      @include breakpoint(desktop) {
        width: 700px;
      }
    }

section
  p Use the <code>rem</code> mixin to convert pixel values to rem with pixel fallback.

==syntax_highlight :html, 'scss'
  erb:
    .box {
      margin: 0 auto;
      width: 94%;

      @include breakpoint(desktop) {
        @include rem(width, 700px);
      }
    }

section
  p For naming, use semantic elements contained within an anonymously classed container, with additional variants defined by anonymous class.

==syntax_highlight :html, 'scss'
  erb:
    $highlight: #69e;
    $red: #d33;

    .box {
      a {
        color: darken($highlight, 10%);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }

        &.error {
          color: $red;
        }
      }
    }

section
  h2#javascript.title Javascript

  p We follow the rules outlined in <a href="https://github.com/rwaldron/idiomatic.js">idiomatic.js</a>

blockquote
  | All code in any code-base should look like a single person typed it, no matter how many people contributed

.jumpnav
