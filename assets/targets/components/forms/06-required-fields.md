<h2 id="required-fields">Required Fields</h2>

* The aria-required attribute informs screen readers that input fields require a value.

```html
<label for="firstname">First name (required):</label>
<input aria-required="true" type="text" id="firstname" name="fname" />
```

* The data-required attribute can be used to display a * symbol next to a label.

```html
<label for="firstname" data-required="true">First name:</label>
<input aria-required="true" type="text" id="firstname" name="fname" />
```
