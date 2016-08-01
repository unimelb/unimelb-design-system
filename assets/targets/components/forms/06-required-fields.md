<h2 id="required-fields">Required Fields</h2>

* The aria-required attribute informs screen readers that input fields require a value.

<pre class="html flex"><code>
&lt;label for="firstname"&gt;First name (required):&lt;/label&gt;
&lt;input aria-required="true" type="text" id="firstname" name="fname" /&gt;
</code></pre>

* The data-required attribute can be used to display a * symbol next to a label.

<pre class="html flex"><code>
&lt;label for="firstname" data-required="true"&gt;First name:&lt;/label&gt;
&lt;input aria-required="true" type="text" id="firstname" name="fname" /&gt;
</code></pre>
