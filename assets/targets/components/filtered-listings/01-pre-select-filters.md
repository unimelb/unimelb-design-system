<h2 id="pre-select-filters">Pre-select filters</h2>

The <strong>tags</strong> filter can be pre-selected on page load by adding <code>?tags=&lt;tag-list&gt;</code> to the end of the URL, where <code>&lt;tag-list&gt;</code> is a coma-separated list of tags. For instance: <code><a href="?tags=nominavi,ludico">?tags=nominavi,ludico</a></code>.

Similarly, the <strong>section</strong> filter can be pre-selected with <code>?section=&lt;section-name&gt;</code>. For instance: <code><a href="?section=section-3">?section=section-3</a></code>.

You may combine both the <code>tags</code> and <code>section</code> parameters in the querystring: <code><a href="?tags=nominavi&section=section-3">?tags=nominavi&section=section-3</a></code>. If the name of a tag or section contains a <a href="https://en.wikipedia.org/wiki/Percent-encoding#Types_of_URI_characters">reserved character</a>, it must be encoded (e.g. <code>&amp;</code> must be replace with <code>%26</code>).