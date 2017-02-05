/**
 * Image gallery
 * @param  {Element} el
 * @param  {Object} props
 */
function ImageGallery(el, props) {
  this.el = el;
  this.props = props || {};

  this.props.items = el.querySelectorAll('li');
  this.props.slides = [];

  this.props.pswpDefaults = {
    showHideOpacity: true,
    // define gallery index (for URL)
    galleryUID: this.props.index || 0,
    // define boundaries of thumbnail for animation
    getThumbBoundsFn: this.getThumbBoundsFn.bind(this)
  };

  this.setupGallery();
  this.initIsotope();

  this.setupPhotoSwipe();
  this.initPhotoSwipe();
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

    // Compute thumbnail ratio and add corresponding class
    var ratio = img.offsetWidth / img.offsetHeight;
    item.classList.add(ratio < 1 ? 'portrait' : (ratio > 2 ? 'panorama' : 'landscape'));

    // Create PhotoSwipe slide
    var size = link.getAttribute('data-size').split('x');
    this.props.slides.push({
      el: link,
      src: link.getAttribute('href'),
      w: parseInt(size[0], 10),
      h: parseInt(size[1], 10),
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
 * Set up PhotoSwipe markup.
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
 * Initialise PhotoSwipe.
 */
ImageGallery.prototype.initPhotoSwipe = function() {
  var photoswipeParseHash = function() {
    var hash = window.location.hash.substring(1),
    params = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    if (!params.hasOwnProperty('pid')) {
      return params;
    }
    params.pid = parseInt(params.pid, 10);
    return params;
  };

  var galleryElements = this.el.querySelectorAll('a');

  var hashData = photoswipeParseHash();
  if (hashData.pid > 0 && hashData.gid > 0) {
    this.openPhotoSwipe(hashData.pid - 1, true);
  }
};

ImageGallery.prototype.onThumbnailClick = function (index, evt) {
  evt.preventDefault();
  this.openPhotoSwipe(index);
};

ImageGallery.prototype.openPhotoSwipe = function (slideIndex, disableAnimation) {
  var options = Object.assign({}, this.props.pswpDefaults, {
    index: slideIndex,
    showAnimationDuration: disableAnimation ? 0 : 333
  });

  var gallery = new PhotoSwipe(this.props.pswp, window.PhotoSwipeUI_Default, this.props.slides, options);
  gallery.init();
};

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
