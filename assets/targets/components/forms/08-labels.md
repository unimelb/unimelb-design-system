<h2 id="why-labels">Why Labels are Important</h2>

* Screen readers go into forms mode when they encounter form input fields. Unless form elements have labels associated with them, the screen reader cannot tell the user what data needs to be entered.
* Adding a 'for' attribute to the label and an 'id' to the input field tells the screen reader that the input field has a label.

<h3>Example 1a - How to do it</h3>

```html
<label for="firstname">First name:</label> 
<input type="text" id="firstname" name="fname" />
```

<h3>Example 1b - How not to do it</h3>

```html
First name:
<input type="text" name="fname" />
```

<h3>Example 1c - How not to do it</h3>

```html
<input type="text" name="fname" placeholder="First name" />
```
