---
title: Inpage Navigation
---
<div class="jumpnav"></div>

<h2 id="overview">Overview</h2>
The in-page navigation provides a convenient way for users to see all sections at a glance and jump between them. This can be useful for long, text-heavy pages.

To include this feature on your page, simply add an empty div with class <code>jumpnav</code> somewhere in the page structure. **Every <code>h2</code> on the page with a unique ID** is then added to the in-page navigation, in order of appearance.

```html
<div class="jumpnav"></div>
```

By default the generated navigation will take the form of a *table of contents* at the beginning of the page on smaller screens, and a *fixed menu* on the left hand side on larger screens. If you would prefer to use the *table of contents* for all screen sizes, add the class `top` as in the example below. This behaviour is demonstrated on the [Buttons](/components/buttons) page to better display the wide component mid-way down the page.

```html
<div class="jumpnav top"></div>
```

<h2 id="index">Index navigation</h2>
A-Z indices can be done via a simple class change:

```html
<div class="indexnav"></div>
```

As you can't have both navigations in one document, you'll find an <a href="/layouts/indexnav">example of an index navigation</a> in the example layouts.

<h2 id="smooth">Smooth scroll</h2>
The smooth scroll function used by the in-page navigation, <code>smoothScrollTo</code>, can be invoked independently in your own project:

```javascript
var el = document.querySelector('#block'); // where #block is an element with id="block"
window.smoothScrollTo(el);
```

<a href="javascript:smoothScrollTo(document.getElementById('smooth'))" class="button-small">Try it out!</a>

`smoothScrollTo` accepts an optional **callback** function as second argument. This callback is invoked as soon as the scrolling animation ends. It is generally a good idea to avoid performing other actions, like loading a script or manipulating the DOM, while a scrolling animation is in progress. Doing so could deteriorate the smoothness of the animation.

```javascript
window.smoothScrollTo(el, doSomething);

function doSomething() {
  // Do something as soon as the scrolling ends - e.g. give focus to the element, load more content, etc. 
}
```
