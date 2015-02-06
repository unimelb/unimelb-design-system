<h2 id="why-fieldsets">Why Fieldsets are Important</h2>

* Fieldsets are a semantic grouping of related form elements.
* The first element inside the fieldset should be a legend element, which provides a label for the group.

<h3>Example 2a - How to do it</h3>

```html
<fieldset>
	<legend>Is this your country of citizenship as well?</legend>
	<input type="radio" name="yes" id="citizenship-yes" value="yes"/>
    <label for="citizenship-yes">Yes</label>
    <input type="radio" name="no" id="citizenship-no" value="no"/>
    <label for="citizenship-no">No</label>
</fieldset>
```

<h3>Example 2b - How not to do it</h3>

```html
Is this your country of citizenship as well?
<input type="radio" name="yes" id="citizenship-yes" value="yes"/>
<label for="citizenship-yes">Yes</label>
<input type="radio" name="no" id="citizenship-no" value="no"/>
<label for="citizenship-no">No</label>
```

<h3>Example 3a - How to do it</h3>

```html
<fieldset>
	<legend>Please select research area or department you wish to study</legend>
	<input type="checkbox" name="biomedical" id="research-biomedical" value="Biomedical"/>
    <label for="research-biomedical">Biomedical</label>
    <input type="checkbox" name="chem-bio" id="research-chem-bio" value="Chemical & Biomolecular"/>
    <label for="research-chem-bio">Chemical & Biomolecular</label>
</fieldset>
```

<h3>Example 3b - How not to do it</h3>

```html
Please select research area or department you wish to study
<input type="checkbox" name="biomedical" id="research-biomedical" value="Biomedical"/>
<label for="research-biomedical">Biomedical</label>
<input type="checkbox" name="chem-bio" id="research-chem-bio" value="Chemical & Biomolecular"/>
<label for="research-chem-bio">Chemical & Biomolecular</label>
```
