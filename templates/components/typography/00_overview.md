## Sass Globals
```scss
$ff-sans: 'Open Sans', sans-serif;
$ff-header: $ff-sans;
$ff-fixed: 'Courier New', Courier, fixed;

$light: 300;
$regular: 400;
$bold: 700;
```

## Usage
```scss
p.sans {
  font-family: $ff-sans;
  font-weight: $light;
}
```

## Examples
<div class="type-test">
  <p class="sans">
    Open Sans, sans-serif: 
    <span class="light">300</span>, 
    <span class="regular">400</span>, 
    <span class="bold">700</span>
  </p>
  <p class="fixed">
    Courier New, Courier, fixed: 
    <span class="light">300</span>, 
    <span class="regular">400</span>, 
    <span class="bold">700</span>   
  </p>
</div>
