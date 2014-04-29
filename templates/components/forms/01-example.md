<h2 id="text">Text field</h2>
```html
<form method="post" action="" data-validate>
  <fieldset>

    <div>
      <label>
        Name (required):
        <input data-required name="f[name]" type="text" title="Please enter your name." />
      </label>
    </div>

    <div>
      <label>
        Email (pattern matching):
        <input data-pattern="email" name="f[email]" type="email" title="Please enter a valid email." />
      </label>
    </div>

    <div>
      <label>
        Product Code (regex pattern matching):
        <input data-pattern="[0-9][A-Z]{3}" maxlength="4" name="f[p_id]" type="text" title="Single digit followed by three uppercase letters." />
      </label>
    </div>

    <div>
      <label>
        Message:
        <textarea data-required name="f[message]" title="Please enter a message."></textarea>
      </label>
    </div>

  </fieldset>
  <footer>
    <input type="submit">
  </footer>
</form>
```
<p>Uses native validation where possible, on <code>input type="email"</code>.</p>

<form method="post" action="" data-validate>
  <fieldset>

    <div>
      <label>
        Name (required):
        <input data-required name="f[name]" type="text" title="Please enter your name." />
      </label>
    </div>

    <div>
      <label>
        Email (pattern matching):
        <input data-pattern="email" name="f[email]" type="email" title="Please enter a valid email." />
      </label>
    </div>

    <div>
      <label>
        Product Code (regex pattern matching):
        <input data-pattern="[0-9][A-Z]{3}" maxlength="4" name="f[p_id]" type="text" title="Single digit followed by three uppercase letters." />
      </label>
    </div>

    <div>
      <label>
        Message:
        <textarea data-required name="f[message]" title="Please enter a message."></textarea>
      </label>
    </div>

  </fieldset>
  <footer>
    <input type="submit">
  </footer>
</form>
