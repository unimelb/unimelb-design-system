/**
 * ImageGallery
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function ImageGallery(el, props) {
  this.el = el;
  this.props = props || {};

  this.setupGallery();
  this.initIsotope();

  this.setupPhotoSwipe();
  this.initPhotoSwipe();
}

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
 * Add hover zoom icon and aspect ratio class to each item.
 */
ImageGallery.prototype.setupGallery = function () {
  var items = this.el.querySelectorAll('li');
  for (var i = items.length - 1; i >= 0; i--) {
    var item = items[i];

    var link = item.querySelector('a');
    var img = item.querySelector('img');
    var ratio = img.offsetWidth / img.offsetHeight;

    item.classList.add(ratio < 1 ? 'portrait' : (ratio > 2 ? 'panorama' : 'landscape'));
    link.style.backgroundImage = 'url(' + img.src + ')';
    link.setAttribute('data-pswp-uid', i + 1);
    link.addEventListener('click', this.onThumbnailClick.bind(this, i));
    img.classList.add('hide');

    var icon = document.createElement('span');
    icon.className = 'image-gallery__icon';
    icon.innerHTML = '<svg role="img" class="icon"><use xlink:href="#icon-zoom-in"></use></svg>';
    link.appendChild(icon);
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
    this.openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true);
  }
};

ImageGallery.prototype.onThumbnailClick = function (index, evt) {
  evt.preventDefault();
  console.log(this);
  this.openPhotoSwipe(index, this.el);
};

ImageGallery.prototype.openPhotoSwipe = function (index, galleryElement, disableAnimation) {
  var items = this.parseThumbnailElements(galleryElement);

  var options = {
    index: index,
    showHideOpacity: true,

    // define gallery index (for URL)
    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

    // define boundaries of thumbnail for animation
    getThumbBoundsFn: function(index) {
      var thumbnail = items[index].el.querySelector('a');
      var rect = thumbnail.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top + window.pageYOffset,
        w: rect.width
      };
    }
  };

  if (disableAnimation) {
    options.showAnimationDuration = 0;
  }

  this.props.gallery = new PhotoSwipe(this.props.pswp, window.PhotoSwipeUI_Default, items, options);
  this.props.gallery.init();
};

ImageGallery.prototype.parseThumbnailElements = function (el) {
  var thumbElements = el.childNodes,
    numNodes = thumbElements.length,
    items = [],
    figureEl,
    linkEl,
    liEl,
    size,
    item;

  for (var i = 0; i < numNodes; i++) {
    liEl = thumbElements[i];
    if (liEl.nodeType !== 1) {
      continue;
    }

    linkEl = liEl.children[0]; // <a> element
    figureEl = linkEl.children[0];

    size = linkEl.getAttribute('data-size').split('x');

    // create slide object
    item = {
      src: linkEl.getAttribute('href'),
      w: parseInt(size[0], 10),
      h: parseInt(size[1], 10)
    };

    if (figureEl.children.length > 1) {
      // <figcaption> content
      item.title = figureEl.querySelector('figcaption').innerHTML;
      item.msrc = figureEl.querySelector('img').getAttribute('src');
    }

    item.el = liEl; // save link to element for getThumbBoundsFn
    items.push(item);
  }

  return items;
};

module.exports = ImageGallery;
