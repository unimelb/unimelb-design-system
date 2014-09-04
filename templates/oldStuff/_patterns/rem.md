## REM calculation helper

Use this mixin to calculate relative pixel values for any CSS property. Recommended for any padding, margin, dimensions.

```scss
$baseline-px: 19px;

@mixin rem($property, $px-values) {
  $baseline-rem: $baseline-px / 1rem;
  #{$property}: $px-values;
  @if type-of($px-values) == "number" {
    #{$property}: $px-values / $baseline-rem;
  } @else {
    $rem-values: unquote("");
    @each $value in $px-values {
      @if $value == 0 or type-of($value) == "string" or type-of($value) == "color" {
        $rem-values: append($rem-values, $value);
      } @else {
        $rem-values: append($rem-values, $value / $baseline-rem);
      }
    }
    #{$property}: $rem-values;
  }
}
```

*Usage*

```scss
.banner {
  @include rem(padding-top, 15px);
}
```
