## Media query helper

```scss
@mixin breakpoint($point) {
  @if $point == desktop {
    @media screen and (min-width: 1100px) { 
      & {
        @content;
      }
    }
  }
  @else if $point == tablet {
    @media screen and (min-width: 1099px) { 
      & {
        @content;
      }
    } // , screen and (max-width: 500px) and (-webkit-min-device-pixel-ratio: 1.3)
  }
  @else if $point {
    @media screen and (min-width: $point) {
      & {
        @content;
      }
    }
  }
}
```

*Usage*

```scss
.banner {
  width: 100%;
  @include breakpoint(desktop) {
    width: 1100px;
  }
}
```