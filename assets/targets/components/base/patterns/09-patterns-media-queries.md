## Media query helper

```scss
@mixin breakpoint($point) {
  @if $point == wide {
    @media screen and (min-width: 1099px) {
      & {
        @content;
      }
    }
  }
  @else if $point == desktop {
    @media screen and (min-width: 769px) {
      & {
        @content;
      }
    }
  }
  @else if $point == tablet {
    @media screen and (min-width: 481px){
      & {
        @content;
      }
    }
  }
  @else if $point == mobile {
    @media screen and (max-width: 480px) {
      & {
        @content;
      }
    }
  }
  @else if $point == height-smallest {
    @media screen and (min-height: 640px) {
      & {
        @content;
      }
    }
  }
  @else if $point == height-small {
    @media screen and (min-height: 740px) {
      & {
        @content;
      }
    }
  }
  @else if $point == height-medium {
    @media screen and (min-height: 850px) {
      & {
        @content;
      }
    }
  }
  @else if $point == height-big {
    @media screen and (min-height: 1200px) {
      & {
        @content;
      }
    }
  }
  @else {
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
  max-width: 100%;

  @include breakpoint(desktop) {
    max-width: 900px;
  }
}
```