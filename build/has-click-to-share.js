/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else // removed by dead control flow
{}
}());


/***/ }),

/***/ "./node_modules/dompurify/dist/purify.es.mjs":
/*!***************************************************!*\
  !*** ./node_modules/dompurify/dist/purify.es.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ purify)
/* harmony export */ });
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */

const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object; // eslint-disable-line import/no-mutable-exports
let {
  apply,
  construct
} = typeof Reflect !== 'undefined' && Reflect;
if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
/**
 * Creates a new function that calls the given function with a specified thisArg and arguments.
 *
 * @param func - The function to be wrapped and called.
 * @returns A new function that calls the given function with a specified thisArg and arguments.
 */
function unapply(func) {
  return function (thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
/**
 * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
 *
 * @param func - The constructor function to be wrapped and called.
 * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
 */
function unconstruct(Func) {
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
/**
 * Add properties to a lookup table
 *
 * @param set - The set to which elements will be added.
 * @param array - The array containing elements to be added to the set.
 * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
 * @returns The modified set with added elements.
 */
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === 'string') {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
/**
 * Clean up an array to harden against CSPP
 *
 * @param array - The array to be cleaned.
 * @returns The cleaned version of the array
 */
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
/**
 * Shallow clone an object
 *
 * @param object - The object to be cloned.
 * @returns A new object that copies the original.
 */
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === 'object' && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
/**
 * This method automatically checks if the prop is function or getter and behaves accordingly.
 *
 * @param object - The object to look up the getter function in its prototype chain.
 * @param prop - The property name for which to find the getter function.
 * @returns The getter function found in the prototype chain or a fallback function.
 */
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}

const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'search', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);
const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'enterkeyhint', 'exportparts', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'inputmode', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'part', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
// List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.
const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);
// Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.
const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
const text = freeze(['#text']);

const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'exportparts', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inert', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns', 'slot']);
const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'amplitude', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'exponent', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'mask-type', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'slope', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'tablevalues', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

// eslint-disable-next-line unicorn/better-regex
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm); // eslint-disable-line unicorn/better-regex
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

var EXPRESSIONS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ARIA_ATTR: ARIA_ATTR,
  ATTR_WHITESPACE: ATTR_WHITESPACE,
  CUSTOM_ELEMENT: CUSTOM_ELEMENT,
  DATA_ATTR: DATA_ATTR,
  DOCTYPE_NAME: DOCTYPE_NAME,
  ERB_EXPR: ERB_EXPR,
  IS_ALLOWED_URI: IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR: MUSTACHE_EXPR,
  TMPLIT_EXPR: TMPLIT_EXPR
});

/* eslint-disable @typescript-eslint/indent */
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12 // Deprecated
};
const getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};
/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param trustedTypes The policy factory.
 * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
 * @return The policy created (or null, if Trusted Types
 * are not supported or creating the policy failed).
 */
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }
  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  let suffix = null;
  const ATTR_NAME = 'data-tt-policy-suffix';
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html) {
        return html;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};
const _createHooksMap = function _createHooksMap() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
  const DOMPurify = root => createDOMPurify(root);
  DOMPurify.version = '3.3.0';
  DOMPurify.removed = [];
  if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document
  } = window;
  const originalDocument = document;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  const remove = lookupGetter(ElementPrototype, 'remove');
  const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.
  if (typeof HTMLTemplateElement === 'function') {
    const template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = '';
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
  const {
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */
  /* allowed element names */
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  /* Allowed attribute names */
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  /*
   * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  let FORBID_TAGS = null;
  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  let FORBID_ATTR = null;
  /* Config object to store ADD_TAGS/ADD_ATTR functions (when used as functions) */
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  /* Decide if ARIA attributes are okay */
  let ALLOW_ARIA_ATTR = true;
  /* Decide if custom data attributes are okay */
  let ALLOW_DATA_ATTR = true;
  /* Decide if unknown protocols are okay */
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  /* Decide if self-closing tags in attributes are allowed.
   * Usually removed due to a mXSS issue in jQuery 3.0 */
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  let SAFE_FOR_TEMPLATES = false;
  /* Output should be safe even for XML used within HTML and alike.
   * This means, DOMPurify removes comments when containing risky content.
   */
  let SAFE_FOR_XML = true;
  /* Decide if document with <html>... should be returned */
  let WHOLE_DOCUMENT = false;
  /* Track whether config is already set on this instance of DOMPurify. */
  let SET_CONFIG = false;
  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  let FORCE_BODY = false;
  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  let RETURN_DOM = false;
  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  let RETURN_DOM_FRAGMENT = false;
  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  let RETURN_TRUSTED_TYPE = false;
  /* Output should be free from DOM clobbering attacks?
   * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
   */
  let SANITIZE_DOM = true;
  /* Achieve full DOM Clobbering protection by isolating the namespace of named
   * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
   *
   * HTML/DOM spec rules that enable DOM Clobbering:
   *   - Named Access on Window (§7.3.3)
   *   - DOM Tree Accessors (§3.1.5)
   *   - Form Element Parent-Child Relations (§4.10.3)
   *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
   *   - HTMLCollection (§4.2.10.2)
   *
   * Namespace isolation is implemented by prefixing `id` and `name` attributes
   * with a constant string, i.e., `user-content-`
   */
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
  /* Keep element content when removing element? */
  let KEEP_CONTENT = true;
  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  let IN_PLACE = false;
  /* Allow usage of profiles like html, svg and mathMl */
  let USE_PROFILES = {};
  /* Tags to ignore content of when KEEP_CONTENT is true */
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
  /* Tags that are safe for data: URIs */
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
  /* Attributes safe for values like "javascript:" */
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
  const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  /* Allowed XHTML+XML namespaces */
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
  let HTML_INTEGRATION_POINTS = addToSet({}, ['annotation-xml']);
  // Certain elements are allowed in both SVG and HTML
  // namespace. We need to specify them explicitly
  // so that they don't get erroneously deleted from
  // HTML namespace.
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
  /* Parsing of strict XHTML documents */
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  let transformCaseFunc = null;
  /* Keep a reference to config to pass to hooks */
  let CONFIG = null;
  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */
  const formElement = document.createElement('form');
  const isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  /**
   * _parseConfig
   *
   * @param cfg optional config literal
   */
  // eslint-disable-next-line complexity
  const _parseConfig = function _parseConfig() {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    /* Shield configuration object from tampering */
    if (!cfg || typeof cfg !== 'object') {
      cfg = {};
    }
    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
    /* Set configuration parameters */
    ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (typeof cfg.ADD_TAGS === 'function') {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (cfg.ADD_ATTR) {
      if (typeof cfg.ADD_ATTR === 'function') {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }
    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }
    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      // Overwrite existing TrustedTypes policy.
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      // Sign local variables required by `sanitize`.
      emptyHTML = trustedTypesPolicy.createHTML('');
    } else {
      // Uninitialized policy, attempt to initialize the internal dompurify policy.
      if (trustedTypesPolicy === undefined) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      // If creating the internal policy succeeded sign internal variables.
      if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
        emptyHTML = trustedTypesPolicy.createHTML('');
      }
    }
    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  /**
   * @param element a DOM element whose namespace is being checked
   * @returns Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */
  const _checkValidNamespace = function _checkValidNamespace(element) {
    let parent = getParentNode(element);
    // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: 'template'
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      // The only way to switch from HTML namespace to SVG
      // is via <svg>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'svg';
      }
      // The only way to switch from MathML to SVG is via`
      // svg if parent is either <annotation-xml> or MathML
      // text integration points.
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      // We only allow elements that are defined in SVG
      // spec. All others are disallowed in SVG namespace.
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      // The only way to switch from HTML namespace to MathML
      // is via <math>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'math';
      }
      // The only way to switch from SVG to MathML is via
      // <math> and HTML integration points
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
      }
      // We only allow elements that are defined in MathML
      // spec. All others are disallowed in MathML namespace.
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      // The only way to switch from SVG to HTML is via
      // HTML integration points, and from MathML to HTML
      // is via MathML text integration points
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      // We disallow tags that are specific for MathML
      // or SVG and should never appear in HTML namespace
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    // For XHTML and XML documents that support custom namespaces
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
    // Return false just in case.
    return false;
  };
  /**
   * _forceRemove
   *
   * @param node a DOM node
   */
  const _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  /**
   * _removeAttribute
   *
   * @param name an Attribute name
   * @param element a DOM node
   */
  const _removeAttribute = function _removeAttribute(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    // We void attribute values for unremovable "is" attributes
    if (name === 'is') {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {}
      } else {
        try {
          element.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };
  /**
   * _initDocument
   *
   * @param dirty - a string of dirty markup
   * @return a DOM, filled with the dirty markup
   */
  const _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }
    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
        // Syntax error if dirtyPayload is invalid xml
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    /* Work on whole document or just its body */
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  /**
   * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
   *
   * @param root The root element or node to start traversing on.
   * @return The created NodeIterator
   */
  const _createNodeIterator = function _createNodeIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
  };
  /**
   * _isClobbered
   *
   * @param element element to check for clobbering attacks
   * @return true if clobbered, false if safe
   */
  const _isClobbered = function _isClobbered(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function');
  };
  /**
   * Checks whether the given object is a DOM node.
   *
   * @param value object to check whether it's a DOM node
   * @return true is object is a DOM node
   */
  const _isNode = function _isNode(value) {
    return typeof Node === 'function' && value instanceof Node;
  };
  function _executeHooks(hooks, currentNode, data) {
    arrayForEach(hooks, hook => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   * @param currentNode to check for permission to exist
   * @return true if node was killed, false if left alive
   */
  const _sanitizeElements = function _sanitizeElements(currentNode) {
    let content = null;
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Now let's check the element's type and name */
    const tagName = transformCaseFunc(currentNode.nodeName);
    /* Execute a hook if present */
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    /* Detect mXSS attempts abusing namespace confusion */
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any occurrence of processing instructions */
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any kind of possibly harmful comments */
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove element if anything forbids its presence */
    if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
      /* Check if we have a custom element to handle */
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      /* Keep content except for bad-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    /* Check whether element has a valid namespace */
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Make sure that older browsers don't get fallback-tag mXSS */
    if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      /* Get the element's text content */
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        content = stringReplace(content, expr, ' ');
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  /**
   * _isValidAttribute
   *
   * @param lcTag Lowercase tag name of containing element.
   * @param lcName Lowercase attribute name.
   * @param value Attribute value.
   * @return Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }
    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
      return false;
    } else ;
    return true;
  };
  /**
   * _isBasicCustomElement
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   *
   * @param tagName name of the tag of the node to sanitize
   * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
   */
  const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
    return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
  };
  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param currentNode to sanitize
   */
  const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    /* Check if we have attributes; if not we might have a text node */
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: undefined
    };
    let l = attributes.length;
    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === 'value' ? initValue : stringTrim(initValue);
      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Full DOM Clobbering protection via namespace isolation,
       * Prefix id and name attributes with `user-content-`
       */
      if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
        // Remove the attribute with this value
        _removeAttribute(name, currentNode);
        // Prefix the value and later re-create the attribute with the sanitized value
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      /* Work around a security issue with comments inside attributes */
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Make sure we cannot easily use animated hrefs, even if animations are allowed */
      if (lcName === 'attributename' && stringMatch(value, 'href')) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Work around a security issue in jQuery 3.0 */
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          value = stringReplace(value, expr, ' ');
        });
      }
      /* Is `value` valid for this attribute? */
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Handle attributes that require Trusted Types */
      if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
        if (namespaceURI) ; else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case 'TrustedHTML':
              {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
            case 'TrustedScriptURL':
              {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
          }
        }
      }
      /* Handle invalid data-* attribute set by try-catching it */
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  /**
   * _sanitizeShadowDOM
   *
   * @param fragment to iterate over recursively
   */
  const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      /* Sanitize tags and elements */
      _sanitizeElements(shadowNode);
      /* Check attributes next */
      _sanitizeAttributes(shadowNode);
      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }
    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      if (typeof dirty.toString === 'function') {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      } else {
        throw typeErrorCreate('toString is not a function');
      }
    }
    /* Return dirty HTML if DOMPurify cannot run */
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    /* Clean up removed elements */
    DOMPurify.removed = [];
    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      /* Do some early pre-sanitization to avoid unsafe root nodes */
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
    } else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      /* Initialize the document to work on */
      body = _initDocument(dirty);
      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }
    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    /* Get node iterator */
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Sanitize tags and elements */
      _sanitizeElements(currentNode);
      /* Check attributes next */
      _sanitizeAttributes(currentNode);
      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }
    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    /* Serialize doctype if allowed */
    if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
    }
    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        serializedHTML = stringReplace(serializedHTML, expr, ' ');
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function () {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function (entryPoint, hookFunction) {
    if (hookFunction !== undefined) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function (entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function () {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();


//# sourceMappingURL=purify.es.mjs.map


/***/ }),

/***/ "./node_modules/hex-to-rgba/build/index.js":
/*!*************************************************!*\
  !*** ./node_modules/hex-to-rgba/build/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var removeHash = function removeHash(hex) {
  return hex.charAt(0) === '#' ? hex.slice(1) : hex;
};

var parseHex = function parseHex(nakedHex) {
  var isShort = nakedHex.length === 3 || nakedHex.length === 4;
  var twoDigitHexR = isShort ? "".concat(nakedHex.slice(0, 1)).concat(nakedHex.slice(0, 1)) : nakedHex.slice(0, 2);
  var twoDigitHexG = isShort ? "".concat(nakedHex.slice(1, 2)).concat(nakedHex.slice(1, 2)) : nakedHex.slice(2, 4);
  var twoDigitHexB = isShort ? "".concat(nakedHex.slice(2, 3)).concat(nakedHex.slice(2, 3)) : nakedHex.slice(4, 6);
  var twoDigitHexA = (isShort ? "".concat(nakedHex.slice(3, 4)).concat(nakedHex.slice(3, 4)) : nakedHex.slice(6, 8)) || 'ff'; // const numericA = +((parseInt(a, 16) / 255).toFixed(2));

  return {
    r: twoDigitHexR,
    g: twoDigitHexG,
    b: twoDigitHexB,
    a: twoDigitHexA
  };
};

var hexToDecimal = function hexToDecimal(hex) {
  return parseInt(hex, 16);
};

var hexesToDecimals = function hexesToDecimals(_ref) {
  var r = _ref.r,
      g = _ref.g,
      b = _ref.b,
      a = _ref.a;
  return {
    r: hexToDecimal(r),
    g: hexToDecimal(g),
    b: hexToDecimal(b),
    a: +(hexToDecimal(a) / 255).toFixed(2)
  };
};

var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}; // eslint-disable-line no-restricted-globals, max-len


var formatRgb = function formatRgb(decimalObject, parameterA) {
  var r = decimalObject.r,
      g = decimalObject.g,
      b = decimalObject.b,
      parsedA = decimalObject.a;
  var a = isNumeric(parameterA) ? parameterA : parsedA;
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
};
/**
 * Turns an old-fashioned css hex color value into a rgb color value.
 *
 * If you specify an alpha value, you'll get a rgba() value instead.
 *
 * @param The hex value to convert. ('123456'. '#123456', ''123', '#123')
 * @param An alpha value to apply. (optional) ('0.5', '0.25')
 * @return An rgb or rgba value. ('rgb(11, 22, 33)'. 'rgba(11, 22, 33, 0.5)')
 */


var hexToRgba = function hexToRgba(hex, a) {
  var hashlessHex = removeHash(hex);
  var hexObject = parseHex(hashlessHex);
  var decimalObject = hexesToDecimals(hexObject);
  return formatRgb(decimalObject, a);
};

module.exports = hexToRgba;

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else // removed by dead control flow
{}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-hook-form/dist/index.esm.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/react-hook-form/dist/index.esm.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   Form: () => (/* binding */ Form),
/* harmony export */   FormProvider: () => (/* binding */ FormProvider),
/* harmony export */   Watch: () => (/* binding */ Watch),
/* harmony export */   appendErrors: () => (/* binding */ appendErrors),
/* harmony export */   createFormControl: () => (/* binding */ createFormControl),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   useController: () => (/* binding */ useController),
/* harmony export */   useFieldArray: () => (/* binding */ useFieldArray),
/* harmony export */   useForm: () => (/* binding */ useForm),
/* harmony export */   useFormContext: () => (/* binding */ useFormContext),
/* harmony export */   useFormState: () => (/* binding */ useFormState),
/* harmony export */   useWatch: () => (/* binding */ useWatch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


var isCheckBoxInput = (element) => element.type === 'checkbox';

var isDateObject = (value) => value instanceof Date;

var isNullOrUndefined = (value) => value == null;

const isObjectType = (value) => typeof value === 'object';
var isObject = (value) => !isNullOrUndefined(value) &&
    !Array.isArray(value) &&
    isObjectType(value) &&
    !isDateObject(value);

var getEventValue = (event) => isObject(event) && event.target
    ? isCheckBoxInput(event.target)
        ? event.target.checked
        : event.target.value
    : event;

var getNodeParentName = (name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;

var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));

var isPlainObject = (tempObject) => {
    const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
    return (isObject(prototypeCopy) && prototypeCopy.hasOwnProperty('isPrototypeOf'));
};

var isWeb = typeof window !== 'undefined' &&
    typeof window.HTMLElement !== 'undefined' &&
    typeof document !== 'undefined';

function cloneObject(data) {
    let copy;
    const isArray = Array.isArray(data);
    const isFileListInstance = typeof FileList !== 'undefined' ? data instanceof FileList : false;
    if (data instanceof Date) {
        copy = new Date(data);
    }
    else if (!(isWeb && (data instanceof Blob || isFileListInstance)) &&
        (isArray || isObject(data))) {
        copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
        if (!isArray && !isPlainObject(data)) {
            copy = data;
        }
        else {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    copy[key] = cloneObject(data[key]);
                }
            }
        }
    }
    else {
        return data;
    }
    return copy;
}

var isKey = (value) => /^\w*$/.test(value);

var isUndefined = (val) => val === undefined;

var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];

var stringToPath = (input) => compact(input.replace(/["|']|\]/g, '').split(/\.|\[/));

var get = (object, path, defaultValue) => {
    if (!path || !isObject(object)) {
        return defaultValue;
    }
    const result = (isKey(path) ? [path] : stringToPath(path)).reduce((result, key) => isNullOrUndefined(result) ? result : result[key], object);
    return isUndefined(result) || result === object
        ? isUndefined(object[path])
            ? defaultValue
            : object[path]
        : result;
};

var isBoolean = (value) => typeof value === 'boolean';

var set = (object, path, value) => {
    let index = -1;
    const tempPath = isKey(path) ? [path] : stringToPath(path);
    const length = tempPath.length;
    const lastIndex = length - 1;
    while (++index < length) {
        const key = tempPath[index];
        let newValue = value;
        if (index !== lastIndex) {
            const objValue = object[key];
            newValue =
                isObject(objValue) || Array.isArray(objValue)
                    ? objValue
                    : !isNaN(+tempPath[index + 1])
                        ? []
                        : {};
        }
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return;
        }
        object[key] = newValue;
        object = object[key];
    }
};

const EVENTS = {
    BLUR: 'blur',
    FOCUS_OUT: 'focusout',
    CHANGE: 'change',
};
const VALIDATION_MODE = {
    onBlur: 'onBlur',
    onChange: 'onChange',
    onSubmit: 'onSubmit',
    onTouched: 'onTouched',
    all: 'all',
};
const INPUT_VALIDATION_RULES = {
    max: 'max',
    min: 'min',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    required: 'required',
    validate: 'validate',
};

const HookFormContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
HookFormContext.displayName = 'HookFormContext';
/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop. To be used with {@link FormProvider}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @returns return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const useFormContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(HookFormContext);
/**
 * A provider component that propagates the `useForm` methods to all children components via [React Context](https://react.dev/reference/react/useContext) API. To be used with {@link useFormContext}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @param props - all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const FormProvider = (props) => {
    const { children, ...data } = props;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(HookFormContext.Provider, { value: data }, children));
};

var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
    const result = {
        defaultValues: control._defaultValues,
    };
    for (const key in formState) {
        Object.defineProperty(result, key, {
            get: () => {
                const _key = key;
                if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
                    control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
                }
                localProxyFormState && (localProxyFormState[_key] = true);
                return formState[_key];
            },
        });
    }
    return result;
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

/**
 * This custom hook allows you to subscribe to each form state, and isolate the re-render at the custom hook level. It has its scope in terms of form state subscription, so it would not affect other useFormState and useForm. Using this hook can reduce the re-render impact on large and complex form application.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformstate) • [Demo](https://codesandbox.io/s/useformstate-75xly)
 *
 * @param props - include options on specify fields to subscribe. {@link UseFormStateReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, control } = useForm({
 *     defaultValues: {
 *     firstName: "firstName"
 *   }});
 *   const { dirtyFields } = useFormState({
 *     control
 *   });
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register("firstName")} placeholder="First Name" />
 *       {dirtyFields.firstName && <p>Field is dirty.</p>}
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFormState(props) {
    const methods = useFormContext();
    const { control = methods.control, disabled, name, exact } = props || {};
    const [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._formState);
    const _localProxyFormState = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
        isDirty: false,
        isLoading: false,
        dirtyFields: false,
        touchedFields: false,
        validatingFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
    });
    useIsomorphicLayoutEffect(() => control._subscribe({
        name,
        formState: _localProxyFormState.current,
        exact,
        callback: (formState) => {
            !disabled &&
                updateFormState({
                    ...control._formState,
                    ...formState,
                });
        },
    }), [name, disabled, exact]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        _localProxyFormState.current.isValid && control._setValid(true);
    }, [control]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => getProxyFormState(formState, control, _localProxyFormState.current, false), [formState, control]);
}

var isString = (value) => typeof value === 'string';

var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
    if (isString(names)) {
        isGlobal && _names.watch.add(names);
        return get(formValues, names, defaultValue);
    }
    if (Array.isArray(names)) {
        return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName),
            get(formValues, fieldName)));
    }
    isGlobal && (_names.watchAll = true);
    return formValues;
};

var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);

function deepEqual(object1, object2, _internal_visited = new WeakSet()) {
    if (isPrimitive(object1) || isPrimitive(object2)) {
        return object1 === object2;
    }
    if (isDateObject(object1) && isDateObject(object2)) {
        return object1.getTime() === object2.getTime();
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    if (_internal_visited.has(object1) || _internal_visited.has(object2)) {
        return true;
    }
    _internal_visited.add(object1);
    _internal_visited.add(object2);
    for (const key of keys1) {
        const val1 = object1[key];
        if (!keys2.includes(key)) {
            return false;
        }
        if (key !== 'ref') {
            const val2 = object2[key];
            if ((isDateObject(val1) && isDateObject(val2)) ||
                (isObject(val1) && isObject(val2)) ||
                (Array.isArray(val1) && Array.isArray(val2))
                ? !deepEqual(val1, val2, _internal_visited)
                : val1 !== val2) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Custom hook to subscribe to field change and isolate re-rendering at the component level.
 *
 * @remarks
 *
 * [API](https://react-hook-form.com/docs/usewatch) • [Demo](https://codesandbox.io/s/react-hook-form-v7-ts-usewatch-h9i5e)
 *
 * @example
 * ```tsx
 * const { control } = useForm();
 * const values = useWatch({
 *   name: "fieldName"
 *   control,
 * })
 * ```
 */
function useWatch(props) {
    const methods = useFormContext();
    const { control = methods.control, name, defaultValue, disabled, exact, compute, } = props || {};
    const _defaultValue = react__WEBPACK_IMPORTED_MODULE_0__.useRef(defaultValue);
    const _compute = react__WEBPACK_IMPORTED_MODULE_0__.useRef(compute);
    const _computeFormValues = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const _prevControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control);
    const _prevName = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
    _compute.current = compute;
    const [value, updateValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
        const defaultValue = control._getWatch(name, _defaultValue.current);
        return _compute.current ? _compute.current(defaultValue) : defaultValue;
    });
    const getCurrentOutput = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((values) => {
        const formValues = generateWatchOutput(name, control._names, values || control._formValues, false, _defaultValue.current);
        return _compute.current ? _compute.current(formValues) : formValues;
    }, [control._formValues, control._names, name]);
    const refreshValue = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((values) => {
        if (!disabled) {
            const formValues = generateWatchOutput(name, control._names, values || control._formValues, false, _defaultValue.current);
            if (_compute.current) {
                const computedFormValues = _compute.current(formValues);
                if (!deepEqual(computedFormValues, _computeFormValues.current)) {
                    updateValue(computedFormValues);
                    _computeFormValues.current = computedFormValues;
                }
            }
            else {
                updateValue(formValues);
            }
        }
    }, [control._formValues, control._names, disabled, name]);
    useIsomorphicLayoutEffect(() => {
        if (_prevControl.current !== control ||
            !deepEqual(_prevName.current, name)) {
            _prevControl.current = control;
            _prevName.current = name;
            refreshValue();
        }
        return control._subscribe({
            name,
            formState: {
                values: true,
            },
            exact,
            callback: (formState) => {
                refreshValue(formState.values);
            },
        });
    }, [control, exact, name, refreshValue]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => control._removeUnmounted());
    // If name or control changed for this render, synchronously reflect the
    // latest value so callers (like useController) see the correct value
    // immediately on the same render.
    // Optimize: Check control reference first before expensive deepEqual
    const controlChanged = _prevControl.current !== control;
    const prevName = _prevName.current;
    // Cache the computed output to avoid duplicate calls within the same render
    // We include shouldReturnImmediate in deps to ensure proper recomputation
    const computedOutput = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        if (disabled) {
            return null;
        }
        const nameChanged = !controlChanged && !deepEqual(prevName, name);
        const shouldReturnImmediate = controlChanged || nameChanged;
        return shouldReturnImmediate ? getCurrentOutput() : null;
    }, [disabled, controlChanged, name, prevName, getCurrentOutput]);
    return computedOutput !== null ? computedOutput : value;
}

/**
 * Custom hook to work with controlled component, this function provide you with both form and field level state. Re-render is isolated at the hook level.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller) • [Demo](https://codesandbox.io/s/usecontroller-0o8px)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns field properties, field and form state. {@link UseControllerReturn}
 *
 * @example
 * ```tsx
 * function Input(props) {
 *   const { field, fieldState, formState } = useController(props);
 *   return (
 *     <div>
 *       <input {...field} placeholder={props.name} />
 *       <p>{fieldState.isTouched && "Touched"}</p>
 *       <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *     </div>
 *   );
 * }
 * ```
 */
function useController(props) {
    const methods = useFormContext();
    const { name, disabled, control = methods.control, shouldUnregister, defaultValue, } = props;
    const isArrayField = isNameInFieldArray(control._names.array, name);
    const defaultValueMemo = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => get(control._formValues, name, get(control._defaultValues, name, defaultValue)), [control, name, defaultValue]);
    const value = useWatch({
        control,
        name,
        defaultValue: defaultValueMemo,
        exact: true,
    });
    const formState = useFormState({
        control,
        name,
        exact: true,
    });
    const _props = react__WEBPACK_IMPORTED_MODULE_0__.useRef(props);
    const _previousNameRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const _registerProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control.register(name, {
        ...props.rules,
        value,
        ...(isBoolean(props.disabled) ? { disabled: props.disabled } : {}),
    }));
    _props.current = props;
    const fieldState = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => Object.defineProperties({}, {
        invalid: {
            enumerable: true,
            get: () => !!get(formState.errors, name),
        },
        isDirty: {
            enumerable: true,
            get: () => !!get(formState.dirtyFields, name),
        },
        isTouched: {
            enumerable: true,
            get: () => !!get(formState.touchedFields, name),
        },
        isValidating: {
            enumerable: true,
            get: () => !!get(formState.validatingFields, name),
        },
        error: {
            enumerable: true,
            get: () => get(formState.errors, name),
        },
    }), [formState, name]);
    const onChange = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((event) => _registerProps.current.onChange({
        target: {
            value: getEventValue(event),
            name: name,
        },
        type: EVENTS.CHANGE,
    }), [name]);
    const onBlur = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => _registerProps.current.onBlur({
        target: {
            value: get(control._formValues, name),
            name: name,
        },
        type: EVENTS.BLUR,
    }), [name, control._formValues]);
    const ref = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((elm) => {
        const field = get(control._fields, name);
        if (field && elm) {
            field._f.ref = {
                focus: () => elm.focus && elm.focus(),
                select: () => elm.select && elm.select(),
                setCustomValidity: (message) => elm.setCustomValidity(message),
                reportValidity: () => elm.reportValidity(),
            };
        }
    }, [control._fields, name]);
    const field = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
        name,
        value,
        ...(isBoolean(disabled) || formState.disabled
            ? { disabled: formState.disabled || disabled }
            : {}),
        onChange,
        onBlur,
        ref,
    }), [name, disabled, formState.disabled, onChange, onBlur, ref, value]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
        const previousName = _previousNameRef.current;
        if (previousName && previousName !== name && !isArrayField) {
            control.unregister(previousName);
        }
        control.register(name, {
            ..._props.current.rules,
            ...(isBoolean(_props.current.disabled)
                ? { disabled: _props.current.disabled }
                : {}),
        });
        const updateMounted = (name, value) => {
            const field = get(control._fields, name);
            if (field && field._f) {
                field._f.mount = value;
            }
        };
        updateMounted(name, true);
        if (_shouldUnregisterField) {
            const value = cloneObject(get(control._options.defaultValues, name, _props.current.defaultValue));
            set(control._defaultValues, name, value);
            if (isUndefined(get(control._formValues, name))) {
                set(control._formValues, name, value);
            }
        }
        !isArrayField && control.register(name);
        _previousNameRef.current = name;
        return () => {
            (isArrayField
                ? _shouldUnregisterField && !control._state.action
                : _shouldUnregisterField)
                ? control.unregister(name)
                : updateMounted(name, false);
        };
    }, [name, control, isArrayField, shouldUnregister]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        control._setDisabledField({
            disabled,
            name,
        });
    }, [disabled, name, control]);
    return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
        field,
        formState,
        fieldState,
    }), [field, formState, fieldState]);
}

/**
 * Component based on `useController` hook to work with controlled component.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller/controller) • [Demo](https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw) • [Video](https://www.youtube.com/watch?v=N2UNk_UCVyA)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns provide field handler functions, field and form state.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control } = useForm<FormValues>({
 *     defaultValues: {
 *       test: ""
 *     }
 *   });
 *
 *   return (
 *     <form>
 *       <Controller
 *         control={control}
 *         name="test"
 *         render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
 *           <>
 *             <input
 *               onChange={onChange} // send value to hook form
 *               onBlur={onBlur} // notify when input is touched
 *               value={value} // return updated value
 *               ref={ref} // set ref for focus management
 *             />
 *             <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *             <p>{fieldState.isTouched ? "touched" : ""}</p>
 *           </>
 *         )}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
const Controller = (props) => props.render(useController(props));

const flatten = (obj) => {
    const output = {};
    for (const key of Object.keys(obj)) {
        if (isObjectType(obj[key]) && obj[key] !== null) {
            const nested = flatten(obj[key]);
            for (const nestedKey of Object.keys(nested)) {
                output[`${key}.${nestedKey}`] = nested[nestedKey];
            }
        }
        else {
            output[key] = obj[key];
        }
    }
    return output;
};

const POST_REQUEST = 'post';
/**
 * Form component to manage submission.
 *
 * @param props - to setup submission detail. {@link FormProps}
 *
 * @returns form component or headless render prop.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control, formState: { errors } } = useForm();
 *
 *   return (
 *     <Form action="/api" control={control}>
 *       <input {...register("name")} />
 *       <p>{errors?.root?.server && 'Server error'}</p>
 *       <button>Submit</button>
 *     </Form>
 *   );
 * }
 * ```
 */
function Form(props) {
    const methods = useFormContext();
    const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const { control = methods.control, onSubmit, children, action, method = POST_REQUEST, headers, encType, onError, render, onSuccess, validateStatus, ...rest } = props;
    const submit = async (event) => {
        let hasError = false;
        let type = '';
        await control.handleSubmit(async (data) => {
            const formData = new FormData();
            let formDataJson = '';
            try {
                formDataJson = JSON.stringify(data);
            }
            catch (_a) { }
            const flattenFormValues = flatten(control._formValues);
            for (const key in flattenFormValues) {
                formData.append(key, flattenFormValues[key]);
            }
            if (onSubmit) {
                await onSubmit({
                    data,
                    event,
                    method,
                    formData,
                    formDataJson,
                });
            }
            if (action) {
                try {
                    const shouldStringifySubmissionData = [
                        headers && headers['Content-Type'],
                        encType,
                    ].some((value) => value && value.includes('json'));
                    const response = await fetch(String(action), {
                        method,
                        headers: {
                            ...headers,
                            ...(encType && encType !== 'multipart/form-data'
                                ? { 'Content-Type': encType }
                                : {}),
                        },
                        body: shouldStringifySubmissionData ? formDataJson : formData,
                    });
                    if (response &&
                        (validateStatus
                            ? !validateStatus(response.status)
                            : response.status < 200 || response.status >= 300)) {
                        hasError = true;
                        onError && onError({ response });
                        type = String(response.status);
                    }
                    else {
                        onSuccess && onSuccess({ response });
                    }
                }
                catch (error) {
                    hasError = true;
                    onError && onError({ error });
                }
            }
        })(event);
        if (hasError && props.control) {
            props.control._subjects.state.next({
                isSubmitSuccessful: false,
            });
            props.control.setError('root.server', {
                type,
            });
        }
    };
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        setMounted(true);
    }, []);
    return render ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, render({
        submit,
    }))) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", { noValidate: mounted, action: action, method: method, encType: encType, onSubmit: submit, ...rest }, children));
}

var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria
    ? {
        ...errors[name],
        types: {
            ...(errors[name] && errors[name].types ? errors[name].types : {}),
            [type]: message || true,
        },
    }
    : {};

var convertToArrayPayload = (value) => (Array.isArray(value) ? value : [value]);

var createSubject = () => {
    let _observers = [];
    const next = (value) => {
        for (const observer of _observers) {
            observer.next && observer.next(value);
        }
    };
    const subscribe = (observer) => {
        _observers.push(observer);
        return {
            unsubscribe: () => {
                _observers = _observers.filter((o) => o !== observer);
            },
        };
    };
    const unsubscribe = () => {
        _observers = [];
    };
    return {
        get observers() {
            return _observers;
        },
        next,
        subscribe,
        unsubscribe,
    };
};

function extractFormValues(fieldsState, formValues) {
    const values = {};
    for (const key in fieldsState) {
        if (fieldsState.hasOwnProperty(key)) {
            const fieldState = fieldsState[key];
            const fieldValue = formValues[key];
            if (fieldState && isObject(fieldState) && fieldValue) {
                const nestedFieldsState = extractFormValues(fieldState, fieldValue);
                if (isObject(nestedFieldsState)) {
                    values[key] = nestedFieldsState;
                }
            }
            else if (fieldsState[key]) {
                values[key] = fieldValue;
            }
        }
    }
    return values;
}

var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;

var isFileInput = (element) => element.type === 'file';

var isFunction = (value) => typeof value === 'function';

var isHTMLElement = (value) => {
    if (!isWeb) {
        return false;
    }
    const owner = value ? value.ownerDocument : 0;
    return (value instanceof
        (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement));
};

var isMultipleSelect = (element) => element.type === `select-multiple`;

var isRadioInput = (element) => element.type === 'radio';

var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);

var live = (ref) => isHTMLElement(ref) && ref.isConnected;

function baseGet(object, updatePath) {
    const length = updatePath.slice(0, -1).length;
    let index = 0;
    while (index < length) {
        object = isUndefined(object) ? index++ : object[updatePath[index++]];
    }
    return object;
}
function isEmptyArray(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
            return false;
        }
    }
    return true;
}
function unset(object, path) {
    const paths = Array.isArray(path)
        ? path
        : isKey(path)
            ? [path]
            : stringToPath(path);
    const childObject = paths.length === 1 ? object : baseGet(object, paths);
    const index = paths.length - 1;
    const key = paths[index];
    if (childObject) {
        delete childObject[key];
    }
    if (index !== 0 &&
        ((isObject(childObject) && isEmptyObject(childObject)) ||
            (Array.isArray(childObject) && isEmptyArray(childObject)))) {
        unset(object, paths.slice(0, -1));
    }
    return object;
}

var objectHasFunction = (data) => {
    for (const key in data) {
        if (isFunction(data[key])) {
            return true;
        }
    }
    return false;
};

function isTraversable(value) {
    return Array.isArray(value) || (isObject(value) && !objectHasFunction(value));
}
function markFieldsDirty(data, fields = {}) {
    for (const key in data) {
        if (isTraversable(data[key])) {
            fields[key] = Array.isArray(data[key]) ? [] : {};
            markFieldsDirty(data[key], fields[key]);
        }
        else if (!isUndefined(data[key])) {
            fields[key] = true;
        }
    }
    return fields;
}
function getDirtyFields(data, formValues, dirtyFieldsFromValues) {
    if (!dirtyFieldsFromValues) {
        dirtyFieldsFromValues = markFieldsDirty(formValues);
    }
    for (const key in data) {
        if (isTraversable(data[key])) {
            if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) {
                dirtyFieldsFromValues[key] = markFieldsDirty(data[key], Array.isArray(data[key]) ? [] : {});
            }
            else {
                getDirtyFields(data[key], isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
            }
        }
        else {
            dirtyFieldsFromValues[key] = !deepEqual(data[key], formValues[key]);
        }
    }
    return dirtyFieldsFromValues;
}

const defaultResult = {
    value: false,
    isValid: false,
};
const validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
    if (Array.isArray(options)) {
        if (options.length > 1) {
            const values = options
                .filter((option) => option && option.checked && !option.disabled)
                .map((option) => option.value);
            return { value: values, isValid: !!values.length };
        }
        return options[0].checked && !options[0].disabled
            ? // @ts-expect-error expected to work in the browser
                options[0].attributes && !isUndefined(options[0].attributes.value)
                    ? isUndefined(options[0].value) || options[0].value === ''
                        ? validResult
                        : { value: options[0].value, isValid: true }
                    : validResult
            : defaultResult;
    }
    return defaultResult;
};

var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value)
    ? value
    : valueAsNumber
        ? value === ''
            ? NaN
            : value
                ? +value
                : value
        : valueAsDate && isString(value)
            ? new Date(value)
            : setValueAs
                ? setValueAs(value)
                : value;

const defaultReturn = {
    isValid: false,
    value: null,
};
var getRadioValue = (options) => Array.isArray(options)
    ? options.reduce((previous, option) => option && option.checked && !option.disabled
        ? {
            isValid: true,
            value: option.value,
        }
        : previous, defaultReturn)
    : defaultReturn;

function getFieldValue(_f) {
    const ref = _f.ref;
    if (isFileInput(ref)) {
        return ref.files;
    }
    if (isRadioInput(ref)) {
        return getRadioValue(_f.refs).value;
    }
    if (isMultipleSelect(ref)) {
        return [...ref.selectedOptions].map(({ value }) => value);
    }
    if (isCheckBoxInput(ref)) {
        return getCheckboxValue(_f.refs).value;
    }
    return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}

var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
    const fields = {};
    for (const name of fieldsNames) {
        const field = get(_fields, name);
        field && set(fields, name, field._f);
    }
    return {
        criteriaMode,
        names: [...fieldsNames],
        fields,
        shouldUseNativeValidation,
    };
};

var isRegex = (value) => value instanceof RegExp;

var getRuleValue = (rule) => isUndefined(rule)
    ? rule
    : isRegex(rule)
        ? rule.source
        : isObject(rule)
            ? isRegex(rule.value)
                ? rule.value.source
                : rule.value
            : rule;

var getValidationModes = (mode) => ({
    isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
    isOnBlur: mode === VALIDATION_MODE.onBlur,
    isOnChange: mode === VALIDATION_MODE.onChange,
    isOnAll: mode === VALIDATION_MODE.all,
    isOnTouch: mode === VALIDATION_MODE.onTouched,
});

const ASYNC_FUNCTION = 'AsyncFunction';
var hasPromiseValidation = (fieldReference) => !!fieldReference &&
    !!fieldReference.validate &&
    !!((isFunction(fieldReference.validate) &&
        fieldReference.validate.constructor.name === ASYNC_FUNCTION) ||
        (isObject(fieldReference.validate) &&
            Object.values(fieldReference.validate).find((validateFunction) => validateFunction.constructor.name === ASYNC_FUNCTION)));

var hasValidation = (options) => options.mount &&
    (options.required ||
        options.min ||
        options.max ||
        options.maxLength ||
        options.minLength ||
        options.pattern ||
        options.validate);

var isWatched = (name, _names, isBlurEvent) => !isBlurEvent &&
    (_names.watchAll ||
        _names.watch.has(name) ||
        [..._names.watch].some((watchName) => name.startsWith(watchName) &&
            /^\.\w+/.test(name.slice(watchName.length))));

const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
    for (const key of fieldsNames || Object.keys(fields)) {
        const field = get(fields, key);
        if (field) {
            const { _f, ...currentField } = field;
            if (_f) {
                if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) {
                    return true;
                }
                else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) {
                    return true;
                }
                else {
                    if (iterateFieldsByAction(currentField, action)) {
                        break;
                    }
                }
            }
            else if (isObject(currentField)) {
                if (iterateFieldsByAction(currentField, action)) {
                    break;
                }
            }
        }
    }
    return;
};

function schemaErrorLookup(errors, _fields, name) {
    const error = get(errors, name);
    if (error || isKey(name)) {
        return {
            error,
            name,
        };
    }
    const names = name.split('.');
    while (names.length) {
        const fieldName = names.join('.');
        const field = get(_fields, fieldName);
        const foundError = get(errors, fieldName);
        if (field && !Array.isArray(field) && name !== fieldName) {
            return { name };
        }
        if (foundError && foundError.type) {
            return {
                name: fieldName,
                error: foundError,
            };
        }
        if (foundError && foundError.root && foundError.root.type) {
            return {
                name: `${fieldName}.root`,
                error: foundError.root,
            };
        }
        names.pop();
    }
    return {
        name,
    };
}

var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
    updateFormState(formStateData);
    const { name, ...formState } = formStateData;
    return (isEmptyObject(formState) ||
        Object.keys(formState).length >= Object.keys(_proxyFormState).length ||
        Object.keys(formState).find((key) => _proxyFormState[key] ===
            (!isRoot || VALIDATION_MODE.all)));
};

var shouldSubscribeByName = (name, signalName, exact) => !name ||
    !signalName ||
    name === signalName ||
    convertToArrayPayload(name).some((currentName) => currentName &&
        (exact
            ? currentName === signalName
            : currentName.startsWith(signalName) ||
                signalName.startsWith(currentName)));

var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
    if (mode.isOnAll) {
        return false;
    }
    else if (!isSubmitted && mode.isOnTouch) {
        return !(isTouched || isBlurEvent);
    }
    else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
        return !isBlurEvent;
    }
    else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
        return isBlurEvent;
    }
    return true;
};

var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);

var updateFieldArrayRootError = (errors, error, name) => {
    const fieldArrayErrors = convertToArrayPayload(get(errors, name));
    set(fieldArrayErrors, 'root', error[name]);
    set(errors, name, fieldArrayErrors);
    return errors;
};

function getValidateError(result, ref, type = 'validate') {
    if (isString(result) ||
        (Array.isArray(result) && result.every(isString)) ||
        (isBoolean(result) && !result)) {
        return {
            type,
            message: isString(result) ? result : '',
            ref,
        };
    }
}

var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData)
    ? validationData
    : {
        value: validationData,
        message: '',
    };

var validateField = async (field, disabledFieldNames, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
    const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount, } = field._f;
    const inputValue = get(formValues, name);
    if (!mount || disabledFieldNames.has(name)) {
        return {};
    }
    const inputRef = refs ? refs[0] : ref;
    const setCustomValidity = (message) => {
        if (shouldUseNativeValidation && inputRef.reportValidity) {
            inputRef.setCustomValidity(isBoolean(message) ? '' : message || '');
            inputRef.reportValidity();
        }
    };
    const error = {};
    const isRadio = isRadioInput(ref);
    const isCheckBox = isCheckBoxInput(ref);
    const isRadioOrCheckbox = isRadio || isCheckBox;
    const isEmpty = ((valueAsNumber || isFileInput(ref)) &&
        isUndefined(ref.value) &&
        isUndefined(inputValue)) ||
        (isHTMLElement(ref) && ref.value === '') ||
        inputValue === '' ||
        (Array.isArray(inputValue) && !inputValue.length);
    const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
    const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
        const message = exceedMax ? maxLengthMessage : minLengthMessage;
        error[name] = {
            type: exceedMax ? maxType : minType,
            message,
            ref,
            ...appendErrorsCurry(exceedMax ? maxType : minType, message),
        };
    };
    if (isFieldArray
        ? !Array.isArray(inputValue) || !inputValue.length
        : required &&
            ((!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue))) ||
                (isBoolean(inputValue) && !inputValue) ||
                (isCheckBox && !getCheckboxValue(refs).isValid) ||
                (isRadio && !getRadioValue(refs).isValid))) {
        const { value, message } = isString(required)
            ? { value: !!required, message: required }
            : getValueAndMessage(required);
        if (value) {
            error[name] = {
                type: INPUT_VALIDATION_RULES.required,
                message,
                ref: inputRef,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message),
            };
            if (!validateAllFieldCriteria) {
                setCustomValidity(message);
                return error;
            }
        }
    }
    if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
        let exceedMax;
        let exceedMin;
        const maxOutput = getValueAndMessage(max);
        const minOutput = getValueAndMessage(min);
        if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
            const valueNumber = ref.valueAsNumber ||
                (inputValue ? +inputValue : inputValue);
            if (!isNullOrUndefined(maxOutput.value)) {
                exceedMax = valueNumber > maxOutput.value;
            }
            if (!isNullOrUndefined(minOutput.value)) {
                exceedMin = valueNumber < minOutput.value;
            }
        }
        else {
            const valueDate = ref.valueAsDate || new Date(inputValue);
            const convertTimeToDate = (time) => new Date(new Date().toDateString() + ' ' + time);
            const isTime = ref.type == 'time';
            const isWeek = ref.type == 'week';
            if (isString(maxOutput.value) && inputValue) {
                exceedMax = isTime
                    ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value)
                    : isWeek
                        ? inputValue > maxOutput.value
                        : valueDate > new Date(maxOutput.value);
            }
            if (isString(minOutput.value) && inputValue) {
                exceedMin = isTime
                    ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value)
                    : isWeek
                        ? inputValue < minOutput.value
                        : valueDate < new Date(minOutput.value);
            }
        }
        if (exceedMax || exceedMin) {
            getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
            if (!validateAllFieldCriteria) {
                setCustomValidity(error[name].message);
                return error;
            }
        }
    }
    if ((maxLength || minLength) &&
        !isEmpty &&
        (isString(inputValue) || (isFieldArray && Array.isArray(inputValue)))) {
        const maxLengthOutput = getValueAndMessage(maxLength);
        const minLengthOutput = getValueAndMessage(minLength);
        const exceedMax = !isNullOrUndefined(maxLengthOutput.value) &&
            inputValue.length > +maxLengthOutput.value;
        const exceedMin = !isNullOrUndefined(minLengthOutput.value) &&
            inputValue.length < +minLengthOutput.value;
        if (exceedMax || exceedMin) {
            getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
            if (!validateAllFieldCriteria) {
                setCustomValidity(error[name].message);
                return error;
            }
        }
    }
    if (pattern && !isEmpty && isString(inputValue)) {
        const { value: patternValue, message } = getValueAndMessage(pattern);
        if (isRegex(patternValue) && !inputValue.match(patternValue)) {
            error[name] = {
                type: INPUT_VALIDATION_RULES.pattern,
                message,
                ref,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message),
            };
            if (!validateAllFieldCriteria) {
                setCustomValidity(message);
                return error;
            }
        }
    }
    if (validate) {
        if (isFunction(validate)) {
            const result = await validate(inputValue, formValues);
            const validateError = getValidateError(result, inputRef);
            if (validateError) {
                error[name] = {
                    ...validateError,
                    ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message),
                };
                if (!validateAllFieldCriteria) {
                    setCustomValidity(validateError.message);
                    return error;
                }
            }
        }
        else if (isObject(validate)) {
            let validationResult = {};
            for (const key in validate) {
                if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
                    break;
                }
                const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
                if (validateError) {
                    validationResult = {
                        ...validateError,
                        ...appendErrorsCurry(key, validateError.message),
                    };
                    setCustomValidity(validateError.message);
                    if (validateAllFieldCriteria) {
                        error[name] = validationResult;
                    }
                }
            }
            if (!isEmptyObject(validationResult)) {
                error[name] = {
                    ref: inputRef,
                    ...validationResult,
                };
                if (!validateAllFieldCriteria) {
                    return error;
                }
            }
        }
    }
    setCustomValidity(true);
    return error;
};

const defaultOptions = {
    mode: VALIDATION_MODE.onSubmit,
    reValidateMode: VALIDATION_MODE.onChange,
    shouldFocusError: true,
};
function createFormControl(props = {}) {
    let _options = {
        ...defaultOptions,
        ...props,
    };
    let _formState = {
        submitCount: 0,
        isDirty: false,
        isReady: false,
        isLoading: isFunction(_options.defaultValues),
        isValidating: false,
        isSubmitted: false,
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        touchedFields: {},
        dirtyFields: {},
        validatingFields: {},
        errors: _options.errors || {},
        disabled: _options.disabled || false,
    };
    let _fields = {};
    let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values)
        ? cloneObject(_options.defaultValues || _options.values) || {}
        : {};
    let _formValues = _options.shouldUnregister
        ? {}
        : cloneObject(_defaultValues);
    let _state = {
        action: false,
        mount: false,
        watch: false,
    };
    let _names = {
        mount: new Set(),
        disabled: new Set(),
        unMount: new Set(),
        array: new Set(),
        watch: new Set(),
    };
    let delayErrorCallback;
    let timer = 0;
    const _proxyFormState = {
        isDirty: false,
        dirtyFields: false,
        validatingFields: false,
        touchedFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
    };
    let _proxySubscribeFormState = {
        ..._proxyFormState,
    };
    const _subjects = {
        array: createSubject(),
        state: createSubject(),
    };
    const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
    const debounce = (callback) => (wait) => {
        clearTimeout(timer);
        timer = setTimeout(callback, wait);
    };
    const _setValid = async (shouldUpdateValid) => {
        if (!_options.disabled &&
            (_proxyFormState.isValid ||
                _proxySubscribeFormState.isValid ||
                shouldUpdateValid)) {
            const isValid = _options.resolver
                ? isEmptyObject((await _runSchema()).errors)
                : await executeBuiltInValidation(_fields, true);
            if (isValid !== _formState.isValid) {
                _subjects.state.next({
                    isValid,
                });
            }
        }
    };
    const _updateIsValidating = (names, isValidating) => {
        if (!_options.disabled &&
            (_proxyFormState.isValidating ||
                _proxyFormState.validatingFields ||
                _proxySubscribeFormState.isValidating ||
                _proxySubscribeFormState.validatingFields)) {
            (names || Array.from(_names.mount)).forEach((name) => {
                if (name) {
                    isValidating
                        ? set(_formState.validatingFields, name, isValidating)
                        : unset(_formState.validatingFields, name);
                }
            });
            _subjects.state.next({
                validatingFields: _formState.validatingFields,
                isValidating: !isEmptyObject(_formState.validatingFields),
            });
        }
    };
    const _setFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
        if (args && method && !_options.disabled) {
            _state.action = true;
            if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
                const fieldValues = method(get(_fields, name), args.argA, args.argB);
                shouldSetValues && set(_fields, name, fieldValues);
            }
            if (shouldUpdateFieldsAndState &&
                Array.isArray(get(_formState.errors, name))) {
                const errors = method(get(_formState.errors, name), args.argA, args.argB);
                shouldSetValues && set(_formState.errors, name, errors);
                unsetEmptyArray(_formState.errors, name);
            }
            if ((_proxyFormState.touchedFields ||
                _proxySubscribeFormState.touchedFields) &&
                shouldUpdateFieldsAndState &&
                Array.isArray(get(_formState.touchedFields, name))) {
                const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
                shouldSetValues && set(_formState.touchedFields, name, touchedFields);
            }
            if (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) {
                _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
            }
            _subjects.state.next({
                name,
                isDirty: _getDirty(name, values),
                dirtyFields: _formState.dirtyFields,
                errors: _formState.errors,
                isValid: _formState.isValid,
            });
        }
        else {
            set(_formValues, name, values);
        }
    };
    const updateErrors = (name, error) => {
        set(_formState.errors, name, error);
        _subjects.state.next({
            errors: _formState.errors,
        });
    };
    const _setErrors = (errors) => {
        _formState.errors = errors;
        _subjects.state.next({
            errors: _formState.errors,
            isValid: false,
        });
    };
    const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
        const field = get(_fields, name);
        if (field) {
            const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
            isUndefined(defaultValue) ||
                (ref && ref.defaultChecked) ||
                shouldSkipSetValueAs
                ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f))
                : setFieldValue(name, defaultValue);
            _state.mount && _setValid();
        }
    };
    const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
        let shouldUpdateField = false;
        let isPreviousDirty = false;
        const output = {
            name,
        };
        if (!_options.disabled) {
            if (!isBlurEvent || shouldDirty) {
                if (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) {
                    isPreviousDirty = _formState.isDirty;
                    _formState.isDirty = output.isDirty = _getDirty();
                    shouldUpdateField = isPreviousDirty !== output.isDirty;
                }
                const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
                isPreviousDirty = !!get(_formState.dirtyFields, name);
                isCurrentFieldPristine
                    ? unset(_formState.dirtyFields, name)
                    : set(_formState.dirtyFields, name, true);
                output.dirtyFields = _formState.dirtyFields;
                shouldUpdateField =
                    shouldUpdateField ||
                        ((_proxyFormState.dirtyFields ||
                            _proxySubscribeFormState.dirtyFields) &&
                            isPreviousDirty !== !isCurrentFieldPristine);
            }
            if (isBlurEvent) {
                const isPreviousFieldTouched = get(_formState.touchedFields, name);
                if (!isPreviousFieldTouched) {
                    set(_formState.touchedFields, name, isBlurEvent);
                    output.touchedFields = _formState.touchedFields;
                    shouldUpdateField =
                        shouldUpdateField ||
                            ((_proxyFormState.touchedFields ||
                                _proxySubscribeFormState.touchedFields) &&
                                isPreviousFieldTouched !== isBlurEvent);
                }
            }
            shouldUpdateField && shouldRender && _subjects.state.next(output);
        }
        return shouldUpdateField ? output : {};
    };
    const shouldRenderByError = (name, isValid, error, fieldState) => {
        const previousFieldError = get(_formState.errors, name);
        const shouldUpdateValid = (_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
            isBoolean(isValid) &&
            _formState.isValid !== isValid;
        if (_options.delayError && error) {
            delayErrorCallback = debounce(() => updateErrors(name, error));
            delayErrorCallback(_options.delayError);
        }
        else {
            clearTimeout(timer);
            delayErrorCallback = null;
            error
                ? set(_formState.errors, name, error)
                : unset(_formState.errors, name);
        }
        if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) ||
            !isEmptyObject(fieldState) ||
            shouldUpdateValid) {
            const updatedFormState = {
                ...fieldState,
                ...(shouldUpdateValid && isBoolean(isValid) ? { isValid } : {}),
                errors: _formState.errors,
                name,
            };
            _formState = {
                ..._formState,
                ...updatedFormState,
            };
            _subjects.state.next(updatedFormState);
        }
    };
    const _runSchema = async (name) => {
        _updateIsValidating(name, true);
        const result = await _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
        _updateIsValidating(name);
        return result;
    };
    const executeSchemaAndUpdateState = async (names) => {
        const { errors } = await _runSchema(names);
        if (names) {
            for (const name of names) {
                const error = get(errors, name);
                error
                    ? set(_formState.errors, name, error)
                    : unset(_formState.errors, name);
            }
        }
        else {
            _formState.errors = errors;
        }
        return errors;
    };
    const executeBuiltInValidation = async (fields, shouldOnlyCheckValid, context = {
        valid: true,
    }) => {
        for (const name in fields) {
            const field = fields[name];
            if (field) {
                const { _f, ...fieldValue } = field;
                if (_f) {
                    const isFieldArrayRoot = _names.array.has(_f.name);
                    const isPromiseFunction = field._f && hasPromiseValidation(field._f);
                    if (isPromiseFunction && _proxyFormState.validatingFields) {
                        _updateIsValidating([_f.name], true);
                    }
                    const fieldError = await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !shouldOnlyCheckValid, isFieldArrayRoot);
                    if (isPromiseFunction && _proxyFormState.validatingFields) {
                        _updateIsValidating([_f.name]);
                    }
                    if (fieldError[_f.name]) {
                        context.valid = false;
                        if (shouldOnlyCheckValid) {
                            break;
                        }
                    }
                    !shouldOnlyCheckValid &&
                        (get(fieldError, _f.name)
                            ? isFieldArrayRoot
                                ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name)
                                : set(_formState.errors, _f.name, fieldError[_f.name])
                            : unset(_formState.errors, _f.name));
                }
                !isEmptyObject(fieldValue) &&
                    (await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context));
            }
        }
        return context.valid;
    };
    const _removeUnmounted = () => {
        for (const name of _names.unMount) {
            const field = get(_fields, name);
            field &&
                (field._f.refs
                    ? field._f.refs.every((ref) => !live(ref))
                    : !live(field._f.ref)) &&
                unregister(name);
        }
        _names.unMount = new Set();
    };
    const _getDirty = (name, data) => !_options.disabled &&
        (name && data && set(_formValues, name, data),
            !deepEqual(getValues(), _defaultValues));
    const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
        ...(_state.mount
            ? _formValues
            : isUndefined(defaultValue)
                ? _defaultValues
                : isString(names)
                    ? { [names]: defaultValue }
                    : defaultValue),
    }, isGlobal, defaultValue);
    const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, _options.shouldUnregister ? get(_defaultValues, name, []) : []));
    const setFieldValue = (name, value, options = {}) => {
        const field = get(_fields, name);
        let fieldValue = value;
        if (field) {
            const fieldReference = field._f;
            if (fieldReference) {
                !fieldReference.disabled &&
                    set(_formValues, name, getFieldValueAs(value, fieldReference));
                fieldValue =
                    isHTMLElement(fieldReference.ref) && isNullOrUndefined(value)
                        ? ''
                        : value;
                if (isMultipleSelect(fieldReference.ref)) {
                    [...fieldReference.ref.options].forEach((optionRef) => (optionRef.selected = fieldValue.includes(optionRef.value)));
                }
                else if (fieldReference.refs) {
                    if (isCheckBoxInput(fieldReference.ref)) {
                        fieldReference.refs.forEach((checkboxRef) => {
                            if (!checkboxRef.defaultChecked || !checkboxRef.disabled) {
                                if (Array.isArray(fieldValue)) {
                                    checkboxRef.checked = !!fieldValue.find((data) => data === checkboxRef.value);
                                }
                                else {
                                    checkboxRef.checked =
                                        fieldValue === checkboxRef.value || !!fieldValue;
                                }
                            }
                        });
                    }
                    else {
                        fieldReference.refs.forEach((radioRef) => (radioRef.checked = radioRef.value === fieldValue));
                    }
                }
                else if (isFileInput(fieldReference.ref)) {
                    fieldReference.ref.value = '';
                }
                else {
                    fieldReference.ref.value = fieldValue;
                    if (!fieldReference.ref.type) {
                        _subjects.state.next({
                            name,
                            values: cloneObject(_formValues),
                        });
                    }
                }
            }
        }
        (options.shouldDirty || options.shouldTouch) &&
            updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
        options.shouldValidate && trigger(name);
    };
    const setValues = (name, value, options) => {
        for (const fieldKey in value) {
            if (!value.hasOwnProperty(fieldKey)) {
                return;
            }
            const fieldValue = value[fieldKey];
            const fieldName = name + '.' + fieldKey;
            const field = get(_fields, fieldName);
            (_names.array.has(name) ||
                isObject(fieldValue) ||
                (field && !field._f)) &&
                !isDateObject(fieldValue)
                ? setValues(fieldName, fieldValue, options)
                : setFieldValue(fieldName, fieldValue, options);
        }
    };
    const setValue = (name, value, options = {}) => {
        const field = get(_fields, name);
        const isFieldArray = _names.array.has(name);
        const cloneValue = cloneObject(value);
        set(_formValues, name, cloneValue);
        if (isFieldArray) {
            _subjects.array.next({
                name,
                values: cloneObject(_formValues),
            });
            if ((_proxyFormState.isDirty ||
                _proxyFormState.dirtyFields ||
                _proxySubscribeFormState.isDirty ||
                _proxySubscribeFormState.dirtyFields) &&
                options.shouldDirty) {
                _subjects.state.next({
                    name,
                    dirtyFields: getDirtyFields(_defaultValues, _formValues),
                    isDirty: _getDirty(name, cloneValue),
                });
            }
        }
        else {
            field && !field._f && !isNullOrUndefined(cloneValue)
                ? setValues(name, cloneValue, options)
                : setFieldValue(name, cloneValue, options);
        }
        isWatched(name, _names) && _subjects.state.next({ ..._formState, name });
        _subjects.state.next({
            name: _state.mount ? name : undefined,
            values: cloneObject(_formValues),
        });
    };
    const onChange = async (event) => {
        _state.mount = true;
        const target = event.target;
        let name = target.name;
        let isFieldValueUpdated = true;
        const field = get(_fields, name);
        const _updateIsFieldValueUpdated = (fieldValue) => {
            isFieldValueUpdated =
                Number.isNaN(fieldValue) ||
                    (isDateObject(fieldValue) && isNaN(fieldValue.getTime())) ||
                    deepEqual(fieldValue, get(_formValues, name, fieldValue));
        };
        const validationModeBeforeSubmit = getValidationModes(_options.mode);
        const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
        if (field) {
            let error;
            let isValid;
            const fieldValue = target.type
                ? getFieldValue(field._f)
                : getEventValue(event);
            const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
            const shouldSkipValidation = (!hasValidation(field._f) &&
                !_options.resolver &&
                !get(_formState.errors, name) &&
                !field._f.deps) ||
                skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
            const watched = isWatched(name, _names, isBlurEvent);
            set(_formValues, name, fieldValue);
            if (isBlurEvent) {
                if (!target || !target.readOnly) {
                    field._f.onBlur && field._f.onBlur(event);
                    delayErrorCallback && delayErrorCallback(0);
                }
            }
            else if (field._f.onChange) {
                field._f.onChange(event);
            }
            const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent);
            const shouldRender = !isEmptyObject(fieldState) || watched;
            !isBlurEvent &&
                _subjects.state.next({
                    name,
                    type: event.type,
                    values: cloneObject(_formValues),
                });
            if (shouldSkipValidation) {
                if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
                    if (_options.mode === 'onBlur') {
                        if (isBlurEvent) {
                            _setValid();
                        }
                    }
                    else if (!isBlurEvent) {
                        _setValid();
                    }
                }
                return (shouldRender &&
                    _subjects.state.next({ name, ...(watched ? {} : fieldState) }));
            }
            !isBlurEvent && watched && _subjects.state.next({ ..._formState });
            if (_options.resolver) {
                const { errors } = await _runSchema([name]);
                _updateIsFieldValueUpdated(fieldValue);
                if (isFieldValueUpdated) {
                    const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
                    const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
                    error = errorLookupResult.error;
                    name = errorLookupResult.name;
                    isValid = isEmptyObject(errors);
                }
            }
            else {
                _updateIsValidating([name], true);
                error = (await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
                _updateIsValidating([name]);
                _updateIsFieldValueUpdated(fieldValue);
                if (isFieldValueUpdated) {
                    if (error) {
                        isValid = false;
                    }
                    else if (_proxyFormState.isValid ||
                        _proxySubscribeFormState.isValid) {
                        isValid = await executeBuiltInValidation(_fields, true);
                    }
                }
            }
            if (isFieldValueUpdated) {
                field._f.deps &&
                    (!Array.isArray(field._f.deps) || field._f.deps.length > 0) &&
                    trigger(field._f.deps);
                shouldRenderByError(name, isValid, error, fieldState);
            }
        }
    };
    const _focusInput = (ref, key) => {
        if (get(_formState.errors, key) && ref.focus) {
            ref.focus();
            return 1;
        }
        return;
    };
    const trigger = async (name, options = {}) => {
        let isValid;
        let validationResult;
        const fieldNames = convertToArrayPayload(name);
        if (_options.resolver) {
            const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
            isValid = isEmptyObject(errors);
            validationResult = name
                ? !fieldNames.some((name) => get(errors, name))
                : isValid;
        }
        else if (name) {
            validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
                const field = get(_fields, fieldName);
                return await executeBuiltInValidation(field && field._f ? { [fieldName]: field } : field);
            }))).every(Boolean);
            !(!validationResult && !_formState.isValid) && _setValid();
        }
        else {
            validationResult = isValid = await executeBuiltInValidation(_fields);
        }
        _subjects.state.next({
            ...(!isString(name) ||
                ((_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                    isValid !== _formState.isValid)
                ? {}
                : { name }),
            ...(_options.resolver || !name ? { isValid } : {}),
            errors: _formState.errors,
        });
        options.shouldFocus &&
            !validationResult &&
            iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
        return validationResult;
    };
    const getValues = (fieldNames, config) => {
        let values = {
            ...(_state.mount ? _formValues : _defaultValues),
        };
        if (config) {
            values = extractFormValues(config.dirtyFields ? _formState.dirtyFields : _formState.touchedFields, values);
        }
        return isUndefined(fieldNames)
            ? values
            : isString(fieldNames)
                ? get(values, fieldNames)
                : fieldNames.map((name) => get(values, name));
    };
    const getFieldState = (name, formState) => ({
        invalid: !!get((formState || _formState).errors, name),
        isDirty: !!get((formState || _formState).dirtyFields, name),
        error: get((formState || _formState).errors, name),
        isValidating: !!get(_formState.validatingFields, name),
        isTouched: !!get((formState || _formState).touchedFields, name),
    });
    const clearErrors = (name) => {
        name &&
            convertToArrayPayload(name).forEach((inputName) => unset(_formState.errors, inputName));
        _subjects.state.next({
            errors: name ? _formState.errors : {},
        });
    };
    const setError = (name, error, options) => {
        const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
        const currentError = get(_formState.errors, name) || {};
        // Don't override existing error messages elsewhere in the object tree.
        const { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
        set(_formState.errors, name, {
            ...restOfErrorTree,
            ...error,
            ref,
        });
        _subjects.state.next({
            name,
            errors: _formState.errors,
            isValid: false,
        });
        options && options.shouldFocus && ref && ref.focus && ref.focus();
    };
    const watch = (name, defaultValue) => isFunction(name)
        ? _subjects.state.subscribe({
            next: (payload) => 'values' in payload &&
                name(_getWatch(undefined, defaultValue), payload),
        })
        : _getWatch(name, defaultValue, true);
    const _subscribe = (props) => _subjects.state.subscribe({
        next: (formState) => {
            if (shouldSubscribeByName(props.name, formState.name, props.exact) &&
                shouldRenderFormState(formState, props.formState || _proxyFormState, _setFormState, props.reRenderRoot)) {
                props.callback({
                    values: { ..._formValues },
                    ..._formState,
                    ...formState,
                    defaultValues: _defaultValues,
                });
            }
        },
    }).unsubscribe;
    const subscribe = (props) => {
        _state.mount = true;
        _proxySubscribeFormState = {
            ..._proxySubscribeFormState,
            ...props.formState,
        };
        return _subscribe({
            ...props,
            formState: _proxySubscribeFormState,
        });
    };
    const unregister = (name, options = {}) => {
        for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
            _names.mount.delete(fieldName);
            _names.array.delete(fieldName);
            if (!options.keepValue) {
                unset(_fields, fieldName);
                unset(_formValues, fieldName);
            }
            !options.keepError && unset(_formState.errors, fieldName);
            !options.keepDirty && unset(_formState.dirtyFields, fieldName);
            !options.keepTouched && unset(_formState.touchedFields, fieldName);
            !options.keepIsValidating &&
                unset(_formState.validatingFields, fieldName);
            !_options.shouldUnregister &&
                !options.keepDefaultValue &&
                unset(_defaultValues, fieldName);
        }
        _subjects.state.next({
            values: cloneObject(_formValues),
        });
        _subjects.state.next({
            ..._formState,
            ...(!options.keepDirty ? {} : { isDirty: _getDirty() }),
        });
        !options.keepIsValid && _setValid();
    };
    const _setDisabledField = ({ disabled, name, }) => {
        if ((isBoolean(disabled) && _state.mount) ||
            !!disabled ||
            _names.disabled.has(name)) {
            disabled ? _names.disabled.add(name) : _names.disabled.delete(name);
        }
    };
    const register = (name, options = {}) => {
        let field = get(_fields, name);
        const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
        set(_fields, name, {
            ...(field || {}),
            _f: {
                ...(field && field._f ? field._f : { ref: { name } }),
                name,
                mount: true,
                ...options,
            },
        });
        _names.mount.add(name);
        if (field) {
            _setDisabledField({
                disabled: isBoolean(options.disabled)
                    ? options.disabled
                    : _options.disabled,
                name,
            });
        }
        else {
            updateValidAndValue(name, true, options.value);
        }
        return {
            ...(disabledIsDefined
                ? { disabled: options.disabled || _options.disabled }
                : {}),
            ...(_options.progressive
                ? {
                    required: !!options.required,
                    min: getRuleValue(options.min),
                    max: getRuleValue(options.max),
                    minLength: getRuleValue(options.minLength),
                    maxLength: getRuleValue(options.maxLength),
                    pattern: getRuleValue(options.pattern),
                }
                : {}),
            name,
            onChange,
            onBlur: onChange,
            ref: (ref) => {
                if (ref) {
                    register(name, options);
                    field = get(_fields, name);
                    const fieldRef = isUndefined(ref.value)
                        ? ref.querySelectorAll
                            ? ref.querySelectorAll('input,select,textarea')[0] || ref
                            : ref
                        : ref;
                    const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
                    const refs = field._f.refs || [];
                    if (radioOrCheckbox
                        ? refs.find((option) => option === fieldRef)
                        : fieldRef === field._f.ref) {
                        return;
                    }
                    set(_fields, name, {
                        _f: {
                            ...field._f,
                            ...(radioOrCheckbox
                                ? {
                                    refs: [
                                        ...refs.filter(live),
                                        fieldRef,
                                        ...(Array.isArray(get(_defaultValues, name)) ? [{}] : []),
                                    ],
                                    ref: { type: fieldRef.type, name },
                                }
                                : { ref: fieldRef }),
                        },
                    });
                    updateValidAndValue(name, false, undefined, fieldRef);
                }
                else {
                    field = get(_fields, name, {});
                    if (field._f) {
                        field._f.mount = false;
                    }
                    (_options.shouldUnregister || options.shouldUnregister) &&
                        !(isNameInFieldArray(_names.array, name) && _state.action) &&
                        _names.unMount.add(name);
                }
            },
        };
    };
    const _focusError = () => _options.shouldFocusError &&
        iterateFieldsByAction(_fields, _focusInput, _names.mount);
    const _disableForm = (disabled) => {
        if (isBoolean(disabled)) {
            _subjects.state.next({ disabled });
            iterateFieldsByAction(_fields, (ref, name) => {
                const currentField = get(_fields, name);
                if (currentField) {
                    ref.disabled = currentField._f.disabled || disabled;
                    if (Array.isArray(currentField._f.refs)) {
                        currentField._f.refs.forEach((inputRef) => {
                            inputRef.disabled = currentField._f.disabled || disabled;
                        });
                    }
                }
            }, 0, false);
        }
    };
    const handleSubmit = (onValid, onInvalid) => async (e) => {
        let onValidError = undefined;
        if (e) {
            e.preventDefault && e.preventDefault();
            e.persist &&
                e.persist();
        }
        let fieldValues = cloneObject(_formValues);
        _subjects.state.next({
            isSubmitting: true,
        });
        if (_options.resolver) {
            const { errors, values } = await _runSchema();
            _formState.errors = errors;
            fieldValues = cloneObject(values);
        }
        else {
            await executeBuiltInValidation(_fields);
        }
        if (_names.disabled.size) {
            for (const name of _names.disabled) {
                unset(fieldValues, name);
            }
        }
        unset(_formState.errors, 'root');
        if (isEmptyObject(_formState.errors)) {
            _subjects.state.next({
                errors: {},
            });
            try {
                await onValid(fieldValues, e);
            }
            catch (error) {
                onValidError = error;
            }
        }
        else {
            if (onInvalid) {
                await onInvalid({ ..._formState.errors }, e);
            }
            _focusError();
            setTimeout(_focusError);
        }
        _subjects.state.next({
            isSubmitted: true,
            isSubmitting: false,
            isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
            submitCount: _formState.submitCount + 1,
            errors: _formState.errors,
        });
        if (onValidError) {
            throw onValidError;
        }
    };
    const resetField = (name, options = {}) => {
        if (get(_fields, name)) {
            if (isUndefined(options.defaultValue)) {
                setValue(name, cloneObject(get(_defaultValues, name)));
            }
            else {
                setValue(name, options.defaultValue);
                set(_defaultValues, name, cloneObject(options.defaultValue));
            }
            if (!options.keepTouched) {
                unset(_formState.touchedFields, name);
            }
            if (!options.keepDirty) {
                unset(_formState.dirtyFields, name);
                _formState.isDirty = options.defaultValue
                    ? _getDirty(name, cloneObject(get(_defaultValues, name)))
                    : _getDirty();
            }
            if (!options.keepError) {
                unset(_formState.errors, name);
                _proxyFormState.isValid && _setValid();
            }
            _subjects.state.next({ ..._formState });
        }
    };
    const _reset = (formValues, keepStateOptions = {}) => {
        const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
        const cloneUpdatedValues = cloneObject(updatedValues);
        const isEmptyResetValues = isEmptyObject(formValues);
        const values = isEmptyResetValues ? _defaultValues : cloneUpdatedValues;
        if (!keepStateOptions.keepDefaultValues) {
            _defaultValues = updatedValues;
        }
        if (!keepStateOptions.keepValues) {
            if (keepStateOptions.keepDirtyValues) {
                const fieldsToCheck = new Set([
                    ..._names.mount,
                    ...Object.keys(getDirtyFields(_defaultValues, _formValues)),
                ]);
                for (const fieldName of Array.from(fieldsToCheck)) {
                    get(_formState.dirtyFields, fieldName)
                        ? set(values, fieldName, get(_formValues, fieldName))
                        : setValue(fieldName, get(values, fieldName));
                }
            }
            else {
                if (isWeb && isUndefined(formValues)) {
                    for (const name of _names.mount) {
                        const field = get(_fields, name);
                        if (field && field._f) {
                            const fieldReference = Array.isArray(field._f.refs)
                                ? field._f.refs[0]
                                : field._f.ref;
                            if (isHTMLElement(fieldReference)) {
                                const form = fieldReference.closest('form');
                                if (form) {
                                    form.reset();
                                    break;
                                }
                            }
                        }
                    }
                }
                if (keepStateOptions.keepFieldsRef) {
                    for (const fieldName of _names.mount) {
                        setValue(fieldName, get(values, fieldName));
                    }
                }
                else {
                    _fields = {};
                }
            }
            _formValues = _options.shouldUnregister
                ? keepStateOptions.keepDefaultValues
                    ? cloneObject(_defaultValues)
                    : {}
                : cloneObject(values);
            _subjects.array.next({
                values: { ...values },
            });
            _subjects.state.next({
                values: { ...values },
            });
        }
        _names = {
            mount: keepStateOptions.keepDirtyValues ? _names.mount : new Set(),
            unMount: new Set(),
            array: new Set(),
            disabled: new Set(),
            watch: new Set(),
            watchAll: false,
            focus: '',
        };
        _state.mount =
            !_proxyFormState.isValid ||
                !!keepStateOptions.keepIsValid ||
                !!keepStateOptions.keepDirtyValues ||
                (!_options.shouldUnregister && !isEmptyObject(values));
        _state.watch = !!_options.shouldUnregister;
        _subjects.state.next({
            submitCount: keepStateOptions.keepSubmitCount
                ? _formState.submitCount
                : 0,
            isDirty: isEmptyResetValues
                ? false
                : keepStateOptions.keepDirty
                    ? _formState.isDirty
                    : !!(keepStateOptions.keepDefaultValues &&
                        !deepEqual(formValues, _defaultValues)),
            isSubmitted: keepStateOptions.keepIsSubmitted
                ? _formState.isSubmitted
                : false,
            dirtyFields: isEmptyResetValues
                ? {}
                : keepStateOptions.keepDirtyValues
                    ? keepStateOptions.keepDefaultValues && _formValues
                        ? getDirtyFields(_defaultValues, _formValues)
                        : _formState.dirtyFields
                    : keepStateOptions.keepDefaultValues && formValues
                        ? getDirtyFields(_defaultValues, formValues)
                        : keepStateOptions.keepDirty
                            ? _formState.dirtyFields
                            : {},
            touchedFields: keepStateOptions.keepTouched
                ? _formState.touchedFields
                : {},
            errors: keepStateOptions.keepErrors ? _formState.errors : {},
            isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful
                ? _formState.isSubmitSuccessful
                : false,
            isSubmitting: false,
            defaultValues: _defaultValues,
        });
    };
    const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues)
        ? formValues(_formValues)
        : formValues, keepStateOptions);
    const setFocus = (name, options = {}) => {
        const field = get(_fields, name);
        const fieldReference = field && field._f;
        if (fieldReference) {
            const fieldRef = fieldReference.refs
                ? fieldReference.refs[0]
                : fieldReference.ref;
            if (fieldRef.focus) {
                fieldRef.focus();
                options.shouldSelect &&
                    isFunction(fieldRef.select) &&
                    fieldRef.select();
            }
        }
    };
    const _setFormState = (updatedFormState) => {
        _formState = {
            ..._formState,
            ...updatedFormState,
        };
    };
    const _resetDefaultValues = () => isFunction(_options.defaultValues) &&
        _options.defaultValues().then((values) => {
            reset(values, _options.resetOptions);
            _subjects.state.next({
                isLoading: false,
            });
        });
    const methods = {
        control: {
            register,
            unregister,
            getFieldState,
            handleSubmit,
            setError,
            _subscribe,
            _runSchema,
            _focusError,
            _getWatch,
            _getDirty,
            _setValid,
            _setFieldArray,
            _setDisabledField,
            _setErrors,
            _getFieldArray,
            _reset,
            _resetDefaultValues,
            _removeUnmounted,
            _disableForm,
            _subjects,
            _proxyFormState,
            get _fields() {
                return _fields;
            },
            get _formValues() {
                return _formValues;
            },
            get _state() {
                return _state;
            },
            set _state(value) {
                _state = value;
            },
            get _defaultValues() {
                return _defaultValues;
            },
            get _names() {
                return _names;
            },
            set _names(value) {
                _names = value;
            },
            get _formState() {
                return _formState;
            },
            get _options() {
                return _options;
            },
            set _options(value) {
                _options = {
                    ..._options,
                    ...value,
                };
            },
        },
        subscribe,
        trigger,
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
        resetField,
        clearErrors,
        unregister,
        setError,
        setFocus,
        getFieldState,
    };
    return {
        ...methods,
        formControl: methods,
    };
}

var generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    const d = typeof performance === 'undefined' ? Date.now() : performance.now() * 1000;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16 + d) % 16 | 0;
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};

var getFocusFieldName = (name, index, options = {}) => options.shouldFocus || isUndefined(options.shouldFocus)
    ? options.focusName ||
        `${name}.${isUndefined(options.focusIndex) ? index : options.focusIndex}.`
    : '';

var appendAt = (data, value) => [
    ...data,
    ...convertToArrayPayload(value),
];

var fillEmptyArray = (value) => Array.isArray(value) ? value.map(() => undefined) : undefined;

function insert(data, index, value) {
    return [
        ...data.slice(0, index),
        ...convertToArrayPayload(value),
        ...data.slice(index),
    ];
}

var moveArrayAt = (data, from, to) => {
    if (!Array.isArray(data)) {
        return [];
    }
    if (isUndefined(data[to])) {
        data[to] = undefined;
    }
    data.splice(to, 0, data.splice(from, 1)[0]);
    return data;
};

var prependAt = (data, value) => [
    ...convertToArrayPayload(value),
    ...convertToArrayPayload(data),
];

function removeAtIndexes(data, indexes) {
    let i = 0;
    const temp = [...data];
    for (const index of indexes) {
        temp.splice(index - i, 1);
        i++;
    }
    return compact(temp).length ? temp : [];
}
var removeArrayAt = (data, index) => isUndefined(index)
    ? []
    : removeAtIndexes(data, convertToArrayPayload(index).sort((a, b) => a - b));

var swapArrayAt = (data, indexA, indexB) => {
    [data[indexA], data[indexB]] = [data[indexB], data[indexA]];
};

var updateAt = (fieldValues, index, value) => {
    fieldValues[index] = value;
    return fieldValues;
};

/**
 * A custom hook that exposes convenient methods to perform operations with a list of dynamic inputs that need to be appended, updated, removed etc. • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn) • [Video](https://youtu.be/4MrbfGSFY2A)
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usefieldarray) • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn)
 *
 * @param props - useFieldArray props
 *
 * @returns methods - functions to manipulate with the Field Arrays (dynamic inputs) {@link UseFieldArrayReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, control, handleSubmit, reset, trigger, setError } = useForm({
 *     defaultValues: {
 *       test: []
 *     }
 *   });
 *   const { fields, append } = useFieldArray({
 *     control,
 *     name: "test"
 *   });
 *
 *   return (
 *     <form onSubmit={handleSubmit(data => console.log(data))}>
 *       {fields.map((item, index) => (
 *          <input key={item.id} {...register(`test.${index}.firstName`)}  />
 *       ))}
 *       <button type="button" onClick={() => append({ firstName: "bill" })}>
 *         append
 *       </button>
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFieldArray(props) {
    const methods = useFormContext();
    const { control = methods.control, name, keyName = 'id', shouldUnregister, rules, } = props;
    const [fields, setFields] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._getFieldArray(name));
    const ids = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control._getFieldArray(name).map(generateId));
    const _actioned = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    control._names.array.add(name);
    react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => rules &&
        fields.length >= 0 &&
        control.register(name, rules), [control, name, fields.length, rules]);
    useIsomorphicLayoutEffect(() => control._subjects.array.subscribe({
        next: ({ values, name: fieldArrayName, }) => {
            if (fieldArrayName === name || !fieldArrayName) {
                const fieldValues = get(values, name);
                if (Array.isArray(fieldValues)) {
                    setFields(fieldValues);
                    ids.current = fieldValues.map(generateId);
                }
            }
        },
    }).unsubscribe, [control, name]);
    const updateValues = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((updatedFieldArrayValues) => {
        _actioned.current = true;
        control._setFieldArray(name, updatedFieldArrayValues);
    }, [control, name]);
    const append = (value, options) => {
        const appendValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = appendAt(control._getFieldArray(name), appendValue);
        control._names.focus = getFocusFieldName(name, updatedFieldArrayValues.length - 1, options);
        ids.current = appendAt(ids.current, appendValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, appendAt, {
            argA: fillEmptyArray(value),
        });
    };
    const prepend = (value, options) => {
        const prependValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = prependAt(control._getFieldArray(name), prependValue);
        control._names.focus = getFocusFieldName(name, 0, options);
        ids.current = prependAt(ids.current, prependValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, prependAt, {
            argA: fillEmptyArray(value),
        });
    };
    const remove = (index) => {
        const updatedFieldArrayValues = removeArrayAt(control._getFieldArray(name), index);
        ids.current = removeArrayAt(ids.current, index);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        !Array.isArray(get(control._fields, name)) &&
            set(control._fields, name, undefined);
        control._setFieldArray(name, updatedFieldArrayValues, removeArrayAt, {
            argA: index,
        });
    };
    const insert$1 = (index, value, options) => {
        const insertValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = insert(control._getFieldArray(name), index, insertValue);
        control._names.focus = getFocusFieldName(name, index, options);
        ids.current = insert(ids.current, index, insertValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, insert, {
            argA: index,
            argB: fillEmptyArray(value),
        });
    };
    const swap = (indexA, indexB) => {
        const updatedFieldArrayValues = control._getFieldArray(name);
        swapArrayAt(updatedFieldArrayValues, indexA, indexB);
        swapArrayAt(ids.current, indexA, indexB);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, swapArrayAt, {
            argA: indexA,
            argB: indexB,
        }, false);
    };
    const move = (from, to) => {
        const updatedFieldArrayValues = control._getFieldArray(name);
        moveArrayAt(updatedFieldArrayValues, from, to);
        moveArrayAt(ids.current, from, to);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._setFieldArray(name, updatedFieldArrayValues, moveArrayAt, {
            argA: from,
            argB: to,
        }, false);
    };
    const update = (index, value) => {
        const updateValue = cloneObject(value);
        const updatedFieldArrayValues = updateAt(control._getFieldArray(name), index, updateValue);
        ids.current = [...updatedFieldArrayValues].map((item, i) => !item || i === index ? generateId() : ids.current[i]);
        updateValues(updatedFieldArrayValues);
        setFields([...updatedFieldArrayValues]);
        control._setFieldArray(name, updatedFieldArrayValues, updateAt, {
            argA: index,
            argB: updateValue,
        }, true, false);
    };
    const replace = (value) => {
        const updatedFieldArrayValues = convertToArrayPayload(cloneObject(value));
        ids.current = updatedFieldArrayValues.map(generateId);
        updateValues([...updatedFieldArrayValues]);
        setFields([...updatedFieldArrayValues]);
        control._setFieldArray(name, [...updatedFieldArrayValues], (data) => data, {}, true, false);
    };
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        control._state.action = false;
        isWatched(name, control._names) &&
            control._subjects.state.next({
                ...control._formState,
            });
        if (_actioned.current &&
            (!getValidationModes(control._options.mode).isOnSubmit ||
                control._formState.isSubmitted) &&
            !getValidationModes(control._options.reValidateMode).isOnSubmit) {
            if (control._options.resolver) {
                control._runSchema([name]).then((result) => {
                    const error = get(result.errors, name);
                    const existingError = get(control._formState.errors, name);
                    if (existingError
                        ? (!error && existingError.type) ||
                            (error &&
                                (existingError.type !== error.type ||
                                    existingError.message !== error.message))
                        : error && error.type) {
                        error
                            ? set(control._formState.errors, name, error)
                            : unset(control._formState.errors, name);
                        control._subjects.state.next({
                            errors: control._formState.errors,
                        });
                    }
                });
            }
            else {
                const field = get(control._fields, name);
                if (field &&
                    field._f &&
                    !(getValidationModes(control._options.reValidateMode).isOnSubmit &&
                        getValidationModes(control._options.mode).isOnSubmit)) {
                    validateField(field, control._names.disabled, control._formValues, control._options.criteriaMode === VALIDATION_MODE.all, control._options.shouldUseNativeValidation, true).then((error) => !isEmptyObject(error) &&
                        control._subjects.state.next({
                            errors: updateFieldArrayRootError(control._formState.errors, error, name),
                        }));
                }
            }
        }
        control._subjects.state.next({
            name,
            values: cloneObject(control._formValues),
        });
        control._names.focus &&
            iterateFieldsByAction(control._fields, (ref, key) => {
                if (control._names.focus &&
                    key.startsWith(control._names.focus) &&
                    ref.focus) {
                    ref.focus();
                    return 1;
                }
                return;
            });
        control._names.focus = '';
        control._setValid();
        _actioned.current = false;
    }, [fields, name, control]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        !get(control._formValues, name) && control._setFieldArray(name);
        return () => {
            const updateMounted = (name, value) => {
                const field = get(control._fields, name);
                if (field && field._f) {
                    field._f.mount = value;
                }
            };
            control._options.shouldUnregister || shouldUnregister
                ? control.unregister(name)
                : updateMounted(name, false);
        };
    }, [name, control, keyName, shouldUnregister]);
    return {
        swap: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(swap, [updateValues, name, control]),
        move: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(move, [updateValues, name, control]),
        prepend: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(prepend, [updateValues, name, control]),
        append: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(append, [updateValues, name, control]),
        remove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(remove, [updateValues, name, control]),
        insert: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(insert$1, [updateValues, name, control]),
        update: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(update, [updateValues, name, control]),
        replace: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(replace, [updateValues, name, control]),
        fields: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => fields.map((field, index) => ({
            ...field,
            [keyName]: ids.current[index] || generateId(),
        })), [fields, keyName]),
    };
}

/**
 * Custom hook to manage the entire form.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useform) • [Demo](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm) • [Video](https://www.youtube.com/watch?v=RkXv4AXXC_4)
 *
 * @param props - form configuration and validation parameters.
 *
 * @returns methods - individual functions to manage the form state. {@link UseFormReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, watch, formState: { errors } } = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   console.log(watch("example"));
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input defaultValue="test" {...register("example")} />
 *       <input {...register("exampleRequired", { required: true })} />
 *       {errors.exampleRequired && <span>This field is required</span>}
 *       <button>Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */
function useForm(props = {}) {
    const _formControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const _values = react__WEBPACK_IMPORTED_MODULE_0__.useRef(undefined);
    const [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
        isDirty: false,
        isValidating: false,
        isLoading: isFunction(props.defaultValues),
        isSubmitted: false,
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        submitCount: 0,
        dirtyFields: {},
        touchedFields: {},
        validatingFields: {},
        errors: props.errors || {},
        disabled: props.disabled || false,
        isReady: false,
        defaultValues: isFunction(props.defaultValues)
            ? undefined
            : props.defaultValues,
    });
    if (!_formControl.current) {
        if (props.formControl) {
            _formControl.current = {
                ...props.formControl,
                formState,
            };
            if (props.defaultValues && !isFunction(props.defaultValues)) {
                props.formControl.reset(props.defaultValues, props.resetOptions);
            }
        }
        else {
            const { formControl, ...rest } = createFormControl(props);
            _formControl.current = {
                ...rest,
                formState,
            };
        }
    }
    const control = _formControl.current.control;
    control._options = props;
    useIsomorphicLayoutEffect(() => {
        const sub = control._subscribe({
            formState: control._proxyFormState,
            callback: () => updateFormState({ ...control._formState }),
            reRenderRoot: true,
        });
        updateFormState((data) => ({
            ...data,
            isReady: true,
        }));
        control._formState.isReady = true;
        return sub;
    }, [control]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (props.mode) {
            control._options.mode = props.mode;
        }
        if (props.reValidateMode) {
            control._options.reValidateMode = props.reValidateMode;
        }
    }, [control, props.mode, props.reValidateMode]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (props.errors) {
            control._setErrors(props.errors);
            control._focusError();
        }
    }, [control, props.errors]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        props.shouldUnregister &&
            control._subjects.state.next({
                values: control._getWatch(),
            });
    }, [control, props.shouldUnregister]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (control._proxyFormState.isDirty) {
            const isDirty = control._getDirty();
            if (isDirty !== formState.isDirty) {
                control._subjects.state.next({
                    isDirty,
                });
            }
        }
    }, [control, formState.isDirty]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (props.values && !deepEqual(props.values, _values.current)) {
            control._reset(props.values, {
                keepFieldsRef: true,
                ...control._options.resetOptions,
            });
            _values.current = props.values;
            updateFormState((state) => ({ ...state }));
        }
        else {
            control._resetDefaultValues();
        }
    }, [control, props.values]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (!control._state.mount) {
            control._setValid();
            control._state.mount = true;
        }
        if (control._state.watch) {
            control._state.watch = false;
            control._subjects.state.next({ ...control._formState });
        }
        control._removeUnmounted();
    });
    _formControl.current.formState = getProxyFormState(formState, control);
    return _formControl.current;
}

/**
 * Watch component that subscribes to form field changes and re-renders when watched fields update.
 *
 * @param control - The form control object from useForm
 * @param names - Array of field names to watch for changes
 * @param render - The function that receives watched values and returns ReactNode
 * @returns The result of calling render function with watched values
 *
 * @example
 * The `Watch` component only re-render when the values of `foo`, `bar`, and `baz.qux` change.
 * The types of `foo`, `bar`, and `baz.qux` are precisely inferred.
 *
 * ```tsx
 * const { control } = useForm();
 *
 * <Watch
 *   control={control}
 *   names={['foo', 'bar', 'baz.qux']}
 *   render={([foo, bar, baz_qux]) => <div>{foo}{bar}{baz_qux}</div>}
 * />
 * ```
 */
const Watch = ({ control, names, render, }) => render(useWatch({ control, name: names }));


//# sourceMappingURL=index.esm.mjs.map


/***/ }),

/***/ "./src/blocks/click-to-share/block.json":
/*!**********************************************!*\
  !*** ./src/blocks/click-to-share/block.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"Click to Share","apiVersion":3,"name":"has/click-to-share","category":"widgets","icon":"<svg aria-hidden=\'true\' focusable=\'false\' data-prefix=\'fas\' data-icon=\'share-alt\' className=\'svg-inline--fa fa-share-alt fa-w-14\' role=\'img\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 448 512\'><path fill=\'currentColor\' d=\'M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z\'></path></svg>","description":"An easy-to-use Click to Share block.","keywords":["click","social","tweet","better","twitter","facebook","share","quote","blockquote"],"version":"1.0.0","textdomain":"highlight-and-share","attributes":{"uniqueId":{"type":"string","default":""},"showClickToShare":{"type":"number","default":true},"showIcon":{"type":"number","default":true},"iconSize":{"type":"number","default":-1},"iconSizeResponsive":{"type":"object","default":{"desktop":-1,"tablet":-1,"mobile":-1}},"customShareText":{"type":"string","default":""},"shareText":{"type":"string","default":""},"shareTextInner":{"type":"array","default":[]},"backgroundColor":{"type":"string","default":"#FFFFFF"},"backgroundColorHover":{"type":"string","default":"#FFFFFF"},"backgroundColorSync":{"type":"string","default":"normal"},"backgroundType":{"type":"string","default":"solid"},"backgroundGradient":{"type":"string","default":""},"backgroundGradientHover":{"type":"string","default":""},"backgroundGradientSync":{"type":"string","default":"normal"},"backgroundImage":{"type":"object","default":{"url":"","id":0,"backgroundColor":"#000000","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","backgroundOpacity":1,"backgroundOpacityHover":1}},"icon":{"type":"string","default":"<svg aria-hidden=\'true\'  role=\'img\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 448 512\'><path fill=\'currentColor\' d=\'M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z\'></path></svg>"},"iconColor":{"type":"string","default":"#000000"},"iconColorHover":{"type":"string","default":"#000000"},"iconColorSync":{"type":"string","default":"normal"},"textColor":{"type":"string","default":"#000000"},"textColorHover":{"type":"string","default":"#000000"},"textColorSync":{"type":"string","default":"normal"},"shareTextColor":{"type":"string","default":"#000000"},"shareTextColorHover":{"type":"string","default":"#000000"},"shareTextColorSync":{"type":"string","default":"normal"},"fontSize":{"type":"integer","default":24},"clickShareFontSize":{"type":"integer","default":24},"clickText":{"type":"string","default":"Click to Share"},"padding":{"type":"integer","default":-1},"border":{"type":"integer","default":-1},"borderRadius":{"type":"integer","default":0},"borderColor":{"type":"string","default":"#000000"},"borderColorHover":{"type":"string","default":"#000000"},"borderColorSync":{"type":"string","default":"normal"},"fontWeight":{"type":"string","default":"400"},"maxWidth":{"type":"string","default":"-1"},"maxWidthUnit":{"type":"string","default":"-1"},"maximumWidth":{"type":"object","default":{"mobile":{"width":"","unit":null},"tablet":{"width":"","unit":null},"desktop":{"width":"850","unit":"px"}}},"showClickToShareText":{"type":"object","default":{"mobile":true,"tablet":true,"desktop":true}},"showClickToShareIcon":{"type":"object","default":{"mobile":true,"tablet":true,"desktop":true}},"align":{"type":"string","default":"center"},"alignment":{"type":"string","default":"center"},"marginLeft":{"type":"integer","default":0},"marginRight":{"type":"integer","default":0},"marginBottom":{"type":"integer","default":0},"marginTop":{"type":"integer","default":0},"paddingSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"20","bottom":"20","left":"20","unit":"px","unitSync":true}}},"marginSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"","bottom":"20","left":"","unit":"px","unitSync":true}}},"borderWidth":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"1","right":"1","bottom":"1","left":"1","unit":"px","unitSync":true}}},"borderRadiusSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"","right":"","bottom":"","left":"","unit":"px","unitSync":true}}},"typographyQuote":{"type":"object","default":{"mobile":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontFallback":"","fontType":"web"},"tablet":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontFallback":"","fontType":"web"},"desktop":{"fontFamily":"Arial","fontFamilySlug":"arial","fontSize":"24","fontSizeUnit":"px","fontWeight":"normal","lineHeight":"1.3","lineHeightUnit":"em","textTransform":"none","letterSpacing":"0","letterSpacingUnit":"px","fontFallback":"serif","fontType":"web"}}},"typographyShareText":{"type":"object","default":{"mobile":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"},"tablet":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"},"desktop":{"fontFamily":"Arial","fontFamilySlug":"arial","fontSize":"24","fontSizeUnit":"px","fontWeight":"normal","lineHeight":"1.3","lineHeightUnit":"em","textTransform":"none","letterSpacing":"0","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"}}}},"supports":{"anchor":true,"align":true,"className":true},"example":{"attributes":{"backgroundColor":"#8364E8","backgroundColorHover":"#714EE5","backgroundType":"solid","iconColor":"#FFFFFF","iconColorHover":"#FFFFFF","textColor":"#FFFFFF","textColorHover":"#FFFFFF","shareTextColor":"#FFFFFF","shareTextColorHover":"#FFFFFF","clickText":"Click to share","paddingSize":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"20","bottom":"20","left":"20","unit":"px","unitSync":true}},"marginSize":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"","bottom":"20","left":"","unit":"px","unitSync":true}},"borderWidth":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"1","right":"1","bottom":"1","left":"1","unit":"px","unitSync":true}},"borderRadiusSize":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"4","right":"4","bottom":"4","left":"4","unit":"px","unitSync":true}},"typographyQuote":{"mobile":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontFallback":"","fontType":"web"},"tablet":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontFallback":"","fontType":"web"},"desktop":{"fontFamily":"Arial","fontFamilySlug":"arial","fontSize":"24","fontSizeUnit":"px","fontWeight":"normal","lineHeight":"1.3","lineHeightUnit":"em","textTransform":"none","letterSpacing":"0","letterSpacingUnit":"px","fontFallback":"serif","fontType":"web"}},"typographyShareText":{"mobile":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"},"tablet":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"},"desktop":{"fontFamily":"Arial","fontFamilySlug":"arial","fontSize":"24","fontSizeUnit":"px","fontWeight":"normal","lineHeight":"1.3","lineHeightUnit":"em","textTransform":"none","letterSpacing":"0","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"}}},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}}]},"editorScript":"has-click-to-share","editorStyle":"has-style-admin-css","style":"has-style-frontend-css"}');

/***/ }),

/***/ "./src/blocks/click-to-share/components/BlockContent.js":
/*!**************************************************************!*\
  !*** ./src/blocks/click-to-share/components/BlockContent.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _GetFontStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GetFontStyles */ "./src/blocks/click-to-share/components/GetFontStyles.js");
/* harmony import */ var _GetStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GetStyles */ "./src/blocks/click-to-share/components/GetStyles.js");
/* harmony import */ var _react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react/Hooks/useDeviceType */ "./src/react/Hooks/useDeviceType.js");
/* harmony import */ var _react_Utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Utils/sanitize-svg */ "./src/react/Utils/sanitize-svg/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var _wp$blockEditor = wp.blockEditor,
  useInnerBlocksProps = _wp$blockEditor.useInnerBlocksProps,
  RichText = _wp$blockEditor.RichText,
  store = _wp$blockEditor.store;






var BlockContent = function BlockContent(props) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes,
    isPreview = props.isPreview,
    clientId = props.clientId;
  var _useDeviceType = (0,_react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_6__["default"])('Desktop'),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 1),
    deviceType = _useDeviceType2[0];
  var innerBlocksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(store),
    replaceInnerBlocks = _useDispatch.replaceInnerBlocks;
  var innerBlockProps = useInnerBlocksProps({
    className: 'has-click-to-share-text has-click-to-share__share-text',
    ref: innerBlocksRef
  }, {
    allowedBlocks: ['core/paragraph'],
    template: [['core/paragraph', {
      placeholder: ''
    }]],
    templateInsertUpdatesSelection: true
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isPreview !== null && isPreview !== void 0 ? isPreview : false),
    _useState2 = _slicedToArray(_useState, 1),
    isBlockPreview = _useState2[0];
  var shareText = attributes.shareText,
    backgroundType = attributes.backgroundType,
    showClickToShare = attributes.showClickToShare,
    showIcon = attributes.showIcon,
    iconSize = attributes.iconSize,
    clickText = attributes.clickText,
    uniqueId = attributes.uniqueId,
    typographyQuote = attributes.typographyQuote,
    typographyShareText = attributes.typographyShareText,
    showClickToShareText = attributes.showClickToShareText,
    showClickToShareIcon = attributes.showClickToShareIcon,
    icon = attributes.icon;

  /**
   * Migrate RichText to InnerBlocks.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Port shareText attribute to use innerBlocks instead.
    if (shareText !== '' && null !== innerBlocksRef.current && !isBlockPreview) {
      // Convert text over to blocks.
      var richTextConvertedToBlocks = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.rawHandler)({
        HTML: shareText
      });
      replaceInnerBlocks(clientId, richTextConvertedToBlocks);
      setAttributes({
        shareText: ''
      });
    }
  }, [innerBlocksRef]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_GetFontStyles__WEBPACK_IMPORTED_MODULE_4__["default"], {
    fontObject: typographyQuote
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_GetFontStyles__WEBPACK_IMPORTED_MODULE_4__["default"], {
    fontObject: typographyShareText
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_GetStyles__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes,
    isPreview: isBlockPreview
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('has-click-to-share', {
      'has-background-color': 'solid' === backgroundType,
      'has-background-gradient': 'gradient' === backgroundType,
      'has-background-image': 'image' === backgroundType
    }),
    id: uniqueId
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-click-to-share-wrapper"
  }, isBlockPreview && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-click-to-share-text has-click-to-share__share-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Vivamus commodo nunc arcu, finibus cursus felis porta a. Nam ultrices, turpis eu fringilla molestie, lorem libero."))), !isBlockPreview && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", innerBlockProps)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-click-to-share-cta"
  }, (typeof showClickToShareText !== 'undefined' && showClickToShareText[deviceType.toLowerCase()] || isBlockPreview) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, clickText, " "), (typeof showClickToShareIcon !== 'undefined' && showClickToShareIcon[deviceType.toLowerCase()] || isBlockPreview) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "has-click-to-share-icon-block-editor",
    dangerouslySetInnerHTML: {
      __html: (0,_react_Utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_7__["default"])(icon)
    }
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockContent);

/***/ }),

/***/ "./src/blocks/click-to-share/components/ColorPickerHover/SyncModal.js":
/*!****************************************************************************!*\
  !*** ./src/blocks/click-to-share/components/ColorPickerHover/SyncModal.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./src/blocks/click-to-share/components/ColorPickerHover/context.js");
/* harmony import */ var _react_Components_Icons_ColorCircle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../react/Components/Icons/ColorCircle */ "./src/react/Components/Icons/ColorCircle.js");





var ApplyColorSyncModal = function ApplyColorSyncModal(props) {
  var hoverColor = props.hoverColor,
    normalColor = props.normalColor,
    syncTitle = props.syncTitle;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__["default"]),
    showApplyColorSyncModal = _useContext.showApplyColorSyncModal,
    setShowApplyColorSyncModal = _useContext.setShowApplyColorSyncModal;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: syncTitle,
    onRequestClose: function onRequestClose() {
      props.onClose();
    },
    className: "has-preset-modal",
    shouldCloseOnClickOutside: true,
    isDismissible: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Which color would you like to use as the sync value?', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "has-color-sync-modal-button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      props.onOptionSelect('normal');
      setShowApplyColorSyncModal(false);
    },
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_Icons_ColorCircle__WEBPACK_IMPORTED_MODULE_4__["default"], {
      style: {
        color: normalColor
      }
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use Normal Color', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      props.onOptionSelect('hover');
      setShowApplyColorSyncModal(false);
    },
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_Icons_ColorCircle__WEBPACK_IMPORTED_MODULE_4__["default"], {
      style: {
        color: hoverColor
      }
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use Hover Color', 'highlight-and-share'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApplyColorSyncModal);

/***/ }),

/***/ "./src/blocks/click-to-share/components/ColorPickerHover/context.js":
/*!**************************************************************************!*\
  !*** ./src/blocks/click-to-share/components/ColorPickerHover/context.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ApplyColorSyncContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApplyColorSyncContext);

/***/ }),

/***/ "./src/blocks/click-to-share/components/ColorPickerHover/index.js":
/*!************************************************************************!*\
  !*** ./src/blocks/click-to-share/components/ColorPickerHover/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./src/blocks/click-to-share/components/ColorPickerHover/context.js");
/* harmony import */ var _picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./picker */ "./src/blocks/click-to-share/components/ColorPickerHover/picker.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var ColorPickerHover = function ColorPickerHover(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showApplyColorSyncModal = _useState2[0],
    setShowApplyColorSyncModal = _useState2[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_context__WEBPACK_IMPORTED_MODULE_1__["default"].Provider, {
    value: {
      showApplyColorSyncModal: showApplyColorSyncModal,
      setShowApplyColorSyncModal: setShowApplyColorSyncModal
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_picker__WEBPACK_IMPORTED_MODULE_2__["default"], props));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPickerHover);

/***/ }),

/***/ "./src/blocks/click-to-share/components/ColorPickerHover/picker.js":
/*!*************************************************************************!*\
  !*** ./src/blocks/click-to-share/components/ColorPickerHover/picker.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../react/Components/ColorPicker */ "./src/react/Components/ColorPicker/index.js");
/* harmony import */ var _SyncModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SyncModal */ "./src/blocks/click-to-share/components/ColorPickerHover/SyncModal.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context */ "./src/blocks/click-to-share/components/ColorPickerHover/context.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var ColorPickerHoverControl = function ColorPickerHoverControl(props) {
  var palette = has_gutenberg.colorPalette;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_4__["default"]),
    showApplyColorSyncModal = _useContext.showApplyColorSyncModal,
    setShowApplyColorSyncModal = _useContext.setShowApplyColorSyncModal;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('sync' === props.isSync ? 'sync' : 'normal'),
    _useState2 = _slicedToArray(_useState, 2),
    colorMode = _useState2[0],
    setColorMode = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.normalColor),
    _useState4 = _slicedToArray(_useState3, 2),
    normalColor = _useState4[0],
    setNormalColor = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.hoverColor),
    _useState6 = _slicedToArray(_useState5, 2),
    hoverColor = _useState6[0],
    setHoverColor = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.normalColor),
    _useState8 = _slicedToArray(_useState7, 2),
    syncColor = _useState8[0],
    setSyncColor = _useState8[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-color-picker-hover"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-color-picker-hover__color-mode"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    isSmall: true,
    onClick: function onClick() {
      return setColorMode('normal');
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'is-primary': 'normal' === colorMode
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Normal', 'highlight-and-share')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Normal', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    isSmall: true,
    onClick: function onClick() {
      return setColorMode('hover');
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'is-primary': 'hover' === colorMode
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Hover State', 'highlight-and-share')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Hover', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    isSmall: true,
    onClick: function onClick(e) {
      if ('sync' === colorMode) {
        e.preventDefault();
        return;
      }
      if (normalColor === hoverColor) {
        setSyncColor(normalColor);
        setColorMode('sync');
      } else {
        setShowApplyColorSyncModal(true);
      }
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'is-primary': 'sync' === colorMode
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Sync Normal and Hover Colors', 'highlight-and-share')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Sync', 'highlight-and-share'))), 'normal' === colorMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: normalColor,
    props: props.slug,
    onChange: function onChange(slug, newValue) {
      setNormalColor(newValue);
      props.onChange(newValue, hoverColor, colorMode);
    },
    label: props.label,
    defaultColors: palette,
    defaultColor: normalColor,
    slug: props.slug
  }), 'hover' === colorMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: hoverColor,
    props: props.slug + '-hover',
    onChange: function onChange(slug, newValue) {
      setHoverColor(newValue);
      props.onChange(normalColor, newValue, colorMode);
    },
    label: props.label,
    defaultColors: palette,
    defaultColor: hoverColor,
    slug: props.slug + '-hover'
  }), 'sync' === colorMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: syncColor,
    key: props.slug + '-sync',
    onChange: function onChange(slug, newValue) {
      setNormalColor(newValue);
      setHoverColor(newValue);
      setSyncColor(newValue);
      props.onChange(newValue, newValue, colorMode);
    },
    label: props.label,
    defaultColors: palette,
    defaultColor: syncColor,
    slug: props.slug + '-sync'
  })), showApplyColorSyncModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SyncModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    syncTitle: props.syncTitle,
    onOptionSelect: function onOptionSelect(option) {
      setColorMode('sync');
      if ('normal' === option) {
        setNormalColor(normalColor);
        setHoverColor(normalColor);
        setSyncColor(normalColor);
        props.onChange(normalColor, normalColor, 'sync');
      } else if ('hover' === option) {
        setNormalColor(hoverColor);
        setHoverColor(hoverColor);
        setSyncColor(hoverColor);
        props.onChange(hoverColor, hoverColor, 'sync');
      }
    },
    onClose: function onClose() {
      setShowApplyColorSyncModal(false);
    },
    normalColor: normalColor,
    hoverColor: hoverColor
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPickerHoverControl);

/***/ }),

/***/ "./src/blocks/click-to-share/components/CustomPresets/CustomPresetContainer.js":
/*!*************************************************************************************!*\
  !*** ./src/blocks/click-to-share/components/CustomPresets/CustomPresetContainer.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./src/blocks/click-to-share/components/CustomPresets/context.js");
/* harmony import */ var _CustomPresetSaveModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CustomPresetSaveModal */ "./src/blocks/click-to-share/components/CustomPresets/CustomPresetSaveModal.js");
/* harmony import */ var _PresetButtonEdit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../PresetButtonEdit */ "./src/blocks/click-to-share/components/PresetButtonEdit.js");
/* harmony import */ var _CustomPresetEditModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CustomPresetEditModal */ "./src/blocks/click-to-share/components/CustomPresets/CustomPresetEditModal.js");
/* harmony import */ var _CustomPresetDeleteModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CustomPresetDeleteModal */ "./src/blocks/click-to-share/components/CustomPresets/CustomPresetDeleteModal.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








var CustomPresetContainer = function CustomPresetContainer(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('new'),
    _useState4 = _slicedToArray(_useState3, 2),
    presetSaveType = _useState4[0],
    setPresetSaveType = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    presetSaveLabel = _useState6[0],
    setPresetSaveLabel = _useState6[1];
  var setAttributes = props.setAttributes,
    clientId = props.clientId,
    uniqueId = props.uniqueId;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__["default"]),
    savedPresets = _useContext.savedPresets,
    setSavedPresets = _useContext.setSavedPresets,
    savingPreset = _useContext.savingPreset,
    setSavingPreset = _useContext.setSavingPreset,
    editPresets = _useContext.editPresets,
    setEditPresets = _useContext.setEditPresets,
    showEditModal = _useContext.showEditModal,
    showDeleteModal = _useContext.showDeleteModal;
  var presetContainer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (presetContainer.current) {
      // Perform fetch request to ajax endpoint.
      var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
      var data = new FormData();
      data.append('action', 'has_load_presets');
      data.append('nonce', has_gutenberg.blockPresetsNonceRetrieve);
      fetch(ajaxUrl, {
        method: 'POST',
        body: data,
        /* get return in json */
        headers: {
          Accept: 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        var presets = json.data.presets;
        setLoading(false);
        setSavedPresets(presets);
      })["catch"](function (error) {
        setLoading(false);
      });
    }
  }, [presetContainer]);

  /**
   * Show a loading spinner.
   *
   * @param {string} label Label of the loading spinner.
   * @return {JSX} Loading spinner.
   */
  var showLoading = function showLoading(label) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-custom-preset-loading-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "has-custom-preset-loading-label"
    }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null));
  };
  var getSavedPresets = function getSavedPresets() {
    if (savedPresets.length > 0) {
      // Map to preset buttons.
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "has-presets"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, null, savedPresets.map(function (preset) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PresetButtonEdit__WEBPACK_IMPORTED_MODULE_5__["default"], {
          key: preset.id,
          editId: preset.id,
          title: preset.title,
          setAttributes: setAttributes,
          uniqueId: uniqueId,
          clientId: clientId,
          slug: preset.slug,
          attributes: preset.content.attributes,
          saveNonce: preset.save_nonce,
          deleteNonce: preset.delete_nonce
        });
      })));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No custom presets have been saved yet.', 'highlight-and-share')));
  };

  // Read in localized var and determine if user can save or edit presets.
  var canSavePresets = has_gutenberg.canEditOthersPosts;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, showEditModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetEditModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
    editId: showEditModal.editId,
    title: showEditModal.title,
    saveNonce: showEditModal.saveNonce
  }), showDeleteModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetDeleteModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
    editId: showDeleteModal.editId,
    title: showDeleteModal.title,
    deleteNonce: showDeleteModal.deleteNonce
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-custom-preset-container",
    ref: presetContainer
  }, loading && showLoading('Loading Presets'), !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, getSavedPresets(), canSavePresets && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-custom-preset-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preset Actions', 'highlight-and-share')), !editPresets && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'primary',
    onClick: function onClick(e) {
      e.preventDefault();
      setSavingPreset(true);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save New Preset', 'highlight-and-share')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save New Preset', 'highlight-and-share')), !editPresets && !savingPreset && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(e) {
      e.preventDefault();
      setEditPresets(true);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit Presets', 'highlight-and-share')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit Presets', 'highlight-and-share')), editPresets && !savingPreset && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'primary',
    onClick: function onClick(e) {
      e.preventDefault();
      setEditPresets(false);
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exit Edit Mode', 'highlight-and-share')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exit Edit Mode', 'highlight-and-share')))), savingPreset && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetSaveModal__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Preset', 'highlight-and-share')
  }, props))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomPresetContainer);

/***/ }),

/***/ "./src/blocks/click-to-share/components/CustomPresets/CustomPresetDeleteModal.js":
/*!***************************************************************************************!*\
  !*** ./src/blocks/click-to-share/components/CustomPresets/CustomPresetDeleteModal.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context */ "./src/blocks/click-to-share/components/CustomPresets/context.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var CustomPresetDeleteModal = function CustomPresetDeleteModal(props) {
  var title = props.title,
    editId = props.editId,
    deleteNonce = props.deleteNonce;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDeleting = _useState2[0],
    setIsDeleting = _useState2[1];
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_4__["default"]),
    setSavedPresets = _useContext.setSavedPresets,
    showDeleteModal = _useContext.showDeleteModal,
    setShowDeleteModal = _useContext.setShowDeleteModal;
  var getDefaultValues = function getDefaultValues() {
    return {
      editId: editId
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit;
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors;
  var onSubmit = function onSubmit(formData) {
    setIsDeleting(true);
    var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
    var data = new FormData();
    data.append('action', 'has_delete_preset');
    data.append('nonce', deleteNonce);
    data.append('editId', formData.editId);
    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var presets = json.data.presets;
      setSavedPresets(presets);
      setIsDeleting(false);
      setShowDeleteModal(false);
    })["catch"](function (error) {
      setIsDeleting(false);
    });
  };

  // Don't show modal unless explicitly set.
  if (!showDeleteModal) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete Preset', 'highlight-and-share'),
    onRequestClose: function onRequestClose() {
      return setShowDeleteModal(false);
    },
    className: "has-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.Controller, {
    name: "editId",
    control: control,
    render: function render(_ref) {
      var field = _ref.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({
        type: "hidden"
      }, field));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "has-preset-modal-apply-button",
    disabled: isDeleting
  }, isDeleting ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Deleting…', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete Preset', 'highlight-and-share')), !isDeleting && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      setShowDeleteModal(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cancel', 'highlight-and-share'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomPresetDeleteModal);

/***/ }),

/***/ "./src/blocks/click-to-share/components/CustomPresets/CustomPresetEditModal.js":
/*!*************************************************************************************!*\
  !*** ./src/blocks/click-to-share/components/CustomPresets/CustomPresetEditModal.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _react_Components_Icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../react/Components/Icons/CircularExplanation */ "./src/react/Components/Icons/CircularExplanation.js");
/* harmony import */ var _react_Components_Notice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../react/Components/Notice */ "./src/react/Components/Notice/index.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./context */ "./src/blocks/click-to-share/components/CustomPresets/context.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var CustomPresetEditModal = function CustomPresetEditModal(props) {
  var _errors$title, _errors$title2;
  var title = props.title,
    editId = props.editId,
    saveNonce = props.saveNonce;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSaving = _useState2[0],
    setIsSaving = _useState2[1];
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_6__["default"]),
    setSavedPresets = _useContext.setSavedPresets,
    showEditModal = _useContext.showEditModal,
    setShowEditModal = _useContext.setShowEditModal;
  var getDefaultValues = function getDefaultValues() {
    return {
      title: title,
      editId: editId
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit;
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors;
  var onSubmit = function onSubmit(formData) {
    setIsSaving(true);
    var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
    var data = new FormData();
    data.append('action', 'has_save_preset');
    data.append('nonce', saveNonce);
    data.append('editId', formData.editId);
    data.append('title', formData.title);
    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var presets = json.data.presets;
      setSavedPresets(presets);
      setIsSaving(false);
      setShowEditModal(false);
    })["catch"](function (error) {
      setIsSaving(false);
    });
  };

  // Don't show modal unless explicitly set.
  if (!showEditModal) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Update Preset', 'highlight-and-share'),
    onRequestClose: function onRequestClose() {
      return setShowEditModal(false);
    },
    className: "has-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.Controller, {
    name: "title",
    control: control,
    rules: {
      required: true,
      pattern: /^[a-zA-Z0-9-_ ]+$/
    },
    render: function render(_ref) {
      var field = _ref.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({}, field, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Preset Name', 'highlight-and-share'),
        className: "is-required"
      }));
    }
  }), 'required' === ((_errors$title = errors.title) === null || _errors$title === void 0 ? void 0 : _errors$title.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_Notice__WEBPACK_IMPORTED_MODULE_5__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is required.'),
    status: "error",
    politeness: "assertive",
    icon: _react_Components_Icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_4__["default"]
  }), 'pattern' === ((_errors$title2 = errors.title) === null || _errors$title2 === void 0 ? void 0 : _errors$title2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_Notice__WEBPACK_IMPORTED_MODULE_5__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field contains invalid characters.'),
    status: "error",
    politeness: "assertive",
    icon: _react_Components_Icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_4__["default"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.Controller, {
    name: "editId",
    control: control,
    render: function render(_ref2) {
      var field = _ref2.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({
        type: "hidden"
      }, field));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "has-preset-modal-apply-button",
    disabled: isSaving
  }, isSaving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Apply Changes', 'highlight-and-share')), !isSaving && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      setShowEditModal(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cancel', 'highlight-and-share'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomPresetEditModal);

/***/ }),

/***/ "./src/blocks/click-to-share/components/CustomPresets/CustomPresetSaveModal.js":
/*!*************************************************************************************!*\
  !*** ./src/blocks/click-to-share/components/CustomPresets/CustomPresetSaveModal.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context */ "./src/blocks/click-to-share/components/CustomPresets/context.js");
/* harmony import */ var _react_Components_Icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../react/Components/Icons/CircularExplanation */ "./src/react/Components/Icons/CircularExplanation.js");
/* harmony import */ var _react_Components_Notice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../react/Components/Notice */ "./src/react/Components/Notice/index.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var CustomPresetSaveModal = function CustomPresetSaveModal(props) {
  var _errors$presetTitle, _errors$presetTitle2, _errors$selectedPrese;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('new'),
    _useState2 = _slicedToArray(_useState, 2),
    presetSaveType = _useState2[0],
    setPresetSaveType = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isSaving = _useState4[0],
    setIsSaving = _useState4[1];
  var title = props.title,
    attributes = props.attributes,
    setAttributes = props.setAttributes,
    clientId = props.clientId;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_4__["default"]),
    savedPresets = _useContext.savedPresets,
    setSavedPresets = _useContext.setSavedPresets,
    savingPreset = _useContext.savingPreset,
    setSavingPreset = _useContext.setSavingPreset;
  var getDefaultValues = function getDefaultValues() {
    return {
      presetTitle: '',
      selectedPreset: null
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    setValue = _useForm.setValue;
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors;
  var onSubmit = function onSubmit(formData) {
    if ('new' === presetSaveType) {
      saveNewPreset(formData);
    } else {
      overridePreset(formData);
    }
  };

  /**
   * Save a new preset via Ajax.
   *
   * @param {Array} formData Form data array.
   */
  var saveNewPreset = function saveNewPreset(formData) {
    setIsSaving(true);
    var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
    var data = new FormData();
    data.append('action', 'has_save_presets');
    data.append('nonce', has_gutenberg.blockPresetsNonceSave);
    data.append('attributes', JSON.stringify(attributes));
    data.append('formData', JSON.stringify(formData));
    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var presets = json.data.presets;
      setIsSaving(false);
      setSavingPreset(false);
      setSavedPresets(presets);
    })["catch"](function (error) {
      setSavingPreset(false);
    });
  };

  /**
   * Save a new preset via Ajax.
   *
   * @param {Array} formData Form data array.
   */
  var overridePreset = function overridePreset(formData) {
    setIsSaving(true);
    var ajaxUrl = "".concat(ajaxurl); // eslint-disable-line no-undef
    var data = new FormData();
    data.append('action', 'has_override_preset');
    data.append('nonce', has_gutenberg.blockPresetsNonceSave);
    data.append('attributes', JSON.stringify(attributes));
    data.append('editId', formData.selectedPreset);
    fetch(ajaxUrl, {
      method: 'POST',
      body: data,
      /* get return in json */
      headers: {
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      var presets = json.data.presets;
      setIsSaving(false);
      setSavingPreset(false);
      setSavedPresets(presets);
    })["catch"](function (error) {
      setSavingPreset(false);
    });
  };

  /**
   * Get the preset options in radio group format.
   *
   * @return {Array} Array of objects with label and value properties.
   */
  var getPresetRadioOptions = function getPresetRadioOptions() {
    var options = [];
    savedPresets.forEach(function (preset) {
      options.push({
        label: preset.title,
        value: preset.id + ''
      });
    });
    return options;
  };
  var radioOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Preset', 'highlight-and-share'),
    value: 'new'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Override Preset', 'highlight-and-share'),
    value: 'override'
  }];
  if (savedPresets.length === 0) {
    radioOptions = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Preset', 'highlight-and-share'),
      value: 'new'
    }];
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-custom-preset-modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: title,
    onRequestClose: function onRequestClose() {
      return setSavingPreset(false);
    },
    className: "has-preset-modal",
    shouldCloseOnClickOutside: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save a new preset or override an existing one.', 'highlight-and-share'),
    className: "has-preset-modal-radio-control",
    selected: presetSaveType,
    options: radioOptions,
    onChange: function onChange(value) {
      setPresetSaveType(value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, 'new' === presetSaveType && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-preset-modal-new-preset"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.Controller, {
    name: "presetTitle",
    control: control,
    rules: {
      required: true,
      pattern: /^[a-zA-Z0-9-_ ]+$/
    },
    render: function render(_ref) {
      var field = _ref.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({}, field, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Preset Name', 'highlight-and-share'),
        className: "is-required"
      }));
    }
  }), 'required' === ((_errors$presetTitle = errors.presetTitle) === null || _errors$presetTitle === void 0 ? void 0 : _errors$presetTitle.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_Notice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is required.'),
    status: "error",
    politeness: "assertive",
    icon: _react_Components_Icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_5__["default"]
  }), 'pattern' === ((_errors$presetTitle2 = errors.presetTitle) === null || _errors$presetTitle2 === void 0 ? void 0 : _errors$presetTitle2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_Notice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field contains invalid characters.'),
    status: "error",
    politeness: "assertive",
    icon: _react_Components_Icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_5__["default"]
  }))), 'override' === presetSaveType && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, savedPresets.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-preset-modal-override-preset"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_2__.Controller, {
    name: "selectedPreset",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a preset to override', 'highlight-and-share'),
        className: "is-required",
        selected: value,
        options: getPresetRadioOptions(),
        onChange: function onChange(radioValue) {
          return _onChange(radioValue);
        }
      });
    }
  }), 'required' === ((_errors$selectedPrese = errors.selectedPreset) === null || _errors$selectedPrese === void 0 ? void 0 : _errors$selectedPrese.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_Notice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is required.'),
    status: "error",
    politeness: "assertive",
    icon: _react_Components_Icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_5__["default"]
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-preset-modal-button-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    type: "submit",
    variant: "primary",
    className: "has-preset-modal-apply-button",
    disabled: isSaving
  }, isSaving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Preset', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      setSavingPreset(false);
    },
    className: "has-preset-modal-cancel-button",
    disabled: isSaving
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cancel', 'highlight-and-share'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomPresetSaveModal);

/***/ }),

/***/ "./src/blocks/click-to-share/components/CustomPresets/context.js":
/*!***********************************************************************!*\
  !*** ./src/blocks/click-to-share/components/CustomPresets/context.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CustomPresetsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomPresetsContext);

/***/ }),

/***/ "./src/blocks/click-to-share/components/CustomPresets/index.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/click-to-share/components/CustomPresets/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./src/blocks/click-to-share/components/CustomPresets/context.js");
/* harmony import */ var _CustomPresetContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomPresetContainer */ "./src/blocks/click-to-share/components/CustomPresets/CustomPresetContainer.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var CustomPresets = function CustomPresets(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    savedPresets = _useState2[0],
    setSavedPresets = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    savingPreset = _useState4[0],
    setSavingPreset = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    editPresets = _useState6[0],
    setEditPresets = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showEditModal = _useState8[0],
    setShowEditModal = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    showDeleteModal = _useState0[0],
    setShowDeleteModal = _useState0[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_context__WEBPACK_IMPORTED_MODULE_1__["default"].Provider, {
    value: {
      savedPresets: savedPresets,
      setSavedPresets: setSavedPresets,
      savingPreset: savingPreset,
      setSavingPreset: setSavingPreset,
      editPresets: editPresets,
      setEditPresets: setEditPresets,
      showEditModal: showEditModal,
      setShowEditModal: setShowEditModal,
      showDeleteModal: showDeleteModal,
      setShowDeleteModal: setShowDeleteModal
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomPresetContainer__WEBPACK_IMPORTED_MODULE_2__["default"], props));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomPresets);

/***/ }),

/***/ "./src/blocks/click-to-share/components/GetFontStyles.js":
/*!***************************************************************!*\
  !*** ./src/blocks/click-to-share/components/GetFontStyles.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/Hooks/useDeviceType */ "./src/react/Hooks/useDeviceType.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Block Functions.
 */


var GetFontStyles = function GetFontStyles(props) {
  var _useDeviceType = (0,_react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_1__["default"])('Desktop'),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 1),
    deviceType = _useDeviceType2[0];
  var fontObject = props.fontObject;
  if ('undefined' === typeof fontObject) {
    return null;
  }
  var fontType = fontObject.desktop.fontType;
  var fontSlug = fontObject.desktop.fontFamilySlug;
  if ('google' === fontType) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("link", {
      rel: "stylesheet",
      href: "".concat(has_gutenberg.cssFolder, "/has-gfont-").concat(fontSlug, ".css")
    }));
  }
  if ('adobe' === fontType) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("link", {
      rel: "stylesheet",
      href: "".concat(has_gutenberg.adobeFontsUrl, "/").concat(has_gutenberg.adobeProjectId, ".css")
    }));
  }
  return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GetFontStyles);

/***/ }),

/***/ "./src/blocks/click-to-share/components/GetStyles.js":
/*!***********************************************************!*\
  !*** ./src/blocks/click-to-share/components/GetStyles.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../react/Hooks/useDeviceType */ "./src/react/Hooks/useDeviceType.js");
/* harmony import */ var _react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react/Utils/DimensionsHelper */ "./src/react/Utils/DimensionsHelper.js");
/* harmony import */ var _react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../react/Utils/TypographyHelper */ "./src/react/Utils/TypographyHelper.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var escapeEditableHTML = wp.escapeHtml.escapeEditableHTML;



var GetStyles = function GetStyles(props) {
  var attributes = props.attributes,
    isPreview = props.isPreview;
  var _useDeviceType = (0,_react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_1__["default"])('Desktop'),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 1),
    deviceType = _useDeviceType2[0];
  var backgroundType = attributes.backgroundType,
    backgroundColor = attributes.backgroundColor,
    backgroundColorHover = attributes.backgroundColorHover,
    backgroundGradient = attributes.backgroundGradient,
    backgroundGradientHover = attributes.backgroundGradientHover,
    backgroundImage = attributes.backgroundImage,
    textColor = attributes.textColor,
    textColorHover = attributes.textColorHover,
    shareTextColor = attributes.shareTextColor,
    shareTextColorHover = attributes.shareTextColorHover,
    borderColor = attributes.borderColor,
    iconColor = attributes.iconColor,
    iconColorHover = attributes.iconColorHover,
    borderColorHover = attributes.borderColorHover,
    clickShareFontSize = attributes.clickShareFontSize,
    maximumWidth = attributes.maximumWidth,
    marginSize = attributes.marginSize,
    paddingSize = attributes.paddingSize,
    borderWidth = attributes.borderWidth,
    borderRadiusSize = attributes.borderRadiusSize,
    uniqueId = attributes.uniqueId,
    typographyQuote = attributes.typographyQuote,
    typographyShareText = attributes.typographyShareText,
    iconSizeResponsive = attributes.iconSizeResponsive,
    showClickToShareText = attributes.showClickToShareText;
  var screenSize = deviceType.toLowerCase();
  var styles = "\n\t\t#".concat(uniqueId, ".has-click-to-share {\n\t\t\tmargin: ").concat((0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_2__.buildDimensionsCSS)(marginSize, deviceType), ";\n\t\t\tborder-radius: ").concat((0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_2__.buildDimensionsCSS)(borderRadiusSize, deviceType), ";\n\t\t\tborder-style: solid;\n\t\t\tborder-width: ").concat((0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_2__.buildDimensionsCSS)(borderWidth, deviceType), ";\n\t\t\tmax-width: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(maximumWidth, screenSize, maximumWidth[screenSize].width, 'maxWidth')).concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(maximumWidth, screenSize, maximumWidth[screenSize].unit, 'maxWidth'), ";\n\t\t\toverflow: hidden;\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share .has-click-to-share-cta,\n\t\t#").concat(uniqueId, ".has-click-to-share .has-click-to-share-text {\n\t\t\tposition: relative;\n\t\t\tz-index: 2;\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share .has-click-to-share-wrapper {\n\t\t\tposition: relative;\n\t\t\tpadding: ").concat((0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_2__.buildDimensionsCSS)(paddingSize, deviceType), ";\n\t\t\tfont-size: ").concat(clickShareFontSize, "px;\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-color {\n\t\t\tbackground-color: ").concat(backgroundColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-color:hover {\n\t\t\tbackground-color: ").concat(backgroundColorHover, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-gradient {\n\t\t\tbackground-image: ").concat(backgroundGradient, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-gradient:hover {\n\t\t\tbackground-image: ").concat(backgroundGradientHover, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share {\n\t\t\tborder-color: ").concat(borderColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share:hover {\n\t\t\tborder-color: ").concat(borderColorHover, ";\n\t\t}\n\t\t\n\t\t#").concat(uniqueId, " .has-click-to-share-cta {\n\t\t\tcolor: ").concat(shareTextColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-cta {\n\t\t\tcolor: ").concat(shareTextColorHover, ";\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-text,\n\t\t#").concat(uniqueId, " .has-click-to-share-text p {\n\t\t\tcolor: ").concat(textColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-text,\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-text p {\n\t\t\tcolor: ").concat(textColorHover, ";\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-cta svg {\n\t\t\tcolor: ").concat(iconColor, ";\n\t\t\twidth: ").concat(iconSizeResponsive[deviceType.toLowerCase()], "px;\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-cta svg {\n\t\t\tcolor: ").concat(iconColorHover, ";\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-text,\n\t\t#").concat(uniqueId, " .has-click-to-share-text p {\n\t\t\tfont-family: \"").concat(typographyQuote.desktop.fontFamily, "\";\n\t\t\tfont-weight: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].fontWeight, 'fontWeight'), ";\n\t\t\tfont-size: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].fontSize, 'fontSize') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.getHierarchicalValueUnit)(typographyQuote, screenSize, typographyQuote[screenSize].fontSizeUnit, 'fontSizeUnit'), ";\n\t\t\tline-height: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].lineHeight, 'lineHeight') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.getHierarchicalValueUnit)(typographyQuote, screenSize, typographyQuote[screenSize].lineHeightUnit, 'lineHeightUnit'), ";\n\t\t\tletter-spacing: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].letterSpacing, 'letterSpacing') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.getHierarchicalValueUnit)(typographyQuote, screenSize, typographyQuote[screenSize].letterSpacingUnit, 'letterSpacingUnit'), ";\n\t\t\ttext-transform: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].textTransform, 'textTransform'), ";\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-cta,\n\t\t#").concat(uniqueId, " .has-click-to-share-cta p {\n\t\t\tfont-family: \"").concat(typographyShareText.desktop.fontFamily, "\";\n\t\t\tfont-weight: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].fontWeight, 'fontWeight'), ";\n\t\t\tfont-size: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].fontSize, 'fontSize') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.getHierarchicalValueUnit)(typographyShareText, screenSize, typographyShareText[screenSize].fontSizeUnit, 'fontSizeUnit'), ";\n\t\t\tline-height: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].lineHeight, 'lineHeight') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.getHierarchicalValueUnit)(typographyShareText, screenSize, typographyShareText[screenSize].lineHeightUnit, 'lineHeightUnit'), ";\n\t\t\tletter-spacing: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].letterSpacing, 'letterSpacing') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.getHierarchicalValueUnit)(typographyShareText, screenSize, typographyShareText[screenSize].letterSpacingUnit, 'letterSpacingUnit'), ";\n\t\t\ttext-transform: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_3__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].textTransform, 'textTransform'), ";\n\t\t}\n\t");
  var backgroundImageStyles = '';
  if ('image' === backgroundType) {
    backgroundImageStyles = "\n\t\t#".concat(uniqueId, ".has-click-to-share.has-background-image {\n\t\t\tbackground-color: ").concat(backgroundImage.backgroundColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-image .has-click-to-share-wrapper:after{\n\t\t\tdisplay: block;\n\t\t\tcontent: '';\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tz-index: 1;\n\t\t\tbackground-image: url('").concat(decodeURIComponent(encodeURIComponent(backgroundImage.url)), " ');\n\t\t\tbackground-position: ").concat(escapeEditableHTML(backgroundImage.backgroundPosition), ";\n\t\t\tbackground-repeat: ").concat(escapeEditableHTML(backgroundImage.backgroundRepeat), ";\n\t\t\tbackground-size: ").concat(escapeEditableHTML(backgroundImage.backgroundSize), ";\n\t\t\topacity: ").concat(parseFloat(backgroundImage.backgroundOpacity), ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-image .has-click-to-share-wrapper:hover:after {\n\t\t\topacity: ").concat(parseFloat(backgroundImage.backgroundOpacityHover), ";\n\t\t}\n\t\t");
  }
  var previewStyles = '';
  if (isPreview) {
    previewStyles = "\n\t\t\t#".concat(uniqueId, ".has-click-to-share p {\n\t\t\t\tfont-size: 12px;\n\t\t\t}\n\t\t\t#").concat(uniqueId, ".has-click-to-share .has-click-to-share-cta {\n\t\t\t\tfont-size: 12px;\n\t\t\t}\n\t\t\t#").concat(uniqueId, ".has-click-to-share .has-click-to-share-cta svg {\n\t\t\t\twidth: 12px !important;\n\t\t\t\theight: 12px !important;\n\t\t\t}\n\t\t");
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", null, styles), 'image' === backgroundType && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", null, backgroundImageStyles), isPreview && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", null, previewStyles));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GetStyles);

/***/ }),

/***/ "./src/blocks/click-to-share/components/IconPicker/index.js":
/*!******************************************************************!*\
  !*** ./src/blocks/click-to-share/components/IconPicker/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _react_Utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../react/Utils/sanitize-svg */ "./src/react/Utils/sanitize-svg/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var IconPicker = function IconPicker(props) {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isCustomIcon = _useState2[0],
    setIsCustomIcon = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(props.defaultSvg),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedIcon = _useState4[0],
    setSelectedIcon = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isPopoverVisible = _useState6[0],
    setIsPopOverVisible = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isFocusedOutside = _useState8[0],
    setIsFocusedOutside = _useState8[1];
  var defaultSvg = props.defaultSvg,
    setAttributes = props.setAttributes,
    icons = props.icons;

  /**
   * Retrieve popover content for custom icons or regular icons.
   *
   * @return {string} Popover content.
   */
  var getPopoverContent = function getPopoverContent() {
    if (!isCustomIcon) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
        className: "has-icon-list"
      }, Object.keys(icons).map(function (svg, i) {
        return /*#__PURE__*/React.createElement("li", {
          key: "has-icon-".concat(i)
        }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
          text: icons[svg].label
        }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          className: "editor-block-list-item-button",
          onClick: function onClick() {
            setAttributes({
              icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.renderToString)(icons[svg].icon)
            });
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "editor-block-types-list__item-icon"
        }, icons[svg].icon))));
      })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        className: "has-custom-icon-button",
        variant: "secondary",
        showTooltip: true,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add in a custom SVG instead of selecting an icon.', 'highlight-and-share'),
        onClick: function onClick() {
          setIsCustomIcon(true);
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Set a Custom Icon', 'highlight-and-share')));
    }
    // Return custom icon interface.
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "has-custom-icon-preview"
    }, /*#__PURE__*/React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: (0,_react_Utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_3__["default"])(selectedIcon)
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "has-custom-icon-input"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('SVG Code', 'highlight-and-share'),
      value: (0,_react_Utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_3__["default"])(selectedIcon),
      onChange: function onChange(value) {
        setSelectedIcon(value);
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "primary",
      onClick: function onClick() {
        setAttributes({
          icon: (0,_react_Utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_3__["default"])(selectedIcon)
        });
        setSelectedIcon(selectedIcon);
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Set Icon', 'highlight-and-share')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "tertiary",
      onClick: function onClick() {
        setIsCustomIcon(false);
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Back to Icons', 'highlight-and-share'))));
  };
  var toggleVisible = function toggleVisible() {
    setIsPopOverVisible(function (state) {
      return !state;
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    className: "has-icon-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "has-icon-preview"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    className: "has-icon-preview-button",
    onClick: function onClick(e) {
      if (isFocusedOutside) {
        setIsFocusedOutside(false);
        return;
      }
      toggleVisible();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "has-icon-preview-button-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a Sharing Icon', 'highlight-and-share')), /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: (0,_react_Utils_sanitize_svg__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultSvg)
    }
  })))), isPopoverVisible && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    noArrow: false,
    className: "has-icon-popover",
    onFocusOutside: function onFocusOutside() {
      setIsFocusedOutside(true);
      setIsPopOverVisible(false);
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    className: "has-icon-picker"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select an Icon', 'highlight-and-share')), getPopoverContent())));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconPicker);

/***/ }),

/***/ "./src/blocks/click-to-share/components/Icons/shareSvgs.js":
/*!*****************************************************************!*\
  !*** ./src/blocks/click-to-share/components/Icons/shareSvgs.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * WordPress dependencies
 */
var _x = wp.i18n._x;
var svgs = {
  sharingIconOne: {
    label: _x('Sharing Icon One', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlSpace: "preserve",
      viewBox: "0 0 1664 1857"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1543.64 385.463c0 146.575-118.828 265.416-265.417 265.416-146.575 0-265.404-118.841-265.404-265.416 0-146.588 118.829-265.417 265.404-265.417 146.589 0 265.417 118.829 265.417 265.417Z",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M1543.64 385.463c0 146.575-118.828 265.416-265.417 265.416-146.575 0-265.404-118.841-265.404-265.416 0-146.588 118.829-265.417 265.404-265.417 146.589 0 265.417 118.829 265.417 265.417Z",
      style: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '107.37px'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M1543.64 1471.24c0 146.589-118.828 265.417-265.417 265.417-146.575 0-265.404-118.828-265.404-265.417 0-146.588 118.829-265.417 265.404-265.417 146.589 0 265.417 118.829 265.417 265.417Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M1543.64 1471.24c0 146.589-118.828 265.417-265.417 265.417-146.575 0-265.404-118.828-265.404-265.417 0-146.588 118.829-265.417 265.404-265.417 146.589 0 265.417 118.829 265.417 265.417Z",
      style: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '107.37px'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M650.879 988.666c0 146.589-118.828 265.416-265.403 265.416-146.589 0-265.43-118.827-265.43-265.416 0-146.576 118.841-265.416 265.43-265.416 146.575 0 265.403 118.84 265.403 265.416Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M650.879 988.666c0 146.589-118.828 265.416-265.403 265.416-146.589 0-265.43-118.827-265.43-265.416 0-146.576 118.841-265.416 265.43-265.416 146.575 0 265.403 118.84 265.403 265.416Z",
      style: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '107.37px'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m385.476 988.666 892.747-603.203",
      style: {
        fill: 'none',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m415.528 1033.16-60.117-88.971 892.76-603.216 60.117 88.971-892.76 603.216Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m385.476 988.666 892.747 482.578",
      style: {
        fill: 'none',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m1252.7 1518.47-892.76-482.578 51.055-94.454 892.76 482.579-51.055 94.453Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }))
  },
  sharingIconTwo: {
    label: _x('Sharing Icon Two', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlSpace: "preserve",
      viewBox: "0 0 1752 1836"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1603.95 473.058c0 179.909-145.833 325.742-325.729 325.742S952.479 652.967 952.479 473.058c0-179.896 145.846-325.729 325.742-325.729 179.896 0 325.729 145.833 325.729 325.729Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M1603.95 473.058c0 179.909-145.833 325.742-325.729 325.742S952.479 652.967 952.479 473.058c0-179.896 145.846-325.729 325.742-325.729 179.896 0 325.729 145.833 325.729 325.729Z",
      style: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '131.77px'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M1468.85 1558.85c0 105.272-85.352 190.625-190.625 190.625-105.286 0-190.638-85.353-190.638-190.625 0-105.287 85.352-190.638 190.638-190.638 105.273 0 190.625 85.351 190.625 190.638Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M1468.85 1558.85c0 105.272-85.352 190.625-190.625 190.625-105.286 0-190.638-85.353-190.638-190.625 0-105.287 85.352-190.638 190.638-190.638 105.273 0 190.625 85.351 190.625 190.638Z",
      style: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '77.12px'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M650.879 1076.27c0 146.589-118.828 265.417-265.416 265.417-146.589 0-265.417-118.828-265.417-265.417 0-146.588 118.828-265.416 265.417-265.416 146.588 0 265.416 118.828 265.416 265.416Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M650.879 1076.27c0 146.589-118.828 265.417-265.416 265.417-146.589 0-265.417-118.828-265.417-265.417 0-146.588 118.828-265.416 265.417-265.416 146.588 0 265.416 118.828 265.416 265.416Z",
      style: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '107.37px'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m385.463 1076.27 892.76-603.216",
      style: {
        fill: 'none',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m415.515 1120.77-60.118-88.971 892.761-603.216 60.117 88.972-892.76 603.215Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m385.463 1076.27 892.76 482.579",
      style: {
        fill: 'none',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m1252.69 1606.08-892.76-482.578 51.054-94.453 892.761 482.578-51.055 94.453Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }))
  },
  sharingIconThree: {
    label: _x('Sharing Icon Three', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlSpace: "preserve",
      viewBox: "0 0 1512 1688"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1162.8 1005.12c-47.929.677-96.809 10.104-143.815 28.906-112.33 44.936-176.08-.508-273.125-52.617-116.601-62.786-9.739-206.511 61.407-256.38 185.312-129.909 340.091 23.255 512.304-63.607 116.68-58.841 192.331-181.367 192.331-312.07 0-192.617-156.693-349.323-349.297-349.349-106.497-.014-202.773 44.219-266.888 129.792C776.199 289.3 839.858 609.391 530.769 597.489c-127.526-4.908-206.497-74.973-332.864-13.359C78.334 642.425.001 765.42.001 898.818c0 192.578 156.641 349.258 349.193 349.349 100 .039 193.021-72.422 291.211-59.089 213.685 29.024 152.604 247.618 250.885 369.246 65.69 81.301 166.784 129.413 271.276 129.413 192.617 0 349.336-156.719 349.336-349.349.013-213.19-167.669-335.859-349.102-333.268Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }))
  },
  sharingIconFour: {
    label: _x('Sharing Icon Four', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlSpace: "preserve",
      viewBox: "0 0 1727 958"
    }, /*#__PURE__*/React.createElement("path", {
      d: "m1726.64 476.563-471.836 333.71-205 145.04-3.451 2.499-.95-267.135-27.93-14.14C695.377 515.794 241.731 600.247.003 893.776 136.565 549.388 514.86 328.06 878.089 299.818h.937c26.055-2.201 52.11-3.151 77.852-3.151 10.99 0 22.292.325 33.594.95l53.372 2.513-.312-147.552L1042.894 0l683.75 476.563Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }))
  },
  sharingIconFive: {
    label: _x('Sharing Icon Five', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlSpace: "preserve",
      style: {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2
      },
      viewBox: "0 0 1785 1261"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1254.75 881.745v68.281c0 93.854-76.445 170.3-170.286 170.3H310.727c-16.315 0-31.992-2.37-47.018-6.654-71.081-20.404-123.268-86.12-123.268-163.646V337.578c0-94.062 76.445-170.508 170.286-170.508h765.352c15.247-1.497 30.924-2.356 46.601-2.578l-.429-135.287c-12.448-1.51-24.909-2.356-37.787-2.356H310.727C139.581 26.849-.002 166.211-.002 337.578v612.448c0 148.399 104.792 272.943 244.166 303.437 7.084 1.719 14.389 3.008 21.902 4.076 14.609 2.149 29.427 3.229 44.661 3.229h773.737c171.146 0 310.729-139.375 310.729-310.742V782.539l-140.443 99.206Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m1784.74 402.005-389.544 275.3-140.443 99.206-44.023 31.145-.638-225.273-23.62-11.81C914.819 434.857 626.407 580.026 422.41 827.63c123.906-311.601 387.396-577.448 712.943-577.448 9.453 0 18.906.208 28.346.638l45.104 2.148-.221-31.783-.43-168.568L1207.944 0l576.796 402.005Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }))
  },
  sharingIconSix: {
    label: _x('Sharing Icon Six', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlSpace: "preserve",
      style: {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2
      },
      viewBox: "0 0 1342 1868"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M812.812 633.503v98.776h421.12v1036.37H107.382V732.279H528.28v-98.776H-.001v1233.92h1341.3V633.503h-528.49Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "m1064.28 423.477-70.43 65.716L718.759 193.06V1261.2H622.34V193.27L347.249 489.195l-70.443-65.716L670.647.002l393.633 423.477Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }))
  },
  sharingIconSeven: {
    label: _x('Sharing Icon Seven', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlSpace: "preserve",
      style: {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2
      },
      viewBox: "0 0 1342 1342"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1233.92 1233.92H107.37V107.37h574.011V0H.001v1341.29h1341.3V658.621h-107.383v575.299Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M873.373 0v107.37h284.739L625.104 640.365l75.925 75.924 532.89-532.903v283.242h107.383V0H873.373Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }))
  },
  sharingIconEight: {
    label: _x('Sharing Icon Eight', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlSpace: "preserve",
      style: {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2
      },
      viewBox: "0 0 1590 1517"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M953.968 1270.48c3.946 35.847 13.516 71.224 28.698 104.623-122.396 48.593-258.151 53.151-382.812 13.515a361.685 361.685 0 0 1-30.521-10.469c-10.169-3.802-20.039-7.903-29.909-12.604-12.917 24.141-29.466 46.758-49.805 67.11-111.77 111.758-293.828 111.914-405.742 0-111.914-111.914-111.758-293.972 0-405.729 37.2-37.214 82.304-61.954 129.987-74.414 35.221-9.415 71.966-11.836 107.955-7.136 61.498 7.448 120.873 34.622 167.8 81.55 64.232 64.231 91.562 151.393 81.836 235.208a397.793 397.793 0 0 0 30.977 13.659c10.182 4.101 20.351 7.604 30.677 10.937 104.922 32.956 219.27 27.643 320.859-16.25ZM1335.86 912.577c-1.056 10.781-2.735 21.562-4.701 32.044 63.464 6.068 125.572 33.554 174.323 82.305 111.901 111.914 111.901 293.815 0 405.729-111.758 111.758-293.828 111.914-405.743 0-25.364-25.352-44.791-54.206-58.763-84.883-15.495-34.922-23.997-72.279-24.909-109.636l.157-.143c-2.435-76.237 25.507-153.073 83.515-211.067 34.623-34.623 75.925-58.62 119.961-71.68a445.586 445.586 0 0 0 6.836-35.078c0-.3 0-.3.144-.144 1.822-11.236 3.19-22.33 3.802-33.867 11.236-130.286-33.099-264.817-132.865-364.583-12.149-12.148-24.596-23.385-37.656-33.711 21.25-30.677 37.343-64.076 47.825-98.555 23.086 16.706 44.948 35.534 65.756 56.341 119.192 119.206 174.323 278.49 165.208 434.896-.612 10.625-1.667 21.407-2.89 32.032ZM974.619 83.944c72.877 72.89 98.242 175.39 76.224 268.776-8.047 34.765-22.773 68.333-43.88 98.541a290.935 290.935 0 0 1-32.201 38.269c-111.914 111.914-293.815 111.914-405.729 0a291.012 291.012 0 0 1-32.201-38.269c-9.257 5.326-18.059 11.094-26.874 17.474-8.958 5.912-17.618 12.136-26.12 19.128-13.047 10.326-25.651 21.719-37.799 33.867-98.099 98.086-142.591 229.44-133.477 357.904-35.833-2.735-71.979.299-106.901 8.503-11.537-158.529 43.281-321.159 164.453-442.331 20.794-20.808 42.669-39.636 65.742-56.341l.156-.157c9.115-6.679 18.373-13.203 28.086-19.284 9.271-6.223 18.985-11.992 28.854-17.304-22.161-93.542 3.19-196.042 76.081-268.919 111.758-111.758 293.672-111.758 405.586.143Z",
      style: {
        fill: 'currentColor',
        fillRule: 'nonzero'
      }
    }))
  },
  sharingIconNine: {
    label: _x('Sharing Icon Nine', 'label', 'alerts-dlx'),
    icon: /*#__PURE__*/React.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "share-alt",
      className: "svg-inline--fa fa-share-alt fa-w-14",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "currentColor",
      d: "M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
    }))
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (svgs);

/***/ }),

/***/ "./src/blocks/click-to-share/components/MaxWidth/index.js":
/*!****************************************************************!*\
  !*** ./src/blocks/click-to-share/components/MaxWidth/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_Components_unit_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/Components/unit-picker */ "./src/react/Components/unit-picker/index.js");
/* harmony import */ var _react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../react/Utils/TypographyHelper */ "./src/react/Utils/TypographyHelper.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Max-width component.
 * Credit: Forked from @GenerateBlocks
 */


/**
 * External dependencies
 */







var MaxWidth = function MaxWidth(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('desktop'),
    _useState2 = _slicedToArray(_useState, 2),
    screenSize = _useState2[0],
    setScreenSize = _useState2[1];
  var getDefaultValues = function getDefaultValues() {
    return {
      mobile: {
        width: props.values.mobile.width,
        unit: props.values.mobile.unit
      },
      tablet: {
        width: props.values.tablet.width,
        unit: props.values.tablet.unit
      },
      desktop: {
        width: props.values.desktop.width,
        unit: props.values.desktop.unit
      }
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues,
    reset = _useForm.reset;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useWatch)({
    control: control
  });
  var isInternalUpdate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var prevPropsValues = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(props.values);
  var onValuesChange = props.onValuesChange;

  // Sync form state when props.values changes externally (not from our updates).
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Check if props.values actually changed.
    var hasChanged = JSON.stringify(prevPropsValues.current) !== JSON.stringify(props.values);
    if (hasChanged && !isInternalUpdate.current) {
      reset(getDefaultValues());
    }
    prevPropsValues.current = props.values;
    isInternalUpdate.current = false;
  }, [props.values, reset]);

  // Ensure all screen sizes are preserved when updating parent.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Check if formValues has all required screen sizes.
    if (formValues && formValues.mobile && formValues.tablet && formValues.desktop) {
      isInternalUpdate.current = true;
      onValuesChange(formValues);
    } else {
      var _formValues$mobile, _formValues$tablet, _formValues$desktop;
      // If formValues is incomplete, merge with props.values to preserve all screen sizes.
      var mergedValues = {
        mobile: (_formValues$mobile = formValues === null || formValues === void 0 ? void 0 : formValues.mobile) !== null && _formValues$mobile !== void 0 ? _formValues$mobile : props.values.mobile,
        tablet: (_formValues$tablet = formValues === null || formValues === void 0 ? void 0 : formValues.tablet) !== null && _formValues$tablet !== void 0 ? _formValues$tablet : props.values.tablet,
        desktop: (_formValues$desktop = formValues === null || formValues === void 0 ? void 0 : formValues.desktop) !== null && _formValues$desktop !== void 0 ? _formValues$desktop : props.values.desktop
      };
      // Only update if merged values are different from current props.
      if (JSON.stringify(mergedValues) !== JSON.stringify(props.values)) {
        isInternalUpdate.current = true;
        onValuesChange(mergedValues);
      }
    }
  }, [formValues, onValuesChange, props.values]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setScreenSize(props.screenSize.toLowerCase());
    setValue(props.screenSize.toLowerCase(), getValues(props.screenSize.toLowerCase()));
  }, [props.screenSize, setValue, getValues]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    control: control,
    name: "".concat(screenSize, ".unit"),
    render: function render(_ref) {
      var _ref$field = _ref.field,
        onChange = _ref$field.onChange,
        value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_Components_unit_picker__WEBPACK_IMPORTED_MODULE_1__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Maximum Width', 'highlight-and-share'),
        value: (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_2__.getHierarchicalValueUnit)(props.values, screenSize, getValues(screenSize).unit, 'unit'),
        units: ['px', 'em', 'rem', '%', 'vw'],
        onClick: function onClick(newValue) {
          onChange(newValue);
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    control: control,
    name: "".concat(screenSize, ".width"),
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
        type: 'text',
        value: getValues(screenSize).width,
        onChange: function onChange(newValue) {
          _onChange(newValue);
        },
        placeholder: (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_2__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).width, 'width')
      });
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MaxWidth);

/***/ }),

/***/ "./src/blocks/click-to-share/components/PresetButton.js":
/*!**************************************************************!*\
  !*** ./src/blocks/click-to-share/components/PresetButton.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _BlockContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BlockContent */ "./src/blocks/click-to-share/components/BlockContent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var PresetButton = function PresetButton(props) {
  var _props$disabled;
  var setAttributes = props.setAttributes,
    label = props.label,
    attributes = props.attributes,
    uniqueId = props.uniqueId;

  // Define state for the popover visibility
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showPopover = _useState2[0],
    setShowPopover = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    popoverAnchor = _useState4[0],
    setPopoverAnchor = _useState4[1];

  // Define state for modal options.
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showModal = _useState6[0],
    setShowModal = _useState6[1];
  var handlePopoverOpen = function handlePopoverOpen() {
    setShowPopover(true);
  };
  var handlePopoverClose = function handlePopoverClose() {
    setShowPopover(false);
  };
  var popoverContent = function popoverContent() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_BlockContent__WEBPACK_IMPORTED_MODULE_4__["default"], {
      attributes: attributes,
      isPreview: true
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: 'secondary',
    onClick: function onClick(e) {
      e.preventDefault();
      setShowModal(true);
    },
    className: "has-preset-button",
    onMouseEnter: function onMouseEnter() {
      return handlePopoverOpen(true);
    },
    onMouseLeave: function onMouseLeave() {
      return handlePopoverClose(false);
    },
    label: label,
    ref: setPopoverAnchor,
    disabled: (_props$disabled = props.disabled) !== null && _props$disabled !== void 0 ? _props$disabled : false
  }, label), showModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Apply Preset?', 'highlight-and-share'),
    onRequestClose: function onRequestClose() {
      return setShowModal(false);
    },
    className: "has-preset-modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Are you sure you want to apply this preset?', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: function onClick() {
      var uniqueIdAttribute = {
        uniqueId: uniqueId
      };
      var blockAttributes = _objectSpread(_objectSpread({}, props.attributes), uniqueIdAttribute);
      setAttributes(blockAttributes);
      setShowModal(false);
    },
    className: "has-preset-modal-apply-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Apply Preset', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      setShowModal(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cancel', 'highlight-and-share')))), showPopover && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    className: "has-preset-popover",
    placement: "left",
    onClose: function onClose() {
      return handlePopoverClose(false);
    },
    noArrow: true,
    anchor: popoverAnchor
  }, popoverContent())));
};
PresetButton.propTypes = {
  previewBlock: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().element).isRequired,
  setAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  label: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  presetData: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
};
PresetButton.defaultProps = {
  label: 'Purple',
  previewBlock: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null),
  setAttributes: function setAttributes() {},
  presetData: {}
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PresetButton);

/***/ }),

/***/ "./src/blocks/click-to-share/components/PresetButtonEdit.js":
/*!******************************************************************!*\
  !*** ./src/blocks/click-to-share/components/PresetButtonEdit.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PresetButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PresetButton */ "./src/blocks/click-to-share/components/PresetButton.js");
/* harmony import */ var _CustomPresets_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CustomPresets/context */ "./src/blocks/click-to-share/components/CustomPresets/context.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var PresetButtonEdit = function PresetButtonEdit(props) {
  var title = props.title,
    slug = props.slug,
    setAttributes = props.setAttributes,
    attributes = props.attributes,
    uniqueId = props.uniqueId,
    editId = props.editId,
    clientId = props.clientId,
    saveNonce = props.saveNonce,
    deleteNonce = props.deleteNonce;
  var uniqueIdAttribute = {
    uniqueId: slug
  };
  var blockAttributes = _objectSpread(_objectSpread({}, attributes), uniqueIdAttribute);
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_CustomPresets_context__WEBPACK_IMPORTED_MODULE_5__["default"]),
    editPresets = _useContext.editPresets,
    setShowEditModal = _useContext.setShowEditModal,
    setShowDeleteModal = _useContext.setShowDeleteModal;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('has-preset-edit-container', {
      'has-preset-edit-container--edit': editPresets
    })
  }, editPresets && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-preset-edit-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(e) {
      setShowEditModal({
        show: true,
        editId: editId,
        title: title,
        saveNonce: saveNonce
      });
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edit Preset', 'highlight-and-share'),
    icon: "edit",
    className: "has-preset-edit-button"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: 'secondary',
    onClick: function onClick(e) {
      setShowDeleteModal({
        show: true,
        editId: editId,
        deleteNonce: deleteNonce
      });
    },
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete Preset', 'highlight-and-share'),
    icon: "trash",
    className: "has-preset-delete-button"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PresetButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: editId,
    label: '' === title ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Untitled Preset', 'highlight-and-share') : title,
    setAttributes: setAttributes,
    uniqueId: uniqueId,
    className: "has-preset-button",
    clientId: clientId,
    attributes: blockAttributes,
    disabled: editPresets
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PresetButtonEdit);

/***/ }),

/***/ "./src/blocks/click-to-share/edit.js":
/*!*******************************************!*\
  !*** ./src/blocks/click-to-share/edit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ColorPickerHover_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ColorPickerHover/index */ "./src/blocks/click-to-share/components/ColorPickerHover/index.js");
/* harmony import */ var _react_Components_GradientPicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../react/Components/GradientPicker */ "./src/react/Components/GradientPicker/index.js");
/* harmony import */ var _react_Components_GradientSync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react/Components/GradientSync */ "./src/react/Components/GradientSync/index.js");
/* harmony import */ var _react_Components_GradientGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../react/Components/GradientGenerator */ "./src/react/Components/GradientGenerator/index.js");
/* harmony import */ var _react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../react/Components/DimensionsBlock */ "./src/react/Components/DimensionsBlock/index.js");
/* harmony import */ var _react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../react/Hooks/useDeviceType */ "./src/react/Hooks/useDeviceType.js");
/* harmony import */ var _react_Components_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../react/Components/Typography */ "./src/react/Components/Typography/index.js");
/* harmony import */ var _react_Components_BackgroundSelector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../react/Components/BackgroundSelector */ "./src/react/Components/BackgroundSelector/index.js");
/* harmony import */ var _components_PresetButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/PresetButton */ "./src/blocks/click-to-share/components/PresetButton.js");
/* harmony import */ var _presets_purple__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./presets/purple */ "./src/blocks/click-to-share/presets/purple.js");
/* harmony import */ var _presets_dark__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./presets/dark */ "./src/blocks/click-to-share/presets/dark.js");
/* harmony import */ var _presets_blue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./presets/blue */ "./src/blocks/click-to-share/presets/blue.js");
/* harmony import */ var _presets_light__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./presets/light */ "./src/blocks/click-to-share/presets/light.js");
/* harmony import */ var _presets_pink__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./presets/pink */ "./src/blocks/click-to-share/presets/pink.js");
/* harmony import */ var _presets_red__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./presets/red */ "./src/blocks/click-to-share/presets/red.js");
/* harmony import */ var _components_BlockContent__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/BlockContent */ "./src/blocks/click-to-share/components/BlockContent.js");
/* harmony import */ var _components_CustomPresets__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/CustomPresets */ "./src/blocks/click-to-share/components/CustomPresets/index.js");
/* harmony import */ var _components_MaxWidth__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/MaxWidth */ "./src/blocks/click-to-share/components/MaxWidth/index.js");
/* harmony import */ var _components_IconPicker__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/IconPicker */ "./src/blocks/click-to-share/components/IconPicker/index.js");
/* harmony import */ var _components_Icons_shareSvgs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/Icons/shareSvgs */ "./src/blocks/click-to-share/components/Icons/shareSvgs.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * External dependencies
 */











/* Preset Imports */












var __ = wp.i18n.__;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  PanelRow = _wp$components.PanelRow,
  RangeControl = _wp$components.RangeControl,
  TextControl = _wp$components.TextControl,
  TextareaControl = _wp$components.TextareaControl,
  ButtonGroup = _wp$components.ButtonGroup,
  Button = _wp$components.Button,
  ToggleControl = _wp$components.ToggleControl,
  ToolbarGroup = _wp$components.ToolbarGroup,
  ToolbarButton = _wp$components.ToolbarButton,
  Popover = _wp$components.Popover;
var useState = wp.element.useState;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  useBlockProps = _wp$blockEditor.useBlockProps,
  BlockControls = _wp$blockEditor.BlockControls;
var useInstanceId = wp.compose.useInstanceId;
var _HAS_Click_To_Share = function HAS_Click_To_Share(props) {
  var _useDeviceType = (0,_react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_7__["default"])('Desktop'),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 2),
    deviceType = _useDeviceType2[0],
    setDeviceType = _useDeviceType2[1];
  var generatedUniqueId = useInstanceId(_HAS_Click_To_Share, 'has-cts');
  var blockProps = useBlockProps({
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()("highlight-and-share", "align".concat(align))
  });
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    quoteToolbarPopoverAnchor = _useState2[0],
    setQuoteToolbarPopoverAnchor = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isQuoteToolbarPopoverOpen = _useState4[0],
    setIsQuoteToolbarPopoverOpen = _useState4[1];
  var quoteToolbarTogglePopover = function quoteToolbarTogglePopover() {
    return setIsQuoteToolbarPopoverOpen(!isQuoteToolbarPopoverOpen);
  };
  var attributes = props.attributes,
    setAttributes = props.setAttributes,
    clientId = props.clientId;
  var customShareText = attributes.customShareText,
    shareText = attributes.shareText,
    backgroundType = attributes.backgroundType,
    backgroundColor = attributes.backgroundColor,
    backgroundColorHover = attributes.backgroundColorHover,
    backgroundColorSync = attributes.backgroundColorSync,
    backgroundGradient = attributes.backgroundGradient,
    backgroundGradientHover = attributes.backgroundGradientHover,
    backgroundGradientSync = attributes.backgroundGradientSync,
    backgroundImage = attributes.backgroundImage,
    textColor = attributes.textColor,
    textColorHover = attributes.textColorHover,
    textColorSync = attributes.textColorSync,
    shareTextColor = attributes.shareTextColor,
    shareTextColorHover = attributes.shareTextColorHover,
    shareTextColorSync = attributes.shareTextColorSync,
    showClickToShare = attributes.showClickToShare,
    showIcon = attributes.showIcon,
    fontSize = attributes.fontSize,
    iconSize = attributes.iconSize,
    clickText = attributes.clickText,
    padding = attributes.padding,
    border = attributes.border,
    borderRadius = attributes.borderRadius,
    borderColor = attributes.borderColor,
    iconColor = attributes.iconColor,
    iconColorHover = attributes.iconColorHover,
    iconColorSync = attributes.iconColorSync,
    borderColorHover = attributes.borderColorHover,
    borderColorSync = attributes.borderColorSync,
    clickShareFontSize = attributes.clickShareFontSize,
    maxWidth = attributes.maxWidth,
    maxWidthUnit = attributes.maxWidthUnit,
    maximumWidth = attributes.maximumWidth,
    alignment = attributes.alignment,
    align = attributes.align,
    marginTop = attributes.marginTop,
    marginRight = attributes.marginRight,
    marginBottom = attributes.marginBottom,
    marginLeft = attributes.marginLeft,
    marginSize = attributes.marginSize,
    paddingSize = attributes.paddingSize,
    borderWidth = attributes.borderWidth,
    borderRadiusSize = attributes.borderRadiusSize,
    uniqueId = attributes.uniqueId,
    typographyQuote = attributes.typographyQuote,
    typographyShareText = attributes.typographyShareText,
    showClickToShareText = attributes.showClickToShareText,
    showClickToShareIcon = attributes.showClickToShareIcon,
    iconSizeResponsive = attributes.iconSizeResponsive,
    icon = attributes.icon;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    // If this is the first time inserting the block.
    if ('' === uniqueId) {
      if (backgroundColor === backgroundColorHover) {
        setAttributes({
          backgroundColorSync: 'sync'
        });
      }
      if (textColor === textColorHover) {
        setAttributes({
          textColorSync: 'sync'
        });
      }
      if (shareTextColor === shareTextColorHover) {
        setAttributes({
          shareTextColorSync: 'sync'
        });
      }
      if (iconColor === iconColorHover) {
        setAttributes({
          iconColorSync: 'sync'
        });
      }
      if (borderColor === borderColorHover) {
        setAttributes({
          borderColorSync: 'sync'
        });
      }
    }
    // Set unique ID for block (for styling).
    setAttributes({
      uniqueId: generatedUniqueId
    });

    // Port padding to new dimensions object.
    if (padding !== -1) {
      var portPadding = paddingSize;
      portPadding.desktop = {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
        unit: 'px',
        unitSync: true
      };
      setAttributes({
        paddingSize: portPadding,
        padding: -1,
        backgroundColorHover: backgroundColor,
        shareTextColor: textColor,
        shareTextColorHover: textColor,
        textColorHover: textColor,
        borderColorHover: borderColor,
        iconColorHover: textColor,
        iconColor: textColor
      });
    }
    // Port margin to new dimensions object.
    if (marginTop !== -1) {
      var portMargin = marginSize;
      portMargin.desktop = {
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
        unit: 'px',
        unitSync: true
      };
      setAttributes({
        marginSize: portMargin,
        marginTop: -1
      });
    }
    // Port border width to new dimensions object.
    if (border !== -1) {
      var portBorderWidth = borderWidth;
      portBorderWidth.desktop = {
        top: border,
        right: border,
        bottom: border,
        left: border,
        unit: 'px',
        unitSync: true
      };
      setAttributes({
        borderWidth: portBorderWidth,
        border: -1
      });
    }
    // Port border radius to new dimensions object.
    if (borderRadius !== -1) {
      var portBorderRadius = borderRadiusSize;
      portBorderRadius.desktop = {
        top: borderRadius,
        right: borderRadius,
        bottom: borderRadius,
        left: borderRadius,
        unit: 'px',
        unitSync: true
      };
      setAttributes({
        borderRadiusSize: portBorderRadius,
        borderRadius: -1
      });
    }
    if (maxWidth !== '-1') {
      setAttributes({
        maxWidth: '-1',
        maxWidthUnit: '-1'
      });
    }

    // Port alignment over to align variable.
    if (alignment !== 'none') {
      setAttributes({
        align: alignment,
        alignment: 'none'
      });
    }

    // Port over icon size.
    if (-1 === iconSize) {
      setAttributes({
        iconSize: clickShareFontSize
      });
    }

    // Port over show click to share text.
    if (-1 !== showClickToShare) {
      var newClickToShareText = {
        mobile: showClickToShare,
        tablet: showClickToShare,
        desktop: showClickToShare
      };
      setAttributes({
        showClickToShare: -1,
        showClickToShareText: newClickToShareText
      });
    }

    // Port over click to share icon.
    if (-1 !== showIcon) {
      var newClickToShareIcon = {
        mobile: showIcon,
        tablet: showIcon,
        desktop: showIcon
      };
      setAttributes({
        showIcon: -1,
        showClickToShareIcon: newClickToShareIcon
      });
    }

    // If responsive icons is -1, overwrite with iconSize.
    if (-1 === iconSizeResponsive.desktop) {
      var newIconSize = 20;
      if (iconSize !== -1) {
        newIconSize = iconSize;
      }
      var newIconResponsive = {
        mobile: newIconSize,
        tablet: newIconSize,
        desktop: newIconSize
      };
      setAttributes({
        iconSizeResponsive: newIconResponsive
      });
    }
  }, []);
  var getDeviceIcon = function getDeviceIcon() {
    if (deviceType === 'Desktop') {
      return 'laptop';
    } else if (deviceType === 'Tablet') {
      return 'tablet';
    } else if (deviceType === 'Mobile') {
      return 'smartphone';
    }
    return null;
  };

  /* For sticky responsive: forked from GenerateBlocks */
  var panelHeader = document.querySelector('.edit-post-sidebar .edit-post-sidebar__panel-tabs');
  var panelHeaderHeight = panelHeader ? panelHeader.offsetHeight : 0;
  var shareTextToolbar = /*#__PURE__*/React.createElement(BlockControls, null, /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(ToolbarButton, {
    icon: "editor-quote",
    label: __('Customize the Share Quote', 'highlight-and-share'),
    onClick: quoteToolbarTogglePopover,
    ref: setQuoteToolbarPopoverAnchor
  }), isQuoteToolbarPopoverOpen && /*#__PURE__*/React.createElement(Popover, {
    placement: "right-end",
    anchor: quoteToolbarPopoverAnchor,
    noArrow: false,
    className: "has-custom-share-text-popover"
  }, /*#__PURE__*/React.createElement(TextareaControl, {
    className: "has-custom-share-textarea",
    label: __('Custom Share Quote', 'highlight-and-share'),
    help: __('Enter a custom quote to share. This will override what is in the share block.', 'highlight-and-share'),
    value: customShareText,
    onChange: function onChange(value) {
      return setAttributes({
        customShareText: value
      });
    }
  }))));
  var inspectorControls = /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement("div", {
    id: "has-screensize-group",
    className: "has-screensize-variants",
    style: {
      top: panelHeaderHeight + 'px'
    }
  }, /*#__PURE__*/React.createElement(ButtonGroup, null, /*#__PURE__*/React.createElement(Button, {
    variant: deviceType === 'Desktop' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setDeviceType('Desktop');
    },
    icon: "laptop",
    iconSize: "14",
    label: __('Desktop', 'highlight-and-share')
  }), /*#__PURE__*/React.createElement(Button, {
    variant: deviceType === 'Tablet' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setDeviceType('Tablet');
    },
    icon: "tablet",
    label: __('Tablet', 'highlight-and-share')
  }), /*#__PURE__*/React.createElement(Button, {
    variant: deviceType === 'Mobile' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setDeviceType('Mobile');
    },
    icon: "smartphone",
    label: __('Mobile', 'highlight-and-share')
  }))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Presets', 'highlight-and-share'),
    initialOpen: false,
    className: "has-presets-panel",
    icon: "admin-customizer"
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement("div", {
    className: "has-presets"
  }, /*#__PURE__*/React.createElement("h3", null, __('Select a Preset', 'highlight-and-share')), /*#__PURE__*/React.createElement(ButtonGroup, null, /*#__PURE__*/React.createElement(_components_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: __('Purple Theme', 'highlight-and-share'),
    setAttributes: setAttributes,
    attributes: _presets_purple__WEBPACK_IMPORTED_MODULE_11__.attributes,
    uniqueId: uniqueId
  }), /*#__PURE__*/React.createElement(_components_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: __('Dark Theme', 'highlight-and-share'),
    setAttributes: setAttributes,
    attributes: _presets_dark__WEBPACK_IMPORTED_MODULE_12__.attributes,
    uniqueId: uniqueId
  }), /*#__PURE__*/React.createElement(_components_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: __('Light Theme', 'highlight-and-share'),
    setAttributes: setAttributes,
    attributes: _presets_light__WEBPACK_IMPORTED_MODULE_14__.attributes,
    uniqueId: uniqueId
  }), /*#__PURE__*/React.createElement(_components_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: __('Pink Theme', 'highlight-and-share'),
    setAttributes: setAttributes,
    attributes: _presets_pink__WEBPACK_IMPORTED_MODULE_15__.attributes,
    uniqueId: uniqueId
  }), /*#__PURE__*/React.createElement(_components_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: __('Blue Theme', 'highlight-and-share'),
    setAttributes: setAttributes,
    attributes: _presets_blue__WEBPACK_IMPORTED_MODULE_13__.attributes,
    uniqueId: uniqueId
  }), /*#__PURE__*/React.createElement(_components_PresetButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: __('Red Theme', 'highlight-and-share'),
    setAttributes: setAttributes,
    attributes: _presets_red__WEBPACK_IMPORTED_MODULE_16__.attributes,
    uniqueId: uniqueId
  })))), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement("div", {
    className: "has-presets"
  }, /*#__PURE__*/React.createElement("h3", null, __('Custom Presets', 'highlight-and-share')), /*#__PURE__*/React.createElement(_components_CustomPresets__WEBPACK_IMPORTED_MODULE_18__["default"], {
    clientId: clientId,
    uniqueId: uniqueId,
    attributes: attributes,
    setAttributes: setAttributes
  })))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Share Settings', 'highlight-and-share'),
    initialOpen: true,
    icon: getDeviceIcon()
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(ToggleControl, {
    label: __('Show Click to Share Text', 'alerts-dlx'),
    checked: showClickToShareText[deviceType.toLowerCase()],
    onChange: function onChange(value) {
      var newShowClickToShare = _objectSpread({}, showClickToShareText);
      newShowClickToShare[deviceType.toLowerCase()] = value;
      setAttributes({
        showClickToShareText: newShowClickToShare
      });
    }
  })), showClickToShare && deviceType === 'Desktop' && /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
    label: __('Click to Share Text', 'highlight-and-share'),
    value: clickText,
    onChange: function onChange(value) {
      setAttributes({
        clickText: value
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(ToggleControl, {
    label: __('Show Share Icon', 'alerts-dlx'),
    checked: showClickToShareIcon[deviceType.toLowerCase()],
    onChange: function onChange(value) {
      var newShowClickToShare = _objectSpread({}, showClickToShareIcon);
      newShowClickToShare[deviceType.toLowerCase()] = value;
      setAttributes({
        showClickToShareIcon: newShowClickToShare
      });
    }
  })), showClickToShareIcon[deviceType.toLowerCase()] && /*#__PURE__*/React.createElement(React.Fragment, null, 'Desktop' === deviceType && /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_components_IconPicker__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultSvg: icon,
    setAttributes: setAttributes,
    icons: _components_Icons_shareSvgs__WEBPACK_IMPORTED_MODULE_21__["default"]
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-range-control"
  }, /*#__PURE__*/React.createElement(RangeControl, {
    label: __('Icon Size', 'highlight-and-share'),
    value: iconSizeResponsive[deviceType.toLowerCase()],
    onChange: function onChange(value) {
      var newIconSize = _objectSpread({}, iconSizeResponsive);
      newIconSize[deviceType.toLowerCase()] = value;
      setAttributes({
        iconSizeResponsive: newIconSize
      });
    },
    min: 10,
    max: 150,
    step: 1
  })))), deviceType === 'Desktop' && /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Background Settings', 'highlight-and-share'),
    initialOpen: true,
    icon: "admin-appearance"
  }, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-type"
  }, /*#__PURE__*/React.createElement("h3", null, __('Background Type', 'highlight-and-share')), /*#__PURE__*/React.createElement(ButtonGroup, null, /*#__PURE__*/React.createElement(Button, {
    variant: backgroundType === 'solid' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setAttributes({
        backgroundType: 'solid'
      });
    },
    label: __('Solid Background', 'highlight-and-share')
  }, __('Solid', 'highlight-and-share')), /*#__PURE__*/React.createElement(Button, {
    variant: backgroundType === 'gradient' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setAttributes({
        backgroundType: 'gradient'
      });
    },
    label: __('Gradient Background', 'highlight-and-share')
  }, __('Gradient', 'highlight-and-share')), /*#__PURE__*/React.createElement(Button, {
    variant: backgroundType === 'image' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setAttributes({
        backgroundType: 'image'
      });
    },
    label: __('Image Background', 'highlight-and-share')
  }, __('Image', 'highlight-and-share')))), backgroundType === 'solid' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-color-picker"
  }, /*#__PURE__*/React.createElement(_components_ColorPickerHover_index__WEBPACK_IMPORTED_MODULE_2__["default"], {
    syncTitle: __('Sync Background Colors', 'highlight-and-share'),
    normalColor: backgroundColor,
    hoverColor: backgroundColorHover,
    isSync: backgroundColorSync,
    onChange: function onChange(color, hoverColor, sync) {
      setAttributes({
        backgroundColor: color
      });
      setAttributes({
        backgroundColorHover: hoverColor
      });
      setAttributes({
        backgroundColorSync: sync
      });
    },
    label: __('Background Color', 'highlight-and-share'),
    key: 'background-color-solid',
    slug: 'background-color-solid'
  }))), backgroundType === 'gradient' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-gradient-sync"
  }, /*#__PURE__*/React.createElement(_react_Components_GradientSync__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    label: __('Sync Gradients', 'highlight-and-share')
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-gradient"
  }, /*#__PURE__*/React.createElement(_react_Components_GradientPicker__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: backgroundGradient,
    onChange: function onChange(newValue) {
      setAttributes({
        backgroundGradient: newValue
      });
    },
    label: __('Gradient Background', 'highlight-and-share'),
    clearable: false
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-gradient"
  }, /*#__PURE__*/React.createElement(_react_Components_GradientPicker__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: backgroundGradientHover,
    onChange: function onChange(newValue) {
      setAttributes({
        backgroundGradientHover: newValue
      });
    },
    label: __('Gradient Background Hover', 'highlight-and-share'),
    clearable: false
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-gradient-generator"
  }, /*#__PURE__*/React.createElement(_react_Components_GradientGenerator__WEBPACK_IMPORTED_MODULE_5__["default"], {
    setAttributes: setAttributes,
    label: __('Generate Random Gradient', 'highlight-and-share')
  }))), backgroundType === 'image' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_BackgroundSelector__WEBPACK_IMPORTED_MODULE_9__["default"], {
    label: __('Background Image', 'highlight-and-share'),
    values: backgroundImage,
    onValuesChange: function onValuesChange(newValue) {
      setAttributes({
        backgroundImage: newValue
      });
    }
  })))), deviceType === 'Desktop' && /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Colors', 'highlight-and-share'),
    initialOpen: false,
    icon: "art"
  }, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-color-picker"
  }, /*#__PURE__*/React.createElement(_components_ColorPickerHover_index__WEBPACK_IMPORTED_MODULE_2__["default"], {
    syncTitle: __('Sync Text Colors', 'highlight-and-share'),
    normalColor: textColor,
    hoverColor: textColorHover,
    isSync: textColorSync,
    onChange: function onChange(color, hoverColor, sync) {
      setAttributes({
        textColor: color
      });
      setAttributes({
        textColorHover: hoverColor
      });
      setAttributes({
        textColorSync: sync
      });
    },
    label: __('Text Color', 'highlight-and-share'),
    key: 'text-color',
    slug: 'text-color'
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-color-picker"
  }, /*#__PURE__*/React.createElement(_components_ColorPickerHover_index__WEBPACK_IMPORTED_MODULE_2__["default"], {
    syncTitle: __('Sync Share Text Colors', 'highlight-and-share'),
    normalColor: shareTextColor,
    hoverColor: shareTextColorHover,
    isSync: shareTextColorSync,
    onChange: function onChange(color, hoverColor, sync) {
      setAttributes({
        shareTextColor: color
      });
      setAttributes({
        shareTextColorHover: hoverColor
      });
      setAttributes({
        shareTextColorSync: sync
      });
    },
    label: __('Share Text Color', 'highlight-and-share'),
    key: 'share-text-color',
    slug: 'share-text-color'
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-color-picker"
  }, /*#__PURE__*/React.createElement(_components_ColorPickerHover_index__WEBPACK_IMPORTED_MODULE_2__["default"], {
    syncTitle: __('Sync Icon Colors', 'highlight-and-share'),
    normalColor: iconColor,
    hoverColor: iconColorHover,
    isSync: iconColorSync,
    onChange: function onChange(color, hoverColor, sync) {
      setAttributes({
        iconColor: color
      });
      setAttributes({
        iconColorHover: hoverColor
      });
      setAttributes({
        iconColorSync: sync
      });
    },
    label: __('Icon Color', 'highlight-and-share'),
    key: 'icon-color',
    slug: 'icon-color'
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-color-picker"
  }, /*#__PURE__*/React.createElement(_components_ColorPickerHover_index__WEBPACK_IMPORTED_MODULE_2__["default"], {
    syncTitle: __('Sync Border Colors', 'highlight-and-share'),
    normalColor: borderColor,
    hoverColor: borderColorHover,
    isSync: borderColorSync,
    onChange: function onChange(color, hoverColor, sync) {
      setAttributes({
        borderColor: color
      });
      setAttributes({
        borderColorHover: hoverColor
      });
      setAttributes({
        borderColorSync: sync
      });
    },
    label: __('Border Color', 'highlight-and-share'),
    key: 'border-color',
    slug: 'border-color'
  }))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Fonts and Typography', 'highlight-and-share'),
    initialOpen: true,
    icon: getDeviceIcon()
  }, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-typography-panel-row"
  }, /*#__PURE__*/React.createElement(_react_Components_Typography__WEBPACK_IMPORTED_MODULE_8__["default"], {
    values: typographyQuote,
    screenSize: deviceType,
    onValuesChange: function onValuesChange(formValues) {
      setAttributes({
        typographyQuote: formValues
      });
    },
    label: __('Quote Typography', 'highlight-and-share')
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-typography-panel-row"
  }, /*#__PURE__*/React.createElement(_react_Components_Typography__WEBPACK_IMPORTED_MODULE_8__["default"], {
    values: typographyShareText,
    screenSize: deviceType,
    onValuesChange: function onValuesChange(formValues) {
      setAttributes({
        typographyShareText: formValues
      });
    },
    label: __('Share Text Typography', 'highlight-and-share')
  }))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Spacing and Border', 'highlight-and-share'),
    initialOpen: true,
    icon: getDeviceIcon()
  }, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-unit-picker"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_components_MaxWidth__WEBPACK_IMPORTED_MODULE_19__["default"], {
    values: maximumWidth,
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        maximumWidth: newValues
      });
    }
  }))), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __('Inner Padding', 'highlight-and-share'),
    allowNegatives: false,
    values: paddingSize,
    labelTop: __('Top', 'highlight-and-share'),
    labelRight: __('Right', 'highlight-and-share'),
    labelBottom: __('Bottom', 'highlight-and-share'),
    labelLeft: __('Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        paddingSize: newValues
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __('Outer Margin', 'highlight-and-share'),
    allowNegatives: false,
    values: marginSize,
    labelTop: __('Top', 'highlight-and-share'),
    labelRight: __('Right', 'highlight-and-share'),
    labelBottom: __('Bottom', 'highlight-and-share'),
    labelLeft: __('Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        marginSize: newValues
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __('Border Width', 'highlight-and-share'),
    allowNegatives: false,
    values: borderWidth,
    labelTop: __('Top', 'highlight-and-share'),
    labelRight: __('Right', 'highlight-and-share'),
    labelBottom: __('Bottom', 'highlight-and-share'),
    labelLeft: __('Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        borderWidth: newValues
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __('Border Radius', 'highlight-and-share'),
    allowNegatives: false,
    values: borderRadiusSize,
    labelTop: __('Top Left', 'highlight-and-share'),
    labelRight: __('Top Right', 'highlight-and-share'),
    labelBottom: __('Bottom Right', 'highlight-and-share'),
    labelLeft: __('Bottom Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem', '%'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        borderRadiusSize: newValues
      });
    }
  }))));
  var block = /*#__PURE__*/React.createElement(React.Fragment, null, shareTextToolbar, inspectorControls, /*#__PURE__*/React.createElement(_components_BlockContent__WEBPACK_IMPORTED_MODULE_17__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    clientId: clientId
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", blockProps, block));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_HAS_Click_To_Share);

/***/ }),

/***/ "./src/blocks/click-to-share/presets/blue.js":
/*!***************************************************!*\
  !*** ./src/blocks/click-to-share/presets/blue.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributes: () => (/* binding */ attributes)
/* harmony export */ });
var attributes = {
  uniqueId: 'has-blue-preview',
  showClickToShare: -1,
  showIcon: -1,
  iconSize: 24,
  iconSizeResponsive: {
    mobile: 30,
    tablet: 25,
    desktop: 25
  },
  customShareText: '',
  shareText: '',
  shareTextInner: [],
  backgroundColor: '#0088cc',
  backgroundColorHover: '#017dbb',
  backgroundColorSync: 'hover',
  backgroundType: 'solid',
  backgroundGradient: '',
  backgroundGradientHover: '',
  backgroundGradientSync: 'normal',
  backgroundImage: {
    url: '',
    id: 0,
    backgroundColor: '#000000',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: 1,
    backgroundOpacityHover: 1
  },
  icon: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" class="svg-inline--fa fa-share-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>',
  iconColor: '#ffffff',
  iconColorHover: '#ffffff',
  iconColorSync: 'sync',
  textColor: '#ffffff',
  textColorHover: '#ffffff',
  textColorSync: 'sync',
  shareTextColor: '#ffffff',
  shareTextColorHover: '#ffffff',
  shareTextColorSync: 'sync',
  fontSize: 24,
  clickShareFontSize: 24,
  clickText: 'Click to Share',
  padding: -1,
  border: -1,
  borderRadius: -1,
  borderColor: '#7b5be6',
  borderColorHover: '#7b5be6',
  borderColorSync: 'sync',
  fontWeight: '400',
  maxWidth: '-1',
  maxWidthUnit: '-1',
  maximumWidth: {
    mobile: {
      width: '95',
      unit: 'vw'
    },
    tablet: {
      width: '95',
      unit: '%'
    },
    desktop: {
      width: '650',
      unit: 'px'
    }
  },
  showClickToShareText: {
    mobile: false,
    tablet: true,
    desktop: true
  },
  showClickToShareIcon: {
    mobile: true,
    tablet: true,
    desktop: true
  },
  align: 'center',
  alignment: 'none',
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: -1,
  paddingSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: '20',
      bottom: '20',
      left: '20',
      unit: 'px',
      unitSync: true
    }
  },
  marginSize: {
    mobile: {
      top: '0',
      right: '',
      bottom: '0',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '5',
      right: '',
      bottom: '5',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: 0,
      bottom: '20',
      left: 0,
      unit: 'px',
      unitSync: false
    }
  },
  borderWidth: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '1',
      right: '1',
      bottom: '1',
      left: '1',
      unit: 'px',
      unitSync: true
    }
  },
  borderRadiusSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '3',
      right: '3',
      bottom: '3',
      left: '3',
      unit: 'px',
      unitSync: true
    }
  },
  typographyQuote: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    desktop: {
      fontFamily: 'Roboto',
      fontFamilySlug: 'roboto',
      fontSize: '26',
      fontSizeUnit: 'px',
      fontWeight: 'normal',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  },
  typographyShareText: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    desktop: {
      fontFamily: 'Lato',
      fontFamilySlug: 'lato',
      fontSize: '28',
      fontSizeUnit: 'px',
      fontWeight: '400',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  }
};


/***/ }),

/***/ "./src/blocks/click-to-share/presets/dark.js":
/*!***************************************************!*\
  !*** ./src/blocks/click-to-share/presets/dark.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributes: () => (/* binding */ attributes)
/* harmony export */ });
var attributes = {
  uniqueId: 'has-dark-preview',
  showClickToShare: -1,
  showIcon: -1,
  iconSize: 24,
  iconSizeResponsive: {
    mobile: 30,
    tablet: 25,
    desktop: 25
  },
  customShareText: '',
  shareText: '',
  shareTextInner: [],
  backgroundColor: '#333',
  backgroundColorHover: '#000',
  backgroundColorSync: 'hover',
  backgroundType: 'solid',
  backgroundGradient: '',
  backgroundGradientHover: '',
  backgroundGradientSync: 'normal',
  backgroundImage: {
    url: '',
    id: 0,
    backgroundColor: '#000000',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: 1,
    backgroundOpacityHover: 1
  },
  icon: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" class="svg-inline--fa fa-share-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>',
  iconColor: '#ffffff',
  iconColorHover: '#ffffff',
  iconColorSync: 'sync',
  textColor: '#ffffff',
  textColorHover: '#ffffff',
  textColorSync: 'sync',
  shareTextColor: '#ffffff',
  shareTextColorHover: '#ffffff',
  shareTextColorSync: 'sync',
  fontSize: 24,
  clickShareFontSize: 24,
  clickText: 'Click to Share',
  padding: -1,
  border: -1,
  borderRadius: -1,
  borderColor: '#7b5be6',
  borderColorHover: '#7b5be6',
  borderColorSync: 'sync',
  fontWeight: '400',
  maxWidth: '-1',
  maxWidthUnit: '-1',
  maximumWidth: {
    mobile: {
      width: '95',
      unit: 'vw'
    },
    tablet: {
      width: '95',
      unit: '%'
    },
    desktop: {
      width: '650',
      unit: 'px'
    }
  },
  showClickToShareText: {
    mobile: false,
    tablet: true,
    desktop: true
  },
  showClickToShareIcon: {
    mobile: true,
    tablet: true,
    desktop: true
  },
  align: 'center',
  alignment: 'none',
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: -1,
  paddingSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: '20',
      bottom: '20',
      left: '20',
      unit: 'px',
      unitSync: true
    }
  },
  marginSize: {
    mobile: {
      top: '0',
      right: '',
      bottom: '0',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '5',
      right: '',
      bottom: '5',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: 0,
      bottom: '20',
      left: 0,
      unit: 'px',
      unitSync: false
    }
  },
  borderWidth: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '1',
      right: '1',
      bottom: '1',
      left: '1',
      unit: 'px',
      unitSync: true
    }
  },
  borderRadiusSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '3',
      right: '3',
      bottom: '3',
      left: '3',
      unit: 'px',
      unitSync: true
    }
  },
  typographyQuote: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    desktop: {
      fontFamily: 'Roboto',
      fontFamilySlug: 'roboto',
      fontSize: '26',
      fontSizeUnit: 'px',
      fontWeight: 'normal',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  },
  typographyShareText: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    desktop: {
      fontFamily: 'Lato',
      fontFamilySlug: 'lato',
      fontSize: '28',
      fontSizeUnit: 'px',
      fontWeight: '400',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  }
};


/***/ }),

/***/ "./src/blocks/click-to-share/presets/light.js":
/*!****************************************************!*\
  !*** ./src/blocks/click-to-share/presets/light.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributes: () => (/* binding */ attributes)
/* harmony export */ });
var attributes = {
  uniqueId: 'has-light-preview',
  showClickToShare: -1,
  showIcon: -1,
  iconSize: 24,
  iconSizeResponsive: {
    mobile: 30,
    tablet: 25,
    desktop: 25
  },
  customShareText: '',
  shareText: '',
  shareTextInner: [],
  backgroundColor: '#FFFFFF',
  backgroundColorHover: '#EEEEEE',
  backgroundColorSync: 'hover',
  backgroundType: 'solid',
  backgroundGradient: '',
  backgroundGradientHover: '',
  backgroundGradientSync: 'normal',
  backgroundImage: {
    url: '',
    id: 0,
    backgroundColor: '#000000',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: 1,
    backgroundOpacityHover: 1
  },
  icon: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" class="svg-inline--fa fa-share-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>',
  iconColor: '#333333',
  iconColorHover: '#000000',
  iconColorSync: 'sync',
  textColor: '#333333',
  textColorHover: '#000000',
  textColorSync: 'sync',
  shareTextColor: '#333333',
  shareTextColorHover: '#000000',
  shareTextColorSync: 'sync',
  fontSize: 24,
  clickShareFontSize: 24,
  clickText: 'Click to Share',
  padding: -1,
  border: -1,
  borderRadius: -1,
  borderColor: '#000000',
  borderColorHover: '#000000',
  borderColorSync: 'sync',
  fontWeight: '400',
  maxWidth: '-1',
  maxWidthUnit: '-1',
  maximumWidth: {
    mobile: {
      width: '95',
      unit: 'vw'
    },
    tablet: {
      width: '95',
      unit: '%'
    },
    desktop: {
      width: '650',
      unit: 'px'
    }
  },
  showClickToShareText: {
    mobile: false,
    tablet: true,
    desktop: true
  },
  showClickToShareIcon: {
    mobile: true,
    tablet: true,
    desktop: true
  },
  align: 'center',
  alignment: 'none',
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: -1,
  paddingSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: '20',
      bottom: '20',
      left: '20',
      unit: 'px',
      unitSync: true
    }
  },
  marginSize: {
    mobile: {
      top: '0',
      right: '',
      bottom: '0',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '5',
      right: '',
      bottom: '5',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: 0,
      bottom: '20',
      left: 0,
      unit: 'px',
      unitSync: false
    }
  },
  borderWidth: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '1',
      right: '1',
      bottom: '1',
      left: '1',
      unit: 'px',
      unitSync: true
    }
  },
  borderRadiusSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '3',
      right: '3',
      bottom: '3',
      left: '3',
      unit: 'px',
      unitSync: true
    }
  },
  typographyQuote: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    desktop: {
      fontFamily: 'Roboto',
      fontFamilySlug: 'roboto',
      fontSize: '26',
      fontSizeUnit: 'px',
      fontWeight: 'normal',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  },
  typographyShareText: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    desktop: {
      fontFamily: 'Lato',
      fontFamilySlug: 'lato',
      fontSize: '28',
      fontSizeUnit: 'px',
      fontWeight: '400',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  }
};


/***/ }),

/***/ "./src/blocks/click-to-share/presets/pink.js":
/*!***************************************************!*\
  !*** ./src/blocks/click-to-share/presets/pink.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributes: () => (/* binding */ attributes)
/* harmony export */ });
var attributes = {
  uniqueId: 'has-pink-preview',
  showClickToShare: -1,
  showIcon: -1,
  iconSize: 24,
  iconSizeResponsive: {
    mobile: 30,
    tablet: 25,
    desktop: 25
  },
  customShareText: '',
  shareText: '',
  shareTextInner: [],
  backgroundColor: '#FF83FF',
  backgroundColorHover: '#EE7EEE',
  backgroundColorSync: 'hover',
  backgroundType: 'solid',
  backgroundGradient: '',
  backgroundGradientHover: '',
  backgroundGradientSync: 'normal',
  backgroundImage: {
    url: '',
    id: 0,
    backgroundColor: '#000000',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: 1,
    backgroundOpacityHover: 1
  },
  icon: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" class="svg-inline--fa fa-share-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>',
  iconColor: '#EEEEEE',
  iconColorHover: '#ffffff',
  iconColorSync: 'sync',
  textColor: '#EEEEEE',
  textColorHover: '#ffffff',
  textColorSync: 'sync',
  shareTextColor: '#EEEEEE',
  shareTextColorHover: '#ffffff',
  shareTextColorSync: 'sync',
  fontSize: 24,
  clickShareFontSize: 24,
  clickText: 'Click to Share',
  padding: -1,
  border: -1,
  borderRadius: -1,
  borderColor: '#7b5be6',
  borderColorHover: '#7b5be6',
  borderColorSync: 'sync',
  fontWeight: '400',
  maxWidth: '-1',
  maxWidthUnit: '-1',
  maximumWidth: {
    mobile: {
      width: '95',
      unit: 'vw'
    },
    tablet: {
      width: '95',
      unit: '%'
    },
    desktop: {
      width: '650',
      unit: 'px'
    }
  },
  showClickToShareText: {
    mobile: false,
    tablet: true,
    desktop: true
  },
  showClickToShareIcon: {
    mobile: true,
    tablet: true,
    desktop: true
  },
  align: 'center',
  alignment: 'none',
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: -1,
  paddingSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: '20',
      bottom: '20',
      left: '20',
      unit: 'px',
      unitSync: true
    }
  },
  marginSize: {
    mobile: {
      top: '0',
      right: '',
      bottom: '0',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '5',
      right: '',
      bottom: '5',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: 0,
      bottom: '20',
      left: 0,
      unit: 'px',
      unitSync: false
    }
  },
  borderWidth: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '1',
      right: '1',
      bottom: '1',
      left: '1',
      unit: 'px',
      unitSync: true
    }
  },
  borderRadiusSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '3',
      right: '3',
      bottom: '3',
      left: '3',
      unit: 'px',
      unitSync: true
    }
  },
  typographyQuote: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    desktop: {
      fontFamily: 'Roboto',
      fontFamilySlug: 'roboto',
      fontSize: '26',
      fontSizeUnit: 'px',
      fontWeight: 'normal',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  },
  typographyShareText: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    desktop: {
      fontFamily: 'Lato',
      fontFamilySlug: 'lato',
      fontSize: '28',
      fontSizeUnit: 'px',
      fontWeight: '400',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  }
};


/***/ }),

/***/ "./src/blocks/click-to-share/presets/purple.js":
/*!*****************************************************!*\
  !*** ./src/blocks/click-to-share/presets/purple.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributes: () => (/* binding */ attributes)
/* harmony export */ });
var attributes = {
  uniqueId: 'has-purple-preview',
  showClickToShare: -1,
  showIcon: -1,
  iconSize: 24,
  iconSizeResponsive: {
    mobile: 30,
    tablet: 25,
    desktop: 25
  },
  customShareText: '',
  shareText: '',
  shareTextInner: [],
  backgroundColor: '#8364E8',
  backgroundColorHover: '#6f4ae6',
  backgroundColorSync: 'hover',
  backgroundType: 'solid',
  backgroundGradient: '',
  backgroundGradientHover: '',
  backgroundGradientSync: 'normal',
  backgroundImage: {
    url: '',
    id: 0,
    backgroundColor: '#000000',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: 1,
    backgroundOpacityHover: 1
  },
  icon: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" class="svg-inline--fa fa-share-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>',
  iconColor: '#ffffff',
  iconColorHover: '#ffffff',
  iconColorSync: 'sync',
  textColor: '#ffffff',
  textColorHover: '#ffffff',
  textColorSync: 'sync',
  shareTextColor: '#ffffff',
  shareTextColorHover: '#ffffff',
  shareTextColorSync: 'sync',
  fontSize: 24,
  clickShareFontSize: 24,
  clickText: 'Click to Share',
  padding: -1,
  border: -1,
  borderRadius: -1,
  borderColor: '#7b5be6',
  borderColorHover: '#7b5be6',
  borderColorSync: 'sync',
  fontWeight: '400',
  maxWidth: '-1',
  maxWidthUnit: '-1',
  maximumWidth: {
    mobile: {
      width: '95',
      unit: 'vw'
    },
    tablet: {
      width: '95',
      unit: '%'
    },
    desktop: {
      width: '650',
      unit: 'px'
    }
  },
  showClickToShareText: {
    mobile: false,
    tablet: true,
    desktop: true
  },
  showClickToShareIcon: {
    mobile: true,
    tablet: true,
    desktop: true
  },
  align: 'center',
  alignment: 'none',
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: -1,
  paddingSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: '20',
      bottom: '20',
      left: '20',
      unit: 'px',
      unitSync: true
    }
  },
  marginSize: {
    mobile: {
      top: '0',
      right: '',
      bottom: '0',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '5',
      right: '',
      bottom: '5',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: 0,
      bottom: '20',
      left: 0,
      unit: 'px',
      unitSync: false
    }
  },
  borderWidth: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '1',
      right: '1',
      bottom: '1',
      left: '1',
      unit: 'px',
      unitSync: true
    }
  },
  borderRadiusSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '3',
      right: '3',
      bottom: '3',
      left: '3',
      unit: 'px',
      unitSync: true
    }
  },
  typographyQuote: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    desktop: {
      fontFamily: 'Roboto',
      fontFamilySlug: 'roboto',
      fontSize: '26',
      fontSizeUnit: 'px',
      fontWeight: 'normal',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  },
  typographyShareText: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    desktop: {
      fontFamily: 'Lato',
      fontFamilySlug: 'lato',
      fontSize: '28',
      fontSizeUnit: 'px',
      fontWeight: '400',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  }
};


/***/ }),

/***/ "./src/blocks/click-to-share/presets/red.js":
/*!**************************************************!*\
  !*** ./src/blocks/click-to-share/presets/red.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributes: () => (/* binding */ attributes)
/* harmony export */ });
var attributes = {
  uniqueId: 'has-red-preview',
  showClickToShare: -1,
  showIcon: -1,
  iconSize: 24,
  iconSizeResponsive: {
    mobile: 30,
    tablet: 25,
    desktop: 25
  },
  customShareText: '',
  shareText: '',
  shareTextInner: [],
  backgroundColor: '#FF83FF',
  backgroundColorHover: '#EE7EEE',
  backgroundColorSync: 'hover',
  backgroundType: 'gradient',
  backgroundGradient: 'linear-gradient(to top, rgb(247,112,98) 0%, rgb(254,81,150) 100%)',
  backgroundGradientHover: 'linear-gradient(0deg,rgb(218,102,89) 0%,rgb(235,73,138) 100%)',
  backgroundGradientSync: false,
  backgroundImage: {
    url: '',
    id: 0,
    backgroundColor: '#000000',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundOpacity: 1,
    backgroundOpacityHover: 1
  },
  icon: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" class="svg-inline--fa fa-share-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>',
  iconColor: '#EEEEEE',
  iconColorHover: '#ffffff',
  iconColorSync: 'sync',
  textColor: '#EEEEEE',
  textColorHover: '#ffffff',
  textColorSync: 'sync',
  shareTextColor: '#EEEEEE',
  shareTextColorHover: '#ffffff',
  shareTextColorSync: 'sync',
  fontSize: 24,
  clickShareFontSize: 24,
  clickText: 'Click to Share',
  padding: -1,
  border: -1,
  borderRadius: -1,
  borderColor: '#7b5be6',
  borderColorHover: '#7b5be6',
  borderColorSync: 'sync',
  fontWeight: '400',
  maxWidth: '-1',
  maxWidthUnit: '-1',
  maximumWidth: {
    mobile: {
      width: '95',
      unit: 'vw'
    },
    tablet: {
      width: '95',
      unit: '%'
    },
    desktop: {
      width: '650',
      unit: 'px'
    }
  },
  showClickToShareText: {
    mobile: false,
    tablet: true,
    desktop: true
  },
  showClickToShareIcon: {
    mobile: true,
    tablet: true,
    desktop: true
  },
  align: 'center',
  alignment: 'none',
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: -1,
  paddingSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: '20',
      bottom: '20',
      left: '20',
      unit: 'px',
      unitSync: true
    }
  },
  marginSize: {
    mobile: {
      top: '0',
      right: '',
      bottom: '0',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '5',
      right: '',
      bottom: '5',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '20',
      right: 0,
      bottom: '20',
      left: 0,
      unit: 'px',
      unitSync: false
    }
  },
  borderWidth: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '1',
      right: '1',
      bottom: '1',
      left: '1',
      unit: 'px',
      unitSync: true
    }
  },
  borderRadiusSize: {
    mobile: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    tablet: {
      top: '',
      right: '',
      bottom: '',
      left: '',
      unit: null,
      unitSync: null
    },
    desktop: {
      top: '3',
      right: '3',
      bottom: '3',
      left: '3',
      unit: 'px',
      unitSync: true
    }
  },
  typographyQuote: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: ''
    },
    desktop: {
      fontFamily: 'Roboto',
      fontFamilySlug: 'roboto',
      fontSize: '26',
      fontSizeUnit: 'px',
      fontWeight: 'normal',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  },
  typographyShareText: {
    mobile: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    tablet: {
      fontFamily: '',
      fontFamilySlug: '',
      fontSize: '',
      fontSizeUnit: 'px',
      fontWeight: '',
      lineHeight: '',
      lineHeightUnit: 'em',
      textTransform: '',
      letterSpacing: '',
      letterSpacingUnit: 'px',
      fontType: 'web',
      fontFallback: 'sans-serif'
    },
    desktop: {
      fontFamily: 'Lato',
      fontFamilySlug: 'lato',
      fontSize: '28',
      fontSizeUnit: 'px',
      fontWeight: '400',
      lineHeight: '1.3',
      lineHeightUnit: 'em',
      textTransform: 'none',
      letterSpacing: '0',
      letterSpacingUnit: 'px',
      fontType: 'google',
      fontFallback: 'Helvetica, Arial, sans-serif'
    }
  }
};


/***/ }),

/***/ "./src/fonts/fonts.js":
/*!****************************!*\
  !*** ./src/fonts/fonts.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var fontFamilies = {
  Arial: {
    name: 'Arial',
    slug: 'arial',
    family: 'Arial',
    type: 'web',
    fallback: 'sans-serif'
  },
  Helvetica: {
    name: 'Helvetica',
    slug: 'helvetica',
    family: 'Helvetica',
    type: 'web',
    fallback: 'sans-serif'
  },
  'Times New Roman': {
    name: 'Times New Roman',
    slug: 'times-new-roman',
    family: 'Times New Roman',
    type: 'web',
    fallback: 'serif'
  },
  Times: {
    name: 'Times',
    slug: 'times',
    family: 'Times',
    type: 'web',
    fallback: 'serif'
  },
  'Courier New': {
    name: 'Courier New',
    slug: 'courier-new',
    family: 'Courier New',
    type: 'web',
    fallback: 'monospace'
  },
  Courier: {
    name: 'Courier',
    slug: 'courier',
    family: 'Courier',
    type: 'web',
    fallback: 'Courier'
  },
  Verdana: {
    name: 'Verdana',
    slug: 'verdana',
    family: 'Verdana',
    type: 'web',
    fallback: 'sans-serif'
  },
  Georgia: {
    name: 'Georgia',
    slug: 'georgia',
    family: 'Georgia',
    type: 'web',
    fallback: 'serif'
  },
  Palatino: {
    name: 'Palatino',
    slug: 'palatino',
    family: 'Palatino',
    type: 'web',
    fallback: 'serif'
  },
  Garamond: {
    name: 'Garamond',
    slug: 'garamond',
    family: 'Garamond',
    type: 'web',
    fallback: 'serif'
  },
  Bookman: {
    name: 'Bookman',
    slug: 'bookman',
    family: 'Bookman',
    type: 'web',
    fallback: 'serif'
  },
  'Trebuchet MS': {
    name: 'Trebuchet MS',
    slug: 'trebuchet-ms',
    family: 'Trebuchet MS',
    type: 'web',
    fallback: 'sans-serif'
  },
  'Arial Black': {
    name: 'Arial Black',
    slug: 'arial-black',
    family: 'Arial Black',
    type: 'web',
    fallback: 'sans-serif'
  },
  Impact: {
    name: 'Impact',
    slug: 'impact',
    family: 'Impact',
    type: 'web',
    fallback: 'sans-serif'
  },
  Roboto: {
    name: 'Roboto',
    slug: 'roboto',
    family: 'Roboto',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  'Josefin Sans': {
    name: 'Josefin Sans',
    slug: 'josefin-sans',
    family: 'Josefin Sans',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  Karla: {
    name: 'Karla',
    slug: 'karla',
    family: 'Karla',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  Lato: {
    name: 'Lato',
    slug: 'lato',
    family: 'Lato',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  Montserrat: {
    name: 'Montserrat',
    slug: 'montserrat',
    family: 'Montserrat',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  'Open Sans': {
    name: 'Open Sans',
    slug: 'open-sans',
    family: 'Open Sans',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  'Playfair Display': {
    name: 'Playfair Display',
    slug: 'playfair-display',
    family: 'Playfair Display',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  Raleway: {
    name: 'Raleway',
    slug: 'raleway',
    family: 'Raleway',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  'Source Sans Pro': {
    name: 'Source Sans Pro',
    slug: 'source-sans-pro',
    family: 'Source Sans Pro',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fontFamilies);

/***/ }),

/***/ "./src/react/Components/BackgroundSelector/index.js":
/*!**********************************************************!*\
  !*** ./src/react/Components/BackgroundSelector/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ColorPicker */ "./src/react/Components/ColorPicker/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var BackgroundSelector = function BackgroundSelector(props) {
  var mediaUploadButton = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    backgroundSettingsVisible = _useState2[0],
    setBackgroundSettingsVisible = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    backgroundSettingsPopoverAnchor = _useState4[0],
    setBackgroundSettingsPopoverAnchor = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isVisible = _useState6[0],
    setIsVisible = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isToggled = _useState8[0],
    setIsToggled = _useState8[1];

  // Background error image state.
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    errorImage = _useState0[0],
    setErrorImage = _useState0[1];
  var getDefaultValues = function getDefaultValues() {
    return {
      url: props.values.url,
      id: props.values.id,
      backgroundColor: props.values.backgroundColor,
      backgroundSize: props.values.backgroundSize,
      backgroundPosition: props.values.backgroundPosition,
      backgroundRepeat: props.values.backgroundRepeat,
      backgroundOpacity: props.values.backgroundOpacity,
      backgroundOpacityHover: props.values.backgroundOpacityHover
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useWatch)({
    control: control
  });
  var label = props.label;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    props.onValuesChange(formValues);
  }, [formValues]);
  var getBackgroundRepeat = function getBackgroundRepeat() {
    var backgroundRepeat = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('repeat-x', 'highlight-and-share'),
      value: 'repeat-x'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('repeat-y', 'highlight-and-share'),
      value: 'repeat-y'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('repeat', 'highlight-and-share'),
      value: 'repeat'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('no-repeat', 'highlight-and-share'),
      value: 'no-repeat'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
      name: 'backgroundRepeat',
      control: control,
      render: function render(_ref) {
        var _ref$field = _ref.field,
          _onChange = _ref$field.onChange,
          value = _ref$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Repeat', 'highlight-and-share'),
          value: value,
          options: backgroundRepeat,
          onChange: function onChange(newValue) {
            _onChange(newValue);
          }
        });
      }
    });
  };

  /**
   * Close color popup if visible.
   */
  var toggleClose = function toggleClose() {
    setIsToggled(true);
    setIsVisible(!isVisible);
    setTimeout(function () {
      setIsToggled(false);
    }, 500);
  };
  var getPopoverContent = function getPopoverContent() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
      className: "has-background-settings-popover"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector__row_item"
    }, getBackgroundRepeat()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector__row_item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
      name: 'backgroundSize',
      control: control,
      render: function render(_ref2) {
        var _ref2$field = _ref2.field,
          _onChange2 = _ref2$field.onChange,
          value = _ref2$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Size', 'highlight-and-share'),
          value: value,
          onChange: function onChange(newValue) {
            _onChange2(newValue);
          }
        });
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector__row_item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
      name: 'backgroundPosition',
      control: control,
      render: function render(_ref3) {
        var _ref3$field = _ref3.field,
          _onChange3 = _ref3$field.onChange,
          value = _ref3$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Position', 'highlight-and-share'),
          value: value,
          onChange: function onChange(newValue) {
            _onChange3(newValue);
          }
        });
      }
    })));
  };
  var getBackgroundUploader = function getBackgroundUploader() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector-upload-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
      name: 'url',
      control: control,
      render: function render(_ref4) {
        var _ref4$field = _ref4.field,
          _onChange4 = _ref4$field.onChange,
          value = _ref4$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Image', 'highlight-and-share'),
          value: value,
          onChange: function onChange(newValue) {
            _onChange4(newValue);
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter URL', 'highlight-and-share')
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector-upload-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
      onSelect: function onSelect(media) {
        if ('image' === media.type) {
          setValue('url', media.url);
          setValue('id', media.id);
        } else {
          setErrorImage(true);
          setValue('url', '');
          setValue('id', '0');
          mediaUploadButton.current.focus();
          setTimeout(function () {
            setErrorImage(false);
          }, 8000);
        }
      },
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Background Image', 'highlight-and-share'),
      mode: 'upload',
      multiple: false,
      allowedTypes: ['image'],
      value: getValues('id'),
      render: function render(_ref5) {
        var open = _ref5.open;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isSecondary: true,
          className: classnames__WEBPACK_IMPORTED_MODULE_6___default()({
            'has-background-selector-image-button-error': errorImage
          }),
          onClick: function onClick() {
            setErrorImage(false);
            open();
          },
          label: !errorImage ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Background Image', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please choose only images.', 'highlight-and-share'),
          icon: "format-image",
          showTooltip: errorImage,
          tooltipPosition: "top center",
          ref: mediaUploadButton
        });
      }
    }))));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    className: "has-background-selector-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item"
  }, getBackgroundUploader()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item has-background-selector__row_item-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Settings', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Settings', 'highlight-and-share'),
    onClick: function onClick() {
      if (isToggled) {
        setIsToggled(false);
      } else {
        setIsVisible(!isVisible);
      }
    },
    icon: "admin-settings",
    ref: setBackgroundSettingsPopoverAnchor
  }), true === isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    className: "has-component-background-settings-popup",
    noArrow: false,
    anchorRef: backgroundSettingsPopoverAnchor,
    placement: "left",
    offset: 10,
    headerTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Settings', 'highlight-and-share'),
    onClose: toggleClose
  }, getPopoverContent())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: 'backgroundColor',
    control: control,
    render: function render(_ref6) {
      var _ref6$field = _ref6.field,
        _onChange5 = _ref6$field.onChange,
        value = _ref6$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: value,
        key: 'background-color-image',
        onChange: function onChange(slug, newValue) {
          _onChange5(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'highlight-and-share'),
        defaultColors: has_gutenberg.colorPalette,
        defaultColor: '#000000',
        slug: 'background-color-image'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: 'backgroundOpacity',
    control: control,
    render: function render(_ref7) {
      var _ref7$field = _ref7.field,
        _onChange6 = _ref7$field.onChange,
        value = _ref7$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Opacity', 'highlight-and-share'),
        value: value,
        onChange: function onChange(newValue) {
          return _onChange6(newValue);
        },
        min: 0,
        max: 1,
        step: 0.01
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: 'backgroundOpacityHover',
    control: control,
    render: function render(_ref8) {
      var _ref8$field = _ref8.field,
        _onChange7 = _ref8$field.onChange,
        value = _ref8$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Opacity Hover', 'highlight-and-share'),
        value: value,
        onChange: function onChange(newValue) {
          return _onChange7(newValue);
        },
        min: 0,
        max: 1,
        step: 0.01
      });
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackgroundSelector);

/***/ }),

/***/ "./src/react/Components/ColorPicker/index.js":
/*!***************************************************!*\
  !*** ./src/react/Components/ColorPicker/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hex-to-rgba */ "./node_modules/hex-to-rgba/build/index.js");
/* harmony import */ var hex_to_rgba__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */






var HASColorPicker = function HASColorPicker(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.slug),
    _useState2 = _slicedToArray(_useState, 2),
    colorKey = _useState2[0],
    setColorKey = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isVisible = _useState4[0],
    setIsVisible = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.value),
    _useState6 = _slicedToArray(_useState5, 2),
    color = _useState6[0],
    setColor = _useState6[1];
  var defaultColor = props.defaultColor,
    defaultColors = props.defaultColors,
    value = props.value,
    _onChange = props.onChange,
    onOpacityChange = props.onOpacityChange,
    label = props.label,
    _props$alpha = props.alpha,
    alpha = _props$alpha === void 0 ? false : _props$alpha,
    valueOpacity = props.valueOpacity,
    slug = props.slug;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setColor(value);
  }, [value]);

  // Retrieve colors while avoiding duplicates.
  var getDefaultColors = function getDefaultColors() {
    var existingColors = [];
    var newColors = [];
    defaultColors.forEach(function (maybeNewColor, index) {
      if (!existingColors.includes(maybeNewColor.color)) {
        existingColors.push(maybeNewColor.color);
        newColors.push(maybeNewColor);
      }
    });
    return newColors;
  };
  var opacityIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fad",
    "data-icon": "tint",
    className: "svg-inline--fa fa-tint fa-w-11",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 352 512"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    className: "fa-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "fa-secondary",
    fill: "currentColor",
    d: "M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448A112.14 112.14 0 0 1 64 336a16 16 0 0 1 32 0 80.09 80.09 0 0 0 80 80 16 16 0 0 1 0 32z",
    opacity: "0.4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "fa-primary",
    fill: "currentColor",
    d: "M176 448A112.14 112.14 0 0 1 64 336a16 16 0 0 1 32 0 80.09 80.09 0 0 0 80 80 16 16 0 0 1 0 32z"
  })));

  /**
   * Toggle whether the color popup is showing.
   */
  var toggleVisible = function toggleVisible() {
    setIsVisible(true);
  };

  /**
   * Close color popup if visible.
   */
  var toggleClose = function toggleClose() {
    if (isVisible) {
      setIsVisible(false);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
    className: "has-component-color-picker-wrapper"
  }, !!label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "has-color-component-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, label)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-component-color-picker"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-color-picker-area has-component-color-picker-palette"
  }, !isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper has-color-picker-area has-component-color-picker-palette', value ? '' : 'components-color-palette__custom-color')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose Color', 'quotes-dlx')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    "aria-expanded": isVisible,
    className: "components-button components-circular-option-picker__option is-pressed",
    onClick: toggleVisible,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom color picker', 'quotes-dlx'),
    style: {
      background: color ? hex_to_rgba__WEBPACK_IMPORTED_MODULE_2___default()(color, valueOpacity) : 'transparent'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-color-palette__custom-color-gradient"
  }))))), isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper has-color-picker-area has-component-color-picker-palette', value ? '' : 'components-color-palette__custom-color')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose Color', 'quotes-dlx')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    "aria-expanded": isVisible,
    className: "components-button components-circular-option-picker__option is-pressed",
    onClick: toggleClose,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom color picker', 'quotes-dlx'),
    style: {
      background: color ? hex_to_rgba__WEBPACK_IMPORTED_MODULE_2___default()(color, valueOpacity) : 'transparent'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-color-palette__custom-color-gradient"
  })))), isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, {
    className: "has-component-color-picker",
    onClose: toggleClose,
    noArrow: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
    key: colorKey
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    key: colorKey,
    color: color,
    onChangeComplete: function onChangeComplete(newColor) {
      setColor(newColor.hex);
      _onChange(slug, newColor.hex);
    },
    disableAlpha: true,
    defaultValue: defaultColor
  })), alpha && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-component-color-opacity"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Opacity', 'quotes-dlx')
  }, opacityIcon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    value: valueOpacity ? valueOpacity : 0,
    onChange: function onChange(opacityValue) {
      return onOpacityChange(opacityValue);
    },
    min: 0,
    max: 1,
    step: 0.01,
    initialPosition: 1
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
    className: "has-component-color-picker-palette"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    colors: getDefaultColors(),
    value: color,
    onChange: function onChange(newColor) {
      _onChange(slug, newColor);
      setColor(newColor);
      setColorKey(newColor);
    },
    disableCustomColors: true,
    clearable: false
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-color-clear-color"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: function onClick() {
      _onChange(slug, defaultColor);
      setColorKey(defaultColor);
      setColor(defaultColor);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Color', 'quotes-dlx')))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HASColorPicker);

/***/ }),

/***/ "./src/react/Components/DimensionsBlock/index.js":
/*!*******************************************************!*\
  !*** ./src/react/Components/DimensionsBlock/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unit_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../unit-picker */ "./src/react/Components/unit-picker/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Utils/DimensionsHelper */ "./src/react/Utils/DimensionsHelper.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */


/**
 * External dependencies
 */







var DimensionsControlBlock = function DimensionsControlBlock(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('desktop'),
    _useState2 = _slicedToArray(_useState, 2),
    screenSize = _useState2[0],
    setScreenSize = _useState2[1];
  var getDefaultValues = function getDefaultValues() {
    return {
      mobile: {
        top: props.values.mobile.top,
        right: props.values.mobile.right,
        bottom: props.values.mobile.bottom,
        left: props.values.mobile.left,
        unit: props.values.mobile.unit,
        unitSync: props.values.mobile.unitSync
      },
      tablet: {
        top: props.values.tablet.top,
        right: props.values.tablet.right,
        bottom: props.values.tablet.bottom,
        left: props.values.tablet.left,
        unit: props.values.tablet.unit,
        unitSync: props.values.tablet.unitSync
      },
      desktop: {
        top: props.values.desktop.top,
        right: props.values.desktop.right,
        bottom: props.values.desktop.bottom,
        left: props.values.desktop.left,
        unit: props.values.desktop.unit,
        unitSync: props.values.desktop.unitSync
      }
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useWatch)({
    control: control
  });
  var _props$label = props.label,
    label = _props$label === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Padding', 'highlight-and-share') : _props$label,
    _props$labelTop = props.labelTop,
    labelTop = _props$labelTop === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top', 'highlight-and-share') : _props$labelTop,
    _props$labelRight = props.labelRight,
    labelRight = _props$labelRight === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Right', 'highlight-and-share') : _props$labelRight,
    _props$labelBottom = props.labelBottom,
    labelBottom = _props$labelBottom === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom', 'highlight-and-share') : _props$labelBottom,
    _props$labelLeft = props.labelLeft,
    labelLeft = _props$labelLeft === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Left', 'highlight-and-share') : _props$labelLeft,
    units = props.units,
    onValuesChange = props.onValuesChange;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    onValuesChange(formValues);
  }, [formValues]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setScreenSize(props.screenSize.toLowerCase());
    setValue(props.screenSize.toLowerCase(), getValues(props.screenSize.toLowerCase()));
  }, [props.screenSize]);
  /**
   * Change the all values in parent.
   *
   * @param {number} value Value to change to.
   */
  var changeAllValues = function changeAllValues(value) {
    var values = getValues(screenSize);
    values.top = value;
    values.right = value;
    values.bottom = value;
    values.left = value;
    setValue(screenSize, values);
  };

  /**
   * When the sync value is selected, sync all values to the maximum number.
   */
  var syncUnits = function syncUnits() {
    // Toggle unit sync value.
    var values = getValues(screenSize);
    values.unitSync = !values.unitSync;
    setValue(screenSize, values);

    // If we're syncing, set all values to the maximum.
    if (values.unitSync) {
      var numbers = [getValues(screenSize).top, getValues(screenSize).right, getValues(screenSize).bottom, getValues(screenSize).left];
      var syncValue = Math.max.apply(null, numbers);
      changeAllValues(syncValue);
    }
  };

  /**
   * Change the units.
   *
   * @param {string} value Unit changing (px, em, rem, vh).
   */
  var onChangeUnits = function onChangeUnits(value) {
    var values = getValues(screenSize);
    values.unit = value;
    setValue(screenSize, values);
  };
  var onDimensionChange = function onDimensionChange(value) {
    if ((0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync)) {
      changeAllValues(value);
    }
  };
  var syncIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 512"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "currentColor",
    d: "M580.2 267.3c56.2-56.2 56.2-147.4 0-203.6s-147.4-56.3-203.6 0L365.3 75l45.3 45.3 11.3-11.3c31.2-31.2 81.9-31.2 113.1 0s31.2 81.9 0 113.1L421.8 335.2c-31.2 31.2-81.9 31.2-113.1 0-25.6-25.6-30.3-64.3-13.8-94.6 1.8-3.4 3.9-6.7 6.3-9.8L250 192.4c-4.3 5.7-8.1 11.6-11.4 17.8-29.5 54.6-21.3 124.2 24.9 170.3 56.2 56.2 147.4 56.2 203.6 0l113.1-113.2zM59.8 244.7c-56.2 56.2-56.2 147.4 0 203.6s147.4 56.2 203.6 0l11.3-11.3-45.3-45.3-11.3 11.3c-31.2 31.2-81.9 31.2-113.1 0s-31.2-81.9 0-113.1l113.2-113.1c31.2-31.2 81.9-31.2 113.1 0 25.6 25.6 30.3 64.3 13.8 94.6-1.8 3.4-3.9 6.7-6.3 9.8l51.2 38.4c4.3-5.7 8.1-11.6 11.4-17.8 29.5-54.6 21.3-124.2-24.9-170.3-56.2-56.2-147.4-56.2-203.6 0L59.8 244.7z"
  }));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-base-control components-has-dimensions-control"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".unit"),
    control: control,
    render: function render(_ref) {
      var _ref$field = _ref.field,
        onChange = _ref$field.onChange,
        value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_unit_picker__WEBPACK_IMPORTED_MODULE_1__["default"], {
        label: label,
        value: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.getHierarchicalValueUnit)(props.values, screenSize, getValues(screenSize).unit),
        units: units,
        onClick: function onClick(newValue) {
          onChange(newValue);
          onChangeUnits(newValue);
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-dimensions-control__inputs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".top"),
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelTop
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
        value: getValues(screenSize).top,
        type: "number",
        label: labelTop,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).top, 'top'),
        "data-tooltip": labelTop
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".right"),
    control: control,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange2 = _ref3$field.onChange,
        value = _ref3$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelRight
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
        value: getValues(screenSize).right,
        type: "number",
        label: labelRight,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange2(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).right, 'right'),
        "data-tooltip": labelRight
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".bottom"),
    control: control,
    render: function render(_ref4) {
      var _ref4$field = _ref4.field,
        _onChange3 = _ref4$field.onChange,
        value = _ref4$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelBottom
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
        value: getValues(screenSize).bottom,
        type: "number",
        label: labelBottom,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange3(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).bottom, 'bottom')
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".left"),
    control: control,
    render: function render(_ref5) {
      var _getValues$left;
      var _ref5$field = _ref5.field,
        _onChange4 = _ref5$field.onChange,
        value = _ref5$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelLeft
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
        value: (_getValues$left = getValues(screenSize).left) !== null && _getValues$left !== void 0 ? _getValues$left : 0,
        type: "number",
        label: labelLeft,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange4(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).left, 'left')
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
    text: !!getValues(screenSize).unitSync ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unsync', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sync', 'highlight-and-share')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "components-has-dimensions-control_sync",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sync Units', 'generateblocks'),
    isPrimary: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync),
    "aria-pressed": (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync)
    // eslint-disable-next-line no-unused-vars
    ,
    onClick: function onClick(value) {
      return syncUnits();
    },
    isSmall: true
  }, syncIcon))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-dimensions-control__input-labels"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }, labelTop), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }, labelRight), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }, labelBottom), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }, labelLeft), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DimensionsControlBlock);

/***/ }),

/***/ "./src/react/Components/GradientGenerator/index.js":
/*!*********************************************************!*\
  !*** ./src/react/Components/GradientGenerator/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utils_GetRandomGradient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/GetRandomGradient */ "./src/react/Utils/GetRandomGradient.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Gradient Generator (random)
 *
 */






var HASGradientGenerator = function HASGradientGenerator(props) {
  var label = props.label,
    setAttributes = props.setAttributes;
  var getGradient = function getGradient() {
    var gradient = (0,_Utils_GetRandomGradient__WEBPACK_IMPORTED_MODULE_3__["default"])();
    setAttributes({
      backgroundGradient: gradient,
      backgroundGradientHover: gradient
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
    className: "has-component-gradient-generator-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    className: "has-component-gradient-generator",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Generate Random Gradients', 'highlight-and-share'),
    icon: "randomize",
    onClick: function onClick() {
      getGradient();
    },
    variant: "secondary"
  }));
};
HASGradientGenerator.defaultProps = {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Gradient Color', 'highlight-and-share'),
  setAttributes: function setAttributes() {}
};
HASGradientGenerator.propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  setAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HASGradientGenerator);

/***/ }),

/***/ "./src/react/Components/GradientPicker/index.js":
/*!******************************************************!*\
  !*** ./src/react/Components/GradientPicker/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */





var HASGradientPicker = function HASGradientPicker(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isVisible = _useState2[0],
    setIsVisible = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isToggled = _useState4[0],
    setIsToggled = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    gradientPickerButtonAnchor = _useState6[0],
    setGradientPickerButtonAnchor = _useState6[1];
  var label = props.label,
    onChange = props.onChange,
    value = props.value,
    clearable = props.clearable;

  /**
   * Get a gradient style object.
   *
   * @return {Object} Gradient style object.
   */
  var getGradientStyles = function getGradientStyles() {
    var hexRegex = /#?[0-9A-Fa-f]{6}/gm; // From: https://linuxhint.com/check-if-string-is-hex-in-javascript/
    if ('' === value) {
      return {
        background: '#FFFFFF'
      };
    }
    if (value.match(hexRegex)) {
      return {
        backgroundColor: value
      };
    }
    // Return gradient style value.
    return {
      backgroundImage: value
    };
  };

  /**
   * Close color popup if visible.
   */
  var toggleClose = function toggleClose() {
    setIsToggled(true);
    setIsVisible(!isVisible);
    setTimeout(function () {
      setIsToggled(false);
    }, 500);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.BaseControl, {
    className: "has-component-gradient-picker-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "has-component-gradient-picker",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Open Gradient Picker', 'highlight-and-share'),
    style: getGradientStyles(),
    ref: gradientPickerButtonAnchor,
    onClick: function onClick() {
      if (isToggled) {
        setIsToggled(false);
      } else {
        setIsVisible(!isVisible);
      }
    }
  }), true === isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
    className: "has-component-gradient-picker-popover",
    noArrow: false,
    anchor: gradientPickerButtonAnchor,
    placement: "left",
    offset: 8,
    onClose: toggleClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.GradientPicker, {
    value: value,
    onChange: onChange,
    clearable: clearable,
    gradients: []
  })));
};
HASGradientPicker.defaultProps = {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Gradient Color', 'highlight-and-share'),
  clearable: false,
  value: '',
  onChange: function onChange() {}
};
HASGradientPicker.propTypes = {
  clearable: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  value: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  label: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HASGradientPicker);

/***/ }),

/***/ "./src/react/Components/GradientSync/index.js":
/*!****************************************************!*\
  !*** ./src/react/Components/GradientSync/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */





var HASGradientSync = function HASGradientSync(props) {
  var label = props.label,
    attributes = props.attributes,
    setAttributes = props.setAttributes;
  var backgroundGradient = attributes.backgroundGradient,
    backgroundGradientSync = attributes.backgroundGradientSync;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (backgroundGradientSync) {
      setAttributes({
        backgroundGradientHover: backgroundGradient
      });
    }
  }, [backgroundGradient, backgroundGradientSync]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.BaseControl, {
    className: "has-component-gradient-sync-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "has-component-gradient-sync",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sync Background Gradients', 'highlight-and-share'),
    icon: backgroundGradientSync ? 'admin-links' : 'editor-unlink',
    onClick: function onClick() {
      setAttributes({
        backgroundGradientSync: !backgroundGradientSync
      });
    },
    variant: backgroundGradientSync ? 'primary' : 'secondary'
  }));
};
HASGradientSync.defaultProps = {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Gradient Color', 'highlight-and-share'),
  attributes: {},
  setAttributes: function setAttributes() {}
};
HASGradientSync.propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  attributes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  setAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HASGradientSync);

/***/ }),

/***/ "./src/react/Components/Icons/CircularExplanation.js":
/*!***********************************************************!*\
  !*** ./src/react/Components/Icons/CircularExplanation.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);

 // ES6

var CircularExclamationIcon = function CircularExclamationIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: props.width,
    height: props.height
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "var( ".concat(props["var"], ")"),
    d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-24 152c0-13.2 10.8-24 24-24s24 10.75 24 24v128c0 13.25-10.75 24-24 24s-24-10.7-24-24V152zm24 248c-17.36 0-31.44-14.08-31.44-31.44s14.07-31.44 31.44-31.44 31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"
  }));
};
CircularExclamationIcon.defaultProps = {
  width: 16,
  height: 16,
  fill: '#333333'
};
CircularExclamationIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircularExclamationIcon);

/***/ }),

/***/ "./src/react/Components/Icons/ColorCircle.js":
/*!***************************************************!*\
  !*** ./src/react/Components/Icons/ColorCircle.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var ColorCircle = function ColorCircle(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: "24",
    height: "24"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "currentColor",
    stroke: "#333",
    strokeWidth: "6px",
    strokeLinejoin: "round",
    d: "M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512z"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorCircle);

/***/ }),

/***/ "./src/react/Components/Notice/index.js":
/*!**********************************************!*\
  !*** ./src/react/Components/Notice/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// eslint-disable-next-line no-unused-vars





var Notice = function Notice(props) {
  var message = props.message,
    status = props.status,
    politeness = props.politeness,
    icon = props.icon,
    className = props.className,
    inline = props.inline,
    children = props.children,
    animate = props.animate,
    animationType = props.animationType;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__.speak)(message, politeness);
  }, [message, status, politeness]);
  var hasIcon = function hasIcon() {
    return icon !== null;
  };
  var getIcon = function getIcon(Icon) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Icon, {
      width: 16,
      height: 16,
      fill: "#6c757d"
    });
  };
  var containerClasses = classnames__WEBPACK_IMPORTED_MODULE_4___default()(className, 'has-admin__notice', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'has-admin__notice--has-icon': hasIcon()
  }, "has-admin__notice-type--".concat(status), true), "has-admin__notice-appearance--inline", inline), "has-admin__notice-appearance--block", !inline), "has-admin__notice-animate", animate), "has-admin__notice-animate--".concat(animationType), animate));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: containerClasses
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, _extends({
    isDismissible: false,
    spokenMessage: message,
    actions: []
  }, props), hasIcon() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin__notice-icon"
  }, getIcon(icon)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin__notice-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, message, " ", children, " "))));
};
Notice.defaultProps = {
  message: '',
  status: 'info',
  politeness: 'polite',
  icon: null,
  className: '',
  inline: false,
  animate: false,
  animationType: 'fadein'
};
Notice.propTypes = {
  message: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  status: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(['info', 'warning', 'success', 'error']),
  politeness: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(['assertive', 'polite']),
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  inline: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  animate: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  animatitionType: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(['fadein', 'fadeout'])
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notice);

/***/ }),

/***/ "./src/react/Components/Typography/index.js":
/*!**************************************************!*\
  !*** ./src/react/Components/Typography/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fonts_fonts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../fonts/fonts */ "./src/fonts/fonts.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Utils/TypographyHelper */ "./src/react/Utils/TypographyHelper.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var Typography = function Typography(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('desktop'),
    _useState2 = _slicedToArray(_useState, 2),
    screenSize = _useState2[0],
    setScreenSize = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    fontSizeUnitPopoverVisible = _useState4[0],
    setFontSizeUnitPopoverVisible = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    fontSizeUnitPopoverAnchor = _useState6[0],
    setFontSizeUnitPopoverAnchor = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    lineHeightUnitPopoverVisible = _useState8[0],
    setLineHeightUnitPopoverVisible = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    lineHeightUnitPopoverAnchor = _useState0[0],
    setLineHeightUnitPopoverAnchor = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    letterSpacingUnitPopoverVisible = _useState10[0],
    setLetterSpacingUnitPopoverVisible = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    letterSpacingUnitPopoverAnchor = _useState12[0],
    setLetterSpacingUnitPopoverAnchor = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    fontSettingsPopoverVisible = _useState14[0],
    setFontSettingsPopoverVisible = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    fontSettingsPopoverAnchor = _useState16[0],
    setFontSettingsPopoverAnchor = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    isVisible = _useState18[0],
    setIsVisible = _useState18[1]; // for the main typography settings popup.
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    isToggled = _useState20[0],
    setIsToggled = _useState20[1]; // for the main typography settings popup.

  var getDefaultValues = function getDefaultValues() {
    return {
      mobile: {
        fontFamily: props.values.mobile.fontFamily,
        fontFamilySlug: props.values.mobile.fontFamilySlug,
        fontSize: props.values.mobile.fontSize,
        fontSizeUnit: props.values.mobile.fontSizeUnit,
        fontWeight: props.values.mobile.fontWeight,
        lineHeight: props.values.mobile.lineHeight,
        lineHeightUnit: props.values.mobile.lineHeightUnit,
        textTransform: props.values.mobile.textTransform,
        letterSpacing: props.values.mobile.letterSpacing,
        letterSpacingUnit: props.values.mobile.letterSpacingUnit,
        fontType: props.values.mobile.fontType,
        fontFallback: props.values.mobile.fontFallback
      },
      tablet: {
        fontFamily: props.values.tablet.fontFamily,
        fontFamilySlug: props.values.tablet.fontFamilySlug,
        fontSize: props.values.tablet.fontSize,
        fontSizeUnit: props.values.tablet.fontSizeUnit,
        fontWeight: props.values.tablet.fontWeight,
        lineHeight: props.values.tablet.lineHeight,
        lineHeightUnit: props.values.tablet.lineHeightUnit,
        textTransform: props.values.tablet.textTransform,
        letterSpacing: props.values.tablet.letterSpacing,
        letterSpacingUnit: props.values.tablet.letterSpacingUnit,
        fontType: props.values.tablet.fontType,
        fontFallback: props.values.tablet.fontFallback
      },
      desktop: {
        fontFamily: props.values.desktop.fontFamily,
        fontFamilySlug: props.values.desktop.fontFamilySlug,
        fontSize: props.values.desktop.fontSize,
        fontSizeUnit: props.values.desktop.fontSizeUnit,
        fontWeight: props.values.desktop.fontWeight,
        lineHeight: props.values.desktop.lineHeight,
        lineHeightUnit: props.values.desktop.lineHeightUnit,
        textTransform: props.values.desktop.textTransform,
        letterSpacing: props.values.desktop.letterSpacing,
        letterSpacingUnit: props.values.desktop.letterSpacingUnit,
        fontType: props.values.desktop.fontType,
        fontFallback: props.values.desktop.fontFallback
      }
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues;
  var _useSettings = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useSettings)('typography.fontFamilies'),
    _useSettings2 = _slicedToArray(_useSettings, 1),
    blockLevelFontFamilies = _useSettings2[0];
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useWatch)({
    control: control
  });
  var label = props.label;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    props.onValuesChange(formValues);
  }, [formValues]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setScreenSize(props.screenSize.toLowerCase());
    setValue(props.screenSize.toLowerCase(), getValues(props.screenSize.toLowerCase()));
  }, [props.screenSize]);

  /**
   * Close color popup if visible.
   */
  var toggleClose = function toggleClose() {
    setIsToggled(true);
    setIsVisible(!isVisible);
    setTimeout(function () {
      setIsToggled(false);
    }, 500);
  };

  // Retrieve the list all available fonts.
  var getFonts = function getFonts() {
    var adobeFonts = has_gutenberg.adobeFonts;
    var fonts = [];
    var families = Object.values(_fonts_fonts__WEBPACK_IMPORTED_MODULE_1__["default"]);
    var mergedFamilies = [];
    families.forEach(function (fontFamily) {
      fonts.push({
        label: fontFamily.name,
        value: fontFamily.slug
      });
      mergedFamilies.push({
        family: fontFamily.family,
        slug: fontFamily.slug,
        fallback: fontFamily.fallback,
        type: fontFamily.type
      });
    });
    if (blockLevelFontFamilies) {
      var theme = blockLevelFontFamilies.theme;
      if (theme) {
        theme.forEach(function (fontFamily) {
          fonts.push({
            label: fontFamily.name,
            value: fontFamily.slug
          });
          mergedFamilies.push({
            family: fontFamily.name,
            slug: fontFamily.slug,
            fallback: fontFamily.fallback,
            type: 'web'
          });
        });
      }
    }
    // Push adobe fonts to the front.
    adobeFonts.forEach(function (font) {
      fonts.unshift({
        label: font.name,
        value: font.slug
      });
      mergedFamilies.push({
        family: font.family,
        slug: font.slug,
        fallback: font.fallback,
        type: 'adobe'
      });
    });
    // Add placeholder.
    fonts.unshift({
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select a Font', 'highlight-and-share'),
      value: ''
    });

    // Don't show font family on non-desktop sizes.
    if ('desktop' !== screenSize) {
      return null;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".fontFamilySlug"),
      control: control,
      render: function render(_ref) {
        var _ref$field = _ref.field,
          _onChange = _ref$field.onChange,
          value = _ref$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font Family', 'highlight-and-share'),
          value: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).fontFamilySlug, 'fontFamilySlug'),
          options: fonts,
          onChange: function onChange(newValue) {
            _onChange(newValue);

            // Get font family name for CSS.
            mergedFamilies.forEach(function (font) {
              if (font.slug === newValue) {
                setValue("".concat(screenSize, ".fontFamily"), font.family);
                setValue("".concat(screenSize, ".fontFallback"), font.fallback);
                setValue("".concat(screenSize, ".fontType"), font.type);
              }
            });
          }
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".fontFamily"),
      control: control,
      render: function render(_ref2) {
        var value = _ref2.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontFamily
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".fontFallback"),
      control: control,
      render: function render(_ref3) {
        var value = _ref3.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontFallback
        });
      }
    }));
  };
  var getTextTransform = function getTextTransform() {
    var textTransform = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('None', 'highlight-and-share'),
      value: 'none'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uppercase', 'highlight-and-share'),
      value: 'uppercase'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Lowercase', 'highlight-and-share'),
      value: 'lowercase'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Capitalize', 'highlight-and-share'),
      value: 'capitalize'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".textTransform"),
      control: control,
      render: function render(_ref4) {
        var _ref4$field = _ref4.field,
          _onChange2 = _ref4$field.onChange,
          value = _ref4$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text Transform', 'highlight-and-share'),
          value: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).textTransform, 'textTransform'),
          options: textTransform,
          onChange: function onChange(newValue) {
            _onChange2(newValue);
          }
        });
      }
    });
  };
  var getFontSize = function getFontSize() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".fontSize"),
      control: control,
      render: function render(_ref5) {
        var _onChange3 = _ref5.field.onChange;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font Size', 'highlight-and-share'),
          value: getValues(screenSize).fontSize,
          onChange: function onChange(newValue) {
            _onChange3(newValue);
          },
          type: "number",
          placeholder: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).fontSize, 'fontSize')
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".fontSizeUnit"),
      control: control,
      render: function render(_ref6) {
        var value = _ref6.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontSizeUnit
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      variant: "secondary",
      label: getValues("".concat(screenSize, ".fontSizeUnit")),
      onClick: function onClick() {
        setFontSizeUnitPopoverVisible(!fontSizeUnitPopoverVisible);
      },
      ref: setFontSizeUnitPopoverAnchor
    }, getValues("".concat(screenSize, ".fontSizeUnit"))), true === fontSizeUnitPopoverVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, {
      className: "has-component-font-unit-picker",
      noArrow: true,
      anchor: fontSizeUnitPopoverAnchor
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".fontSizeUnit")) === 'px',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".fontSizeUnit"), 'px');
        setFontSizeUnitPopoverVisible(false);
      }
    }, "px"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".fontSizeUnit")) === 'em',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".fontSizeUnit"), 'em');
        setFontSizeUnitPopoverVisible(false);
      }
    }, "em"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".fontSizeUnit")) === 'rem',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".fontSizeUnit"), 'rem');
        setFontSizeUnitPopoverVisible(false);
      }
    }, "rem"))));
  };
  var getFontWeights = function getFontWeights() {
    var fontWeights = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('100', 'highlight-and-share'),
      value: '100'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('200', 'highlight-and-share'),
      value: '200'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('300', 'highlight-and-share'),
      value: '300'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('400', 'highlight-and-share'),
      value: '400'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('500', 'highlight-and-share'),
      value: '500'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('600', 'highlight-and-share'),
      value: '600'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('700', 'highlight-and-share'),
      value: '700'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('800', 'highlight-and-share'),
      value: '800'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('900', 'highlight-and-share'),
      value: '900'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".fontWeight"),
      control: control,
      render: function render(_ref7) {
        var _ref7$field = _ref7.field,
          _onChange4 = _ref7$field.onChange,
          value = _ref7$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font Weight', 'highlight-and-share'),
          value: getValues(screenSize).fontWeight,
          options: fontWeights,
          onChange: function onChange(newValue) {
            _onChange4(newValue);
          }
        });
      }
    });
  };
  var getLineHeight = function getLineHeight() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".lineHeight"),
      control: control,
      render: function render(_ref8) {
        var _ref8$field = _ref8.field,
          _onChange5 = _ref8$field.onChange,
          value = _ref8$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Line Height', 'highlight-and-share'),
          value: getValues(screenSize).lineHeight,
          onChange: function onChange(newValue) {
            _onChange5(newValue);
          },
          type: "number",
          placeholder: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).lineHeight, 'lineHeight')
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".lineHeightUnit"),
      control: control,
      render: function render(_ref9) {
        var value = _ref9.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).lineHeightUnit
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      variant: "secondary",
      label: getValues("".concat(screenSize, ".lineHeightUnit")),
      onClick: function onClick() {
        setLineHeightUnitPopoverVisible(!lineHeightUnitPopoverVisible);
      },
      ref: setLineHeightUnitPopoverAnchor
    }, getValues("".concat(screenSize, ".lineHeightUnit"))), true === lineHeightUnitPopoverVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, {
      className: "has-component-font-unit-picker",
      noArrow: true,
      anchor: lineHeightUnitPopoverAnchor
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".lineHeightUnit")) === 'px',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".lineHeightUnit"), 'px');
        setLineHeightUnitPopoverVisible(false);
      }
    }, "px"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".lineHeightUnit")) === 'em',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".lineHeightUnit"), 'em');
        setLineHeightUnitPopoverVisible(false);
      }
    }, "em"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".lineHeightUnit")) === 'rem',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".lineHeightUnit"), 'rem');
        setLineHeightUnitPopoverVisible(false);
      }
    }, "rem"))));
  };
  var getFontType = function getFontType() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".fontType"),
      control: control,
      render: function render(_ref0) {
        var value = _ref0.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontType
        });
      }
    });
  };
  var getFontFallback = function getFontFallback() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".fontFallback"),
      control: control,
      render: function render(_ref1) {
        var value = _ref1.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontFallback
        });
      }
    });
  };
  var getLetterSpacing = function getLetterSpacing() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".letterSpacing"),
      control: control,
      render: function render(_ref10) {
        var _ref10$field = _ref10.field,
          _onChange6 = _ref10$field.onChange,
          value = _ref10$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Letter Spacing', 'highlight-and-share'),
          value: getValues(screenSize).letterSpacing,
          onChange: function onChange(newValue) {
            _onChange6(newValue);
          },
          type: "number",
          placeholder: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).letterSpacing, 'letterSpacing')
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: "".concat(screenSize, ".letterSpacingUnit"),
      control: control,
      render: function render(_ref11) {
        var value = _ref11.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).letterSpacingUnit
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      variant: "secondary",
      label: getValues("".concat(screenSize, ".letterSpacingUnit")),
      onClick: function onClick() {
        setLetterSpacingUnitPopoverVisible(!letterSpacingUnitPopoverVisible);
      },
      ref: setLetterSpacingUnitPopoverAnchor
    }, getValues("".concat(screenSize, ".letterSpacingUnit"))), true === letterSpacingUnitPopoverVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, {
      className: "has-component-font-unit-picker",
      noArrow: true,
      anchor: letterSpacingUnitPopoverAnchor
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".letterSpacingUnit")) === 'px',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".letterSpacingUnit"), 'px');
        setLetterSpacingUnitPopoverVisible(false);
      }
    }, "px"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".letterSpacingUnit")) === 'em',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".letterSpacingUnit"), 'em');
        setLetterSpacingUnitPopoverVisible(false);
      }
    }, "em"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: getValues("".concat(screenSize, ".letterSpacingUnit")) === 'rem',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".letterSpacingUnit"), 'rem');
        setLetterSpacingUnitPopoverVisible(false);
      }
    }, "rem"))));
  };
  var getPopoverContent = function getPopoverContent() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
      className: "has-typography-picker"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row has-typography-picker__row__col-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item"
    }, getFonts())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row has-typography-picker__row__col-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item"
    }, getTextTransform(), getFontType(), getFontFallback())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row has-typography-picker__row__col-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item has-units"
    }, getFontSize()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item"
    }, getFontWeights())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row has-typography-picker__row__col-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item has-units"
    }, getLineHeight()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item has-units"
    }, getLetterSpacing())));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
    className: "has-typography-picker-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-typography-component-label"
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-typography-component-settings"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "secondary",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Font Settings', 'highlight-and-share'),
    onClick: function onClick() {
      if (isToggled) {
        setIsToggled(false);
      } else {
        setIsVisible(!isVisible);
      }
    },
    icon: "admin-settings"
  }), true === isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, {
    className: "has-component-typography-popup",
    noArrow: false,
    anchor: fontSettingsPopoverAnchor,
    placement: "left",
    offset: 10,
    onClose: toggleClose
  }, getPopoverContent())));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Typography);

/***/ }),

/***/ "./src/react/Components/unit-picker/index.js":
/*!***************************************************!*\
  !*** ./src/react/Components/unit-picker/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Unit Picker Component.
 * Credit: Forked from @GenerateBlocks
 */




var UnitChooser = function UnitChooser(props) {
  var label = props.label,
    value = props.value,
    _onClick = props.onClick,
    units = props.units;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-units-control-header__units"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-units-control-label__units"
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-control__units"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
    className: "components-has-control-buttons__units",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Units', 'highlight-and-share')
  }, units.map(function (unit) {
    var unitName = unit;
    if ('px' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Pixel', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('em' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Em', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('%' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Percentage', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('vw' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('View Width', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('rem' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Rem', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('deg' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Degree', 'A size unit for CSS markup', 'highlight-and-share');
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: Unit type (px, em, %) */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s Units', 'highlight-and-share'), unitName),
      key: unit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      key: unit,
      className: 'components-has-control-button__units--' + unit,
      isSmall: true,
      isPrimary: value === unit,
      "aria-pressed": value === unit,
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s Units', 'highlight-and-share'), unitName),
      onClick: function onClick() {
        return _onClick(unit);
      }
    }, unit));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UnitChooser);

/***/ }),

/***/ "./src/react/Hooks/useDeviceType.js":
/*!******************************************!*\
  !*** ./src/react/Hooks/useDeviceType.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



/* Credits: Forked from GenerateBlocks */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)('core/edit-post'),
    _useDispatch$__experi = _useDispatch.__experimentalSetPreviewDeviceType,
    setPreviewDeviceType = _useDispatch$__experi === void 0 ? function () {} : _useDispatch$__experi;
  var deviceType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(function (select) {
    var _select = select('core/edit-post'),
      _select$__experimenta = _select.__experimentalGetPreviewDeviceType,
      experimentalGetPreviewDeviceType = _select$__experimenta === void 0 ? function () {
        return false;
      } : _select$__experimenta;
    return experimentalGetPreviewDeviceType();
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {}, [deviceType]);
  var setDeviceType = function setDeviceType(type) {
    setPreviewDeviceType(type);
  };
  return [deviceType, setDeviceType];
});

/***/ }),

/***/ "./src/react/Utils/DimensionsHelper.js":
/*!*********************************************!*\
  !*** ./src/react/Utils/DimensionsHelper.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildDimensionsCSS: () => (/* binding */ buildDimensionsCSS),
/* harmony export */   geHierarchicalPlaceholderValue: () => (/* binding */ geHierarchicalPlaceholderValue),
/* harmony export */   getHierarchicalValueUnit: () => (/* binding */ getHierarchicalValueUnit),
/* harmony export */   getHierarchicalValueUnitSync: () => (/* binding */ getHierarchicalValueUnitSync)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShorthandCSS */ "./src/react/Utils/ShorthandCSS.js");



/**
 * Build CSS rules for dimensions and screen size.
 *
 * @param {Object} props      Dimensions array (see /components/DimensionsBlock).
 * @param {string} screenSize mobile|tablet|desktop.
 *
 * @return {string} CSS rules.
 */
function buildDimensionsCSS(props, screenSize) {
  screenSize = screenSize.toLowerCase();
  if ('undefined' === typeof props) {
    return '';
  }
  var dimensions = props[screenSize];
  if ('desktop' === screenSize) {
    var top = dimensions.top;
    var right = dimensions.right;
    var bottom = dimensions.bottom;
    var left = dimensions.left;
    var unit = dimensions.unit;
    return (0,_ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__["default"])(top, right, bottom, left, unit);
  }
  if ('tablet' === screenSize || 'mobile' === screenSize) {
    var _top = geHierarchicalPlaceholderValue(props, screenSize, dimensions.top, 'top');
    var _right = geHierarchicalPlaceholderValue(props, screenSize, dimensions.right, 'right');
    var _bottom = geHierarchicalPlaceholderValue(props, screenSize, dimensions.bottom, 'bottom');
    var _left = geHierarchicalPlaceholderValue(props, screenSize, dimensions.left, 'left');
    var _unit = getHierarchicalValueUnit(props, screenSize, dimensions.unit);
    return (0,_ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__["default"])(_top, _right, _bottom, _left, _unit);
  }
  return '';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 * @param {string} type       Type of value (top, right, bottom, left, etc.).
 *
 * @return {string} Value placeholder.
 */
function geHierarchicalPlaceholderValue(props, screenSize, value, type) {
  // Check mobile screen size.
  if ('mobile' === screenSize && '' === value) {
    // Check tablet.
    if ('' !== props.tablet[type]) {
      return props.tablet[type];
    } else if ('' !== props.desktop[type]) {
      // Check desktop.
      return props.desktop[type];
    }
  }

  // Check tablet screen size.
  if ('tablet' === screenSize && '' === value) {
    if ('' !== props.desktop[type]) {
      // Check desktop.
      return props.desktop[type];
    }
  }
  if ('' !== value) {
    return value;
  }
  return '0';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 *
 * @return {string} Value default or hierarchical value.
 */
function getHierarchicalValueUnit(props, screenSize, value) {
  // Check mobile screen size.
  if ('mobile' === screenSize && null === value) {
    if (null === props.tablet.unit) {
      return props.desktop.unit;
    }
    return props.tablet.unit;
  }
  if ('tablet' === screenSize && null === value) {
    return props.desktop.unit;
  }
  if (null === value) {
    return 'px';
  }
  return value;
}

/**
 * Get a value based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 *
 * @return {boolean} Value default or hierarchical value.
 */
function getHierarchicalValueUnitSync(props, screenSize, value) {
  // Check mobile screen size.
  if ('mobile' === screenSize && null === value) {
    if (null === props.tablet.unitSync) {
      return props.desktop.unitSync;
    }
    return props.tablet.unitSync;
  }
  if ('tablet' === screenSize && null === value) {
    return props.desktop.unitSync;
  }
  if (null === value) {
    return true;
  }
  return value;
}

/***/ }),

/***/ "./src/react/Utils/GetRandomGradient.js":
/*!**********************************************!*\
  !*** ./src/react/Utils/GetRandomGradient.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var gradients = [{
  label: 'Warm Flame',
  value: 'linear-gradient(45deg, rgb(255,154,158) 0%, rgb(250,208,196) 99%, rgb(250,208,196) 100%)'
}, {
  label: 'Night Fade',
  value: 'linear-gradient(to top, rgb(161,140,209) 0%, rgb(251,194,235) 100%)'
}, {
  label: 'Spring Warmth',
  value: 'linear-gradient(to top, rgb(250,208,196) 0%, rgb(255,209,255) 100%)'
}, {
  label: 'Juicy Peach',
  value: 'linear-gradient(to right, rgb(255,236,210) 0%, rgb(252,182,159) 100%)'
}, {
  label: 'Young Passion',
  value: 'linear-gradient(to right, rgb(255,129,119) 0%, rgb(255,134,122) 0%, rgb(255,140,127) 21%, rgb(249,145,133) 52%, rgb(207,85,108) 78%, rgb(177,42,91) 100%)'
}, {
  label: 'Lady Lips',
  value: 'linear-gradient(to top, rgb(255,154,158) 0%, rgb(254,207,239) 99%, rgb(254,207,239) 100%)'
}, {
  label: 'Sunny Morning',
  value: 'linear-gradient(120deg, rgb(246,211,101) 0%, rgb(253,160,133) 100%)'
}, {
  label: 'Rainy Ashville',
  value: 'linear-gradient(to top, rgb(251,194,235) 0%, rgb(166,193,238) 100%)'
}, {
  label: 'Frozen Dreams',
  value: 'linear-gradient(to top, rgb(253,203,241) 0%, rgb(253,203,241) 1%, rgb(230,222,233) 100%)'
}, {
  label: 'Winter Neva',
  value: 'linear-gradient(120deg, rgb(161,196,253) 0%, rgb(194,233,251) 100%)'
}, {
  label: 'Dusty Grass',
  value: 'linear-gradient(120deg, rgb(212,252,121) 0%, rgb(150,230,161) 100%)'
}, {
  label: 'Tempting Azure',
  value: 'linear-gradient(120deg, rgb(132,250,176) 0%, rgb(143,211,244) 100%)'
}, {
  label: 'Heavy Rain',
  value: 'linear-gradient(to top, rgb(207,217,223) 0%, rgb(226,235,240) 100%)'
}, {
  label: 'Amy Crisp',
  value: 'linear-gradient(120deg, rgb(166,192,254) 0%, rgb(246,128,132) 100%)'
}, {
  label: 'Mean Fruit',
  value: 'linear-gradient(120deg, rgb(252,203,144) 0%, rgb(213,126,235) 100%)'
}, {
  label: 'Deep Blue',
  value: 'linear-gradient(120deg, rgb(224,195,252) 0%, rgb(142,197,252) 100%)'
}, {
  label: 'Ripe Malinka',
  value: 'linear-gradient(120deg, rgb(240,147,251) 0%, rgb(245,87,108) 100%)'
}, {
  label: 'Cloudy Knoxville',
  value: 'linear-gradient(120deg, rgb(253,251,251) 0%, rgb(235,237,238) 100%)'
}, {
  label: 'Malibu Beach',
  value: 'linear-gradient(to right, rgb(79,172,254) 0%, rgb(0,242,254) 100%)'
}, {
  label: 'New Life',
  value: 'linear-gradient(to right, rgb(67,233,123) 0%, rgb(56,249,215) 100%)'
}, {
  label: 'True Sunset',
  value: 'linear-gradient(to right, rgb(250,112,154) 0%, rgb(254,225,64) 100%)'
}, {
  label: 'Morpheus Den',
  value: 'linear-gradient(to top, rgb(48,207,208) 0%, rgb(51,8,103) 100%)'
}, {
  label: 'Rare Wind',
  value: 'linear-gradient(to top, rgb(168,237,234) 0%, rgb(254,214,227) 100%)'
}, {
  label: 'Near Moon',
  value: 'linear-gradient(to top, rgb(94,231,223) 0%, rgb(180,144,202) 100%)'
}, {
  label: 'Wild Apple',
  value: 'linear-gradient(to top, rgb(210,153,194) 0%, rgb(254,249,215) 100%)'
}, {
  label: 'Saint Petersburg',
  value: 'linear-gradient(135deg, rgb(245,247,250) 0%, rgb(195,207,226) 100%)'
}, {
  label: 'Arielles Smile',
  value: 'radial-gradient(circle 248px at center, rgb(22,217,227) 0%, rgb(48,199,236) 47%, rgb(70,174,247) 100%)'
}, {
  label: 'Plum Plate',
  value: 'linear-gradient(135deg, rgb(102,126,234) 0%, rgb(118,75,162) 100%)'
}, {
  label: 'Everlasting Sky',
  value: 'linear-gradient(135deg, rgb(253,252,251) 0%, rgb(226,209,195) 100%)'
}, {
  label: 'Happy Fisher',
  value: 'linear-gradient(120deg, rgb(137,247,254) 0%, rgb(102,166,255) 100%)'
}, {
  label: 'Blessing',
  value: 'linear-gradient(to top, rgb(253,219,146) 0%, rgb(209,253,255) 100%)'
}, {
  label: 'Sharpeye Eagle',
  value: 'linear-gradient(to top, rgb(152,144,227) 0%, rgb(177,244,207) 100%)'
}, {
  label: 'Ladoga Bottom',
  value: 'linear-gradient(to top, rgb(235,192,253) 0%, rgb(217,222,216) 100%)'
}, {
  label: 'Lemon Gate',
  value: 'linear-gradient(to top, rgb(150,251,196) 0%, rgb(249,245,134) 100%)'
}, {
  label: 'Itmeo Branding',
  value: 'linear-gradient(180deg, rgb(42,245,152) 0%, rgb(0,158,253) 100%)'
}, {
  label: 'Zeus Miracle',
  value: 'linear-gradient(to top, rgb(205,156,242) 0%, rgb(246,243,255) 100%)'
}, {
  label: 'Old Hat',
  value: 'linear-gradient(to right, rgb(228,175,203) 0%, rgb(184,203,184) 0%, rgb(184,203,184) 0%, rgb(226,197,139) 30%, rgb(194,206,156) 64%, rgb(126,219,220) 100%)'
}, {
  label: 'Star Wine',
  value: 'linear-gradient(to right, rgb(184,203,184) 0%, rgb(184,203,184) 0%, rgb(180,101,218) 0%, rgb(207,108,201) 33%, rgb(238,96,156) 66%, rgb(238,96,156) 100%)'
}, {
  label: 'Deep Blue',
  value: 'linear-gradient(to right, rgb(106,17,203) 0%, rgb(37,117,252) 100%)'
}, {
  label: 'Happy Acid',
  value: 'linear-gradient(to top, rgb(55,236,186) 0%, rgb(114,175,211) 100%)'
}, {
  label: 'Awesome Pine',
  value: 'linear-gradient(to top, rgb(235,187,167) 0%, rgb(207,199,248) 100%)'
}, {
  label: 'New York',
  value: 'linear-gradient(to top, rgb(255,241,235) 0%, rgb(172,224,249) 100%)'
}, {
  label: 'Shy Rainbow',
  value: 'linear-gradient(to right, rgb(238,162,162) 0%, rgb(187,193,191) 19%, rgb(87,198,225) 42%, rgb(180,159,218) 79%, rgb(122,197,216) 100%)'
}, {
  label: 'Mixed Hopes',
  value: 'linear-gradient(to top, rgb(196,113,245) 0%, rgb(250,113,205) 100%)'
}, {
  label: 'Fly High',
  value: 'linear-gradient(to top, rgb(72,198,239) 0%, rgb(111,134,214) 100%)'
}, {
  label: 'Strong Bliss',
  value: 'linear-gradient(to right, rgb(247,140,160) 0%, rgb(249,116,143) 19%, rgb(253,134,140) 60%, rgb(254,154,139) 100%)'
}, {
  label: 'Fresh Milk',
  value: 'linear-gradient(to top, rgb(254,173,166) 0%, rgb(245,239,239) 100%)'
}, {
  label: 'Snow Again',
  value: 'linear-gradient(to top, rgb(230,233,240) 0%, rgb(238,241,245) 100%)'
}, {
  label: 'February Ink',
  value: 'linear-gradient(to top, rgb(172,203,238) 0%, rgb(231,240,253) 100%)'
}, {
  label: 'Kind Steel',
  value: 'linear-gradient(-20deg, rgb(233,222,250) 0%, rgb(251,252,219) 100%)'
}, {
  label: 'Soft Grass',
  value: 'linear-gradient(to top, rgb(193,223,196) 0%, rgb(222,236,221) 100%)'
}, {
  label: 'Grown Early',
  value: 'linear-gradient(to top, rgb(11,163,96) 0%, rgb(60,186,146) 100%)'
}, {
  label: 'Sharp Blues',
  value: 'linear-gradient(to top, rgb(0,198,251) 0%, rgb(0,91,234) 100%)'
}, {
  label: 'Shady Water',
  value: 'linear-gradient(to right, rgb(116,235,213) 0%, rgb(159,172,230) 100%)'
}, {
  label: 'Dirty Beauty',
  value: 'linear-gradient(to top, rgb(106,133,182) 0%, rgb(186,200,224) 100%)'
}, {
  label: 'Great Whale',
  value: 'linear-gradient(to top, rgb(163,189,237) 0%, rgb(105,145,199) 100%)'
}, {
  label: 'Teen Notebook',
  value: 'linear-gradient(to top, rgb(151,149,240) 0%, rgb(251,200,212) 100%)'
}, {
  label: 'Polite Rumors',
  value: 'linear-gradient(to top, rgb(167,166,203) 0%, rgb(137,137,186) 52%, rgb(137,137,186) 100%)'
}, {
  label: 'Sweet Period',
  value: 'linear-gradient(to top, rgb(63,81,177) 0%, rgb(90,85,174) 13%, rgb(123,95,172) 25%, rgb(143,106,174) 38%, rgb(168,106,164) 50%, rgb(204,107,142) 62%, rgb(241,130,113) 75%, rgb(243,164,105) 87%, rgb(247,201,120) 100%)'
}, {
  label: 'Wide Matrix',
  value: 'linear-gradient(to top, rgb(252,197,228) 0%, rgb(253,163,75) 15%, rgb(255,120,130) 35%, rgb(200,105,158) 52%, rgb(112,70,170) 71%, rgb(12,29,184) 87%, rgb(2,15,117) 100%)'
}, {
  label: 'Soft Cherish',
  value: 'linear-gradient(to top, rgb(219,220,215) 0%, rgb(221,220,215) 24%, rgb(226,201,204) 30%, rgb(231,98,125) 46%, rgb(184,35,90) 59%, rgb(128,19,87) 71%, rgb(61,22,53) 84%, rgb(28,26,39) 100%)'
}, {
  label: 'Red Salvation',
  value: 'linear-gradient(to top, rgb(244,59,71) 0%, rgb(69,58,148) 100%)'
}, {
  label: 'Burning Spring',
  value: 'linear-gradient(to top, rgb(79,181,118) 0%, rgb(68,196,137) 30%, rgb(40,169,174) 46%, rgb(40,162,183) 59%, rgb(76,119,136) 71%, rgb(108,79,99) 86%, rgb(67,44,57) 100%)'
}, {
  label: 'Night Party',
  value: 'linear-gradient(to top, rgb(2,80,197) 0%, rgb(212,63,141) 100%)'
}, {
  label: 'Sky Glider',
  value: 'linear-gradient(to top, rgb(136,211,206) 0%, rgb(110,69,226) 100%)'
}, {
  label: 'Heaven Peach',
  value: 'linear-gradient(to top, rgb(217,175,217) 0%, rgb(151,217,225) 100%)'
}, {
  label: 'Purple Division',
  value: 'linear-gradient(to top, rgb(112,40,228) 0%, rgb(229,178,202) 100%)'
}, {
  label: 'Aqua Splash',
  value: 'linear-gradient(15deg, rgb(19,84,122) 0%, rgb(128,208,199) 100%)'
}, {
  label: 'Spiky Naga',
  value: 'linear-gradient(to top, rgb(80,82,133) 0%, rgb(88,94,146) 12%, rgb(101,104,159) 25%, rgb(116,116,176) 37%, rgb(126,126,187) 50%, rgb(131,137,199) 62%, rgb(151,149,212) 75%, rgb(162,161,220) 87%, rgb(181,174,228) 100%)'
}, {
  label: 'Love Kiss',
  value: 'linear-gradient(to top, rgb(255,8,68) 0%, rgb(255,177,153) 100%)'
}, {
  label: 'Cochiti Lake',
  value: 'linear-gradient(45deg, rgb(147,165,207) 0%, rgb(228,239,233) 100%)'
}, {
  label: 'Premium Dark',
  value: 'linear-gradient(to right, rgb(67,67,67) 0%, black 100%)'
}, {
  label: 'Cold Evening',
  value: 'linear-gradient(to top, rgb(12,52,131) 0%, rgb(162,182,223) 100%, rgb(107,140,206) 100%, rgb(162,182,223) 100%)'
}, {
  label: 'Summer Games',
  value: 'linear-gradient(to right, rgb(146,254,157) 0%, rgb(0,201,255) 100%)'
}, {
  label: 'Passionate Bed',
  value: 'linear-gradient(to right, rgb(255,117,140) 0%, rgb(255,126,179) 100%)'
}, {
  label: 'Mountain Rock',
  value: 'linear-gradient(to right, rgb(134,143,150) 0%, rgb(89,97,100) 100%)'
}, {
  label: 'Desert Hump',
  value: 'linear-gradient(to top, rgb(199,144,129) 0%, rgb(223,165,121) 100%)'
}, {
  label: 'Jungle Day',
  value: 'linear-gradient(45deg, rgb(139,170,170) 0%, rgb(174,139,156) 100%)'
}, {
  label: 'Phoenix Start',
  value: 'linear-gradient(to right, rgb(248,54,0) 0%, rgb(249,212,35) 100%)'
}, {
  label: 'October Silence',
  value: 'linear-gradient(-20deg, rgb(183,33,255) 0%, rgb(33,212,253) 100%)'
}, {
  label: 'Faraway River',
  value: 'linear-gradient(-20deg, rgb(110,69,226) 0%, rgb(136,211,206) 100%)'
}, {
  label: 'Alchemist Lab',
  value: 'linear-gradient(-20deg, rgb(213,88,200) 0%, rgb(36,210,146) 100%)'
}, {
  label: 'Over Sun',
  value: 'linear-gradient(60deg, rgb(171,236,214) 0%, rgb(251,237,150) 100%)'
}, {
  label: 'Premium White',
  value: 'linear-gradient(to top, rgb(213,212,208) 0%, rgb(213,212,208) 1%, rgb(238,238,236) 31%, rgb(239,238,236) 75%, rgb(233,233,231) 100%)'
}, {
  label: 'Mars Party',
  value: 'linear-gradient(to top, rgb(95,114,189) 0%, rgb(155,35,234) 100%)'
}, {
  label: 'Eternal Constance',
  value: 'linear-gradient(to top, rgb(9,32,63) 0%, rgb(83,120,149) 100%)'
}, {
  label: 'Japan Blush',
  value: 'linear-gradient(-20deg, rgb(221,214,243) 0%, rgb(250,172,168) 100%, rgb(250,172,168) 100%)'
}, {
  label: 'Smiling Rain',
  value: 'linear-gradient(-20deg, rgb(220,176,237) 0%, rgb(153,201,156) 100%)'
}, {
  label: 'Cloudy Apple',
  value: 'linear-gradient(to top, rgb(243,231,233) 0%, rgb(227,238,255) 99%, rgb(227,238,255) 100%)'
}, {
  label: 'Big Mango',
  value: 'linear-gradient(to top, rgb(199,29,111) 0%, rgb(208,150,147) 100%)'
}, {
  label: 'Healthy Water',
  value: 'linear-gradient(60deg, rgb(150,222,218) 0%, rgb(80,201,195) 100%)'
}, {
  label: 'Amour Amour',
  value: 'linear-gradient(to top, rgb(247,112,98) 0%, rgb(254,81,150) 100%)'
}, {
  label: 'Risky Concrete',
  value: 'linear-gradient(to top, rgb(196,197,199) 0%, rgb(220,221,223) 52%, rgb(235,235,235) 100%)'
}, {
  label: 'Strong Stick',
  value: 'linear-gradient(to right, rgb(168,202,186) 0%, rgb(93,65,87) 100%)'
}, {
  label: 'Vicious Stance',
  value: 'linear-gradient(60deg, rgb(41,50,60) 0%, rgb(72,85,99) 100%)'
}, {
  label: 'Palo Alto',
  value: 'linear-gradient(-60deg, rgb(22,160,133) 0%, rgb(244,208,63) 100%)'
}, {
  label: 'Happy Memories',
  value: 'linear-gradient(-60deg, rgb(255,88,88) 0%, rgb(240,152,25) 100%)'
}, {
  label: 'Midnight Bloom',
  value: 'linear-gradient(-20deg, rgb(43,88,118) 0%, rgb(78,67,118) 100%)'
}, {
  label: 'Crystalline',
  value: 'linear-gradient(-20deg, rgb(0,205,172) 0%, rgb(141,218,213) 100%)'
}, {
  label: 'River City',
  value: 'linear-gradient(to top, rgb(68,129,235) 0%, rgb(4,190,254) 100%)'
}, {
  label: 'Confident Cloud',
  value: 'linear-gradient(to top, rgb(218,212,236) 0%, rgb(218,212,236) 1%, rgb(243,231,233) 100%)'
}, {
  label: 'Le Cocktail',
  value: 'linear-gradient(45deg, rgb(135,77,162) 0%, rgb(196,58,48) 100%)'
}, {
  label: 'Frozen Berry',
  value: 'linear-gradient(to top, rgb(232,25,139) 0%, rgb(199,234,253) 100%)'
}, {
  label: 'Child Care',
  value: 'linear-gradient(-20deg, rgb(247,148,164) 0%, rgb(253,214,189) 100%)'
}, {
  label: 'Flying Lemon',
  value: 'linear-gradient(60deg, rgb(100,179,244) 0%, rgb(194,229,156) 100%)'
}, {
  label: 'New Retrowave',
  value: 'linear-gradient(to top, rgb(59,65,197) 0%, rgb(169,129,187) 49%, rgb(255,200,169) 100%)'
}, {
  label: 'Hidden Jaguar',
  value: 'linear-gradient(to top, rgb(15,216,80) 0%, rgb(249,240,71) 100%)'
}, {
  label: 'Above The Sky',
  value: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, rgb(224,224,224) 26%, rgb(239,239,239) 48%, rgb(217,217,217) 75%, rgb(188,188,188) 100%)'
}, {
  label: 'Nega',
  value: 'linear-gradient(45deg, rgb(238,156,167) 0%, rgb(255,221,225) 100%)'
}, {
  label: 'Dense Water',
  value: 'linear-gradient(to right, rgb(58,181,176) 0%, rgb(61,153,190) 31%, rgb(86,49,122) 100%)'
}, {
  label: 'Seashore',
  value: 'linear-gradient(to top, rgb(32,156,255) 0%, rgb(104,224,207) 100%)'
}, {
  label: 'Marble Wall',
  value: 'linear-gradient(to top, rgb(189,194,232) 0%, rgb(189,194,232) 1%, rgb(230,222,233) 100%)'
}, {
  label: 'Cheerful Caramel',
  value: 'linear-gradient(to top, rgb(230,185,128) 0%, rgb(234,205,163) 100%)'
}, {
  label: 'Night Sky',
  value: 'linear-gradient(to top, rgb(30,60,114) 0%, rgb(30,60,114) 1%, rgb(42,82,152) 100%)'
}, {
  label: 'Magic Lake',
  value: 'linear-gradient(to top, rgb(213,222,231) 0%, rgb(255,175,189) 0%, rgb(201,255,191) 100%)'
}, {
  label: 'Young Grass',
  value: 'linear-gradient(to top, rgb(155,225,93) 0%, rgb(0,227,174) 100%)'
}, {
  label: 'Royal Garden',
  value: 'linear-gradient(to right, rgb(237,110,160) 0%, rgb(236,140,105) 100%)'
}, {
  label: 'Gentle Care',
  value: 'linear-gradient(to right, rgb(255,195,160) 0%, rgb(255,175,189) 100%)'
}, {
  label: 'Plum Bath',
  value: 'linear-gradient(to top, rgb(204,32,142) 0%, rgb(103,19,210) 100%)'
}, {
  label: 'Happy Unicorn',
  value: 'linear-gradient(to top, rgb(179,255,171) 0%, rgb(18,255,247) 100%)'
}, {
  label: 'African Field',
  value: 'linear-gradient(-45deg, rgb(255,199,150) 0%, rgb(255,107,149) 100%)'
}, {
  label: 'Solid Stone',
  value: 'linear-gradient(to right, rgb(36,57,73) 0%, rgb(81,127,164) 100%)'
}, {
  label: 'Orange Juice',
  value: 'linear-gradient(-20deg, rgb(252,96,118) 0%, rgb(255,154,68) 100%)'
}, {
  label: 'Glass Water',
  value: 'linear-gradient(to top, rgb(223,233,243) 0%, white 100%)'
}, {
  label: 'North Miracle',
  value: 'linear-gradient(to right, rgb(0,219,222) 0%, rgb(252,0,255) 100%)'
}, {
  label: 'Fruit Blend',
  value: 'linear-gradient(to right, rgb(249,212,35) 0%, rgb(255,78,80) 100%)'
}, {
  label: 'Millennium Pine',
  value: 'linear-gradient(to top, rgb(80,204,127) 0%, rgb(245,209,0) 100%)'
}, {
  label: 'High Flight',
  value: 'linear-gradient(to right, rgb(10,207,254) 0%, rgb(73,90,255) 100%)'
}, {
  label: 'Mole Hall',
  value: 'linear-gradient(-20deg, rgb(97,97,97) 0%, rgb(155,197,195) 100%)'
}, {
  label: 'Space Shift',
  value: 'linear-gradient(60deg, rgb(61,51,147) 0%, rgb(43,118,185) 37%, rgb(44,172,209) 65%, rgb(53,235,147) 100%)'
}, {
  label: 'Forest Inei',
  value: 'linear-gradient(to top, rgb(223,137,181) 0%, rgb(191,217,254) 100%)'
}, {
  label: 'Rich Metal',
  value: 'linear-gradient(to right, rgb(215,210,204) 0%, rgb(48,67,82) 100%)'
}, {
  label: 'Juicy Cake',
  value: 'linear-gradient(to top, rgb(225,79,173) 0%, rgb(249,212,35) 100%)'
}, {
  label: 'Smart Indigo',
  value: 'linear-gradient(to top, rgb(178,36,239) 0%, rgb(117,121,255) 100%)'
}, {
  label: 'Sand Strike',
  value: 'linear-gradient(to right, rgb(193,193,97) 0%, rgb(193,193,97) 0%, rgb(212,212,177) 100%)'
}, {
  label: 'Norse Beauty',
  value: 'linear-gradient(to right, rgb(236,119,171) 0%, rgb(120,115,245) 100%)'
}, {
  label: 'Aqua Guidance',
  value: 'linear-gradient(to top, rgb(0,122,223) 0%, rgb(0,236,188) 100%)'
}, {
  label: 'Sun Veggie',
  value: 'linear-gradient(-225deg, rgb(32,226,215) 0%, rgb(249,254,165) 100%)'
}, {
  label: 'Sea Lord',
  value: 'linear-gradient(-225deg, rgb(44,216,213) 0%, rgb(197,193,255) 56%, rgb(255,186,195) 100%)'
}, {
  label: 'Black Sea',
  value: 'linear-gradient(-225deg, rgb(44,216,213) 0%, rgb(107,141,214) 48%, rgb(142,55,215) 100%)'
}, {
  label: 'Grass Shampoo',
  value: 'linear-gradient(-225deg, rgb(223,255,205) 0%, rgb(144,249,196) 48%, rgb(57,243,187) 100%)'
}, {
  label: 'Landing Aircraft',
  value: 'linear-gradient(-225deg, rgb(93,159,255) 0%, rgb(184,220,255) 48%, rgb(107,187,255) 100%)'
}, {
  label: 'Witch Dance',
  value: 'linear-gradient(-225deg, rgb(168,191,255) 0%, rgb(136,77,128) 100%)'
}, {
  label: 'Sleepless Night',
  value: 'linear-gradient(-225deg, rgb(82,113,196) 0%, rgb(177,159,255) 48%, rgb(236,161,254) 100%)'
}, {
  label: 'Angel Care',
  value: 'linear-gradient(-225deg, rgb(255,226,159) 0%, rgb(255,169,159) 48%, rgb(255,113,154) 100%)'
}, {
  label: 'Crystal River',
  value: 'linear-gradient(-225deg, rgb(34,225,255) 0%, rgb(29,143,225) 48%, rgb(98,94,177) 100%)'
}, {
  label: 'Soft Lipstick',
  value: 'linear-gradient(-225deg, rgb(182,206,232) 0%, rgb(245,120,220) 100%)'
}, {
  label: 'Salt Mountain',
  value: 'linear-gradient(-225deg, rgb(255,254,255) 0%, rgb(215,255,254) 100%)'
}, {
  label: 'Perfect White',
  value: 'linear-gradient(-225deg, rgb(227,253,245) 0%, rgb(255,230,250) 100%)'
}, {
  label: 'Fresh Oasis',
  value: 'linear-gradient(-225deg, rgb(125,226,252) 0%, rgb(185,182,229) 100%)'
}, {
  label: 'Strict November',
  value: 'linear-gradient(-225deg, rgb(203,186,204) 0%, rgb(37,128,179) 100%)'
}, {
  label: 'Morning Salad',
  value: 'linear-gradient(-225deg, rgb(183,248,219) 0%, rgb(80,167,194) 100%)'
}, {
  label: 'Deep Relief',
  value: 'linear-gradient(-225deg, rgb(112,133,182) 0%, rgb(135,167,217) 50%, rgb(222,243,248) 100%)'
}, {
  label: 'Sea Strike',
  value: 'linear-gradient(-225deg, rgb(119,255,210) 0%, rgb(98,151,219) 48%, rgb(30,236,255) 100%)'
}, {
  label: 'Night Call',
  value: 'linear-gradient(-225deg, rgb(172,50,228) 0%, rgb(121,24,242) 48%, rgb(72,1,255) 100%)'
}, {
  label: 'Supreme Sky',
  value: 'linear-gradient(-225deg, rgb(212,255,236) 0%, rgb(87,242,204) 48%, rgb(69,150,251) 100%)'
}, {
  label: 'Light Blue',
  value: 'linear-gradient(-225deg, rgb(158,251,211) 0%, rgb(87,233,242) 48%, rgb(69,212,251) 100%)'
}, {
  label: 'Mind Crawl',
  value: 'linear-gradient(-225deg, rgb(71,59,123) 0%, rgb(53,132,167) 51%, rgb(48,210,190) 100%)'
}, {
  label: 'Lily Meadow',
  value: 'linear-gradient(-225deg, rgb(101,55,155) 0%, rgb(136,106,234) 53%, rgb(100,87,198) 100%)'
}, {
  label: 'Sugar Lollipop',
  value: 'linear-gradient(-225deg, rgb(164,69,178) 0%, rgb(212,24,114) 52%, rgb(255,0,102) 100%)'
}, {
  label: 'Sweet Dessert',
  value: 'linear-gradient(-225deg, rgb(119,66,178) 0%, rgb(241,128,255) 52%, rgb(253,139,217) 100%)'
}, {
  label: 'Magic Ray',
  value: 'linear-gradient(-225deg, rgb(255,60,172) 0%, rgb(86,43,124) 52%, rgb(43,134,197) 100%)'
}, {
  label: 'Teen Party',
  value: 'linear-gradient(-225deg, rgb(255,5,124) 0%, rgb(141,11,147) 50%, rgb(50,21,117) 100%)'
}, {
  label: 'Frozen Heat',
  value: 'linear-gradient(-225deg, rgb(255,5,124) 0%, rgb(124,100,213) 48%, rgb(76,195,255) 100%)'
}, {
  label: 'Gagarin View',
  value: 'linear-gradient(-225deg, rgb(105,234,203) 0%, rgb(234,204,248) 48%, rgb(102,84,241) 100%)'
}, {
  label: 'Fabled Sunset',
  value: 'linear-gradient(-225deg, rgb(35,21,87) 0%, rgb(68,16,122) 29%, rgb(255,19,97) 67%, rgb(255,248,0) 100%)'
}, {
  label: 'Perfect Blue',
  value: 'linear-gradient(-225deg, rgb(61,78,129) 0%, rgb(87,83,201) 48%, rgb(110,127,243) 100%)'
}];
var getRandomGradient = function getRandomGradient() {
  var randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex].value;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRandomGradient);

/***/ }),

/***/ "./src/react/Utils/ShorthandCSS.js":
/*!*****************************************!*\
  !*** ./src/react/Utils/ShorthandCSS.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shorthandCSS)
/* harmony export */ });
/* Credits: Forked from GenerateBlocks */
function shorthandCSS(top, right, bottom, left, unit) {
  if ('' === top && '' === right && '' === bottom && '' === left) {
    return;
  }
  top = parseFloat(top) != 0 && '' !== top ? parseFloat(top) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
  right = parseFloat(right) != 0 && '' !== right ? parseFloat(right) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
  bottom = parseFloat(bottom) != 0 && '' !== bottom ? parseFloat(bottom) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
  left = parseFloat(left) != 0 && '' !== left ? parseFloat(left) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq

  if (right === left) {
    left = '';
    if (top === bottom) {
      bottom = '';
      if (top === right) {
        right = '';
      }
    }
  }
  var output = top + right + bottom + left;
  return output.trim();
}

/***/ }),

/***/ "./src/react/Utils/TypographyHelper.js":
/*!*********************************************!*\
  !*** ./src/react/Utils/TypographyHelper.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildDimensionsCSS: () => (/* binding */ buildDimensionsCSS),
/* harmony export */   geHierarchicalPlaceholderValue: () => (/* binding */ geHierarchicalPlaceholderValue),
/* harmony export */   getHierarchicalValueUnit: () => (/* binding */ getHierarchicalValueUnit),
/* harmony export */   getHierarchicalValueUnitSync: () => (/* binding */ getHierarchicalValueUnitSync)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShorthandCSS */ "./src/react/Utils/ShorthandCSS.js");



/**
 * Build CSS rules for dimensions and screen size.
 *
 * @param {Object} props      Dimensions array (see /components/DimensionsBlock).
 * @param {string} screenSize mobile|tablet|desktop.
 *
 * @return {string} CSS rules.
 */
function buildDimensionsCSS(props, screenSize) {
  screenSize = screenSize.toLowerCase();
  var dimensions = props[screenSize];
  if ('desktop' === screenSize) {
    var top = dimensions.top;
    var right = dimensions.right;
    var bottom = dimensions.bottom;
    var left = dimensions.left;
    var unit = dimensions.unit;
    return (0,_ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__["default"])(top, right, bottom, left, unit);
  }
  if ('tablet' === screenSize || 'mobile' === screenSize) {
    var _top = geHierarchicalPlaceholderValue(props, screenSize, dimensions.top, 'top');
    var _right = geHierarchicalPlaceholderValue(props, screenSize, dimensions.right, 'right');
    var _bottom = geHierarchicalPlaceholderValue(props, screenSize, dimensions.bottom, 'bottom');
    var _left = geHierarchicalPlaceholderValue(props, screenSize, dimensions.left, 'left');
    var _unit = getHierarchicalValueUnit(props, screenSize, dimensions.unit);
    return (0,_ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__["default"])(_top, _right, _bottom, _left, _unit);
  }
  return '';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 * @param {string} type       Type of value (fontFamily, fontSize, fontWeight, letterSpacing, etc.).
 *
 * @return {string} Value placeholder.
 */
function geHierarchicalPlaceholderValue(props, screenSize, value, type) {
  // Check mobile screen size.
  if ('mobile' === screenSize && '' === value) {
    // Check tablet.
    if ('' !== props.tablet[type]) {
      return props.tablet[type];
    } else if ('' !== props.desktop[type]) {
      // Check desktop.
      return props.desktop[type];
    }
  }

  // Check tablet screen size.
  if ('tablet' === screenSize && '' === value) {
    if ('' !== props.desktop[type]) {
      // Check desktop.
      return props.desktop[type];
    }
  }
  if ('' !== value) {
    return value;
  }
  return '';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 * @param {string} type       Type of value (fontSizeUnit, etc.).
 *
 * @return {string} Value default or hierarchical value.
 */
function getHierarchicalValueUnit(props, screenSize, value, type) {
  // Check mobile screen size.
  if ('mobile' === screenSize && null === value) {
    if (null === props.tablet[type]) {
      return props.desktop[type];
    }
    return props.tablet[type];
  }
  if ('tablet' === screenSize && null === value) {
    return props.desktop[type];
  }
  if (null === value) {
    return 'px';
  }
  return value;
}

/**
 * Get a value based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 *
 * @return {boolean} Value default or hierarchical value.
 */
function getHierarchicalValueUnitSync(props, screenSize, value) {
  // Check mobile screen size.
  if ('mobile' === screenSize && null === value) {
    if (null === props.tablet.unitSync) {
      return props.desktop.unitSync;
    }
    return props.tablet.unitSync;
  }
  if ('tablet' === screenSize && null === value) {
    return props.desktop.unitSync;
  }
  if (null === value) {
    return true;
  }
  return value;
}

/***/ }),

/***/ "./src/react/Utils/sanitize-svg/index.js":
/*!***********************************************!*\
  !*** ./src/react/Utils/sanitize-svg/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sanitizeSVG)
/* harmony export */ });
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.es.mjs");

function sanitizeSVG(svg) {
  return dompurify__WEBPACK_IMPORTED_MODULE_0__["default"].sanitize(svg, {
    USE_PROFILES: {
      svg: true,
      svgFilters: true
    }
  });
}

/***/ }),

/***/ "@wordpress/a11y":
/*!******************************!*\
  !*** external ["wp","a11y"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["a11y"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************************************!*\
  !*** ./src/blocks/click-to-share/block.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   name: () => (/* binding */ name)
/* harmony export */ });
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./src/blocks/click-to-share/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/click-to-share/edit.js");
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }

var _wp$blocks = wp.blocks,
  registerBlockType = _wp$blocks.registerBlockType,
  createBlock = _wp$blocks.createBlock,
  rawHandler = _wp$blocks.rawHandler;
var _wp$blockEditor = wp.blockEditor,
  InnerBlocks = _wp$blockEditor.InnerBlocks,
  RichText = _wp$blockEditor.RichText;
var _wp$richText = wp.richText,
  create = _wp$richText.create,
  toHTMLString = _wp$richText.toHTMLString;

// Import JS

var hasIcon = /*#__PURE__*/React.createElement("svg", {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "share-alt",
  className: "svg-inline--fa fa-share-alt fa-w-14",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
}, /*#__PURE__*/React.createElement("path", {
  fill: "#F68105",
  d: "M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
}));
var name = 'has/click-to-share';
registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_0__, {
  icon: hasIcon,
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  // Render via PHP
  save: function save() {
    return /*#__PURE__*/React.createElement(InnerBlocks.Content, null);
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['bctt/clicktotweet'],
      transform: function transform(_ref) {
        var tweet = _ref.tweet,
          prompt = _ref.prompt;
        // Map QuotesDLX attributes to Better Click to Tweet attributes.
        var bcttAttributes = {
          clickText: prompt
        };
        // Convert tweet string to inner blocks.
        var shareTextInnerBlocks = rawHandler({
          HTML: tweet
        });
        return createBlock('has/click-to-share', bcttAttributes, shareTextInnerBlocks);
      }
    }, {
      type: 'block',
      blocks: ['core/pullquote'],
      transform: function transform(_ref2) {
        var value = _ref2.value;
        return createBlock('has/click-to-share', {
          customShareText: value
        }, [createBlock('core/paragraph', {
          content: value
        })]);
      }
    }, {
      type: 'block',
      blocks: ['core/paragraph'],
      isMultiBlock: true,
      // eslint-disable-next-line no-unused-vars
      transform: function transform(paragraphs) {
        var paragraphContent = [];
        var content = paragraphs.map(function (attributes) {
          paragraphContent.push(createBlock('core/paragraph', {
            content: attributes.content
          }));
          return attributes.content;
          // eslint-disable-next-line quotes
        }).join('\r\n\r\n');
        // Trim spacing at end.
        content.replace('/s+$/', '');
        return createBlock('has/click-to-share', {
          customShareText: content
        }, paragraphContent);
      }
    }, {
      type: 'block',
      blocks: ['core/quote'],
      transform: function transform(_ref3, innerBlocks) {
        var value = _ref3.value,
          align = _ref3.align;
        return createBlock('has/click-to-share', {
          customShareText: value,
          align: align
        }, innerBlocks);
      }
    }, {
      type: 'block',
      blocks: ['core/verse'],
      transform: function transform(_ref4) {
        var content = _ref4.content;
        return createBlock('has/click-to-share', {
          customShareText: content
        }, [createBlock('core/paragraph', {
          content: content
        })]);
      }
    }, {
      type: 'block',
      blocks: ['coblocks/click-to-tweet'],
      transform: function transform(_ref5) {
        var buttonText = _ref5.buttonText,
          content = _ref5.content;
        return createBlock('mediaron/quotes-dlx', {
          customShareText: content,
          clickText: buttonText
        }, [createBlock('core/paragraph', {
          content: content
        })]);
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/pullquote'],
      isMatch: function isMatch(_ref6, block) {
        _objectDestructuringEmpty(_ref6);
        return block.innerBlocks.every(function (_ref7) {
          var name = _ref7.name;
          return name === 'core/paragraph';
        });
      },
      transform: function transform(_ref8, innerBlocks) {
        _objectDestructuringEmpty(_ref8);
        var value = innerBlocks.map(function (_ref9) {
          var attributes = _ref9.attributes;
          return "".concat(attributes.content);
        }).join('<br>');
        return createBlock('core/pullquote', {
          value: value
        });
      }
    }, {
      type: 'block',
      blocks: ['core/quote'],
      isMatch: function isMatch(_ref0, block) {
        _objectDestructuringEmpty(_ref0);
        return block.innerBlocks.every(function (_ref1) {
          var name = _ref1.name;
          return name === 'core/paragraph';
        });
      },
      transform: function transform(_ref10, innerBlocks) {
        _objectDestructuringEmpty(_ref10);
        return createBlock('core/quote', {}, innerBlocks);
      }
    }, {
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref11, innerBlocks) {
        _objectDestructuringEmpty(_ref11);
        var content = [];
        innerBlocks.forEach(function (_ref12) {
          var attributes = _ref12.attributes;
          content.push(createBlock('core/paragraph', {
            content: attributes.content
          }));
        });
        return content;
      }
    }]
  }
});
})();

/******/ })()
;
//# sourceMappingURL=has-click-to-share.js.map