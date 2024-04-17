/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/Components/ErrorBoundary/index.js":
/*!*****************************************************!*\
  !*** ./src/react/Components/ErrorBoundary/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

// From: https://blog.logrocket.com/async-rendering-react-suspense/
// Error boundaries currently have to be classes.
var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);
  var _super = _createSuper(ErrorBoundary);
  function ErrorBoundary() {
    var _this;
    _classCallCheck(this, ErrorBoundary);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      hasError: false,
      error: null
    });
    return _this;
  }
  _createClass(ErrorBoundary, [{
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }
      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        error: error
      };
    }
  }]);
  return ErrorBoundary;
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ "./src/react/Components/Loader/index.js":
/*!**********************************************!*\
  !*** ./src/react/Components/Loader/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var override = {
  display: 'block'
};
var Loader = function Loader(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.color),
    _useState4 = _slicedToArray(_useState3, 2),
    color = _useState4[0],
    setColor = _useState4[1];
  var title = props.title,
    description = props.description,
    label = props.label,
    size = props.size;

  /**
   * Get the desired loader.
   *
   * @return {Object} The loader.
   */
  var getLoader = function getLoader() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_2___default()), {
      color: color,
      loading: loading,
      cssOverride: override,
      size: 25,
      speedMultiplier: 0.65
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "has-admin-content-heading-text"
  }, title))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, getLoader())))));
};
Loader.defaultProps = {
  title: '',
  description: '',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading…', 'highlight-and-share'),
  hasWrapper: false,
  size: 60
};
Loader.propTypes = {
  title: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired,
  description: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired,
  hasWrapper: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  label: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired,
  size: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ "./src/react/Support/support.js":
/*!**************************************!*\
  !*** ./src/react/Support/support.js ***!
  \**************************************/
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
/* harmony import */ var _wordpress_escape_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/escape-html */ "@wordpress/escape-html");
/* harmony import */ var _wordpress_escape_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/youtube.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/bookmark.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/mail.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plug-zap.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/graduation-cap.js");
/* harmony import */ var _Components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Components/ErrorBoundary */ "./src/react/Components/ErrorBoundary/index.js");
/* harmony import */ var _Components_Loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Components/Loader */ "./src/react/Components/Loader/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }














var Support = function Support(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_6__["default"], {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Could not load Support Tab.', 'highlight-and-share'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      href: "https://dlxplugins.com/support/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "DLX Plugins Support"))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-admin-container-body__content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Components_Loader__WEBPACK_IMPORTED_MODULE_7__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Support', 'highlight-and-share'),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading…', 'highlight-and-share'),
      color: "var(--wp-admin-theme-color)"
    }))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Interface, props)));
};
var Interface = function Interface(props) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (typeof Fancybox !== 'undefined') {
      Fancybox.defaults = _objectSpread(_objectSpread({}, Fancybox.defaults), {}, {
        defaultType: 'iframe'
      });
      Fancybox.bind("[data-fancybox]", {
        toolbar: false,
        smallBtn: true,
        iframe: {
          preload: false
        }
      });
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-container-body__content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "has-admin-content-heading-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help and Support', 'highlight-and-share'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get help and support for Highlight and Share. If you like the plugin, please consider leaving a review. Each review helps out a lot!', 'highlight-and-share'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "has-admin-content-subheading"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Video Overview and Tutorials', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please visit the playlist below to view a video overview of Highlight and Share.', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    "data-fancybox": true,
    href: "https://www.youtube.com/embed/videoseries?list=PLw2fSxxzure64RVDMsBd1DzU87YY0pRTb"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: "".concat(hasSupportAdmin.videoPlayImg),
    width: hasSupportAdmin.videoPlayImgWidth,
    height: hasSupportAdmin.videoPlayImgHeight,
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Video Overview and Tutorials', 'highlight-and-share'),
    style: {
      border: '2px solid #DDD'
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row has-admin-component-row-button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: "has-button has-button-edit",
    href: "https://www.youtube.com/playlist?list=PLw2fSxxzure64RVDMsBd1DzU87YY0pRTb",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], null)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View the YouTube Playlist', 'highlight-and-share')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "has-admin-content-subheading"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Documentation and Overviews', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The documentation for Highlight and Share is designed to get you up and running fast.', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row has-admin-component-row-button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: "has-button has-button-edit",
    href: "https://docs.dlxplugins.com/v/highlight-and-share/",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Visit the Documentation', 'highlight-and-share')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "has-admin-content-subheading"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Support and Help', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Support for Highlight and Share is provided through developer volunteers. Please visit the support forums to get help.', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row has-admin-component-row-button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: "has-button has-button-edit",
    href: "https://wordpress.org/support/plugin/highlight-and-share/",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], null)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Visit the Support Forums', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: "has-button has-button-edit",
    href: "https://dlxplugins.com/support/",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], null)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use the Support Form', 'highlight-and-share')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-content-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "has-admin-content-subheading"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('More from DLX Plugins', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Check out more plugins and and plugin tutorials from DLX Plugins.', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row has-admin-component-row-button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: "has-button has-button-edit",
    href: "https://dlxplugins.com/plugins/",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], null)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View More Plugins', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: "has-button has-button-edit",
    href: "https://dlxplugins.com/tutorials/",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], {
      style: {
        color: '#000',
        stroke: '#000'
      }
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View Plugin Tutorials', 'highlight-and-share'))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Support);

/***/ }),

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
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
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
	} else {}
}());


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/createLucideIcon.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createLucideIcon),
/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ "./node_modules/lucide-react/dist/esm/defaultAttributes.js");
/**
 * lucide-react v0.268.0 - ISC
 */




const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
      "svg",
      {
        ref,
        ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/defaultAttributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * lucide-react v0.268.0 - ISC
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/bookmark.js":
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/bookmark.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Bookmark)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.268.0 - ISC
 */



const Bookmark = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Bookmark", [
  [
    "path",
    { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }
  ]
]);


//# sourceMappingURL=bookmark.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/graduation-cap.js":
/*!********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/graduation-cap.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GraduationCap)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.268.0 - ISC
 */



const GraduationCap = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("GraduationCap", [
  ["path", { d: "M22 10v6M2 10l10-5 10 5-10 5z", key: "1ef52a" }],
  ["path", { d: "M6 12v5c3 3 9 3 12 0v-5", key: "1f75yj" }]
]);


//# sourceMappingURL=graduation-cap.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/mail.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/mail.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mail)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.268.0 - ISC
 */



const Mail = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Mail", [
  [
    "rect",
    { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }
  ],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);


//# sourceMappingURL=mail.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/plug-zap.js":
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/plug-zap.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlugZap)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.268.0 - ISC
 */



const PlugZap = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("PlugZap", [
  [
    "path",
    {
      d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
      key: "goz73y"
    }
  ],
  ["path", { d: "m2 22 3-3", key: "19mgm9" }],
  ["path", { d: "M7.5 13.5 10 11", key: "7xgeeb" }],
  ["path", { d: "M10.5 16.5 13 14", key: "10btkg" }],
  ["path", { d: "m18 3-4 4h6l-4 4", key: "16psg9" }]
]);


//# sourceMappingURL=plug-zap.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/users-2.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/users-2.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Users2)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.268.0 - ISC
 */



const Users2 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Users2", [
  ["path", { d: "M14 19a6 6 0 0 0-12 0", key: "vej9p1" }],
  ["circle", { cx: "8", cy: "9", r: "4", key: "143rtg" }],
  ["path", { d: "M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8", key: "hqbn22" }]
]);


//# sourceMappingURL=users-2.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/youtube.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/youtube.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Youtube)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * lucide-react v0.268.0 - ISC
 */



const Youtube = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Youtube", [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
]);


//# sourceMappingURL=youtube.js.map


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

/***/ "./node_modules/object-hash/dist/object_hash.js":
/*!******************************************************!*\
  !*** ./node_modules/object-hash/dist/object_hash.js ***!
  \******************************************************/
/***/ ((module) => {

!function(e){var t; true?module.exports=e():0}(function(){return function o(i,u,a){function s(n,e){if(!u[n]){if(!i[n]){var t=undefined;if(!e&&t)return require(n,!0);if(f)return f(n,!0);throw new Error("Cannot find module '"+n+"'")}var r=u[n]={exports:{}};i[n][0].call(r.exports,function(e){var t=i[n][1][e];return s(t||e)},r,r.exports,o,i,u,a)}return u[n].exports}for(var f=undefined,e=0;e<a.length;e++)s(a[e]);return s}({1:[function(w,b,m){(function(e,t,f,n,r,o,i,u,a){"use strict";var s=w("crypto");function c(e,t){return function(e,t){var n;n="passthrough"!==t.algorithm?s.createHash(t.algorithm):new y;void 0===n.write&&(n.write=n.update,n.end=n.update);g(t,n).dispatch(e),n.update||n.end("");if(n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var r=n.read();return"buffer"!==t.encoding?r.toString(t.encoding):r}(e,t=h(e,t))}(m=b.exports=c).sha1=function(e){return c(e)},m.keys=function(e){return c(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},m.MD5=function(e){return c(e,{algorithm:"md5",encoding:"hex"})},m.keysMD5=function(e){return c(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var l=s.getHashes?s.getHashes().slice():["sha1","md5"];l.push("passthrough");var d=["buffer","hex","binary","base64"];function h(e,t){t=t||{};var n={};if(n.algorithm=t.algorithm||"sha1",n.encoding=t.encoding||"hex",n.excludeValues=!!t.excludeValues,n.algorithm=n.algorithm.toLowerCase(),n.encoding=n.encoding.toLowerCase(),n.ignoreUnknown=!0===t.ignoreUnknown,n.respectType=!1!==t.respectType,n.respectFunctionNames=!1!==t.respectFunctionNames,n.respectFunctionProperties=!1!==t.respectFunctionProperties,n.unorderedArrays=!0===t.unorderedArrays,n.unorderedSets=!1!==t.unorderedSets,n.unorderedObjects=!1!==t.unorderedObjects,n.replacer=t.replacer||void 0,n.excludeKeys=t.excludeKeys||void 0,void 0===e)throw new Error("Object argument required.");for(var r=0;r<l.length;++r)l[r].toLowerCase()===n.algorithm.toLowerCase()&&(n.algorithm=l[r]);if(-1===l.indexOf(n.algorithm))throw new Error('Algorithm "'+n.algorithm+'"  not supported. supported values: '+l.join(", "));if(-1===d.indexOf(n.encoding)&&"passthrough"!==n.algorithm)throw new Error('Encoding "'+n.encoding+'"  not supported. supported values: '+d.join(", "));return n}function p(e){if("function"==typeof e){return null!=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e))}}function g(u,t,a){a=a||[];function s(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")}return{dispatch:function(e){return u.replacer&&(e=u.replacer(e)),this["_"+(null===e?"null":typeof e)](e)},_object:function(t){var e=Object.prototype.toString.call(t),n=/\[object (.*)\]/i.exec(e);n=(n=n?n[1]:"unknown:["+e+"]").toLowerCase();var r;if(0<=(r=a.indexOf(t)))return this.dispatch("[CIRCULAR:"+r+"]");if(a.push(t),void 0!==f&&f.isBuffer&&f.isBuffer(t))return s("buffer:"),s(t);if("object"===n||"function"===n||"asyncfunction"===n){var o=Object.keys(t);u.unorderedObjects&&(o=o.sort()),!1===u.respectType||p(t)||o.splice(0,0,"prototype","__proto__","constructor"),u.excludeKeys&&(o=o.filter(function(e){return!u.excludeKeys(e)})),s("object:"+o.length+":");var i=this;return o.forEach(function(e){i.dispatch(e),s(":"),u.excludeValues||i.dispatch(t[e]),s(",")})}if(!this["_"+n]){if(u.ignoreUnknown)return s("["+n+"]");throw new Error('Unknown object type "'+n+'"')}this["_"+n](t)},_array:function(e,t){t=void 0!==t?t:!1!==u.unorderedArrays;var n=this;if(s("array:"+e.length+":"),!t||e.length<=1)return e.forEach(function(e){return n.dispatch(e)});var r=[],o=e.map(function(e){var t=new y,n=a.slice();return g(u,t,n).dispatch(e),r=r.concat(n.slice(a.length)),t.read().toString()});return a=a.concat(r),o.sort(),this._array(o,!1)},_date:function(e){return s("date:"+e.toJSON())},_symbol:function(e){return s("symbol:"+e.toString())},_error:function(e){return s("error:"+e.toString())},_boolean:function(e){return s("bool:"+e.toString())},_string:function(e){s("string:"+e.length+":"),s(e.toString())},_function:function(e){s("fn:"),p(e)?this.dispatch("[native]"):this.dispatch(e.toString()),!1!==u.respectFunctionNames&&this.dispatch("function-name:"+String(e.name)),u.respectFunctionProperties&&this._object(e)},_number:function(e){return s("number:"+e.toString())},_xml:function(e){return s("xml:"+e.toString())},_null:function(){return s("Null")},_undefined:function(){return s("Undefined")},_regexp:function(e){return s("regex:"+e.toString())},_uint8array:function(e){return s("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return s("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return s("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return s("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return s("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return s("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return s("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return s("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return s("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return s("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return s("url:"+e.toString())},_map:function(e){s("map:");var t=Array.from(e);return this._array(t,!1!==u.unorderedSets)},_set:function(e){s("set:");var t=Array.from(e);return this._array(t,!1!==u.unorderedSets)},_file:function(e){return s("file:"),this.dispatch([e.name,e.size,e.type,e.lastModfied])},_blob:function(){if(u.ignoreUnknown)return s("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return s("domwindow")},_bigint:function(e){return s("bigint:"+e.toString())},_process:function(){return s("process")},_timer:function(){return s("timer")},_pipe:function(){return s("pipe")},_tcp:function(){return s("tcp")},_udp:function(){return s("udp")},_tty:function(){return s("tty")},_statwatcher:function(){return s("statwatcher")},_securecontext:function(){return s("securecontext")},_connection:function(){return s("connection")},_zlib:function(){return s("zlib")},_context:function(){return s("context")},_nodescript:function(){return s("nodescript")},_httpparser:function(){return s("httpparser")},_dataview:function(){return s("dataview")},_signal:function(){return s("signal")},_fsevent:function(){return s("fsevent")},_tlswrap:function(){return s("tlswrap")}}}function y(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}m.writeToStream=function(e,t,n){return void 0===n&&(n=t,t={}),g(t=h(e,t),n).dispatch(e)}}).call(this,w("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},w("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_7eac155c.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,f){(function(e,t,n,r,o,i,u,a,s){!function(e){"use strict";var f="undefined"!=typeof Uint8Array?Uint8Array:Array,n="+".charCodeAt(0),r="/".charCodeAt(0),o="0".charCodeAt(0),i="a".charCodeAt(0),u="A".charCodeAt(0),a="-".charCodeAt(0),s="_".charCodeAt(0);function c(e){var t=e.charCodeAt(0);return t===n||t===a?62:t===r||t===s?63:t<o?-1:t<o+10?t-o+26+26:t<u+26?t-u:t<i+26?t-i+26:void 0}e.toByteArray=function(e){var t,n;if(0<e.length%4)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.length,o="="===e.charAt(r-2)?2:"="===e.charAt(r-1)?1:0,i=new f(3*e.length/4-o),u=0<o?e.length-4:e.length,a=0;function s(e){i[a++]=e}for(t=0;t<u;t+=4,0)s((16711680&(n=c(e.charAt(t))<<18|c(e.charAt(t+1))<<12|c(e.charAt(t+2))<<6|c(e.charAt(t+3))))>>16),s((65280&n)>>8),s(255&n);return 2==o?s(255&(n=c(e.charAt(t))<<2|c(e.charAt(t+1))>>4)):1==o&&(s((n=c(e.charAt(t))<<10|c(e.charAt(t+1))<<4|c(e.charAt(t+2))>>2)>>8&255),s(255&n)),i},e.fromByteArray=function(e){var t,n,r,o,i=e.length%3,u="";function a(e){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)}for(t=0,r=e.length-i;t<r;t+=3)n=(e[t]<<16)+(e[t+1]<<8)+e[t+2],u+=a((o=n)>>18&63)+a(o>>12&63)+a(o>>6&63)+a(63&o);switch(i){case 1:u+=a((n=e[e.length-1])>>2),u+=a(n<<4&63),u+="==";break;case 2:u+=a((n=(e[e.length-2]<<8)+e[e.length-1])>>10),u+=a(n>>4&63),u+=a(n<<2&63),u+="="}return u}}(void 0===f?this.base64js={}:f)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(O,e,H){(function(e,t,g,n,r,o,i,u,a){var s=O("base64-js"),f=O("ieee754");function g(e,t,n){if(!(this instanceof g))return new g(e,t,n);var r,o,i,u,a,s=typeof e;if("base64"===t&&"string"==s)for(e=(r=e).trim?r.trim():r.replace(/^\s+|\s+$/g,"");e.length%4!=0;)e+="=";if("number"==s)o=x(e);else if("string"==s)o=g.byteLength(e,t);else{if("object"!=s)throw new Error("First argument needs to be a number, array or string.");o=x(e.length)}if(g._useTypedArrays?i=g._augment(new Uint8Array(o)):((i=this).length=o,i._isBuffer=!0),g._useTypedArrays&&"number"==typeof e.byteLength)i._set(e);else if(S(a=e)||g.isBuffer(a)||a&&"object"==typeof a&&"number"==typeof a.length)for(u=0;u<o;u++)g.isBuffer(e)?i[u]=e.readUInt8(u):i[u]=e[u];else if("string"==s)i.write(e,0,t);else if("number"==s&&!g._useTypedArrays&&!n)for(u=0;u<o;u++)i[u]=0;return i}function y(e,t,n,r){return g._charsWritten=T(function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}(t),e,n,r)}function w(e,t,n,r){return g._charsWritten=T(function(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}(t),e,n,r)}function c(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function l(e,t,n,r){r||(D("boolean"==typeof n,"missing or invalid endian"),D(null!=t,"missing offset"),D(t+1<e.length,"Trying to read beyond buffer length"));var o,i=e.length;if(!(i<=t))return n?(o=e[t],t+1<i&&(o|=e[t+1]<<8)):(o=e[t]<<8,t+1<i&&(o|=e[t+1])),o}function d(e,t,n,r){r||(D("boolean"==typeof n,"missing or invalid endian"),D(null!=t,"missing offset"),D(t+3<e.length,"Trying to read beyond buffer length"));var o,i=e.length;if(!(i<=t))return n?(t+2<i&&(o=e[t+2]<<16),t+1<i&&(o|=e[t+1]<<8),o|=e[t],t+3<i&&(o+=e[t+3]<<24>>>0)):(t+1<i&&(o=e[t+1]<<16),t+2<i&&(o|=e[t+2]<<8),t+3<i&&(o|=e[t+3]),o+=e[t]<<24>>>0),o}function h(e,t,n,r){if(r||(D("boolean"==typeof n,"missing or invalid endian"),D(null!=t,"missing offset"),D(t+1<e.length,"Trying to read beyond buffer length")),!(e.length<=t)){var o=l(e,t,n,!0);return 32768&o?-1*(65535-o+1):o}}function p(e,t,n,r){if(r||(D("boolean"==typeof n,"missing or invalid endian"),D(null!=t,"missing offset"),D(t+3<e.length,"Trying to read beyond buffer length")),!(e.length<=t)){var o=d(e,t,n,!0);return 2147483648&o?-1*(4294967295-o+1):o}}function b(e,t,n,r){return r||(D("boolean"==typeof n,"missing or invalid endian"),D(t+3<e.length,"Trying to read beyond buffer length")),f.read(e,t,n,23,4)}function m(e,t,n,r){return r||(D("boolean"==typeof n,"missing or invalid endian"),D(t+7<e.length,"Trying to read beyond buffer length")),f.read(e,t,n,52,8)}function v(e,t,n,r,o){o||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+1<e.length,"trying to write beyond buffer length"),N(t,65535));var i=e.length;if(!(i<=n))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function _(e,t,n,r,o){o||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+3<e.length,"trying to write beyond buffer length"),N(t,4294967295));var i=e.length;if(!(i<=n))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function E(e,t,n,r,o){o||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+1<e.length,"Trying to write beyond buffer length"),Y(t,32767,-32768)),e.length<=n||v(e,0<=t?t:65535+t+1,n,r,o)}function I(e,t,n,r,o){o||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+3<e.length,"Trying to write beyond buffer length"),Y(t,2147483647,-2147483648)),e.length<=n||_(e,0<=t?t:4294967295+t+1,n,r,o)}function A(e,t,n,r,o){o||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+3<e.length,"Trying to write beyond buffer length"),F(t,34028234663852886e22,-34028234663852886e22)),e.length<=n||f.write(e,t,n,r,23,4)}function B(e,t,n,r,o){o||(D(null!=t,"missing value"),D("boolean"==typeof r,"missing or invalid endian"),D(null!=n,"missing offset"),D(n+7<e.length,"Trying to write beyond buffer length"),F(t,17976931348623157e292,-17976931348623157e292)),e.length<=n||f.write(e,t,n,r,52,8)}H.Buffer=g,H.SlowBuffer=g,H.INSPECT_MAX_BYTES=50,g.poolSize=8192,g._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(e){return!1}}(),g.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},g.isBuffer=function(e){return!(null==e||!e._isBuffer)},g.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=C(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=k(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},g.concat=function(e,t){if(D(S(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new g(0);if(1===e.length)return e[0];if("number"!=typeof t)for(o=t=0;o<e.length;o++)t+=e[o].length;for(var n=new g(t),r=0,o=0;o<e.length;o++){var i=e[o];i.copy(n,r),r+=i.length}return n},g.prototype.write=function(e,t,n,r){var o;isFinite(t)?isFinite(n)||(r=n,n=void 0):(o=r,r=t,t=n,n=o),t=Number(t)||0;var i,u,a,s,f,c,l,d,h,p=this.length-t;switch((!n||p<(n=Number(n)))&&(n=p),r=String(r||"utf8").toLowerCase()){case"hex":i=function(e,t,n,r){n=Number(n)||0;var o=e.length-n;(!r||o<(r=Number(r)))&&(r=o);var i=t.length;D(i%2==0,"Invalid hex string"),i/2<r&&(r=i/2);for(var u=0;u<r;u++){var a=parseInt(t.substr(2*u,2),16);D(!isNaN(a),"Invalid hex string"),e[n+u]=a}return g._charsWritten=2*u,u}(this,e,t,n);break;case"utf8":case"utf-8":c=this,l=e,d=t,h=n,i=g._charsWritten=T(C(l),c,d,h);break;case"ascii":case"binary":i=y(this,e,t,n);break;case"base64":u=this,a=e,s=t,f=n,i=g._charsWritten=T(k(a),u,s,f);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":i=w(this,e,t,n);break;default:throw new Error("Unknown encoding")}return i},g.prototype.toString=function(e,t,n){var r,o,i,u,a=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,(n=void 0!==n?Number(n):n=a.length)===t)return"";switch(e){case"hex":r=function(e,t,n){var r=e.length;(!t||t<0)&&(t=0);(!n||n<0||r<n)&&(n=r);for(var o="",i=t;i<n;i++)o+=j(e[i]);return o}(a,t,n);break;case"utf8":case"utf-8":r=function(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=M(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+M(o)}(a,t,n);break;case"ascii":case"binary":r=c(a,t,n);break;case"base64":o=a,u=n,r=0===(i=t)&&u===o.length?s.fromByteArray(o):s.fromByteArray(o.slice(i,u));break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":r=function(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}(a,t,n);break;default:throw new Error("Unknown encoding")}return r},g.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},g.prototype.copy=function(e,t,n,r){if(n=n||0,r||0===r||(r=this.length),t=t||0,r!==n&&0!==e.length&&0!==this.length){D(n<=r,"sourceEnd < sourceStart"),D(0<=t&&t<e.length,"targetStart out of bounds"),D(0<=n&&n<this.length,"sourceStart out of bounds"),D(0<=r&&r<=this.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var o=r-n;if(o<100||!g._useTypedArrays)for(var i=0;i<o;i++)e[i+t]=this[i+n];else e._set(this.subarray(n,n+o),t)}},g.prototype.slice=function(e,t){var n=this.length;if(e=U(e,n,0),t=U(t,n,n),g._useTypedArrays)return g._augment(this.subarray(e,t));for(var r=t-e,o=new g(r,void 0,!0),i=0;i<r;i++)o[i]=this[i+e];return o},g.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},g.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},g.prototype.readUInt8=function(e,t){if(t||(D(null!=e,"missing offset"),D(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},g.prototype.readUInt16LE=function(e,t){return l(this,e,!0,t)},g.prototype.readUInt16BE=function(e,t){return l(this,e,!1,t)},g.prototype.readUInt32LE=function(e,t){return d(this,e,!0,t)},g.prototype.readUInt32BE=function(e,t){return d(this,e,!1,t)},g.prototype.readInt8=function(e,t){if(t||(D(null!=e,"missing offset"),D(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return 128&this[e]?-1*(255-this[e]+1):this[e]},g.prototype.readInt16LE=function(e,t){return h(this,e,!0,t)},g.prototype.readInt16BE=function(e,t){return h(this,e,!1,t)},g.prototype.readInt32LE=function(e,t){return p(this,e,!0,t)},g.prototype.readInt32BE=function(e,t){return p(this,e,!1,t)},g.prototype.readFloatLE=function(e,t){return b(this,e,!0,t)},g.prototype.readFloatBE=function(e,t){return b(this,e,!1,t)},g.prototype.readDoubleLE=function(e,t){return m(this,e,!0,t)},g.prototype.readDoubleBE=function(e,t){return m(this,e,!1,t)},g.prototype.writeUInt8=function(e,t,n){n||(D(null!=e,"missing value"),D(null!=t,"missing offset"),D(t<this.length,"trying to write beyond buffer length"),N(e,255)),t>=this.length||(this[t]=e)},g.prototype.writeUInt16LE=function(e,t,n){v(this,e,t,!0,n)},g.prototype.writeUInt16BE=function(e,t,n){v(this,e,t,!1,n)},g.prototype.writeUInt32LE=function(e,t,n){_(this,e,t,!0,n)},g.prototype.writeUInt32BE=function(e,t,n){_(this,e,t,!1,n)},g.prototype.writeInt8=function(e,t,n){n||(D(null!=e,"missing value"),D(null!=t,"missing offset"),D(t<this.length,"Trying to write beyond buffer length"),Y(e,127,-128)),t>=this.length||(0<=e?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},g.prototype.writeInt16LE=function(e,t,n){E(this,e,t,!0,n)},g.prototype.writeInt16BE=function(e,t,n){E(this,e,t,!1,n)},g.prototype.writeInt32LE=function(e,t,n){I(this,e,t,!0,n)},g.prototype.writeInt32BE=function(e,t,n){I(this,e,t,!1,n)},g.prototype.writeFloatLE=function(e,t,n){A(this,e,t,!0,n)},g.prototype.writeFloatBE=function(e,t,n){A(this,e,t,!1,n)},g.prototype.writeDoubleLE=function(e,t,n){B(this,e,t,!0,n)},g.prototype.writeDoubleBE=function(e,t,n){B(this,e,t,!1,n)},g.prototype.fill=function(e,t,n){if(e=e||0,t=t||0,n=n||this.length,"string"==typeof e&&(e=e.charCodeAt(0)),D("number"==typeof e&&!isNaN(e),"value is not a number"),D(t<=n,"end < start"),n!==t&&0!==this.length){D(0<=t&&t<this.length,"start out of bounds"),D(0<=n&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},g.prototype.inspect=function(){for(var e=[],t=this.length,n=0;n<t;n++)if(e[n]=j(this[n]),n===H.INSPECT_MAX_BYTES){e[n+1]="...";break}return"<Buffer "+e.join(" ")+">"},g.prototype.toArrayBuffer=function(){if("undefined"==typeof Uint8Array)throw new Error("Buffer.toArrayBuffer not supported in this browser");if(g._useTypedArrays)return new g(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer};var L=g.prototype;function U(e,t,n){return"number"!=typeof e?n:t<=(e=~~e)?t:0<=e||0<=(e+=t)?e:0}function x(e){return(e=~~Math.ceil(+e))<0?0:e}function S(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function j(e){return e<16?"0"+e.toString(16):e.toString(16)}function C(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;55296<=r&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function k(e){return s.toByteArray(e)}function T(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function M(e){try{return decodeURIComponent(e)}catch(e){return String.fromCharCode(65533)}}function N(e,t){D("number"==typeof e,"cannot write a non-number as a number"),D(0<=e,"specified a negative value for writing an unsigned value"),D(e<=t,"value is larger than maximum value for type"),D(Math.floor(e)===e,"value has a fractional component")}function Y(e,t,n){D("number"==typeof e,"cannot write a non-number as a number"),D(e<=t,"value larger than maximum allowed value"),D(n<=e,"value smaller than minimum allowed value"),D(Math.floor(e)===e,"value has a fractional component")}function F(e,t,n){D("number"==typeof e,"cannot write a non-number as a number"),D(e<=t,"value larger than maximum allowed value"),D(n<=e,"value smaller than minimum allowed value")}function D(e,t){if(!e)throw new Error(t||"Failed assertion")}g._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=L.get,e.set=L.set,e.write=L.write,e.toString=L.toString,e.toLocaleString=L.toString,e.toJSON=L.toJSON,e.copy=L.copy,e.slice=L.slice,e.readUInt8=L.readUInt8,e.readUInt16LE=L.readUInt16LE,e.readUInt16BE=L.readUInt16BE,e.readUInt32LE=L.readUInt32LE,e.readUInt32BE=L.readUInt32BE,e.readInt8=L.readInt8,e.readInt16LE=L.readInt16LE,e.readInt16BE=L.readInt16BE,e.readInt32LE=L.readInt32LE,e.readInt32BE=L.readInt32BE,e.readFloatLE=L.readFloatLE,e.readFloatBE=L.readFloatBE,e.readDoubleLE=L.readDoubleLE,e.readDoubleBE=L.readDoubleBE,e.writeUInt8=L.writeUInt8,e.writeUInt16LE=L.writeUInt16LE,e.writeUInt16BE=L.writeUInt16BE,e.writeUInt32LE=L.writeUInt32LE,e.writeUInt32BE=L.writeUInt32BE,e.writeInt8=L.writeInt8,e.writeInt16LE=L.writeInt16LE,e.writeInt16BE=L.writeInt16BE,e.writeInt32LE=L.writeInt32LE,e.writeInt32BE=L.writeInt32BE,e.writeFloatLE=L.writeFloatLE,e.writeFloatBE=L.writeFloatBE,e.writeDoubleLE=L.writeDoubleLE,e.writeDoubleBE=L.writeDoubleBE,e.fill=L.fill,e.inspect=L.inspect,e.toArrayBuffer=L.toArrayBuffer,e}}).call(this,O("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},O("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(l,d,e){(function(e,t,u,n,r,o,i,a,s){var u=l("buffer").Buffer,f=4,c=new u(f);c.fill(0);d.exports={hash:function(e,t,n,r){return u.isBuffer(e)||(e=new u(e)),function(e,t,n){for(var r=new u(t),o=n?r.writeInt32BE:r.writeInt32LE,i=0;i<e.length;i++)o.call(r,e[i],4*i,!0);return r}(t(function(e,t){var n;e.length%f!=0&&(n=e.length+(f-e.length%f),e=u.concat([e,c],n));for(var r=[],o=t?e.readInt32BE:e.readInt32LE,i=0;i<e.length;i+=f)r.push(o.call(e,i));return r}(e,r),8*e.length),n,r)}}}).call(this,l("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},l("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(w,e,b){(function(e,t,a,n,r,o,i,u,s){var a=w("buffer").Buffer,f=w("./sha"),c=w("./sha256"),l=w("./rng"),d={sha1:f,sha256:c,md5:w("./md5")},h=64,p=new a(h);function g(e,r){var o=d[e=e||"sha1"],i=[];return o||y("algorithm:",e,"is not yet supported"),{update:function(e){return a.isBuffer(e)||(e=new a(e)),i.push(e),e.length,this},digest:function(e){var t=a.concat(i),n=r?function(e,t,n){a.isBuffer(t)||(t=new a(t)),a.isBuffer(n)||(n=new a(n)),t.length>h?t=e(t):t.length<h&&(t=a.concat([t,p],h));for(var r=new a(h),o=new a(h),i=0;i<h;i++)r[i]=54^t[i],o[i]=92^t[i];var u=e(a.concat([r,n]));return e(a.concat([o,u]))}(o,r,t):o(t);return i=null,e?n.toString(e):n}}}function y(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}p.fill(0),b.createHash=function(e){return g(e)},b.createHmac=g,b.randomBytes=function(e,t){if(!t||!t.call)return new a(l(e));try{t.call(this,void 0,new a(l(e)))}catch(e){t(e)}},function(e,t){for(var n in e)t(e[n],n)}(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){b[e]=function(){y("sorry,",e,"is not implemented yet")}})}).call(this,w("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},w("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(w,b,e){(function(e,t,n,r,o,i,u,a,s){var f=w("./helpers");function c(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,s=r,f=o,c=i,n=d(n,r,o,i,e[u+0],7,-680876936),i=d(i,n,r,o,e[u+1],12,-389564586),o=d(o,i,n,r,e[u+2],17,606105819),r=d(r,o,i,n,e[u+3],22,-1044525330);n=d(n,r,o,i,e[u+4],7,-176418897),i=d(i,n,r,o,e[u+5],12,1200080426),o=d(o,i,n,r,e[u+6],17,-1473231341),r=d(r,o,i,n,e[u+7],22,-45705983),n=d(n,r,o,i,e[u+8],7,1770035416),i=d(i,n,r,o,e[u+9],12,-1958414417),o=d(o,i,n,r,e[u+10],17,-42063),r=d(r,o,i,n,e[u+11],22,-1990404162),n=d(n,r,o,i,e[u+12],7,1804603682),i=d(i,n,r,o,e[u+13],12,-40341101),o=d(o,i,n,r,e[u+14],17,-1502002290),n=h(n,r=d(r,o,i,n,e[u+15],22,1236535329),o,i,e[u+1],5,-165796510),i=h(i,n,r,o,e[u+6],9,-1069501632),o=h(o,i,n,r,e[u+11],14,643717713),r=h(r,o,i,n,e[u+0],20,-373897302),n=h(n,r,o,i,e[u+5],5,-701558691),i=h(i,n,r,o,e[u+10],9,38016083),o=h(o,i,n,r,e[u+15],14,-660478335),r=h(r,o,i,n,e[u+4],20,-405537848),n=h(n,r,o,i,e[u+9],5,568446438),i=h(i,n,r,o,e[u+14],9,-1019803690),o=h(o,i,n,r,e[u+3],14,-187363961),r=h(r,o,i,n,e[u+8],20,1163531501),n=h(n,r,o,i,e[u+13],5,-1444681467),i=h(i,n,r,o,e[u+2],9,-51403784),o=h(o,i,n,r,e[u+7],14,1735328473),n=p(n,r=h(r,o,i,n,e[u+12],20,-1926607734),o,i,e[u+5],4,-378558),i=p(i,n,r,o,e[u+8],11,-2022574463),o=p(o,i,n,r,e[u+11],16,1839030562),r=p(r,o,i,n,e[u+14],23,-35309556),n=p(n,r,o,i,e[u+1],4,-1530992060),i=p(i,n,r,o,e[u+4],11,1272893353),o=p(o,i,n,r,e[u+7],16,-155497632),r=p(r,o,i,n,e[u+10],23,-1094730640),n=p(n,r,o,i,e[u+13],4,681279174),i=p(i,n,r,o,e[u+0],11,-358537222),o=p(o,i,n,r,e[u+3],16,-722521979),r=p(r,o,i,n,e[u+6],23,76029189),n=p(n,r,o,i,e[u+9],4,-640364487),i=p(i,n,r,o,e[u+12],11,-421815835),o=p(o,i,n,r,e[u+15],16,530742520),n=g(n,r=p(r,o,i,n,e[u+2],23,-995338651),o,i,e[u+0],6,-198630844),i=g(i,n,r,o,e[u+7],10,1126891415),o=g(o,i,n,r,e[u+14],15,-1416354905),r=g(r,o,i,n,e[u+5],21,-57434055),n=g(n,r,o,i,e[u+12],6,1700485571),i=g(i,n,r,o,e[u+3],10,-1894986606),o=g(o,i,n,r,e[u+10],15,-1051523),r=g(r,o,i,n,e[u+1],21,-2054922799),n=g(n,r,o,i,e[u+8],6,1873313359),i=g(i,n,r,o,e[u+15],10,-30611744),o=g(o,i,n,r,e[u+6],15,-1560198380),r=g(r,o,i,n,e[u+13],21,1309151649),n=g(n,r,o,i,e[u+4],6,-145523070),i=g(i,n,r,o,e[u+11],10,-1120210379),o=g(o,i,n,r,e[u+2],15,718787259),r=g(r,o,i,n,e[u+9],21,-343485551),n=y(n,a),r=y(r,s),o=y(o,f),i=y(i,c)}return Array(n,r,o,i)}function l(e,t,n,r,o,i){return y((u=y(y(t,e),y(r,i)))<<(a=o)|u>>>32-a,n);var u,a}function d(e,t,n,r,o,i,u){return l(t&n|~t&r,e,t,o,i,u)}function h(e,t,n,r,o,i,u){return l(t&r|n&~r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return l(t^n^r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return l(n^(t|~r),e,t,o,i,u)}function y(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}b.exports=function(e){return f.hash(e,c,16)}}).call(this,w("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},w("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,l,t){(function(e,t,n,r,o,i,u,a,s){var f,c;c=function(e){for(var t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},l.exports=f||c}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(l,d,e){(function(e,t,n,r,o,i,u,a,s){var f=l("./helpers");function c(e,t){e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var n,r,o,i,u,a=Array(80),s=1732584193,f=-271733879,c=-1732584194,l=271733878,d=-1009589776,h=0;h<e.length;h+=16){for(var p=s,g=f,y=c,w=l,b=d,m=0;m<80;m++){a[m]=m<16?e[h+m]:E(a[m-3]^a[m-8]^a[m-14]^a[m-16],1);var v=_(_(E(s,5),(o=f,i=c,u=l,(r=m)<20?o&i|~o&u:!(r<40)&&r<60?o&i|o&u|i&u:o^i^u)),_(_(d,a[m]),(n=m)<20?1518500249:n<40?1859775393:n<60?-1894007588:-899497514)),d=l,l=c,c=E(f,30),f=s,s=v}s=_(s,p),f=_(f,g),c=_(c,y),l=_(l,w),d=_(d,b)}return Array(s,f,c,l,d)}function _(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function E(e,t){return e<<t|e>>>32-t}d.exports=function(e){return f.hash(e,c,20,!0)}}).call(this,l("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},l("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(l,d,e){(function(e,t,n,r,o,i,u,a,s){function B(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function L(e,t){return e>>>t|e<<32-t}function f(e,t){var n,r,o,i,u,a,s,f,c,l,d=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),h=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),p=new Array(64);e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var g,y,w,b,m,v,_,E,I=0;I<e.length;I+=16){n=h[0],r=h[1],o=h[2],i=h[3],u=h[4],a=h[5],s=h[6],f=h[7];for(var A=0;A<64;A++)p[A]=A<16?e[A+I]:B(B(B((E=p[A-2],L(E,17)^L(E,19)^E>>>10),p[A-7]),(_=p[A-15],L(_,7)^L(_,18)^_>>>3)),p[A-16]),c=B(B(B(B(f,L(v=u,6)^L(v,11)^L(v,25)),(m=u)&a^~m&s),d[A]),p[A]),l=B(L(b=n,2)^L(b,13)^L(b,22),(g=n)&(y=r)^g&(w=o)^y&w),f=s,s=a,a=u,u=B(i,c),i=o,o=r,r=n,n=B(c,l);h[0]=B(n,h[0]),h[1]=B(r,h[1]),h[2]=B(o,h[2]),h[3]=B(i,h[3]),h[4]=B(u,h[4]),h[5]=B(a,h[5]),h[6]=B(s,h[6]),h[7]=B(f,h[7])}return h}var c=l("./helpers");d.exports=function(e){return c.hash(e,f,32,!0)}}).call(this,l("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},l("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,c,t){(function(e,t,n,r,o,i,u,a,s){function f(){}(e=c.exports={}).nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;t!==window&&null!==t||"process-tick"!==e.data||(e.stopPropagation(),0<n.length&&n.shift()())},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=f,e.addListener=f,e.once=f,e.off=f,e.removeListener=f,e.removeAllListeners=f,e.emit=f,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,f){(function(e,t,n,r,o,i,u,a,s){f.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,s=(1<<a)-1,f=s>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;0<c;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;0<c;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-f;else{if(i===s)return u?NaN:1/0*(h?-1:1);u+=Math.pow(2,r),i-=f}return(h?-1:1)*u*Math.pow(2,i-r)},f.write=function(e,t,n,r,o,i){var u,a,s,f=8*i-o-1,c=(1<<f)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(s=Math.pow(2,-u))<1&&(u--,s*=2),2<=(t+=1<=u+l?d/s:d*Math.pow(2,1-l))*s&&(u++,s/=2),c<=u+l?(a=0,u=c):1<=u+l?(a=(t*s-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));8<=o;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,f+=o;0<f;e[n+h]=255&u,h+=p,u/=256,f-=8);e[n+h-p]|=128*g}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});

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



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
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
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


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

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
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

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-spinners/BeatLoader.js":
/*!***************************************************!*\
  !*** ./node_modules/react-spinners/BeatLoader.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __importStar(__webpack_require__(/*! react */ "react"));
var unitConverter_1 = __webpack_require__(/*! ./helpers/unitConverter */ "./node_modules/react-spinners/helpers/unitConverter.js");
var animation_1 = __webpack_require__(/*! ./helpers/animation */ "./node_modules/react-spinners/helpers/animation.js");
var beat = (0, animation_1.createAnimation)("BeatLoader", "50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}", "beat");
function BeatLoader(_a) {
    var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 15 : _f, _g = _a.margin, margin = _g === void 0 ? 2 : _g, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "size", "margin"]);
    var wrapper = __assign({ display: "inherit" }, cssOverride);
    var style = function (i) {
        return {
            display: "inline-block",
            backgroundColor: color,
            width: (0, unitConverter_1.cssValue)(size),
            height: (0, unitConverter_1.cssValue)(size),
            margin: (0, unitConverter_1.cssValue)(margin),
            borderRadius: "100%",
            animation: "".concat(beat, " ").concat(0.7 / speedMultiplier, "s ").concat(i % 2 ? "0s" : "".concat(0.35 / speedMultiplier, "s"), " infinite linear"),
            animationFillMode: "both",
        };
    };
    if (!loading) {
        return null;
    }
    return (React.createElement("span", __assign({ style: wrapper }, additionalprops),
        React.createElement("span", { style: style(1) }),
        React.createElement("span", { style: style(2) }),
        React.createElement("span", { style: style(3) })));
}
exports["default"] = BeatLoader;


/***/ }),

/***/ "./node_modules/react-spinners/helpers/animation.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-spinners/helpers/animation.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAnimation = void 0;
var createAnimation = function (loaderName, frames, suffix) {
    var animationName = "react-spinners-".concat(loaderName, "-").concat(suffix);
    if (typeof window == "undefined" || !window.document) {
        return animationName;
    }
    var styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
    var styleSheet = styleEl.sheet;
    var keyFrames = "\n    @keyframes ".concat(animationName, " {\n      ").concat(frames, "\n    }\n  ");
    if (styleSheet) {
        styleSheet.insertRule(keyFrames, 0);
    }
    return animationName;
};
exports.createAnimation = createAnimation;


/***/ }),

/***/ "./node_modules/react-spinners/helpers/unitConverter.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-spinners/helpers/unitConverter.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cssValue = exports.parseLengthAndUnit = void 0;
var cssUnit = {
    cm: true,
    mm: true,
    in: true,
    px: true,
    pt: true,
    pc: true,
    em: true,
    ex: true,
    ch: true,
    rem: true,
    vw: true,
    vh: true,
    vmin: true,
    vmax: true,
    "%": true,
};
/**
 * If size is a number, append px to the value as default unit.
 * If size is a string, validate against list of valid units.
 * If unit is valid, return size as is.
 * If unit is invalid, console warn issue, replace with px as the unit.
 *
 * @param {(number | string)} size
 * @return {LengthObject} LengthObject
 */
function parseLengthAndUnit(size) {
    if (typeof size === "number") {
        return {
            value: size,
            unit: "px",
        };
    }
    var value;
    var valueString = (size.match(/^[0-9.]*/) || "").toString();
    if (valueString.includes(".")) {
        value = parseFloat(valueString);
    }
    else {
        value = parseInt(valueString, 10);
    }
    var unit = (size.match(/[^0-9]*$/) || "").toString();
    if (cssUnit[unit]) {
        return {
            value: value,
            unit: unit,
        };
    }
    console.warn("React Spinners: ".concat(size, " is not a valid css value. Defaulting to ").concat(value, "px."));
    return {
        value: value,
        unit: "px",
    };
}
exports.parseLengthAndUnit = parseLengthAndUnit;
/**
 * Take value as an input and return valid css value
 *
 * @param {(number | string)} value
 * @return {string} valid css value
 */
function cssValue(value) {
    var lengthWithunit = parseLengthAndUnit(value);
    return "".concat(lengthWithunit.value).concat(lengthWithunit.unit);
}
exports.cssValue = cssValue;


/***/ }),

/***/ "./node_modules/use-async-resource/lib/AsyncResourceContent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/use-async-resource/lib/AsyncResourceContent.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const React = __importStar(__webpack_require__(/*! react */ "react"));
const AsyncResourceErrorBoundary_1 = __importDefault(__webpack_require__(/*! ./AsyncResourceErrorBoundary */ "./node_modules/use-async-resource/lib/AsyncResourceErrorBoundary.js"));
const AsyncResourceContent = ({ children, fallback, errorMessage, errorComponent: ErrorComponent, }) => {
    const ErrorBoundary = ErrorComponent || AsyncResourceErrorBoundary_1.default;
    return (React.createElement(ErrorBoundary, { errorMessage: errorMessage },
        React.createElement(React.Suspense, { fallback: fallback }, children)));
};
exports["default"] = AsyncResourceContent;
//# sourceMappingURL=AsyncResourceContent.js.map

/***/ }),

/***/ "./node_modules/use-async-resource/lib/AsyncResourceErrorBoundary.js":
/*!***************************************************************************!*\
  !*** ./node_modules/use-async-resource/lib/AsyncResourceErrorBoundary.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const React = __importStar(__webpack_require__(/*! react */ "react"));
class AsyncResourceErrorBoundary extends React.Component {
    static getDerivedStateFromError(error) {
        return { error };
    }
    static getDerivedStateFromProps({ errorMessage }, state) {
        if (state.error) {
            return {
                errorMessage: typeof errorMessage === 'function'
                    ? errorMessage(state.error)
                    : (errorMessage || state.error.message),
            };
        }
        return state;
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        if (this.state.errorMessage) {
            return this.state.errorMessage;
        }
        return this.props.children;
    }
}
exports["default"] = AsyncResourceErrorBoundary;
//# sourceMappingURL=AsyncResourceErrorBoundary.js.map

/***/ }),

/***/ "./node_modules/use-async-resource/lib/cache.js":
/*!******************************************************!*\
  !*** ./node_modules/use-async-resource/lib/cache.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resourceCache = void 0;
const object_hash_1 = __importDefault(__webpack_require__(/*! object-hash */ "./node_modules/object-hash/dist/object_hash.js"));
const caches = new Map();
function resourceCache(apiFn) {
    if (!caches.has(apiFn)) {
        caches.set(apiFn, new Map());
    }
    const apiCache = caches.get(apiFn);
    return {
        get(...params) {
            return apiCache.get((0, object_hash_1.default)(params));
        },
        set(dataFn, ...params) {
            return apiCache.set((0, object_hash_1.default)(params), dataFn);
        },
        delete(...params) {
            return apiCache.delete((0, object_hash_1.default)(params));
        },
        clear() {
            caches.delete(apiFn);
            return apiCache.clear();
        },
    };
}
exports.resourceCache = resourceCache;
//# sourceMappingURL=cache.js.map

/***/ }),

/***/ "./node_modules/use-async-resource/lib/dataReaderInitializer.js":
/*!**********************************************************************!*\
  !*** ./node_modules/use-async-resource/lib/dataReaderInitializer.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeDataReader = void 0;
const cache_1 = __webpack_require__(/*! ./cache */ "./node_modules/use-async-resource/lib/cache.js");
function initializeDataReader(apiFn, ...parameters) {
    const apiFnCache = (0, cache_1.resourceCache)(apiFn);
    const cachedResource = apiFnCache.get(...parameters);
    if (cachedResource) {
        return cachedResource;
    }
    let data;
    let status = 'init';
    let error;
    const fetchingPromise = apiFn(...parameters)
        .then((result) => {
        data = result;
        status = 'done';
        return result;
    })
        .catch((err) => {
        error = err;
        status = 'error';
    });
    function dataReaderFn(modifier) {
        if (status === 'init') {
            throw fetchingPromise;
        }
        else if (status === 'error') {
            throw error;
        }
        return typeof modifier === 'function'
            ? modifier(data)
            : data;
    }
    apiFnCache.set(dataReaderFn, ...parameters);
    return dataReaderFn;
}
exports.initializeDataReader = initializeDataReader;
//# sourceMappingURL=dataReaderInitializer.js.map

/***/ }),

/***/ "./node_modules/use-async-resource/lib/fileResource.js":
/*!*************************************************************!*\
  !*** ./node_modules/use-async-resource/lib/fileResource.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.script = exports.image = void 0;
function image(imageSrc) {
    return new Promise((resolve, reject) => {
        const file = new Image();
        file.onload = () => {
            resolve(imageSrc);
        };
        file.onerror = reject;
        file.src = imageSrc;
    });
}
exports.image = image;
function script(scriptSrc) {
    return new Promise((resolve, reject) => {
        const file = document.createElement('script');
        file.onload = () => {
            resolve(scriptSrc);
        };
        file.onerror = reject;
        file.src = scriptSrc;
        document.getElementsByTagName('body')[0].appendChild(file);
    });
}
exports.script = script;
//# sourceMappingURL=fileResource.js.map

/***/ }),

/***/ "./node_modules/use-async-resource/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/use-async-resource/lib/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsyncResourceContent = exports.resourceCache = exports.fileResource = exports.preloadResource = exports.useAsyncResource = void 0;
__exportStar(__webpack_require__(/*! ./types */ "./node_modules/use-async-resource/lib/types.js"), exports);
const useAsyncResource_1 = __webpack_require__(/*! ./useAsyncResource */ "./node_modules/use-async-resource/lib/useAsyncResource.js");
Object.defineProperty(exports, "useAsyncResource", ({ enumerable: true, get: function () { return useAsyncResource_1.useAsyncResource; } }));
const fileResource = __importStar(__webpack_require__(/*! ./fileResource */ "./node_modules/use-async-resource/lib/fileResource.js"));
exports.fileResource = fileResource;
const cache_1 = __webpack_require__(/*! ./cache */ "./node_modules/use-async-resource/lib/cache.js");
Object.defineProperty(exports, "resourceCache", ({ enumerable: true, get: function () { return cache_1.resourceCache; } }));
const dataReaderInitializer_1 = __webpack_require__(/*! ./dataReaderInitializer */ "./node_modules/use-async-resource/lib/dataReaderInitializer.js");
Object.defineProperty(exports, "preloadResource", ({ enumerable: true, get: function () { return dataReaderInitializer_1.initializeDataReader; } }));
const AsyncResourceContent_1 = __importDefault(__webpack_require__(/*! ./AsyncResourceContent */ "./node_modules/use-async-resource/lib/AsyncResourceContent.js"));
exports.AsyncResourceContent = AsyncResourceContent_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/use-async-resource/lib/types.js":
/*!******************************************************!*\
  !*** ./node_modules/use-async-resource/lib/types.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/use-async-resource/lib/useAsyncResource.js":
/*!*****************************************************************!*\
  !*** ./node_modules/use-async-resource/lib/useAsyncResource.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useAsyncResource = void 0;
const react_1 = __webpack_require__(/*! react */ "react");
const dataReaderInitializer_1 = __webpack_require__(/*! ./dataReaderInitializer */ "./node_modules/use-async-resource/lib/dataReaderInitializer.js");
function useAsyncResource(apiFunction, ...parameters) {
    const dataReaderObj = (0, react_1.useRef)(() => undefined);
    (0, react_1.useMemo)(() => {
        if (parameters.length) {
            if (!apiFunction.length &&
                parameters.length === 1 &&
                Array.isArray(parameters[0]) &&
                parameters[0].length === 0) {
                dataReaderObj.current = (0, dataReaderInitializer_1.initializeDataReader)(apiFunction);
            }
            else {
                dataReaderObj.current = (0, dataReaderInitializer_1.initializeDataReader)(apiFunction, ...parameters);
            }
        }
    }, [apiFunction, ...parameters]);
    const [, forceRender] = (0, react_1.useState)(0);
    const updaterFn = (0, react_1.useCallback)((...newParameters) => {
        dataReaderObj.current = (0, dataReaderInitializer_1.initializeDataReader)(apiFunction, ...newParameters);
        forceRender(ct => 1 - ct);
    }, [apiFunction]);
    return [dataReaderObj.current, updaterFn];
}
exports.useAsyncResource = useAsyncResource;
//# sourceMappingURL=useAsyncResource.js.map

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/escape-html":
/*!************************************!*\
  !*** external ["wp","escapeHtml"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["escapeHtml"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************************!*\
  !*** ./src/react/Support/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _support__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./support */ "./src/react/Support/support.js");



var container = document.getElementById('has-support-admin-settings');
var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_support__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
})();

/******/ })()
;
//# sourceMappingURL=has-admin-support.js.map