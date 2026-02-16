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
/*!********************************************!*\
  !*** ./src/frontendjs/headline-sharing.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stats_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stats-dispatcher */ "./src/frontendjs/stats-dispatcher.js");
/**
 * Headline sharing: open a small panel (up to 4 networks, vertical list) when clicking a heading with data-has-headline-share.
 * Panel is positioned so it never covers the link icon (left of heading); may cover headline text.
 */

(function () {
  'use strict';

  if (typeof hasHeadlineSharing === 'undefined' || !Array.isArray(hasHeadlineSharing.networks) || hasHeadlineSharing.networks.length === 0) {
    return;
  }
  var config = hasHeadlineSharing;
  var GAP = 8;
  var activePanel = null;
  var activeHeading = null;
  var activeTrigger = null;

  /**
   * Substitute placeholders in a share URL template for headline section.
   *
   * @param {string} template   Template with %url%, %title%, %text%, etc.
   * @param {string} sectionUrl Full section URL (page + #id).
   * @param {string} title      Heading text.
   * @param {string} text       Same as title for headlines.
   * @return {string} Filled URL.
   */
  function substituteUrl(template, sectionUrl, title, text) {
    var prefix = config.prefix || '';
    var suffix = config.suffix || '';
    var username = config.twitterUsername || '';
    var hashtags = '';
    var threadstext = prefix + text + suffix + '\n\n' + sectionUrl;
    var blueskytext = prefix + text + suffix + '\n\n' + sectionUrl;
    var url = template.replace(/%url%/g, encodeURIComponent(sectionUrl)).replace(/%title%/g, encodeURIComponent(title)).replace(/%text%/g, encodeURIComponent(text)).replace(/%prefix%/g, encodeURIComponent(prefix)).replace(/%suffix%/g, encodeURIComponent(suffix)).replace(/%username%/g, encodeURIComponent(username)).replace(/%hashtags%/g, encodeURIComponent(hashtags)).replace(/%threadstext%/g, encodeURIComponent(threadstext)).replace(/%blueskytext%/g, encodeURIComponent(blueskytext));
    return url;
  }
  function createIconEl(iconId) {
    if (!iconId) {
      return null;
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'has-headline-share-panel__icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    var useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useEl.setAttribute('href', '#' + iconId);
    useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + iconId);
    svg.appendChild(useEl);
    return svg;
  }
  function appendActionContent(action, net, copiedLabelRef) {
    var iconEl = createIconEl(net.iconId);
    if (iconEl) {
      action.appendChild(iconEl);
    }
    var labelSpan = document.createElement('span');
    labelSpan.className = 'has-headline-share-panel__label';
    labelSpan.textContent = net.label;
    action.appendChild(labelSpan);
    if (copiedLabelRef) {
      copiedLabelRef.labelSpan = labelSpan;
    }
  }

  /**
   * Build the share panel DOM (vertical list of up to 4 networks).
   *
   * @param {string} sectionUrl  Section URL.
   * @param {string} headingText Heading text.
   * @return {HTMLElement} Panel element.
   */
  function buildPanel(sectionUrl, headingText) {
    var panel = document.createElement('div');
    panel.className = 'has-headline-share-panel';
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-label', 'Share this section');
    config.networks.forEach(function (net) {
      var row = document.createElement('div');
      row.className = 'has-headline-share-panel__row';
      var statsPayload = {
        hasSharePostUrl: sectionUrl,
        hasSharePostTitle: headingText,
        hasShareText: headingText,
        hasShareType: 'headline',
        hasSocialNetwork: net.slug
      };
      if (net.slug === 'copy') {
        var copiedRef = {};
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'has-headline-share-panel__action has-headline-share-panel__action--copy';
        button.setAttribute('role', 'menuitem');
        appendActionContent(button, net, copiedRef);
        button.addEventListener('mousedown', function () {
          (0,_stats_dispatcher__WEBPACK_IMPORTED_MODULE_0__.dispatchStatsEvent)(statsPayload);
        });
        button.addEventListener('click', function (e) {
          e.preventDefault();
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(sectionUrl).then(function () {
              if (copiedRef.labelSpan) {
                copiedRef.labelSpan.textContent = 'Copied!';
                setTimeout(function () {
                  copiedRef.labelSpan.textContent = net.label;
                }, 1500);
              }
            });
          }
        });
        row.appendChild(button);
      } else if (net.slug === 'webshare') {
        var _button = document.createElement('button');
        _button.type = 'button';
        _button.className = 'has-headline-share-panel__action has-headline-share-panel__action--webshare';
        _button.setAttribute('role', 'menuitem');
        appendActionContent(_button, net);
        _button.addEventListener('mousedown', function () {
          (0,_stats_dispatcher__WEBPACK_IMPORTED_MODULE_0__.dispatchStatsEvent)(statsPayload);
        });
        _button.addEventListener('click', function (e) {
          e.preventDefault();
          if (navigator.share) {
            navigator.share({
              title: headingText,
              url: sectionUrl,
              text: headingText
            })["catch"](function () {});
          }
        });
        row.appendChild(_button);
      } else {
        var url = net.shareUrlTemplate && net.shareUrlTemplate !== '#' ? substituteUrl(net.shareUrlTemplate, sectionUrl, headingText, headingText) : '#';
        var link = document.createElement('a');
        link.href = url;
        link.className = 'has-headline-share-panel__action';
        link.setAttribute('role', 'menuitem');
        appendActionContent(link, net);
        link.addEventListener('mousedown', function () {
          (0,_stats_dispatcher__WEBPACK_IMPORTED_MODULE_0__.dispatchStatsEvent)(statsPayload);
        });
        if (net.requiresPopup) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(url, 'Highlight and Share', 'width=575,height=430,toolbar=false,menubar=false,location=false,status=false');
          });
        }
        row.appendChild(link);
      }
      panel.appendChild(row);
    });
    return panel;
  }

  /**
   * Position panel relative to the link icon (trigger). Keeps panel in viewport.
   * Default: left of icon; if viewport is too small, try right, then below, above.
   *
   * @param {HTMLElement} panel   Panel element (already in DOM).
   * @param {HTMLElement} trigger Link icon button (.has-headline-share-trigger).
   */
  function positionPanel(panel, trigger) {
    if (!trigger) {
      return;
    }
    var iconRect = trigger.getBoundingClientRect();
    var panelRect = panel.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var scrollX = window.scrollX;
    var scrollY = window.scrollY;
    var pw = panelRect.width;
    var ph = panelRect.height;
    var iconWidth = iconRect.width;
    var iconHeight = iconRect.height;
    panel.style.position = 'absolute';
    panel.style.left = '';
    panel.style.right = '';
    panel.style.top = '';
    panel.style.bottom = '';
    panel.style.margin = '0';
    function inViewport(l, t) {
      return l >= scrollX && l + pw <= scrollX + vw && t >= scrollY && t + ph <= scrollY + vh;
    }

    // 1) Left of icon (default).
    var left = iconRect.left - GAP - iconWidth / 2 - pw / 2;
    var top = iconRect.top + scrollY;
    if (inViewport(left, top)) {
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
      return;
    }

    // 2) Right of icon (when viewport too small on the left).
    left = iconRect.right + GAP + scrollX;
    top = iconRect.top + scrollY + iconRect.height / 2 - ph / 2;
    if (inViewport(left, top)) {
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
      return;
    }

    // 3) Below icon (centered under icon).
    left = iconRect.left + scrollX + iconRect.width / 2 - pw / 2;
    top = iconRect.bottom + GAP + scrollY;
    if (inViewport(left, top)) {
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
      return;
    }

    // 4) Above icon (centered).
    left = iconRect.left + scrollX + iconRect.width / 2 - pw / 2;
    top = iconRect.top + scrollY - GAP - ph;
    if (inViewport(left, top)) {
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
      return;
    }

    // Fallback: left of icon clamped to viewport; if that would push panel off left edge, use right.
    left = iconRect.left - GAP - pw + scrollX;
    if (left < scrollX) {
      left = Math.min(iconRect.right + GAP + scrollX, scrollX + vw - pw - 15);
    } else {
      left = Math.max(left, scrollX);
    }
    top = Math.min(Math.max(iconRect.top + scrollY + iconRect.height / 2 - ph / 2, scrollY), scrollY + vh - ph - 15);
    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
  }
  function closePanel() {
    if (activeTrigger) {
      activeTrigger.setAttribute('aria-expanded', 'false');
      activeTrigger.removeAttribute('aria-controls');
      activeTrigger.focus();
    }
    if (activePanel && activePanel.parentNode) {
      activePanel.parentNode.removeChild(activePanel);
    }
    activePanel = null;
    activeHeading = null;
    activeTrigger = null;
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleEscape);
  }
  function handleOutsideClick(e) {
    if (activePanel && !activePanel.contains(e.target) && activeHeading && !activeHeading.contains(e.target)) {
      closePanel();
    }
  }
  function handleEscape(e) {
    if (e.key === 'Escape') {
      closePanel();
    }
  }
  function openPanel(heading, trigger) {
    closePanel();
    var id = heading.id;
    if (!id) {
      return;
    }
    var sectionUrl = config.pageUrl ? config.pageUrl.replace(/#.*$/, '') + '#' + id : window.location.href.replace(/#.*$/, '') + '#' + id;
    var headingText = heading.textContent.trim();
    var panel = buildPanel(sectionUrl, headingText);
    panel.id = 'has-headline-share-panel-' + id;
    panel.style.zIndex = '10000';
    document.body.appendChild(panel);
    positionPanel(panel, trigger);
    activePanel = panel;
    activeHeading = heading;
    activeTrigger = trigger;
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('aria-controls', panel.id);
    }
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    var firstAction = panel.querySelector('.has-headline-share-panel__action');
    if (firstAction) {
      firstAction.focus();
    }
  }
  function onTriggerClick(e) {
    e.preventDefault();
    e.stopPropagation();
    var trigger = e.currentTarget;
    var heading = trigger.closest('[data-has-headline-share]');
    if (heading) {
      openPanel(heading, trigger);
    }
  }
  function init() {
    var triggers = document.querySelectorAll('.has-headline-share-trigger');
    triggers.forEach(function (el) {
      el.addEventListener('click', onTriggerClick);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
})();

/******/ })()
;
//# sourceMappingURL=has-headline-sharing.js.map