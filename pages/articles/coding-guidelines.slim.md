---
title: Coding guidelines
---
header.solid-paleblue
  h1 Coding guidelines

section
  h2.title CSS

  p The design system has been built using <a href="http://sass-lang.com">SCSS</a>, a CSS pre-processor that adds program logic, variables and nesting to simplify long and complicated stylesheet files.

  p To make style code easier to maintain, we use a few rules to keep it consistent.

  p Styles are defined one property-per-line, all lines end in a semi-colon, indented by 2 spaces, ordered alphabetically.

  p Pseudo-classes should be defined above anonymous classes, and then follow with named elements.

  p Order of properties

  ol
    li: code @extend
    li: code @include
    li Own properties
    li Child elements

  p Follow the "inception rule", no nesting more than 3 levels deep, wherever possible.

==syntax_highlight :html, 'scss'
  erb:
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
  p A new element should always have an empty line separating it from the element above, even when nested.

  p Never use IDs (<code>#</code>) for style, always classes (<code>.</code>) or attributes (<code>[]</code>).

  p Styles are defined mobile-first, with media queries added to adjust for each larger device width/height.

  p For numbers less than one, do not use a leading 0. eg.

==syntax_highlight :html, 'scss'
  erb:
    .disabled {
      opacity: .6;
    }

section
  p For naming, use semantic elements contained within an anonymously classed container, with additional variants defined by anonymous class. eg.

==syntax_highlight :html, 'scss'
  erb:
    .box {
      a {
        color: $highlight;
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
  p Always use <code>$variables</code> in place of raw color values, and remember that these can still be used in <code>lighten()</code> and <code>darken()</code> SASS functions, as well as <code>rgba()</code> values.

  p Use the <code>rem</code> mixin to convert pixel values to rem with pixel fallback.

section
  h2.title Javascript
