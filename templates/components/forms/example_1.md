```html
<form method="post" action="" data-validate>
  <fieldset>

    <div>
      <label>
        Name (required):
        <input data-required name="f[name]" type="text" title="Please enter your name" />
      </label>
    </div>

    <div>
      <label>
        Email (pattern matching):
        <input data-pattern="email" name="f[email]" type="text" title="Please enter a valid email" />
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
        Tick the box (required):
        <input data-required name="f[approve]" type="checkbox" title="Please tick the box" />
      </label>
    </div>

    <div>
      <p>Make a selection (implicit selection):</p>
      <label class="inline">
        <input checked name="f[radio]" type="radio" value="yes" title="Please make a selection" /> Yes
      </label>
      <label class="inline">
        <input name="f[radio]" type="radio" value="no" title="Please make a selection" /> No
      </label>
    </div>

    <div>
      <label>
        Make a selection from the dropdown (required):
        <select data-required name="f[select]" title="Please make a selection from the dropdown">
          <option value="-1">Please select</option>
          <optgroup>
            <option>Hi</option>
          </optgroup>
          <optgroup>
            <option>Another group</option>
            <option>Another group, another opt</option>
          </optgroup>
        </select>
      </label>
    </div>

  </fieldset>
  <footer>
    <input type="submit">
  </footer>
</form>
```
<form method="post" action="" data-validate>
  <fieldset>

    <div>
      <label>
        Name (required):
        <input data-required name="f[name]" type="text" title="Please enter your name" />
      </label>
    </div>

    <div>
      <label>
        Email (pattern matching):
        <input data-pattern="email" name="f[email]" type="text" title="Please enter a valid email" />
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
        Tick the box (required):
        <input data-required name="f[approve]" type="checkbox" title="Please tick the box" />
      </label>
    </div>

    <div>
      <p>Make a selection (implicit selection):</p>
      <label class="inline">
        <input checked name="f[radio]" type="radio" value="yes" title="Please make a selection" /> Yes
      </label>
      <label class="inline">
        <input name="f[radio]" type="radio" value="no" title="Please make a selection" /> No
      </label>
    </div>

    <div>
      <label>
        Make a selection from the dropdown (required):
        <select data-required name="f[select]" title="Please make a selection from the dropdown">
          <option value="-1">Please select</option>
          <optgroup>
            <option>Hi</option>
          </optgroup>
          <optgroup>
            <option>Another group</option>
            <option>Another group, another opt</option>
          </optgroup>
        </select>
      </label>
    </div>

  </fieldset>
  <footer>
    <input type="submit">
  </footer>
</form>
