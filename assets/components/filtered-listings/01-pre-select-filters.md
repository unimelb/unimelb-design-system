<h2 id="pre-select-filters">Pre-select filters</h2>

The <strong>tags</strong> filter can be pre-selected on page load by adding <code>?tags=&lt;tag-list&gt;</code> to the end of the URL, where <code>&lt;tag-list&gt;</code> is a coma-separated list of tags &mdash; e.g. <code><a href="?tags=nominavi,ludico">?tags=nominavi,ludico</a></code>.

The <strong>section</strong> filter can be pre-selected with <code>?section=&lt;section-name&gt;</code> &mdash; e.g. <code><a href="?section=section-3">?section=section-3</a></code>.

You may of course use both parameters together: <code><a href="?tags=nominavi&section=section-3">?tags=nominavi&section=section-3</a></code>.

<p class="alert-warning">Don't forget to encode any <a href="https://en.wikipedia.org/wiki/Percent-encoding#Types_of_URI_characters">reserved URI character</a> (e.g. replace <code>&amp;</code> with <code>%26</code>) &mdash; or better, <a href="https://en.wikipedia.org/wiki/Semantic_URL#Slug">slugify the name of your sections and tags</a>.</p>
