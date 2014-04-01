### On this page

* [Implementation](#implementation)
* [In page tabs](#inpage)
* [Full width navigation tabs](#fullwidth)

## Implementation
<ul class="nobullet">
  <li><code>data-tabbed</code> &ndash; Overall tab container <small>required</small></li>
  <li><code>data-current</code> &ndash; Pre-select tab <small class="opt">optional</small></li>
  <li><code>data-tab</code> &ndash; Link to tab <small>optional</small></li>
</ul>
```html
<div data-tabbed>
  <nav>
    <a>Link to 1st tab</a>
    <a>Link to 2nd tab</a>
    ...
  </nav>
  <section class=".tab" id="#tab1">
    <p>1st tab</p>
  </section>
  <section class=".tab">
    <p>2nd tab</p>
    <a href="#tab1" data-tab="1">Go to tab 1</a>
  </section>
  ...
</div>
```
Tabs are assigned an <code>id</code> to allow the link to snap to the top, and degrade gracefully in older browsers. To prevent hidden content on unsupported browsers, the <code>nav</code> is hidden and all tab content is displayed by default.