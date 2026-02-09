/******/ (() => { // webpackBootstrap
/*!*********************************************!*\
  !*** ./src/frontendjs/has-image-sharing.js ***!
  \*********************************************/
/**
 * Image sharing (Pinterest and Web Share API) for Highlight and Share.
 *
 * Runs independently of the main highlight-and-share script. Expects global
 * hasImageSharing (from wp_localize_script) with enable_webshare_image_only.
 */
(function () {
  'use strict';

  if ('undefined' === typeof hasImageSharing) {
    return;
  }
  var config = hasImageSharing;

  /**
   * Get page URL from HAS placeholder or current window.
   *
   * @return {string} Page URL.
   */
  var getPageUrl = function getPageUrl() {
    var placeholder = document.querySelector('.has-social-placeholder');
    if (placeholder && placeholder.dataset.url) {
      return placeholder.dataset.url;
    }
    return window.location.href;
  };

  /**
   * Listen for Image Sharing Events and enable webshare if available (hidden by default).
   */
  if ('undefined' !== typeof navigator.share) {
    var webshare = document.querySelectorAll('.has-pin-svg-webshare');
    if (null !== webshare) {
      webshare.forEach(function (el) {
        el.style.display = 'inline-block';
      });
    }
  }

  // Show all the Pinterest icons. Note, this is so that the Pinterest icon doesn't flash when first loading in.
  var pinterestSvgs = document.querySelectorAll('.has-pin-svg-pinterest');
  if (null !== pinterestSvgs) {
    pinterestSvgs.forEach(function (el) {
      el.style.display = 'inline-block';
    });
  }

  // Make wrappers with show-on-hover focusable so keyboard users can focus the image and see the sharing buttons.
  var showOnHoverWrappers = document.querySelectorAll('.has-pin-image-wrapper.has-pin-show-on-hover');
  showOnHoverWrappers.forEach(function (wrapper) {
    if (!wrapper.hasAttribute('tabindex')) {
      wrapper.setAttribute('tabindex', '0');
    }
  });

  /**
   * Listen for Image Sharing Events (Pinterest).
   */
  var imageShare = document.querySelectorAll('.has-pin-svg-pinterest');
  if (null !== imageShare) {
    imageShare.forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        var parent = event.target.closest('.has-pin-image-wrapper');
        if (null === parent) {
          return;
        }
        var image = parent.querySelector('img');
        var imageUrl = image.getAttribute('src');
        var dataPinUrl = image.getAttribute('data-pin-url');
        var description = image.getAttribute('alt');
        var dataPinDescription = image.getAttribute('data-pin-description');
        var pageUrl = getPageUrl();
        var maybeParentAnchor = image.closest('a');
        if (null !== maybeParentAnchor) {
          var maybeParentAnchorUrl = maybeParentAnchor.getAttribute('href');
          if (maybeParentAnchorUrl && maybeParentAnchorUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
            var _maybeParentAnchor$ge;
            imageUrl = maybeParentAnchorUrl;
            description = (_maybeParentAnchor$ge = maybeParentAnchor.getAttribute('title')) !== null && _maybeParentAnchor$ge !== void 0 ? _maybeParentAnchor$ge : description;
          }
        }
        if ('undefined' !== typeof dataLayer) {
          dataLayer.push({
            event: 'highlight-and-share',
            hasSharePostUrl: imageUrl,
            hasSharePostTitle: description,
            hasShareType: 'image',
            hasSocialNetwork: 'pinterest'
          });
        }
        window.open('https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(pageUrl) + '&media=' + encodeURIComponent(dataPinUrl !== null && dataPinUrl !== void 0 ? dataPinUrl : imageUrl) + '&description=' + encodeURIComponent(dataPinDescription !== null && dataPinDescription !== void 0 ? dataPinDescription : description), 'Highlight and Share', 'width=575,height=430,toolbar=false,menubar=false,location=false,status=false');
      });
    });
  }

  /**
   * Run Web Share for URL (title, text, url). Call this in the same synchronous turn as the user gesture.
   *
   * @param {string} title Title.
   * @param {string} text  Text.
   * @param {string} url   URL.
   */
  var doShareUrl = function doShareUrl(title, text, url) {
    navigator.share({
      title: title || '',
      text: text || '',
      url: url || ''
    })["catch"](function (err) {
      if (err.name !== 'AbortError') {
        // eslint-disable-next-line no-console
        console.warn('Highlight and Share: Web Share failed', err);
      }
    });
  };

  /**
   * Build share payload from wrapper. Minimal DOM reads so we can share() immediately.
   *
   * @param {Element} wrapper .has-pin-image-wrapper element.
   * @return {{ title: string, text: string, shareUrl: string, imageUrl: string }} Payload.
   */
  var getSharePayloadFromWrapper = function getSharePayloadFromWrapper(wrapper) {
    var image = wrapper.querySelector('img');
    var dataPinUrl = image ? image.getAttribute('data-pin-url') : null;
    var description = image ? image.getAttribute('alt') : '';
    var dataPinDescription = image ? image.getAttribute('data-pin-description') : null;
    var imageUrl = image ? image.getAttribute('src') : '';
    var pageUrl = getPageUrl();
    var shareUrl = dataPinUrl || pageUrl;
    var title = dataPinDescription || description || '';
    var text = dataPinDescription || description || '';
    var maybeParentAnchor = image ? image.closest('a') : null;
    if (maybeParentAnchor) {
      var href = maybeParentAnchor.getAttribute('href');
      if (href && href.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
        imageUrl = href;
        description = maybeParentAnchor.getAttribute('title') || description;
      }
    }
    return {
      title: title,
      text: text,
      shareUrl: shareUrl,
      imageUrl: imageUrl
    };
  };

  /**
   * Cache of image URL -> { blob, extension } for synchronous Web Share (image-only).
   * Preloaded only when the webshare button is hovered or touched.
   */
  var imageBlobCache = new Map();
  var IMAGE_BLOB_CACHE_MAX = 10;

  /**
   * Preload an image as a blob and store in cache. Evicts oldest entries when over limit.
   *
   * @param {string} imageUrl Image URL to fetch.
   */
  var preloadImageBlob = function preloadImageBlob(imageUrl) {
    if (!imageUrl || imageBlobCache.has(imageUrl)) {
      return;
    }
    var ext = imageUrl.split('.').pop().toLowerCase().split('?')[0] || 'png';
    fetch(imageUrl).then(function (response) {
      return response.blob();
    }).then(function (blob) {
      while (imageBlobCache.size >= IMAGE_BLOB_CACHE_MAX) {
        var firstKey = imageBlobCache.keys().next().value;
        if (firstKey !== undefined) {
          imageBlobCache["delete"](firstKey);
        }
      }
      imageBlobCache.set(imageUrl, {
        blob: blob,
        extension: ext
      });
    })["catch"](function () {});
  };

  /**
   * Start preloading the image for this wrapper (on hover or touch of the image). Only when image-only is enabled.
   *
   * @param {Element} wrapper .has-pin-image-wrapper element.
   */
  var startPreloadForWrapper = function startPreloadForWrapper(wrapper) {
    if (!config.enable_webshare_image_only) {
      return;
    }
    var payload = getSharePayloadFromWrapper(wrapper);
    if (payload.imageUrl) {
      preloadImageBlob(payload.imageUrl);
    }
  };

  /**
   * Image wrappers: preload blob when user hovers over or touches the image (not just the share button).
   */
  var imageWrappers = document.querySelectorAll('.has-pin-image-wrapper');
  if (null !== imageWrappers && config.enable_webshare_image_only) {
    imageWrappers.forEach(function (wrapper) {
      wrapper.addEventListener('pointerenter', function () {
        return startPreloadForWrapper(wrapper);
      });
      wrapper.addEventListener('touchstart', function () {
        return startPreloadForWrapper(wrapper);
      }, {
        passive: true
      });
    });
  }

  /**
   * Webshare Button.
   * Use pointerdown and touchend so share() runs in the same user gesture.
   */
  var webshareButton = document.querySelectorAll('.has-pin-svg-webshare');
  if (null !== webshareButton) {
    webshareButton.forEach(function (el) {
      var handleWebShare = function handleWebShare(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'pointerdown' && event.pointerType === 'touch') {
          return;
        }
        var parent = event.target.closest('.has-pin-image-wrapper');
        if (!parent) {
          return;
        }
        var payload = getSharePayloadFromWrapper(parent);
        if (config.enable_webshare_image_only) {
          var cached = imageBlobCache.get(payload.imageUrl);
          if (cached) {
            var file = new File([cached.blob], "image.".concat(cached.extension), {
              type: cached.blob.type || 'image/' + cached.extension
            });
            navigator.share({
              files: [file]
            })["catch"](function (err) {
              if (err.name !== 'AbortError') {
                // eslint-disable-next-line no-console
                console.warn('Highlight and Share: Web Share failed', err);
              }
              // Do not call doShareUrl() here: that would trigger a second share()
              // and can cause "An earlier share has not yet completed" or double sheet.
            });
          } else {
            doShareUrl(payload.title, '', payload.imageUrl || payload.shareUrl);
          }
        } else {
          // Avoid duplicate: use text only when it differs from title.
          var shareText = payload.text !== payload.title ? payload.text : '';
          doShareUrl(payload.title, shareText, payload.shareUrl);
        }
        if ('undefined' !== typeof dataLayer) {
          dataLayer.push({
            event: 'highlight-and-share',
            hasSharePostUrl: payload.shareUrl,
            hasSharePostTitle: payload.title,
            hasShareType: 'image',
            /* selection|cta|inline|image|headline */
            hasSocialNetwork: 'webshare'
          });
        }
      };
      el.addEventListener('pointerdown', handleWebShare, {
        capture: true
      });
      el.addEventListener('touchend', function (e) {
        e.preventDefault();
        handleWebShare(e);
      }, {
        capture: true,
        passive: false
      });
      el.addEventListener('click', function (e) {
        return e.preventDefault();
      });
    });
  }
})();
/******/ })()
;
//# sourceMappingURL=has-image-sharing.js.map