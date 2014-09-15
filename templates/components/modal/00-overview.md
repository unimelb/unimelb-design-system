---
title: Modal
---
## Overview

A simple two&ndash;part modal component, with a triggering link and a modal container.

* Modal dialog is positioned at center of viewport, with an option to position 160px above triggering link
* Will scroll and resize (mobile safe)
* Clicking on the blanket (overlay) will close the modal, or you can include the optional close button in the top right corner
* Allows multiple modals on the same page
* Can have multiple triggers on the same modal
* Use any content inside modal

## Options
<ul class="nobullet">
  <li><code>data-modal-target</code> &ndash; ID of modal to trigger <small>required</small></li>
  <li><code>data-modal-offset</code> &ndash; Reposition modal to 160px above triggering link <small>required</small></li>
  <li><code>.modal__dialog</code> &ndash; Modal dialog container <small>required</small></li>
  <li><code>.modal__close</code> &ndash; Close button <small class="opt">optional</small></li>
</ul>