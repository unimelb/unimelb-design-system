## Typography
```scss
$ff-sans: Roboto, Helvetica, Arial, sans-serif;
$ff-fixed: 'Courier New', Courier, fixed;

$thin: 100;
$light: 300;
$regular: 400;
$bold: 700;
```

*Usage*

```scss
p.sans {
  font-family: $ff-sans;
  font-weight: $light;
}
```

<div class="type-test">
  <p class="sans">Roboto, Helvetica, Arial, sans-serif</p>
  <p class="fixed">Courier New, Courier, fixed</p>
  <p>
    <span class="thin">thin</span>
    <span class="light">light</span>
    <span class="regular">regular</span>
    <span class="bold">bold</span>
  </p>
</div>

## Headings
<h1>h1 should only appear once, in page heading</h1>
<h2>h2 can be used as an inpage subheading</h2>

## Blocks
<p>p a normal paragraph</p>

## Lists
<ul>
  <li>ul bulleted list</li>
</ul>
<ol>
  <li>ol numbered list</li>
</ol>
