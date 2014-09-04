<h2 id="box">Checkbox &amp; Radio buttons</h2>
```html
<form method="post" action="" data-validate>
  <fieldset>

    <div>
      Tick the box (required):
      <input type="checkbox" id="c1" class="checkbox" data-required name="f[approve]" title="Please tick the box" />
      <label for="c1"></label>
    </div>

    <div>
      Make a selection (implicitly required):
      <div class="inline">
        <label for="radio-1-1"></label>
        <input checked name="f[radio]" type="radio" id="radio-1-1" value="yes" title="Please make a selection" />
        Yes
      </div>
      <div class="inline">
        <input name="f[radio]" type="radio" id="radio-1-2" value="no" title="Please make a selection" />
        <label for="radio-1-2"></label>
        No
      </div>
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
      Tick the box (required):
      <input type="checkbox" id="c1" class="checkbox" data-required name="f[approve]" title="Please tick the box" />
      <label for="c1"></label>
    </div>

    <div>
      Make a selection (implicitly required):
      <div class="inline">
        <input checked name="f[radio]" type="radio" id="radio-1-1" value="yes" title="Please make a selection" />
        <label for="radio-1-1"></label>
        Yes
      </div>
      <div class="inline">
        <input name="f[radio]" type="radio" id="radio-1-2" value="no" title="Please make a selection" />
        <label for="radio-1-2"></label>
        No
      </div>
    </div>

  </fieldset>
  <footer>
    <input type="submit">
  </footer>
</form>
