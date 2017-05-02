<h2 id="why-fieldsets">Why Fieldsets are Important</h2>

* Fieldsets are a semantic grouping of related form elements.
* The first element inside the fieldset should be a legend element, which provides a label for the group.

<h3>Example 2a - How to do it</h3>

<pre class="html flex"><code>
&lt;fieldset&gt;
  &lt;legend&gt;Is this your country of citizenship as well?&lt;/legend&gt;
  &lt;input type="radio" name="yes" id="citizenship-yes" value="yes"/&gt;
  &lt;label for="citizenship-yes"&gt;Yes&lt;/label&gt;
  &lt;input type="radio" name="no" id="citizenship-no" value="no"/&gt;
  &lt;label for="citizenship-no"&gt;No&lt;/label&gt;
&lt;/fieldset&gt;
</code></pre>

<h3>Example 2b - How not to do it</h3>

<pre class="html flex"><code>
Is this your country of citizenship as well?
&lt;input type="radio" name="yes" id="citizenship-yes" value="yes"/&gt;
&lt;label for="citizenship-yes"&gt;Yes&lt;/label&gt;
&lt;input type="radio" name="no" id="citizenship-no" value="no"/&gt;
&lt;label for="citizenship-no"&gt;No&lt;/label&gt;
</code></pre>

<h3>Example 3a - How to do it</h3>

<pre class="html flex"><code>
&lt;fieldset&gt;
  &lt;legend&gt;Please select research area or department you wish to study&lt;/legend&gt;
  &lt;input type="checkbox" name="biomedical" id="research-biomedical" value="Biomedical"/&gt;
  &lt;label for="research-biomedical"&gt;Biomedical&lt;/label&gt;
  &lt;input type="checkbox" name="chem-bio" id="research-chem-bio" value="Chemical & Biomolecular"/&gt;
  &lt;label for="research-chem-bio"&gt;Chemical & Biomolecular&lt;/label&gt;
&lt;/fieldset&gt;
</code></pre>

<h3>Example 3b - How not to do it</h3>

<pre class="html flex"><code>
Please select research area or department you wish to study
&lt;input type="checkbox" name="biomedical" id="research-biomedical" value="Biomedical"/&gt;
&lt;label for="research-biomedical"&gt;Biomedical&lt;/label&gt;
&lt;input type="checkbox" name="chem-bio" id="research-chem-bio" value="Chemical & Biomolecular"/&gt;
&lt;label for="research-chem-bio"&gt;Chemical & Biomolecular&lt;/label&gt;
</code></pre>
