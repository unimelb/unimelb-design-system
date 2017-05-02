<h2 id="why-labels">Why Labels are Important</h2>

* Screen readers go into forms mode when they encounter form input fields. Unless form elements have labels associated with them, the screen reader cannot tell the user what data needs to be entered.
* Adding a 'for' attribute to the label and an 'id' to the input field tells the screen reader that the input field has a label.

<h3>Example 1a - How to do it</h3>

<pre class="html flex"><code>
&lt;label for="firstname"&gt;First name:&lt;/label&gt;
&lt;input type="text" id="firstname" name="fname" /&gt;
</code></pre>

<h3>Example 1b - How not to do it</h3>

<pre class="html flex"><code>
First name:
&lt;input type="text" name="fname" /&gt;
</code></pre>

<h3>Example 1c - How not to do it</h3>

<pre class="html flex"><code>
&lt;input type="text" name="fname" placeholder="First name" /&gt;
</code></pre>
