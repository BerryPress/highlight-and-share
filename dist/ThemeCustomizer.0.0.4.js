"use strict";
(self["webpackChunkhighlight_and_share"] = self["webpackChunkhighlight_and_share"] || []).push([["ThemeCustomizer.0.0.4"],{

/***/ "./src/react/Components/ColorPicker/index.js":
/*!***************************************************!*\
  !*** ./src/react/Components/ColorPicker/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hex-to-rgba */ "./node_modules/hex-to-rgba/build/index.js");
/* harmony import */ var hex_to_rgba__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/base-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/tooltip/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/popover/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/color-picker/legacy-adapter.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/range-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/color-palette/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "has-component-color-picker-wrapper"
  }, !!label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "has-color-component-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, label)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-component-color-picker"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-color-picker-area has-component-color-picker-palette"
  }, !isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper has-color-picker-area has-component-color-picker-palette', value ? '' : 'components-color-palette__custom-color')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })))), isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "has-component-color-picker",
    onClose: toggleClose,
    noArrow: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: colorKey
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.LegacyAdapter, {
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["default"], {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Opacity', 'quotes-dlx')
  }, opacityIcon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__["default"], {
    value: valueOpacity ? valueOpacity : 0,
    onChange: function onChange(opacityValue) {
      return onOpacityChange(opacityValue);
    },
    min: 0,
    max: 1,
    step: 0.01,
    initialPosition: 1
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "has-component-color-picker-palette"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["default"], {
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["default"], {
    onClick: function onClick() {
      _onChange(slug, defaultColor);
      setColorKey(defaultColor);
      setColor(defaultColor);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Color', 'quotes-dlx')))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HASColorPicker);

/***/ }),

/***/ "./src/react/Components/Dimensions/index.js":
/*!**************************************************!*\
  !*** ./src/react/Components/Dimensions/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unit_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../unit-picker */ "./src/react/Components/unit-picker/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/text-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/tooltip/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */


/**
 * External dependencies
 */






var DimensionsControl = function DimensionsControl(props) {
  var getDefaultValues = function getDefaultValues() {
    return {
      attrTop: props.attrTop,
      attrRight: props.attrRight,
      attrBottom: props.attrBottom,
      attrLeft: props.attrLeft,
      attrSyncUnits: props.attrSyncUnits,
      attrUnit: props.attrUnit
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useForm)({
      defaultValues: getDefaultValues()
    }),
    register = _useForm.register,
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues,
    reset = _useForm.reset,
    trigger = _useForm.trigger;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields,
    touchedFields = _useFormState.touchedFields;
  var _props$label = props.label,
    label = _props$label === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding', 'highlight-and-share') : _props$label,
    _props$labelTop = props.labelTop,
    labelTop = _props$labelTop === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top', 'highlight-and-share') : _props$labelTop,
    _props$labelRight = props.labelRight,
    labelRight = _props$labelRight === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'highlight-and-share') : _props$labelRight,
    _props$labelBottom = props.labelBottom,
    labelBottom = _props$labelBottom === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom', 'highlight-and-share') : _props$labelBottom,
    _props$labelLeft = props.labelLeft,
    labelLeft = _props$labelLeft === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'highlight-and-share') : _props$labelLeft,
    units = props.units,
    onValuesChange = props.onValuesChange;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    onValuesChange(formValues);
  }, [formValues]);

  /**
   * Change the all values in parent.
   *
   * @param {number} value Value to change to.
   */
  var changeAllValues = function changeAllValues(value) {
    setValue('attrBottom', value);
    setValue('attrLeft', value);
    setValue('attrRight', value);
    setValue('attrTop', value);
  };

  /**
   * When the sync value is selected, sync all values to the maximum number.
   */
  var syncUnits = function syncUnits() {
    var numbers = [getValues('attrTop'), getValues('attrRight'), getValues('attrBottom'), getValues('attrLeft')];
    var syncValue = Math.max.apply(null, numbers);
    setValue('attrSyncUnits', !getValues('attrSyncUnits'));
    changeAllValues(syncValue);
  };

  /**
   * Change the units.
   *
   * @param {string} value Unit changing (px, em, rem, vh).
   */
  var onChangeUnits = function onChangeUnits(value) {
    setValue('attrUnit', value);
  };
  var onDimensionChange = function onDimensionChange(value) {
    if (getValues('attrSyncUnits')) {
      changeAllValues(value);
    }
  };
  var syncIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 512",
    width: "37.5",
    height: "30"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "currentColor",
    d: "M580.2 267.3c56.2-56.2 56.2-147.4 0-203.6s-147.4-56.3-203.6 0L365.3 75l45.3 45.3 11.3-11.3c31.2-31.2 81.9-31.2 113.1 0s31.2 81.9 0 113.1L421.8 335.2c-31.2 31.2-81.9 31.2-113.1 0-25.6-25.6-30.3-64.3-13.8-94.6 1.8-3.4 3.9-6.7 6.3-9.8L250 192.4c-4.3 5.7-8.1 11.6-11.4 17.8-29.5 54.6-21.3 124.2 24.9 170.3 56.2 56.2 147.4 56.2 203.6 0l113.1-113.2zM59.8 244.7c-56.2 56.2-56.2 147.4 0 203.6s147.4 56.2 203.6 0l11.3-11.3-45.3-45.3-11.3 11.3c-31.2 31.2-81.9 31.2-113.1 0s-31.2-81.9 0-113.1l113.2-113.1c31.2-31.2 81.9-31.2 113.1 0 25.6 25.6 30.3 64.3 13.8 94.6-1.8 3.4-3.9 6.7-6.3 9.8l51.2 38.4c4.3-5.7 8.1-11.6 11.4-17.8 29.5-54.6 21.3-124.2-24.9-170.3-56.2-56.2-147.4-56.2-203.6 0L59.8 244.7z"
  }));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-base-control components-has-dimensions-control"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "attrUnit",
    control: control,
    render: function render(_ref) {
      var _ref$field = _ref.field,
        onChange = _ref$field.onChange,
        value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_unit_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
        label: label,
        value: value,
        units: units,
        onClick: function onClick(newValue) {
          onChange(newValue);
          onChangeUnits(newValue);
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-dimensions-control__inputs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "attrTop",
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelTop
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: value,
        type: "number",
        label: labelTop,
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange(newValue);
        },
        min: 0
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "attrRight",
    control: control,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange2 = _ref3$field.onChange,
        value = _ref3$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelRight
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: value,
        type: "number",
        label: labelRight,
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange2(newValue);
        },
        min: 0
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "attrBottom",
    control: control,
    render: function render(_ref4) {
      var _ref4$field = _ref4.field,
        _onChange3 = _ref4$field.onChange,
        value = _ref4$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelBottom
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: value,
        type: "number",
        label: labelBottom,
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange3(newValue);
        },
        min: 0
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "attrLeft",
    control: control,
    render: function render(_ref5) {
      var _ref5$field = _ref5.field,
        _onChange4 = _ref5$field.onChange,
        value = _ref5$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelLeft
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: value,
        type: "number",
        label: labelLeft,
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange4(newValue);
        },
        min: 0
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["default"], {
    text: !!getValues('attrSyncUnits') ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unsync', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync', 'highlight-and-share')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "components-has-dimensions-control_sync",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync Units', 'generateblocks'),
    isPrimary: getValues('attrSyncUnits') ? true : false,
    "aria-pressed": getValues('attrSyncUnits') ? true : false
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DimensionsControl);

/***/ }),

/***/ "./src/react/Components/Icons/CircularInfo.js":
/*!****************************************************!*\
  !*** ./src/react/Components/Icons/CircularInfo.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);

 // ES6

var CircularInfo = function CircularInfo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: props.width,
    height: props.height
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: props.fill,
    d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 128c17.67 0 32 14.33 32 32s-14.33 32-32 32-32-14.3-32-32 14.3-32 32-32zm40 256h-80c-13.2 0-24-10.7-24-24s10.75-24 24-24h16v-64h-8c-13.25 0-24-10.75-24-24s10.8-24 24-24h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24s-10.7 24-24 24z"
  }));
};
CircularInfo.defaultProps = {
  width: 16,
  height: 16,
  fill: '#333333'
};
CircularInfo.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircularInfo);

/***/ }),

/***/ "./src/react/Components/SocialNetworkColorsTabs/index.js":
/*!***************************************************************!*\
  !*** ./src/react/Components/SocialNetworkColorsTabs/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/tab-panel/index.js");
/* harmony import */ var _Contexts_SocialNetworksContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Contexts/SocialNetworksContext */ "./src/react/Contexts/SocialNetworksContext.js");
/* harmony import */ var _TabColorPickers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TabColorPickers */ "./src/react/Components/TabColorPickers/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var SocialNetworkColorsTabs = function SocialNetworkColorsTabs() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Contexts_SocialNetworksContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
    socialNetworkColors = _useContext.socialNetworkColors,
    setSocialNetworkColors = _useContext.setSocialNetworkColors;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('twitter'),
    _useState2 = _slicedToArray(_useState, 2),
    selectedTab = _useState2[0],
    setSelectedTab = _useState2[1];
  var getTabs = function getTabs() {
    var tabs = [];
    Object.values(socialNetworkColors).forEach(function (network, index) {
      tabs.push({
        key: index,
        name: network.slug,
        title: network.label,
        className: "social-network-colors-tab-".concat(network.slug),
        background: network.background,
        background_hover: network.background_hover,
        icon_color: network.icon_color,
        icon_color_hover: network.icon_color_hover
      });
    });
    return tabs;
  };
  var onValueChange = function onValueChange(formValues) {
    var newSocialNetworkColors = _objectSpread({}, socialNetworkColors);
    newSocialNetworkColors[selectedTab] = _objectSpread(_objectSpread({}, newSocialNetworkColors[selectedTab]), {}, {
      background: formValues.backgroundColor,
      background_hover: formValues.backgroundColorHover,
      icon_color: formValues.iconColor,
      icon_color_hover: formValues.iconColorHover
    });
    setSocialNetworkColors(newSocialNetworkColors);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('has-admin-colors-tabs')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Set the Icon Colors', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "has-admin-colors-tabs-panel",
    activeClass: "active-tab",
    onSelect: function onSelect(tabName) {
      setSelectedTab(tabName);
    },
    orientation: "horizontal",
    tabs: getTabs(),
    initialTabName: selectedTab
  }, function (tab) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_TabColorPickers__WEBPACK_IMPORTED_MODULE_5__["default"], {
      backgroundColor: tab.background,
      backgroundColorHover: tab.background_hover,
      iconColor: tab.icon_color,
      iconColorHover: tab.icon_color_hover,
      onValueChange: onValueChange
    });
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialNetworkColorsTabs);

/***/ }),

/***/ "./src/react/Components/TabColorPickers/index.js":
/*!*******************************************************!*\
  !*** ./src/react/Components/TabColorPickers/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ColorPicker */ "./src/react/Components/ColorPicker/index.js");
/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */


/**
 * External dependencies
 */





var defaultColors = hasAppearanceAdmin.colors;
var TabColorPickers = function TabColorPickers(props) {
  var getDefaultValues = function getDefaultValues() {
    return {
      backgroundColor: props.backgroundColor,
      backgroundColorHover: props.backgroundColorHover,
      iconColor: props.iconColor,
      iconColorHover: props.iconColorHover
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useForm)({
      defaultValues: getDefaultValues()
    }),
    register = _useForm.register,
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues,
    reset = _useForm.reset,
    trigger = _useForm.trigger;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields,
    touchedFields = _useFormState.touchedFields;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    props.onValueChange(formValues);
  }, [formValues]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-tab-color-picker-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "backgroundColor",
    control: control,
    render: function render(_ref) {
      var _ref$field = _ref.field,
        _onChange = _ref$field.onChange,
        value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: getValues('backgroundColor'),
        slug: 'backgroundColor'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "backgroundColorHover",
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange2 = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange2(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color Hover', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: getValues('backgroundColorHover'),
        slug: 'backgroundColorHover'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "iconColor",
    control: control,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange3 = _ref3$field.onChange,
        value = _ref3$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange3(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Color', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: getValues('iconColor'),
        slug: 'iconColor'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
    name: "iconColorHover",
    control: control,
    render: function render(_ref4) {
      var _ref4$field = _ref4.field,
        _onChange4 = _ref4$field.onChange,
        value = _ref4$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange4(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Color Hover', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: getValues('iconColorHover'),
        slug: 'iconColorHover'
      });
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabColorPickers);

/***/ }),

/***/ "./src/react/Components/ThemeCustomizer/index.js":
/*!*******************************************************!*\
  !*** ./src/react/Components/ThemeCustomizer/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Contexts_SocialNetworksContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Contexts/SocialNetworksContext */ "./src/react/Contexts/SocialNetworksContext.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/select-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/toggle-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/range-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/radio-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Notice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Notice */ "./src/react/Components/Notice/index.js");
/* harmony import */ var _Icons_CircularInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Icons/CircularInfo */ "./src/react/Components/Icons/CircularInfo.js");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ColorPicker */ "./src/react/Components/ColorPicker/index.js");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Dimensions */ "./src/react/Components/Dimensions/index.js");
/* harmony import */ var _SocialNetworkColorsTabs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../SocialNetworkColorsTabs */ "./src/react/Components/SocialNetworkColorsTabs/index.js");
/* harmony import */ var _Icons_Spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Icons/Spinner */ "./src/react/Components/Icons/Spinner.js");
/* harmony import */ var _Utils_SendCommand__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils/SendCommand */ "./src/react/Utils/SendCommand.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var defaultColors = hasAppearanceAdmin.colors;
var ThemeCustomizer = function ThemeCustomizer() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Contexts_SocialNetworksContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
    theme = _useContext.theme,
    setTheme = _useContext.setTheme,
    appearanceThemeData = _useContext.appearanceThemeData,
    setAppearanceThemeData = _useContext.setAppearanceThemeData,
    socialNetworkColors = _useContext.socialNetworkColors,
    setSocialNetworkColors = _useContext.setSocialNetworkColors;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    saving = _useState2[0],
    setSaving = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isSaved = _useState4[0],
    setIsSaved = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    resetting = _useState6[0],
    setResetting = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isReset = _useState8[0],
    setIsReset = _useState8[1];
  var getDefaultValues = function getDefaultValues() {
    return {
      theme: appearanceThemeData.theme,
      icons_only: appearanceThemeData.icons_only,
      orientation: appearanceThemeData.orientation,
      group_icons: appearanceThemeData.group_icons,
      background_color: appearanceThemeData.background_color,
      background_color_hover: appearanceThemeData.background_color_hover,
      icon_colors_group: appearanceThemeData.icon_colors_group,
      icon_colors_group_hover: appearanceThemeData.icon_colors_group_hover,
      border_radius_group: appearanceThemeData.border_radius_group,
      icon_border_radius: appearanceThemeData.icon_border_radius,
      icon_padding: appearanceThemeData.icon_padding,
      icon_size: appearanceThemeData.icon_size,
      font_size: appearanceThemeData.font_size,
      icon_gap: appearanceThemeData.icon_gap,
      icon_colors: appearanceThemeData.icon_colors,
      show_tooltips: appearanceThemeData.show_tooltips,
      tooltips_text_color: appearanceThemeData.tooltips_text_color,
      tooltips_background_color: appearanceThemeData.tooltips_background_color
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    getValues = _useForm.getValues,
    reset = _useForm.reset;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useWatch)({
    control: control
  });
  var onSubmit = function onSubmit(formData) {
    var iconColors = {
      icon_colors: socialNetworkColors
    };
    setSaving(true);
    (0,_Utils_SendCommand__WEBPACK_IMPORTED_MODULE_5__["default"])('has_save_appearance_settings', {
      formData: _objectSpread(_objectSpread({}, formData), iconColors),
      nonce: hasAppearanceAdmin.saveNonce
    }).then(function (response) {
      var _response$data = response.data,
        data = _response$data.data,
        success = _response$data.success;
      if (success) {
        setAppearanceThemeData(data);
        setIsSaved(true);
        setTimeout(function () {
          setIsSaved(false);
        }, 3000);
      }
    })["catch"](function (error) {}).then(function () {
      setSaving(false);
    });
  };
  var handleReset = function handleReset(e) {
    setResetting(true);
    (0,_Utils_SendCommand__WEBPACK_IMPORTED_MODULE_5__["default"])('has_reset_appearance_settings', {
      nonce: hasAppearanceAdmin.resetNonce
    }).then(function (response) {
      var _response$data2 = response.data,
        data = _response$data2.data,
        success = _response$data2.success;
      if (success) {
        setAppearanceThemeData(data);
        setTheme(data.theme);
        setSocialNetworkColors(data.icon_colors);
        reset(data, {
          keepDirtyValues: false,
          keepDirty: false,
          keepDefaultValues: false
        });
        setIsReset(true);
        setTimeout(function () {
          setIsReset(false);
        }, 3000);
      }
    })["catch"](function (error) {}).then(function () {
      setResetting(false);
    });
  };
  var getThemes = function getThemes() {
    var themes = hasAppearanceAdmin.themes;

    // Loop through themes and populate label value relationship.
    var themeOptions = [];
    for (var themeKey in themes) {
      themeOptions.push({
        label: themes[themeKey],
        value: themeKey
      });
    }
    // Add custom option.
    themeOptions.push({
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom', 'highlight-and-share'),
      value: 'custom'
    });
    return themeOptions;
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setAppearanceThemeData(formValues);
  }, [formValues]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-theme-customizer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "theme",
    control: control,
    render: function render(_ref) {
      var _ref$field = _ref.field,
        _onChange = _ref$field.onChange,
        value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: "has-admin__theme-select",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Theme', 'highlight-and-share'),
        value: value,
        onChange: function onChange(newTheme) {
          setTheme(newTheme);
          _onChange(newTheme);
        },
        options: getThemes()
      });
    }
  })), 'custom' === theme && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row has-description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_7__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You have chosen a custom theme. You can configure the settings and see a preview below.', 'highlight-and-share'),
    status: "info",
    politeness: "polite",
    inline: false,
    icon: _Icons_CircularInfo__WEBPACK_IMPORTED_MODULE_8__["default"]
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "icons_only",
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange2 = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hide Labels (Icons Only)', 'highlight-and-share'),
        className: "has-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          _onChange2(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display only the icons without text.', 'highlight-and-share')
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "group_icons",
    control: control,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange3 = _ref3$field.onChange,
        value = _ref3$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Group Icons Together', 'highlight-and-share'),
        className: "has-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          _onChange3(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Modify all icons at once or have them separated with individual colors and backgrounds.', 'highlight-and-share')
      });
    }
  })), getValues('group_icons') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "background_color",
    control: control,
    render: function render(_ref4) {
      var _ref4$field = _ref4.field,
        _onChange4 = _ref4$field.onChange,
        value = _ref4$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_10__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange4(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: '#000000',
        slug: 'background_color'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "background_color_hover",
    control: control,
    render: function render(_ref5) {
      var _ref5$field = _ref5.field,
        _onChange5 = _ref5$field.onChange,
        value = _ref5$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_10__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange5(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color Hover', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: '#333333',
        slug: 'background_color_hover'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "icon_colors_group",
    control: control,
    render: function render(_ref6) {
      var _ref6$field = _ref6.field,
        _onChange6 = _ref6$field.onChange,
        value = _ref6$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_10__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange6(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Color', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: '#FFFFFF',
        slug: 'icon_colors_group'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "icon_colors_group_hover",
    control: control,
    render: function render(_ref7) {
      var _ref7$field = _ref7.field,
        _onChange7 = _ref7$field.onChange,
        value = _ref7$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_10__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange7(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Color Hover', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: '#FFFFFF',
        slug: 'icon_colors_group_hover'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "border_radius_group",
    control: control,
    render: function render(_ref8) {
      var _ref8$field = _ref8.field,
        onChange = _ref8$field.onChange,
        value = _ref8$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Dimensions__WEBPACK_IMPORTED_MODULE_11__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Border Radius', 'highlight-and-share'),
        allowNegatives: false,
        attrTop: value.attrTop,
        attrRight: value.attrRight,
        attrBottom: value.attrBottom,
        attrLeft: value.attrLeft,
        attrUnit: value.attrUnit,
        attrSyncUnits: value.attrSyncUnits,
        labelTop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Left', 'highlight-and-share'),
        labelRight: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Right', 'highlight-and-share'),
        labelBottom: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Right', 'highlight-and-share'),
        labelLeft: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Left', 'highlight-and-share'),
        units: ['px', 'em', 'rem', '%'],
        onValuesChange: function onValuesChange(newValues) {
          onChange(newValues);
        }
      });
    }
  }))), !getValues('group_icons') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SocialNetworkColorsTabs__WEBPACK_IMPORTED_MODULE_12__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "icon_border_radius",
    control: control,
    render: function render(_ref9) {
      var _ref9$field = _ref9.field,
        onChange = _ref9$field.onChange,
        value = _ref9$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Dimensions__WEBPACK_IMPORTED_MODULE_11__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icons Border Radius', 'highlight-and-share'),
        allowNegatives: false,
        attrTop: value.attrTop,
        attrRight: value.attrRight,
        attrBottom: value.attrBottom,
        attrLeft: value.attrLeft,
        attrUnit: value.attrUnit,
        attrSyncUnits: value.attrSyncUnits,
        labelTop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Left', 'highlight-and-share'),
        labelRight: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Right', 'highlight-and-share'),
        labelBottom: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Right', 'highlight-and-share'),
        labelLeft: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Left', 'highlight-and-share'),
        units: ['px', 'em', 'rem', '%'],
        onValuesChange: function onValuesChange(newValues) {
          onChange(newValues);
        }
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "icon_padding",
    control: control,
    render: function render(_ref10) {
      var _ref10$field = _ref10.field,
        onChange = _ref10$field.onChange,
        value = _ref10$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Dimensions__WEBPACK_IMPORTED_MODULE_11__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icons Padding', 'highlight-and-share'),
        allowNegatives: false,
        attrTop: value.attrTop,
        attrRight: value.attrRight,
        attrBottom: value.attrBottom,
        attrLeft: value.attrLeft,
        attrUnit: value.attrUnit,
        attrSyncUnits: value.attrSyncUnits,
        labelTop: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding Left', 'highlight-and-share'),
        labelRight: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding Right', 'highlight-and-share'),
        labelBottom: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding Bottom', 'highlight-and-share'),
        labelLeft: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding Left', 'highlight-and-share'),
        units: ['px', 'em', 'rem'],
        onValuesChange: function onValuesChange(newValues) {
          onChange(newValues);
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "icon_size",
    control: control,
    render: function render(_ref11) {
      var _ref11$field = _ref11.field,
        _onChange8 = _ref11$field.onChange,
        value = _ref11$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set the Icon Size', 'highlight-and-share'),
        step: 1,
        value: value,
        max: 64,
        min: 14,
        currentInput: 16,
        initialPosition: 16,
        allowReset: true,
        className: "has-admin__range-control",
        onChange: function onChange(icon_sizeValue) {
          _onChange8(icon_sizeValue);
        },
        trackColor: "#4F4F4F",
        railColor: "#CECECE"
      }));
    }
  })), !getValues('icons_only') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "font_size",
    control: control,
    render: function render(_ref12) {
      var _ref12$field = _ref12.field,
        _onChange9 = _ref12$field.onChange,
        value = _ref12$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set the Font Size', 'highlight-and-share'),
        step: 1,
        value: value,
        max: 64,
        min: 14,
        currentInput: 16,
        initialPosition: 16,
        allowReset: true,
        className: "has-admin__range-control",
        onChange: function onChange(font_sizeValue) {
          _onChange9(font_sizeValue);
        },
        trackColor: "#4F4F4F",
        railColor: "#CECECE"
      }));
    }
  }))), !getValues('group_icons') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "icon_gap",
    control: control,
    render: function render(_ref13) {
      var _ref13$field = _ref13.field,
        _onChange10 = _ref13$field.onChange,
        value = _ref13$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gap Between Items', 'highlight-and-share'),
        step: 1,
        value: value,
        max: 48,
        min: 0,
        currentInput: 15,
        initialPosition: 15,
        allowReset: true,
        className: "has-admin__range-control",
        onChange: function onChange(icon_gapValue) {
          _onChange10(icon_gapValue);
        },
        trackColor: "#4F4F4F",
        railColor: "#CECECE"
      }));
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "show_tooltips",
    control: control,
    render: function render(_ref14) {
      var _ref14$field = _ref14.field,
        _onChange11 = _ref14$field.onChange,
        value = _ref14$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Tooltips', 'highlight-and-share'),
        className: "has-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          _onChange11(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hover over a social network to see a tooltip.', 'highlight-and-share')
      });
    }
  })), getValues('show_tooltips') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "tooltips_background_color",
    control: control,
    render: function render(_ref15) {
      var _ref15$field = _ref15.field,
        _onChange12 = _ref15$field.onChange,
        value = _ref15$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_10__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange12(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tooltips Background Color', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: '#000000',
        slug: 'tooltips_background_color'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "tooltips_text_color",
    control: control,
    render: function render(_ref16) {
      var _ref16$field = _ref16.field,
        _onChange13 = _ref16$field.onChange,
        value = _ref16$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_10__["default"], {
        value: value,
        onChange: function onChange(slug, newValue) {
          _onChange13(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tooltips Text Color', 'highlight-and-share'),
        defaultColors: defaultColors,
        defaultColor: '#FFFFFF',
        slug: 'tooltips_text_color'
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin-component-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "orientation",
    control: control,
    render: function render(_ref17) {
      var _ref17$field = _ref17.field,
        _onChange14 = _ref17$field.onChange,
        value = _ref17$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
        label: "Orientation",
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select the orientation of the icons (can be horizontal or vertical).', 'highlight-and-share'),
        selected: value,
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Horizontal', 'highlight-and-share'),
          value: 'horizontal'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Vertical', 'highlight-and-share'),
          value: 'vertical'
        }],
        onChange: function onChange(radioValue) {
          return _onChange14(radioValue);
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin__tabs--content-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin__tabs--content-actions--left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('has__btn has__btn-primary has__btn--icon-right', {
      'has-icon': saving
    }, {
      'is-saving': {
        saving: saving
      }
    }),
    type: "submit",
    text: saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Saving…', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save Theme Options', 'highlight-and-share'),
    icon: saving ? _Icons_Spinner__WEBPACK_IMPORTED_MODULE_16__["default"] : false,
    icon_size: "18",
    iconPosition: "right",
    disabled: saving || resetting,
    onClick: function onClick() {}
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-admin__tabs--content-actions--right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('has__btn has__btn-danger has__btn--icon-right', {
      'has-icon': resetting
    }, {
      'is-resetting': {
        resetting: resetting
      }
    }),
    type: "button",
    text: resetting ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Resetting…', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset Theme Options', 'highlight-and-share'),
    icon: resetting ? _Icons_Spinner__WEBPACK_IMPORTED_MODULE_16__["default"] : false,
    icon_size: "18",
    iconPosition: "right",
    disabled: saving || resetting,
    onClick: function onClick() {
      handleReset();
    }
  }))), isSaved && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_7__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Your settings have been saved.'),
    status: "success",
    politeness: "assertive"
  }), isReset && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notice__WEBPACK_IMPORTED_MODULE_7__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Your settings have been reset to defaults.'),
    status: "success",
    politeness: "assertive"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeCustomizer);

/***/ }),

/***/ "./src/react/Components/unit-picker/index.js":
/*!***************************************************!*\
  !*** ./src/react/Components/unit-picker/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button-group/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/tooltip/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["default"], {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: Unit type (px, em, %) */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s Units', 'highlight-and-share'), unitName),
      key: unit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: unit,
      className: 'components-has-control-button__units--' + unit,
      isSmall: true,
      isPrimary: value === unit,
      "aria-pressed": value === unit,
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s Units', 'highlight-and-share'), unitName),
      onClick: function onClick() {
        return _onClick(unit);
      }
    }, unit));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UnitChooser);

/***/ })

}]);
//# sourceMappingURL=ThemeCustomizer.0.0.4.js.map