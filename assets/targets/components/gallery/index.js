/**
 * ImageGallery
 *
 * @param  {Element} el
 * @param  {Object} props
 */
function ImageGallery(el, props) {
  this.el = el;
  this.props = props;

  this.setupPhotoSwipe();
  this.setupGallery();

  var Isotope = require('isotope-layout');
  new Isotope(this.el, {
    itemSelector: '.item',
    layoutMode: 'masonry',
    masonry: {
      columnWidth: 1,
      gutter: 0
    }
  });

  loadScript('/assets/photoswipe.js', this.initPhotoSwipeFromDOM.bind(this));
}

/**
 * Add zoom icon, define aspect
 */
ImageGallery.prototype.setupGallery = function() {
  for (var imageLinks = this.el.querySelectorAll('li a'), i=imageLinks.length - 1; i >= 0; i--) {
    var imageLink = imageLinks[i],
        img = imageLink.querySelector('img'),
        ratio = img.offsetWidth / img.offsetHeight,
        span = document.createElement('span');
    span.innerHTML = '<svg role="img" class="icon"><use xlink:href="#icon-zoom"></use></svg>';
    imageLink.parentNode.addClass(ratio < 1 ? 'portrait' : ratio > 2 ? 'panorama' : 'landscape');
    imageLink.style.backgroundImage = 'url(' + img.src + ')';
    img.addClass('hidden');
    imageLink.appendChild(span);
  }
};

/**
 * Set up PhotoSwipe markup
 */
ImageGallery.prototype.setupPhotoSwipe = function() {
  this.props.pswp = document.querySelector('.pswp');
  if (!this.props.pswp) {
    this.props.pswpEl = document.createElement('div');
    this.props.pswpEl.addClass('pswp');
    this.props.pswpEl.setAttribute('tabindex', '-1');
    this.props.pswpEl.setAttribute('role', 'dialog');
    this.props.pswpEl.setAttribute('aria-hidden', 'true');
    this.props.pswpEl.innerHTML = '<div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div>';
    document.querySelector('div.uomcontent').appendChild(this.props.pswpEl);
  }
};

ImageGallery.prototype.initPhotoSwipeFromDOM = function() {
  var gallerySelector = this.el;

  var parseThumbnailElements = function(el) {
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
        item.title = figureEl.children[1].innerHTML;
        item.msrc = figureEl.children[0].getAttribute('src');
      }

      item.el = liEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  var closest = function closest(el, fn) {
      return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };

  var onThumbnailsClick = function(e) {
    e = e || window.event;
    if (typeof e.preventDefault !=="undefined")
      e.preventDefault();
    else
      e.returnValue = false;

    // find root element of slide
    var clickedListItem = closest(this, function(el) {
      return (el.tagName && el.tagName.toUpperCase() === 'LI');
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }

    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe( index, clickedGallery );
    }
    return false;
  };

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

  var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {
      index: index,

      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function(index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('a')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();
        return {x:rect.left, y:rect.top + pageYScroll + 20, w:rect.width};
      }
    };

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  var galleryElements = gallerySelector.querySelectorAll('a');

  for(var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i+1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  var hashData = photoswipeParseHash();
  if (hashData.pid > 0 && hashData.gid > 0) {
    openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
  }
};

module.exports = ImageGallery;
