/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["richText"];

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/inline-highlighting.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);



var HighlightSvg = function HighlightSvg(props) {
  return /*#__PURE__*/React.createElement("svg", {
    clipRule: "evenodd",
    fillRule: "evenodd",
    height: 24,
    strokeLinejoin: "round",
    strokeMiterlimit: 2,
    viewBox: "0 0 32 32",
    width: 24,
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      backgroundColor: props.background,
      padding: props.padding
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: props.color,
    d: "M3 30h14.503a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm6.515-19.054-1.592 1.077a3.001 3.001 0 0 0-.442 4.607l.796.795-1.458 6.368a.943.943 0 0 0-.022.138l-1.183 1.184a1 1 0 0 0 1.414 1.414l1.184-1.183a1.1 1.1 0 0 0 .138-.022l6.368-1.458.652.653a3.001 3.001 0 0 0 4.607-.442l1.077-1.592zm1.688-1.14 10.991 10.991 7.292-10.792a3.001 3.001 0 0 0-.365-3.801l-3.325-3.325a3.001 3.001 0 0 0-3.801-.365z"
  }));
};
(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__.registerFormatType)('has/inline', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Highlight and Share', 'highlight-and-share'),
  tagName: 'span',
  attributes: {
    "class": 'class'
  },
  className: 'has-inline-text',
  edit: function edit(props) {
    var onClick = function onClick() {
      if (props.isActive) {
        props.onChange((0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__.removeFormat)(props.value, 'has/inline'));
        return;
      }
      if (props.value.start === props.value.end && !props.isActive) {
        return;
      }
      props.onChange((0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__.applyFormat)(props.value, {
        type: 'has/inline',
        attributes: {
          "class": 'has-inline-text'
        }
      }));
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, false === props.isActive && /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichTextToolbarButton, {
      icon: /*#__PURE__*/React.createElement(HighlightSvg, {
        background: "transparent",
        color: "#cbb200",
        padding: "0"
      }),
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Inline Social Highlight', 'highlight-and-share'),
      onClick: onClick
    }), true === props.isActive && /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichTextToolbarButton, {
      icon: /*#__PURE__*/React.createElement(HighlightSvg, {
        background: "#1e1e1e",
        color: "#ffd700",
        padding: "5px"
      }),
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Inline Social Highlight', 'highlight-and-share'),
      onClick: onClick
    }));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=has-inline-highlighting.js.map