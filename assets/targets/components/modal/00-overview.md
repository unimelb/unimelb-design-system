---
title: Modal
---
<div class="jumpnav"></div>
## Overview
A simple two&ndash;part modal component, with a triggering link and a modal container. Features:

* Will scroll and resize (mobile safe)
* May contain any amount and type of content
* Close button inserted automatically
* Clicking on the blanket (overlay) closes the modal
* Multiple modals allowed on the same page

## Positioning
By default, the modal dialog is positioned at the center of the viewport. You may force the modal to appear 160px above the link by adding attribute `data-modal-offset` to the triggering link.

## Options
<ul class="nobullet">
  <li><code>data-modal-target</code> &ndash; ID of modal to trigger <small>required</small></li>
  <li><code>data-modal-offset</code> &ndash; Forces the modal dialog to appear 160px above the triggering link (no value needed) <small>optional</small></li>
</ul>
