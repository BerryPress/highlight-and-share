/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontendjs/dom.js":
/*!*******************************!*\
  !*** ./src/frontendjs/dom.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closest: () => (/* binding */ closest),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   getOffsetScroll: () => (/* binding */ getOffsetScroll),
/* harmony export */   matches: () => (/* binding */ matches)
/* harmony export */ });
function getOffsetScroll(_window) {
  var body = _window.document.body;
  var scrollReference = _window.getComputedStyle(body).position === "static" ? body.parentNode : body;
  return scrollReference.getBoundingClientRect();
}
var matchFunc;
function matches(element, selector) {
  if (!matchFunc) matchFunc = getMatchFunctionName(element);
  return element[matchFunc](selector);
}
function closest(element, selector) {
  var target = element;
  while (target && (target.nodeType !== 1 /* === Node.ELEMENT_NODE */ || !matches(target, selector))) {
    target = target.parentNode;
  }
  return target;
}

// `contains` in IE doesn't work with text nodes
function contains(ancestor, target) {
  var comparedPositions = ancestor.compareDocumentPosition(target);
  // eslint-disable-next-line no-bitwise
  return !comparedPositions || (comparedPositions & 16 /* === Node.DOCUMENT_POSITION_CONTAINED_BY */) > 0;
}

// eslint-disable-next-line consistent-return
function getMatchFunctionName(element) {
  var suffix = "atchesSelector";
  for (var _i = 0, _arr = ["matches", "m".concat(suffix), "webkitM".concat(suffix), "mozM".concat(suffix), "msM".concat(suffix), "oM".concat(suffix)]; _i < _arr.length; _i++) {
    var name = _arr[_i];
    if (element[name]) return name;
  }
}

/***/ }),

/***/ "./src/frontendjs/selection.js":
/*!*************************************!*\
  !*** ./src/frontendjs/selection.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constrainRange: () => (/* binding */ constrainRange),
/* harmony export */   getEndLineRect: () => (/* binding */ getEndLineRect),
/* harmony export */   isSelectionForward: () => (/* binding */ isSelectionForward)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/frontendjs/dom.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

function isSelectionForward(selection) {
  if (selection.isCollapsed) {
    return true;
  }
  var comparedPositions = selection.anchorNode.compareDocumentPosition(selection.focusNode);
  if (!comparedPositions) {
    // It's the same node
    return selection.anchorOffset < selection.focusOffset;
  }

  // eslint-disable-next-line no-bitwise
  return (comparedPositions & 4 /* === Node.DOCUMENT_POSITION_FOLLOWING */) > 0;
}
function getEndLineRect(range, isForward) {
  var endLineRects;
  var rangeRects = range.getClientRects();
  var sliceRects = [].slice.bind(rangeRects);
  if (isForward) {
    var lastLeft = Infinity;
    var i = rangeRects.length;
    while (i--) {
      var rect = rangeRects[i];
      if (rect.left > lastLeft) {
        break;
      }
      lastLeft = rect.left;
    }
    endLineRects = sliceRects(i + 1);
  } else {
    var lastRight = -Infinity;
    var _i = 0;
    for (; _i < rangeRects.length; _i++) {
      var _rect = rangeRects[_i];
      if (_rect.right < lastRight) {
        break;
      }
      lastRight = _rect.right;
    }
    endLineRects = sliceRects(0, _i);
  }
  return {
    top: Math.min.apply(Math, _toConsumableArray(endLineRects.map(function (rect) {
      return rect.top;
    }))),
    bottom: Math.max.apply(Math, _toConsumableArray(endLineRects.map(function (rect) {
      return rect.bottom;
    }))),
    left: endLineRects[0].left,
    right: endLineRects[endLineRects.length - 1].right
  };
}
function constrainRange(range, selector) {
  var constrainedRange = range.cloneRange();
  if (range.collapsed || !selector) {
    return constrainedRange;
  }
  var ancestor = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest)(range.startContainer, selector);
  if (ancestor) {
    if (!(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.contains)(ancestor, range.endContainer)) {
      constrainedRange.setEnd(ancestor, ancestor.childNodes.length);
    }
  } else {
    ancestor = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest)(range.endContainer, selector);
    if (ancestor) {
      constrainedRange.setStart(ancestor, 0);
    } else {
      constrainedRange.collapse();
    }
  }
  return constrainedRange;
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
/*!***********************************************!*\
  !*** ./src/frontendjs/highlight-and-share.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection */ "./src/frontendjs/selection.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

(function () {
  'use strict';

  // Get localized var.
  var HAS = highlight_and_share;

  // Set variables.
  var prefix = HAS.prefix;
  var suffix = HAS.suffix;
  var isLegacyContentMode = HAS.content_legacy_mode;
  var currentElement = null;

  // Main HAS container in the footer. If ".highlight-and-share-wrapper" doesn't have this parent, it is a clone.
  var hasContainer = document.querySelector('#has-highlight-and-share');
  if (null === hasContainer) {
    return;
  }
  var socialNetworks = '.has_whatsapp, .has_facebook, .has_twitter, .has_copy, .has_reddit, .has_telegram, .has_linkedin, .has_xing, .has_signal, .has_vk, .has_tumblr, .has_mastodon, .has_email_mailto, .has_email_form, .has_threads, .has_bluesky, .has_webshare';

  // Get highlight and share container dimensions.
  var hasSharingIconsContainer = hasContainer.querySelector('.highlight-and-share-wrapper');

  // Populate container dimensions/width/height.
  var rect = hasSharingIconsContainer.getBoundingClientRect();
  var hasSharerWidth = rect.width;
  var hasSharerHeight = rect.height;

  /**
   * Determine if an element is visible or not.
   *
   * @param {Element} element The element to check if visible or not.
   * @return {boolean} true if visible, false if not.
   */
  var isVisible = function isVisible(element) {
    var style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  };

  /**
   * Remove any visible HAS containers.
   */
  var hasRemoveVisibleElements = function hasRemoveVisibleElements() {
    var hasContainers = document.querySelectorAll('.highlight-and-share-wrapper');
    if (null !== hasContainers) {
      // Remove visible containers from dom.
      hasContainers.forEach(function (container) {
        // If the container is a clone, remove it. (doesn't have the parent "#has-highlight-and-share").
        if (null === container.closest('#has-highlight-and-share')) {
          container.remove();
        }
      });
    }
  };

  /**
   * Replace attributes of element and child elements.
   *
   * @param {Element} element  The element to replace attributes on with child social networks.
   * @param {string}  url      The URL of the post/page.
   * @param {string}  title    The title of the post/page.
   * @param {string}  text     Text that is selected or to be shared
   * @param {string}  hashtags Hashtags present on the post/page.
   * @param {string}  type     The type of trigger element (inline, selection, cta).
   *
   * @return {Element} The element with replaced attributes.
   *
   */
  var hasVariableReplace = function hasVariableReplace(element, url, title, text, hashtags, type) {
    var queryElements = element.querySelectorAll(socialNetworks);
    if (null === queryElements) {
      return element;
    }

    // Get types mapped for the modal view.
    var triggerType = '';
    if ('inline' === type) {
      triggerType = 'highlight';
    } else if ('selection' === type) {
      triggerType = 'selection';
    } else if ('cta' === type) {
      triggerType = 'quote';
    }

    // Loop through elements.
    queryElements.forEach(function (el) {
      // Replace attributes in URL.
      var elementAnchor = el.querySelector('a');
      var elementUrl = elementAnchor.getAttribute('href');
      elementUrl = elementUrl.replace('%url%', encodeURIComponent(url));
      elementUrl = elementUrl.replace('%username%', encodeURIComponent(HAS.twitter_username));
      elementUrl = elementUrl.replace('%title%', encodeURIComponent(title));
      elementUrl = elementUrl.replace('%text%', encodeURIComponent(text));
      elementUrl = elementUrl.replace('%hashtags%', encodeURIComponent(hashtags));
      elementUrl = elementUrl.replace('%type%', encodeURIComponent(triggerType));
      elementUrl = elementUrl.replace('%threadstext%', '%prefix%' + encodeURIComponent(text) + '%suffix%' + encodeURIComponent('\n\n' + url));
      elementUrl = elementUrl.replace('%blueskytext%', '%prefix%' + encodeURIComponent(text) + '%suffix%' + encodeURIComponent('\n\n' + url));
      elementUrl = elementUrl.replace('%prefix%', encodeURIComponent(prefix));
      elementUrl = elementUrl.replace('%suffix%', encodeURIComponent(suffix));
      elementAnchor.setAttribute('href', elementUrl);

      // Replace the title data attribute.
      var title_attr = el.getAttribute('data-title');
      if (null !== title_attr) {
        title_attr = title_attr.replace('%title%', encodeURIComponent(title));
        el.setAttribute('data-title', title_attr);
      }

      // Replace the url data attribute.
      var url_attr = el.getAttribute('data-url');
      if (null !== url_attr) {
        url_attr = url_attr.replace('%url%', encodeURIComponent(url));
        el.setAttribute('data-url', url_attr);
      }
    });
  };

  /**
   * Display the Highlight and Share Interface.
   *
   * @param {string}  text           Text that is selected or to be shared.
   * @param {string}  title          The title of the post/page.
   * @param {string}  href           The URL of the post/page.
   * @param {string}  hashtags       Hashtags present on the post/page.
   * @param {string}  type           The type of display (selection|inline|cta).
   * @param {element} triggerElement The event initiator (null if no trigger element).
   */
  var hasDisplay = function hasDisplay(text, title, href, hashtags, type) {
    var triggerElement = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    // Do not show the interface if nothing is enabled.
    if (false === highlight_and_share.show_twitter && false === highlight_and_share.show_facebook && false === highlight_and_share.show_linkedin && false === highlight_and_share.show_ok && false === highlight_and_share.show_vk && false === highlight_and_share.show_pinterest && false === highlight_and_share.show_email && false === highlight_and_share.show_webshare && false === highlight_and_share.show_mastodon) {
      return;
    }

    // Remove any existing visible interfaces/containers.
    hasRemoveVisibleElements();

    // Get interface clone.
    var hasClone = hasContainer.querySelector('.highlight-and-share-wrapper').cloneNode(true);
    // Style the interface via inline styles and position.
    hasClone.style.display = 'block';
    hasClone.style.position = 'absolute';
    hasClone.style.width = 'auto';
    hasClone.style.height = 'auto';
    hasClone.style['z-index'] = 10000;

    // Change to inline flex if vertical.
    if (hasClone.classList.contains('orientation-vertical')) {
      hasClone.style.display = 'inline-flex';
    }
    hasVariableReplace(hasClone, href, title, text, hashtags, type); // Replaced by reference.

    // Check for webshare. Enable if available.
    if ('undefined' !== typeof navigator.share) {
      var webshare = hasClone.querySelector('.has_webshare');
      if (null !== webshare) {
        webshare.style.display = 'inline-block';
      }
    }

    // Add to the end of the body element.
    document.body.appendChild(hasClone);
    switch (type) {
      case 'selection':
      case 'comments':
        // Position the interface.
        setHasContainerPositionSelection(hasClone, triggerElement);
        break;
      case 'inline':
        // Position the interface.
        setHasContainerPositionInline(hasClone, triggerElement);
        break;
      case 'cta':
        // Position the interface.
        setHasContainerPositionCta(hasClone, triggerElement);
        break;
    }

    // Setup event handlers for links (for desktop).
    var queryElements = document.querySelector('body').querySelectorAll('.has_whatsapp, .has_facebook, .has_twitter, .has_telegram, .has_linkedin, .has_xing, .has_reddit, .has_tumblr');
    if (null !== queryElements) {
      // Add click listeners to visible elements.
      queryElements.forEach(function (el) {
        if (isVisible(el)) {
          el.querySelector('a').addEventListener('click', function (event) {
            event.preventDefault();

            // Get the URL.
            var url = el.querySelector('a').getAttribute('href');

            // Set dataLayer event for GTM.
            if ('undefined' !== typeof dataLayer) {
              // eslint-disable-next-line no-undef
              dataLayer.push({
                event: 'highlight-and-share',
                hasShareText: text,
                hasSharePostUrl: href,
                hasSharePostTitle: title,
                hasShareType: type /* selection|cta|inline */,
                hasSocialNetwork: el.getAttribute('data-type')
              });
            }
            window.open(url, 'Highlight and Share', 'width=575,height=430,toolbar=false,menubar=false,location=false,status=false');
          });
        }
      });
    }

    // Set up copy event.
    var copyButtons = document.querySelectorAll('.has_copy');
    if (null !== copyButtons) {
      copyButtons.forEach(function (el) {
        if (isVisible(el)) {
          // Remove copy element if ClipboardItem is undefined.
          if ('undefined' === typeof ClipboardItem) {
            el.remove();
          } else {
            el.addEventListener('click', function (event) {
              event.preventDefault();
              // Make sure ClipboardItem is supported.
              try {
                var copyBlob = new Blob([text], {
                  type: 'text/plain'
                });
                var data = [new ClipboardItem(_defineProperty({}, copyBlob.type, copyBlob))];
                navigator.clipboard.write(data);
              } catch (e) {
                // Copying is not supported on Mozilla (firefox).
              }

              // Change tooltip data attribute.
              el.setAttribute('data-tooltip', 'Copied!');

              // Set dataLayer event for GTM.
              if ('undefined' !== typeof dataLayer) {
                // eslint-disable-next-line no-undef
                dataLayer.push({
                  event: 'highlight-and-share',
                  hasShareText: text,
                  hasSharePostUrl: href,
                  hasSharePostTitle: title,
                  hasShareType: type /* selection|cta|inline */,
                  hasSocialNetwork: 'copy'
                });
              }
            });
          }
        }
      });
    }

    // Set up email event.
    var emailButtons = document.querySelectorAll('.has_email_form');
    if (null !== emailButtons) {
      emailButtons.forEach(function (el) {
        if (isVisible(el)) {
          el.addEventListener('click', function (event) {
            event.preventDefault();
            var url = event.target.closest('a').getAttribute('href');
            if ('undefined' !== typeof Fancybox) {
              // eslint-disable-next-line no-undef
              hasRemoveVisibleElements();
              // eslint-disable-next-line no-undef
              window.highlightShareFancy = new Fancybox([{
                src: url,
                type: 'iframe',
                preload: true,
                compact: true,
                autoFocus: true
              }], {
                Toolbar: {
                  autoEnable: false
                }
              });
            }
          });
        }
      });
    }

    /**
     * Set up Mastodon Prompt.
     */
    var mastodonButtons = document.querySelectorAll('.has_mastodon');
    if (null !== mastodonButtons) {
      mastodonButtons.forEach(function (el) {
        if (isVisible(el)) {
          el.addEventListener('click', function (event) {
            event.preventDefault();
            var url = event.target.closest('a').getAttribute('href');

            //
            if ('undefined' !== typeof Fancybox) {
              // eslint-disable-next-line no-undef
              hasRemoveVisibleElements();
              // eslint-disable-next-line no-undef
              window.highlightShareFancy = new Fancybox([{
                type: 'inline',
                compact: true,
                src: '#has-mastodon-prompt'
              }], {
                Toolbar: {
                  autoEnable: false
                },
                on: {
                  done: function done() {
                    var fancyboxForm = document.querySelector('.has-mastodon-form');
                    var fancyboxInput = fancyboxForm.querySelector('input');
                    if (null !== fancyboxInput) {
                      fancyboxInput.focus();
                    }
                    fancyboxForm.addEventListener('submit', function (event) {
                      event.preventDefault();
                      var fancyboxInputValue = fancyboxInput.value;

                      // Save the value to local storage.
                      localStorage.setItem('highlight-and-share-mastodon', fancyboxInputValue);
                      var fancyUrl = url;
                      if ('' !== fancyboxInputValue) {
                        fancyUrl = fancyUrl.replace(/mastodon\.social/i, fancyboxInputValue);
                      }
                      console.log(fancyUrl);

                      // Now go to URL.
                      window.open(fancyUrl, 'Highlight and Share', 'width=575,height=430,toolbar=false,menubar=false,location=false,status=false');
                    });

                    // Get local storage and populate input if available.
                    var localStorageValue = localStorage.getItem('highlight-and-share-mastodon');
                    if (null !== localStorageValue) {
                      fancyboxInput.value = localStorageValue;
                    }
                  }
                }
              });
            }
          });
        }
      });
    }

    // Set up webshare event.
    var webshareButtons = document.querySelectorAll('.has_webshare');
    if (null !== webshareButtons) {
      webshareButtons.forEach(function (el) {
        if (isVisible(el)) {
          el.addEventListener('click', function (event) {
            event.preventDefault();
            var url = event.target.closest('a').getAttribute('href');
            navigator.share({
              title: title,
              text: text,
              url: url
            });
          });
        }
      });
    }
  };

  /**
   * Set the Social Sharer container position for the current selection. This needs to run after cloned element has been appended to the dom.
   *
   * @param {element} element        The cloned social sharer element.
   * @param {element} triggerElement The event initiator (null if no trigger element).
   */
  var setHasContainerPositionSelection = function setHasContainerPositionSelection(element, triggerElement) {
    // Get the dimensions of the window.
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Get the dimensions and location of the selection.
    var selectionRect = getConstrainedRange(triggerElement).getBoundingClientRect();
    var selectionTop = selectionRect.top; // top position relative to view port.
    var selectionLeft = selectionRect.left; // left position relative to view port.
    var selectionWidth = selectionRect.width;
    var selectionHeight = selectionRect.height;

    // Set container width to smaller than window width if larger.
    if (element.offsetWidth > windowWidth) {
      element.style.maxWidth = windowWidth - 20 + 'px';
      element.classList.add('has-no-margin-bottom');
    }

    // Get the dimensions of the click to share container.
    var hasCloneRect = element.getBoundingClientRect();
    var hasCloneWidth = hasCloneRect.width;
    var hasCloneHeight = hasCloneRect.height;
    if (element.classList.contains('orientation-vertical')) {
      /**
       * Get Vertical position.
       */

      // Get the X position of where the HAS Sharer inteface should be displayed.
      var hasSharerX = selectionLeft + window.scrollX - (hasCloneWidth + 15);
      // Get the Y position of where the HAS Sharer inteface should be displayed.
      var hasSharerY = selectionTop + window.scrollY - hasCloneHeight / 2 + selectionHeight / 2;
      element.classList.add('has-no-margin-bottom');
      // If clone is outside of viewport, set width.
      if (selectionTop + window.scrollY - hasCloneHeight / 2 < 0) {
        element.style.display = 'grid';
        element.style.gridTemplateColumns = '1fr 1fr';

        // Get new clone width dimensions.
        var newCloneRect = element.getBoundingClientRect();

        // calculate left/top position.
        element.style.top = selectionTop + window.scrollY - newCloneRect.height / 2 + selectionHeight / 2 + 'px';
        element.style.left = selectionLeft + window.scrollX - newCloneRect.width - 15 + 'px';

        // Calculate top position.
      } else if (selectionTop + hasCloneHeight > windowHeight) {
        element.style.display = 'grid';
        element.style.gridTemplateColumns = '1fr 1fr';

        // Get new clone width dimensions.
        var _newCloneRect = element.getBoundingClientRect();

        // calculate left/top position.
        element.style.top = selectionTop + window.scrollY - _newCloneRect.height / 2 + selectionHeight / 2 + 'px';
        element.style.left = selectionLeft + window.scrollX - _newCloneRect.width - 15 + 'px';
      } else {
        element.style.left = hasSharerX + 'px';
        element.style.top = hasSharerY + 'px';
        element.classList.remove('has-no-margin-bottom');
      }
    } else {
      /**
       * Get horizontal position.
       */

      // Get the X position of where the HAS Sharer inteface should be displayed.
      var _hasSharerX = selectionLeft + window.scrollX + selectionWidth / 2 - hasCloneWidth / 2;
      // Get the Y position of where the HAS Sharer inteface should be displayed.
      var _hasSharerY = selectionTop + window.scrollY - hasCloneHeight - 15;

      // Determine if hasSharerX is outside of view.
      element.classList.add('has-no-margin-bottom');
      if (_hasSharerX < 0) {
        // If so, set to 0.
        element.style.left = '15px';
      } else if (_hasSharerX + hasSharerWidth > windowWidth) {
        // If so, set to windowWidth - hasSharerWidth.
        element.style.right = '15px';
      } else {
        // Otherwise, set to hasSharerX.
        element.style.left = _hasSharerX + 'px';
        element.classList.remove('has-no-margin-bottom');
      }

      // Set the left,top CSS in the clone.
      element.style.top = _hasSharerY + 'px';
    }
  };

  /**
   * Set the Social Sharer container position for the inline highlighter. This needs to run after cloned element has been appended to the dom.
   *
   * @param {element} element        The cloned social sharer element.
   * @param {element} triggerElement The event initiator (null if no trigger element).
   */
  var setHasContainerPositionInline = function setHasContainerPositionInline(element, triggerElement) {
    // Get the dimensions of the window.
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Get the dimensions and location of the selection.
    var inlineRect = triggerElement.getBoundingClientRect();
    var inlineTop = inlineRect.top; // top position relative to view port.
    var inlineLeft = inlineRect.left; // left position relative to view port.
    var inlineWidth = inlineRect.width;
    var inlineHeight = inlineRect.height;

    // Get the dimensions of the click to share container.
    var hasCloneRect = element.getBoundingClientRect();
    var hasCloneWidth = hasCloneRect.width;
    var hasCloneHeight = hasCloneRect.height;
    if (element.classList.contains('orientation-vertical')) {
      /**
       * Get Vertical position.
       */

      // Get the X position of where the HAS Sharer inteface should be displayed.
      var hasSharerX = inlineLeft + window.scrollX - (hasCloneWidth + 15);
      // Get the Y position of where the HAS Sharer inteface should be displayed.
      var hasSharerY = inlineTop + window.scrollY - hasCloneHeight / 2 + inlineHeight / 2;
      element.classList.add('has-no-margin-bottom');
      // If clone is outside of viewport, set width.
      if (inlineTop + window.scrollY - hasCloneHeight / 2 < 0) {
        element.style.display = 'grid';
        element.style.gridTemplateColumns = '1fr 1fr';

        // Get new clone width dimensions.
        var newCloneRect = element.getBoundingClientRect();

        // calculate left/top position.
        element.style.top = inlineTop + window.scrollY - newCloneRect.height / 2 + inlineHeight / 2 + 'px';
        var leftPosition = inlineLeft + window.scrollX - newCloneRect.width - 15;
        if (leftPosition < 0) {
          element.style.left = '15px';
        } else {
          element.style.left = leftPosition + 'px';
        }

        // Calculate top position.
      } else if (inlineTop + hasCloneHeight > windowHeight) {
        element.style.display = 'grid';
        element.style.gridTemplateColumns = '1fr 1fr';

        // Get new clone width dimensions.
        var _newCloneRect2 = element.getBoundingClientRect();

        // calculate left/top position.
        element.style.top = inlineTop + window.scrollY - _newCloneRect2.height / 2 + inlineHeight / 2 + 'px';
        var _leftPosition = inlineLeft + window.scrollX - _newCloneRect2.width - 15;
        if (_leftPosition < 0) {
          element.style.left = '15px';
        } else {
          element.style.left = _leftPosition + 'px';
        }
      } else {
        element.style.left = hasSharerX + 'px';
        element.style.top = hasSharerY + 'px';
        element.classList.remove('has-no-margin-bottom');
      }
    } else {
      // Get the X position of where the HAS Sharer inteface should be displayed.
      var _hasSharerX2 = inlineLeft + window.scrollX + inlineWidth / 2 - hasCloneWidth / 2;
      // Get the Y position of where the HAS Sharer inteface should be displayed.
      var _hasSharerY2 = inlineTop + window.scrollY - hasCloneHeight - 15;

      // Determine if hasSharerX is outside of view.
      element.classList.add('has-no-margin-bottom');
      if (_hasSharerX2 < 0) {
        // If so, set to 0.
        element.style.left = '15px';
      } else if (_hasSharerX2 + hasSharerWidth > windowWidth) {
        // If so, set to windowWidth - hasSharerWidth.
        element.style.right = '15px';
      } else {
        // Otherwise, set to hasSharerX.
        element.style.left = _hasSharerX2 + 'px';
        element.classList.remove('has-no-margin-bottom');
      }

      // Set the left,top CSS in the clone.
      element.style.top = _hasSharerY2 + 'px';
    }
  };

  /**
   * Get the constrained range.
   *
   * @param {Element} element The element to constrain the range to.
   * @return {Range} The constrained range.
   * @see https://github.com/MaxArt2501/share-this/tree/master
   */
  var getConstrainedRange = function getConstrainedRange(element) {
    var _window = document.defaultView;
    var selection = _window.getSelection();
    var range = selection.rangeCount && selection.getRangeAt(0);
    if (!range) {
      return;
    }
    var constrainedRange = (0,_selection__WEBPACK_IMPORTED_MODULE_0__.constrainRange)(range, element);
    if (constrainedRange.collapsed || !constrainedRange.getClientRects().length) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return constrainedRange;
  };

  /**
   * Set the Social Sharer container position for the inline highlighter. This needs to run after cloned element has been appended to the dom.
   *
   * @param {element} element        The cloned social sharer element.
   * @param {element} triggerElement The event initiator (null if no trigger element).
   */
  var setHasContainerPositionCta = function setHasContainerPositionCta(element, triggerElement) {
    // Get the dimensions of the window.
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Get the dimensions and location of the selection.
    var ctaRect = triggerElement.getBoundingClientRect();
    var ctaTop = ctaRect.top; // top position relative to view port.
    var ctaLeft = ctaRect.left; // left position relative to view port.
    var ctaWidth = ctaRect.width;
    var ctaHeight = ctaRect.height;

    // Set container width to smaller than window width if larger.
    if (element.getBoundingClientRect().width > windowWidth) {
      element.style.maxWidth = windowWidth - 20 + 'px';
      element.classList.add('has-no-margin-bottom');
    }

    // Get the dimensions of the click to share container.
    var hasCloneRect = element.getBoundingClientRect();
    var hasCloneWidth = hasCloneRect.width;
    var hasCloneHeight = hasCloneRect.height;
    if (element.classList.contains('orientation-vertical')) {
      /**
       * Get Vertical position.
       */

      // Get the X position of where the HAS Sharer inteface should be displayed.
      var hasSharerX = ctaLeft + window.scrollX - (hasCloneWidth + 15);
      // Get the Y position of where the HAS Sharer inteface should be displayed.
      var hasSharerY = ctaTop + window.scrollY - hasCloneHeight / 2 + ctaHeight / 2;
      element.classList.add('has-no-margin-bottom');
      // If clone is outside of viewport, set width.
      if (ctaTop + window.scrollY - hasCloneHeight / 2 < 0) {
        element.style.display = 'grid';
        element.style.gridTemplateColumns = '1fr 1fr';

        // Get new clone width dimensions.
        var newCloneRect = element.getBoundingClientRect();

        // calculate left/top position.
        element.style.top = ctaTop + window.scrollY - newCloneRect.height / 2 + ctaHeight / 2 + 'px';
        var leftPosition = ctaLeft + window.scrollX - newCloneRect.width - 15;
        if (leftPosition < 0) {
          element.style.left = '15px';
        } else {
          element.style.left = leftPosition + 'px';
        }

        // Calculate top position.
      } else if (ctaTop + hasCloneHeight > windowHeight) {
        element.style.display = 'grid';
        element.style.gridTemplateColumns = '1fr 1fr';

        // Get new clone width dimensions.
        var _newCloneRect3 = element.getBoundingClientRect();

        // calculate left/top position.
        element.style.top = ctaTop + window.scrollY - _newCloneRect3.height / 2 + ctaHeight / 2 + 'px';
        var _leftPosition2 = ctaLeft + window.scrollX - _newCloneRect3.width - 15;
        if (_leftPosition2 < 0) {
          element.style.left = '15px';
        } else {
          element.style.left = _leftPosition2 + 'px';
        }
      } else {
        var _newCloneRect4 = element.getBoundingClientRect();
        element.style.left = ctaLeft + window.scrollX - _newCloneRect4.width - 15 + 'px';
        element.style.top = hasSharerY + 'px';
        element.classList.remove('has-no-margin-bottom');
      }
    } else {
      // Get the X position of where the HAS Sharer inteface should be displayed.
      var _hasSharerX3 = ctaLeft + window.scrollX + ctaWidth / 2 - hasCloneWidth / 2;
      // Get the Y position of where the HAS Sharer inteface should be displayed.
      var _hasSharerY3 = ctaTop + window.scrollY - hasCloneHeight - 15;

      // Determine if hasSharerX is outside of view.
      element.classList.add('has-no-margin-bottom');
      if (_hasSharerX3 < 0) {
        // If so, set to 0.
        element.style.left = '15px';
      } else if (_hasSharerX3 + hasSharerWidth > windowWidth) {
        // If so, set to windowWidth - hasSharerWidth.
        element.style.right = '15px';
      } else {
        // Otherwise, set to hasSharerX.
        element.style.left = _hasSharerX3 + 'px';
        element.classList.remove('has-no-margin-bottom');
      }

      // Set the left,top CSS in the clone.
      element.style.top = _hasSharerY3 + 'px';
    }
  };

  /**
   * Get the page parameters.
   *
   * @param {Element} newElement Element to retrieve data functions for.
   *
   * @return {Object} Object containing the page parameters.
   */
  var getPageParams = function getPageParams(newElement) {
    var href = null !== newElement ? newElement.dataset.url : window.location.href;
    var title = null !== newElement ? newElement.dataset.title : document.title;
    var hashtags = null !== newElement ? newElement.dataset.hashtags : '';
    var params = {};
    params.href = href;
    params.title = title;
    params.hashtags = hashtags;
    return params;
  };

  // Begin setting up events.

  // Get JS Content and return if not set.
  var jsContent = HAS.content;
  if ('' === jsContent) {
    return;
  }

  // Get all elements matching jsContent. Set up events.
  var elements = document.querySelectorAll(jsContent);
  if (null !== elements) {
    /**
     * Handle touch/click events for select (mouseup) events.
     *
     * @param {event}   event         The original event.
     * @param {element} parentElement The element to retrieve data functions for.
     */
    var hasHandleSelectEvents = function hasHandleSelectEvents(event, parentElement) {
      // Remove any visible elements.
      hasRemoveVisibleElements();

      // Get selection.
      var selection = document.defaultView.getSelection();

      // Get the selected text.
      var selectedText = selection.toString().trim();
      if ('' === selectedText) {
        return;
      }
      var element = parentElement.querySelector('.has-social-placeholder');

      // Get the highlight and share params.
      var _getPageParams = getPageParams(element),
        href = _getPageParams.href,
        title = _getPageParams.title,
        hashtags = _getPageParams.hashtags;

      // Display Highlight and Share.
      hasDisplay(selectedText, title, href, hashtags, 'selection');
    };
    // Loop through elements and set up mouseup event.
    elements.forEach(function (element) {
      // element.addEventListener( 'touchcancel', ( event ) => {  // This partially works on Android, but only for the first word. Selections do not work. Android is currently not supported. iOS still works.
      // 	hasHandleSelectEvents( event );
      // } );

      // Check if element has class `has-content-area` and if so, it's flush with the content. Select its parent, and add the event to that.
      if (element.classList.contains('has-content-area') && !isLegacyContentMode) {
        var eventTypes = ['selectionchange', 'mouseup', 'touchend', 'touchcancel'];
        eventTypes.forEach(function (eventType) {
          element.parentElement.addEventListener(eventType, function (event) {
            hasHandleSelectEvents(event, element.parentElement);
          });
        });
        return;
      }

      // Add the rest of the elements.
      element.addEventListener('mouseup', function (event) {
        hasHandleSelectEvents(event, element);
      });
    });
  }

  // Get inline elements.
  var inlineElements = document.querySelectorAll('.has-inline-text');
  if (null !== inlineElements) {
    /**
     * Handle touch/click events for inline highlighting.
     *
     * @param {event}   event   The original event.
     * @param {element} element The element the event happened on.
     */
    var hasHandleInlineEvents = function hasHandleInlineEvents(event, element) {
      // Remove any visible elements.
      hasRemoveVisibleElements();

      // Exit early if the element is already visible (works like a toggle).
      if (element === currentElement) {
        currentElement = null;
        return;
      }
      currentElement = element;

      // Get selected text.
      var selectedText = element.innerText.trim();
      if ('' === selectedText) {
        return;
      }
      var elementParent = event.target.closest('.has-social-placeholder');
      var _getPageParams2 = getPageParams(elementParent),
        href = _getPageParams2.href,
        title = _getPageParams2.title,
        hashtags = _getPageParams2.hashtags;

      /**
       * See if we can launch the web share API by default on inline highlight click.
       */
      var webshareDefaultInlineHighlight = HAS.enable_webshare_inline_highlight;
      if (webshareDefaultInlineHighlight) {
        // Check if navigator.share is available.
        if (typeof navigator.share === 'function') {
          navigator.share({
            title: title,
            url: href,
            text: selectedText
          });
          return;
        }
      }

      // Display Highlight and Share.
      hasDisplay(selectedText, title, href, hashtags, 'inline', element);
    };
    inlineElements.forEach(function (element) {
      // Add tooltips to inline highlight as a data attribute.
      if (highlight_and_share.inline_highlight_tooltips_enabled && '' !== highlight_and_share.inline_highlight_tooltips_text) {
        element.setAttribute('data-tooltip', highlight_and_share.inline_highlight_tooltips_text);
      }
      // For mouse and trackpad.
      element.addEventListener('click', function (event) {
        hasHandleInlineEvents(event, element);
        var tooltip = document.querySelectorAll('.has-inline-text-tooltip');
        if (null !== tooltip) {
          tooltip.forEach(function (tooltipElement) {
            tooltipElement.remove();
          });
        }
      });

      // For hover effect on desktop devices.
      element.addEventListener('mouseover', function (event) {
        // Check if element has data-tooltip attribute.
        if (element.hasAttribute('data-tooltip')) {
          // Get position and dimensions of highlighted element.
          var elementRect = event.target.getBoundingClientRect();

          // Set tooltip position.
          var elementTop = elementRect.top;
          var tooltipWidth = 120; // Adjust to desired width of tooltip
          var tooltipHeight = 30; // Adjust to desired height of tooltip
          var scrollX = window.scrollX;
          var scrollY = window.scrollY;

          // Calculate tooltip position based on element position, window size, and scroll position.
          var tooltipLeft = event.clientX - tooltipWidth / 2 + scrollX;
          var tooltipTop = elementTop - tooltipHeight + scrollY - 10;

          // Create div element to hold tooltip.
          var tooltip = document.createElement('div');
          tooltip.classList.add('has-inline-text-tooltip');
          tooltip.style.position = 'absolute';
          tooltip.style.left = tooltipLeft + 'px';
          tooltip.style.top = tooltipTop + 'px';
          tooltip.innerText = element.getAttribute('data-tooltip');

          // Add tooltip to DOM.
          document.body.appendChild(tooltip);

          // Position tooltip if off screen.
          var tooltipRect = tooltip.getBoundingClientRect();
          if (tooltipRect.right > window.innerWidth) {
            tooltip.style.left = tooltipLeft - (tooltipRect.right - window.innerWidth) + 'px';
          } else if (tooltipRect.left < 0) {
            tooltip.style.left = tooltipLeft - tooltipRect.left + 'px';
          }
          if (tooltipRect.bottom > window.innerHeight) {
            tooltip.style.top = tooltipTop - (tooltipRect.bottom - window.innerHeight) + 'px';
          } else if (tooltipRect.top < 0) {
            tooltip.style.top = tooltipTop - tooltipRect.top + 'px';
          }
        }
      });
      element.addEventListener('mouseout', function () {
        // Hide the tooltip.
        var tooltip = document.querySelectorAll('.has-inline-text-tooltip');
        if (null !== tooltip) {
          tooltip.forEach(function (element) {
            element.classList.add('has-fade-out');
            setTimeout(function () {
              element.remove();
            }, 900);
          });
        }
      });
    });
  }

  // Get click to share block elements.
  var ctsElements = document.querySelectorAll('.has-click-prompt');
  if (null !== ctsElements) {
    ctsElements.forEach(function (element) {
      element.addEventListener('click', function (event) {
        event.preventDefault();

        // Remove any visible elements.
        hasRemoveVisibleElements();

        // Exit early if the element is already visible (works like a toggle).
        if (element === currentElement) {
          currentElement = null;
          return;
        }
        currentElement = element;

        // Get parent element of prompt.
        var ctsTextElement = element.parentNode.querySelector('.has-click-to-share-text');

        // Get text.
        var selectedText = ctsTextElement.getAttribute('data-text-full');
        var parentElement = element.closest('.has-social-placeholder');
        var _getPageParams3 = getPageParams(parentElement),
          href = _getPageParams3.href,
          title = _getPageParams3.title,
          hashtags = _getPageParams3.hashtags;

        /**
         * See if we can launch the web share API by default on inline highlight click.
         */
        var webshareDefaultClickToShare = HAS.enable_webshare_click_to_share;
        if (webshareDefaultClickToShare) {
          // Check if navigator.share is available.
          if (typeof navigator.share === 'function') {
            navigator.share({
              title: title,
              url: href,
              text: selectedText
            });
            return;
          }
        }

        // Display Highlight and Share.
        hasDisplay(selectedText, title, href, hashtags, 'cta', element.closest('.has-click-to-share'));
      });
    });
  }

  /**
   * Set up comment elements.
   */
  var initCommentElements = function initCommentElements() {
    // Get click to share comment elements.
    var commentElements = document.querySelectorAll('.has-comment-placeholder');
    if (null !== commentElements) {
      /**
       * Handle touch/click events for select (mouseup) events.
       *
       * @param {event}   event         The original event.
       * @param {element} parentElement The element to retrieve data functions for.
       */
      var hasHandleCommentSelectEvents = function hasHandleCommentSelectEvents(event, parentElement) {
        // Remove any visible elements.
        hasRemoveVisibleElements();

        // Get selection.
        var selection = document.defaultView.getSelection();

        // Get the selected text.
        var selectedText = selection.toString().trim();
        if ('' === selectedText) {
          return;
        }
        var element = parentElement.querySelector('.has-comment-placeholder');
        var href = element.getAttribute('data-comment-url');
        var title = element.getAttribute('data-title');

        // Display Highlight and Share.
        hasDisplay(selectedText, title, href, '', 'comments');
      };
      // Loop through elements and set up mouseup event.
      commentElements.forEach(function (element) {
        // Check if element has class `has-content-area` and if so, it's flush with the content. Select its parent, and add the event to that.
        var eventTypes = ['selectionchange', 'mouseup', 'touchend', 'touchcancel'];
        eventTypes.forEach(function (eventType) {
          element.parentElement.addEventListener(eventType, function (event) {
            hasHandleCommentSelectEvents(event, element.parentElement);
          });
        });
      });
    }
  };

  // Initialize comment elements.
  document.addEventListener('wpacAfterUpdateComments', initCommentElements);
  initCommentElements();

  // Listen for the escape key to remove visible elements.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hasRemoveVisibleElements();
    }
  });

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

  /**
   * Listen for Image Sharing Events and enable webshare if available.
   */
  var imageShare = document.querySelectorAll('.has-pin-svg-pinterest');
  if (null !== imageShare) {
    imageShare.forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();

        // Get the parent.
        var parent = event.target.closest('.has-pin-image-wrapper');
        if (null === parent) {
          return;
        }

        // Find the image element, grab the URL.
        var image = parent.querySelector('img');
        var imageUrl = image.getAttribute('src');
        var dataPinUrl = image.getAttribute('data-pin-url');
        var description = image.getAttribute('alt');
        var dataPinDescription = image.getAttribute('data-pin-description');
        var pageUrl = window.location.href;
        // Try to get page URL from has placeholder.
        var parentElement = document.querySelector('.has-social-placeholder');
        if (null !== parentElement) {
          var _getPageParams4 = getPageParams(parentElement),
            href = _getPageParams4.href;
          pageUrl = href;
        }

        // Try to get parent anchor and determine if it's an image URL. If so, use that.
        var maybeParentAnchor = image.closest('a');
        if (null !== maybeParentAnchor) {
          var maybeParentAnchorUrl = maybeParentAnchor.getAttribute('href');
          if (maybeParentAnchorUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
            var _maybeParentAnchor$ge;
            imageUrl = maybeParentAnchorUrl;
            description = (_maybeParentAnchor$ge = maybeParentAnchor.getAttribute('title')) !== null && _maybeParentAnchor$ge !== void 0 ? _maybeParentAnchor$ge : description;
          }
        }

        // Set dataLayer event for GTM.
        if ('undefined' !== typeof dataLayer) {
          // eslint-disable-next-line no-undef
          dataLayer.push({
            event: 'highlight-and-share',
            hasSharePostUrl: imageUrl,
            hasSharePostTitle: description,
            hasShareType: 'image',
            hasSocialNetwork: 'pinterest'
          });
        }

        // Open pinterest.
        window.open('https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(pageUrl) + '&media=' + encodeURIComponent(dataPinUrl !== null && dataPinUrl !== void 0 ? dataPinUrl : imageUrl) + '&description=' + encodeURIComponent(dataPinDescription !== null && dataPinDescription !== void 0 ? dataPinDescription : description), 'Highlight and Share', 'width=575,height=430,toolbar=false,menubar=false,location=false,status=false');
      });
    });
  }

  /**
   * Webshare Button.
   */
  var webshareButton = document.querySelectorAll('.has-pin-svg-webshare');
  if (null !== webshareButton) {
    webshareButton.forEach(function (el) {
      el.addEventListener('click', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
          var parent, image, imageUrl, dataPinUrl, description, dataPinDescription, pageUrl, parentElement, _getPageParams5, href, maybeParentAnchor, maybeParentAnchorUrl, _maybeParentAnchor$ge2, imageExtension, imageFile;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();

                // Get the parent.
                parent = event.target.closest('.has-pin-image-wrapper');
                if (!(null === parent)) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                // Find the image element, grab the URL.
                image = parent.querySelector('img');
                imageUrl = image.getAttribute('src');
                dataPinUrl = image.getAttribute('data-pin-url');
                description = image.getAttribute('alt');
                dataPinDescription = image.getAttribute('data-pin-description');
                pageUrl = window.location.href; // Try to get page URL from has placeholder.
                parentElement = document.querySelector('.has-social-placeholder');
                if (null !== parentElement) {
                  _getPageParams5 = getPageParams(parentElement), href = _getPageParams5.href;
                  pageUrl = href;
                }

                // Try to get parent anchor and determine if it's an image URL. If so, use that.
                maybeParentAnchor = image.closest('a');
                if (null !== maybeParentAnchor) {
                  maybeParentAnchorUrl = maybeParentAnchor.getAttribute('href');
                  if (maybeParentAnchorUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
                    imageUrl = maybeParentAnchorUrl;
                    description = (_maybeParentAnchor$ge2 = maybeParentAnchor.getAttribute('title')) !== null && _maybeParentAnchor$ge2 !== void 0 ? _maybeParentAnchor$ge2 : description;
                  }
                }

                // Set dataLayer event for GTM.
                if ('undefined' !== typeof dataLayer) {
                  // eslint-disable-next-line no-undef
                  dataLayer.push({
                    event: 'highlight-and-share',
                    hasSharePostUrl: dataPinUrl !== null && dataPinUrl !== void 0 ? dataPinUrl : pageUrl,
                    hasSharePostTitle: dataPinDescription !== null && dataPinDescription !== void 0 ? dataPinDescription : description,
                    hasShareType: 'image',
                    hasSocialNetwork: 'webshare'
                  });
                }

                // Get image extension.
                imageExtension = imageUrl.split('.').pop().toLowerCase().split('?')[0]; // Get file from image element.
                _context.next = 18;
                return fetch(imageUrl).then(function (response) {
                  return response.blob();
                }).then(function (blob) {
                  return new File([blob], "image.".concat(imageExtension), {
                    type: 'image/' + imageExtension
                  });
                });
              case 18:
                imageFile = _context.sent;
                if (highlight_and_share.enable_webshare_image_only) {
                  // Share the image.
                  navigator.share({
                    title: dataPinDescription !== null && dataPinDescription !== void 0 ? dataPinDescription : description,
                    text: dataPinDescription !== null && dataPinDescription !== void 0 ? dataPinDescription : description,
                    files: [imageFile]
                  });
                } else {
                  navigator.share({
                    title: dataPinDescription !== null && dataPinDescription !== void 0 ? dataPinDescription : description,
                    text: dataPinDescription !== null && dataPinDescription !== void 0 ? dataPinDescription : description,
                    files: [imageFile],
                    url: dataPinUrl !== null && dataPinUrl !== void 0 ? dataPinUrl : pageUrl
                  });
                }
              case 20:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });
  }
})();
})();

/******/ })()
;
//# sourceMappingURL=highlight-and-share.js.map