/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontendjs/stats-dispatcher.js":
/*!********************************************!*\
  !*** ./src/frontendjs/stats-dispatcher.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dispatchStatsEvent: () => (/* binding */ dispatchStatsEvent)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Shared stats dispatch helper for Highlight and Share.
 *
 * Dispatches share events to dataLayer (GTM), gtag (GA4), and synthetic CustomEvents
 * so that GTM, GA4, and third-party listeners can track sharing.
 *
 * @package
 */

/**
 * Default event name for Highlight and Share tracking.
 *
 * @type {string}
 */
var EVENT_NAME = 'has:share';

/**
 * GA4 event name (underscores for consistency with GA4 conventions).
 *
 * @type {string}
 */
var GA4_EVENT_NAME = 'has:share';

/**
 * Dispatches a stats event to all enabled channels: dataLayer, gtag (when available), and synthetic CustomEvent.
 * No-ops when stats are disabled via hasStatsConfig.stats_enabled (PHP constant HAS_STATS_ENABLED or filter has_stats_enabled).
 * URL, share text, and title are omitted unless hasStatsConfig.stats_enhanced is truthy (HAS_STATS_ENHANCED or has_stats_enhanced filter).
 *
 * @param {Object} payload Event payload. Expected keys: event (optional, defaults to EVENT_NAME),
 *                         hasShareText (optional), hasSharePostUrl, hasSharePostTitle, hasShareType, hasSocialNetwork.
 */
function dispatchStatsEvent(payload) {
  var _payload$hasShareText, _payload$hasSharePost, _payload$hasSharePost2, _payload$hasShareType, _payload$hasSocialNet;
  // Treat any falsy value as disabled (WP localize can output false as '').
  if (typeof hasStatsConfig !== 'undefined' && !hasStatsConfig.stats_enabled) {
    return;
  }
  var fullPayload = {
    event: payload.event || EVENT_NAME,
    hasShareText: (_payload$hasShareText = payload.hasShareText) !== null && _payload$hasShareText !== void 0 ? _payload$hasShareText : '',
    hasSharePostUrl: (_payload$hasSharePost = payload.hasSharePostUrl) !== null && _payload$hasSharePost !== void 0 ? _payload$hasSharePost : '',
    hasSharePostTitle: (_payload$hasSharePost2 = payload.hasSharePostTitle) !== null && _payload$hasSharePost2 !== void 0 ? _payload$hasSharePost2 : '',
    hasShareType: (_payload$hasShareType = payload.hasShareType) !== null && _payload$hasShareType !== void 0 ? _payload$hasShareType : '',
    hasSocialNetwork: (_payload$hasSocialNet = payload.hasSocialNetwork) !== null && _payload$hasSocialNet !== void 0 ? _payload$hasSocialNet : ''
  };

  // Unless enhanced is on, do not send URL, share text, or title (privacy).
  if (typeof hasStatsConfig !== 'undefined' && !hasStatsConfig.stats_enhanced) {
    fullPayload.hasShareText = '';
    fullPayload.hasSharePostUrl = '';
    fullPayload.hasSharePostTitle = '';
  }

  // dataLayer (GTM): push when present.
  if ('undefined' !== typeof window.dataLayer) {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(_objectSpread({}, fullPayload));
    }
  }

  // gtag (GA4): call only when gtag is available (auto-detect).
  if ('function' === typeof window.gtag) {
    window.gtag('event', GA4_EVENT_NAME, {
      has_share_text: fullPayload.hasShareText,
      has_share_post_url: fullPayload.hasSharePostUrl,
      has_share_post_title: fullPayload.hasSharePostTitle,
      has_share_type: fullPayload.hasShareType,
      has_social_network: fullPayload.hasSocialNetwork
    });
  }

  // Synthetic CustomEvent for third-party listeners (opt-in by adding listeners).
  window.dispatchEvent(new CustomEvent(fullPayload.event, {
    detail: fullPayload,
    bubbles: true,
    cancelable: false
  }));
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./src/frontendjs/has-image-sharing.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stats_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stats-dispatcher */ "./src/frontendjs/stats-dispatcher.js");
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
      // Fire stats on mousedown so the event is sent before middle-click or right-click "Open in new tab".
      el.addEventListener('mousedown', function (event) {
        var parent = event.target.closest('.has-pin-image-wrapper');
        if (null === parent) {
          return;
        }
        var image = parent.querySelector('img');
        var imageUrl = image.getAttribute('src');
        var description = image.getAttribute('alt');
        var maybeParentAnchor = image.closest('a');
        if (null !== maybeParentAnchor) {
          var maybeParentAnchorUrl = maybeParentAnchor.getAttribute('href');
          if (maybeParentAnchorUrl && maybeParentAnchorUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
            var _maybeParentAnchor$ge;
            imageUrl = maybeParentAnchorUrl;
            description = (_maybeParentAnchor$ge = maybeParentAnchor.getAttribute('title')) !== null && _maybeParentAnchor$ge !== void 0 ? _maybeParentAnchor$ge : description;
          }
        }
        (0,_stats_dispatcher__WEBPACK_IMPORTED_MODULE_0__.dispatchStatsEvent)({
          hasSharePostUrl: imageUrl,
          hasSharePostTitle: description,
          hasShareType: 'image',
          hasSocialNetwork: 'pinterest'
        });
      });
      el.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
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
            var _maybeParentAnchor$ge2;
            imageUrl = maybeParentAnchorUrl;
            description = (_maybeParentAnchor$ge2 = maybeParentAnchor.getAttribute('title')) !== null && _maybeParentAnchor$ge2 !== void 0 ? _maybeParentAnchor$ge2 : description;
          }
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
        (0,_stats_dispatcher__WEBPACK_IMPORTED_MODULE_0__.dispatchStatsEvent)({
          hasSharePostUrl: payload.shareUrl,
          hasSharePostTitle: payload.title,
          hasShareType: 'image',
          hasSocialNetwork: 'webshare'
        });
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
})();

/******/ })()
;
//# sourceMappingURL=has-image-sharing.js.map