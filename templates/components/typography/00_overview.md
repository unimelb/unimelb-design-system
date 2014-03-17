## A note about typography

// TODO: Make this an alert box once we have the classes.

This is a mandatory global component that must be included on all sites created on the unimelb domain. Changes made to typography code will be applied globally across all sites using these templates.

// TODO: need to add typography choices documentation. Why did we choose the fonts that we have chosen?


## Typography
```scss
$ff-sans: Roboto, Helvetica, Arial, sans-serif;
$ff-fixed: 'Courier New', Courier, fixed;
$ff-serif: Georgia, 'Times New Roman', Times, serif;

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
  <p class="serif">Georgia, Times New Roman, Times, serif</p>
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

## Paragraph
<p>p a normal paragraph</p>

## Blockquote
<blockquote>
  A person who won't read has no advantage over one who can't read.
  <cite>Samuel Clemens</cite>
</blockquote>

## Lists
<ul>
  <li>ul bulleted list</li>
</ul>
<ol>
  <li>ol numbered list</li>
</ol>

## Figure (inset left)
<figure class="inset-left">
  <img src="http://placekitten.com/300/500" alt="">
  <figcaption>
    Caption to the image
  </figcaption>
</figure>

Cras pretium et elit id bibendum. Duis dapibus condimentum justo, aliquet porta justo vehicula quis. Pellentesque vulputate mattis lacus quis elementum. Vivamus vitae lobortis orci. Praesent interdum et elit non dignissim. Morbi sit amet nibh vitae tortor ullamcorper consequat sed non leo. Nam massa est, egestas ac felis id, blandit luctus metus. Mauris eu aliquet nisi. Donec nunc ipsum, fermentum quis enim posuere, dapibus fermentum libero. Aliquam erat volutpat. Nulla tempor tellus lorem, dapibus euismod mi mattis sit amet. Sed ac orci consequat, aliquet ligula vitae, facilisis elit. Sed et lobortis est, eu facilisis massa.

Maecenas pulvinar velit magna, nec scelerisque mauris fringilla suscipit. Pellentesque ut vehicula justo. Sed non rhoncus libero, ut iaculis eros. Aenean at sapien ultrices, vulputate erat at, dapibus mauris. Nullam iaculis orci quis ipsum accumsan pharetra. Nunc vel condimentum mi. Integer rhoncus ante quis lectus facilisis, ac auctor enim mattis. Nullam gravida nec ante mattis accumsan. Donec pretium, leo tempor adipiscing posuere, risus ligula ornare erat, vitae euismod lectus nulla ac arcu. Morbi sed pharetra risus, nec auctor lorem. Phasellus neque quam, auctor ut tincidunt et, suscipit quis nibh. Praesent sed malesuada eros, eu volutpat tortor. Proin pharetra nisl sed eros ultrices, vitae condimentum felis tempor.

## Figure (inset right)
<figure class="inset-right">
  <img src="http://placekitten.com/300/500" alt="">
  <figcaption>
    Caption to the image
  </figcaption>
</figure>

Cras pretium et elit id bibendum. Duis dapibus condimentum justo, aliquet porta justo vehicula quis. Pellentesque vulputate mattis lacus quis elementum. Vivamus vitae lobortis orci. Praesent interdum et elit non dignissim. Morbi sit amet nibh vitae tortor ullamcorper consequat sed non leo. Nam massa est, egestas ac felis id, blandit luctus metus. Mauris eu aliquet nisi. Donec nunc ipsum, fermentum quis enim posuere, dapibus fermentum libero. Aliquam erat volutpat. Nulla tempor tellus lorem, dapibus euismod mi mattis sit amet. Sed ac orci consequat, aliquet ligula vitae, facilisis elit. Sed et lobortis est, eu facilisis massa.

Maecenas pulvinar velit magna, nec scelerisque mauris fringilla suscipit. Pellentesque ut vehicula justo. Sed non rhoncus libero, ut iaculis eros. Aenean at sapien ultrices, vulputate erat at, dapibus mauris. Nullam iaculis orci quis ipsum accumsan pharetra. Nunc vel condimentum mi. Integer rhoncus ante quis lectus facilisis, ac auctor enim mattis. Nullam gravida nec ante mattis accumsan. Donec pretium, leo tempor adipiscing posuere, risus ligula ornare erat, vitae euismod lectus nulla ac arcu. Morbi sed pharetra risus, nec auctor lorem. Phasellus neque quam, auctor ut tincidunt et, suscipit quis nibh. Praesent sed malesuada eros, eu volutpat tortor. Proin pharetra nisl sed eros ultrices, vitae condimentum felis tempor.
