## Background-size polyfill

A fix that will enable background-size: cover and background-size: contain in IE8 (IE9+ supports it natively).

The polyfill is contained in a .htc file that needs to be included along with any background-size call:

```scss
.fullwidth {
  background-size: cover;
  -ms-behavior: url(/assets/javascripts/backgroundsize.min.htc);
}
```
