/**
 * Image gallery
 * @param  {Element} el
 * @param  {Object} props
 */
function ImageGallery(el, props) {
  this.el = el;
  this.props = props || {};

  this.props.gid = this.props.index || 0
  this.props.items = el.querySelectorAll('li');
  this.props.slides = [];

  this.setupGallery();
  this.initIsotope();

  this.setupPhotoSwipe();
  this.restoreFromHash();
}

/**
 * Add hover zoom icon and aspect ratio class to each item,
 * and prepare PhotoSwipe slides.
 */
ImageGallery.prototype.setupGallery = function () {
  for (var i = 0, len = this.props.items.length; i < len; i++) {
    var item = this.props.items[i];

    // Hide thumbnail to show link background instead (see below)
    // Use `opacity: 0;` to avoid triggering a reflow when opening the viewer
    var img = item.querySelector('img');
    img.classList.add('hide');

    // Set thumbnail as background image of link for cover effect
    var link = item.querySelector('a');
    link.style.backgroundImage = 'url(' + img.src + ')';
    link.addEventListener('click', this.onThumbnailClick.bind(this, i));

    // Add zoom-in icon shown on hover
    var icon = document.createElement('span');
    icon.className = 'image-gallery__icon';
    icon.innerHTML = '<svg role="img" class="icon"><use xlink:href="#icon-zoom-in"></use></svg>';
    link.appendChild(icon);

    // Retrieve image dimensions from `data-size` attribute
    var size = link.getAttribute('data-size').split('x');
    var w = parseInt(size[0], 10);
    var h = parseInt(size[1], 10);

    // Compute image ratio and add corresponding class
    var ratio = w / h;
    item.classList.add(ratio < 1 ? 'portrait' : (ratio > 2 ? 'panorama' : 'landscape'));

    // Create PhotoSwipe slide
    this.props.slides.push({
      el: link,
      src: link.getAttribute('href'),
      w: w,
      h: h,
      title: item.querySelector('figcaption').innerHTML,
      msrc: img.src
    });
  }
};

/**
 * Initialise masonry layout.
 */
ImageGallery.prototype.initIsotope = function () {
  this.props.isotope = new window.Isotope(this.el, {
    itemSelector: '.item',
    layoutMode: 'masonry',
    masonry: {
      columnWidth: 1,
      gutter: 0
    }
  });
};

/**
 * Set up PhotoSwipe viewer markup.
 */
ImageGallery.prototype.setupPhotoSwipe = function () {
  // Check if PhotoSwipe viewer has already been set up by another gallery
  this.props.pswp = document.querySelector('.pswp');
  if (this.props.pswp) return;

  // Inject PhotoSwipe viewer
  var pswp = document.createElement('div');
  pswp.className = 'pswp';
  pswp.setAttribute('tabindex', '-1');
  pswp.setAttribute('role', 'dialog');
  pswp.setAttribute('aria-hidden', 'true');
  pswp.innerHTML = '<div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div>';

  document.querySelector('.uomcontent').appendChild(pswp);
  this.props.pswp = pswp;
};

/**
 * If URL has PhotoSwipe hash, re-open viewer to specified slide.
 */
ImageGallery.prototype.restoreFromHash = function () {
  // Parse hash
  var matches = /^#&gid=(\d+)&pid=(\d+)$/.exec(window.location.hash);

  // Return if not a PhotoSwipe hash
  if (!matches || matches.length !== 3) return;

  // Return if GID doesn't refer to this gallery instance
  if (parseInt(matches[1], 10) !== this.props.gid) return;

  // Open viewer to specified slide
  var index = parseInt(matches[2], 10);
  this.openPhotoSwipe(index - 1, true);
};

/**
 * Open viewer when a thumbnail is clicked.
 * @param {Number} index - the slide index to open
 * @param {Event} evt
 */
ImageGallery.prototype.onThumbnailClick = function (index, evt) {
  evt.preventDefault();
  this.openPhotoSwipe(index);
};

/**
 * Initialise and open PhotoSwipe viewer at the given slide.
 * @param {Number} slideIndex
 * @param {Boolean} disableAnimation - set to `true` when restoring from UL hash
 */
ImageGallery.prototype.openPhotoSwipe = function (slideIndex, disableAnimation) {
  var options = {
    galleryUID: this.props.gid,
    getThumbBoundsFn: this.getThumbBoundsFn.bind(this),
    index: slideIndex,
    showAnimationDuration: disableAnimation ? 0 : 333,
    showHideOpacity: true
  };

  var gallery = new PhotoSwipe(this.props.pswp, window.PhotoSwipeUI_Default, this.props.slides, options);
  gallery.init();
};

/**
 * Compute a thumbnail's bounds.
 * Called by PhotoSwipe for animation purposes when opening the viewer.
 * @param {Number} index - the slide index
 */
ImageGallery.prototype.getThumbBoundsFn = function (index) {
  var thumbnail = this.props.slides[index].el;
  var rect = thumbnail.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top + window.pageYOffset,
    w: rect.width
  };
};

module.exports = ImageGallery;
