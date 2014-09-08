## Smooth font loading

Automatically included in stylesheet.

```scss
// Smoother font loading
h1, h2, h3, h4, h5, h6, ol, p, ul, a, dl {
  opacity: auto;
  -webkit-transition: opacity 100ms linear;
  -moz-transition:    opacity 100ms linear;
  -ms-transition:     opacity 100ms linear;
  -o-transition:      opacity 100ms linear;
  transition:         opacity 100ms linear;

  .js.wf-loading & {
    opacity: 0;
    *visibility: hidden !important;
  }
}
```
