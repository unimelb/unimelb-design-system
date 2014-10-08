---
title: Tabs
---
<div class="jumpnav"></div>
Tabs are assigned an <code>id</code> to allow the link to snap to the top, and degrade gracefully in older browsers. To prevent hidden content on unsupported browsers, the <code>nav</code> is hidden and all tab content is displayed by default.

## How to use Tabs effectively

Tabs are only suitable where you have 2-4 chunks of data to display, and where each of these chunks can be given a short, single word title. They are not a suitable design pattern where more than 4 items need to be displayed. 

Tabs should each contain a substantive amount of information (> 1 paragraph or equivalent non-text content) and not be used to display a single link (eg. Click a tab only to find "click here to do this One Thing"). Conversely if you find that a tab is super long, or contains a large amount of bandwidth-heavy content, do not use the tab component as this will cause the user to download a large amount of content which they may actually never consume. Instead consider splitting this content out into a seperate page that can be purposefully opened if it is desired. 

<ul class="nobullet">
  <li><code>data-tabbed</code> &ndash; Overall tab container <small>required</small></li>
  <li><code>data-current</code> &ndash; Pre-select tab <small class="opt">optional</small></li>
  <li><code>data-tab</code> &ndash; Link to tab <small>optional</small></li>
</ul>