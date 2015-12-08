### Non-square photo and fallback avatar
If the profile photo is not scare, use a **background image**. With this technique, a **fallback avatar** is shown if the profile photo fails to load.

```html
...
<div class="profile-header__summary">
  <div class="profile-header__photo" style="background-image: url(//findanexpert.unimelb.edu.au/pictures/thumbnail195234picture);"></div>
  <h1>Chaz Batrouney</h1>
  <p><em>Web Producer</em></p>
  <p>Project Services</p>
</div>
...
```

<div class="profile-header__summary">
  <div class="profile-header__photo"></div>
  <h1>Chaz Batrouney</h1>
  <p><em>Web Producer</em></p>
  <p>Project Services</p>
</div>
