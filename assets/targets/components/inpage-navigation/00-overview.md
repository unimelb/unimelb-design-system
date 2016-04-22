---
title: Inpage Navigation
---
<div class="jumpnav"></div>

<h2 id="overview">Overview</h2>
The in-page navigation provides a convenient way for users to see all sections at a glance and jump between them. This can be useful for long, text-heavy pages.

To include this feature on your page, simply add an empty div with class <code>jumpnav</code> somewhere in the page structure. **Every <code>h2</code> on the page with a unique ID** is then added to the in-page navigation, in order of appearance.

<pre><code class="html">&lt;div class="jumpnav"&gt;&lt;/div&gt;</code></pre>

By default the generated navigation will take the form of a *table of contents* at the beginning of the page on smaller screens, and a *fixed menu* on the left hand side on larger screens. If you would prefer to use the *table of contents* for all screen sizes, add the class `top` as in the example below. This behaviour is demonstrated on the [Buttons](/components/buttons) page to better display the wide component mid-way down the page.

<pre><code class="html">&lt;div class="jumpnav top"&gt;&lt;/div&gt;</code></pre>
