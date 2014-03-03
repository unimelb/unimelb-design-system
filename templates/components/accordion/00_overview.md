## Why does the accordian component exist and when should it be used?

Accordians are an efficient way of grouping and communicating multiple pieces of contextually related information. 

Accordians are recommended for use where the following critiera are met: 

* There are more than ~3 and less than ~10 uncategorised items, primarily consisting of paragraphs of text (not single words or large piece of video or imagery)
* It is *highly likely* that people will only need the content in one or two of the items (eg. FAQs)
* The accordian tabs can be named using short and descriptive titles (eg. 1-3 words) in order to make them easy to scan
* A logical ordering can be imposed to the items (eg. A numerical or alphabetically sorted list)
* The content underneath each item is short enough that it does not fill the screen when expanded making it difficult to close the item again (consider mobile use in particular here)

## When should this component not be used? 

* If there are less than 5 items to display, or if each item has only a few words of text (see poor examples), consider displaying these without an accordian. Hiding a tiny bit of information behind an accordian will frustrate users.
* If the content you want to communicate is bandwidth heavy, avoid using accordians as it is likely that the user will pay a significant amount of bandwidth-tax for content they will likely never consume. 
* If there are more than ~10 items, accordians can become difficult for people to comprehend, especially in situations where titles are lengthy (eg. FAQs). Instead, consider a [filtered listing](/todo-filtered-listings), thematically grouping items into several accordians (to reduce the number in a single list) or putting th content directly onto the page and using a [jump-nav](/todo-jump-navigation) to help people find their way around the page. 
* Situations where you want people to consume all the information contained inside the accordian (eg. lengthy forms). As an accordian hides information and requires detailed interaction in order to expose content, it is easy to miss things. In this instance consider placing the content directly onto the page and using a ordered [jump nav](/todo-jump-nav) to help the user navigate up and down the page.


## Content recommendations

Example content. 

// TODO - PHILLIPA

- Writing good accordian titles
- Link to general writing guidelines (writing punchy sentences for the web). 


## Implementation
Modular open/close content sections, with gracefully degrading CSS3 animation.

### Dependencies
Some minor DOM extensions (IE8+ only)

### Options
<ul class="nobullet">
  <li><code>.accordion__title</code> &ndash; Toggle switch open/close <small>required</small></li>
  <li><code>.accordion__hidden</code> &ndash; Content container (hidden by default), must be next adjacent element to toggle switch <small>required</small></li>
  <li><code>.accordion__noanim</code> &ndash; Disable animation <small class="opt">optional</small></li>
  <li><code>.accordion__visible</code> &ndash; Accordion container is visible by default <small class="opt">optional</small></li>
  <li><code>data-single-focus</code> &ndash; Close all other sections when opening an accordion <small class="opt">optional</small></li>
</ul>

<em>* The animation is CSS3 transition-based, so most of the options are tied to classes.</em>

The two parts (toggle switch and content container) must be wrapped inside their own container, but this can be any block level element.

### Example implementations

#### Good examples


#### Poor implementation examples

![A Poor example](/assets/videos/poor-example__accordian-1.gif)

In this case, it would be more desirable to simply expose the links underneath each heading rather than hiding them behind an accordian


## References


## Contributing

**Your contribution to the templates is what makes them better**. We've tried to make contributing as easy and painless as possible. 

To contribute, please: 

* [Read the contribution guide](#)
* [Explore documentation on github](#)