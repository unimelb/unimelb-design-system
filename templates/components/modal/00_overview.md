
## When to use this component

Modal boxes (or overlay windows or lightboxes) are useful when used sparingly and for very specific purposes. 

As modal boxes commandeer the users browser by preventing them from interacting with content below it, they should only be used when a user either **must** provide some information before proceeding (for example, a sign up or login) or where they have **explicitly expressed** that they would like to focus on a piece of contet (like clicking on a video to watch it).

## When to avoid this component? 

You must never use a modal box as a tool for gathering information that it is not essential for the user to provide (e.g. complete this short survey). Doing so will incur the wrath of the internet. If you would like to display an alert to the user prompting them to do something (like fill in your survey), we would suggest using a more unobtrusive component like a [dismissable alert](#)




## Content recommendations

## Planning tools 

## Examples

### Good examples

### Poor examples

## References

[Patternry](http://patternry.com/p=overlay/)
## Implementation
A simple two&ndash;part modal 
component, with a triggering link and a modal container.

* Modal dialog is positioned at center of viewport, with an option to position 160px above triggering link
* Will scroll and resize (mobile safe)
* Clicking on the blanket (overlay) will close the modal, or you can include the optional close button in the top right corner
* Allows multiple modals on the same page
* Can have multiple triggers on the same modal
* Use any content inside modal

### Dependencies
Some minor DOM extensions (IE8+ only)

### Options
<ul class="nobullet">
  <li><code>data-modal-target</code> &ndash; ID of modal to trigger <small>required</small></li>
  <li><code>data-modal-offset</code> &ndash; Reposition modal to 160px above triggering link <small>required</small></li>
  <li><code>.modal__dialog</code> &ndash; Modal dialog container <small>required</small></li>
  <li><code>.modal__close</code> &ndash; Close button <small class="opt">optional</small></li>
</ul>

### Implementation examples