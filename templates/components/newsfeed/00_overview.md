<script src="https://www.google.com/jsapi"></script>

## Implementation
Consume an RSS feed using the Google Feed API.

Output can be styled with CSS (I've included some samples below), the code template generated within the calling wrapper looks like:

<pre>
&lt;ul&gt;
  &lt;li&gt;&lt;em&gt;<b class="alt">date published</b> &lt;/em&gt;&lt;span&gt;<b class="alt">entry title</b>&lt;/span&gt;&lt;/li&gt;
  &lt;li&gt;&lt;em&gt;<b class="alt">date published</b> &lt;/em&gt;&lt;span&gt;<b class="alt">entry title</b>&lt;/span&gt;&lt;/li&gt;
  &lt;li&gt;&lt;em&gt;<b class="alt">date published</b> &lt;/em&gt;&lt;span&gt;<b class="alt">entry title</b>&lt;/span&gt;&lt;/li&gt;
  &hellip;
&lt;/ul&gt;</pre>

Adds a class <code>.loaded</code> to the calling wrapper after entries are appended.

## Dependencies

[Google Feed API (v1)](https://developers.google.com/feed/v1/)

## Options

<ul class="nobullet">
  <li><code>data-feed-url</code> &mdash; Full URL of feed (RSS or Atom) <small>required</small></li>
  <li><code>data-entries</code> &mdash; Number of entries to poll (default 4) <small class="opt">optional</small></li>
  <li><code>data-date-format</code> &mdash; Date format to use (defaults to <em>htt, mmmm d, yyyy</em>) <small class="opt">optional</small>, a few shortnames that can be used:
    <dl>
      <dt>shortDate</dt><dd>m/d/yy</dd>
      <dt>mediumDate</dt><dd>mmm d, yyyy</dd>
      <dt>longDate</dt><dd>mmmm d, yyyy</dd>
      <dt>fullDate</dt><dd>dddd, mmmm d, yyyy</dd>
      <dt>isoDate</dt><dd>yyyy-mm-dd</dd>
      <dt>isoDateTime</dt><dd>yyyy-mm-dd'T'HH:MM:ss</dd>
      <dt>isoUtcDateTime</dt><dd>UTC:yyyy-mm-dd'T'HH:MM:ss'Z'</dd>
    </dl>
  </li>
  <li><code>data-no-date</code> &mdash; Do not display date <small class="opt">optional</small></li>
</ul>

## Examples
