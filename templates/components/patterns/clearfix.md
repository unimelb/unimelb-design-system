## Clearfix

```scss
// Micro clearfix
// http://nicolasgallagher.com/micro-clearfix-hack/

%clearfix {
  &:before,
  &:after {
      content:"";
      display:table;
  }
  &:after {
      clear:both;
  }
  zoom: 1;
}
```

*Usage*

```html
<div class="floating clearfix"></div>
```
