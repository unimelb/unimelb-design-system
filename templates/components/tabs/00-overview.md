## Implementation
Tabbed content, with loosely opinionated semantics (tab titles are in a <code>nav</code> block, tab content in <code>section</code> blocks).

## Dependencies

Some minor DOM extensions (IE8+ only)

## Options

<ul class="nobullet">
  <li><code>data-tabbed</code> &ndash; Overall tab container <small>required</small></li>
  <li><code>data-current</code> &ndash; Pre-select tab <small class="opt">optional</small></li>
  <li><code>data-tab</code> &ndash; Link to tab <small>optional</small></li>
</ul>

## Structure

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
