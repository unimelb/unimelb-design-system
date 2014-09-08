## Code
```html
<pre>
	<html>
		<head>
			<title>Hello World</title>
		</head>
		<body>
			<p>Lorem ipsum dolor sit amet, appareat insolens quo cu</p>
		</body>
	</html>
</pre>
```
```SCSS
pre {
  @extend %code;
  @include adjust-font-size-to(13px);
  @include horizontal-borders(1px);
  @include leader(0);
  @include padding-leader(1);
  @include padding-trailer(1);
  @include trailer(1);
  @include rem(border-width, 1px);
  @include rem(padding-left, 15px);
  @include rem(padding-right, 15px);
  overflow: auto;

  code {
    border-bottom: 0;
  }

  @include breakpoint(desktop) {
    margin-left: auto;
    margin-right: auto;
    max-width: $w-mid;
  }
}
```