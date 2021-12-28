exports.ids = [2,5];
exports.modules = {

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "capitalize", function() { return /* reexport */ utils_capitalize; });
__webpack_require__.d(__webpack_exports__, "defer", function() { return /* reexport */ defer["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "isDomElement", function() { return /* reexport */ utils_isDomElement; });
__webpack_require__.d(__webpack_exports__, "getContainerNode", function() { return /* reexport */ utils_getContainerNode; });
__webpack_require__.d(__webpack_exports__, "isSpecialClick", function() { return /* reexport */ utils_isSpecialClick; });
__webpack_require__.d(__webpack_exports__, "prepareTemplateProps", function() { return /* reexport */ utils_prepareTemplateProps; });
__webpack_require__.d(__webpack_exports__, "renderTemplate", function() { return /* reexport */ utils_renderTemplate; });
__webpack_require__.d(__webpack_exports__, "getRefinements", function() { return /* reexport */ getRefinements["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "clearRefinements", function() { return /* reexport */ clearRefinements["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "escapeRefinement", function() { return /* reexport */ escapeRefinement["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "unescapeRefinement", function() { return /* reexport */ unescapeRefinement["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "checkRendering", function() { return /* reexport */ checkRendering["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "checkIndexUiState", function() { return /* reexport */ checkIndexUiState; });
__webpack_require__.d(__webpack_exports__, "getPropertyByPath", function() { return /* reexport */ getPropertyByPath["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "getObjectType", function() { return /* reexport */ getObjectType["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "noop", function() { return /* reexport */ noop["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "isFiniteNumber", function() { return /* reexport */ isFiniteNumber["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return /* reexport */ isPlainObject["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "uniq", function() { return /* reexport */ uniq["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "range", function() { return /* reexport */ range["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "isEqual", function() { return /* reexport */ isEqual["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "escape", function() { return /* reexport */ utils_escape["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "unescape", function() { return /* reexport */ utils_unescape["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "concatHighlightedParts", function() { return /* reexport */ concatHighlightedParts["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "getHighlightedParts", function() { return /* reexport */ getHighlightedParts["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "getHighlightFromSiblings", function() { return /* reexport */ getHighlightFromSiblings["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "reverseHighlightedParts", function() { return /* reexport */ reverseHighlightedParts["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "find", function() { return /* reexport */ find["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "findIndex", function() { return /* reexport */ findIndex["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "mergeSearchParameters", function() { return /* reexport */ mergeSearchParameters["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "resolveSearchParameters", function() { return /* reexport */ resolveSearchParameters["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "toArray", function() { return /* reexport */ toArray["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "warning", function() { return /* reexport */ logger["b" /* warning */]; });
__webpack_require__.d(__webpack_exports__, "deprecate", function() { return /* reexport */ logger["a" /* deprecate */]; });
__webpack_require__.d(__webpack_exports__, "escapeHits", function() { return /* reexport */ escape_highlight["d" /* escapeHits */]; });
__webpack_require__.d(__webpack_exports__, "TAG_PLACEHOLDER", function() { return /* reexport */ escape_highlight["a" /* TAG_PLACEHOLDER */]; });
__webpack_require__.d(__webpack_exports__, "TAG_REPLACEMENT", function() { return /* reexport */ escape_highlight["b" /* TAG_REPLACEMENT */]; });
__webpack_require__.d(__webpack_exports__, "escapeFacets", function() { return /* reexport */ escape_highlight["c" /* escapeFacets */]; });
__webpack_require__.d(__webpack_exports__, "createDocumentationLink", function() { return /* reexport */ documentation["a" /* createDocumentationLink */]; });
__webpack_require__.d(__webpack_exports__, "createDocumentationMessageGenerator", function() { return /* reexport */ documentation["b" /* createDocumentationMessageGenerator */]; });
__webpack_require__.d(__webpack_exports__, "aroundLatLngToPosition", function() { return /* reexport */ geo_search["a" /* aroundLatLngToPosition */]; });
__webpack_require__.d(__webpack_exports__, "insideBoundingBoxToBoundingBox", function() { return /* reexport */ geo_search["b" /* insideBoundingBoxToBoundingBox */]; });
__webpack_require__.d(__webpack_exports__, "addAbsolutePosition", function() { return /* reexport */ hits_absolute_position["a" /* addAbsolutePosition */]; });
__webpack_require__.d(__webpack_exports__, "addQueryID", function() { return /* reexport */ hits_query_id["a" /* addQueryID */]; });
__webpack_require__.d(__webpack_exports__, "isFacetRefined", function() { return /* reexport */ isFacetRefined["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "createSendEventForFacet", function() { return /* reexport */ createSendEventForFacet["a" /* createSendEventForFacet */]; });
__webpack_require__.d(__webpack_exports__, "createSendEventForHits", function() { return /* reexport */ createSendEventForHits["b" /* createSendEventForHits */]; });
__webpack_require__.d(__webpack_exports__, "createBindEventForHits", function() { return /* reexport */ createSendEventForHits["a" /* createBindEventForHits */]; });
__webpack_require__.d(__webpack_exports__, "getAppIdAndApiKey", function() { return /* reexport */ getAppIdAndApiKey; });
__webpack_require__.d(__webpack_exports__, "convertNumericRefinementsToFilters", function() { return /* reexport */ convertNumericRefinementsToFilters["a" /* convertNumericRefinementsToFilters */]; });
__webpack_require__.d(__webpack_exports__, "createConcurrentSafePromise", function() { return /* reexport */ createConcurrentSafePromise["a" /* createConcurrentSafePromise */]; });
__webpack_require__.d(__webpack_exports__, "debounce", function() { return /* reexport */ debounce["a" /* debounce */]; });
__webpack_require__.d(__webpack_exports__, "serializePayload", function() { return /* reexport */ serializer["b" /* serializePayload */]; });
__webpack_require__.d(__webpack_exports__, "deserializePayload", function() { return /* reexport */ serializer["a" /* deserializePayload */]; });
__webpack_require__.d(__webpack_exports__, "getWidgetAttribute", function() { return /* reexport */ getWidgetAttribute["a" /* getWidgetAttribute */]; });
__webpack_require__.d(__webpack_exports__, "safelyRunOnBrowser", function() { return /* reexport */ safelyRunOnBrowser["a" /* safelyRunOnBrowser */]; });

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/capitalize.js
function capitalize(text) {
  return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
}

/* harmony default export */ var utils_capitalize = (capitalize);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/defer.js
var defer = __webpack_require__(307);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/isDomElement.js
function isDomElement(object) {
  return object instanceof HTMLElement || Boolean(object) && object.nodeType > 0;
}

/* harmony default export */ var utils_isDomElement = (isDomElement);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/getContainerNode.js

/**
 * Return the container. If it's a string, it is considered a
 * css selector and retrieves the first matching element. Otherwise
 * test if it validates that it's a correct DOMElement.
 *
 * @param {string|HTMLElement} selectorOrHTMLElement CSS Selector or container node.
 * @return {HTMLElement} Container node
 * @throws Error when the type is not correct
 */

function getContainerNode(selectorOrHTMLElement) {
  var isSelectorString = typeof selectorOrHTMLElement === 'string';
  var domElement = isSelectorString ? document.querySelector(selectorOrHTMLElement) : selectorOrHTMLElement;

  if (!utils_isDomElement(domElement)) {
    var errorMessage = 'Container must be `string` or `HTMLElement`.';

    if (isSelectorString) {
      errorMessage += " Unable to find ".concat(selectorOrHTMLElement);
    }

    throw new Error(errorMessage);
  }

  return domElement;
}

/* harmony default export */ var utils_getContainerNode = (getContainerNode);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/isSpecialClick.js
function isSpecialClick(event) {
  var isMiddleClick = event.button === 1;
  return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
}

/* harmony default export */ var utils_isSpecialClick = (isSpecialClick);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/uniq.js
var uniq = __webpack_require__(252);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/prepareTemplateProps.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}



function prepareTemplates( // can not use = {} here, since the template could have different constraints
defaultTemplates) {
  var templates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var allKeys = Object(uniq["a" /* default */])([].concat(_toConsumableArray(Object.keys(defaultTemplates || {})), _toConsumableArray(Object.keys(templates))));
  return allKeys.reduce(function (config, key) {
    var defaultTemplate = defaultTemplates ? defaultTemplates[key] : undefined;
    var customTemplate = templates[key];
    var isCustomTemplate = customTemplate !== undefined && customTemplate !== defaultTemplate;
    config.templates[key] = isCustomTemplate ? customTemplate // typescript doesn't recognize that this condition asserts customTemplate is defined
    : defaultTemplate;
    config.useCustomCompileOptions[key] = isCustomTemplate;
    return config;
  }, {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    templates: {},
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    useCustomCompileOptions: {}
  });
}
/**
 * Prepares an object to be passed to the Template widget
 */


function prepareTemplateProps(_ref) {
  var defaultTemplates = _ref.defaultTemplates,
      templates = _ref.templates,
      templatesConfig = _ref.templatesConfig;
  var preparedTemplates = prepareTemplates(defaultTemplates, templates);
  return _objectSpread({
    templatesConfig: templatesConfig
  }, preparedTemplates);
}

/* harmony default export */ var utils_prepareTemplateProps = (prepareTemplateProps);
// EXTERNAL MODULE: external "hogan.js"
var external_hogan_js_ = __webpack_require__(229);
var external_hogan_js_default = /*#__PURE__*/__webpack_require__.n(external_hogan_js_);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/renderTemplate.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function renderTemplate_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function renderTemplate_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      renderTemplate_ownKeys(Object(source), true).forEach(function (key) {
        renderTemplate_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      renderTemplate_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function renderTemplate_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

 // We add all our template helper methods to the template as lambdas. Note
// that lambdas in Mustache are supposed to accept a second argument of
// `render` to get the rendered value, not the literal `{{value}}`. But
// this is currently broken (see https://github.com/twitter/hogan.js/issues/222).

function transformHelpersToHogan() {
  var helpers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var compileOptions = arguments.length > 1 ? arguments[1] : undefined;
  var data = arguments.length > 2 ? arguments[2] : undefined;
  return Object.keys(helpers).reduce(function (acc, helperKey) {
    return renderTemplate_objectSpread(renderTemplate_objectSpread({}, acc), {}, renderTemplate_defineProperty({}, helperKey, function () {
      var _this = this;

      return function (text) {
        var render = function render(value) {
          return external_hogan_js_default.a.compile(value, compileOptions).render(_this);
        };

        return helpers[helperKey].call(data, text, render);
      };
    }));
  }, {});
}

function renderTemplate(_ref) {
  var templates = _ref.templates,
      templateKey = _ref.templateKey,
      compileOptions = _ref.compileOptions,
      helpers = _ref.helpers,
      data = _ref.data,
      bindEvent = _ref.bindEvent;
  var template = templates[templateKey];

  if (typeof template !== 'string' && typeof template !== 'function') {
    throw new Error("Template must be 'string' or 'function', was '".concat(_typeof(template), "' (key: ").concat(templateKey, ")"));
  }

  if (typeof template === 'function') {
    return template(data, bindEvent);
  }

  var transformedHelpers = transformHelpersToHogan(helpers, compileOptions, data);
  return external_hogan_js_default.a.compile(template, compileOptions).render(renderTemplate_objectSpread(renderTemplate_objectSpread({}, data), {}, {
    helpers: transformedHelpers
  })).replace(/[ \n\r\t\f\xA0]+/g, function (spaces) {
    return spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ');
  }).trim();
}

/* harmony default export */ var utils_renderTemplate = (renderTemplate);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getRefinements.js
var getRefinements = __webpack_require__(291);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/clearRefinements.js
var clearRefinements = __webpack_require__(289);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/escapeRefinement.js
var escapeRefinement = __webpack_require__(301);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/unescapeRefinement.js
var unescapeRefinement = __webpack_require__(269);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/checkRendering.js
var checkRendering = __webpack_require__(288);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/typedObject.js
/**
 * A typed version of Object.keys, to use when looping over a static object
 * inspired from https://stackoverflow.com/a/65117465/3185307
 */
var keys = Object.keys;
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/checkIndexUiState.js
function checkIndexUiState_toConsumableArray(arr) {
  return checkIndexUiState_arrayWithoutHoles(arr) || checkIndexUiState_iterableToArray(arr) || checkIndexUiState_unsupportedIterableToArray(arr) || checkIndexUiState_nonIterableSpread();
}

function checkIndexUiState_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function checkIndexUiState_iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function checkIndexUiState_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return checkIndexUiState_arrayLikeToArray(arr);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || checkIndexUiState_unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function checkIndexUiState_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return checkIndexUiState_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return checkIndexUiState_arrayLikeToArray(o, minLen);
}

function checkIndexUiState_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}



 // Some connectors are responsible for multiple widgets so we need
// to map them.

function getWidgetNames(connectorName) {
  switch (connectorName) {
    case 'range':
      return [];

    case 'menu':
      return ['menu', 'menuSelect'];

    default:
      return [connectorName];
  }
}

var stateToWidgetsMap = {
  query: {
    connectors: ['connectSearchBox'],
    widgets: ['ais.searchBox', 'ais.autocomplete', 'ais.voiceSearch']
  },
  refinementList: {
    connectors: ['connectRefinementList'],
    widgets: ['ais.refinementList']
  },
  menu: {
    connectors: ['connectMenu'],
    widgets: ['ais.menu']
  },
  hierarchicalMenu: {
    connectors: ['connectHierarchicalMenu'],
    widgets: ['ais.hierarchicalMenu']
  },
  numericMenu: {
    connectors: ['connectNumericMenu'],
    widgets: ['ais.numericMenu']
  },
  ratingMenu: {
    connectors: ['connectRatingMenu'],
    widgets: ['ais.ratingMenu']
  },
  range: {
    connectors: ['connectRange'],
    widgets: ['ais.rangeInput', 'ais.rangeSlider', 'ais.range']
  },
  toggle: {
    connectors: ['connectToggleRefinement'],
    widgets: ['ais.toggleRefinement']
  },
  geoSearch: {
    connectors: ['connectGeoSearch'],
    widgets: ['ais.geoSearch']
  },
  sortBy: {
    connectors: ['connectSortBy'],
    widgets: ['ais.sortBy']
  },
  page: {
    connectors: ['connectPagination'],
    widgets: ['ais.pagination', 'ais.infiniteHits']
  },
  hitsPerPage: {
    connectors: ['connectHitsPerPage'],
    widgets: ['ais.hitsPerPage']
  },
  configure: {
    connectors: ['connectConfigure'],
    widgets: ['ais.configure']
  },
  places: {
    connectors: [],
    widgets: ['ais.places']
  }
};
function checkIndexUiState(_ref) {
  var index = _ref.index,
      indexUiState = _ref.indexUiState;
  var mountedWidgets = index.getWidgets().map(function (widget) {
    return widget.$$type;
  }).filter(Boolean);
  var missingWidgets = keys(indexUiState).reduce(function (acc, parameter) {
    var widgetUiState = stateToWidgetsMap[parameter];

    if (!widgetUiState) {
      return acc;
    }

    var requiredWidgets = widgetUiState.widgets;

    if (requiredWidgets && !requiredWidgets.some(function (requiredWidget) {
      return mountedWidgets.includes(requiredWidget);
    })) {
      acc.push([parameter, {
        connectors: widgetUiState.connectors,
        widgets: widgetUiState.widgets.map(function (widgetIdentifier) {
          return widgetIdentifier.split('ais.')[1];
        })
      }]);
    }

    return acc;
  }, []);
   false ? undefined : void 0;
}
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js
var getPropertyByPath = __webpack_require__(303);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getObjectType.js
var getObjectType = __webpack_require__(266);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/noop.js
var noop = __webpack_require__(265);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/isFiniteNumber.js
var isFiniteNumber = __webpack_require__(298);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/isPlainObject.js
var isPlainObject = __webpack_require__(272);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/range.js
var range = __webpack_require__(299);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/isEqual.js
var isEqual = __webpack_require__(296);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/escape.js
var utils_escape = __webpack_require__(271);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/unescape.js
var utils_unescape = __webpack_require__(275);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/concatHighlightedParts.js
var concatHighlightedParts = __webpack_require__(308);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getHighlightedParts.js
var getHighlightedParts = __webpack_require__(309);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getHighlightFromSiblings.js
var getHighlightFromSiblings = __webpack_require__(276);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/reverseHighlightedParts.js
var reverseHighlightedParts = __webpack_require__(310);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/find.js
var find = __webpack_require__(268);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/findIndex.js
var findIndex = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js
var mergeSearchParameters = __webpack_require__(290);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/resolveSearchParameters.js
var resolveSearchParameters = __webpack_require__(311);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/toArray.js
var toArray = __webpack_require__(300);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/logger.js
var logger = __webpack_require__(254);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js
var escape_highlight = __webpack_require__(249);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/documentation.js
var documentation = __webpack_require__(264);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/geo-search.js
var geo_search = __webpack_require__(274);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/hits-absolute-position.js
var hits_absolute_position = __webpack_require__(294);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/hits-query-id.js
var hits_query_id = __webpack_require__(295);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/isFacetRefined.js
var isFacetRefined = __webpack_require__(270);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/createSendEventForFacet.js
var createSendEventForFacet = __webpack_require__(292);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/createSendEventForHits.js
var createSendEventForHits = __webpack_require__(293);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/getAppIdAndApiKey.js
// typed as any, since it accepts the _real_ js clients, not the interface we otherwise expect
function getAppIdAndApiKey(searchClient) {
  if (searchClient.transporter) {
    // searchClient v4
    var _searchClient$transpo = searchClient.transporter,
        headers = _searchClient$transpo.headers,
        queryParameters = _searchClient$transpo.queryParameters;
    var APP_ID = 'x-algolia-application-id';
    var API_KEY = 'x-algolia-api-key';
    var appId = headers[APP_ID] || queryParameters[APP_ID];
    var apiKey = headers[API_KEY] || queryParameters[API_KEY];
    return [appId, apiKey];
  } else {
    // searchClient v3
    return [searchClient.applicationID, searchClient.apiKey];
  }
}
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/convertNumericRefinementsToFilters.js
var convertNumericRefinementsToFilters = __webpack_require__(297);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/createConcurrentSafePromise.js
var createConcurrentSafePromise = __webpack_require__(304);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/debounce.js
var debounce = __webpack_require__(305);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/serializer.js
var serializer = __webpack_require__(253);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getWidgetAttribute.js
var getWidgetAttribute = __webpack_require__(306);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js
var safelyRunOnBrowser = __webpack_require__(302);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/utils/index.js

















































/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TAG_PLACEHOLDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TAG_REPLACEMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return escapeHits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return escapeFacets; });
/* harmony import */ var _escape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(271);
/* harmony import */ var _isPlainObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(272);
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



var TAG_PLACEHOLDER = {
  highlightPreTag: '__ais-highlight__',
  highlightPostTag: '__/ais-highlight__'
};
var TAG_REPLACEMENT = {
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>'
};

function replaceTagsAndEscape(value) {
  return Object(_escape__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, 'g'), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, 'g'), TAG_REPLACEMENT.highlightPostTag);
}

function recursiveEscape(input) {
  if (Object(_isPlainObject__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(input) && typeof input.value !== 'string') {
    return Object.keys(input).reduce(function (acc, key) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, recursiveEscape(input[key])));
    }, {});
  }

  if (Array.isArray(input)) {
    return input.map(recursiveEscape);
  }

  return _objectSpread(_objectSpread({}, input), {}, {
    value: replaceTagsAndEscape(input.value)
  });
}

function escapeHits(hits) {
  if (hits.__escaped === undefined) {
    // We don't override the value on hit because it will mutate the raw results
    // instead we make a shallow copy and we assign the escaped values on it.
    hits = hits.map(function (_ref) {
      var hit = _extends({}, _ref);

      if (hit._highlightResult) {
        hit._highlightResult = recursiveEscape(hit._highlightResult);
      }

      if (hit._snippetResult) {
        hit._snippetResult = recursiveEscape(hit._snippetResult);
      }

      return hit;
    });
    hits.__escaped = true;
  }

  return hits;
}
function escapeFacets(facetHits) {
  return facetHits.map(function (h) {
    return _objectSpread(_objectSpread({}, h), {}, {
      highlighted: replaceTagsAndEscape(h.highlighted)
    });
  });
}

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let secciones = {}; // Secciones

agregarSecciones([{
  uid: 'informatica',
  nombre: 'Informática'
}, {
  uid: 'matematica',
  nombre: 'Matemática'
}]); // Categorias

agregarCategorias([{
  uid: 'algoritmos',
  nombre: 'Algoritmos'
}, {
  uid: 'desarrollo-web',
  nombre: 'Desarrollo Web'
}, {
  uid: 'redes',
  nombre: 'Redes'
}], 'informatica');
agregarCategorias([{
  uid: 'calculo',
  nombre: 'Cálculo'
}], 'matematica'); // Subcategorias

agregarSubCategorias([{
  uid: 'busqueda',
  nombre: 'Busqueda'
}, {
  uid: 'eficiencia',
  nombre: 'Eficiencia'
}, {
  uid: 'ordenacion',
  nombre: 'Ordenación'
}], 'informatica', 'algoritmos');
agregarSubCategorias([{
  uid: 'disenho-web',
  nombre: 'Diseño web'
}, {
  uid: 'vuejs',
  nombre: 'Vue.js'
}], 'informatica', 'desarrollo-web');
agregarSubCategorias([{
  uid: 'tcp',
  nombre: 'TCP'
}], 'informatica', 'redes');
agregarSubCategorias([{
  uid: 'derivada',
  nombre: 'Derivada'
}], 'matematica', 'calculo');
/* harmony default export */ __webpack_exports__["a"] = (secciones); // Funciones para agregar varios elementos

function agregarSecciones(secciones) {
  for (let i = 0; i < secciones.length; i++) {
    const seccion = secciones[i];
    agregarSeccion(seccion);
  }
}

function agregarCategorias(categorias, idSeccion) {
  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i];
    agregarCategoria(categoria, idSeccion);
  }
}

function agregarSubCategorias(subCategorias, idSeccion, idCategoria) {
  for (let i = 0; i < subCategorias.length; i++) {
    const subCategoria = subCategorias[i];
    agregarSubCategoria(subCategoria, idSeccion, idCategoria);
  }
} // Funciones para agregar un elemento


function agregarSeccion(seccion) {
  secciones[seccion.uid] = { ...seccion,
    categorias: {}
  };
}

function agregarCategoria(categoria, idSeccion) {
  secciones[idSeccion].categorias[categoria.uid] = { ...categoria,
    subCategorias: {}
  };
}

function agregarSubCategoria(subCategoria, idSeccion, idCategoria) {
  secciones[idSeccion].categorias[idCategoria].subCategorias[subCategoria.uid] = subCategoria;
}

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function uniq(array) {
  return array.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

/* harmony default export */ __webpack_exports__["a"] = (uniq);

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return serializePayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deserializePayload; });
function serializePayload(payload) {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}
function deserializePayload(serialized) {
  return JSON.parse(decodeURIComponent(atob(serialized)));
}

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export warn */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deprecate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _warning; });
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(265);

/**
 * Logs a warning when this function is called, in development environment only.
 */

var deprecate = function deprecate(fn, message) {
  return fn;
};
/**
 * Logs a warning
 * This is used to log issues in development environment only.
 */


var warn = _noop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];
/**
 * Logs a warning if the condition is not met.
 * This is used to log issues in development environment only.
 */

var _warning = _noop__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];

if (false) {}



/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return component; });
var NAMESPACE = 'ais';
var component = function component(componentName) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        descendantName = _ref.descendantName,
        modifierName = _ref.modifierName;

    var descendent = descendantName ? "-".concat(descendantName) : '';
    var modifier = modifierName ? "--".concat(modifierName) : '';
    return "".concat(NAMESPACE, "-").concat(componentName).concat(descendent).concat(modifier);
  };
};

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VChip_VChip_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(260);
/* harmony import */ var _src_components_VChip_VChip_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VChip_VChip_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _mixins_groupable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var _mixins_sizeable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(57);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3);
// Styles

 // Components


 // Mixins






 // Utilities


/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_sizeable__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], _mixins_routable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], Object(_mixins_groupable__WEBPACK_IMPORTED_MODULE_5__[/* factory */ "a"])('chipGroup'), Object(_mixins_toggleable__WEBPACK_IMPORTED_MODULE_7__[/* factory */ "b"])('inputValue')).extend({
  name: 'v-chip',
  props: {
    active: {
      type: Boolean,
      default: true
    },
    activeClass: {
      type: String,

      default() {
        if (!this.chipGroup) return '';
        return this.chipGroup.activeClass;
      }

    },
    close: Boolean,
    closeIcon: {
      type: String,
      default: '$delete'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    disabled: Boolean,
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: '$complete'
    },
    label: Boolean,
    link: Boolean,
    outlined: Boolean,
    pill: Boolean,
    tag: {
      type: String,
      default: 'span'
    },
    textColor: String,
    value: null
  },
  data: () => ({
    proxyClass: 'v-chip--active'
  }),
  computed: {
    classes() {
      return {
        'v-chip': true,
        ..._mixins_routable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].options.computed.classes.call(this),
        'v-chip--clickable': this.isClickable,
        'v-chip--disabled': this.disabled,
        'v-chip--draggable': this.draggable,
        'v-chip--label': this.label,
        'v-chip--link': this.isLink,
        'v-chip--no-color': !this.color,
        'v-chip--outlined': this.outlined,
        'v-chip--pill': this.pill,
        'v-chip--removable': this.hasClose,
        ...this.themeClasses,
        ...this.sizeableClasses,
        ...this.groupClasses
      };
    },

    hasClose() {
      return Boolean(this.close);
    },

    isClickable() {
      return Boolean(_mixins_routable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].options.computed.isClickable.call(this) || this.chipGroup);
    }

  },

  created() {
    const breakingProps = [['outline', 'outlined'], ['selected', 'input-value'], ['value', 'active'], ['@input', '@active.sync']];
    /* istanbul ignore next */

    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) Object(_util_console__WEBPACK_IMPORTED_MODULE_10__[/* breaking */ "a"])(original, replacement, this);
    });
  },

  methods: {
    click(e) {
      this.$emit('click', e);
      this.chipGroup && this.toggle();
    },

    genFilter() {
      const children = [];

      if (this.isActive) {
        children.push(this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
          staticClass: 'v-chip__filter',
          props: {
            left: true
          }
        }, this.filterIcon));
      }

      return this.$createElement(_transitions__WEBPACK_IMPORTED_MODULE_2__[/* VExpandXTransition */ "b"], children);
    },

    genClose() {
      return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
        staticClass: 'v-chip__close',
        props: {
          right: true,
          size: 18
        },
        attrs: {
          'aria-label': this.$vuetify.lang.t(this.closeLabel)
        },
        on: {
          click: e => {
            e.stopPropagation();
            e.preventDefault();
            this.$emit('click:close');
            this.$emit('update:active', false);
          }
        }
      }, this.closeIcon);
    },

    genContent() {
      return this.$createElement('span', {
        staticClass: 'v-chip__content'
      }, [this.filter && this.genFilter(), this.$slots.default, this.hasClose && this.genClose()]);
    }

  },

  render(h) {
    const children = [this.genContent()];
    let {
      tag,
      data
    } = this.generateRouteLink();
    data.attrs = { ...data.attrs,
      draggable: this.draggable ? 'true' : undefined,
      tabindex: this.chipGroup && !this.disabled ? 0 : data.attrs.tabindex
    };
    data.directives.push({
      name: 'show',
      value: this.active
    });
    data = this.setBackgroundColor(this.color, data);
    const color = this.textColor || this.outlined && this.color;
    return h(tag, this.setTextColor(color, data), children);
  }

}));

/***/ }),

/***/ 260:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createDocumentationLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createDocumentationMessageGenerator; });
var createDocumentationLink = function createDocumentationLink(_ref) {
  var name = _ref.name,
      _ref$connector = _ref.connector,
      connector = _ref$connector === void 0 ? false : _ref$connector;
  return ['https://www.algolia.com/doc/api-reference/widgets/', name, '/js/', connector ? '#connector' : ''].join('');
};
var createDocumentationMessageGenerator = function createDocumentationMessageGenerator() {
  for (var _len = arguments.length, widgets = new Array(_len), _key = 0; _key < _len; _key++) {
    widgets[_key] = arguments[_key];
  }

  var links = widgets.map(function (widget) {
    return createDocumentationLink(widget);
  }).join(', ');
  return function (message) {
    return [message, "See documentation: ".concat(links)].filter(Boolean).join('\n\n');
  };
};

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function noop() {}

/* harmony default export */ __webpack_exports__["a"] = (noop);

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getObjectType(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}

/* harmony default export */ __webpack_exports__["a"] = (getObjectType);

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// We aren't using the native `Array.prototype.findIndex` because the refactor away from Lodash is not
// published as a major version.
// Relying on the `findIndex` polyfill on user-land, which before was only required for niche use-cases,
// was decided as too risky.
// @MAJOR Replace with the native `Array.prototype.findIndex` method
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
function findIndex(array, comparator) {
  if (!Array.isArray(array)) {
    return -1;
  }

  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return i;
    }
  }

  return -1;
}

/* harmony default export */ __webpack_exports__["a"] = (findIndex);

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// We aren't using the native `Array.prototype.find` because the refactor away from Lodash is not
// published as a major version.
// Relying on the `find` polyfill on user-land, which before was only required for niche use-cases,
// was decided as too risky.
// @MAJOR Replace with the native `Array.prototype.find` method
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
function find(items, predicate) {
  var value;

  for (var i = 0; i < items.length; i++) {
    value = items[i]; // inlined for performance: if (Call(predicate, thisArg, [value, i, list])) {

    if (predicate(value, i, items)) {
      return value;
    }
  }

  return undefined;
}

/* harmony default export */ __webpack_exports__["a"] = (find);

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function unescapeRefinement(value) {
  return String(value).replace(/^\\-/, '-');
}

/* harmony default export */ __webpack_exports__["a"] = (unescapeRefinement);

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isFacetRefined; });
function isFacetRefined(helper, facet, value) {
  if (helper.state.isHierarchicalFacet(facet)) {
    return helper.state.isHierarchicalFacetRefined(facet, value);
  } else if (helper.state.isConjunctiveFacet(facet)) {
    return helper.state.isFacetRefined(facet, value);
  } else {
    return helper.state.isDisjunctiveFacetRefined(facet, value);
  }
}

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * This implementation is taken from Lodash implementation.
 * See: https://github.com/lodash/lodash/blob/4.17.11-npm/escape.js
 */
// Used to map characters to HTML entities.
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}; // Used to match HTML entities and HTML characters.

var regexUnescapedHtml = /[&<>"']/g;
var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);
/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 */

function escape(value) {
  return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function (character) {
    return htmlEscapes[character];
  }) : value;
}

/* harmony default export */ __webpack_exports__["a"] = (escape);

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
/**
 * This implementation is taken from Lodash implementation.
 * See: https://github.com/lodash/lodash/blob/master/isPlainObject.js
 */


function getTag(value) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }

  return Object.prototype.toString.call(value);
}

function isObjectLike(value) {
  return _typeof(value) === 'object' && value !== null;
}
/**
 * Checks if `value` is a plain object.
 *
 * A plain object is an object created by the `Object`
 * constructor or with a `[[Prototype]]` of `null`.
 */


function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false;
  }

  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  var proto = value;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(264);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(296);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(265);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(288);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(293);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(249);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(294);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(295);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}


var withUsage = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__[/* createDocumentationMessageGenerator */ "b"])({
  name: 'infinite-hits',
  connector: true
});

function getStateWithoutPage(state) {
  var _ref = state || {},
      page = _ref.page,
      rest = _objectWithoutProperties(_ref, ["page"]);

  return rest;
}

function getInMemoryCache() {
  var cachedHits = null;
  var cachedState = null;
  return {
    read: function read(_ref2) {
      var state = _ref2.state;
      return Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(cachedState, getStateWithoutPage(state)) ? cachedHits : null;
    },
    write: function write(_ref3) {
      var state = _ref3.state,
          hits = _ref3.hits;
      cachedState = getStateWithoutPage(state);
      cachedHits = hits;
    }
  };
}

function extractHitsFromCachedHits(cachedHits) {
  return Object.keys(cachedHits).map(Number).sort(function (a, b) {
    return a - b;
  }).reduce(function (acc, page) {
    return acc.concat(cachedHits[page]);
  }, []);
}

var connectInfiniteHits = function connectInfiniteHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _lib_utils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"];
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(renderFn, withUsage());
  return function (widgetParams) {
    var _ref4 = widgetParams || {},
        _ref4$escapeHTML = _ref4.escapeHTML,
        escapeHTML = _ref4$escapeHTML === void 0 ? true : _ref4$escapeHTML,
        _ref4$transformItems = _ref4.transformItems,
        transformItems = _ref4$transformItems === void 0 ? function (items) {
      return items;
    } : _ref4$transformItems,
        _ref4$cache = _ref4.cache,
        cache = _ref4$cache === void 0 ? getInMemoryCache() : _ref4$cache;

    var showPrevious;
    var showMore;
    var sendEvent;
    var bindEvent;

    var getFirstReceivedPage = function getFirstReceivedPage(state, cachedHits) {
      var _state$page = state.page,
          page = _state$page === void 0 ? 0 : _state$page;
      var pages = Object.keys(cachedHits).map(Number);

      if (pages.length === 0) {
        return page;
      } else {
        return Math.min.apply(Math, [page].concat(_toConsumableArray(pages)));
      }
    };

    var getLastReceivedPage = function getLastReceivedPage(state, cachedHits) {
      var _state$page2 = state.page,
          page = _state$page2 === void 0 ? 0 : _state$page2;
      var pages = Object.keys(cachedHits).map(Number);

      if (pages.length === 0) {
        return page;
      } else {
        return Math.max.apply(Math, [page].concat(_toConsumableArray(pages)));
      }
    };

    var getShowPrevious = function getShowPrevious(helper) {
      return function () {
        // Using the helper's `overrideStateWithoutTriggeringChangeEvent` method
        // avoid updating the browser URL when the user displays the previous page.
        helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread(_objectSpread({}, helper.state), {}, {
          page: getFirstReceivedPage(helper.state, cache.read({
            state: helper.state
          }) || {}) - 1
        })).searchWithoutTriggeringOnStateChange();
      };
    };

    var getShowMore = function getShowMore(helper) {
      return function () {
        helper.setPage(getLastReceivedPage(helper.state, cache.read({
          state: helper.state
        }) || {}) + 1).search();
      };
    };

    return {
      $$type: 'ais.infiniteHits',
      init: function init(initOptions) {
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        sendEvent('view', widgetRenderState.currentPageHits);
        renderFn(_objectSpread(_objectSpread({}, widgetRenderState), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          infiniteHits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref5) {
        var results = _ref5.results,
            helper = _ref5.helper,
            state = _ref5.state,
            instantSearchInstance = _ref5.instantSearchInstance;
        var isFirstPage;
        var currentPageHits = [];
        var cachedHits = cache.read({
          state: state
        }) || {};

        if (!results) {
          showPrevious = getShowPrevious(helper);
          showMore = getShowMore(helper);
          sendEvent = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[/* createSendEventForHits */ "b"])({
            instantSearchInstance: instantSearchInstance,
            index: helper.getIndex(),
            widgetType: this.$$type
          });
          bindEvent = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[/* createBindEventForHits */ "a"])({
            index: helper.getIndex(),
            widgetType: this.$$type
          });
          isFirstPage = helper.state.page === undefined || getFirstReceivedPage(helper.state, cachedHits) === 0;
        } else {
          var _state$page3 = state.page,
              _page = _state$page3 === void 0 ? 0 : _state$page3;

          if (escapeHTML && results.hits.length > 0) {
            results.hits = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__[/* escapeHits */ "d"])(results.hits);
          }

          var hitsWithAbsolutePosition = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_6__[/* addAbsolutePosition */ "a"])(results.hits, results.page, results.hitsPerPage);
          var hitsWithAbsolutePositionAndQueryID = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_7__[/* addQueryID */ "a"])(hitsWithAbsolutePosition, results.queryID);
          var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID);

          if (cachedHits[_page] === undefined) {
            cachedHits[_page] = transformedHits;
            cache.write({
              state: state,
              hits: cachedHits
            });
          }

          currentPageHits = transformedHits;
          isFirstPage = getFirstReceivedPage(state, cachedHits) === 0;
        }

        var hits = extractHitsFromCachedHits(cachedHits);
        var isLastPage = results ? results.nbPages <= getLastReceivedPage(state, cachedHits) + 1 : true;
        return {
          hits: hits,
          currentPageHits: currentPageHits,
          sendEvent: sendEvent,
          bindEvent: bindEvent,
          results: results,
          showPrevious: showPrevious,
          showMore: showMore,
          isFirstPage: isFirstPage,
          isLastPage: isLastPage,
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref6) {
        var state = _ref6.state;
        unmountFn();
        var stateWithoutPage = state.setQueryParameter('page', undefined);

        if (!escapeHTML) {
          return stateWithoutPage;
        }

        return stateWithoutPage.setQueryParameters(Object.keys(_lib_utils__WEBPACK_IMPORTED_MODULE_5__[/* TAG_PLACEHOLDER */ "a"]).reduce(function (acc, key) {
          return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, undefined));
        }, {}));
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref7) {
        var searchParameters = _ref7.searchParameters;
        var page = searchParameters.page || 0;

        if (!page) {
          // return without adding `page` to uiState
          // because we don't want `page=1` in the URL
          return uiState;
        }

        return _objectSpread(_objectSpread({}, uiState), {}, {
          // The page in the UI state is incremented by one
          // to expose the user value (not `0`).
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref8) {
        var uiState = _ref8.uiState;
        var widgetSearchParameters = searchParameters;

        if (escapeHTML) {
          widgetSearchParameters = searchParameters.setQueryParameters(_lib_utils__WEBPACK_IMPORTED_MODULE_5__[/* TAG_PLACEHOLDER */ "a"]);
        } // The page in the search parameters is decremented by one
        // to get to the actual parameter value from the UI state.


        var page = uiState.page ? uiState.page - 1 : 0;
        return widgetSearchParameters.setQueryParameter('page', page);
      }
    };
  };
};

/* harmony default export */ __webpack_exports__["a"] = (connectInfiniteHits);

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return aroundLatLngToPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return insideBoundingBoxToBoundingBox; });
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var latLngRegExp = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/;
function aroundLatLngToPosition(value) {
  var pattern = value.match(latLngRegExp); // Since the value provided is the one send with the request, the API should
  // throw an error due to the wrong format. So throw an error should be safe.

  if (!pattern) {
    throw new Error("Invalid value for \"aroundLatLng\" parameter: \"".concat(value, "\""));
  }

  return {
    lat: parseFloat(pattern[1]),
    lng: parseFloat(pattern[2])
  };
}

function insideBoundingBoxArrayToBoundingBox(value) {
  var _value = _slicedToArray(value, 1),
      _value$ = _value[0];

  _value$ = _value$ === void 0 ? [undefined, undefined, undefined, undefined] : _value$;

  var _value$2 = _slicedToArray(_value$, 4),
      neLat = _value$2[0],
      neLng = _value$2[1],
      swLat = _value$2[2],
      swLng = _value$2[3]; // Since the value provided is the one send with the request, the API should
  // throw an error due to the wrong format. So throw an error should be safe.


  if (!neLat || !neLng || !swLat || !swLng) {
    throw new Error("Invalid value for \"insideBoundingBox\" parameter: [".concat(value, "]"));
  }

  return {
    northEast: {
      lat: neLat,
      lng: neLng
    },
    southWest: {
      lat: swLat,
      lng: swLng
    }
  };
}

function insideBoundingBoxStringToBoundingBox(value) {
  var _value$split$map = value.split(',').map(parseFloat),
      _value$split$map2 = _slicedToArray(_value$split$map, 4),
      neLat = _value$split$map2[0],
      neLng = _value$split$map2[1],
      swLat = _value$split$map2[2],
      swLng = _value$split$map2[3]; // Since the value provided is the one send with the request, the API should
  // throw an error due to the wrong format. So throw an error should be safe.


  if (!neLat || !neLng || !swLat || !swLng) {
    throw new Error("Invalid value for \"insideBoundingBox\" parameter: \"".concat(value, "\""));
  }

  return {
    northEast: {
      lat: neLat,
      lng: neLng
    },
    southWest: {
      lat: swLat,
      lng: swLng
    }
  };
}

function insideBoundingBoxToBoundingBox(value) {
  if (Array.isArray(value)) {
    return insideBoundingBoxArrayToBoundingBox(value);
  }

  return insideBoundingBoxStringToBoundingBox(value);
}

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return unescape; });
/**
 * This implementation is taken from Lodash implementation.
 * See: https://github.com/lodash/lodash/blob/4.17.11-npm/unescape.js
 */
// Used to map HTML entities to characters.
var htmlEscapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
}; // Used to match HTML entities and HTML characters.

var regexEscapedHtml = /&(amp|quot|lt|gt|#39);/g;
var regexHasEscapedHtml = RegExp(regexEscapedHtml.source);
/**
 * Converts the HTML entities "&", "<", ">", '"', and "'" in `string` to their
 * characters.
 */

function unescape(value) {
  return value && regexHasEscapedHtml.test(value) ? value.replace(regexEscapedHtml, function (character) {
    return htmlEscapes[character];
  }) : value;
}

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getHighlightFromSiblings; });
/* harmony import */ var _unescape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(275);

var hasAlphanumeric = new RegExp(/\w/i);
function getHighlightFromSiblings(parts, i) {
  var _parts, _parts2;

  var current = parts[i];
  var isNextHighlighted = ((_parts = parts[i + 1]) === null || _parts === void 0 ? void 0 : _parts.isHighlighted) || true;
  var isPreviousHighlighted = ((_parts2 = parts[i - 1]) === null || _parts2 === void 0 ? void 0 : _parts2.isHighlighted) || true;

  if (!hasAlphanumeric.test(Object(_unescape__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(current.value)) && isPreviousHighlighted === isNextHighlighted) {
    return isPreviousHighlighted;
  }

  return current.isHighlighted;
}

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _getObjectType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(266);


function checkRendering(rendering, usage) {
  if (rendering === undefined || typeof rendering !== 'function') {
    throw new Error("The render function is not valid (received type ".concat(Object(_getObjectType__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(rendering), ").\n\n").concat(usage));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (checkRendering);

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Clears the refinements of a SearchParameters object based on rules provided.
 * The included attributes list is applied before the excluded attributes list. If the list
 * is not provided, this list of all the currently refined attributes is used as included attributes.
 * @param {object} $0 parameters
 * @param {Helper} $0.helper instance of the Helper
 * @param {string[]} [$0.attributesToClear = []] list of parameters to clear
 * @returns {SearchParameters} search parameters with refinements cleared
 */
function clearRefinements(_ref) {
  var helper = _ref.helper,
      _ref$attributesToClea = _ref.attributesToClear,
      attributesToClear = _ref$attributesToClea === void 0 ? [] : _ref$attributesToClea;
  var finalState = helper.state.setPage(0);
  finalState = attributesToClear.reduce(function (state, attribute) {
    if (finalState.isNumericRefined(attribute)) {
      return state.removeNumericRefinement(attribute);
    }

    if (finalState.isHierarchicalFacet(attribute)) {
      return state.removeHierarchicalFacetRefinement(attribute);
    }

    if (finalState.isDisjunctiveFacet(attribute)) {
      return state.removeDisjunctiveFacetRefinement(attribute);
    }

    if (finalState.isConjunctiveFacet(attribute)) {
      return state.removeFacetRefinement(attribute);
    }

    return state;
  }, finalState);

  if (attributesToClear.indexOf('query') !== -1) {
    finalState = finalState.setQuery('');
  }

  return finalState;
}

/* harmony default export */ __webpack_exports__["a"] = (clearRefinements);

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _findIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(267);
/* harmony import */ var _uniq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(252);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}




var mergeWithRest = function mergeWithRest(left, right) {
  var facets = right.facets,
      disjunctiveFacets = right.disjunctiveFacets,
      facetsRefinements = right.facetsRefinements,
      facetsExcludes = right.facetsExcludes,
      disjunctiveFacetsRefinements = right.disjunctiveFacetsRefinements,
      numericRefinements = right.numericRefinements,
      tagRefinements = right.tagRefinements,
      hierarchicalFacets = right.hierarchicalFacets,
      hierarchicalFacetsRefinements = right.hierarchicalFacetsRefinements,
      ruleContexts = right.ruleContexts,
      rest = _objectWithoutProperties(right, ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"]);

  return left.setQueryParameters(rest);
}; // Merge facets


var mergeFacets = function mergeFacets(left, right) {
  return right.facets.reduce(function (_, name) {
    return _.addFacet(name);
  }, left);
};

var mergeDisjunctiveFacets = function mergeDisjunctiveFacets(left, right) {
  return right.disjunctiveFacets.reduce(function (_, name) {
    return _.addDisjunctiveFacet(name);
  }, left);
};

var mergeHierarchicalFacets = function mergeHierarchicalFacets(left, right) {
  return left.setQueryParameters({
    hierarchicalFacets: right.hierarchicalFacets.reduce(function (facets, facet) {
      var index = Object(_findIndex__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(facets, function (_) {
        return _.name === facet.name;
      });

      if (index === -1) {
        return facets.concat(facet);
      }

      var nextFacets = facets.slice();
      nextFacets.splice(index, 1, facet);
      return nextFacets;
    }, left.hierarchicalFacets)
  });
}; // Merge facet refinements


var mergeTagRefinements = function mergeTagRefinements(left, right) {
  return right.tagRefinements.reduce(function (_, value) {
    return _.addTagRefinement(value);
  }, left);
};

var mergeFacetRefinements = function mergeFacetRefinements(left, right) {
  return left.setQueryParameters({
    facetsRefinements: _objectSpread(_objectSpread({}, left.facetsRefinements), right.facetsRefinements)
  });
};

var mergeFacetsExcludes = function mergeFacetsExcludes(left, right) {
  return left.setQueryParameters({
    facetsExcludes: _objectSpread(_objectSpread({}, left.facetsExcludes), right.facetsExcludes)
  });
};

var mergeDisjunctiveFacetsRefinements = function mergeDisjunctiveFacetsRefinements(left, right) {
  return left.setQueryParameters({
    disjunctiveFacetsRefinements: _objectSpread(_objectSpread({}, left.disjunctiveFacetsRefinements), right.disjunctiveFacetsRefinements)
  });
};

var mergeNumericRefinements = function mergeNumericRefinements(left, right) {
  return left.setQueryParameters({
    numericRefinements: _objectSpread(_objectSpread({}, left.numericRefinements), right.numericRefinements)
  });
};

var mergeHierarchicalFacetsRefinements = function mergeHierarchicalFacetsRefinements(left, right) {
  return left.setQueryParameters({
    hierarchicalFacetsRefinements: _objectSpread(_objectSpread({}, left.hierarchicalFacetsRefinements), right.hierarchicalFacetsRefinements)
  });
};

var mergeRuleContexts = function mergeRuleContexts(left, right) {
  var ruleContexts = Object(_uniq__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));

  if (ruleContexts.length > 0) {
    return left.setQueryParameters({
      ruleContexts: ruleContexts
    });
  }

  return left;
};

var merge = function merge() {
  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }

  return parameters.reduce(function (left, right) {
    var hierarchicalFacetsRefinementsMerged = mergeHierarchicalFacetsRefinements(left, right);
    var hierarchicalFacetsMerged = mergeHierarchicalFacets(hierarchicalFacetsRefinementsMerged, right);
    var tagRefinementsMerged = mergeTagRefinements(hierarchicalFacetsMerged, right);
    var numericRefinementsMerged = mergeNumericRefinements(tagRefinementsMerged, right);
    var disjunctiveFacetsRefinementsMerged = mergeDisjunctiveFacetsRefinements(numericRefinementsMerged, right);
    var facetsExcludesMerged = mergeFacetsExcludes(disjunctiveFacetsRefinementsMerged, right);
    var facetRefinementsMerged = mergeFacetRefinements(facetsExcludesMerged, right);
    var disjunctiveFacetsMerged = mergeDisjunctiveFacets(facetRefinementsMerged, right);
    var ruleContextsMerged = mergeRuleContexts(disjunctiveFacetsMerged, right);
    var facetsMerged = mergeFacets(ruleContextsMerged, right);
    return mergeWithRest(facetsMerged, right);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (merge);

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(268);
/* harmony import */ var _unescapeRefinement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(269);



function getRefinement(state, type, attribute, name) {
  var resultsFacets = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var res = {
    type: type,
    attribute: attribute,
    name: name
  };
  var facet = Object(_find__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(resultsFacets, function (resultsFacet) {
    return resultsFacet.name === attribute;
  });
  var count;

  if (type === 'hierarchical') {
    (function () {
      var facetDeclaration = state.getHierarchicalFacetByName(attribute);
      var nameParts = name.split(facetDeclaration.separator);

      var getFacetRefinement = function getFacetRefinement(facetData) {
        return function (refinementKey) {
          return facetData[refinementKey];
        };
      };

      var _loop = function _loop(i) {
        facet = facet && facet.data && Object(_find__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object.keys(facet.data).map(getFacetRefinement(facet.data)), function (refinement) {
          return refinement.name === nameParts[i];
        });
      };

      for (var i = 0; facet !== undefined && i < nameParts.length; ++i) {
        _loop(i);
      }

      count = facet && facet.count;
    })();
  } else {
    count = facet && facet.data && facet.data[res.name];
  }

  var exhaustive = facet && facet.exhaustive;

  if (count !== undefined) {
    res.count = count;
  }

  if (exhaustive !== undefined) {
    res.exhaustive = exhaustive;
  }

  return res;
}

function getRefinements(results, state) {
  var includesQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var refinements = [];
  var _state$facetsRefineme = state.facetsRefinements,
      facetsRefinements = _state$facetsRefineme === void 0 ? {} : _state$facetsRefineme,
      _state$facetsExcludes = state.facetsExcludes,
      facetsExcludes = _state$facetsExcludes === void 0 ? {} : _state$facetsExcludes,
      _state$disjunctiveFac = state.disjunctiveFacetsRefinements,
      disjunctiveFacetsRefinements = _state$disjunctiveFac === void 0 ? {} : _state$disjunctiveFac,
      _state$hierarchicalFa = state.hierarchicalFacetsRefinements,
      hierarchicalFacetsRefinements = _state$hierarchicalFa === void 0 ? {} : _state$hierarchicalFa,
      _state$numericRefinem = state.numericRefinements,
      numericRefinements = _state$numericRefinem === void 0 ? {} : _state$numericRefinem,
      _state$tagRefinements = state.tagRefinements,
      tagRefinements = _state$tagRefinements === void 0 ? [] : _state$tagRefinements;
  Object.keys(facetsRefinements).forEach(function (attribute) {
    var refinementNames = facetsRefinements[attribute];
    refinementNames.forEach(function (refinementName) {
      refinements.push(getRefinement(state, 'facet', attribute, refinementName, results.facets));
    });
  });
  Object.keys(facetsExcludes).forEach(function (attribute) {
    var refinementNames = facetsExcludes[attribute];
    refinementNames.forEach(function (refinementName) {
      refinements.push({
        type: 'exclude',
        attribute: attribute,
        name: refinementName,
        exclude: true
      });
    });
  });
  Object.keys(disjunctiveFacetsRefinements).forEach(function (attribute) {
    var refinementNames = disjunctiveFacetsRefinements[attribute];
    refinementNames.forEach(function (refinementName) {
      refinements.push(getRefinement(state, 'disjunctive', attribute, // We unescape any disjunctive refined values with `unescapeRefinement` because
      // they can be escaped on negative numeric values with `escapeRefinement`.
      Object(_unescapeRefinement__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(refinementName), results.disjunctiveFacets));
    });
  });
  Object.keys(hierarchicalFacetsRefinements).forEach(function (attribute) {
    var refinementNames = hierarchicalFacetsRefinements[attribute];
    refinementNames.forEach(function (refinement) {
      refinements.push(getRefinement(state, 'hierarchical', attribute, refinement, results.hierarchicalFacets));
    });
  });
  Object.keys(numericRefinements).forEach(function (attribute) {
    var operators = numericRefinements[attribute];
    Object.keys(operators).forEach(function (operatorOriginal) {
      var operator = operatorOriginal;
      var valueOrValues = operators[operator];
      var refinementNames = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
      refinementNames.forEach(function (refinementName) {
        refinements.push({
          type: 'numeric',
          attribute: attribute,
          name: "".concat(refinementName),
          numericValue: refinementName,
          operator: operator
        });
      });
    });
  });
  tagRefinements.forEach(function (refinementName) {
    refinements.push({
      type: 'tag',
      attribute: '_tags',
      name: refinementName
    });
  });

  if (includesQuery && state.query && state.query.trim()) {
    refinements.push({
      attribute: 'query',
      type: 'query',
      name: state.query,
      query: state.query
    });
  }

  return refinements;
}

/* harmony default export */ __webpack_exports__["a"] = (getRefinements);

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createSendEventForFacet; });
/* harmony import */ var _isFacetRefined__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(270);
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}


function createSendEventForFacet(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      attribute = _ref.attribute,
      widgetType = _ref.widgetType;

  var sendEventForFacet = function sendEventForFacet() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var eventType = args[0],
        facetValue = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;

    if (args.length === 1 && _typeof(args[0]) === 'object') {
      instantSearchInstance.sendEventToInsights(args[0]);
    } else if (eventType === 'click' && (args.length === 2 || args.length === 3)) {
      if (!Object(_isFacetRefined__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(helper, attribute, facetValue)) {
        // send event only when the facet is being checked "ON"
        instantSearchInstance.sendEventToInsights({
          insightsMethod: 'clickedFilters',
          widgetType: widgetType,
          eventType: eventType,
          payload: {
            eventName: eventName,
            index: helper.getIndex(),
            filters: ["".concat(attribute, ":").concat(facetValue)]
          },
          attribute: attribute
        });
      }
    } else if (false) {}
  };

  return sendEventForFacet;
}

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createSendEventForHits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createBindEventForHits; });
/* harmony import */ var _lib_utils_serializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(253);
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}



function chunk(arr) {
  var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var chunks = [];

  for (var i = 0; i < Math.ceil(arr.length / chunkSize); i++) {
    chunks.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  return chunks;
}

var buildPayloads = function buildPayloads(_ref) {
  var index = _ref.index,
      widgetType = _ref.widgetType,
      methodName = _ref.methodName,
      args = _ref.args; // when there's only one argument, that means it's custom

  if (args.length === 1 && _typeof(args[0]) === 'object') {
    return [args[0]];
  }

  var eventType = args[0];
  var hits = args[1];
  var eventName = args[2];

  if (!hits) {
    if (false) {} else {
      return [];
    }
  }

  if ((eventType === 'click' || eventType === 'conversion') && !eventName) {
    if (false) {} else {
      return [];
    }
  }

  var hitsArray = Array.isArray(hits) ? removeEscapedFromHits(hits) : [hits];

  if (hitsArray.length === 0) {
    return [];
  }

  var queryID = hitsArray[0].__queryID;
  var hitsChunks = chunk(hitsArray);
  var objectIDsByChunk = hitsChunks.map(function (batch) {
    return batch.map(function (hit) {
      return hit.objectID;
    });
  });
  var positionsByChunk = hitsChunks.map(function (batch) {
    return batch.map(function (hit) {
      return hit.__position;
    });
  });

  if (eventType === 'view') {
    return hitsChunks.map(function (batch, i) {
      return {
        insightsMethod: 'viewedObjectIDs',
        widgetType: widgetType,
        eventType: eventType,
        payload: {
          eventName: eventName || 'Hits Viewed',
          index: index,
          objectIDs: objectIDsByChunk[i]
        },
        hits: batch
      };
    });
  } else if (eventType === 'click') {
    return hitsChunks.map(function (batch, i) {
      return {
        insightsMethod: 'clickedObjectIDsAfterSearch',
        widgetType: widgetType,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: index,
          queryID: queryID,
          objectIDs: objectIDsByChunk[i],
          positions: positionsByChunk[i]
        },
        hits: batch
      };
    });
  } else if (eventType === 'conversion') {
    return hitsChunks.map(function (batch, i) {
      return {
        insightsMethod: 'convertedObjectIDsAfterSearch',
        widgetType: widgetType,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: index,
          queryID: queryID,
          objectIDs: objectIDsByChunk[i]
        },
        hits: batch
      };
    });
  } else if (false) {} else {
    return [];
  }
};

function removeEscapedFromHits(hits) {
  // remove `hits.__escaped` without mutating
  return hits.slice();
}

function createSendEventForHits(_ref2) {
  var instantSearchInstance = _ref2.instantSearchInstance,
      index = _ref2.index,
      widgetType = _ref2.widgetType;

  var sendEventForHits = function sendEventForHits() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var payloads = buildPayloads({
      widgetType: widgetType,
      index: index,
      methodName: 'sendEvent',
      args: args
    });
    payloads.forEach(function (payload) {
      return instantSearchInstance.sendEventToInsights(payload);
    });
  };

  return sendEventForHits;
}
function createBindEventForHits(_ref3) {
  var index = _ref3.index,
      widgetType = _ref3.widgetType;

  var bindEventForHits = function bindEventForHits() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var payloads = buildPayloads({
      widgetType: widgetType,
      index: index,
      methodName: 'bindEvent',
      args: args
    });
    return payloads.length ? "data-insights-event=".concat(Object(_lib_utils_serializer__WEBPACK_IMPORTED_MODULE_0__[/* serializePayload */ "b"])(payloads)) : '';
  };

  return bindEventForHits;
}

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addAbsolutePosition; });
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function addAbsolutePosition(hits, page, hitsPerPage) {
  return hits.map(function (hit, idx) {
    return _objectSpread(_objectSpread({}, hit), {}, {
      __position: hitsPerPage * page + idx + 1
    });
  });
}

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addQueryID; });
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }

  return hits.map(function (hit) {
    return _objectSpread(_objectSpread({}, hit), {}, {
      __queryID: queryID
    });
  });
}

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isPrimitive(obj) {
  return obj !== Object(obj);
}

function isEqual(first, second) {
  if (first === second) {
    return true;
  }

  if (isPrimitive(first) || isPrimitive(second) || typeof first === 'function' || typeof second === 'function') {
    return first === second;
  }

  if (Object.keys(first).length !== Object.keys(second).length) {
    return false;
  }

  for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];

    if (!(key in second)) {
      return false;
    }

    if (!isEqual(first[key], second[key])) {
      return false;
    }
  }

  return true;
}

/* harmony default export */ __webpack_exports__["a"] = (isEqual);

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return convertNumericRefinementsToFilters; });
function convertNumericRefinementsToFilters(state, attribute) {
  if (!state) {
    return null;
  }

  var filtersObj = state.numericRefinements[attribute];
  /*
    filtersObj === {
      "<=": [10],
      "=": [],
      ">=": [5]
    }
  */

  var filters = [];
  Object.keys(filtersObj).filter(function (operator) {
    return Array.isArray(filtersObj[operator]) && filtersObj[operator].length > 0;
  }).forEach(function (operator) {
    filtersObj[operator].forEach(function (value) {
      filters.push("".concat(attribute).concat(operator).concat(value));
    });
  });
  return filters;
}

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// This is the `Number.isFinite()` polyfill recommended by MDN.
// We do not provide any tests for this function.
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#Polyfill
function isFiniteNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

/* harmony default export */ __webpack_exports__["a"] = (isFiniteNumber);

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function range(_ref) {
  var _ref$start = _ref.start,
      start = _ref$start === void 0 ? 0 : _ref$start,
      end = _ref.end,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step; // We can't divide by 0 so we re-assign the step to 1 if it happens.

  var limitStep = step === 0 ? 1 : step; // In some cases the array to create has a decimal length.
  // We therefore need to round the value.
  // Example:
  //   { start: 1, end: 5000, step: 500 }
  //   => Array length = (5000 - 1) / 500 = 9.998

  var arrayLength = Math.round((end - start) / limitStep);
  return _toConsumableArray(Array(arrayLength)).map(function (_, current) {
    return start + current * limitStep;
  });
}

/* harmony default export */ __webpack_exports__["a"] = (range);

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

/* harmony default export */ __webpack_exports__["a"] = (toArray);

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function escapeRefinement(value) {
  if (typeof value === 'number' && value < 0) {
    value = String(value).replace(/^-/, '\\-');
  }

  return value;
}

/* harmony default export */ __webpack_exports__["a"] = (escapeRefinement);

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return safelyRunOnBrowser; });
// eslint-disable-next-line no-restricted-globals

/**
 * Runs code on browser enviromnents safely.
 */
function safelyRunOnBrowser(callback) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    fallback: function fallback() {
      return undefined;
    }
  },
      fallback = _ref.fallback; // eslint-disable-next-line no-restricted-globals


  if (typeof window === 'undefined') {
    return fallback();
  } // eslint-disable-next-line no-restricted-globals


  return callback({
    window: window
  });
}

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getPropertyByPath(object, path) {
  var parts = Array.isArray(path) ? path : path.split('.');
  return parts.reduce(function (current, key) {
    return current && current[key];
  }, object);
}

/* harmony default export */ __webpack_exports__["a"] = (getPropertyByPath);

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createConcurrentSafePromise; });
// copied from
// https://github.com/algolia/autocomplete.js/blob/307a7acc4283e10a19cb7d067f04f1bea79dc56f/packages/autocomplete-core/src/utils/createConcurrentSafePromise.ts#L1:L1

/**
 * Creates a runner that executes promises in a concurrent-safe way.
 *
 * This is useful to prevent older promises to resolve after a newer promise,
 * otherwise resulting in stale resolved values.
 */
function createConcurrentSafePromise() {
  var basePromiseId = -1;
  var latestResolvedId = -1;
  var latestResolvedValue = undefined;
  return function runConcurrentSafePromise(promise) {
    var currentPromiseId = ++basePromiseId;
    return Promise.resolve(promise).then(function (x) {
      // The promise might take too long to resolve and get outdated. This would
      // result in resolving stale values.
      // When this happens, we ignore the promise value and return the one
      // coming from the latest resolved value.
      //
      // +----------------------------------+
      // |        100ms                     |
      // | run(1) +--->  R1                 |
      // |        300ms                     |
      // | run(2) +-------------> R2 (SKIP) |
      // |        200ms                     |
      // | run(3) +--------> R3             |
      // +----------------------------------+
      if (latestResolvedValue && currentPromiseId < latestResolvedId) {
        return latestResolvedValue;
      }

      latestResolvedId = currentPromiseId;
      latestResolvedValue = x;
      return x;
    });
  };
}

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return debounce; });
// Debounce a function call to the trailing edge.
// The debounced function returns a promise.
function debounce(func, wait) {
  var lastTimeout = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        lastTimeout = null;
        Promise.resolve(func.apply(void 0, args)).then(resolve).catch(reject);
      }, wait);
    });
  };
}

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getWidgetAttribute; });
function getWidgetAttribute(widget, initOptions) {
  var _widget$getWidgetRend;

  var renderState = (_widget$getWidgetRend = widget.getWidgetRenderState) === null || _widget$getWidgetRend === void 0 ? void 0 : _widget$getWidgetRend.call(widget, initOptions);
  var attribute = null;

  if (renderState && renderState.widgetParams) {
    // casting as widgetParams is checked just before
    var widgetParams = renderState.widgetParams;

    if (widgetParams.attribute) {
      attribute = widgetParams.attribute;
    } else if (Array.isArray(widgetParams.attributes)) {
      attribute = widgetParams.attributes[0];
    }
  }

  if (typeof attribute !== 'string') {
    throw new Error("Could not find the attribute of the widget:\n\n".concat(JSON.stringify(widget), "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."));
  }

  return attribute;
}

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var nextMicroTask = Promise.resolve();

var defer = function defer(callback) {
  var progress = null;
  var cancelled = false;

  var fn = function fn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (progress !== null) {
      return;
    }

    progress = nextMicroTask.then(function () {
      progress = null;

      if (cancelled) {
        cancelled = false;
        return;
      }

      callback.apply(void 0, args);
    });
  };

  fn.wait = function () {
    if (progress === null) {
      throw new Error('The deferred function should be called before calling `wait()`');
    }

    return progress;
  };

  fn.cancel = function () {
    if (progress === null) {
      return;
    }

    cancelled = true;
  };

  return fn;
};

/* harmony default export */ __webpack_exports__["a"] = (defer);

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return concatHighlightedParts; });
/* harmony import */ var _escape_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(249);

function concatHighlightedParts(parts) {
  var highlightPreTag = _escape_highlight__WEBPACK_IMPORTED_MODULE_0__[/* TAG_REPLACEMENT */ "b"].highlightPreTag,
      highlightPostTag = _escape_highlight__WEBPACK_IMPORTED_MODULE_0__[/* TAG_REPLACEMENT */ "b"].highlightPostTag;
  return parts.map(function (part) {
    return part.isHighlighted ? highlightPreTag + part.value + highlightPostTag : part.value;
  }).join('');
}

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getHighlightedParts; });
/* harmony import */ var _escape_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(249);

function getHighlightedParts(highlightedValue) {
  var highlightPostTag = _escape_highlight__WEBPACK_IMPORTED_MODULE_0__[/* TAG_REPLACEMENT */ "b"].highlightPostTag,
      highlightPreTag = _escape_highlight__WEBPACK_IMPORTED_MODULE_0__[/* TAG_REPLACEMENT */ "b"].highlightPreTag;
  var splitByPreTag = highlightedValue.split(highlightPreTag);
  var firstValue = splitByPreTag.shift();
  var elements = !firstValue ? [] : [{
    value: firstValue,
    isHighlighted: false
  }];
  splitByPreTag.forEach(function (split) {
    var splitByPostTag = split.split(highlightPostTag);
    elements.push({
      value: splitByPostTag[0],
      isHighlighted: true
    });

    if (splitByPostTag[1] !== '') {
      elements.push({
        value: splitByPostTag[1],
        isHighlighted: false
      });
    }
  });
  return elements;
}

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reverseHighlightedParts; });
/* harmony import */ var _getHighlightFromSiblings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(276);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


function reverseHighlightedParts(parts) {
  if (!parts.some(function (part) {
    return part.isHighlighted;
  })) {
    return parts.map(function (part) {
      return _objectSpread(_objectSpread({}, part), {}, {
        isHighlighted: false
      });
    });
  }

  return parts.map(function (part, i) {
    return _objectSpread(_objectSpread({}, part), {}, {
      isHighlighted: !Object(_getHighlightFromSiblings__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(parts, i)
    });
  });
}

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var resolveSearchParameters = function resolveSearchParameters(current) {
  var parent = current.getParent();
  var states = [current.getHelper().state];

  while (parent !== null) {
    states = [parent.getHelper().state].concat(states);
    parent = parent.getParent();
  }

  return states;
};

/* harmony default export */ __webpack_exports__["a"] = (resolveSearchParameters);

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIndexWidget", function() { return isIndexWidget; });
/* harmony import */ var algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(190);
/* harmony import */ var algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(264);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(290);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(311);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}



var withUsage = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[/* createDocumentationMessageGenerator */ "b"])({
  name: 'index-widget'
});
function isIndexWidget(widget) {
  return widget.$$type === 'ais.index';
}
/**
 * This is the same content as helper._change / setState, but allowing for extra
 * UiState to be synchronized.
 * see: https://github.com/algolia/algoliasearch-helper-js/blob/6b835ffd07742f2d6b314022cce6848f5cfecd4a/src/algoliasearch.helper.js#L1311-L1324
 */

function privateHelperSetState(helper, _ref) {
  var state = _ref.state,
      isPageReset = _ref.isPageReset,
      _uiState = _ref._uiState;

  if (state !== helper.state) {
    helper.state = state;
    helper.emit('change', {
      state: helper.state,
      results: helper.lastResults,
      isPageReset: isPageReset,
      _uiState: _uiState
    });
  }
}

function getLocalWidgetsUiState(widgets, widgetStateOptions) {
  var initialUiState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return widgets.reduce(function (uiState, widget) {
    if (isIndexWidget(widget)) {
      return uiState;
    }

    if (!widget.getWidgetUiState && !widget.getWidgetState) {
      return uiState;
    }

    if (widget.getWidgetUiState) {
      return widget.getWidgetUiState(uiState, widgetStateOptions);
    }

    return widget.getWidgetState(uiState, widgetStateOptions);
  }, initialUiState);
}

function getLocalWidgetsSearchParameters(widgets, widgetSearchParametersOptions) {
  var initialSearchParameters = widgetSearchParametersOptions.initialSearchParameters,
      rest = _objectWithoutProperties(widgetSearchParametersOptions, ["initialSearchParameters"]);

  return widgets.filter(function (widget) {
    return !isIndexWidget(widget);
  }).reduce(function (state, widget) {
    if (!widget.getWidgetSearchParameters) {
      return state;
    }

    return widget.getWidgetSearchParameters(state, rest);
  }, initialSearchParameters);
}

function resetPageFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);

  if (indexWidgets.length === 0) {
    return;
  }

  indexWidgets.forEach(function (widget) {
    var widgetHelper = widget.getHelper();
    privateHelperSetState(widgetHelper, {
      state: widgetHelper.state.resetPage(),
      isPageReset: true
    });
    resetPageFromWidgets(widget.getWidgets());
  });
}

function resolveScopedResultsFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);
  return indexWidgets.reduce(function (scopedResults, current) {
    return scopedResults.concat.apply(scopedResults, [{
      indexId: current.getIndexId(),
      results: current.getResults(),
      helper: current.getHelper()
    }].concat(_toConsumableArray(resolveScopedResultsFromWidgets(current.getWidgets()))));
  }, []);
}

var index = function index(widgetParams) {
  if (widgetParams === undefined || widgetParams.indexName === undefined) {
    throw new Error(withUsage('The `indexName` option is required.'));
  }

  var indexName = widgetParams.indexName,
      _widgetParams$indexId = widgetParams.indexId,
      indexId = _widgetParams$indexId === void 0 ? indexName : _widgetParams$indexId;
  var localWidgets = [];
  var localUiState = {};
  var localInstantSearchInstance = null;
  var localParent = null;
  var helper = null;
  var derivedHelper = null;
  return {
    $$type: 'ais.index',
    $$widgetType: 'ais.index',
    getIndexName: function getIndexName() {
      return indexName;
    },
    getIndexId: function getIndexId() {
      return indexId;
    },
    getHelper: function getHelper() {
      return helper;
    },
    getResults: function getResults() {
      return derivedHelper && derivedHelper.lastResults;
    },
    getScopedResults: function getScopedResults() {
      var widgetParent = this.getParent(); // If the widget is the root, we consider itself as the only sibling.

      var widgetSiblings = widgetParent ? widgetParent.getWidgets() : [this];
      return resolveScopedResultsFromWidgets(widgetSiblings);
    },
    getParent: function getParent() {
      return localParent;
    },
    createURL: function createURL(nextState) {
      return localInstantSearchInstance._createURL(_defineProperty({}, indexId, getLocalWidgetsUiState(localWidgets, {
        searchParameters: nextState,
        helper: helper
      })));
    },
    getWidgets: function getWidgets() {
      return localWidgets;
    },
    addWidgets: function addWidgets(widgets) {
      var _this = this;

      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `addWidgets` method expects an array of widgets.'));
      }

      if (widgets.some(function (widget) {
        return typeof widget.init !== 'function' && typeof widget.render !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `render` and/or an `init` method.'));
      }

      localWidgets = localWidgets.concat(widgets);

      if (localInstantSearchInstance && Boolean(widgets.length)) {
        privateHelperSetState(helper, {
          state: getLocalWidgetsSearchParameters(localWidgets, {
            uiState: localUiState,
            initialSearchParameters: helper.state
          }),
          _uiState: localUiState
        }); // We compute the render state before calling `init` in a separate loop
        // to construct the whole render state object that is then passed to
        // `init`.

        widgets.forEach(function (widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(localInstantSearchInstance.renderState[_this.getIndexId()] || {}, {
              uiState: localInstantSearchInstance._initialUiState,
              helper: _this.getHelper(),
              parent: _this,
              instantSearchInstance: localInstantSearchInstance,
              state: helper.state,
              renderState: localInstantSearchInstance.renderState,
              templatesConfig: localInstantSearchInstance.templatesConfig,
              createURL: _this.createURL,
              scopedResults: [],
              searchMetadata: {
                isSearchStalled: localInstantSearchInstance._isSearchStalled
              }
            });
            storeRenderState({
              renderState: renderState,
              instantSearchInstance: localInstantSearchInstance,
              parent: _this
            });
          }
        });
        widgets.forEach(function (widget) {
          if (widget.init) {
            widget.init({
              helper: helper,
              parent: _this,
              uiState: localInstantSearchInstance._initialUiState,
              instantSearchInstance: localInstantSearchInstance,
              state: helper.state,
              renderState: localInstantSearchInstance.renderState,
              templatesConfig: localInstantSearchInstance.templatesConfig,
              createURL: _this.createURL,
              scopedResults: [],
              searchMetadata: {
                isSearchStalled: localInstantSearchInstance._isSearchStalled
              }
            });
          }
        });
        localInstantSearchInstance.scheduleSearch();
      }

      return this;
    },
    removeWidgets: function removeWidgets(widgets) {
      var _this2 = this;

      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `removeWidgets` method expects an array of widgets.'));
      }

      if (widgets.some(function (widget) {
        return typeof widget.dispose !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `dispose` method.'));
      }

      localWidgets = localWidgets.filter(function (widget) {
        return widgets.indexOf(widget) === -1;
      });

      if (localInstantSearchInstance && Boolean(widgets.length)) {
        var nextState = widgets.reduce(function (state, widget) {
          // the `dispose` method exists at this point we already assert it
          var next = widget.dispose({
            helper: helper,
            state: state,
            parent: _this2
          });
          return next || state;
        }, helper.state);
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: nextState,
          helper: helper
        });
        helper.setState(getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: nextState
        }));

        if (localWidgets.length) {
          localInstantSearchInstance.scheduleSearch();
        }
      }

      return this;
    },
    init: function init(_ref2) {
      var _this3 = this;

      var instantSearchInstance = _ref2.instantSearchInstance,
          parent = _ref2.parent,
          uiState = _ref2.uiState;

      if (helper !== null) {
        // helper is already initialized, therefore we do not need to set up
        // any listeners
        return;
      }

      localInstantSearchInstance = instantSearchInstance;
      localParent = parent;
      localUiState = uiState[indexId] || {}; // The `mainHelper` is already defined at this point. The instance is created
      // inside InstantSearch at the `start` method, which occurs before the `init`
      // step.

      var mainHelper = instantSearchInstance.mainHelper;
      var parameters = getLocalWidgetsSearchParameters(localWidgets, {
        uiState: localUiState,
        initialSearchParameters: new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default.a.SearchParameters({
          index: indexName
        })
      }); // This Helper is only used for state management we do not care about the
      // `searchClient`. Only the "main" Helper created at the `InstantSearch`
      // level is aware of the client.

      helper = algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default()({}, parameters.index, parameters); // We forward the call to `search` to the "main" instance of the Helper
      // which is responsible for managing the queries (it's the only one that is
      // aware of the `searchClient`).

      helper.search = function () {
        if (instantSearchInstance.onStateChange) {
          instantSearchInstance.onStateChange({
            uiState: instantSearchInstance.mainIndex.getWidgetUiState({}),
            setUiState: instantSearchInstance.setUiState.bind(instantSearchInstance)
          }); // We don't trigger a search when controlled because it becomes the
          // responsibility of `setUiState`.

          return mainHelper;
        }

        return mainHelper.search();
      };

      helper.searchWithoutTriggeringOnStateChange = function () {
        return mainHelper.search();
      }; // We use the same pattern for the `searchForFacetValues`.


      helper.searchForFacetValues = function (facetName, facetValue, maxFacetHits, userState) {
        var state = helper.state.setQueryParameters(userState);
        return mainHelper.searchForFacetValues(facetName, facetValue, maxFacetHits, state);
      };

      derivedHelper = mainHelper.derive(function () {
        return _lib_utils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].apply(void 0, _toConsumableArray(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_this3)));
      }); // Subscribe to the Helper state changes for the page before widgets
      // are initialized. This behavior mimics the original one of the Helper.
      // It makes sense to replicate it at the `init` step. We have another
      // listener on `change` below, once `init` is done.

      helper.on('change', function (_ref3) {
        var isPageReset = _ref3.isPageReset;

        if (isPageReset) {
          resetPageFromWidgets(localWidgets);
        }
      });
      derivedHelper.on('search', function () {
        // The index does not manage the "staleness" of the search. This is the
        // responsibility of the main instance. It does not make sense to manage
        // it at the index level because it's either: all of them or none of them
        // that are stalled. The queries are performed into a single network request.
        instantSearchInstance.scheduleStalledRender();

        if (false) {}
      });
      derivedHelper.on('result', function (_ref4) {
        var results = _ref4.results; // The index does not render the results it schedules a new render
        // to let all the other indices emit their own results. It allows us to
        // run the render process in one pass.

        instantSearchInstance.scheduleRender(); // the derived helper is the one which actually searches, but the helper
        // which is exposed e.g. via instance.helper, doesn't search, and thus
        // does not have access to lastResults, which it used to in pre-federated
        // search behavior.

        helper.lastResults = results;
      }); // We compute the render state before calling `init` in a separate loop
      // to construct the whole render state object that is then passed to
      // `init`.

      localWidgets.forEach(function (widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this3.getIndexId()] || {}, {
            uiState: uiState,
            helper: helper,
            parent: _this3,
            instantSearchInstance: instantSearchInstance,
            state: helper.state,
            renderState: instantSearchInstance.renderState,
            templatesConfig: instantSearchInstance.templatesConfig,
            createURL: _this3.createURL,
            scopedResults: [],
            searchMetadata: {
              isSearchStalled: instantSearchInstance._isSearchStalled
            }
          });
          storeRenderState({
            renderState: renderState,
            instantSearchInstance: instantSearchInstance,
            parent: _this3
          });
        }
      });
      localWidgets.forEach(function (widget) {
         false ? undefined : void 0;

        if (widget.init) {
          widget.init({
            uiState: uiState,
            helper: helper,
            parent: _this3,
            instantSearchInstance: instantSearchInstance,
            state: helper.state,
            renderState: instantSearchInstance.renderState,
            templatesConfig: instantSearchInstance.templatesConfig,
            createURL: _this3.createURL,
            scopedResults: [],
            searchMetadata: {
              isSearchStalled: instantSearchInstance._isSearchStalled
            }
          });
        }
      }); // Subscribe to the Helper state changes for the `uiState` once widgets
      // are initialized. Until the first render, state changes are part of the
      // configuration step. This is mainly for backward compatibility with custom
      // widgets. When the subscription happens before the `init` step, the (static)
      // configuration of the widget is pushed in the URL. That's what we want to avoid.
      // https://github.com/algolia/instantsearch.js/pull/994/commits/4a672ae3fd78809e213de0368549ef12e9dc9454

      helper.on('change', function (event) {
        var state = event.state;
        var _uiState = event._uiState;
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: state,
          helper: helper
        }, _uiState || {}); // We don't trigger an internal change when controlled because it
        // becomes the responsibility of `setUiState`.

        if (!instantSearchInstance.onStateChange) {
          instantSearchInstance.onInternalStateChange();
        }
      });
    },
    render: function render(_ref5) {
      var _this4 = this;

      var instantSearchInstance = _ref5.instantSearchInstance;

      if (!this.getResults()) {
        return;
      }

      localWidgets.forEach(function (widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this4.getIndexId()] || {}, {
            helper: _this4.getHelper(),
            parent: _this4,
            instantSearchInstance: instantSearchInstance,
            results: _this4.getResults(),
            scopedResults: _this4.getScopedResults(),
            state: _this4.getResults()._state,
            renderState: instantSearchInstance.renderState,
            templatesConfig: instantSearchInstance.templatesConfig,
            createURL: _this4.createURL,
            searchMetadata: {
              isSearchStalled: instantSearchInstance._isSearchStalled
            }
          });
          storeRenderState({
            renderState: renderState,
            instantSearchInstance: instantSearchInstance,
            parent: _this4
          });
        }
      });
      localWidgets.forEach(function (widget) {
        // At this point, all the variables used below are set. Both `helper`
        // and `derivedHelper` have been created at the `init` step. The attribute
        // `lastResults` might be `null` though. It's possible that a stalled render
        // happens before the result e.g with a dynamically added index the request might
        // be delayed. The render is triggered for the complete tree but some parts do
        // not have results yet.
        if (widget.render) {
          widget.render({
            helper: helper,
            parent: _this4,
            instantSearchInstance: instantSearchInstance,
            results: _this4.getResults(),
            scopedResults: _this4.getScopedResults(),
            state: _this4.getResults()._state,
            renderState: instantSearchInstance.renderState,
            templatesConfig: instantSearchInstance.templatesConfig,
            createURL: _this4.createURL,
            searchMetadata: {
              isSearchStalled: instantSearchInstance._isSearchStalled
            }
          });
        }
      });
    },
    dispose: function dispose() {
      var _this5 = this;

      localWidgets.forEach(function (widget) {
        if (widget.dispose) {
          // The dispose function is always called once the instance is started
          // (it's an effect of `removeWidgets`). The index is initialized and
          // the Helper is available. We don't care about the return value of
          // `dispose` because the index is removed. We can't call `removeWidgets`
          // because we want to keep the widgets on the instance, to allow idempotent
          // operations on `add` & `remove`.
          widget.dispose({
            helper: helper,
            state: helper.state,
            parent: _this5
          });
        }
      });
      localInstantSearchInstance = null;
      localParent = null;
      helper.removeAllListeners();
      helper = null;
      derivedHelper.detach();
      derivedHelper = null;
    },
    getWidgetUiState: function getWidgetUiState(uiState) {
      return localWidgets.filter(isIndexWidget).reduce(function (previousUiState, innerIndex) {
        return innerIndex.getWidgetUiState(previousUiState);
      }, _objectSpread(_objectSpread({}, uiState), {}, _defineProperty({}, this.getIndexId(), localUiState)));
    },
    getWidgetState: function getWidgetState(uiState) {
       false ? undefined : void 0;
      return this.getWidgetUiState(uiState);
    },
    getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
      var uiState = _ref6.uiState;
      return getLocalWidgetsSearchParameters(localWidgets, {
        uiState: uiState,
        initialSearchParameters: searchParameters
      });
    },
    refreshUiState: function refreshUiState() {
      localUiState = getLocalWidgetsUiState(localWidgets, {
        searchParameters: this.getHelper().state,
        helper: this.getHelper()
      }, localUiState);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (index);

function storeRenderState(_ref7) {
  var renderState = _ref7.renderState,
      instantSearchInstance = _ref7.instantSearchInstance,
      parent = _ref7.parent;
  var parentIndexName = parent ? parent.getIndexId() : instantSearchInstance.mainIndex.getIndexId();
  instantSearchInstance.renderState = _objectSpread(_objectSpread({}, instantSearchInstance.renderState), {}, _defineProperty({}, parentIndexName, _objectSpread(_objectSpread({}, instantSearchInstance.renderState[parentIndexName]), renderState)));
}

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ('4.33.1');

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(315);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _utils__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _utils__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _algoliasearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(316);
/* harmony import */ var _algoliasearch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_algoliasearch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _algoliasearch__WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _algoliasearch__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _results__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(317);
/* harmony import */ var _results__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_results__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _results__WEBPACK_IMPORTED_MODULE_2__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _results__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(318);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _component__WEBPACK_IMPORTED_MODULE_3__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _component__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _instantsearch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(319);
/* harmony import */ var _instantsearch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_instantsearch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _instantsearch__WEBPACK_IMPORTED_MODULE_4__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _instantsearch__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(320);
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_middleware__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _middleware__WEBPACK_IMPORTED_MODULE_5__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _middleware__WEBPACK_IMPORTED_MODULE_5__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(321);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _router__WEBPACK_IMPORTED_MODULE_6__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _router__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _insights__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(322);
/* harmony import */ var _insights__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_insights__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _insights__WEBPACK_IMPORTED_MODULE_7__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _insights__WEBPACK_IMPORTED_MODULE_7__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _connector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(323);
/* harmony import */ var _connector__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_connector__WEBPACK_IMPORTED_MODULE_8__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _connector__WEBPACK_IMPORTED_MODULE_8__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _connector__WEBPACK_IMPORTED_MODULE_8__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _widget_factory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(324);
/* harmony import */ var _widget_factory__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_widget_factory__WEBPACK_IMPORTED_MODULE_9__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _widget_factory__WEBPACK_IMPORTED_MODULE_9__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _widget_factory__WEBPACK_IMPORTED_MODULE_9__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(325);
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_widget__WEBPACK_IMPORTED_MODULE_10__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _widget__WEBPACK_IMPORTED_MODULE_10__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _widget__WEBPACK_IMPORTED_MODULE_10__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _ui_state__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(326);
/* harmony import */ var _ui_state__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_ui_state__WEBPACK_IMPORTED_MODULE_11__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ui_state__WEBPACK_IMPORTED_MODULE_11__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ui_state__WEBPACK_IMPORTED_MODULE_11__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _render_state__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(327);
/* harmony import */ var _render_state__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_render_state__WEBPACK_IMPORTED_MODULE_12__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _render_state__WEBPACK_IMPORTED_MODULE_12__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _render_state__WEBPACK_IMPORTED_MODULE_12__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(328);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_templates__WEBPACK_IMPORTED_MODULE_13__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _templates__WEBPACK_IMPORTED_MODULE_13__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _templates__WEBPACK_IMPORTED_MODULE_13__[key]; }) }(__WEBPACK_IMPORT_KEY__));
// internal
 // Algolia-related


 // component-related

 // instantsearch-related




 // widget-related








/***/ }),

/***/ 315:
/***/ (function(module, exports) {



/***/ }),

/***/ 316:
/***/ (function(module, exports) {



/***/ }),

/***/ 317:
/***/ (function(module, exports) {



/***/ }),

/***/ 318:
/***/ (function(module, exports) {



/***/ }),

/***/ 319:
/***/ (function(module, exports) {



/***/ }),

/***/ 320:
/***/ (function(module, exports) {



/***/ }),

/***/ 321:
/***/ (function(module, exports) {



/***/ }),

/***/ 322:
/***/ (function(module, exports) {



/***/ }),

/***/ 323:
/***/ (function(module, exports) {



/***/ }),

/***/ 324:
/***/ (function(module, exports) {



/***/ }),

/***/ 325:
/***/ (function(module, exports) {



/***/ }),

/***/ 326:
/***/ (function(module, exports) {



/***/ }),

/***/ 327:
/***/ (function(module, exports) {



/***/ }),

/***/ 328:
/***/ (function(module, exports) {



/***/ }),

/***/ 329:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "connectClearRefinements", function() { return /* reexport */ clear_refinements_connectClearRefinements; });
__webpack_require__.d(__webpack_exports__, "connectCurrentRefinements", function() { return /* reexport */ current_refinements_connectCurrentRefinements; });
__webpack_require__.d(__webpack_exports__, "connectHierarchicalMenu", function() { return /* reexport */ hierarchical_menu_connectHierarchicalMenu; });
__webpack_require__.d(__webpack_exports__, "connectHits", function() { return /* reexport */ hits_connectHits; });
__webpack_require__.d(__webpack_exports__, "connectHitsWithInsights", function() { return /* reexport */ hits_connectHitsWithInsights; });
__webpack_require__.d(__webpack_exports__, "connectHitsPerPage", function() { return /* reexport */ hits_per_page_connectHitsPerPage; });
__webpack_require__.d(__webpack_exports__, "connectInfiniteHits", function() { return /* reexport */ connectInfiniteHits["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "connectInfiniteHitsWithInsights", function() { return /* reexport */ infinite_hits_connectInfiniteHitsWithInsights; });
__webpack_require__.d(__webpack_exports__, "connectMenu", function() { return /* reexport */ menu_connectMenu; });
__webpack_require__.d(__webpack_exports__, "connectNumericMenu", function() { return /* reexport */ numeric_menu_connectNumericMenu; });
__webpack_require__.d(__webpack_exports__, "connectPagination", function() { return /* reexport */ pagination_connectPagination; });
__webpack_require__.d(__webpack_exports__, "connectRange", function() { return /* reexport */ range_connectRange; });
__webpack_require__.d(__webpack_exports__, "connectRefinementList", function() { return /* reexport */ refinement_list_connectRefinementList; });
__webpack_require__.d(__webpack_exports__, "connectSearchBox", function() { return /* reexport */ search_box_connectSearchBox; });
__webpack_require__.d(__webpack_exports__, "connectSortBy", function() { return /* reexport */ sort_by_connectSortBy; });
__webpack_require__.d(__webpack_exports__, "connectRatingMenu", function() { return /* reexport */ rating_menu_connectRatingMenu; });
__webpack_require__.d(__webpack_exports__, "connectStats", function() { return /* reexport */ stats_connectStats; });
__webpack_require__.d(__webpack_exports__, "connectToggleRefinement", function() { return /* reexport */ toggle_refinement_connectToggleRefinement; });
__webpack_require__.d(__webpack_exports__, "connectBreadcrumb", function() { return /* reexport */ breadcrumb_connectBreadcrumb; });
__webpack_require__.d(__webpack_exports__, "connectGeoSearch", function() { return /* reexport */ geo_search_connectGeoSearch; });
__webpack_require__.d(__webpack_exports__, "connectPoweredBy", function() { return /* reexport */ powered_by_connectPoweredBy; });
__webpack_require__.d(__webpack_exports__, "connectConfigure", function() { return /* reexport */ configure_connectConfigure; });
__webpack_require__.d(__webpack_exports__, "EXPERIMENTAL_connectConfigureRelatedItems", function() { return /* reexport */ configure_related_items_connectConfigureRelatedItems; });
__webpack_require__.d(__webpack_exports__, "connectAutocomplete", function() { return /* reexport */ autocomplete_connectAutocomplete; });
__webpack_require__.d(__webpack_exports__, "connectQueryRules", function() { return /* reexport */ query_rules_connectQueryRules; });
__webpack_require__.d(__webpack_exports__, "connectVoiceSearch", function() { return /* reexport */ voice_search_connectVoiceSearch; });
__webpack_require__.d(__webpack_exports__, "EXPERIMENTAL_connectAnswers", function() { return /* reexport */ answers_connectAnswers; });
__webpack_require__.d(__webpack_exports__, "connectRelevantSort", function() { return /* reexport */ relevant_sort_connectRelevantSort; });
__webpack_require__.d(__webpack_exports__, "connectDynamicWidgets", function() { return /* reexport */ dynamic_widgets_connectDynamicWidgets; });
__webpack_require__.d(__webpack_exports__, "EXPERIMENTAL_connectDynamicWidgets", function() { return /* binding */ EXPERIMENTAL_connectDynamicWidgets; });

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/documentation.js
var documentation = __webpack_require__(264);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/noop.js
var noop = __webpack_require__(265);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/checkRendering.js
var checkRendering = __webpack_require__(288);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/clearRefinements.js
var clearRefinements = __webpack_require__(289);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js
var mergeSearchParameters = __webpack_require__(290);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/uniq.js
var uniq = __webpack_require__(252);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getRefinements.js
var getRefinements = __webpack_require__(291);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/clear-refinements/connectClearRefinements.js
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'clear-refinements',
  connector: true
});

var connectClearRefinements_connectClearRefinements = function connectClearRefinements(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        _ref$includedAttribut = _ref.includedAttributes,
        includedAttributes = _ref$includedAttribut === void 0 ? [] : _ref$includedAttribut,
        _ref$excludedAttribut = _ref.excludedAttributes,
        excludedAttributes = _ref$excludedAttribut === void 0 ? ['query'] : _ref$excludedAttribut,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (widgetParams && widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
    }

    var connectorState = {
      refine: noop["a" /* default */],
      createURL: function createURL() {
        return '';
      },
      attributesToClear: []
    };

    var cachedRefine = function cachedRefine() {
      return connectorState.refine();
    };

    var cachedCreateURL = function cachedCreateURL() {
      return connectorState.createURL();
    };

    return {
      $$type: 'ais.clearRefinements',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          clearRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var createURL = _ref2.createURL,
            scopedResults = _ref2.scopedResults;
        connectorState.attributesToClear = scopedResults.reduce(function (results, scopedResult) {
          return results.concat(getAttributesToClear({
            scopedResult: scopedResult,
            includedAttributes: includedAttributes,
            excludedAttributes: excludedAttributes,
            transformItems: transformItems
          }));
        }, []);

        connectorState.refine = function () {
          connectorState.attributesToClear.forEach(function (_ref3) {
            var indexHelper = _ref3.helper,
                items = _ref3.items;
            indexHelper.setState(Object(clearRefinements["a" /* default */])({
              helper: indexHelper,
              attributesToClear: items
            })).search();
          });
        };

        connectorState.createURL = function () {
          return createURL(mergeSearchParameters["a" /* default */].apply(void 0, _toConsumableArray(connectorState.attributesToClear.map(function (_ref4) {
            var indexHelper = _ref4.helper,
                items = _ref4.items;
            return Object(clearRefinements["a" /* default */])({
              helper: indexHelper,
              attributesToClear: items
            });
          }))));
        };

        var canRefine = connectorState.attributesToClear.some(function (attributeToClear) {
          return attributeToClear.items.length > 0;
        });
        return {
          canRefine: canRefine,
          hasRefinements: canRefine,
          refine: cachedRefine,
          createURL: cachedCreateURL,
          widgetParams: widgetParams
        };
      }
    };
  };
};

function getAttributesToClear(_ref5) {
  var scopedResult = _ref5.scopedResult,
      includedAttributes = _ref5.includedAttributes,
      excludedAttributes = _ref5.excludedAttributes,
      transformItems = _ref5.transformItems;
  var includesQuery = includedAttributes.indexOf('query') !== -1 || excludedAttributes.indexOf('query') === -1;
  return {
    helper: scopedResult.helper,
    items: transformItems(Object(uniq["a" /* default */])(Object(getRefinements["a" /* default */])(scopedResult.results, scopedResult.helper.state, includesQuery).map(function (refinement) {
      return refinement.attribute;
    }).filter(function (attribute) {
      return (// If the array is empty (default case), we keep all the attributes
        includedAttributes.length === 0 || // Otherwise, only add the specified attributes
        includedAttributes.indexOf(attribute) !== -1
      );
    }).filter(function (attribute) {
      return (// If the query is included, we ignore the default `excludedAttributes = ['query']`
        attribute === 'query' && includesQuery || // Otherwise, ignore the excluded attributes
        excludedAttributes.indexOf(attribute) === -1
      );
    })))
  };
}

/* harmony default export */ var clear_refinements_connectClearRefinements = (connectClearRefinements_connectClearRefinements);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements.js
function connectCurrentRefinements_toConsumableArray(arr) {
  return connectCurrentRefinements_arrayWithoutHoles(arr) || connectCurrentRefinements_iterableToArray(arr) || connectCurrentRefinements_unsupportedIterableToArray(arr) || connectCurrentRefinements_nonIterableSpread();
}

function connectCurrentRefinements_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectCurrentRefinements_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectCurrentRefinements_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectCurrentRefinements_arrayLikeToArray(o, minLen);
}

function connectCurrentRefinements_iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function connectCurrentRefinements_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return connectCurrentRefinements_arrayLikeToArray(arr);
}

function connectCurrentRefinements_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function connectCurrentRefinements_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectCurrentRefinements_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectCurrentRefinements_ownKeys(Object(source), true).forEach(function (key) {
        connectCurrentRefinements_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectCurrentRefinements_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectCurrentRefinements_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectCurrentRefinements_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'current-refinements',
  connector: true
});

var connectCurrentRefinements_connectCurrentRefinements = function connectCurrentRefinements(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectCurrentRefinements_withUsage());
  return function (widgetParams) {
    if ((widgetParams || {}).includedAttributes && (widgetParams || {}).excludedAttributes) {
      throw new Error(connectCurrentRefinements_withUsage('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
    }

    var _ref = widgetParams || {},
        includedAttributes = _ref.includedAttributes,
        _ref$excludedAttribut = _ref.excludedAttributes,
        excludedAttributes = _ref$excludedAttribut === void 0 ? ['query'] : _ref$excludedAttribut,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    return {
      $$type: 'ais.currentRefinements',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectCurrentRefinements_objectSpread(connectCurrentRefinements_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectCurrentRefinements_objectSpread(connectCurrentRefinements_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectCurrentRefinements_objectSpread(connectCurrentRefinements_objectSpread({}, renderState), {}, {
          currentRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results,
            scopedResults = _ref2.scopedResults,
            _createURL = _ref2.createURL,
            helper = _ref2.helper;

        function getItems() {
          if (!results) {
            return transformItems(getRefinementsItems({
              results: {},
              helper: helper,
              includedAttributes: includedAttributes,
              excludedAttributes: excludedAttributes
            }));
          }

          return scopedResults.reduce(function (accResults, scopedResult) {
            return accResults.concat(transformItems(getRefinementsItems({
              results: scopedResult.results,
              helper: scopedResult.helper,
              includedAttributes: includedAttributes,
              excludedAttributes: excludedAttributes
            })));
          }, []);
        }

        var items = getItems();
        return {
          items: items,
          canRefine: items.length > 0,
          refine: function refine(refinement) {
            return clearRefinement(helper, refinement);
          },
          createURL: function createURL(refinement) {
            return _createURL(clearRefinementFromState(helper.state, refinement));
          },
          widgetParams: widgetParams
        };
      }
    };
  };
};

function getRefinementsItems(_ref3) {
  var results = _ref3.results,
      helper = _ref3.helper,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes;
  var includesQuery = (includedAttributes || []).indexOf('query') !== -1 || (excludedAttributes || []).indexOf('query') === -1;
  var filterFunction = includedAttributes ? function (item) {
    return includedAttributes.indexOf(item.attribute) !== -1;
  } : function (item) {
    return excludedAttributes.indexOf(item.attribute) === -1;
  };
  var items = Object(getRefinements["a" /* default */])(results, helper.state, includesQuery).map(normalizeRefinement).filter(filterFunction);
  return items.reduce(function (allItems, currentItem) {
    return [].concat(connectCurrentRefinements_toConsumableArray(allItems.filter(function (item) {
      return item.attribute !== currentItem.attribute;
    })), [{
      indexName: helper.state.index,
      attribute: currentItem.attribute,
      label: currentItem.attribute,
      refinements: items.filter(function (result) {
        return result.attribute === currentItem.attribute;
      }) // We want to keep the order of refinements except the numeric ones.
      .sort(function (a, b) {
        return a.type === 'numeric' ? a.value - b.value : 0;
      }),
      refine: function refine(refinement) {
        return clearRefinement(helper, refinement);
      }
    }]);
  }, []);
}

function clearRefinementFromState(state, refinement) {
  switch (refinement.type) {
    case 'facet':
      return state.removeFacetRefinement(refinement.attribute, String(refinement.value));

    case 'disjunctive':
      return state.removeDisjunctiveFacetRefinement(refinement.attribute, String(refinement.value));

    case 'hierarchical':
      return state.removeHierarchicalFacetRefinement(refinement.attribute);

    case 'exclude':
      return state.removeExcludeRefinement(refinement.attribute, String(refinement.value));

    case 'numeric':
      return state.removeNumericRefinement(refinement.attribute, refinement.operator, String(refinement.value));

    case 'tag':
      return state.removeTagRefinement(String(refinement.value));

    case 'query':
      return state.setQueryParameter('query', '');

    default:
       false ? undefined : void 0;
      return state;
  }
}

function clearRefinement(helper, refinement) {
  helper.setState(clearRefinementFromState(helper.state, refinement)).search();
}

function getOperatorSymbol(operator) {
  switch (operator) {
    case '>=':
      return '≥';

    case '<=':
      return '≤';

    default:
      return operator;
  }
}

function normalizeRefinement(refinement) {
  var value = refinement.type === 'numeric' ? Number(refinement.name) : refinement.name;
  var label = refinement.operator ? "".concat(getOperatorSymbol(refinement.operator), " ").concat(refinement.name) : refinement.name;
  var normalizedRefinement = {
    attribute: refinement.attribute,
    type: refinement.type,
    value: value,
    label: label
  };

  if (refinement.operator !== undefined) {
    normalizedRefinement.operator = refinement.operator;
  }

  if (refinement.count !== undefined) {
    normalizedRefinement.count = refinement.count;
  }

  if (refinement.exhaustive !== undefined) {
    normalizedRefinement.exhaustive = refinement.exhaustive;
  }

  return normalizedRefinement;
}

/* harmony default export */ var current_refinements_connectCurrentRefinements = (connectCurrentRefinements_connectCurrentRefinements);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/createSendEventForFacet.js
var createSendEventForFacet = __webpack_require__(292);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu.js
function connectHierarchicalMenu_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectHierarchicalMenu_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectHierarchicalMenu_ownKeys(Object(source), true).forEach(function (key) {
        connectHierarchicalMenu_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectHierarchicalMenu_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectHierarchicalMenu_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || connectHierarchicalMenu_unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectHierarchicalMenu_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectHierarchicalMenu_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectHierarchicalMenu_arrayLikeToArray(o, minLen);
}

function connectHierarchicalMenu_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}


var connectHierarchicalMenu_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'hierarchical-menu',
  connector: true
});
var DEFAULT_SORT = ['name:asc'];
/**
 * **HierarchicalMenu** connector provides the logic to build a custom widget
 * that will give the user the ability to explore facets in a tree-like structure.
 *
 * This is commonly used for multi-level categorization of products on e-commerce
 * websites. From a UX point of view, we suggest not displaying more than two
 * levels deep.
 *
 * @type {Connector}
 * @param {function(HierarchicalMenuRenderingOptions, boolean)} renderFn Rendering function for the custom **HierarchicalMenu** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomHierarchicalMenuWidgetParams)} Re-usable widget factory for a custom **HierarchicalMenu** widget.
 */

var connectHierarchicalMenu_connectHierarchicalMenu = function connectHierarchicalMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectHierarchicalMenu_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        attributes = _ref.attributes,
        _ref$separator = _ref.separator,
        separator = _ref$separator === void 0 ? ' > ' : _ref$separator,
        _ref$rootPath = _ref.rootPath,
        rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath,
        _ref$showParentLevel = _ref.showParentLevel,
        showParentLevel = _ref$showParentLevel === void 0 ? true : _ref$showParentLevel,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? 10 : _ref$limit,
        _ref$showMore = _ref.showMore,
        showMore = _ref$showMore === void 0 ? false : _ref$showMore,
        _ref$showMoreLimit = _ref.showMoreLimit,
        showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
        _ref$sortBy = _ref.sortBy,
        sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT : _ref$sortBy,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(connectHierarchicalMenu_withUsage('The `attributes` option expects an array of strings.'));
    }

    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(connectHierarchicalMenu_withUsage('The `showMoreLimit` option must be greater than `limit`.'));
    } // we need to provide a hierarchicalFacet name for the search state
    // so that we can always map $hierarchicalFacetName => real attributes
    // we use the first attribute name


    var _attributes = _slicedToArray(attributes, 1),
        hierarchicalFacetName = _attributes[0];

    var sendEvent; // Provide the same function to the `renderFn` so that way the user
    // has to only bind it once when `isFirstRendering` for instance

    var toggleShowMore = function toggleShowMore() {};

    function cachedToggleShowMore() {
      toggleShowMore();
    }

    var _refine;

    var isShowingMore = false;

    function createToggleShowMore(renderOptions, widget) {
      return function () {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }

    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }

    function _prepareFacetValues(facetValues) {
      return facetValues.slice(0, getLimit()).map(function (_ref2) {
        var label = _ref2.name,
            value = _ref2.path,
            data = _ref2.data,
            subValue = _objectWithoutProperties(_ref2, ["name", "path", "data"]);

        var item = connectHierarchicalMenu_objectSpread(connectHierarchicalMenu_objectSpread({}, subValue), {}, {
          label: label,
          value: value,
          data: null
        });

        if (Array.isArray(data)) {
          item.data = _prepareFacetValues(data);
        }

        return item;
      });
    }

    return {
      $$type: 'ais.hierarchicalMenu',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectHierarchicalMenu_objectSpread(connectHierarchicalMenu_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        toggleShowMore = createToggleShowMore(renderOptions, this);
        renderFn(connectHierarchicalMenu_objectSpread(connectHierarchicalMenu_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.removeHierarchicalFacet(hierarchicalFacetName).setQueryParameter('maxValuesPerFacet', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectHierarchicalMenu_objectSpread(connectHierarchicalMenu_objectSpread({}, renderState), {}, {
          hierarchicalMenu: connectHierarchicalMenu_objectSpread(connectHierarchicalMenu_objectSpread({}, renderState.hierarchicalMenu), {}, connectHierarchicalMenu_defineProperty({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref4) {
        var results = _ref4.results,
            state = _ref4.state,
            createURL = _ref4.createURL,
            instantSearchInstance = _ref4.instantSearchInstance,
            helper = _ref4.helper;
        var items = [];
        var canToggleShowMore = false; // Bind createURL to this specific attribute

        function _createURL(facetValue) {
          return createURL(state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue));
        }

        if (!sendEvent) {
          sendEvent = Object(createSendEventForFacet["a" /* createSendEventForFacet */])({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            attribute: hierarchicalFacetName,
            widgetType: this.$$type
          });
        }

        if (!_refine) {
          _refine = function _refine(facetValue) {
            sendEvent('click', facetValue);
            helper.toggleFacetRefinement(hierarchicalFacetName, facetValue).search();
          };
        }

        if (results) {
          var facetValues = results.getFacetValues(hierarchicalFacetName, {
            sortBy: sortBy,
            facetOrdering: sortBy === DEFAULT_SORT
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : []; // If the limit is the max number of facet retrieved it is impossible to know
          // if the facets are exhaustive. The only moment we are sure it is exhaustive
          // is when it is strictly under the number requested unless we know that another
          // widget has requested more values (maxValuesPerFacet > getLimit()).
          // Because this is used for making the search of facets unable or not, it is important
          // to be conservative here.

          var hasExhaustiveItems = (state.maxValuesPerFacet || 0) > getLimit() ? facetItems.length <= getLimit() : facetItems.length < getLimit();
          canToggleShowMore = showMore && (isShowingMore || !hasExhaustiveItems);
          items = transformItems(_prepareFacetValues(facetItems));
        }

        return {
          items: items,
          refine: _refine,
          canRefine: items.length > 0,
          createURL: _createURL,
          sendEvent: sendEvent,
          widgetParams: widgetParams,
          isShowingMore: isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore: canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);

        if (!path.length) {
          return uiState;
        }

        return connectHierarchicalMenu_objectSpread(connectHierarchicalMenu_objectSpread({}, uiState), {}, {
          hierarchicalMenu: connectHierarchicalMenu_objectSpread(connectHierarchicalMenu_objectSpread({}, uiState.hierarchicalMenu), {}, connectHierarchicalMenu_defineProperty({}, hierarchicalFacetName, path))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];

        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
           false ? undefined : void 0;
        }

        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes: attributes,
          separator: separator,
          rootPath: rootPath,
          showParentLevel: showParentLevel
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);

        if (!values) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: connectHierarchicalMenu_objectSpread(connectHierarchicalMenu_objectSpread({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, connectHierarchicalMenu_defineProperty({}, hierarchicalFacetName, []))
          });
        }

        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
      }
    };
  };
};

/* harmony default export */ var hierarchical_menu_connectHierarchicalMenu = (connectHierarchicalMenu_connectHierarchicalMenu);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/createSendEventForHits.js
var createSendEventForHits = __webpack_require__(293);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js
var escape_highlight = __webpack_require__(249);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/hits-absolute-position.js
var hits_absolute_position = __webpack_require__(294);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/hits-query-id.js
var hits_query_id = __webpack_require__(295);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/hits/connectHits.js
function connectHits_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectHits_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectHits_ownKeys(Object(source), true).forEach(function (key) {
        connectHits_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectHits_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectHits_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectHits_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'hits',
  connector: true
});

var connectHits_connectHits = function connectHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectHits_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    var sendEvent;
    var bindEvent;
    return {
      $$type: 'ais.hits',
      init: function init(initOptions) {
        renderFn(connectHits_objectSpread(connectHits_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderState.sendEvent('view', renderState.hits);
        renderFn(connectHits_objectSpread(connectHits_objectSpread({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectHits_objectSpread(connectHits_objectSpread({}, renderState), {}, {
          hits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results,
            helper = _ref2.helper,
            instantSearchInstance = _ref2.instantSearchInstance;

        if (!sendEvent) {
          sendEvent = Object(createSendEventForHits["b" /* createSendEventForHits */])({
            instantSearchInstance: instantSearchInstance,
            index: helper.getIndex(),
            widgetType: this.$$type
          });
        }

        if (!bindEvent) {
          bindEvent = Object(createSendEventForHits["a" /* createBindEventForHits */])({
            index: helper.getIndex(),
            widgetType: this.$$type
          });
        }

        if (!results) {
          return {
            hits: [],
            results: undefined,
            sendEvent: sendEvent,
            bindEvent: bindEvent,
            widgetParams: widgetParams
          };
        }

        if (escapeHTML && results.hits.length > 0) {
          results.hits = Object(escape_highlight["d" /* escapeHits */])(results.hits);
        }

        var hitsWithAbsolutePosition = Object(hits_absolute_position["a" /* addAbsolutePosition */])(results.hits, results.page, results.hitsPerPage);
        var hitsWithAbsolutePositionAndQueryID = Object(hits_query_id["a" /* addQueryID */])(hitsWithAbsolutePosition, results.queryID);
        var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID);
        return {
          hits: transformedHits,
          results: results,
          sendEvent: sendEvent,
          bindEvent: bindEvent,
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();

        if (!escapeHTML) {
          return state;
        }

        return state.setQueryParameters(Object.keys(escape_highlight["a" /* TAG_PLACEHOLDER */]).reduce(function (acc, key) {
          return connectHits_objectSpread(connectHits_objectSpread({}, acc), {}, connectHits_defineProperty({}, key, undefined));
        }, {}));
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        if (!escapeHTML) {
          return state;
        }

        return state.setQueryParameters(escape_highlight["a" /* TAG_PLACEHOLDER */]);
      }
    };
  };
};

/* harmony default export */ var hits_connectHits = (connectHits_connectHits);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/find.js
var find = __webpack_require__(268);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/insights/client.js
function client_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function client_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      client_ownKeys(Object(source), true).forEach(function (key) {
        client_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      client_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function client_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



var client_getSelectedHits = function getSelectedHits(hits, selectedObjectIDs) {
  return selectedObjectIDs.map(function (objectID) {
    var hit = Object(find["a" /* default */])(hits, function (h) {
      return h.objectID === objectID;
    });

    if (typeof hit === 'undefined') {
      throw new Error("Could not find objectID \"".concat(objectID, "\" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID."));
    }

    return hit;
  });
};

var client_getQueryID = function getQueryID(selectedHits) {
  var queryIDs = Object(uniq["a" /* default */])(selectedHits.map(function (hit) {
    return hit.__queryID;
  }));

  if (queryIDs.length > 1) {
    throw new Error('Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s.');
  }

  var queryID = queryIDs[0];

  if (typeof queryID !== 'string') {
    throw new Error("Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7");
  }

  return queryID;
};

var getPositions = function getPositions(selectedHits) {
  return selectedHits.map(function (hit) {
    return hit.__position;
  });
};

var inferPayload = function inferPayload(_ref) {
  var method = _ref.method,
      results = _ref.results,
      hits = _ref.hits,
      objectIDs = _ref.objectIDs;
  var index = results.index;
  var selectedHits = client_getSelectedHits(hits, objectIDs);
  var queryID = client_getQueryID(selectedHits);

  switch (method) {
    case 'clickedObjectIDsAfterSearch':
      {
        var positions = getPositions(selectedHits);
        return {
          index: index,
          queryID: queryID,
          objectIDs: objectIDs,
          positions: positions
        };
      }

    case 'convertedObjectIDsAfterSearch':
      return {
        index: index,
        queryID: queryID,
        objectIDs: objectIDs
      };

    default:
      throw new Error("Unsupported method passed to insights: \"".concat(method, "\"."));
  }
};

var client_wrapInsightsClient = function wrapInsightsClient(aa, results, hits) {
  return function (method) {
    for (var _len = arguments.length, payloads = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      payloads[_key - 1] = arguments[_key];
    }

    var payload = payloads[0];
     false ? undefined : void 0;

    if (!aa) {
      var withInstantSearchUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
        name: 'instantsearch'
      });
      throw new Error(withInstantSearchUsage('The `insightsClient` option has not been provided to `instantsearch`.'));
    }

    if (!Array.isArray(payload.objectIDs)) {
      throw new TypeError('Expected `objectIDs` to be an array.');
    }

    var inferredPayload = inferPayload({
      method: method,
      results: results,
      hits: hits,
      objectIDs: payload.objectIDs
    });
    aa(method, client_objectSpread(client_objectSpread({}, inferredPayload), payload));
  };
};
/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 * It passes `insights` to `HitsWithInsightsListener` and `InfiniteHitsWithInsightsListener`.
 */


function withInsights(connector) {
  return function (renderFn, unmountFn) {
    return connector(function (renderOptions, isFirstRender) {
      var results = renderOptions.results,
          hits = renderOptions.hits,
          instantSearchInstance = renderOptions.instantSearchInstance;

      if (results && hits && instantSearchInstance) {
        var insights = client_wrapInsightsClient(instantSearchInstance.insightsClient, results, hits);
        return renderFn(client_objectSpread(client_objectSpread({}, renderOptions), {}, {
          insights: insights
        }), isFirstRender);
      }

      return renderFn(renderOptions, isFirstRender);
    }, unmountFn);
  };
}
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/hits/connectHitsWithInsights.js


var connectHitsWithInsights = withInsights(hits_connectHits);
/* harmony default export */ var hits_connectHitsWithInsights = (connectHitsWithInsights);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage.js
function connectHitsPerPage_toConsumableArray(arr) {
  return connectHitsPerPage_arrayWithoutHoles(arr) || connectHitsPerPage_iterableToArray(arr) || connectHitsPerPage_unsupportedIterableToArray(arr) || connectHitsPerPage_nonIterableSpread();
}

function connectHitsPerPage_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectHitsPerPage_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectHitsPerPage_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectHitsPerPage_arrayLikeToArray(o, minLen);
}

function connectHitsPerPage_iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function connectHitsPerPage_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return connectHitsPerPage_arrayLikeToArray(arr);
}

function connectHitsPerPage_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function connectHitsPerPage_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectHitsPerPage_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectHitsPerPage_ownKeys(Object(source), true).forEach(function (key) {
        connectHitsPerPage_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectHitsPerPage_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectHitsPerPage_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectHitsPerPage_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'hits-per-page',
  connector: true
});

var connectHitsPerPage_connectHitsPerPage = function connectHitsPerPage(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectHitsPerPage_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        userItems = _ref.items,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (!Array.isArray(userItems)) {
      throw new Error(connectHitsPerPage_withUsage('The `items` option expects an array of objects.'));
    }

    var items = userItems;
    var defaultItems = items.filter(function (item) {
      return item.default === true;
    });

    if (defaultItems.length === 0) {
      throw new Error(connectHitsPerPage_withUsage("A default value must be specified in `items`."));
    }

    if (defaultItems.length > 1) {
      throw new Error(connectHitsPerPage_withUsage('More than one default value is specified in `items`.'));
    }

    var defaultItem = defaultItems[0];

    var normalizeItems = function normalizeItems(_ref2) {
      var hitsPerPage = _ref2.hitsPerPage;
      return items.map(function (item) {
        return connectHitsPerPage_objectSpread(connectHitsPerPage_objectSpread({}, item), {}, {
          isRefined: Number(item.value) === Number(hitsPerPage)
        });
      });
    };

    var connectorState = {
      getRefine: function getRefine(helper) {
        return function (value) {
          return !value && value !== 0 ? helper.setQueryParameter('hitsPerPage', undefined).search() : helper.setQueryParameter('hitsPerPage', value).search();
        };
      },
      createURLFactory: function createURLFactory(_ref3) {
        var state = _ref3.state,
            createURL = _ref3.createURL;
        return function (value) {
          return createURL(state.resetPage().setQueryParameter('hitsPerPage', !value && value !== 0 ? undefined : value));
        };
      }
    };
    return {
      $$type: 'ais.hitsPerPage',
      init: function init(initOptions) {
        var state = initOptions.state,
            instantSearchInstance = initOptions.instantSearchInstance;
        var isCurrentInOptions = items.some(function (item) {
          return Number(state.hitsPerPage) === Number(item.value);
        });

        if (!isCurrentInOptions) {
           false ? undefined : void 0;
           false ? undefined : void 0;
          items = [// The helper will convert the empty string to `undefined`.
          {
            value: '',
            label: ''
          }].concat(connectHitsPerPage_toConsumableArray(items));
        }

        renderFn(connectHitsPerPage_objectSpread(connectHitsPerPage_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectHitsPerPage_objectSpread(connectHitsPerPage_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.setQueryParameter('hitsPerPage', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectHitsPerPage_objectSpread(connectHitsPerPage_objectSpread({}, renderState), {}, {
          hitsPerPage: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref5) {
        var state = _ref5.state,
            results = _ref5.results,
            createURL = _ref5.createURL,
            helper = _ref5.helper;
        return {
          items: transformItems(normalizeItems(state)),
          refine: connectorState.getRefine(helper),
          createURL: connectorState.createURLFactory({
            state: state,
            createURL: createURL
          }),
          hasNoResults: results ? results.nbHits === 0 : true,
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref6) {
        var searchParameters = _ref6.searchParameters;
        var hitsPerPage = searchParameters.hitsPerPage;

        if (hitsPerPage === undefined || hitsPerPage === defaultItem.value) {
          return uiState;
        }

        return connectHitsPerPage_objectSpread(connectHitsPerPage_objectSpread({}, uiState), {}, {
          hitsPerPage: hitsPerPage
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
        var uiState = _ref7.uiState;
        return searchParameters.setQueryParameters({
          hitsPerPage: uiState.hitsPerPage || defaultItem.value
        });
      }
    };
  };
};

/* harmony default export */ var hits_per_page_connectHitsPerPage = (connectHitsPerPage_connectHitsPerPage);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits.js
var connectInfiniteHits = __webpack_require__(273);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/infinite-hits/connectInfiniteHitsWithInsights.js


var connectInfiniteHitsWithInsights = withInsights(connectInfiniteHits["a" /* default */]);
/* harmony default export */ var infinite_hits_connectInfiniteHitsWithInsights = (connectInfiniteHitsWithInsights);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/menu/connectMenu.js
function connectMenu_objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = connectMenu_objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function connectMenu_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function connectMenu_slicedToArray(arr, i) {
  return connectMenu_arrayWithHoles(arr) || connectMenu_iterableToArrayLimit(arr, i) || connectMenu_unsupportedIterableToArray(arr, i) || connectMenu_nonIterableRest();
}

function connectMenu_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectMenu_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectMenu_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectMenu_arrayLikeToArray(o, minLen);
}

function connectMenu_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function connectMenu_iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function connectMenu_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function connectMenu_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectMenu_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectMenu_ownKeys(Object(source), true).forEach(function (key) {
        connectMenu_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectMenu_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectMenu_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectMenu_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'menu',
  connector: true
});
var connectMenu_DEFAULT_SORT = ['isRefined', 'name:asc'];
/**
 * **Menu** connector provides the logic to build a widget that will give the user the ability to choose a single value for a specific facet. The typical usage of menu is for navigation in categories.
 *
 * This connector provides a `toggleShowMore()` function to display more or less items and a `refine()`
 * function to select an item. While selecting a new element, the `refine` will also unselect the
 * one that is currently selected.
 *
 * **Requirement:** the attribute passed as `attribute` must be present in "attributes for faceting" on the Algolia dashboard or configured as attributesForFaceting via a set settings call to the Algolia API.
 */

var connectMenu_connectMenu = function connectMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectMenu_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        attribute = _ref.attribute,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? 10 : _ref$limit,
        _ref$showMore = _ref.showMore,
        showMore = _ref$showMore === void 0 ? false : _ref$showMore,
        _ref$showMoreLimit = _ref.showMoreLimit,
        showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
        _ref$sortBy = _ref.sortBy,
        sortBy = _ref$sortBy === void 0 ? connectMenu_DEFAULT_SORT : _ref$sortBy,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (!attribute) {
      throw new Error(connectMenu_withUsage('The `attribute` option is required.'));
    }

    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(connectMenu_withUsage('The `showMoreLimit` option must be greater than `limit`.'));
    }

    var sendEvent;

    var _createURL;

    var _refine; // Provide the same function to the `renderFn` so that way the user
    // has to only bind it once when `isFirstRendering` for instance


    var isShowingMore = false;

    var toggleShowMore = function toggleShowMore() {};

    function createToggleShowMore(renderOptions, widget) {
      return function () {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }

    function cachedToggleShowMore() {
      toggleShowMore();
    }

    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }

    return {
      $$type: 'ais.menu',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectMenu_objectSpread(connectMenu_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectMenu_objectSpread(connectMenu_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state.removeHierarchicalFacet(attribute).setQueryParameter('maxValuesPerFacet', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectMenu_objectSpread(connectMenu_objectSpread({}, renderState), {}, {
          menu: connectMenu_objectSpread(connectMenu_objectSpread({}, renderState.menu), {}, connectMenu_defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var results = renderOptions.results,
            createURL = renderOptions.createURL,
            instantSearchInstance = renderOptions.instantSearchInstance,
            helper = renderOptions.helper;
        var items = [];
        var canToggleShowMore = false;

        if (!sendEvent) {
          sendEvent = Object(createSendEventForFacet["a" /* createSendEventForFacet */])({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            attribute: attribute,
            widgetType: this.$$type
          });
        }

        if (!_createURL) {
          _createURL = function _createURL(facetValue) {
            return createURL(helper.state.resetPage().toggleFacetRefinement(attribute, facetValue));
          };
        }

        if (!_refine) {
          _refine = function _refine(facetValue) {
            var _helper$getHierarchic = helper.getHierarchicalFacetBreadcrumb(attribute),
                _helper$getHierarchic2 = connectMenu_slicedToArray(_helper$getHierarchic, 1),
                refinedItem = _helper$getHierarchic2[0];

            sendEvent('click', facetValue ? facetValue : refinedItem);
            helper.toggleFacetRefinement(attribute, facetValue ? facetValue : refinedItem).search();
          };
        }

        if (renderOptions.results) {
          toggleShowMore = createToggleShowMore(renderOptions, this);
        }

        if (results) {
          var facetValues = results.getFacetValues(attribute, {
            sortBy: sortBy,
            facetOrdering: sortBy === connectMenu_DEFAULT_SORT
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          canToggleShowMore = showMore && (isShowingMore || facetItems.length > getLimit());
          items = transformItems(facetItems.slice(0, getLimit()).map(function (_ref3) {
            var label = _ref3.name,
                value = _ref3.path,
                item = connectMenu_objectWithoutProperties(_ref3, ["name", "path"]);

            return connectMenu_objectSpread(connectMenu_objectSpread({}, item), {}, {
              label: label,
              value: value
            });
          }));
        }

        return {
          items: items,
          createURL: _createURL,
          refine: _refine,
          sendEvent: sendEvent,
          canRefine: items.length > 0,
          widgetParams: widgetParams,
          isShowingMore: isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore: canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;

        var _searchParameters$get = searchParameters.getHierarchicalFacetBreadcrumb(attribute),
            _searchParameters$get2 = connectMenu_slicedToArray(_searchParameters$get, 1),
            value = _searchParameters$get2[0];

        if (!value) {
          return uiState;
        }

        return connectMenu_objectSpread(connectMenu_objectSpread({}, uiState), {}, {
          menu: connectMenu_objectSpread(connectMenu_objectSpread({}, uiState.menu), {}, connectMenu_defineProperty({}, attribute, value))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var value = uiState.menu && uiState.menu[attribute];
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(attribute).addHierarchicalFacet({
          name: attribute,
          attributes: [attribute]
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);

        if (!value) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: connectMenu_objectSpread(connectMenu_objectSpread({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, connectMenu_defineProperty({}, attribute, []))
          });
        }

        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(attribute, value);
      }
    };
  };
};

/* harmony default export */ var menu_connectMenu = (connectMenu_connectMenu);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/convertNumericRefinementsToFilters.js
var convertNumericRefinementsToFilters = __webpack_require__(297);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/isFiniteNumber.js
var isFiniteNumber = __webpack_require__(298);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/numeric-menu/connectNumericMenu.js
function connectNumericMenu_slicedToArray(arr, i) {
  return connectNumericMenu_arrayWithHoles(arr) || connectNumericMenu_iterableToArrayLimit(arr, i) || connectNumericMenu_unsupportedIterableToArray(arr, i) || connectNumericMenu_nonIterableRest();
}

function connectNumericMenu_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectNumericMenu_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectNumericMenu_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectNumericMenu_arrayLikeToArray(o, minLen);
}

function connectNumericMenu_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function connectNumericMenu_iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function connectNumericMenu_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function connectNumericMenu_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectNumericMenu_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectNumericMenu_ownKeys(Object(source), true).forEach(function (key) {
        connectNumericMenu_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectNumericMenu_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectNumericMenu_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectNumericMenu_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'numeric-menu',
  connector: true
});
var $$type = 'ais.numericMenu';

var connectNumericMenu_createSendEvent = function createSendEvent(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      attribute = _ref.attribute;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }

    var eventType = args[0],
        facetValue = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;

    if (eventType !== 'click') {
      return;
    } // facetValue === "%7B%22start%22:5,%22end%22:10%7D"


    var filters = Object(convertNumericRefinementsToFilters["a" /* convertNumericRefinementsToFilters */])(connectNumericMenu_getRefinedState(helper.state, attribute, facetValue), attribute);

    if (filters && filters.length > 0) {
      /*
        filters === ["price<=10", "price>=5"]
      */
      instantSearchInstance.sendEventToInsights({
        insightsMethod: 'clickedFilters',
        widgetType: $$type,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: helper.getIndex(),
          filters: filters
        },
        attribute: attribute
      });
    }
  };
};

var connectNumericMenu_connectNumericMenu = function connectNumericMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectNumericMenu_withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        _ref2$attribute = _ref2.attribute,
        attribute = _ref2$attribute === void 0 ? '' : _ref2$attribute,
        _ref2$items = _ref2.items,
        items = _ref2$items === void 0 ? [] : _ref2$items,
        _ref2$transformItems = _ref2.transformItems,
        transformItems = _ref2$transformItems === void 0 ? function (x) {
      return x;
    } : _ref2$transformItems;

    if (attribute === '') {
      throw new Error(connectNumericMenu_withUsage('The `attribute` option is required.'));
    }

    if (!items || items.length === 0) {
      throw new Error(connectNumericMenu_withUsage('The `items` option expects an array of objects.'));
    }

    var prepareItems = function prepareItems(state) {
      return items.map(function (_ref3) {
        var start = _ref3.start,
            end = _ref3.end,
            label = _ref3.label;
        return {
          label: label,
          value: encodeURI(JSON.stringify({
            start: start,
            end: end
          })),
          isRefined: connectNumericMenu_isRefined(state, attribute, {
            start: start,
            end: end,
            label: label
          })
        };
      });
    };

    var connectorState = {};
    return {
      $$type: $$type,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.clearRefinements(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = searchParameters.getNumericRefinements(attribute);
        var equal = values['='] && values['='][0];

        if (equal || equal === 0) {
          return connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, uiState), {}, {
            numericMenu: connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, uiState.numericMenu), {}, connectNumericMenu_defineProperty({}, attribute, "".concat(values['='])))
          });
        }

        var min = values['>='] && values['>='][0] || '';
        var max = values['<='] && values['<='][0] || '';

        if (min === '' && max === '') {
          return uiState;
        }

        return connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, uiState), {}, {
          numericMenu: connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, uiState.numericMenu), {}, connectNumericMenu_defineProperty({}, attribute, "".concat(min, ":").concat(max)))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var value = uiState.numericMenu && uiState.numericMenu[attribute];
        var withoutRefinements = searchParameters.clearRefinements(attribute);

        if (!value) {
          return withoutRefinements.setQueryParameters({
            numericRefinements: connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, withoutRefinements.numericRefinements), {}, connectNumericMenu_defineProperty({}, attribute, {}))
          });
        }

        var isExact = value.indexOf(':') === -1;

        if (isExact) {
          return withoutRefinements.addNumericRefinement(attribute, '=', Number(value));
        }

        var _value$split$map = value.split(':').map(parseFloat),
            _value$split$map2 = connectNumericMenu_slicedToArray(_value$split$map, 2),
            min = _value$split$map2[0],
            max = _value$split$map2[1];

        var withMinRefinement = Object(isFiniteNumber["a" /* default */])(min) ? withoutRefinements.addNumericRefinement(attribute, '>=', min) : withoutRefinements;
        var withMaxRefinement = Object(isFiniteNumber["a" /* default */])(max) ? withMinRefinement.addNumericRefinement(attribute, '<=', max) : withMinRefinement;
        return withMaxRefinement;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, renderState), {}, {
          numericMenu: connectNumericMenu_objectSpread(connectNumericMenu_objectSpread({}, renderState.numericMenu), {}, connectNumericMenu_defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref7) {
        var results = _ref7.results,
            state = _ref7.state,
            instantSearchInstance = _ref7.instantSearchInstance,
            helper = _ref7.helper,
            createURL = _ref7.createURL;

        if (!connectorState.refine) {
          connectorState.refine = function (facetValue) {
            var refinedState = connectNumericMenu_getRefinedState(helper.state, attribute, facetValue);
            connectorState.sendEvent('click', facetValue);
            helper.setState(refinedState).search();
          };
        }

        if (!connectorState.createURL) {
          connectorState.createURL = function (newState) {
            return function (facetValue) {
              return createURL(connectNumericMenu_getRefinedState(newState, attribute, facetValue));
            };
          };
        }

        if (!connectorState.sendEvent) {
          connectorState.sendEvent = connectNumericMenu_createSendEvent({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            attribute: attribute
          });
        }

        return {
          createURL: connectorState.createURL(state),
          items: transformItems(prepareItems(state)),
          hasNoResults: results ? results.nbHits === 0 : true,
          refine: connectorState.refine,
          sendEvent: connectorState.sendEvent,
          widgetParams: widgetParams
        };
      }
    };
  };
};

function connectNumericMenu_isRefined(state, attribute, option) {
  // @TODO: same as another spot, why is this mixing arrays & elements?
  var currentRefinements = state.getNumericRefinements(attribute);

  if (option.start !== undefined && option.end !== undefined) {
    if (option.start === option.end) {
      return hasNumericRefinement(currentRefinements, '=', option.start);
    }
  }

  if (option.start !== undefined) {
    return hasNumericRefinement(currentRefinements, '>=', option.start);
  }

  if (option.end !== undefined) {
    return hasNumericRefinement(currentRefinements, '<=', option.end);
  }

  if (option.start === undefined && option.end === undefined) {
    return Object.keys(currentRefinements).every(function (operator) {
      return (currentRefinements[operator] || []).length === 0;
    });
  }

  return false;
}

function connectNumericMenu_getRefinedState(state, attribute, facetValue) {
  var resolvedState = state;
  var refinedOption = JSON.parse(decodeURI(facetValue)); // @TODO: why is array / element mixed here & hasRefinements; seems wrong?

  var currentRefinements = resolvedState.getNumericRefinements(attribute);

  if (refinedOption.start === undefined && refinedOption.end === undefined) {
    return resolvedState.removeNumericRefinement(attribute);
  }

  if (!connectNumericMenu_isRefined(resolvedState, attribute, refinedOption)) {
    resolvedState = resolvedState.removeNumericRefinement(attribute);
  }

  if (refinedOption.start !== undefined && refinedOption.end !== undefined) {
    if (refinedOption.start > refinedOption.end) {
      throw new Error('option.start should be > to option.end');
    }

    if (refinedOption.start === refinedOption.end) {
      if (hasNumericRefinement(currentRefinements, '=', refinedOption.start)) {
        resolvedState = resolvedState.removeNumericRefinement(attribute, '=', refinedOption.start);
      } else {
        resolvedState = resolvedState.addNumericRefinement(attribute, '=', refinedOption.start);
      }

      return resolvedState;
    }
  }

  if (refinedOption.start !== undefined) {
    if (hasNumericRefinement(currentRefinements, '>=', refinedOption.start)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, '>=', refinedOption.start);
    } else {
      resolvedState = resolvedState.addNumericRefinement(attribute, '>=', refinedOption.start);
    }
  }

  if (refinedOption.end !== undefined) {
    if (hasNumericRefinement(currentRefinements, '<=', refinedOption.end)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, '<=', refinedOption.end);
    } else {
      resolvedState = resolvedState.addNumericRefinement(attribute, '<=', refinedOption.end);
    }
  }

  if (typeof resolvedState.page === 'number') {
    resolvedState.page = 0;
  }

  return resolvedState;
}

function hasNumericRefinement(currentRefinements, operator, value) {
  return currentRefinements[operator] !== undefined && currentRefinements[operator].includes(value);
}

/* harmony default export */ var numeric_menu_connectNumericMenu = (connectNumericMenu_connectNumericMenu);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/range.js
var range = __webpack_require__(299);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/pagination/Paginator.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function Paginator_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



var Paginator_Paginator = /*#__PURE__*/function () {
  function Paginator(params) {
    _classCallCheck(this, Paginator);

    Paginator_defineProperty(this, "currentPage", void 0);

    Paginator_defineProperty(this, "total", void 0);

    Paginator_defineProperty(this, "padding", void 0);

    this.currentPage = params.currentPage;
    this.total = params.total;
    this.padding = params.padding;
  }

  _createClass(Paginator, [{
    key: "pages",
    value: function pages() {
      var total = this.total,
          currentPage = this.currentPage,
          padding = this.padding;
      if (total === 0) return [0];
      var totalDisplayedPages = this.nbPagesDisplayed(padding, total);

      if (totalDisplayedPages === total) {
        return Object(range["a" /* default */])({
          end: total
        });
      }

      var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
      var paddingRight = totalDisplayedPages - paddingLeft;
      var first = currentPage - paddingLeft;
      var last = currentPage + paddingRight;
      return Object(range["a" /* default */])({
        start: first,
        end: last
      });
    }
  }, {
    key: "nbPagesDisplayed",
    value: function nbPagesDisplayed(padding, total) {
      return Math.min(2 * padding + 1, total);
    }
  }, {
    key: "calculatePaddingLeft",
    value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
      if (current <= padding) {
        return current;
      }

      if (current >= total - padding) {
        return totalDisplayedPages - (total - current);
      }

      return padding;
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.currentPage === this.total - 1 || this.total === 0;
    }
  }, {
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.currentPage === 0;
    }
  }]);

  return Paginator;
}();

/* harmony default export */ var pagination_Paginator = (Paginator_Paginator);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/pagination/connectPagination.js
function connectPagination_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectPagination_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectPagination_ownKeys(Object(source), true).forEach(function (key) {
        connectPagination_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectPagination_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectPagination_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



var connectPagination_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'pagination',
  connector: true
});
/**
 * **Pagination** connector provides the logic to build a widget that will let the user
 * choose the current page of the results.
 *
 * When using the pagination with Algolia, you should be aware that the engine won't provide you pages
 * beyond the 1000th hits by default. You can find more information on the [Algolia documentation](https://www.algolia.com/doc/guides/searching/pagination/#pagination-limitations).
 */

var connectPagination_connectPagination = function connectPagination(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectPagination_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        totalPages = _ref.totalPages,
        _ref$padding = _ref.padding,
        padding = _ref$padding === void 0 ? 3 : _ref$padding;

    var pager = new pagination_Paginator({
      currentPage: 0,
      total: 0,
      padding: padding
    });
    var connectorState = {};

    function getMaxPage(_ref2) {
      var nbPages = _ref2.nbPages;
      return totalPages !== undefined ? Math.min(totalPages, nbPages) : nbPages;
    }

    return {
      $$type: 'ais.pagination',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectPagination_objectSpread(connectPagination_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectPagination_objectSpread(connectPagination_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.setQueryParameter('page', undefined);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var page = searchParameters.page || 0;

        if (!page) {
          return uiState;
        }

        return connectPagination_objectSpread(connectPagination_objectSpread({}, uiState), {}, {
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var page = uiState.page ? uiState.page - 1 : 0;
        return searchParameters.setQueryParameter('page', page);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var results = _ref6.results,
            helper = _ref6.helper,
            createURL = _ref6.createURL;

        if (!connectorState.refine) {
          connectorState.refine = function (page) {
            helper.setPage(page);
            helper.search();
          };
        }

        if (!connectorState.createURL) {
          connectorState.createURL = function (state) {
            return function (page) {
              return createURL(state.setPage(page));
            };
          };
        }

        var state = helper.state;
        var page = state.page || 0;
        var nbPages = getMaxPage(results || {
          nbPages: 0
        });
        pager.currentPage = page;
        pager.total = nbPages;
        return {
          createURL: connectorState.createURL(state),
          refine: connectorState.refine,
          canRefine: nbPages > 1,
          currentRefinement: page,
          nbHits: (results === null || results === void 0 ? void 0 : results.nbHits) || 0,
          nbPages: nbPages,
          pages: results ? pager.pages() : [],
          isFirstPage: pager.isFirstPage(),
          isLastPage: pager.isLastPage(),
          widgetParams: widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectPagination_objectSpread(connectPagination_objectSpread({}, renderState), {}, {
          pagination: this.getWidgetRenderState(renderOptions)
        });
      }
    };
  };
};

/* harmony default export */ var pagination_connectPagination = (connectPagination_connectPagination);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/range/connectRange.js
function connectRange_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectRange_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectRange_ownKeys(Object(source), true).forEach(function (key) {
        connectRange_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectRange_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectRange_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function connectRange_slicedToArray(arr, i) {
  return connectRange_arrayWithHoles(arr) || connectRange_iterableToArrayLimit(arr, i) || connectRange_unsupportedIterableToArray(arr, i) || connectRange_nonIterableRest();
}

function connectRange_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectRange_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectRange_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectRange_arrayLikeToArray(o, minLen);
}

function connectRange_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function connectRange_iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function connectRange_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}


var connectRange_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'range-input',
  connector: true
}, {
  name: 'range-slider',
  connector: true
});
var connectRange_$$type = 'ais.range';

function toPrecision(_ref) {
  var min = _ref.min,
      max = _ref.max,
      precision = _ref.precision;
  var pow = Math.pow(10, precision);
  return {
    min: min ? Math.floor(min * pow) / pow : min,
    max: max ? Math.ceil(max * pow) / pow : max
  };
}
/**
 * **Range** connector provides the logic to create custom widget that will let
 * the user refine results using a numeric range.
 *
 * This connectors provides a `refine()` function that accepts bounds. It will also provide
 * information about the min and max bounds for the current result set.
 */


var connectRange_connectRange = function connectRange(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectRange_withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        _ref2$attribute = _ref2.attribute,
        attribute = _ref2$attribute === void 0 ? '' : _ref2$attribute,
        minBound = _ref2.min,
        maxBound = _ref2.max,
        _ref2$precision = _ref2.precision,
        precision = _ref2$precision === void 0 ? 0 : _ref2$precision;

    if (!attribute) {
      throw new Error(connectRange_withUsage('The `attribute` option is required.'));
    }

    if (Object(isFiniteNumber["a" /* default */])(minBound) && Object(isFiniteNumber["a" /* default */])(maxBound) && minBound > maxBound) {
      throw new Error(connectRange_withUsage("The `max` option can't be lower than `min`."));
    }

    var formatToNumber = function formatToNumber(v) {
      return Number(Number(v).toFixed(precision));
    };

    var rangeFormatter = {
      from: function from(v) {
        return v.toLocaleString();
      },
      to: function to(v) {
        return formatToNumber(v).toLocaleString();
      }
    }; // eslint-disable-next-line complexity

    var getRefinedState = function getRefinedState(helper, currentRange, nextMin, nextMax) {
      var resolvedState = helper.state;
      var currentRangeMin = currentRange.min,
          currentRangeMax = currentRange.max;

      var _ref3 = resolvedState.getNumericRefinement(attribute, '>=') || [],
          _ref4 = connectRange_slicedToArray(_ref3, 1),
          min = _ref4[0];

      var _ref5 = resolvedState.getNumericRefinement(attribute, '<=') || [],
          _ref6 = connectRange_slicedToArray(_ref5, 1),
          max = _ref6[0];

      var isResetMin = nextMin === undefined || nextMin === '';
      var isResetMax = nextMax === undefined || nextMax === '';

      var _toPrecision = toPrecision({
        min: !isResetMin ? parseFloat(nextMin) : undefined,
        max: !isResetMax ? parseFloat(nextMax) : undefined,
        precision: precision
      }),
          nextMinAsNumber = _toPrecision.min,
          nextMaxAsNumber = _toPrecision.max;

      var newNextMin;

      if (!Object(isFiniteNumber["a" /* default */])(minBound) && currentRangeMin === nextMinAsNumber) {
        newNextMin = undefined;
      } else if (Object(isFiniteNumber["a" /* default */])(minBound) && isResetMin) {
        newNextMin = minBound;
      } else {
        newNextMin = nextMinAsNumber;
      }

      var newNextMax;

      if (!Object(isFiniteNumber["a" /* default */])(maxBound) && currentRangeMax === nextMaxAsNumber) {
        newNextMax = undefined;
      } else if (Object(isFiniteNumber["a" /* default */])(maxBound) && isResetMax) {
        newNextMax = maxBound;
      } else {
        newNextMax = nextMaxAsNumber;
      }

      var isResetNewNextMin = newNextMin === undefined;
      var isGreaterThanCurrentRange = Object(isFiniteNumber["a" /* default */])(currentRangeMin) && currentRangeMin <= newNextMin;
      var isMinValid = isResetNewNextMin || Object(isFiniteNumber["a" /* default */])(newNextMin) && (!Object(isFiniteNumber["a" /* default */])(currentRangeMin) || isGreaterThanCurrentRange);
      var isResetNewNextMax = newNextMax === undefined;
      var isLowerThanRange = Object(isFiniteNumber["a" /* default */])(newNextMax) && currentRangeMax >= newNextMax;
      var isMaxValid = isResetNewNextMax || Object(isFiniteNumber["a" /* default */])(newNextMax) && (!Object(isFiniteNumber["a" /* default */])(currentRangeMax) || isLowerThanRange);
      var hasMinChange = min !== newNextMin;
      var hasMaxChange = max !== newNextMax;

      if ((hasMinChange || hasMaxChange) && isMinValid && isMaxValid) {
        resolvedState = resolvedState.removeNumericRefinement(attribute);

        if (Object(isFiniteNumber["a" /* default */])(newNextMin)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, '>=', newNextMin);
        }

        if (Object(isFiniteNumber["a" /* default */])(newNextMax)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, '<=', newNextMax);
        }

        return resolvedState.resetPage();
      }

      return null;
    };

    var sendEventWithRefinedState = function sendEventWithRefinedState(refinedState, instantSearchInstance, helper) {
      var eventName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Filter Applied';
      var filters = Object(convertNumericRefinementsToFilters["a" /* convertNumericRefinementsToFilters */])(refinedState, attribute);

      if (filters && filters.length > 0) {
        instantSearchInstance.sendEventToInsights({
          insightsMethod: 'clickedFilters',
          widgetType: connectRange_$$type,
          eventType: 'click',
          payload: {
            eventName: eventName,
            index: helper.getIndex(),
            filters: filters
          },
          attribute: attribute
        });
      }
    };

    var createSendEvent = function createSendEvent(instantSearchInstance, helper, currentRange) {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length === 1) {
          instantSearchInstance.sendEventToInsights(args[0]);
          return;
        }

        var eventType = args[0],
            facetValue = args[1],
            eventName = args[2];

        if (eventType !== 'click') {
          return;
        }

        var _facetValue = connectRange_slicedToArray(facetValue, 2),
            nextMin = _facetValue[0],
            nextMax = _facetValue[1];

        var refinedState = getRefinedState(helper, currentRange, nextMin, nextMax);
        sendEventWithRefinedState(refinedState, instantSearchInstance, helper, eventName);
      };
    };

    function _getCurrentRange(stats) {
      var min;

      if (Object(isFiniteNumber["a" /* default */])(minBound)) {
        min = minBound;
      } else if (Object(isFiniteNumber["a" /* default */])(stats.min)) {
        min = stats.min;
      } else {
        min = 0;
      }

      var max;

      if (Object(isFiniteNumber["a" /* default */])(maxBound)) {
        max = maxBound;
      } else if (Object(isFiniteNumber["a" /* default */])(stats.max)) {
        max = stats.max;
      } else {
        max = 0;
      }

      return toPrecision({
        min: min,
        max: max,
        precision: precision
      });
    }

    function _getCurrentRefinement(helper) {
      var _ref7 = helper.getNumericRefinement(attribute, '>=') || [],
          _ref8 = connectRange_slicedToArray(_ref7, 1),
          minValue = _ref8[0];

      var _ref9 = helper.getNumericRefinement(attribute, '<=') || [],
          _ref10 = connectRange_slicedToArray(_ref9, 1),
          maxValue = _ref10[0];

      var min = Object(isFiniteNumber["a" /* default */])(minValue) ? minValue : -Infinity;
      var max = Object(isFiniteNumber["a" /* default */])(maxValue) ? maxValue : Infinity;
      return [min, max];
    }

    function _refine(instantSearchInstance, helper, currentRange) {
      return function () {
        var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [undefined, undefined],
            _ref12 = connectRange_slicedToArray(_ref11, 2),
            nextMin = _ref12[0],
            nextMax = _ref12[1];

        var refinedState = getRefinedState(helper, currentRange, nextMin, nextMax);

        if (refinedState) {
          sendEventWithRefinedState(refinedState, instantSearchInstance, helper);
          helper.setState(refinedState).search();
        }
      };
    }

    return {
      $$type: connectRange_$$type,
      init: function init(initOptions) {
        renderFn(connectRange_objectSpread(connectRange_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(connectRange_objectSpread(connectRange_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectRange_objectSpread(connectRange_objectSpread({}, renderState), {}, {
          range: connectRange_objectSpread(connectRange_objectSpread({}, renderState.range), {}, connectRange_defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref13) {
        var results = _ref13.results,
            helper = _ref13.helper,
            instantSearchInstance = _ref13.instantSearchInstance;
        var facetsFromResults = results && results.disjunctiveFacets || [];
        var facet = Object(find["a" /* default */])(facetsFromResults, function (facetResult) {
          return facetResult.name === attribute;
        });
        var stats = facet && facet.stats || {
          min: undefined,
          max: undefined
        };

        var currentRange = _getCurrentRange(stats);

        var start = _getCurrentRefinement(helper);

        var refine;

        if (!results) {
          // On first render pass an empty range
          // to be able to bypass the validation
          // related to it
          refine = _refine(instantSearchInstance, helper, {
            min: undefined,
            max: undefined
          });
        } else {
          refine = _refine(instantSearchInstance, helper, currentRange);
        }

        return {
          refine: refine,
          canRefine: currentRange.min !== currentRange.max,
          format: rangeFormatter,
          range: currentRange,
          sendEvent: createSendEvent(instantSearchInstance, helper, currentRange),
          widgetParams: connectRange_objectSpread(connectRange_objectSpread({}, widgetParams), {}, {
            precision: precision
          }),
          start: start
        };
      },
      dispose: function dispose(_ref14) {
        var state = _ref14.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute).removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref15) {
        var searchParameters = _ref15.searchParameters;

        var _searchParameters$get = searchParameters.getNumericRefinements(attribute),
            _searchParameters$get2 = _searchParameters$get['>='],
            min = _searchParameters$get2 === void 0 ? [] : _searchParameters$get2,
            _searchParameters$get3 = _searchParameters$get['<='],
            max = _searchParameters$get3 === void 0 ? [] : _searchParameters$get3;

        if (min.length === 0 && max.length === 0) {
          return uiState;
        }

        return connectRange_objectSpread(connectRange_objectSpread({}, uiState), {}, {
          range: connectRange_objectSpread(connectRange_objectSpread({}, uiState.range), {}, connectRange_defineProperty({}, attribute, "".concat(min, ":").concat(max)))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref16) {
        var uiState = _ref16.uiState;
        var widgetSearchParameters = searchParameters.addDisjunctiveFacet(attribute).setQueryParameters({
          numericRefinements: connectRange_objectSpread(connectRange_objectSpread({}, searchParameters.numericRefinements), {}, connectRange_defineProperty({}, attribute, {}))
        });

        if (Object(isFiniteNumber["a" /* default */])(minBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '>=', minBound);
        }

        if (Object(isFiniteNumber["a" /* default */])(maxBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '<=', maxBound);
        }

        var value = uiState.range && uiState.range[attribute];

        if (!value || value.indexOf(':') === -1) {
          return widgetSearchParameters;
        }

        var _value$split$map = value.split(':').map(parseFloat),
            _value$split$map2 = connectRange_slicedToArray(_value$split$map, 2),
            lowerBound = _value$split$map2[0],
            upperBound = _value$split$map2[1];

        if (Object(isFiniteNumber["a" /* default */])(lowerBound) && (!Object(isFiniteNumber["a" /* default */])(minBound) || minBound < lowerBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, '>=');
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '>=', lowerBound);
        }

        if (Object(isFiniteNumber["a" /* default */])(upperBound) && (!Object(isFiniteNumber["a" /* default */])(maxBound) || upperBound < maxBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, '<=');
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '<=', upperBound);
        }

        return widgetSearchParameters;
      }
    };
  };
};

/* harmony default export */ var range_connectRange = (connectRange_connectRange);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/refinement-list/connectRefinementList.js
function connectRefinementList_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectRefinementList_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectRefinementList_ownKeys(Object(source), true).forEach(function (key) {
        connectRefinementList_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectRefinementList_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectRefinementList_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function connectRefinementList_objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = connectRefinementList_objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function connectRefinementList_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}


var connectRefinementList_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'refinement-list',
  connector: true
});
var connectRefinementList_DEFAULT_SORT = ['isRefined', 'count:desc', 'name:asc'];
/**
 * **RefinementList** connector provides the logic to build a custom widget that
 * will let the user filter the results based on the values of a specific facet.
 *
 * **Requirement:** the attribute passed as `attribute` must be present in
 * attributesForFaceting of the searched index.
 *
 * This connector provides:
 * - a `refine()` function to select an item.
 * - a `toggleShowMore()` function to display more or less items
 * - a `searchForItems()` function to search within the items.
 */

var connectRefinementList_connectRefinementList = function connectRefinementList(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectRefinementList_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        attribute = _ref.attribute,
        _ref$operator = _ref.operator,
        operator = _ref$operator === void 0 ? 'or' : _ref$operator,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? 10 : _ref$limit,
        _ref$showMore = _ref.showMore,
        showMore = _ref$showMore === void 0 ? false : _ref$showMore,
        _ref$showMoreLimit = _ref.showMoreLimit,
        showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
        _ref$sortBy = _ref.sortBy,
        sortBy = _ref$sortBy === void 0 ? connectRefinementList_DEFAULT_SORT : _ref$sortBy,
        _ref$escapeFacetValue = _ref.escapeFacetValues,
        escapeFacetValues = _ref$escapeFacetValue === void 0 ? true : _ref$escapeFacetValue,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (!attribute) {
      throw new Error(connectRefinementList_withUsage('The `attribute` option is required.'));
    }

    if (!/^(and|or)$/.test(operator)) {
      throw new Error(connectRefinementList_withUsage("The `operator` must one of: `\"and\"`, `\"or\"` (got \"".concat(operator, "\").")));
    }

    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(connectRefinementList_withUsage('`showMoreLimit` should be greater than `limit`.'));
    }

    var formatItems = function formatItems(_ref2) {
      var label = _ref2.name,
          item = connectRefinementList_objectWithoutProperties(_ref2, ["name"]);

      return connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, item), {}, {
        label: label,
        value: label,
        highlighted: label
      });
    };

    var lastResultsFromMainSearch;
    var lastItemsFromMainSearch = [];
    var hasExhaustiveItems = true;
    var triggerRefine;
    var sendEvent;
    var isShowingMore = false; // Provide the same function to the `renderFn` so that way the user
    // has to only bind it once when `isFirstRendering` for instance

    var toggleShowMore = function toggleShowMore() {};

    function cachedToggleShowMore() {
      toggleShowMore();
    }

    function createToggleShowMore(renderOptions, widget) {
      return function () {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }

    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }

    var searchForFacetValues = function searchForFacetValues() {
      return function () {};
    };

    var createSearchForFacetValues = function createSearchForFacetValues(helper, widget) {
      return function (renderOptions) {
        return function (query) {
          var instantSearchInstance = renderOptions.instantSearchInstance;

          if (query === '' && lastItemsFromMainSearch) {
            // render with previous data from the helper.
            renderFn(connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, widget.getWidgetRenderState(connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, renderOptions), {}, {
              results: lastResultsFromMainSearch
            }))), {}, {
              instantSearchInstance: instantSearchInstance
            }), false);
          } else {
            var tags = {
              highlightPreTag: escapeFacetValues ? escape_highlight["a" /* TAG_PLACEHOLDER */].highlightPreTag : escape_highlight["b" /* TAG_REPLACEMENT */].highlightPreTag,
              highlightPostTag: escapeFacetValues ? escape_highlight["a" /* TAG_PLACEHOLDER */].highlightPostTag : escape_highlight["b" /* TAG_REPLACEMENT */].highlightPostTag
            };
            helper.searchForFacetValues(attribute, query, // We cap the `maxFacetHits` value to 100 because the Algolia API
            // doesn't support a greater number.
            // See https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits/
            Math.min(getLimit(), 100), tags).then(function (results) {
              var facetValues = escapeFacetValues ? Object(escape_highlight["c" /* escapeFacets */])(results.facetHits) : results.facetHits;
              var normalizedFacetValues = transformItems(facetValues.map(function (_ref3) {
                var value = _ref3.value,
                    item = connectRefinementList_objectWithoutProperties(_ref3, ["value"]);

                return connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, item), {}, {
                  value: value,
                  label: value
                });
              }));
              renderFn(connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, widget.getWidgetRenderState(connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, renderOptions), {}, {
                results: lastResultsFromMainSearch
              }))), {}, {
                items: normalizedFacetValues,
                canToggleShowMore: false,
                canRefine: true,
                isFromSearch: true,
                instantSearchInstance: instantSearchInstance
              }), false);
            });
          }
        };
      };
    };

    return {
      $$type: 'ais.refinementList',
      init: function init(initOptions) {
        renderFn(connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, renderState), {}, {
          refinementList: connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, renderState.refinementList), {}, connectRefinementList_defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var results = renderOptions.results,
            state = renderOptions.state,
            _createURL = renderOptions.createURL,
            instantSearchInstance = renderOptions.instantSearchInstance,
            helper = renderOptions.helper;
        var items = [];
        var facetValues = [];

        if (!sendEvent || !triggerRefine || !searchForFacetValues) {
          sendEvent = Object(createSendEventForFacet["a" /* createSendEventForFacet */])({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            attribute: attribute,
            widgetType: this.$$type
          });

          triggerRefine = function triggerRefine(facetValue) {
            sendEvent('click', facetValue);
            helper.toggleFacetRefinement(attribute, facetValue).search();
          };

          searchForFacetValues = createSearchForFacetValues(helper, this);
        }

        if (results) {
          var values = results.getFacetValues(attribute, {
            sortBy: sortBy,
            facetOrdering: sortBy === connectRefinementList_DEFAULT_SORT
          });
          facetValues = values && Array.isArray(values) ? values : [];
          items = transformItems(facetValues.slice(0, getLimit()).map(formatItems));
          var maxValuesPerFacetConfig = state.maxValuesPerFacet;
          var currentLimit = getLimit(); // If the limit is the max number of facet retrieved it is impossible to know
          // if the facets are exhaustive. The only moment we are sure it is exhaustive
          // is when it is strictly under the number requested unless we know that another
          // widget has requested more values (maxValuesPerFacet > getLimit()).
          // Because this is used for making the search of facets unable or not, it is important
          // to be conservative here.

          hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
          lastResultsFromMainSearch = results;
          lastItemsFromMainSearch = items;

          if (renderOptions.results) {
            toggleShowMore = createToggleShowMore(renderOptions, this);
          }
        } // Do not mistake searchForFacetValues and searchFacetValues which is the actual search
        // function


        var searchFacetValues = searchForFacetValues && searchForFacetValues(renderOptions);
        var canShowLess = isShowingMore && lastItemsFromMainSearch.length > limit;
        var canShowMore = showMore && !hasExhaustiveItems;
        var canToggleShowMore = canShowLess || canShowMore;
        return {
          createURL: function createURL(facetValue) {
            return _createURL(state.resetPage().toggleFacetRefinement(attribute, facetValue));
          },
          items: items,
          refine: triggerRefine,
          searchForItems: searchFacetValues,
          isFromSearch: false,
          canRefine: items.length > 0,
          widgetParams: widgetParams,
          isShowingMore: isShowingMore,
          canToggleShowMore: canToggleShowMore,
          toggleShowMore: cachedToggleShowMore,
          sendEvent: sendEvent,
          hasExhaustiveItems: hasExhaustiveItems
        };
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        var withoutMaxValuesPerFacet = state.setQueryParameter('maxValuesPerFacet', undefined);

        if (operator === 'and') {
          return withoutMaxValuesPerFacet.removeFacet(attribute);
        }

        return withoutMaxValuesPerFacet.removeDisjunctiveFacet(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = operator === 'or' ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);

        if (!values.length) {
          return uiState;
        }

        return connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, uiState), {}, {
          refinementList: connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, uiState.refinementList), {}, connectRefinementList_defineProperty({}, attribute, values))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var isDisjunctive = operator === 'or';
        var values = uiState.refinementList && uiState.refinementList[attribute];
        var withoutRefinements = searchParameters.clearRefinements(attribute);
        var withFacetConfiguration = isDisjunctive ? withoutRefinements.addDisjunctiveFacet(attribute) : withoutRefinements.addFacet(attribute);
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);

        if (!values) {
          var key = isDisjunctive ? 'disjunctiveFacetsRefinements' : 'facetsRefinements';
          return withMaxValuesPerFacet.setQueryParameters(connectRefinementList_defineProperty({}, key, connectRefinementList_objectSpread(connectRefinementList_objectSpread({}, withMaxValuesPerFacet[key]), {}, connectRefinementList_defineProperty({}, attribute, []))));
        }

        return values.reduce(function (parameters, value) {
          return isDisjunctive ? parameters.addDisjunctiveFacetRefinement(attribute, value) : parameters.addFacetRefinement(attribute, value);
        }, withMaxValuesPerFacet);
      }
    };
  };
};

/* harmony default export */ var refinement_list_connectRefinementList = (connectRefinementList_connectRefinementList);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js
function connectSearchBox_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectSearchBox_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectSearchBox_ownKeys(Object(source), true).forEach(function (key) {
        connectSearchBox_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectSearchBox_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectSearchBox_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectSearchBox_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'search-box',
  connector: true
});
/**
 * **SearchBox** connector provides the logic to build a widget that will let the user search for a query.
 *
 * The connector provides to the rendering: `refine()` to set the query. The behaviour of this function
 * may be impacted by the `queryHook` widget parameter.
 */

var connectSearchBox_connectSearchBox = function connectSearchBox(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectSearchBox_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        queryHook = _ref.queryHook;

    function clear(helper) {
      return function () {
        helper.setQuery('').search();
      };
    }

    var _refine;

    var _clear = function _clear() {};

    function _cachedClear() {
      _clear();
    }

    return {
      $$type: 'ais.searchBox',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectSearchBox_objectSpread(connectSearchBox_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectSearchBox_objectSpread(connectSearchBox_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state.setQueryParameter('query', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectSearchBox_objectSpread(connectSearchBox_objectSpread({}, renderState), {}, {
          searchBox: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var helper = _ref3.helper,
            searchMetadata = _ref3.searchMetadata;

        if (!_refine) {
          var setQueryAndSearch = function setQueryAndSearch(query) {
            if (query !== helper.state.query) {
              helper.setQuery(query).search();
            }
          };

          _refine = function _refine(query) {
            if (queryHook) {
              queryHook(query, setQueryAndSearch);
              return;
            }

            setQueryAndSearch(query);
          };
        }

        _clear = clear(helper);
        return {
          query: helper.state.query || '',
          refine: _refine,
          clear: _cachedClear,
          widgetParams: widgetParams,
          isSearchStalled: searchMetadata.isSearchStalled
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var query = searchParameters.query || '';

        if (query === '' || uiState && uiState.query === query) {
          return uiState;
        }

        return connectSearchBox_objectSpread(connectSearchBox_objectSpread({}, uiState), {}, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter('query', uiState.query || '');
      }
    };
  };
};

/* harmony default export */ var search_box_connectSearchBox = (connectSearchBox_connectSearchBox);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/sort-by/connectSortBy.js
function connectSortBy_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectSortBy_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectSortBy_ownKeys(Object(source), true).forEach(function (key) {
        connectSortBy_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectSortBy_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectSortBy_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectSortBy_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'sort-by',
  connector: true
});
/**
 * The **SortBy** connector provides the logic to build a custom widget that will display a
 * list of indices. With Algolia, this is most commonly used for changing ranking strategy. This allows
 * a user to change how the hits are being sorted.
 */

var connectSortBy_connectSortBy = function connectSortBy(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectSortBy_withUsage());
  var connectorState = {};
  return function (widgetParams) {
    var _ref = widgetParams || {},
        items = _ref.items,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (x) {
      return x;
    } : _ref$transformItems;

    if (!Array.isArray(items)) {
      throw new Error(connectSortBy_withUsage('The `items` option expects an array of objects.'));
    }

    return {
      $$type: 'ais.sortBy',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(initOptions);
        var currentIndex = widgetRenderState.currentRefinement;
        var isCurrentIndexInItems = Object(find["a" /* default */])(items, function (item) {
          return item.value === currentIndex;
        });
         false ? undefined : void 0;
        renderFn(connectSortBy_objectSpread(connectSortBy_objectSpread({}, widgetRenderState), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectSortBy_objectSpread(connectSortBy_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return connectorState.initialIndex ? state.setIndex(connectorState.initialIndex) : state;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectSortBy_objectSpread(connectSortBy_objectSpread({}, renderState), {}, {
          sortBy: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var results = _ref3.results,
            helper = _ref3.helper,
            parent = _ref3.parent;

        if (!connectorState.initialIndex && parent) {
          connectorState.initialIndex = parent.getIndexName();
        }

        if (!connectorState.setIndex) {
          connectorState.setIndex = function (indexName) {
            helper.setIndex(indexName).search();
          };
        }

        return {
          currentRefinement: helper.state.index,
          options: transformItems(items),
          refine: connectorState.setIndex,
          hasNoResults: results ? results.nbHits === 0 : true,
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var currentIndex = searchParameters.index;
        return connectSortBy_objectSpread(connectSortBy_objectSpread({}, uiState), {}, {
          sortBy: currentIndex !== connectorState.initialIndex ? currentIndex : undefined
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter('index', uiState.sortBy || connectorState.initialIndex || searchParameters.index);
      }
    };
  };
};

/* harmony default export */ var sort_by_connectSortBy = (connectSortBy_connectSortBy);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/rating-menu/connectRatingMenu.js
function connectRatingMenu_toConsumableArray(arr) {
  return connectRatingMenu_arrayWithoutHoles(arr) || connectRatingMenu_iterableToArray(arr) || connectRatingMenu_unsupportedIterableToArray(arr) || connectRatingMenu_nonIterableSpread();
}

function connectRatingMenu_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectRatingMenu_iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function connectRatingMenu_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return connectRatingMenu_arrayLikeToArray(arr);
}

function connectRatingMenu_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectRatingMenu_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectRatingMenu_ownKeys(Object(source), true).forEach(function (key) {
        connectRatingMenu_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectRatingMenu_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectRatingMenu_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function connectRatingMenu_slicedToArray(arr, i) {
  return connectRatingMenu_arrayWithHoles(arr) || connectRatingMenu_iterableToArrayLimit(arr, i) || connectRatingMenu_unsupportedIterableToArray(arr, i) || connectRatingMenu_nonIterableRest();
}

function connectRatingMenu_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectRatingMenu_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectRatingMenu_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectRatingMenu_arrayLikeToArray(o, minLen);
}

function connectRatingMenu_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function connectRatingMenu_iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function connectRatingMenu_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}


var connectRatingMenu_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'rating-menu',
  connector: true
});
var connectRatingMenu_$$type = 'ais.ratingMenu';
var MAX_VALUES_PER_FACET_API_LIMIT = 1000;
var STEP = 1;

var connectRatingMenu_createSendEvent = function createSendEvent(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      getRefinedStar = _ref.getRefinedStar,
      attribute = _ref.attribute;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }

    var eventType = args[0],
        facetValue = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;

    if (eventType !== 'click') {
      return;
    }

    var isRefined = getRefinedStar() === Number(facetValue);

    if (!isRefined) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: 'clickedFilters',
        widgetType: connectRatingMenu_$$type,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: helper.getIndex(),
          filters: ["".concat(attribute, ">=").concat(facetValue)]
        },
        attribute: attribute
      });
    }
  };
};
/**
 * **StarRating** connector provides the logic to build a custom widget that will let
 * the user refine search results based on ratings.
 *
 * The connector provides to the rendering: `refine()` to select a value and
 * `items` that are the values that can be selected. `refine` should be used
 * with `items.value`.
 */


var connectRatingMenu_connectRatingMenu = function connectRatingMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectRatingMenu_withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        attribute = _ref2.attribute,
        _ref2$max = _ref2.max,
        max = _ref2$max === void 0 ? 5 : _ref2$max;

    var sendEvent;

    if (!attribute) {
      throw new Error(connectRatingMenu_withUsage('The `attribute` option is required.'));
    }

    var _getRefinedStar = function getRefinedStar(state) {
      var _values$;

      var values = state.getNumericRefinements(attribute);

      if (!((_values$ = values['>=']) !== null && _values$ !== void 0 && _values$.length)) {
        return undefined;
      }

      return values['>='][0];
    };

    var getFacetsMaxDecimalPlaces = function getFacetsMaxDecimalPlaces(facetResults) {
      var maxDecimalPlaces = 0;
      facetResults.forEach(function (facetResult) {
        var _facetResult$name$spl = facetResult.name.split('.'),
            _facetResult$name$spl2 = connectRatingMenu_slicedToArray(_facetResult$name$spl, 2),
            _facetResult$name$spl3 = _facetResult$name$spl2[1],
            decimal = _facetResult$name$spl3 === void 0 ? '' : _facetResult$name$spl3;

        maxDecimalPlaces = Math.max(maxDecimalPlaces, decimal.length);
      });
      return maxDecimalPlaces;
    };

    var getFacetValuesWarningMessage = function getFacetValuesWarningMessage(_ref3) {
      var maxDecimalPlaces = _ref3.maxDecimalPlaces,
          maxFacets = _ref3.maxFacets,
          maxValuesPerFacet = _ref3.maxValuesPerFacet;
      var maxDecimalPlacesInRange = Math.max(0, Math.floor(Math.log10(MAX_VALUES_PER_FACET_API_LIMIT / max)));
      var maxFacetsInRange = Math.min(MAX_VALUES_PER_FACET_API_LIMIT, Math.pow(10, maxDecimalPlacesInRange) * max);
      var solutions = [];

      if (maxFacets > MAX_VALUES_PER_FACET_API_LIMIT) {
        solutions.push("- Update your records to lower the precision of the values in the \"".concat(attribute, "\" attribute (for example: ").concat(5.123456789.toPrecision(maxDecimalPlaces + 1), " to ").concat(5.123456789.toPrecision(maxDecimalPlacesInRange + 1), ")"));
      }

      if (maxValuesPerFacet < maxFacetsInRange) {
        solutions.push("- Increase the maximum number of facet values to ".concat(maxFacetsInRange, " using the \"configure\" widget ").concat(Object(documentation["a" /* createDocumentationLink */])({
          name: 'configure'
        }), " and the \"maxValuesPerFacet\" parameter https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/"));
      }

      return "The ".concat(attribute, " attribute can have ").concat(maxFacets, " different values (0 to ").concat(max, " with a maximum of ").concat(maxDecimalPlaces, " decimals = ").concat(maxFacets, ") but you retrieved only ").concat(maxValuesPerFacet, " facet values. Therefore the number of results that match the refinements can be incorrect.\n    ").concat(solutions.length ? "To resolve this problem you can:\n".concat(solutions.join('\n')) : "");
    };

    function getRefinedState(state, facetValue) {
      var isRefined = _getRefinedStar(state) === Number(facetValue);
      var emptyState = state.resetPage().removeNumericRefinement(attribute);

      if (!isRefined) {
        return emptyState.addNumericRefinement(attribute, '<=', max).addNumericRefinement(attribute, '>=', Number(facetValue));
      }

      return emptyState;
    }

    var toggleRefinement = function toggleRefinement(helper, facetValue) {
      sendEvent('click', facetValue);
      helper.setState(getRefinedState(helper.state, facetValue)).search();
    };

    var connectorState = {
      toggleRefinementFactory: function toggleRefinementFactory(helper) {
        return toggleRefinement.bind(null, helper);
      },
      createURLFactory: function createURLFactory(_ref4) {
        var state = _ref4.state,
            createURL = _ref4.createURL;
        return function (value) {
          return createURL(getRefinedState(state, value));
        };
      }
    };
    return {
      $$type: connectRatingMenu_$$type,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectRatingMenu_objectSpread(connectRatingMenu_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectRatingMenu_objectSpread(connectRatingMenu_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectRatingMenu_objectSpread(connectRatingMenu_objectSpread({}, renderState), {}, {
          ratingMenu: connectRatingMenu_objectSpread(connectRatingMenu_objectSpread({}, renderState.ratingMenu), {}, connectRatingMenu_defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref5) {
        var helper = _ref5.helper,
            results = _ref5.results,
            state = _ref5.state,
            instantSearchInstance = _ref5.instantSearchInstance,
            createURL = _ref5.createURL;
        var facetValues = [];

        if (!sendEvent) {
          sendEvent = connectRatingMenu_createSendEvent({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            getRefinedStar: function getRefinedStar() {
              return _getRefinedStar(helper.state);
            },
            attribute: attribute
          });
        }

        if (results) {
          var facetResults = results.getFacetValues(attribute, {});
          var maxValuesPerFacet = facetResults.length;
          var maxDecimalPlaces = getFacetsMaxDecimalPlaces(facetResults);
          var maxFacets = Math.pow(10, maxDecimalPlaces) * max;
           false ? undefined : void 0;

          var refinedStar = _getRefinedStar(state);

          var _loop = function _loop(star) {
            var isRefined = refinedStar === star;
            var count = facetResults.filter(function (f) {
              return Number(f.name) >= star && Number(f.name) <= max;
            }).map(function (f) {
              return f.count;
            }).reduce(function (sum, current) {
              return sum + current;
            }, 0);

            if (refinedStar && !isRefined && count === 0) {
              // skip count==0 when at least 1 refinement is enabled
              // eslint-disable-next-line no-continue
              return "continue";
            }

            var stars = connectRatingMenu_toConsumableArray(new Array(Math.floor(max / STEP))).map(function (_v, i) {
              return i * STEP < star;
            });

            facetValues.push({
              stars: stars,
              name: String(star),
              label: String(star),
              value: String(star),
              count: count,
              isRefined: isRefined
            });
          };

          for (var star = STEP; star < max; star += STEP) {
            var _ret = _loop(star);

            if (_ret === "continue") continue;
          }
        }

        facetValues = facetValues.reverse();
        return {
          items: facetValues,
          hasNoResults: results ? results.nbHits === 0 : true,
          canRefine: facetValues.length > 0,
          refine: connectorState.toggleRefinementFactory(helper),
          sendEvent: sendEvent,
          createURL: connectorState.createURLFactory({
            state: state,
            createURL: createURL
          }),
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref6) {
        var state = _ref6.state;
        unmountFn();
        return state.removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref7) {
        var searchParameters = _ref7.searchParameters;

        var value = _getRefinedStar(searchParameters);

        if (typeof value !== 'number') {
          return uiState;
        }

        return connectRatingMenu_objectSpread(connectRatingMenu_objectSpread({}, uiState), {}, {
          ratingMenu: connectRatingMenu_objectSpread(connectRatingMenu_objectSpread({}, uiState.ratingMenu), {}, connectRatingMenu_defineProperty({}, attribute, value))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref8) {
        var uiState = _ref8.uiState;
        var value = uiState.ratingMenu && uiState.ratingMenu[attribute];
        var withoutRefinements = searchParameters.clearRefinements(attribute);
        var withDisjunctiveFacet = withoutRefinements.addDisjunctiveFacet(attribute);

        if (!value) {
          return withDisjunctiveFacet.setQueryParameters({
            numericRefinements: connectRatingMenu_objectSpread(connectRatingMenu_objectSpread({}, withDisjunctiveFacet.numericRefinements), {}, connectRatingMenu_defineProperty({}, attribute, {}))
          });
        }

        return withDisjunctiveFacet.addNumericRefinement(attribute, '<=', max).addNumericRefinement(attribute, '>=', value);
      }
    };
  };
};

/* harmony default export */ var rating_menu_connectRatingMenu = (connectRatingMenu_connectRatingMenu);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/stats/connectStats.js
function connectStats_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectStats_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectStats_ownKeys(Object(source), true).forEach(function (key) {
        connectStats_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectStats_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectStats_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectStats_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'stats',
  connector: true
});
/**
 * **Stats** connector provides the logic to build a custom widget that will displays
 * search statistics (hits number and processing time).
 */

var connectStats_connectStats = function connectStats(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectStats_withUsage());
  return function (widgetParams) {
    return {
      $$type: 'ais.stats',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectStats_objectSpread(connectStats_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectStats_objectSpread(connectStats_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectStats_objectSpread(connectStats_objectSpread({}, renderState), {}, {
          stats: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref) {
        var results = _ref.results,
            helper = _ref.helper;

        if (!results) {
          return {
            hitsPerPage: helper.state.hitsPerPage,
            nbHits: 0,
            nbSortedHits: undefined,
            areHitsSorted: false,
            nbPages: 0,
            page: helper.state.page || 0,
            processingTimeMS: -1,
            query: helper.state.query || '',
            widgetParams: widgetParams
          };
        }

        return {
          hitsPerPage: results.hitsPerPage,
          nbHits: results.nbHits,
          nbSortedHits: results.nbSortedHits,
          areHitsSorted: typeof results.appliedRelevancyStrictness !== 'undefined' && results.appliedRelevancyStrictness > 0 && results.nbSortedHits !== results.nbHits,
          nbPages: results.nbPages,
          page: results.page,
          processingTimeMS: results.processingTimeMS,
          query: results.query,
          widgetParams: widgetParams
        };
      }
    };
  };
};

/* harmony default export */ var stats_connectStats = (connectStats_connectStats);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/toArray.js
var toArray = __webpack_require__(300);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/escapeRefinement.js
var escapeRefinement = __webpack_require__(301);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/unescapeRefinement.js
var unescapeRefinement = __webpack_require__(269);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/toggle-refinement/connectToggleRefinement.js
function connectToggleRefinement_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectToggleRefinement_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectToggleRefinement_ownKeys(Object(source), true).forEach(function (key) {
        connectToggleRefinement_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectToggleRefinement_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectToggleRefinement_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectToggleRefinement_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'toggle-refinement',
  connector: true
});
var connectToggleRefinement_$$type = 'ais.toggleRefinement';

var connectToggleRefinement_createSendEvent = function createSendEvent(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      attribute = _ref.attribute,
      on = _ref.on;

  var sendEventForToggle = function sendEventForToggle() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }

    var eventType = args[0],
        isRefined = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;

    if (eventType !== 'click' || on === undefined) {
      return;
    } // only send an event when the refinement gets applied,
    // not when it gets removed


    if (!isRefined) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: 'clickedFilters',
        widgetType: connectToggleRefinement_$$type,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: helper.getIndex(),
          filters: on.map(function (value) {
            return "".concat(attribute, ":").concat(value);
          })
        },
        attribute: attribute
      });
    }
  };

  return sendEventForToggle;
};
/**
 * **Toggle** connector provides the logic to build a custom widget that will provide
 * an on/off filtering feature based on an attribute value or values.
 *
 * Two modes are implemented in the custom widget:
 *  - with or without the value filtered
 *  - switch between two values.
 */


var connectToggleRefinement_connectToggleRefinement = function connectToggleRefinement(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectToggleRefinement_withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        attribute = _ref2.attribute,
        _ref2$on = _ref2.on,
        userOn = _ref2$on === void 0 ? true : _ref2$on,
        userOff = _ref2.off;

    if (!attribute) {
      throw new Error(connectToggleRefinement_withUsage('The `attribute` option is required.'));
    }

    var hasAnOffValue = userOff !== undefined;
    var on = Object(toArray["a" /* default */])(userOn).map(escapeRefinement["a" /* default */]);
    var off = hasAnOffValue ? Object(toArray["a" /* default */])(userOff).map(escapeRefinement["a" /* default */]) : undefined;
    var sendEvent;

    var toggleRefinementFactory = function toggleRefinementFactory(helper) {
      return function () {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          isRefined: false
        },
            isRefined = _ref3.isRefined;

        if (!isRefined) {
          sendEvent('click', isRefined);

          if (hasAnOffValue) {
            off.forEach(function (v) {
              return helper.removeDisjunctiveFacetRefinement(attribute, v);
            });
          }

          on.forEach(function (v) {
            return helper.addDisjunctiveFacetRefinement(attribute, v);
          });
        } else {
          on.forEach(function (v) {
            return helper.removeDisjunctiveFacetRefinement(attribute, v);
          });

          if (hasAnOffValue) {
            off.forEach(function (v) {
              return helper.addDisjunctiveFacetRefinement(attribute, v);
            });
          }
        }

        helper.search();
      };
    };

    var connectorState = {
      createURLFactory: function createURLFactory(isRefined, _ref4) {
        var state = _ref4.state,
            createURL = _ref4.createURL;
        return function () {
          state = state.resetPage();
          var valuesToRemove = isRefined ? on : off;

          if (valuesToRemove) {
            valuesToRemove.forEach(function (v) {
              state = state.removeDisjunctiveFacetRefinement(attribute, v);
            });
          }

          var valuesToAdd = isRefined ? off : on;

          if (valuesToAdd) {
            valuesToAdd.forEach(function (v) {
              state = state.addDisjunctiveFacetRefinement(attribute, v);
            });
          }

          return createURL(state);
        };
      }
    };
    return {
      $$type: connectToggleRefinement_$$type,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectToggleRefinement_objectSpread(connectToggleRefinement_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectToggleRefinement_objectSpread(connectToggleRefinement_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref5) {
        var state = _ref5.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectToggleRefinement_objectSpread(connectToggleRefinement_objectSpread({}, renderState), {}, {
          toggleRefinement: connectToggleRefinement_objectSpread(connectToggleRefinement_objectSpread({}, renderState.toggleRefinement), {}, connectToggleRefinement_defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var state = _ref6.state,
            helper = _ref6.helper,
            results = _ref6.results,
            createURL = _ref6.createURL,
            instantSearchInstance = _ref6.instantSearchInstance;
        var isRefined = results ? on.every(function (v) {
          return helper.state.isDisjunctiveFacetRefined(attribute, v);
        }) : on.every(function (v) {
          return state.isDisjunctiveFacetRefined(attribute, v);
        });
        var onFacetValue = {
          isRefined: isRefined,
          count: 0
        };
        var offFacetValue = {
          isRefined: hasAnOffValue && !isRefined,
          count: 0
        };

        if (results) {
          var offValue = Object(toArray["a" /* default */])(off || false);
          var allFacetValues = results.getFacetValues(attribute, {}) || [];
          var onData = on.map(function (v) {
            return Object(find["a" /* default */])(allFacetValues, function (_ref7) {
              var name = _ref7.name;
              return name === Object(unescapeRefinement["a" /* default */])(v);
            });
          }).filter(function (v) {
            return v !== undefined;
          });
          var offData = hasAnOffValue ? offValue.map(function (v) {
            return Object(find["a" /* default */])(allFacetValues, function (_ref8) {
              var name = _ref8.name;
              return name === Object(unescapeRefinement["a" /* default */])(v);
            });
          }).filter(function (v) {
            return v !== undefined;
          }) : [];
          onFacetValue = {
            isRefined: onData.length ? onData.every(function (v) {
              return v.isRefined;
            }) : false,
            count: onData.reduce(function (acc, v) {
              return acc + v.count;
            }, 0) || null
          };
          offFacetValue = {
            isRefined: offData.length ? offData.every(function (v) {
              return v.isRefined;
            }) : false,
            count: offData.reduce(function (acc, v) {
              return acc + v.count;
            }, 0) || allFacetValues.reduce(function (total, _ref9) {
              var count = _ref9.count;
              return total + count;
            }, 0)
          };
        }

        if (!sendEvent) {
          sendEvent = connectToggleRefinement_createSendEvent({
            instantSearchInstance: instantSearchInstance,
            attribute: attribute,
            on: on,
            helper: helper
          });
        }

        var nextRefinement = isRefined ? offFacetValue : onFacetValue;
        return {
          value: {
            name: attribute,
            isRefined: isRefined,
            count: results ? nextRefinement.count : null,
            onFacetValue: onFacetValue,
            offFacetValue: offFacetValue
          },
          createURL: connectorState.createURLFactory(isRefined, {
            state: state,
            createURL: createURL
          }),
          sendEvent: sendEvent,
          canRefine: Boolean(results ? nextRefinement.count : null),
          refine: toggleRefinementFactory(helper),
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref10) {
        var searchParameters = _ref10.searchParameters;
        var isRefined = on && on.every(function (v) {
          return searchParameters.isDisjunctiveFacetRefined(attribute, v);
        });

        if (!isRefined) {
          return uiState;
        }

        return connectToggleRefinement_objectSpread(connectToggleRefinement_objectSpread({}, uiState), {}, {
          toggle: connectToggleRefinement_objectSpread(connectToggleRefinement_objectSpread({}, uiState.toggle), {}, connectToggleRefinement_defineProperty({}, attribute, isRefined))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref11) {
        var uiState = _ref11.uiState;
        var withFacetConfiguration = searchParameters.clearRefinements(attribute).addDisjunctiveFacet(attribute);
        var isRefined = Boolean(uiState.toggle && uiState.toggle[attribute]);

        if (isRefined) {
          if (on) {
            on.forEach(function (v) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v);
            });
          }

          return withFacetConfiguration;
        } // It's not refined with an `off` value


        if (hasAnOffValue) {
          if (off) {
            off.forEach(function (v) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v);
            });
          }

          return withFacetConfiguration;
        } // It's not refined without an `off` value


        return withFacetConfiguration.setQueryParameters({
          disjunctiveFacetsRefinements: connectToggleRefinement_objectSpread(connectToggleRefinement_objectSpread({}, searchParameters.disjunctiveFacetsRefinements), {}, connectToggleRefinement_defineProperty({}, attribute, []))
        });
      }
    };
  };
};

/* harmony default export */ var toggle_refinement_connectToggleRefinement = (connectToggleRefinement_connectToggleRefinement);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/breadcrumb/connectBreadcrumb.js
function connectBreadcrumb_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectBreadcrumb_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectBreadcrumb_ownKeys(Object(source), true).forEach(function (key) {
        connectBreadcrumb_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectBreadcrumb_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectBreadcrumb_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function connectBreadcrumb_slicedToArray(arr, i) {
  return connectBreadcrumb_arrayWithHoles(arr) || connectBreadcrumb_iterableToArrayLimit(arr, i) || connectBreadcrumb_unsupportedIterableToArray(arr, i) || connectBreadcrumb_nonIterableRest();
}

function connectBreadcrumb_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectBreadcrumb_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectBreadcrumb_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectBreadcrumb_arrayLikeToArray(o, minLen);
}

function connectBreadcrumb_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function connectBreadcrumb_iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function connectBreadcrumb_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}


var connectBreadcrumb_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'breadcrumb',
  connector: true
});

var connectBreadcrumb_connectBreadcrumb = function connectBreadcrumb(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectBreadcrumb_withUsage());
  var connectorState = {};
  return function (widgetParams) {
    var _ref = widgetParams || {},
        attributes = _ref.attributes,
        _ref$separator = _ref.separator,
        separator = _ref$separator === void 0 ? ' > ' : _ref$separator,
        _ref$rootPath = _ref.rootPath,
        rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(connectBreadcrumb_withUsage('The `attributes` option expects an array of strings.'));
    }

    var _attributes = connectBreadcrumb_slicedToArray(attributes, 1),
        hierarchicalFacetName = _attributes[0];

    function getRefinedState(state, facetValue) {
      if (!facetValue) {
        var breadcrumb = state.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);

        if (breadcrumb.length > 0) {
          return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, breadcrumb[0]);
        }
      }

      return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue);
    }

    return {
      $$type: 'ais.breadcrumb',
      init: function init(initOptions) {
        renderFn(connectBreadcrumb_objectSpread(connectBreadcrumb_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(connectBreadcrumb_objectSpread(connectBreadcrumb_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectBreadcrumb_objectSpread(connectBreadcrumb_objectSpread({}, renderState), {}, {
          breadcrumb: connectBreadcrumb_objectSpread(connectBreadcrumb_objectSpread({}, renderState.breadcrumb), {}, connectBreadcrumb_defineProperty({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var helper = _ref2.helper,
            createURL = _ref2.createURL,
            results = _ref2.results,
            state = _ref2.state;

        function getItems() {
          if (!results) {
            return [];
          }

          var _state$hierarchicalFa = connectBreadcrumb_slicedToArray(state.hierarchicalFacets, 1),
              facetName = _state$hierarchicalFa[0].name;

          var facetValues = results.getFacetValues(facetName, {});
          var data = Array.isArray(facetValues.data) ? facetValues.data : [];
          var items = transformItems(shiftItemsValues(connectBreadcrumb_prepareItems(data)));
          return items;
        }

        var items = getItems();

        if (!connectorState.createURL) {
          connectorState.createURL = function (facetValue) {
            return createURL(getRefinedState(helper.state, facetValue));
          };
        }

        if (!connectorState.refine) {
          connectorState.refine = function (facetValue) {
            helper.setState(getRefinedState(helper.state, facetValue)).search();
          };
        }

        return {
          canRefine: items.length > 0,
          createURL: connectorState.createURL,
          items: items,
          refine: connectorState.refine,
          widgetParams: widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters) {
        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
           false ? undefined : void 0;
          return searchParameters;
        }

        return searchParameters.addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes: attributes,
          separator: separator,
          rootPath: rootPath
        });
      }
    };
  };
};

function connectBreadcrumb_prepareItems(data) {
  return data.reduce(function (result, currentItem) {
    if (currentItem.isRefined) {
      result.push({
        label: currentItem.name,
        value: currentItem.path
      });

      if (Array.isArray(currentItem.data)) {
        result = result.concat(connectBreadcrumb_prepareItems(currentItem.data));
      }
    }

    return result;
  }, []);
}

function shiftItemsValues(array) {
  return array.map(function (x, idx) {
    return {
      label: x.label,
      value: idx + 1 === array.length ? null : array[idx + 1].value
    };
  });
}

/* harmony default export */ var breadcrumb_connectBreadcrumb = (connectBreadcrumb_connectBreadcrumb);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/geo-search.js
var geo_search = __webpack_require__(274);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/geo-search/connectGeoSearch.js
function connectGeoSearch_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectGeoSearch_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectGeoSearch_ownKeys(Object(source), true).forEach(function (key) {
        connectGeoSearch_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectGeoSearch_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectGeoSearch_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectGeoSearch_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'geo-search',
  connector: true
}); // in this connector, we assume insideBoundingBox is only a string,
// even though in the helper it's defined as number[][] alone.
// This can be done, since the connector assumes "control" of the parameter

function getBoundingBoxAsString(state) {
  return state.insideBoundingBox || '';
}

function setBoundingBoxAsString(state, value) {
  return state.setQueryParameter('insideBoundingBox', value);
}

var connectGeoSearch_$$type = 'ais.geoSearch';
/**
 * The **GeoSearch** connector provides the logic to build a widget that will display the results on a map. It also provides a way to search for results based on their position. The connector provides functions to manage the search experience (search on map interaction or control the interaction for example).
 *
 * @requirements
 *
 * Note that the GeoSearch connector uses the [geosearch](https://www.algolia.com/doc/guides/searching/geo-search) capabilities of Algolia. Your hits **must** have a `_geoloc` attribute in order to be passed to the rendering function.
 *
 * Currently, the feature is not compatible with multiple values in the _geoloc attribute.
 */

var connectGeoSearch_connectGeoSearch = function connectGeoSearch(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectGeoSearch_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        _ref$enableRefineOnMa = _ref.enableRefineOnMapMove,
        enableRefineOnMapMove = _ref$enableRefineOnMa === void 0 ? true : _ref$enableRefineOnMa,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    var widgetState = {
      isRefineOnMapMove: enableRefineOnMapMove,
      // @MAJOR hasMapMoveSinceLastRefine -> hasMapMovedSinceLastRefine
      hasMapMoveSinceLastRefine: false,
      lastRefinePosition: '',
      lastRefineBoundingBox: '',
      internalToggleRefineOnMapMove: noop["a" /* default */],
      internalSetMapMoveSinceLastRefine: noop["a" /* default */]
    };

    var getPositionFromState = function getPositionFromState(state) {
      return state.aroundLatLng ? Object(geo_search["a" /* aroundLatLngToPosition */])(state.aroundLatLng) : undefined;
    };

    var getCurrentRefinementFromState = function getCurrentRefinementFromState(state) {
      return state.insideBoundingBox && Object(geo_search["b" /* insideBoundingBoxToBoundingBox */])(state.insideBoundingBox);
    };

    var refine = function refine(helper) {
      return function (_ref2) {
        var ne = _ref2.northEast,
            sw = _ref2.southWest;
        var boundingBox = [ne.lat, ne.lng, sw.lat, sw.lng].join();
        helper.setState(setBoundingBoxAsString(helper.state, boundingBox).resetPage()).search();
        widgetState.hasMapMoveSinceLastRefine = false;
        widgetState.lastRefineBoundingBox = boundingBox;
      };
    };

    var clearMapRefinement = function clearMapRefinement(helper) {
      return function () {
        helper.setQueryParameter('insideBoundingBox', undefined).search();
      };
    };

    var isRefinedWithMap = function isRefinedWithMap(state) {
      return function () {
        return Boolean(state.insideBoundingBox);
      };
    };

    var toggleRefineOnMapMove = function toggleRefineOnMapMove() {
      return widgetState.internalToggleRefineOnMapMove();
    };

    var createInternalToggleRefinementOnMapMove = function createInternalToggleRefinementOnMapMove(renderOptions, render) {
      return function () {
        widgetState.isRefineOnMapMove = !widgetState.isRefineOnMapMove;
        render(renderOptions);
      };
    };

    var isRefineOnMapMove = function isRefineOnMapMove() {
      return widgetState.isRefineOnMapMove;
    };

    var setMapMoveSinceLastRefine = function setMapMoveSinceLastRefine() {
      return widgetState.internalSetMapMoveSinceLastRefine();
    };

    var createInternalSetMapMoveSinceLastRefine = function createInternalSetMapMoveSinceLastRefine(renderOptions, render) {
      return function () {
        var shouldTriggerRender = widgetState.hasMapMoveSinceLastRefine !== true;
        widgetState.hasMapMoveSinceLastRefine = true;

        if (shouldTriggerRender) {
          render(renderOptions);
        }
      };
    };

    var hasMapMoveSinceLastRefine = function hasMapMoveSinceLastRefine() {
      return widgetState.hasMapMoveSinceLastRefine;
    };

    var sendEvent;
    return {
      $$type: connectGeoSearch_$$type,
      init: function init(initArgs) {
        var instantSearchInstance = initArgs.instantSearchInstance;
        var isFirstRendering = true;
        widgetState.internalToggleRefineOnMapMove = createInternalToggleRefinementOnMapMove(initArgs, noop["a" /* default */]);
        widgetState.internalSetMapMoveSinceLastRefine = createInternalSetMapMoveSinceLastRefine(initArgs, noop["a" /* default */]);
        renderFn(connectGeoSearch_objectSpread(connectGeoSearch_objectSpread({}, this.getWidgetRenderState(initArgs)), {}, {
          instantSearchInstance: instantSearchInstance
        }), isFirstRendering);
      },
      render: function render(renderArgs) {
        var helper = renderArgs.helper,
            instantSearchInstance = renderArgs.instantSearchInstance;
        var isFirstRendering = false; // We don't use the state provided by the render function because we need
        // to be sure that the state is the latest one for the following condition

        var state = helper.state;
        var positionChangedSinceLastRefine = Boolean(state.aroundLatLng) && Boolean(widgetState.lastRefinePosition) && state.aroundLatLng !== widgetState.lastRefinePosition;
        var boundingBoxChangedSinceLastRefine = !state.insideBoundingBox && Boolean(widgetState.lastRefineBoundingBox) && state.insideBoundingBox !== widgetState.lastRefineBoundingBox;

        if (positionChangedSinceLastRefine || boundingBoxChangedSinceLastRefine) {
          widgetState.hasMapMoveSinceLastRefine = false;
        }

        widgetState.lastRefinePosition = state.aroundLatLng || '';
        widgetState.lastRefineBoundingBox = getBoundingBoxAsString(state);
        widgetState.internalToggleRefineOnMapMove = createInternalToggleRefinementOnMapMove(renderArgs, this.render.bind(this));
        widgetState.internalSetMapMoveSinceLastRefine = createInternalSetMapMoveSinceLastRefine(renderArgs, this.render.bind(this));
        var widgetRenderState = this.getWidgetRenderState(renderArgs);
        sendEvent('view', widgetRenderState.items);
        renderFn(connectGeoSearch_objectSpread(connectGeoSearch_objectSpread({}, widgetRenderState), {}, {
          instantSearchInstance: instantSearchInstance
        }), isFirstRendering);
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var helper = renderOptions.helper,
            results = renderOptions.results,
            instantSearchInstance = renderOptions.instantSearchInstance;
        var state = helper.state;
        var items = results ? transformItems(results.hits.filter(function (hit) {
          return hit._geoloc;
        })) : [];

        if (!sendEvent) {
          sendEvent = Object(createSendEventForHits["b" /* createSendEventForHits */])({
            instantSearchInstance: instantSearchInstance,
            index: helper.getIndex(),
            widgetType: connectGeoSearch_$$type
          });
        }

        return {
          items: items,
          position: getPositionFromState(state),
          currentRefinement: getCurrentRefinementFromState(state),
          refine: refine(helper),
          sendEvent: sendEvent,
          clearMapRefinement: clearMapRefinement(helper),
          isRefinedWithMap: isRefinedWithMap(state),
          toggleRefineOnMapMove: toggleRefineOnMapMove,
          isRefineOnMapMove: isRefineOnMapMove,
          setMapMoveSinceLastRefine: setMapMoveSinceLastRefine,
          hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine,
          widgetParams: widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectGeoSearch_objectSpread(connectGeoSearch_objectSpread({}, renderState), {}, {
          geoSearch: this.getWidgetRenderState(renderOptions)
        });
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.setQueryParameter('insideBoundingBox', undefined);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var boundingBox = getBoundingBoxAsString(searchParameters);

        if (!boundingBox || uiState && uiState.geoSearch && uiState.geoSearch.boundingBox === boundingBox) {
          return uiState;
        }

        return connectGeoSearch_objectSpread(connectGeoSearch_objectSpread({}, uiState), {}, {
          geoSearch: {
            boundingBox: boundingBox
          }
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;

        if (!uiState || !uiState.geoSearch) {
          return searchParameters.setQueryParameter('insideBoundingBox', undefined);
        }

        return setBoundingBoxAsString(searchParameters, uiState.geoSearch.boundingBox);
      }
    };
  };
};

/* harmony default export */ var geo_search_connectGeoSearch = (connectGeoSearch_connectGeoSearch);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js
var safelyRunOnBrowser = __webpack_require__(302);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/powered-by/connectPoweredBy.js
function connectPoweredBy_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectPoweredBy_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectPoweredBy_ownKeys(Object(source), true).forEach(function (key) {
        connectPoweredBy_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectPoweredBy_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectPoweredBy_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectPoweredBy_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'powered-by',
  connector: true
});
/**
 * **PoweredBy** connector provides the logic to build a custom widget that will displays
 * the logo to redirect to Algolia.
 */

var connectPoweredBy_connectPoweredBy = function connectPoweredBy(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectPoweredBy_withUsage());
  var defaultUrl = 'https://www.algolia.com/?' + 'utm_source=instantsearch.js&' + 'utm_medium=website&' + "utm_content=".concat(Object(safelyRunOnBrowser["a" /* safelyRunOnBrowser */])(function (_ref) {
    var _window$location;

    var window = _ref.window;
    return ((_window$location = window.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) || '';
  }, {
    fallback: function fallback() {
      return '';
    }
  }), "&") + 'utm_campaign=poweredby';
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        _ref2$url = _ref2.url,
        url = _ref2$url === void 0 ? defaultUrl : _ref2$url;

    return {
      $$type: 'ais.poweredBy',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectPoweredBy_objectSpread(connectPoweredBy_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectPoweredBy_objectSpread(connectPoweredBy_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectPoweredBy_objectSpread(connectPoweredBy_objectSpread({}, renderState), {}, {
          poweredBy: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState() {
        return {
          url: url,
          widgetParams: widgetParams
        };
      },
      dispose: function dispose() {
        unmountFn();
      }
    };
  };
};

/* harmony default export */ var powered_by_connectPoweredBy = (connectPoweredBy_connectPoweredBy);
// EXTERNAL MODULE: external "algoliasearch-helper"
var external_algoliasearch_helper_ = __webpack_require__(190);
var external_algoliasearch_helper_default = /*#__PURE__*/__webpack_require__.n(external_algoliasearch_helper_);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/isPlainObject.js
var isPlainObject = __webpack_require__(272);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/configure/connectConfigure.js
function connectConfigure_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectConfigure_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectConfigure_ownKeys(Object(source), true).forEach(function (key) {
        connectConfigure_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectConfigure_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectConfigure_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



/**
 * Refine the given search parameters.
 */

var connectConfigure_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'configure',
  connector: true
});

function getInitialSearchParameters(state, widgetParams) {
  // We leverage the helper internals to remove the `widgetParams` from
  // the state. The function `setQueryParameters` omits the values that
  // are `undefined` on the next state.
  return state.setQueryParameters(Object.keys(widgetParams.searchParameters).reduce(function (acc, key) {
    return connectConfigure_objectSpread(connectConfigure_objectSpread({}, acc), {}, connectConfigure_defineProperty({}, key, undefined));
  }, {}));
}

var connectConfigure_connectConfigure = function connectConfigure() {
  var renderFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop["a" /* default */];
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  return function (widgetParams) {
    if (!widgetParams || !Object(isPlainObject["a" /* default */])(widgetParams.searchParameters)) {
      throw new Error(connectConfigure_withUsage('The `searchParameters` option expects an object.'));
    }

    var connectorState = {};

    function refine(helper) {
      return function (searchParameters) {
        // Merge new `searchParameters` with the ones set from other widgets
        var actualState = getInitialSearchParameters(helper.state, widgetParams);
        var nextSearchParameters = Object(mergeSearchParameters["a" /* default */])(actualState, new external_algoliasearch_helper_default.a.SearchParameters(searchParameters)); // Update original `widgetParams.searchParameters` to the new refined one

        widgetParams.searchParameters = searchParameters; // Trigger a search with the resolved search parameters

        helper.setState(nextSearchParameters).search();
      };
    }

    return {
      $$type: 'ais.configure',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectConfigure_objectSpread(connectConfigure_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectConfigure_objectSpread(connectConfigure_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        unmountFn();
        return getInitialSearchParameters(state, widgetParams);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        var _renderState$configur;

        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        return connectConfigure_objectSpread(connectConfigure_objectSpread({}, renderState), {}, {
          configure: connectConfigure_objectSpread(connectConfigure_objectSpread({}, widgetRenderState), {}, {
            widgetParams: connectConfigure_objectSpread(connectConfigure_objectSpread({}, widgetRenderState.widgetParams), {}, {
              searchParameters: Object(mergeSearchParameters["a" /* default */])(new external_algoliasearch_helper_default.a.SearchParameters((_renderState$configur = renderState.configure) === null || _renderState$configur === void 0 ? void 0 : _renderState$configur.widgetParams.searchParameters), new external_algoliasearch_helper_default.a.SearchParameters(widgetRenderState.widgetParams.searchParameters)).getQueryParams()
            })
          })
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var helper = _ref2.helper;

        if (!connectorState.refine) {
          connectorState.refine = refine(helper);
        }

        return {
          refine: connectorState.refine,
          widgetParams: widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref3) {
        var uiState = _ref3.uiState;
        return Object(mergeSearchParameters["a" /* default */])(state, new external_algoliasearch_helper_default.a.SearchParameters(connectConfigure_objectSpread(connectConfigure_objectSpread({}, uiState.configure), widgetParams.searchParameters)));
      },
      getWidgetUiState: function getWidgetUiState(uiState) {
        return connectConfigure_objectSpread(connectConfigure_objectSpread({}, uiState), {}, {
          configure: connectConfigure_objectSpread(connectConfigure_objectSpread({}, uiState.configure), widgetParams.searchParameters)
        });
      }
    };
  };
};

/* harmony default export */ var configure_connectConfigure = (connectConfigure_connectConfigure);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js
var getPropertyByPath = __webpack_require__(303);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/configure-related-items/connectConfigureRelatedItems.js
function connectConfigureRelatedItems_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectConfigureRelatedItems_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectConfigureRelatedItems_ownKeys(Object(source), true).forEach(function (key) {
        connectConfigureRelatedItems_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectConfigureRelatedItems_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectConfigureRelatedItems_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function connectConfigureRelatedItems_toConsumableArray(arr) {
  return connectConfigureRelatedItems_arrayWithoutHoles(arr) || connectConfigureRelatedItems_iterableToArray(arr) || connectConfigureRelatedItems_unsupportedIterableToArray(arr) || connectConfigureRelatedItems_nonIterableSpread();
}

function connectConfigureRelatedItems_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectConfigureRelatedItems_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectConfigureRelatedItems_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectConfigureRelatedItems_arrayLikeToArray(o, minLen);
}

function connectConfigureRelatedItems_iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function connectConfigureRelatedItems_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return connectConfigureRelatedItems_arrayLikeToArray(arr);
}

function connectConfigureRelatedItems_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}




var connectConfigureRelatedItems_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'configure-related-items',
  connector: true
});

function createOptionalFilter(_ref) {
  var attributeName = _ref.attributeName,
      attributeValue = _ref.attributeValue,
      attributeScore = _ref.attributeScore;
  return "".concat(attributeName, ":").concat(attributeValue, "<score=").concat(attributeScore || 1, ">");
}

var connectConfigureRelatedItems_connectConfigureRelatedItems = function connectConfigureRelatedItems(renderFn, unmountFn) {
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        hit = _ref2.hit,
        matchingPatterns = _ref2.matchingPatterns,
        _ref2$transformSearch = _ref2.transformSearchParameters,
        transformSearchParameters = _ref2$transformSearch === void 0 ? function (x) {
      return x;
    } : _ref2$transformSearch;

    if (!hit) {
      throw new Error(connectConfigureRelatedItems_withUsage('The `hit` option is required.'));
    }

    if (!matchingPatterns) {
      throw new Error(connectConfigureRelatedItems_withUsage('The `matchingPatterns` option is required.'));
    }

    var optionalFilters = Object.keys(matchingPatterns).reduce(function (acc, attributeName) {
      var attribute = matchingPatterns[attributeName];
      var attributeValue = Object(getPropertyByPath["a" /* default */])(hit, attributeName);
      var attributeScore = attribute.score;

      if (Array.isArray(attributeValue)) {
        return [].concat(connectConfigureRelatedItems_toConsumableArray(acc), [attributeValue.map(function (attributeSubValue) {
          return createOptionalFilter({
            attributeName: attributeName,
            attributeValue: attributeSubValue,
            attributeScore: attributeScore
          });
        })]);
      }

      if (typeof attributeValue === 'string') {
        return [].concat(connectConfigureRelatedItems_toConsumableArray(acc), [createOptionalFilter({
          attributeName: attributeName,
          attributeValue: attributeValue,
          attributeScore: attributeScore
        })]);
      }

       false ? undefined : void 0;
      return acc;
    }, []);

    var searchParameters = connectConfigureRelatedItems_objectSpread({}, transformSearchParameters(new external_algoliasearch_helper_default.a.SearchParameters({
      sumOrFiltersScores: true,
      facetFilters: ["objectID:-".concat(hit.objectID)],
      optionalFilters: optionalFilters
    })));

    var makeWidget = configure_connectConfigure(renderFn, unmountFn);
    return connectConfigureRelatedItems_objectSpread(connectConfigureRelatedItems_objectSpread({}, makeWidget({
      searchParameters: searchParameters
    })), {}, {
      $$type: 'ais.configureRelatedItems'
    });
  };
};

/* harmony default export */ var configure_related_items_connectConfigureRelatedItems = (connectConfigureRelatedItems_connectConfigureRelatedItems);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/autocomplete/connectAutocomplete.js
function connectAutocomplete_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectAutocomplete_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectAutocomplete_ownKeys(Object(source), true).forEach(function (key) {
        connectAutocomplete_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectAutocomplete_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectAutocomplete_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var connectAutocomplete_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'autocomplete',
  connector: true
});

var connectAutocomplete_connectAutocomplete = function connectAutocomplete(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectAutocomplete_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML;

     false ? undefined : void 0;
    var connectorState = {};
    return {
      $$type: 'ais.autocomplete',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectAutocomplete_objectSpread(connectAutocomplete_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var renderState = this.getWidgetRenderState(renderOptions);
        renderState.indices.forEach(function (_ref3) {
          var sendEvent = _ref3.sendEvent,
              hits = _ref3.hits;
          sendEvent('view', hits);
        });
        renderFn(connectAutocomplete_objectSpread(connectAutocomplete_objectSpread({}, renderState), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectAutocomplete_objectSpread(connectAutocomplete_objectSpread({}, renderState), {}, {
          autocomplete: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref4) {
        var _this = this;

        var helper = _ref4.helper,
            scopedResults = _ref4.scopedResults,
            instantSearchInstance = _ref4.instantSearchInstance;

        if (!connectorState.refine) {
          connectorState.refine = function (query) {
            helper.setQuery(query).search();
          };
        }

        var indices = scopedResults.map(function (scopedResult) {
          // We need to escape the hits because highlighting
          // exposes HTML tags to the end-user.
          scopedResult.results.hits = escapeHTML ? Object(escape_highlight["d" /* escapeHits */])(scopedResult.results.hits) : scopedResult.results.hits;
          var sendEvent = Object(createSendEventForHits["b" /* createSendEventForHits */])({
            instantSearchInstance: instantSearchInstance,
            index: scopedResult.results.index,
            widgetType: _this.$$type
          });
          return {
            indexId: scopedResult.indexId,
            indexName: scopedResult.results.index,
            hits: scopedResult.results.hits,
            results: scopedResult.results,
            sendEvent: sendEvent
          };
        });
        return {
          currentRefinement: helper.state.query || '',
          indices: indices,
          refine: connectorState.refine,
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var query = searchParameters.query || '';

        if (query === '' || uiState && uiState.query === query) {
          return uiState;
        }

        return connectAutocomplete_objectSpread(connectAutocomplete_objectSpread({}, uiState), {}, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var parameters = {
          query: uiState.query || ''
        };

        if (!escapeHTML) {
          return searchParameters.setQueryParameters(parameters);
        }

        return searchParameters.setQueryParameters(connectAutocomplete_objectSpread(connectAutocomplete_objectSpread({}, parameters), escape_highlight["a" /* TAG_PLACEHOLDER */]));
      },
      dispose: function dispose(_ref7) {
        var state = _ref7.state;
        unmountFn();
        var stateWithoutQuery = state.setQueryParameter('query', undefined);

        if (!escapeHTML) {
          return stateWithoutQuery;
        }

        return stateWithoutQuery.setQueryParameters(Object.keys(escape_highlight["a" /* TAG_PLACEHOLDER */]).reduce(function (acc, key) {
          return connectAutocomplete_objectSpread(connectAutocomplete_objectSpread({}, acc), {}, connectAutocomplete_defineProperty({}, key, undefined));
        }, {}));
      }
    };
  };
};

/* harmony default export */ var autocomplete_connectAutocomplete = (connectAutocomplete_connectAutocomplete);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/isEqual.js
var isEqual = __webpack_require__(296);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/query-rules/connectQueryRules.js
function connectQueryRules_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectQueryRules_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectQueryRules_ownKeys(Object(source), true).forEach(function (key) {
        connectQueryRules_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectQueryRules_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectQueryRules_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function connectQueryRules_toConsumableArray(arr) {
  return connectQueryRules_arrayWithoutHoles(arr) || connectQueryRules_iterableToArray(arr) || connectQueryRules_unsupportedIterableToArray(arr) || connectQueryRules_nonIterableSpread();
}

function connectQueryRules_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function connectQueryRules_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return connectQueryRules_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return connectQueryRules_arrayLikeToArray(o, minLen);
}

function connectQueryRules_iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function connectQueryRules_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return connectQueryRules_arrayLikeToArray(arr);
}

function connectQueryRules_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}


var connectQueryRules_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'query-rules',
  connector: true
});

function hasStateRefinements(state) {
  return [state.disjunctiveFacetsRefinements, state.facetsRefinements, state.hierarchicalFacetsRefinements, state.numericRefinements].some(function (refinement) {
    return Boolean(refinement && Object.keys(refinement).length > 0);
  });
} // A context rule must consist only of alphanumeric characters, hyphens, and underscores.
// See https://www.algolia.com/doc/guides/managing-results/refine-results/merchandising-and-promoting/in-depth/implementing-query-rules/#context


function escapeRuleContext(ruleName) {
  return ruleName.replace(/[^a-z0-9-_]+/gi, '_');
}

function getRuleContextsFromTrackedFilters(_ref) {
  var helper = _ref.helper,
      sharedHelperState = _ref.sharedHelperState,
      trackedFilters = _ref.trackedFilters;
  var ruleContexts = Object.keys(trackedFilters).reduce(function (facets, facetName) {
    var facetRefinements = Object(getRefinements["a" /* default */])(helper.lastResults || {}, sharedHelperState, true).filter(function (refinement) {
      return refinement.attribute === facetName;
    }).map(function (refinement) {
      return refinement.numericValue || refinement.name;
    });
    var getTrackedFacetValues = trackedFilters[facetName];
    var trackedFacetValues = getTrackedFacetValues(facetRefinements);
    return [].concat(connectQueryRules_toConsumableArray(facets), connectQueryRules_toConsumableArray(facetRefinements.filter(function (facetRefinement) {
      return trackedFacetValues.includes(facetRefinement);
    }).map(function (facetValue) {
      return escapeRuleContext("ais-".concat(facetName, "-").concat(facetValue));
    })));
  }, []);
  return ruleContexts;
}

function applyRuleContexts(event) {
  var helper = this.helper,
      initialRuleContexts = this.initialRuleContexts,
      trackedFilters = this.trackedFilters,
      transformRuleContexts = this.transformRuleContexts;
  var sharedHelperState = event.state;
  var previousRuleContexts = sharedHelperState.ruleContexts || [];
  var newRuleContexts = getRuleContextsFromTrackedFilters({
    helper: helper,
    sharedHelperState: sharedHelperState,
    trackedFilters: trackedFilters
  });
  var nextRuleContexts = [].concat(connectQueryRules_toConsumableArray(initialRuleContexts), connectQueryRules_toConsumableArray(newRuleContexts));
   false ? undefined : void 0;
  var ruleContexts = transformRuleContexts(nextRuleContexts).slice(0, 10);

  if (!Object(isEqual["a" /* default */])(previousRuleContexts, ruleContexts)) {
    helper.overrideStateWithoutTriggeringChangeEvent(connectQueryRules_objectSpread(connectQueryRules_objectSpread({}, sharedHelperState), {}, {
      ruleContexts: ruleContexts
    }));
  }
}

var connectQueryRules_connectQueryRules = function connectQueryRules(_render) {
  var unmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(_render, connectQueryRules_withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        _ref2$trackedFilters = _ref2.trackedFilters,
        trackedFilters = _ref2$trackedFilters === void 0 ? {} : _ref2$trackedFilters,
        _ref2$transformRuleCo = _ref2.transformRuleContexts,
        transformRuleContexts = _ref2$transformRuleCo === void 0 ? function (rules) {
      return rules;
    } : _ref2$transformRuleCo,
        _ref2$transformItems = _ref2.transformItems,
        transformItems = _ref2$transformItems === void 0 ? function (items) {
      return items;
    } : _ref2$transformItems;

    Object.keys(trackedFilters).forEach(function (facetName) {
      if (typeof trackedFilters[facetName] !== 'function') {
        throw new Error(connectQueryRules_withUsage("'The \"".concat(facetName, "\" filter value in the `trackedFilters` option expects a function.")));
      }
    });
    var hasTrackedFilters = Object.keys(trackedFilters).length > 0; // We store the initial rule contexts applied before creating the widget
    // so that we do not override them with the rules created from `trackedFilters`.

    var initialRuleContexts = [];
    var onHelperChange;
    return {
      $$type: 'ais.queryRules',
      init: function init(initOptions) {
        var helper = initOptions.helper,
            state = initOptions.state,
            instantSearchInstance = initOptions.instantSearchInstance;
        initialRuleContexts = state.ruleContexts || [];
        onHelperChange = applyRuleContexts.bind({
          helper: helper,
          initialRuleContexts: initialRuleContexts,
          trackedFilters: trackedFilters,
          transformRuleContexts: transformRuleContexts
        });

        if (hasTrackedFilters) {
          // We need to apply the `ruleContexts` based on the `trackedFilters`
          // before the helper changes state in some cases:
          //   - Some filters are applied on the first load (e.g. using `configure`)
          //   - The `transformRuleContexts` option sets initial `ruleContexts`.
          if (hasStateRefinements(state) || Boolean(widgetParams.transformRuleContexts)) {
            onHelperChange({
              state: state
            });
          } // We track every change in the helper to override its state and add
          // any `ruleContexts` needed based on the `trackedFilters`.


          helper.on('change', onHelperChange);
        }

        _render(connectQueryRules_objectSpread(connectQueryRules_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;

        _render(connectQueryRules_objectSpread(connectQueryRules_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var results = _ref3.results;

        var _ref4 = results || {},
            _ref4$userData = _ref4.userData,
            userData = _ref4$userData === void 0 ? [] : _ref4$userData;

        var items = transformItems(userData);
        return {
          items: items,
          widgetParams: widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectQueryRules_objectSpread(connectQueryRules_objectSpread({}, renderState), {}, {
          queryRules: this.getWidgetRenderState(renderOptions)
        });
      },
      dispose: function dispose(_ref5) {
        var helper = _ref5.helper,
            state = _ref5.state;
        unmount();

        if (hasTrackedFilters) {
          helper.removeListener('change', onHelperChange);
          return state.setQueryParameter('ruleContexts', initialRuleContexts);
        }

        return state;
      }
    };
  };
};

/* harmony default export */ var query_rules_connectQueryRules = (connectQueryRules_connectQueryRules);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/voiceSearchHelper/index.js
function voiceSearchHelper_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function voiceSearchHelper_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      voiceSearchHelper_ownKeys(Object(source), true).forEach(function (key) {
        voiceSearchHelper_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      voiceSearchHelper_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function voiceSearchHelper_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // `SpeechRecognition` is an API used on the browser so we can safely disable
// the `window` check.

/* eslint-disable no-restricted-globals */

/* global SpeechRecognition SpeechRecognitionEvent */


var voiceSearchHelper_createVoiceSearchHelper = function createVoiceSearchHelper(_ref) {
  var searchAsYouSpeak = _ref.searchAsYouSpeak,
      language = _ref.language,
      onQueryChange = _ref.onQueryChange,
      onStateChange = _ref.onStateChange;
  var SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;

  var getDefaultState = function getDefaultState(status) {
    return {
      status: status,
      transcript: '',
      isSpeechFinal: false,
      errorCode: undefined
    };
  };

  var state = getDefaultState('initial');
  var recognition;

  var isBrowserSupported = function isBrowserSupported() {
    return Boolean(SpeechRecognitionAPI);
  };

  var isListening = function isListening() {
    return state.status === 'askingPermission' || state.status === 'waiting' || state.status === 'recognizing';
  };

  var setState = function setState() {
    var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    state = voiceSearchHelper_objectSpread(voiceSearchHelper_objectSpread({}, state), newState);
    onStateChange();
  };

  var getState = function getState() {
    return state;
  };

  var resetState = function resetState() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';
    setState(getDefaultState(status));
  };

  var onStart = function onStart() {
    setState({
      status: 'waiting'
    });
  };

  var onError = function onError(event) {
    setState({
      status: 'error',
      errorCode: event.error
    });
  };

  var onResult = function onResult(event) {
    setState({
      status: 'recognizing',
      transcript: event.results[0] && event.results[0][0] && event.results[0][0].transcript || '',
      isSpeechFinal: event.results[0] && event.results[0].isFinal
    });

    if (searchAsYouSpeak && state.transcript) {
      onQueryChange(state.transcript);
    }
  };

  var onEnd = function onEnd() {
    if (!state.errorCode && state.transcript && !searchAsYouSpeak) {
      onQueryChange(state.transcript);
    }

    if (state.status !== 'error') {
      setState({
        status: 'finished'
      });
    }
  };

  var startListening = function startListening() {
    recognition = new SpeechRecognitionAPI();

    if (!recognition) {
      return;
    }

    resetState('askingPermission');
    recognition.interimResults = true;

    if (language) {
      recognition.lang = language;
    }

    recognition.addEventListener('start', onStart);
    recognition.addEventListener('error', onError);
    recognition.addEventListener('result', onResult);
    recognition.addEventListener('end', onEnd);
    recognition.start();
  };

  var dispose = function dispose() {
    if (!recognition) {
      return;
    }

    recognition.stop();
    recognition.removeEventListener('start', onStart);
    recognition.removeEventListener('error', onError);
    recognition.removeEventListener('result', onResult);
    recognition.removeEventListener('end', onEnd);
    recognition = undefined;
  };

  var stopListening = function stopListening() {
    dispose(); // Because `dispose` removes event listeners, `end` listener is not called.
    // So we're setting the `status` as `finished` here.
    // If we don't do it, it will be still `waiting` or `recognizing`.

    resetState('finished');
  };

  return {
    getState: getState,
    isBrowserSupported: isBrowserSupported,
    isListening: isListening,
    startListening: startListening,
    stopListening: stopListening,
    dispose: dispose
  };
};

/* harmony default export */ var voiceSearchHelper = (voiceSearchHelper_createVoiceSearchHelper);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/voice-search/connectVoiceSearch.js
function connectVoiceSearch_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectVoiceSearch_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectVoiceSearch_ownKeys(Object(source), true).forEach(function (key) {
        connectVoiceSearch_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectVoiceSearch_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectVoiceSearch_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



var connectVoiceSearch_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'voice-search',
  connector: true
});

var connectVoiceSearch_connectVoiceSearch = function connectVoiceSearch(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectVoiceSearch_withUsage());
  return function (widgetParams) {
    var _widgetParams$searchA = widgetParams.searchAsYouSpeak,
        searchAsYouSpeak = _widgetParams$searchA === void 0 ? false : _widgetParams$searchA,
        language = widgetParams.language,
        additionalQueryParameters = widgetParams.additionalQueryParameters,
        _widgetParams$createV = widgetParams.createVoiceSearchHelper,
        createVoiceSearchHelper = _widgetParams$createV === void 0 ? voiceSearchHelper : _widgetParams$createV;
    return {
      $$type: 'ais.voiceSearch',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectVoiceSearch_objectSpread(connectVoiceSearch_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectVoiceSearch_objectSpread(connectVoiceSearch_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectVoiceSearch_objectSpread(connectVoiceSearch_objectSpread({}, renderState), {}, {
          voiceSearch: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;

        var helper = renderOptions.helper,
            instantSearchInstance = renderOptions.instantSearchInstance;

        if (!this._refine) {
          this._refine = function (query) {
            if (query !== helper.state.query) {
              var queryLanguages = language ? [language.split('-')[0]] : undefined;
              helper.setQueryParameter('queryLanguages', queryLanguages);

              if (typeof additionalQueryParameters === 'function') {
                helper.setState(helper.state.setQueryParameters(connectVoiceSearch_objectSpread({
                  ignorePlurals: true,
                  removeStopWords: true,
                  // @ts-ignore (optionalWords only allows array in v3, while string is also valid)
                  optionalWords: query
                }, additionalQueryParameters({
                  query: query
                }))));
              }

              helper.setQuery(query).search();
            }
          };
        }

        if (!this._voiceSearchHelper) {
          this._voiceSearchHelper = createVoiceSearchHelper({
            searchAsYouSpeak: searchAsYouSpeak,
            language: language,
            onQueryChange: function onQueryChange(query) {
              return _this._refine(query);
            },
            onStateChange: function onStateChange() {
              renderFn(connectVoiceSearch_objectSpread(connectVoiceSearch_objectSpread({}, _this.getWidgetRenderState(renderOptions)), {}, {
                instantSearchInstance: instantSearchInstance
              }), false);
            }
          });
        }

        var _voiceSearchHelper = this._voiceSearchHelper,
            isBrowserSupported = _voiceSearchHelper.isBrowserSupported,
            isListening = _voiceSearchHelper.isListening,
            startListening = _voiceSearchHelper.startListening,
            stopListening = _voiceSearchHelper.stopListening,
            getState = _voiceSearchHelper.getState;
        return {
          isBrowserSupported: isBrowserSupported(),
          isListening: isListening(),
          toggleListening: function toggleListening() {
            if (!isBrowserSupported()) {
              return;
            }

            if (isListening()) {
              stopListening();
            } else {
              startListening();
            }
          },
          voiceListeningState: getState(),
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;

        this._voiceSearchHelper.dispose();

        unmountFn();
        var newState = state;

        if (typeof additionalQueryParameters === 'function') {
          var additional = additionalQueryParameters({
            query: ''
          });
          var toReset = additional ? Object.keys(additional).reduce(function (acc, current) {
            // @ts-ignore search parameters is typed as readonly in v4
            acc[current] = undefined;
            return acc;
          }, {}) : {};
          newState = state.setQueryParameters(connectVoiceSearch_objectSpread({
            // @ts-ignore (queryLanguages is not added to algoliasearch v3)
            queryLanguages: undefined,
            ignorePlurals: undefined,
            removeStopWords: undefined,
            optionalWords: undefined
          }, toReset));
        }

        return newState.setQueryParameter('query', undefined);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref2) {
        var searchParameters = _ref2.searchParameters;
        var query = searchParameters.query || '';

        if (!query) {
          return uiState;
        }

        return connectVoiceSearch_objectSpread(connectVoiceSearch_objectSpread({}, uiState), {}, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref3) {
        var uiState = _ref3.uiState;
        return searchParameters.setQueryParameter('query', uiState.query || '');
      }
    };
  };
};

/* harmony default export */ var voice_search_connectVoiceSearch = (connectVoiceSearch_connectVoiceSearch);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/createConcurrentSafePromise.js
var createConcurrentSafePromise = __webpack_require__(304);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/debounce.js
var debounce = __webpack_require__(305);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/answers/connectAnswers.js
function connectAnswers_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectAnswers_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectAnswers_ownKeys(Object(source), true).forEach(function (key) {
        connectAnswers_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectAnswers_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectAnswers_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



function hasFindAnswersMethod(answersIndex) {
  return typeof answersIndex.findAnswers === 'function';
}

var connectAnswers_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'answers',
  connector: true
});

var connectAnswers_connectAnswers = function connectAnswers(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectAnswers_withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        queryLanguages = _ref.queryLanguages,
        attributesForPrediction = _ref.attributesForPrediction,
        _ref$nbHits = _ref.nbHits,
        nbHits = _ref$nbHits === void 0 ? 1 : _ref$nbHits,
        _ref$renderDebounceTi = _ref.renderDebounceTime,
        renderDebounceTime = _ref$renderDebounceTi === void 0 ? 100 : _ref$renderDebounceTi,
        _ref$searchDebounceTi = _ref.searchDebounceTime,
        searchDebounceTime = _ref$searchDebounceTi === void 0 ? 100 : _ref$searchDebounceTi,
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
        _ref$extraParameters = _ref.extraParameters,
        extraParameters = _ref$extraParameters === void 0 ? {} : _ref$extraParameters; // @ts-expect-error checking for the wrong value


    if (!queryLanguages || queryLanguages.length === 0) {
      throw new Error(connectAnswers_withUsage('The `queryLanguages` expects an array of strings.'));
    }

    var runConcurrentSafePromise = Object(createConcurrentSafePromise["a" /* createConcurrentSafePromise */])();
    var lastHits = [];
    var isLoading = false;
    var debouncedRender = Object(debounce["a" /* debounce */])(renderFn, renderDebounceTime); // this does not directly use DebouncedFunction<findAnswers>, since then the generic will disappear

    var debouncedRefine;
    return {
      $$type: 'ais.answers',
      init: function init(initOptions) {
        var state = initOptions.state,
            instantSearchInstance = initOptions.instantSearchInstance;
        var answersIndex = instantSearchInstance.client.initIndex(state.index);

        if (!hasFindAnswersMethod(answersIndex)) {
          throw new Error(connectAnswers_withUsage('`algoliasearch` >= 4.8.0 required.'));
        }

        debouncedRefine = Object(debounce["a" /* debounce */])(answersIndex.findAnswers, searchDebounceTime);
        renderFn(connectAnswers_objectSpread(connectAnswers_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var _this = this;

        var query = renderOptions.state.query;

        if (!query) {
          // renders nothing with empty query
          lastHits = [];
          isLoading = false;
          renderFn(connectAnswers_objectSpread(connectAnswers_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
          return;
        } // render the loader


        lastHits = [];
        isLoading = true;
        renderFn(connectAnswers_objectSpread(connectAnswers_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false); // call /answers API

        runConcurrentSafePromise(debouncedRefine(query, queryLanguages, connectAnswers_objectSpread(connectAnswers_objectSpread({}, extraParameters), {}, {
          nbHits: nbHits,
          attributesForPrediction: attributesForPrediction
        }))).then(function (result) {
          if (!result) {
            // It's undefined when it's debounced.
            return;
          }

          if (escapeHTML && result.hits.length > 0) {
            result.hits = Object(escape_highlight["d" /* escapeHits */])(result.hits);
          }

          var hitsWithAbsolutePosition = Object(hits_absolute_position["a" /* addAbsolutePosition */])(result.hits, 0, nbHits);
          var hitsWithAbsolutePositionAndQueryID = Object(hits_query_id["a" /* addQueryID */])(hitsWithAbsolutePosition, result.queryID);
          lastHits = hitsWithAbsolutePositionAndQueryID;
          isLoading = false;
          debouncedRender(connectAnswers_objectSpread(connectAnswers_objectSpread({}, _this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        });
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectAnswers_objectSpread(connectAnswers_objectSpread({}, renderState), {}, {
          answers: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState() {
        return {
          hits: lastHits,
          isLoading: isLoading,
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state;
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        return state;
      }
    };
  };
};

/* harmony default export */ var answers_connectAnswers = (connectAnswers_connectAnswers);
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/relevant-sort/connectRelevantSort.js
function connectRelevantSort_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectRelevantSort_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectRelevantSort_ownKeys(Object(source), true).forEach(function (key) {
        connectRelevantSort_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectRelevantSort_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectRelevantSort_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}



var connectRelevantSort_connectRelevantSort = function connectRelevantSort() {
  var renderFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop["a" /* default */];
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  return function (widgetParams) {
    var connectorState = {};
    return {
      $$type: 'ais.relevantSort',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(connectRelevantSort_objectSpread(connectRelevantSort_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(connectRelevantSort_objectSpread(connectRelevantSort_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        unmountFn();
        return state.setQueryParameter('relevancyStrictness', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectRelevantSort_objectSpread(connectRelevantSort_objectSpread({}, renderState), {}, {
          relevantSort: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results,
            helper = _ref2.helper;

        if (!connectorState.refine) {
          connectorState.refine = function (relevancyStrictness) {
            helper.setQueryParameter('relevancyStrictness', relevancyStrictness).search();
          };
        }

        var _ref3 = results || {},
            appliedRelevancyStrictness = _ref3.appliedRelevancyStrictness;

        var isVirtualReplica = appliedRelevancyStrictness !== undefined;
        return {
          isRelevantSorted: typeof appliedRelevancyStrictness !== 'undefined' && appliedRelevancyStrictness > 0,
          isVirtualReplica: isVirtualReplica,
          canRefine: isVirtualReplica,
          refine: connectorState.refine,
          widgetParams: widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref4) {
        var _uiState$relevantSort;

        var uiState = _ref4.uiState;
        return state.setQueryParameter('relevancyStrictness', (_uiState$relevantSort = uiState.relevantSort) !== null && _uiState$relevantSort !== void 0 ? _uiState$relevantSort : state.relevancyStrictness);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        return connectRelevantSort_objectSpread(connectRelevantSort_objectSpread({}, uiState), {}, {
          relevantSort: searchParameters.relevancyStrictness || uiState.relevantSort
        });
      }
    };
  };
};

/* harmony default export */ var relevant_sort_connectRelevantSort = (connectRelevantSort_connectRelevantSort);
// EXTERNAL MODULE: external "core-js/modules/esnext.map.delete-all.js"
var esnext_map_delete_all_js_ = __webpack_require__(177);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.every.js"
var esnext_map_every_js_ = __webpack_require__(178);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.filter.js"
var esnext_map_filter_js_ = __webpack_require__(179);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.find.js"
var esnext_map_find_js_ = __webpack_require__(180);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.find-key.js"
var esnext_map_find_key_js_ = __webpack_require__(181);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.includes.js"
var esnext_map_includes_js_ = __webpack_require__(182);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.key-of.js"
var esnext_map_key_of_js_ = __webpack_require__(183);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.map-keys.js"
var esnext_map_map_keys_js_ = __webpack_require__(184);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.map-values.js"
var esnext_map_map_values_js_ = __webpack_require__(185);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.merge.js"
var esnext_map_merge_js_ = __webpack_require__(186);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.reduce.js"
var esnext_map_reduce_js_ = __webpack_require__(187);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.some.js"
var esnext_map_some_js_ = __webpack_require__(188);

// EXTERNAL MODULE: external "core-js/modules/esnext.map.update.js"
var esnext_map_update_js_ = __webpack_require__(189);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/getWidgetAttribute.js
var getWidgetAttribute = __webpack_require__(306);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/dynamic-widgets/connectDynamicWidgets.js














function connectDynamicWidgets_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function connectDynamicWidgets_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      connectDynamicWidgets_ownKeys(Object(source), true).forEach(function (key) {
        connectDynamicWidgets_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      connectDynamicWidgets_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function connectDynamicWidgets_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}


var connectDynamicWidgets_withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'dynamic-widgets',
  connector: true
});

var connectDynamicWidgets_connectDynamicWidgets = function connectDynamicWidgets(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop["a" /* default */];
  Object(checkRendering["a" /* default */])(renderFn, connectDynamicWidgets_withUsage());
  return function (widgetParams) {
    var widgets = widgetParams.widgets,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo,
        fallbackWidget = widgetParams.fallbackWidget;

    if (!(widgets && Array.isArray(widgets) && widgets.every(function (widget) {
      return _typeof(widget) === 'object';
    }))) {
      throw new Error(connectDynamicWidgets_withUsage('The `widgets` option expects an array of widgets.'));
    }

    var localWidgets = new Map();
    return {
      $$type: 'ais.dynamicWidgets',
      init: function init(initOptions) {
        widgets.forEach(function (widget) {
          var attribute = Object(getWidgetAttribute["a" /* getWidgetAttribute */])(widget, initOptions);
          localWidgets.set(attribute, {
            widget: widget,
            isMounted: false
          });
        });
        renderFn(connectDynamicWidgets_objectSpread(connectDynamicWidgets_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var parent = renderOptions.parent;
        var renderState = this.getWidgetRenderState(renderOptions);
        var widgetsToUnmount = [];
        var widgetsToMount = [];

        if (fallbackWidget) {
          renderState.attributesToRender.forEach(function (attribute) {
            if (!localWidgets.has(attribute)) {
              var widget = fallbackWidget({
                attribute: attribute
              });
              localWidgets.set(attribute, {
                widget: widget,
                isMounted: false
              });
            }
          });
        }

        localWidgets.forEach(function (_ref, attribute) {
          var widget = _ref.widget,
              isMounted = _ref.isMounted;
          var shouldMount = renderState.attributesToRender.indexOf(attribute) > -1;

          if (!isMounted && shouldMount) {
            widgetsToMount.push(widget);
            localWidgets.set(attribute, {
              widget: widget,
              isMounted: true
            });
          } else if (isMounted && !shouldMount) {
            widgetsToUnmount.push(widget);
            localWidgets.set(attribute, {
              widget: widget,
              isMounted: false
            });
          }
        });
        parent.addWidgets(widgetsToMount); // make sure this only happens after the regular render, otherwise it
        // happens too quick, since render is "deferred" for the next microtask,
        // so this needs to be a whole task later

        setTimeout(function () {
          return parent.removeWidgets(widgetsToUnmount);
        }, 0);
        renderFn(connectDynamicWidgets_objectSpread(connectDynamicWidgets_objectSpread({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var parent = _ref2.parent;
        var toRemove = [];
        localWidgets.forEach(function (_ref3) {
          var widget = _ref3.widget,
              isMounted = _ref3.isMounted;

          if (isMounted) {
            toRemove.push(widget);
          }
        });
        parent.removeWidgets(toRemove);
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return connectDynamicWidgets_objectSpread(connectDynamicWidgets_objectSpread({}, renderState), {}, {
          dynamicWidgets: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref4) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3, _results$renderingCon4;

        var results = _ref4.results;

        if (!results) {
          return {
            attributesToRender: [],
            widgetParams: widgetParams
          };
        }

        var attributesToRender = (_results$renderingCon = (_results$renderingCon2 = results.renderingContent) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.facetOrdering) === null || _results$renderingCon3 === void 0 ? void 0 : (_results$renderingCon4 = _results$renderingCon3.facets) === null || _results$renderingCon4 === void 0 ? void 0 : _results$renderingCon4.order) !== null && _results$renderingCon !== void 0 ? _results$renderingCon : [];
        return {
          attributesToRender: transformItems(attributesToRender, {
            results: results
          }),
          widgetParams: widgetParams
        };
      }
    };
  };
};

/* harmony default export */ var dynamic_widgets_connectDynamicWidgets = (connectDynamicWidgets_connectDynamicWidgets);
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/logger.js
var logger = __webpack_require__(254);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/connectors/index.js































/** @deprecated use connectDynamicWidgets */

var EXPERIMENTAL_connectDynamicWidgets = Object(logger["a" /* deprecate */])(dynamic_widgets_connectDynamicWidgets, 'use connectDynamicWidgets');

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(212);

__webpack_require__(213);

__webpack_require__(214);

__webpack_require__(215);

__webpack_require__(216);

__webpack_require__(217);

__webpack_require__(218);

__webpack_require__(219);

__webpack_require__(220);

__webpack_require__(221);

__webpack_require__(222);

__webpack_require__(223);

__webpack_require__(224);

__webpack_require__(225);

__webpack_require__(226);

__webpack_require__(227);

__webpack_require__(177);

__webpack_require__(178);

__webpack_require__(179);

__webpack_require__(180);

__webpack_require__(181);

__webpack_require__(182);

__webpack_require__(183);

__webpack_require__(184);

__webpack_require__(185);

__webpack_require__(186);

__webpack_require__(187);

__webpack_require__(188);

__webpack_require__(189);

function _interopDefault(e) {
  return e && "object" == typeof e && "default" in e ? e.default : e;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var Vue = _interopDefault(__webpack_require__(1)),
    connectors = __webpack_require__(332),
    mitt = _interopDefault(__webpack_require__(228)),
    utils = __webpack_require__(247),
    indexWidget = _interopDefault(__webpack_require__(312)),
    instantsearch = _interopDefault(__webpack_require__(358)),
    algoliaHelper = _interopDefault(__webpack_require__(190));

function suit(e, t, i) {
  if (!e) throw new Error("You need to provide `widgetName` in your data");
  var n = ["ais-" + e];
  return t && n.push("-" + t), i && n.push("--" + i), n.join("");
}

var createSuitMixin = function (e) {
  var t = e.name;
  return {
    props: {
      classNames: {
        type: Object,
        default: void 0
      }
    },
    methods: {
      suit: function (e, i) {
        var n = suit(t, e, i),
            s = this.classNames && this.classNames[n];
        return s ? [n, s].join(" ") : n;
      }
    }
  };
},
    isVue2 = !0,
    isVue3 = !1,
    Vue2 = Vue,
    version = Vue.version;

function renderCompat(e) {
  return function (t) {
    return e.call(this, t);
  };
}

function getDefaultSlot(e) {
  return e.$slots.default;
}

var cache = new Set();

function warn(e) {
  cache.has(e) || (cache.add(e), console.warn(e));
}

var createWidgetMixin = function (e) {
  var t;
  void 0 === e && (e = {});
  var i = e.connector;
  return (t = {
    inject: {
      instantSearchInstance: {
        from: "$_ais_instantSearchInstance",
        default: function () {
          var e = this.$options._componentTag;
          throw new TypeError('It looks like you forgot to wrap your Algolia search component "<' + e + '>" inside of an "<ais-instant-search>" component.');
        }
      },
      getParentIndex: {
        from: "$_ais_getParentIndex",
        default: function () {
          var e = this;
          return function () {
            return e.instantSearchInstance.mainIndex;
          };
        }
      }
    },
    data: function () {
      return {
        state: null
      };
    },
    created: function () {
      if ("function" == typeof i) {
        if (this.factory = i(this.updateState, function () {}), this.widget = this.factory(this.widgetParams), this.getParentIndex().addWidgets([this.widget]), this.instantSearchInstance.__initialSearchResults && !this.instantSearchInstance.started) {
          if ("function" != typeof this.instantSearchInstance.__forceRender) throw new Error("You are using server side rendering with <ais-instant-search> instead of <ais-instant-search-ssr>.");

          this.instantSearchInstance.__forceRender(this.widget, this.getParentIndex());
        }
      } else !0 !== i && warn("You are using the InstantSearch widget mixin, but didn't provide a connector.\nWhile this is technically possible, and will give you access to the Helper,\nit's not the recommended way of making custom components.\n\nIf you want to disable this message, pass { connector: true } to the mixin.\n\nRead more on using connectors: https://alg.li/vue-custom");
    }
  }).beforeDestroy = function () {
    this.widget && this.getParentIndex().removeWidgets([this.widget]);
  }, t.watch = {
    widgetParams: {
      handler: function (e) {
        this.state = null, this.getParentIndex().removeWidgets([this.widget]), this.widget = this.factory(e), this.getParentIndex().addWidgets([this.widget]);
      },
      deep: !0
    }
  }, t.methods = {
    updateState: function (e, t) {
      void 0 === e && (e = {}), t || (this.state = e);
    }
  }, t;
},
    Autocomplete = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("p", [e._v("This widget doesn't render anything without a filled in default slot.")]), e._v(" "), i("p", [e._v("query, function to refine and results are provided.")]), e._v(" "), i("pre", [e._v("refine: Function")]), e._v(" "), i("pre", [e._v('currentRefinement: "' + e._s(e.state.currentRefinement) + '"')]), e._v(" "), i("details", [e._m(0), e._v(" "), i("pre", [e._v(e._s(e.state.indices))])])], {
      refine: e.state.refine,
      currentRefinement: e.state.currentRefinement,
      indices: e.state.indices
    })], 2) : e._e();
  },
  staticRenderFns: [function () {
    var e = this.$createElement,
        t = this._self._c || e;
    return t("summary", [t("code", [this._v("indices")]), this._v(":")]);
  }],
  name: "AisAutocomplete",
  mixins: [createWidgetMixin({
    connector: connectors.connectAutocomplete
  }), createSuitMixin({
    name: "Autocomplete"
  })],
  props: {
    escapeHTML: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        escapeHTML: this.escapeHTML
      };
    }
  }
},
    PANEL_EMITTER_NAMESPACE = "instantSearchPanelEmitter",
    PANEL_CHANGE_EVENT = "PANEL_CHANGE_EVENT",
    createPanelProviderMixin = function () {
  var e;
  return (e = {
    props: {
      emitter: {
        type: Object,
        required: !1,
        default: function () {
          return mitt();
        }
      }
    },
    provide: function () {
      var e;
      return (e = {})[PANEL_EMITTER_NAMESPACE] = this.emitter, e;
    },
    data: function () {
      return {
        canRefine: !0
      };
    },
    created: function () {
      var e = this;
      this.emitter.on(PANEL_CHANGE_EVENT, function (t) {
        e.updateCanRefine(t);
      });
    }
  }).beforeDestroy = function () {
    this.emitter.all.clear();
  }, e.methods = {
    updateCanRefine: function (e) {
      this.canRefine = e;
    }
  }, e;
},
    createPanelConsumerMixin = function (e) {
  var t = e.mapStateToCanRefine;
  return {
    inject: {
      emitter: {
        from: PANEL_EMITTER_NAMESPACE,
        default: function () {
          return {
            emit: function () {}
          };
        }
      }
    },
    data: function () {
      return {
        state: null,
        hasAlreadyEmitted: !1
      };
    },
    watch: {
      state: {
        immediate: !0,
        handler: function (e, i) {
          if (e) {
            var n = t(i || {}),
                s = t(e);
            this.hasAlreadyEmitted && n === s || (this.emitter.emit(PANEL_CHANGE_EVENT, s), this.hasAlreadyEmitted = !0);
          }
        }
      }
    }
  };
},
    Breadcrumb = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: [e.suit(), !e.state.canRefine && e.suit("", "noRefinement")]
    }, [e._t("default", [i("ul", {
      class: e.suit("list")
    }, [i("li", {
      class: [e.suit("item"), !e.state.items.length && e.suit("item", "selected")]
    }, [Boolean(e.state.items.length) ? i("a", {
      class: e.suit("link"),
      attrs: {
        href: e.state.createURL()
      },
      on: {
        click: function (t) {
          return t.preventDefault(), e.state.refine();
        }
      }
    }, [e._t("rootLabel", [e._v("Home")])], 2) : i("span", [e._t("rootLabel", [e._v("Home")])], 2)]), e._v(" "), e._l(e.state.items, function (t, n) {
      return i("li", {
        key: t.label,
        class: [e.suit("item"), e.isLastItem(n) && e.suit("item", "selected")]
      }, [i("span", {
        class: e.suit("separator"),
        attrs: {
          "aria-hidden": "true"
        }
      }, [e._t("separator", [e._v(">")])], 2), e._v(" "), e.isLastItem(n) ? i("span", [e._v(e._s(t.label))]) : i("a", {
        class: e.suit("link"),
        attrs: {
          href: e.state.createURL(t.value)
        },
        on: {
          click: function (i) {
            return i.preventDefault(), e.state.refine(t.value);
          }
        }
      }, [e._v(e._s(t.label))])]);
    })], 2)], {
      items: e.state.items,
      canRefine: e.state.canRefine,
      refine: e.state.refine,
      createURL: e.state.createURL
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisBreadcrumb",
  mixins: [createWidgetMixin({
    connector: connectors.connectBreadcrumb
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return Boolean(e.canRefine);
    }
  }), createSuitMixin({
    name: "Breadcrumb"
  })],
  props: {
    attributes: {
      type: Array,
      required: !0
    },
    separator: {
      type: String,
      default: void 0
    },
    rootPath: {
      type: String,
      default: void 0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        attributes: this.attributes,
        separator: this.separator,
        rootPath: this.rootPath,
        transformItems: this.transformItems
      };
    }
  },
  methods: {
    isLastItem: function (e) {
      return this.state.items.length - 1 === e;
    }
  }
},
    ClearRefinements = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("button", {
      class: [e.suit("button"), !e.canRefine && e.suit("button", "disabled")],
      attrs: {
        type: "reset",
        disabled: !e.canRefine
      },
      on: {
        click: function (t) {
          return t.preventDefault(), e.state.refine(t);
        }
      }
    }, [e._t("resetLabel", [e._v("Clear refinements")])], 2)], {
      canRefine: e.canRefine,
      refine: e.state.refine,
      createURL: e.state.createURL
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisClearRefinements",
  mixins: [createWidgetMixin({
    connector: connectors.connectClearRefinements
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return Boolean(e.hasRefinements);
    }
  }), createSuitMixin({
    name: "ClearRefinements"
  })],
  props: {
    excludedAttributes: {
      type: Array,
      default: void 0
    },
    includedAttributes: {
      type: Array,
      default: void 0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        includedAttributes: this.includedAttributes,
        excludedAttributes: this.excludedAttributes,
        transformItems: this.transformItems
      };
    },
    canRefine: function () {
      return this.state.hasRefinements;
    }
  }
},
    Configure = {
  inheritAttrs: !1,
  name: "AisConfigure",
  mixins: [createSuitMixin({
    name: "Configure"
  }), createWidgetMixin({
    connector: connectors.connectConfigure
  })],
  computed: {
    widgetParams: function () {
      return {
        searchParameters: this.$attrs
      };
    }
  },
  render: renderCompat(function (e) {
    var t = this.$scopedSlots.default;
    return this.state && t ? e("div", {
      class: this.suit()
    }, [t({
      refine: this.state.refine,
      searchParameters: this.state.widgetParams.searchParameters
    })]) : null;
  })
},
    ConfigureRelatedItems = {
  inheritAttrs: !1,
  name: "AisExperimentalConfigureRelatedItems",
  mixins: [createWidgetMixin({
    connector: connectors.EXPERIMENTAL_connectConfigureRelatedItems
  })],
  props: {
    hit: {
      type: Object,
      required: !0
    },
    matchingPatterns: {
      type: Object,
      required: !0
    },
    transformSearchParameters: {
      type: Function,
      required: !1
    }
  },
  computed: {
    widgetParams: function () {
      return {
        hit: this.hit,
        matchingPatterns: this.matchingPatterns,
        transformSearchParameters: this.transformSearchParameters
      };
    }
  },
  render: function () {
    return null;
  }
},
    CurrentRefinements = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: [e.suit(), e.noRefinement && e.suit("", "noRefinement")]
    }, [e._t("default", [i("ul", {
      class: e.suit("list")
    }, e._l(e.state.items, function (t) {
      return i("li", {
        key: t.attribute,
        class: e.suit("item")
      }, [e._t("item", [i("span", {
        class: e.suit("label")
      }, [e._v(e._s(e.capitalize(t.label)) + ": ")]), e._v(" "), e._l(t.refinements, function (n) {
        return i("span", {
          key: e.createItemKey(n),
          class: e.suit("category")
        }, [e._t("refinement", [i("span", {
          class: e.suit("categoryLabel")
        }, ["query" === n.attribute ? i("q", [e._v(e._s(n.label))]) : [e._v(" " + e._s(n.label) + " ")]], 2), e._v(" "), i("button", {
          class: e.suit("delete"),
          on: {
            click: function (e) {
              return t.refine(n);
            }
          }
        }, [e._v(" ✕ ")])], {
          refine: t.refine,
          refinement: n,
          createURL: e.state.createURL
        })], 2);
      })], {
        refine: t.refine,
        item: t,
        createURL: e.state.createURL
      })], 2);
    }), 0)], {
      refine: e.state.refine,
      items: e.state.items,
      createURL: e.state.createURL
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisCurrentRefinements",
  mixins: [createSuitMixin({
    name: "CurrentRefinements"
  }), createWidgetMixin({
    connector: connectors.connectCurrentRefinements
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return Boolean(e.items) && e.items.length > 0;
    }
  })],
  props: {
    includedAttributes: {
      type: Array,
      default: void 0
    },
    excludedAttributes: {
      type: Array,
      default: void 0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    noRefinement: function () {
      return this.state && 0 === this.state.items.length;
    },
    widgetParams: function () {
      return {
        includedAttributes: this.includedAttributes,
        excludedAttributes: this.excludedAttributes,
        transformItems: this.transformItems
      };
    }
  },
  methods: {
    createItemKey: function (e) {
      var t = e.attribute,
          i = e.value;
      return [t, e.type, i, e.operator].join(":");
    },
    capitalize: function (e) {
      return e ? e.toString().charAt(0).toLocaleUpperCase() + e.toString().slice(1) : "";
    }
  }
},
    HierarchicalMenuList = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return i("ul", {
      class: [e.suit("list"), e.level > 0 && e.suit("list", "child"), e.suit("list", "lvl" + e.level)]
    }, e._l(e.items, function (t) {
      return i("li", {
        key: t.value,
        class: [e.suit("item"), t.data && e.suit("item", "parent"), t.isRefined && e.suit("item", "selected")]
      }, [i("a", {
        class: e.suit("link"),
        attrs: {
          href: e.createURL(t.value)
        },
        on: {
          click: function (i) {
            return i.preventDefault(), e.refine(t.value);
          }
        }
      }, [i("span", {
        class: e.suit("label")
      }, [e._v(e._s(t.label))]), e._v(" "), i("span", {
        class: e.suit("count")
      }, [e._v(e._s(t.count))])]), e._v(" "), t.data ? i("hierarchical-menu-list", {
        attrs: {
          items: t.data,
          level: e.level + 1,
          refine: e.refine,
          createURL: e.createURL,
          suit: e.suit
        }
      }) : e._e()], 1);
    }), 0);
  },
  staticRenderFns: [],
  name: "HierarchicalMenuList",
  props: {
    items: {
      type: Array,
      required: !0
    },
    level: {
      type: Number,
      required: !0
    },
    refine: {
      type: Function,
      required: !0
    },
    createURL: {
      type: Function,
      required: !0
    },
    suit: {
      type: Function,
      required: !0
    }
  }
},
    mapStateToCanRefine = function (e) {
  return Boolean(e.items) && e.items.length > 0;
},
    HierarchicalMenu = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: [e.suit(), !e.canRefine && e.suit("", "noRefinement")]
    }, [e._t("default", [i("hierarchical-menu-list", {
      attrs: {
        items: e.state.items,
        level: 0,
        refine: e.state.refine,
        createURL: e.state.createURL,
        suit: e.suit
      }
    }), e._v(" "), e.showMore ? i("button", {
      class: [e.suit("showMore"), !e.state.canToggleShowMore && e.suit("showMore", "disabled")],
      attrs: {
        disabled: !e.state.canToggleShowMore
      },
      on: {
        click: function (t) {
          return t.preventDefault(), e.state.toggleShowMore(t);
        }
      }
    }, [e._t("showMoreLabel", [e._v(e._s(e.state.isShowingMore ? "Show less" : "Show more"))], {
      isShowingMore: e.state.isShowingMore
    })], 2) : e._e()], {
      items: e.state.items,
      canRefine: e.canRefine,
      canToggleShowMore: e.state.canToggleShowMore,
      isShowingMore: e.state.isShowingMore,
      refine: e.state.refine,
      createURL: e.state.createURL,
      toggleShowMore: e.state.toggleShowMore,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisHierarchicalMenu",
  mixins: [createSuitMixin({
    name: "HierarchicalMenu"
  }), createWidgetMixin({
    connector: connectors.connectHierarchicalMenu
  }), createPanelConsumerMixin({
    mapStateToCanRefine: mapStateToCanRefine
  })],
  components: {
    HierarchicalMenuList: HierarchicalMenuList
  },
  props: {
    attributes: {
      type: Array,
      required: !0
    },
    limit: {
      type: Number,
      default: void 0
    },
    showMoreLimit: {
      type: Number,
      default: void 0
    },
    showMore: {
      type: Boolean,
      default: !1
    },
    sortBy: {
      type: [Array, Function],
      default: void 0
    },
    separator: {
      type: String,
      default: void 0
    },
    rootPath: {
      type: String,
      default: void 0
    },
    showParentLevel: {
      type: Boolean,
      default: void 0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        attributes: this.attributes,
        limit: this.limit,
        showMore: this.showMore,
        showMoreLimit: this.showMoreLimit,
        separator: this.separator,
        rootPath: this.rootPath,
        showParentLevel: this.showParentLevel,
        sortBy: this.sortBy,
        transformItems: this.transformItems
      };
    },
    canRefine: function () {
      return mapStateToCanRefine(this.state);
    }
  }
},
    htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
},
    reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
    reHasEscapedHtml = RegExp(reEscapedHtml.source);

function unescape(e) {
  return e && reHasEscapedHtml.test(e) ? e.replace(reEscapedHtml, function (e) {
    return htmlUnescapes[e];
  }) : e;
}

var TAG_PLACEHOLDER = {
  highlightPreTag: "__ais-highlight__",
  highlightPostTag: "__/ais-highlight__"
};

function parseHighlightedAttribute(e) {
  var t = e.preTag,
      i = e.postTag,
      n = e.highlightedValue;
  void 0 === n && (n = "");
  var s = n.split(t),
      a = s.shift(),
      r = "" === a ? [] : [{
    value: a,
    isHighlighted: !1
  }];

  if (i === t) {
    var o = !0;
    s.forEach(function (e) {
      r.push({
        value: e,
        isHighlighted: o
      }), o = !o;
    });
  } else s.forEach(function (e) {
    var t = e.split(i);
    r.push({
      value: t[0],
      isHighlighted: !0
    }), "" !== t[1] && r.push({
      value: " " === t[1] ? "  " : t[1],
      isHighlighted: !1
    });
  });

  return r;
}

function parseAlgoliaHit(e) {
  var t = e.preTag;
  void 0 === t && (t = TAG_PLACEHOLDER.highlightPreTag);
  var i = e.postTag;
  void 0 === i && (i = TAG_PLACEHOLDER.highlightPostTag);
  var n = e.highlightProperty,
      s = e.attribute,
      a = e.hit;
  if (!a) throw new Error("`hit`, the matching record, must be provided");
  var r = utils.getPropertyByPath(a[n], s) || {};
  return Array.isArray(r) ? r.map(function (e) {
    return parseHighlightedAttribute({
      preTag: t,
      postTag: i,
      highlightedValue: unescape(e.value)
    });
  }) : parseHighlightedAttribute({
    preTag: t,
    postTag: i,
    highlightedValue: unescape(r.value)
  });
}

var TextNode = {
  functional: !0,
  render: function (e, t) {
    return t.slots().default;
  }
},
    AisHighlighter = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return i("span", {
      class: e.suit()
    }, e._l(e.parsedHighlights, function (t, n) {
      var s = t.value,
          a = t.isHighlighted;
      return i(a ? e.highlightedTagName : e.TextNode, {
        key: n,
        tag: "component",
        class: [a && e.suit("highlighted")]
      }, [e._v(e._s(s))]);
    }), 1);
  },
  staticRenderFns: [],
  name: "AisHighlighter",
  props: {
    hit: {
      type: Object,
      required: !0
    },
    attribute: {
      type: String,
      required: !0
    },
    highlightedTagName: {
      type: String,
      default: "mark"
    },
    suit: {
      type: Function,
      required: !0
    },
    highlightProperty: {
      type: String,
      required: !0
    },
    preTag: {
      type: String,
      required: !0
    },
    postTag: {
      type: String,
      required: !0
    }
  },
  data: function () {
    return {
      TextNode: TextNode
    };
  },
  computed: {
    parsedHighlights: function () {
      return parseAlgoliaHit({
        attribute: this.attribute,
        hit: this.hit,
        highlightProperty: this.highlightProperty,
        preTag: this.preTag,
        postTag: this.postTag
      });
    }
  }
},
    AisHighlight = {
  render: function () {
    var e = this.$createElement;
    return (this._self._c || e)("ais-highlighter", {
      attrs: {
        hit: this.hit,
        attribute: this.attribute,
        "highlighted-tag-name": this.highlightedTagName,
        suit: this.suit,
        "highlight-property": "_highlightResult",
        "pre-tag": "<mark>",
        "post-tag": "</mark>"
      }
    });
  },
  staticRenderFns: [],
  name: "AisHighlight",
  mixins: [createSuitMixin({
    name: "Highlight"
  })],
  components: {
    AisHighlighter: AisHighlighter
  },
  props: {
    hit: {
      type: Object,
      required: !0
    },
    attribute: {
      type: String,
      required: !0
    },
    highlightedTagName: {
      type: String,
      default: "mark"
    }
  }
},
    Hits = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("ol", {
      class: e.suit("list")
    }, e._l(e.items, function (t, n) {
      return i("li", {
        key: t.objectID,
        class: e.suit("item")
      }, [e._t("item", [e._v("objectID: " + e._s(t.objectID) + ", index: " + e._s(n))], {
        item: t,
        index: n,
        insights: e.state.insights
      })], 2);
    }), 0)], {
      items: e.items,
      insights: e.state.insights,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisHits",
  mixins: [createWidgetMixin({
    connector: connectors.connectHitsWithInsights
  }), createSuitMixin({
    name: "Hits"
  })],
  props: {
    escapeHTML: {
      type: Boolean,
      default: !0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    items: function () {
      return this.state.hits;
    },
    widgetParams: function () {
      return {
        escapeHTML: this.escapeHTML,
        transformItems: this.transformItems
      };
    }
  }
},
    HitsPerPage = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("select", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: e.selected,
        expression: "selected"
      }],
      class: e.suit("select"),
      on: {
        change: [function (t) {
          var i = Array.prototype.filter.call(t.target.options, function (e) {
            return e.selected;
          }).map(function (e) {
            return "_value" in e ? e._value : e.value;
          });
          e.selected = t.target.multiple ? i : i[0];
        }, e.handleChange]
      }
    }, e._l(e.state.items, function (t) {
      return i("option", {
        key: t.value,
        class: e.suit("option"),
        domProps: {
          value: t.value
        }
      }, [e._v(e._s(t.label))]);
    }), 0)], {
      items: e.state.items,
      refine: e.state.refine,
      hasNoResults: e.state.hasNoResults
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisHitsPerPage",
  mixins: [createSuitMixin({
    name: "HitsPerPage"
  }), createWidgetMixin({
    connector: connectors.connectHitsPerPage
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return !1 === e.hasNoResults;
    }
  })],
  props: {
    items: {
      type: Array,
      required: !0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  data: function () {
    return {
      selected: this.items.find(function (e) {
        return !0 === e.default;
      }).value
    };
  },
  computed: {
    widgetParams: function () {
      return {
        items: this.items,
        transformItems: this.transformItems
      };
    }
  },
  methods: {
    handleChange: function () {
      this.state.refine(this.selected);
    }
  }
},
    connectIndex = function () {
  return indexWidget;
},
    Index = {
  name: "AisIndex",
  mixins: [createSuitMixin({
    name: "Index"
  }), createWidgetMixin({
    connector: connectIndex
  })],
  provide: function () {
    var e = this;
    return {
      $_ais_getParentIndex: function () {
        return e.widget;
      }
    };
  },
  props: {
    indexName: {
      type: String,
      required: !0
    },
    indexId: {
      type: String,
      required: !1
    }
  },
  render: renderCompat(function (e) {
    return e("div", {}, getDefaultSlot(this));
  }),
  computed: {
    widgetParams: function () {
      return {
        indexName: this.indexName,
        indexId: this.indexId
      };
    }
  }
},
    version$1 = "4.1.1";

function _objectSpread(e) {
  for (var t = arguments, i = 1; i < arguments.length; i++) {
    var n = null != t[i] ? t[i] : {},
        s = Object.keys(n);
    "function" == typeof Object.getOwnPropertySymbols && (s = s.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), s.forEach(function (t) {
      _defineProperty(e, t, n[t]);
    });
  }

  return e;
}

function _defineProperty(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}

var createInstantSearchComponent = function (e) {
  var t;
  return _objectSpread(((t = {
    mixins: [createSuitMixin({
      name: "InstantSearch"
    })],
    provide: function () {
      return {
        $_ais_instantSearchInstance: this.instantSearchInstance
      };
    },
    watch: {
      searchClient: function (e) {
        this.instantSearchInstance.helper.setClient(e).search();
      },
      indexName: function (e) {
        this.instantSearchInstance.helper.setIndex(e).search();
      },
      stalledSearchDelay: function (e) {
        this.instantSearchInstance._stalledSearchDelay = e;
      },
      routing: function () {
        throw new Error("routing configuration can not be changed dynamically at this point.\n\nPlease open a new issue: https://github.com/algolia/vue-instantsearch/issues/new?template=feature.md");
      },
      searchFunction: function (e) {
        this.instantSearchInstance._searchFunction = e;
      },
      middlewares: {
        immediate: !0,
        handler: function (e, t) {
          var i = this;
          (t || []).filter(function (t) {
            return -1 === (e || []).indexOf(t);
          }).forEach(function (e) {
            i.instantSearchInstance.unuse(e);
          }), (e || []).filter(function (e) {
            return -1 === (t || []).indexOf(e);
          }).forEach(function (e) {
            i.instantSearchInstance.use(e);
          });
        }
      }
    },
    created: function () {
      var e = this.instantSearchInstance.client;
      "function" == typeof e.addAlgoliaAgent && (e.addAlgoliaAgent("Vue (" + version + ")"), e.addAlgoliaAgent("Vue InstantSearch (" + version$1 + ")"));
    },
    mounted: function () {
      var e = this;
      this.$nextTick(function () {
        e.instantSearchInstance.started || e.instantSearchInstance.start();
      });
    }
  }).beforeDestroy = function () {
    this.instantSearchInstance.started && this.instantSearchInstance.dispose(), this.instantSearchInstance.__initialSearchResults = void 0;
  }, t), e);
},
    oldApiWarning = "Vue InstantSearch: You used the prop api-key or app-id.\nThese have been replaced by search-client.\n\nSee more info here: https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-search-client",
    InstantSearch = createInstantSearchComponent({
  name: "AisInstantSearch",
  props: {
    searchClient: {
      type: Object,
      required: !0
    },
    insightsClient: {
      type: Function,
      default: void 0
    },
    indexName: {
      type: String,
      required: !0
    },
    routing: {
      default: void 0,
      validator: function (e) {
        return !("boolean" == typeof e || !e.router && !e.stateMapping) || (warn("The `routing` option expects an object with `router` and/or `stateMapping`.\n\nSee https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-routing"), !1);
      }
    },
    stalledSearchDelay: {
      type: Number,
      default: void 0
    },
    searchFunction: {
      type: Function,
      default: void 0
    },
    initialUiState: {
      type: Object,
      default: void 0
    },
    apiKey: {
      type: String,
      default: void 0,
      validator: function (e) {
        return e && warn(oldApiWarning), !1;
      }
    },
    appId: {
      type: String,
      default: void 0,
      validator: function (e) {
        return e && warn(oldApiWarning), !1;
      }
    },
    middlewares: {
      type: Array,
      default: null
    }
  },
  data: function () {
    return {
      instantSearchInstance: instantsearch({
        searchClient: this.searchClient,
        insightsClient: this.insightsClient,
        indexName: this.indexName,
        routing: this.routing,
        stalledSearchDelay: this.stalledSearchDelay,
        searchFunction: this.searchFunction,
        initialUiState: this.initialUiState
      })
    };
  },
  render: renderCompat(function (e) {
    var t;
    return e("div", {
      class: (t = {}, t[this.suit()] = !0, t[this.suit("", "ssr")] = !1, t)
    }, getDefaultSlot(this));
  })
}),
    InstantSearchSsr = createInstantSearchComponent({
  name: "AisInstantSearchSsr",
  inject: {
    $_ais_ssrInstantSearchInstance: {
      default: function () {
        throw new Error("`createServerRootMixin` is required when using SSR.");
      }
    }
  },
  data: function () {
    return {
      instantSearchInstance: this.$_ais_ssrInstantSearchInstance
    };
  },
  render: renderCompat(function (e) {
    var t;
    return e("div", {
      class: (t = {}, t[this.suit()] = !0, t[this.suit("", "ssr")] = !0, t)
    }, getDefaultSlot(this));
  })
}),
    InfiniteHits = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e.showPrevious ? e._t("loadPrevious", [i("button", {
      class: [e.suit("loadPrevious"), e.state.isFirstPage && e.suit("loadPrevious", "disabled")],
      attrs: {
        disabled: e.state.isFirstPage
      },
      on: {
        click: function (t) {
          return e.refinePrevious();
        }
      }
    }, [e._v("Show previous results")])], {
      refinePrevious: e.refinePrevious,
      page: e.state.results.page,
      isFirstPage: e.state.isFirstPage
    }) : e._e(), e._v(" "), e._t("default", [i("ol", {
      class: e.suit("list")
    }, e._l(e.items, function (t, n) {
      return i("li", {
        key: t.objectID,
        class: e.suit("item")
      }, [e._t("item", [e._v("objectID: " + e._s(t.objectID) + ", index: " + e._s(n))], {
        item: t,
        index: n,
        insights: e.state.insights
      })], 2);
    }), 0), e._v(" "), e._t("loadMore", [i("button", {
      class: [e.suit("loadMore"), e.state.isLastPage && e.suit("loadMore", "disabled")],
      attrs: {
        disabled: e.state.isLastPage
      },
      on: {
        click: function (t) {
          return e.refineNext();
        }
      }
    }, [e._v("Show more results")])], {
      refineNext: e.refineNext,
      refine: e.refineNext,
      page: e.state.results.page,
      isLastPage: e.state.isLastPage
    })], {
      items: e.items,
      results: e.state.results,
      isLastPage: e.state.isLastPage,
      refinePrevious: e.refinePrevious,
      refineNext: e.refineNext,
      refine: e.refineNext,
      insights: e.state.insights,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisInfiniteHits",
  mixins: [createWidgetMixin({
    connector: connectors.connectInfiniteHitsWithInsights
  }), createSuitMixin({
    name: "InfiniteHits"
  })],
  props: {
    showPrevious: {
      type: Boolean,
      default: !1
    },
    escapeHTML: {
      type: Boolean,
      default: !0
    },
    transformItems: {
      type: Function,
      default: void 0
    },
    cache: {
      type: Object,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        showPrevious: this.showPrevious,
        escapeHTML: this.escapeHTML,
        transformItems: this.transformItems,
        cache: this.cache
      };
    },
    items: function () {
      return this.state.hits;
    }
  },
  methods: {
    refinePrevious: function () {
      this.state.showPrevious();
    },
    refineNext: function () {
      this.state.showMore();
    }
  }
},
    Menu = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: [e.suit(), !e.state.canRefine && e.suit("", "noRefinement")]
    }, [e._t("default", [i("ul", {
      class: e.suit("list")
    }, e._l(e.state.items, function (t) {
      return i("li", {
        key: t.value,
        class: [e.suit("item"), t.isRefined && e.suit("item", "selected")]
      }, [i("a", {
        class: e.suit("link"),
        attrs: {
          href: e.state.createURL(t.value)
        },
        on: {
          click: function (i) {
            return i.preventDefault(), e.state.refine(t.value);
          }
        }
      }, [i("span", {
        class: e.suit("label")
      }, [e._v(e._s(t.label))]), e._v(" "), i("span", {
        class: e.suit("count")
      }, [e._v(e._s(t.count))])])]);
    }), 0), e._v(" "), e.showShowMoreButton ? i("button", {
      class: [e.suit("showMore"), !e.state.canToggleShowMore && e.suit("showMore", "disabled")],
      attrs: {
        disabled: !e.state.canToggleShowMore
      },
      on: {
        click: function (t) {
          return t.preventDefault(), e.state.toggleShowMore();
        }
      }
    }, [e._t("showMoreLabel", [e._v(e._s(e.state.isShowingMore ? "Show less" : "Show more"))], {
      isShowingMore: e.state.isShowingMore
    })], 2) : e._e()], {
      items: e.state.items,
      canRefine: e.state.canRefine,
      canToggleShowMore: e.state.canToggleShowMore,
      isShowingMore: e.state.isShowingMore,
      refine: e.state.refine,
      createURL: e.state.createURL,
      toggleShowMore: e.state.toggleShowMore,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisMenu",
  mixins: [createSuitMixin({
    name: "Menu"
  }), createWidgetMixin({
    connector: connectors.connectMenu
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return Boolean(e.canRefine);
    }
  })],
  props: {
    attribute: {
      type: String,
      required: !0
    },
    limit: {
      type: Number,
      default: void 0
    },
    showMoreLimit: {
      type: Number,
      default: void 0
    },
    showMore: {
      type: Boolean,
      default: !1
    },
    sortBy: {
      type: [Array, Function],
      default: void 0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        attribute: this.attribute,
        limit: this.limit,
        showMore: this.showMore,
        showMoreLimit: this.showMoreLimit,
        sortBy: this.sortBy,
        transformItems: this.transformItems
      };
    },
    showShowMoreButton: function () {
      return this.state.canRefine && this.showMore;
    }
  }
},
    MenuSelect = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: [e.suit(), !e.state.canRefine && e.suit("", "noRefinement")]
    }, [e._t("default", [i("select", {
      class: e.suit("select"),
      on: {
        change: function (t) {
          return e.refine(t.currentTarget.value);
        }
      }
    }, [i("option", {
      class: e.suit("option"),
      attrs: {
        value: ""
      }
    }, [e._t("defaultOption", [e._v("See all")])], 2), e._v(" "), e._l(e.state.items, function (t) {
      return i("option", {
        key: t.value,
        class: e.suit("option"),
        domProps: {
          value: t.value,
          selected: t.isRefined
        }
      }, [e._t("item", [e._v(e._s(t.label) + " (" + e._s(t.count) + ")")], {
        item: t
      })], 2);
    })], 2)], {
      items: e.state.items,
      canRefine: e.state.canRefine,
      refine: e.refine,
      createURL: e.state.createURL,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisMenuSelect",
  mixins: [createSuitMixin({
    name: "MenuSelect"
  }), createWidgetMixin({
    connector: connectors.connectMenu
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return Boolean(e.canRefine);
    }
  })],
  props: {
    attribute: {
      type: String,
      required: !0
    },
    limit: {
      type: Number,
      default: 10
    },
    sortBy: {
      type: [Array, Function],
      default: void 0
    },
    transformItems: {
      type: Function,
      default: function (e) {
        return e;
      }
    }
  },
  computed: {
    widgetParams: function () {
      return {
        attribute: this.attribute,
        limit: this.limit,
        sortBy: this.sortBy,
        transformItems: this.transformItems
      };
    }
  },
  methods: {
    refine: function (e) {
      this.state.refine(e);
    }
  }
},
    NumericMenu = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: [e.suit(), !e.canRefine && e.suit("", "noRefinement")]
    }, [e._t("default", [i("ul", {
      class: [e.suit("list")]
    }, e._l(e.state.items, function (t) {
      return i("li", {
        key: t.label,
        class: [e.suit("item"), t.isRefined && e.suit("item", "selected")]
      }, [i("label", {
        class: e.suit("label")
      }, [i("input", {
        class: e.suit("radio"),
        attrs: {
          type: "radio",
          name: e.attribute
        },
        domProps: {
          value: t.value,
          checked: t.isRefined
        },
        on: {
          change: function (t) {
            return e.state.refine(t.target.value);
          }
        }
      }), e._v(" "), i("span", {
        class: e.suit("labelText")
      }, [e._v(e._s(t.label))])])]);
    }), 0)], {
      items: e.state.items,
      canRefine: e.canRefine,
      refine: e.state.refine,
      createURL: e.state.createURL,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisNumericMenu",
  mixins: [createWidgetMixin({
    connector: connectors.connectNumericMenu
  }), createSuitMixin({
    name: "NumericMenu"
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return !1 === e.hasNoResults;
    }
  })],
  props: {
    attribute: {
      type: String,
      required: !0
    },
    items: {
      type: Array,
      required: !0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        attribute: this.attribute,
        transformItems: this.transformItems,
        items: this.items
      };
    },
    canRefine: function () {
      return !this.state.hasNoResults;
    }
  }
},
    Pagination = {
  render: function () {
    var e,
        t,
        i,
        n,
        s = this,
        a = s.$createElement,
        r = s._self._c || a;
    return s.state ? r("div", {
      class: s.suit()
    }, [s._t("default", [r("ul", {
      class: s.suit("list")
    }, [s.showFirst ? r("li", {
      class: (e = {}, e[s.suit("item")] = !0, e[s.suit("item", "firstPage")] = !0, e[s.suit("item", "disabled")] = s.state.isFirstPage, e)
    }, [s._t("first", [s.state.isFirstPage ? [r("span", {
      class: s.suit("link"),
      attrs: {
        "aria-label": "First"
      }
    }, [s._v("‹‹")])] : [r("a", {
      class: s.suit("link"),
      attrs: {
        "aria-label": "First",
        href: s.state.createURL(0)
      },
      on: {
        click: function (e) {
          return e.preventDefault(), s.refine(0);
        }
      }
    }, [s._v("‹‹")])]], {
      createURL: function () {
        return s.state.createURL(0);
      },
      isFirstPage: s.state.isFirstPage,
      refine: function () {
        return s.refine(0);
      }
    })], 2) : s._e(), s._v(" "), s.showPrevious ? r("li", {
      class: (t = {}, t[s.suit("item")] = !0, t[s.suit("item", "previousPage")] = !0, t[s.suit("item", "disabled")] = s.state.isFirstPage, t)
    }, [s._t("previous", [s.state.isFirstPage ? [r("span", {
      class: s.suit("link"),
      attrs: {
        "aria-label": "Previous"
      }
    }, [s._v("‹")])] : [r("a", {
      class: s.suit("link"),
      attrs: {
        "aria-label": "Previous",
        href: s.state.createURL(s.state.currentRefinement - 1)
      },
      on: {
        click: function (e) {
          return e.preventDefault(), s.refine(s.state.currentRefinement - 1);
        }
      }
    }, [s._v("‹")])]], {
      createURL: function () {
        return s.state.createURL(s.state.currentRefinement - 1);
      },
      isFirstPage: s.state.isFirstPage,
      refine: function () {
        return s.refine(s.state.currentRefinement - 1);
      }
    })], 2) : s._e(), s._v(" "), s._l(s.state.pages, function (e) {
      var t;
      return r("li", {
        key: e,
        class: (t = {}, t[s.suit("item")] = !0, t[s.suit("item", "selected")] = s.state.currentRefinement === e, t)
      }, [s._t("item", [r("a", {
        class: s.suit("link"),
        attrs: {
          href: s.state.createURL(e)
        },
        on: {
          click: function (t) {
            return t.preventDefault(), s.refine(e);
          }
        }
      }, [s._v(s._s(e + 1))])], {
        page: e,
        createURL: function () {
          return s.state.createURL(e);
        },
        isFirstPage: s.state.isFirstPage,
        isLastPage: s.state.isLastPage,
        refine: function () {
          return s.refine(e);
        }
      })], 2);
    }), s._v(" "), s.showNext ? r("li", {
      class: (i = {}, i[s.suit("item")] = !0, i[s.suit("item", "nextPage")] = !0, i[s.suit("item", "disabled")] = s.state.isLastPage, i)
    }, [s._t("next", [s.state.isLastPage ? [r("span", {
      class: s.suit("link"),
      attrs: {
        "aria-label": "Next"
      }
    }, [s._v("›")])] : [r("a", {
      class: s.suit("link"),
      attrs: {
        "aria-label": "Next",
        href: s.state.createURL(s.state.currentRefinement + 1)
      },
      on: {
        click: function (e) {
          return e.preventDefault(), s.refine(s.state.currentRefinement + 1);
        }
      }
    }, [s._v("›")])]], {
      createURL: function () {
        return s.state.createURL(s.state.currentRefinement + 1);
      },
      isLastPage: s.state.isLastPage,
      refine: function () {
        return s.refine(s.state.currentRefinement + 1);
      }
    })], 2) : s._e(), s._v(" "), s.showLast ? r("li", {
      class: (n = {}, n[s.suit("item")] = !0, n[s.suit("item", "lastPage")] = !0, n[s.suit("item", "disabled")] = s.state.isLastPage, n)
    }, [s._t("last", [s.state.isLastPage ? [r("span", {
      class: s.suit("link"),
      attrs: {
        "aria-label": "Last"
      }
    }, [s._v("››")])] : [r("a", {
      class: s.suit("link"),
      attrs: {
        "aria-label": "Last",
        href: s.state.createURL(s.state.nbPages - 1)
      },
      on: {
        click: function (e) {
          return e.preventDefault(), s.refine(s.state.nbPages - 1);
        }
      }
    }, [s._v("››")])]], {
      createURL: function () {
        return s.state.createURL(s.state.nbPages - 1);
      },
      isLastPage: s.state.isLastPage,
      refine: function () {
        return s.refine(s.state.nbPages - 1);
      }
    })], 2) : s._e()], 2)], {
      refine: s.refine,
      createURL: s.state.createURL,
      currentRefinement: s.state.currentRefinement,
      nbHits: s.state.nbHits,
      nbPages: s.state.nbPages,
      pages: s.state.pages,
      isFirstPage: s.state.isFirstPage,
      isLastPage: s.state.isLastPage
    })], 2) : s._e();
  },
  staticRenderFns: [],
  name: "AisPagination",
  mixins: [createSuitMixin({
    name: "Pagination"
  }), createWidgetMixin({
    connector: connectors.connectPagination
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return e.nbPages > 1;
    }
  })],
  props: {
    padding: {
      type: Number,
      default: void 0,
      validator: function (e) {
        return e > 0;
      }
    },
    totalPages: {
      type: Number,
      default: void 0,
      validator: function (e) {
        return e > 0;
      }
    },
    showFirst: {
      type: Boolean,
      default: !0
    },
    showLast: {
      type: Boolean,
      default: !0
    },
    showNext: {
      type: Boolean,
      default: !0
    },
    showPrevious: {
      type: Boolean,
      default: !0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        padding: this.padding,
        totalPages: this.totalPages
      };
    }
  },
  emits: ["page-change"],
  methods: {
    refine: function (e) {
      var t = Math.min(Math.max(e, 0), this.state.nbPages - 1);
      this.state.refine(t), this.$emit("page-change", t);
    }
  }
},
    Panel = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return i("div", {
      class: [e.suit(), !e.canRefine && e.suit("", "noRefinement")]
    }, [e.getSlot("header") ? i("div", {
      class: e.suit("header")
    }, [e._t("header", null, {
      hasRefinements: e.canRefine
    })], 2) : e._e(), e._v(" "), i("div", {
      class: e.suit("body")
    }, [e._t("default", null, {
      hasRefinements: e.canRefine
    })], 2), e._v(" "), e.getSlot("footer") ? i("div", {
      class: e.suit("footer")
    }, [e._t("footer", null, {
      hasRefinements: e.canRefine
    })], 2) : e._e()]);
  },
  staticRenderFns: [],
  name: "AisPanel",
  mixins: [createSuitMixin({
    name: "Panel"
  }), createPanelProviderMixin()],
  methods: {
    getSlot: function (e) {
      return this.$slots[e] || this.$scopedSlots[e];
    }
  }
},
    PoweredBy = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return i("div", {
      class: e.suit()
    }, [i("a", {
      class: e.suit("link"),
      attrs: {
        href: e.algoliaUrl,
        target: "_blank",
        rel: "noopener",
        "aria-label": "search by Algolia"
      }
    }, [i("svg", {
      class: [e.suit("logo"), e.suit("", e.theme)],
      staticStyle: {
        height: "1.2em",
        width: "auto"
      },
      attrs: {
        viewBox: "0 0 168 24"
      }
    }, [i("path", {
      attrs: {
        fill: "dark" === e.theme ? "#FFF" : "#5D6494",
        d: "M6.97 6.68V8.3a4.47 4.47 0 0 0-2.42-.67 2.2 2.2 0 0 0-1.38.4c-.34.26-.5.6-.5 1.02 0 .43.16.77.49 1.03.33.25.83.53 1.51.83a7.04 7.04 0 0 1 1.9 1.08c.34.24.58.54.73.89.15.34.23.74.23 1.18 0 .95-.33 1.7-1 2.24a4 4 0 0 1-2.6.81 5.71 5.71 0 0 1-2.94-.68v-1.71c.84.63 1.81.94 2.92.94.58 0 1.05-.14 1.39-.4.34-.28.5-.65.5-1.13 0-.29-.1-.55-.3-.8a2.2 2.2 0 0 0-.65-.53 23.03 23.03 0 0 0-1.64-.78 13.67 13.67 0 0 1-1.11-.64c-.12-.1-.28-.22-.46-.4a1.72 1.72 0 0 1-.39-.5 4.46 4.46 0 0 1-.22-.6c-.07-.23-.1-.48-.1-.75 0-.91.33-1.63 1-2.17a4 4 0 0 1 2.57-.8c.97 0 1.8.18 2.47.52zm7.47 5.7v-.3a2.26 2.26 0 0 0-.5-1.44c-.3-.35-.74-.53-1.32-.53-.53 0-.99.2-1.37.58-.38.39-.62.95-.72 1.68h3.91zm1 2.79v1.4c-.6.34-1.38.51-2.36.51a4.02 4.02 0 0 1-3-1.13 4.04 4.04 0 0 1-1.11-2.97c0-1.3.34-2.32 1.02-3.06a3.38 3.38 0 0 1 2.6-1.1c1.03 0 1.85.32 2.46.96.6.64.9 1.57.9 2.78 0 .33-.03.68-.09 1.04h-5.31c.1.7.4 1.24.89 1.61.49.38 1.1.56 1.85.56.86 0 1.58-.2 2.15-.6zm6.61-1.78h-1.21c-.6 0-1.05.12-1.35.36-.3.23-.46.53-.46.89 0 .37.12.66.36.88.23.2.57.32 1.02.32.5 0 .9-.15 1.2-.43.3-.28.44-.65.44-1.1v-.92zm-4.07-2.55V9.33a4.96 4.96 0 0 1 2.5-.55c2.1 0 3.17 1.03 3.17 3.08V17H22.1v-.96c-.42.68-1.15 1.02-2.19 1.02-.76 0-1.38-.22-1.84-.66-.46-.44-.7-1-.7-1.68 0-.78.3-1.38.88-1.81.59-.43 1.4-.65 2.46-.65h1.34v-.46c0-.55-.13-.97-.4-1.25-.26-.29-.7-.43-1.32-.43-.86 0-1.65.24-2.35.72zm9.34-1.93v1.42c.39-1 1.1-1.5 2.12-1.5.15 0 .31.02.5.05v1.53c-.23-.1-.48-.14-.76-.14-.54 0-.99.24-1.34.71a2.8 2.8 0 0 0-.52 1.71V17h-1.57V8.91h1.57zm5 4.09a3 3 0 0 0 .76 2.01c.47.53 1.14.8 2 .8.64 0 1.24-.18 1.8-.53v1.4c-.53.32-1.2.48-2 .48a3.98 3.98 0 0 1-4.17-4.18c0-1.16.38-2.15 1.14-2.98a4 4 0 0 1 3.1-1.23c.7 0 1.34.15 1.92.44v1.44a3.24 3.24 0 0 0-1.77-.5A2.65 2.65 0 0 0 32.33 13zm7.92-7.28v4.58c.46-1 1.3-1.5 2.5-1.5.8 0 1.42.24 1.9.73.48.5.72 1.17.72 2.05V17H43.8v-5.1c0-.56-.14-.99-.43-1.29-.28-.3-.65-.45-1.1-.45-.54 0-1 .2-1.42.6-.4.4-.61 1.02-.61 1.85V17h-1.56V5.72h1.56zM55.2 15.74c.6 0 1.1-.25 1.5-.76.4-.5.6-1.16.6-1.95 0-.92-.2-1.62-.6-2.12-.4-.5-.92-.74-1.55-.74-.56 0-1.05.22-1.5.67-.44.45-.66 1.13-.66 2.06 0 .96.22 1.67.64 2.14.43.47.95.7 1.57.7zM53 5.72v4.42a2.74 2.74 0 0 1 2.43-1.34c1.03 0 1.86.38 2.51 1.15.65.76.97 1.78.97 3.05 0 1.13-.3 2.1-.92 2.9-.62.81-1.47 1.21-2.54 1.21s-1.9-.45-2.46-1.34V17h-1.58V5.72H53zm9.9 11.1l-3.22-7.9h1.74l1 2.62 1.26 3.42c.1-.32.48-1.46 1.15-3.42l.91-2.63h1.66l-2.92 7.87c-.78 2.07-1.96 3.1-3.56 3.1-.28 0-.53-.02-.73-.07v-1.34c.17.04.35.06.54.06 1.03 0 1.76-.57 2.17-1.7z"
      }
    }), e._v(" "), i("path", {
      attrs: {
        fill: "#5468FF",
        d: "M78.99.94h16.6a2.97 2.97 0 0 1 2.96 2.96v16.6a2.97 2.97 0 0 1-2.97 2.96h-16.6a2.97 2.97 0 0 1-2.96-2.96V3.9A2.96 2.96 0 0 1 79 .94"
      }
    }), e._v(" "), i("path", {
      attrs: {
        fill: "#FFF",
        d: "M89.63 5.97v-.78a.98.98 0 0 0-.98-.97h-2.28a.98.98 0 0 0-.97.97V6c0 .09.08.15.17.13a7.13 7.13 0 0 1 3.9-.02c.08.02.16-.04.16-.13m-6.25 1L83 6.6a.98.98 0 0 0-1.38 0l-.46.46a.97.97 0 0 0 0 1.38l.38.39c.06.06.15.04.2-.02a7.49 7.49 0 0 1 1.63-1.62c.07-.04.08-.14.02-.2m4.16 2.45v3.34c0 .1.1.17.2.12l2.97-1.54c.06-.03.08-.12.05-.18a3.7 3.7 0 0 0-3.08-1.87c-.07 0-.14.06-.14.13m0 8.05a4.49 4.49 0 1 1 0-8.98 4.49 4.49 0 0 1 0 8.98m0-10.85a6.37 6.37 0 1 0 0 12.74 6.37 6.37 0 0 0 0-12.74"
      }
    }), e._v(" "), i("path", {
      attrs: {
        fill: "dark" === e.theme ? "#FFF" : "#5468FF",
        d: "M120.92 18.8c-4.38.02-4.38-3.54-4.38-4.1V1.36l2.67-.42v13.25c0 .32 0 2.36 1.71 2.37v2.24zm-10.84-2.18c.82 0 1.43-.04 1.85-.12v-2.72a5.48 5.48 0 0 0-1.57-.2c-.3 0-.6.02-.9.07-.3.04-.57.12-.81.24-.24.11-.44.28-.58.49a.93.93 0 0 0-.22.65c0 .63.22 1 .61 1.23.4.24.94.36 1.62.36zm-.23-9.7c.88 0 1.62.11 2.23.33.6.22 1.09.53 1.44.92.36.4.61.92.76 1.48.16.56.23 1.17.23 1.85v6.87c-.4.1-1.03.2-1.86.32-.84.12-1.78.18-2.82.18-.69 0-1.32-.07-1.9-.2a4 4 0 0 1-1.46-.63c-.4-.3-.72-.67-.96-1.13a4.3 4.3 0 0 1-.34-1.8c0-.66.13-1.08.39-1.53.26-.45.6-.82 1.04-1.1.45-.3.95-.5 1.54-.62a8.8 8.8 0 0 1 3.79.05v-.44c0-.3-.04-.6-.11-.87a1.78 1.78 0 0 0-1.1-1.22c-.31-.12-.7-.2-1.15-.2a9.75 9.75 0 0 0-2.95.46l-.33-2.19c.34-.12.84-.23 1.48-.35.65-.12 1.34-.18 2.08-.18zm52.84 9.63c.82 0 1.43-.05 1.85-.13V13.7a5.42 5.42 0 0 0-1.57-.2c-.3 0-.6.02-.9.07-.3.04-.57.12-.81.24-.24.12-.44.28-.58.5a.93.93 0 0 0-.22.65c0 .63.22.99.61 1.23.4.24.94.36 1.62.36zm-.23-9.7c.88 0 1.63.11 2.23.33.6.22 1.1.53 1.45.92.35.39.6.92.76 1.48.15.56.23 1.18.23 1.85v6.88c-.41.08-1.03.19-1.87.31-.83.12-1.77.18-2.81.18-.7 0-1.33-.06-1.9-.2a4 4 0 0 1-1.47-.63c-.4-.3-.72-.67-.95-1.13a4.3 4.3 0 0 1-.34-1.8c0-.66.13-1.08.38-1.53.26-.45.61-.82 1.05-1.1.44-.3.95-.5 1.53-.62a8.8 8.8 0 0 1 3.8.05v-.43c0-.31-.04-.6-.12-.88-.07-.28-.2-.52-.38-.73a1.78 1.78 0 0 0-.73-.5c-.3-.1-.68-.2-1.14-.2a9.85 9.85 0 0 0-2.95.47l-.32-2.19a11.63 11.63 0 0 1 3.55-.53zm-8.03-1.27a1.62 1.62 0 0 0 0-3.24 1.62 1.62 0 1 0 0 3.24zm1.35 13.22h-2.7V7.27l2.7-.42V18.8zm-4.72 0c-4.38.02-4.38-3.54-4.38-4.1l-.01-13.34 2.67-.42v13.25c0 .32 0 2.36 1.72 2.37v2.24zm-8.7-5.9a4.7 4.7 0 0 0-.74-2.79 2.4 2.4 0 0 0-2.07-1 2.4 2.4 0 0 0-2.06 1 4.7 4.7 0 0 0-.74 2.8c0 1.16.25 1.94.74 2.62a2.4 2.4 0 0 0 2.07 1.02c.88 0 1.57-.34 2.07-1.02.49-.68.73-1.46.73-2.63zm2.74 0a6.46 6.46 0 0 1-1.52 4.23c-.49.53-1.07.94-1.76 1.22-.68.29-1.73.45-2.26.45-.53 0-1.58-.15-2.25-.45a5.1 5.1 0 0 1-2.88-3.13 7.3 7.3 0 0 1-.01-4.84 5.13 5.13 0 0 1 2.9-3.1 5.67 5.67 0 0 1 2.22-.42c.81 0 1.56.14 2.24.42.69.29 1.28.69 1.75 1.22.49.52.87 1.15 1.14 1.89a7 7 0 0 1 .43 2.5zm-20.14 0c0 1.11.25 2.36.74 2.88.5.52 1.13.78 1.91.78a4.07 4.07 0 0 0 2.12-.6V9.33c-.19-.04-.99-.2-1.76-.23a2.67 2.67 0 0 0-2.23 1 4.73 4.73 0 0 0-.78 2.8zm7.44 5.27c0 1.82-.46 3.16-1.4 4-.94.85-2.37 1.27-4.3 1.27-.7 0-2.17-.13-3.34-.4l.43-2.11c.98.2 2.27.26 2.95.26 1.08 0 1.84-.22 2.3-.66.46-.43.68-1.08.68-1.94v-.44a5.2 5.2 0 0 1-2.54.6 5.6 5.6 0 0 1-2.01-.36 4.2 4.2 0 0 1-2.58-2.71 9.88 9.88 0 0 1 .02-5.35 4.92 4.92 0 0 1 2.93-2.96 6.6 6.6 0 0 1 2.43-.46 19.64 19.64 0 0 1 4.43.66v10.6z"
      }
    })])])]);
  },
  staticRenderFns: [],
  name: "AisPoweredBy",
  mixins: [createSuitMixin({
    name: "PoweredBy"
  })],
  props: {
    theme: {
      default: "light",
      validator: function (e) {
        return -1 !== ["light", "dark"].indexOf(e);
      }
    }
  },
  computed: {
    algoliaUrl: function () {
      return "https://www.algolia.com/?utm_source=vue-instantsearch&utm_medium=website&utm_content=" + (location ? location.hostname : "") + "&utm_campaign=poweredby";
    }
  }
},
    QueryRuleContext = {
  name: "AisQueryRuleContext",
  mixins: [createSuitMixin({
    name: "QueryRuleContext"
  }), createWidgetMixin({
    connector: connectors.connectQueryRules
  })],
  props: {
    trackedFilters: {
      type: Object,
      required: !0
    },
    transformRuleContexts: {
      type: Function,
      required: !1,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        trackedFilters: this.trackedFilters,
        transformRuleContexts: this.transformRuleContexts
      };
    }
  },
  render: function () {
    return null;
  }
},
    QueryRuleCustomData = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", e._l(e.state.items, function (t, n) {
      return i("div", {
        key: n
      }, [e._t("item", [i("pre", [e._v(e._s(t))])], {
        item: t
      })], 2);
    }), {
      items: e.state.items
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisQueryRuleCustomData",
  mixins: [createSuitMixin({
    name: "QueryRuleCustomData"
  }), createWidgetMixin({
    connector: connectors.connectQueryRules
  })],
  props: {
    transformItems: {
      type: Function,
      required: !1,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        transformItems: this.transformItems
      };
    }
  }
},
    mapStateToCanRefine$1 = function (e) {
  return e && Boolean(e.range) && e.range.min !== e.range.max;
},
    RangeInput = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: [e.suit(), !e.canRefine && e.suit("", "noRefinement")]
    }, [e._t("default", [i("form", {
      class: e.suit("form"),
      on: {
        submit: function (t) {
          t.preventDefault(), e.refine({
            min: e.pick(e.minInput, e.values.min),
            max: e.pick(e.maxInput, e.values.max)
          });
        }
      }
    }, [i("label", {
      class: e.suit("label")
    }, [e._t("minLabel"), e._v(" "), i("input", {
      class: [e.suit("input"), e.suit("input", "min")],
      attrs: {
        type: "number",
        step: e.step,
        min: e.state.range.min,
        max: e.state.range.max,
        placeholder: e.state.range.min
      },
      domProps: {
        value: e.values.min
      },
      on: {
        change: function (t) {
          e.minInput = t.currentTarget.value;
        }
      }
    })], 2), e._v(" "), i("span", {
      class: e.suit("separator")
    }, [e._t("separator", [e._v("to")])], 2), e._v(" "), i("label", {
      class: e.suit("label")
    }, [e._t("maxLabel"), e._v(" "), i("input", {
      class: [e.suit("input"), e.suit("input", "max")],
      attrs: {
        type: "number",
        step: e.step,
        min: e.state.range.min,
        max: e.state.range.max,
        placeholder: e.state.range.max
      },
      domProps: {
        value: e.values.max
      },
      on: {
        change: function (t) {
          e.maxInput = t.currentTarget.value;
        }
      }
    })], 2), e._v(" "), i("button", {
      class: e.suit("submit"),
      attrs: {
        type: "submit"
      }
    }, [e._t("submitLabel", [e._v("Go")])], 2)])], {
      currentRefinement: e.values,
      refine: e.refine,
      canRefine: e.canRefine,
      range: e.state.range,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisRangeInput",
  mixins: [createSuitMixin({
    name: "RangeInput"
  }), createWidgetMixin({
    connector: connectors.connectRange
  }), createPanelConsumerMixin({
    mapStateToCanRefine: mapStateToCanRefine$1
  })],
  props: {
    attribute: {
      type: String,
      required: !0
    },
    min: {
      type: Number,
      required: !1,
      default: void 0
    },
    max: {
      type: Number,
      required: !1,
      default: void 0
    },
    precision: {
      type: Number,
      required: !1,
      default: 0
    }
  },
  data: function () {
    return {
      minInput: void 0,
      maxInput: void 0
    };
  },
  updated: function () {
    this.minInput = void 0, this.maxInput = void 0;
  },
  computed: {
    widgetParams: function () {
      return {
        attribute: this.attribute,
        min: this.min,
        max: this.max,
        precision: this.precision
      };
    },
    canRefine: function () {
      return mapStateToCanRefine$1(this.state);
    },
    step: function () {
      return 1 / Math.pow(10, this.precision);
    },
    values: function () {
      var e = this.state.start,
          t = e[0],
          i = e[1],
          n = this.state.range,
          s = n.min,
          a = n.max;
      return {
        min: t !== -1 / 0 && t !== s ? t : void 0,
        max: i !== 1 / 0 && i !== a ? i : void 0
      };
    }
  },
  methods: {
    pick: function (e, t) {
      return null != e ? e : t;
    },
    refine: function (e) {
      var t = e.min,
          i = e.max;
      this.state.refine([t, i]);
    }
  }
},
    RatingMenu = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("svg", {
      staticStyle: {
        display: "none"
      },
      attrs: {
        xmlns: "http://www.w3.org/2000/svg"
      }
    }, [i("symbol", {
      attrs: {
        id: "ais-RatingMenu-starSymbol",
        viewBox: "0 0 24 24"
      }
    }, [i("path", {
      attrs: {
        d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
      }
    })]), e._v(" "), i("symbol", {
      attrs: {
        id: "ais-RatingMenu-starEmptySymbol",
        viewBox: "0 0 24 24"
      }
    }, [i("path", {
      attrs: {
        d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"
      }
    })])]), e._v(" "), i("ul", {
      class: e.suit("list")
    }, e._l(e.state.items, function (t, n) {
      return i("li", {
        key: n,
        class: [e.suit("item"), t.isRefined && e.suit("item", "selected")]
      }, [i("a", {
        class: e.suit("link"),
        attrs: {
          href: e.state.createURL(t.value),
          "aria-label": t.value + " & Up"
        },
        on: {
          click: function (i) {
            return i.preventDefault(), e.state.refine(t.value);
          }
        }
      }, [e._l(t.stars, function (t, n) {
        return [t ? i("svg", {
          key: n + "-full",
          class: [e.suit("starIcon"), e.suit("starIcon--full")],
          attrs: {
            "aria-hidden": "true",
            width: "24",
            height: "24"
          }
        }, [i("use", {
          attrs: {
            "xlink:href": "#ais-RatingMenu-starSymbol"
          }
        })]) : i("svg", {
          key: n + "-empty",
          class: [e.suit("starIcon"), e.suit("starIcon--empty")],
          attrs: {
            "aria-hidden": "true",
            width: "24",
            height: "24"
          }
        }, [i("use", {
          attrs: {
            "xlink:href": "#ais-RatingMenu-starEmptySymbol"
          }
        })])];
      }), e._v(" "), i("span", {
        class: e.suit("label"),
        attrs: {
          "aria-hidden": "true"
        }
      }, [e._t("andUp", [e._v("& Up")])], 2), e._v(" "), i("span", {
        class: e.suit("count")
      }, [e._v(e._s(t.count))])], 2)]);
    }), 0)], {
      items: e.state.items,
      refine: e.state.refine,
      createURL: e.state.createURL,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisRatingMenu",
  mixins: [createSuitMixin({
    name: "RatingMenu"
  }), createWidgetMixin({
    connector: connectors.connectRatingMenu
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return !1 === e.hasNoResults;
    }
  })],
  props: {
    attribute: {
      type: String,
      required: !0
    },
    max: {
      type: Number,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        attribute: this.attribute,
        max: this.max
      };
    }
  }
},
    SearchInput = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return i("form", {
      class: e.suit("form"),
      attrs: {
        action: "",
        role: "search",
        novalidate: ""
      },
      on: {
        submit: function (t) {
          return t.preventDefault(), e.onFormSubmit(t);
        },
        reset: function (t) {
          return t.preventDefault(), e.onFormReset(t);
        }
      }
    }, [i("input", {
      ref: "input",
      class: e.suit("input"),
      attrs: {
        type: "search",
        autocorrect: "off",
        autocapitalize: "off",
        autocomplete: "off",
        spellcheck: "false",
        required: "",
        maxlength: "512",
        "aria-label": "Search",
        placeholder: e.placeholder,
        autofocus: e.autofocus
      },
      domProps: {
        value: e.value || e.modelValue
      },
      on: {
        focus: function (t) {
          return e.$emit("focus", t);
        },
        blur: function (t) {
          return e.$emit("blur", t);
        },
        input: function (t) {
          e.$emit("input", t.target.value), e.$emit("update:modelValue", t.target.value);
        }
      }
    }), e._v(" "), i("button", {
      class: e.suit("submit"),
      attrs: {
        type: "submit",
        title: e.submitTitle,
        hidden: e.showLoadingIndicator && e.shouldShowLoadingIndicator
      }
    }, [e._t("submit-icon", [i("svg", {
      class: e.suit("submitIcon"),
      attrs: {
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        width: "10",
        height: "10",
        viewBox: "0 0 40 40"
      }
    }, [i("path", {
      attrs: {
        d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z",
        fillRule: "evenodd"
      }
    })])])], 2), e._v(" "), i("button", {
      class: e.suit("reset"),
      attrs: {
        type: "reset",
        title: e.resetTitle,
        hidden: !e.value && !e.modelValue || e.showLoadingIndicator && e.shouldShowLoadingIndicator
      }
    }, [e._t("reset-icon", [i("svg", {
      class: e.suit("resetIcon"),
      attrs: {
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 20 20"
      }
    }, [i("path", {
      attrs: {
        d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z",
        fillRule: "evenodd"
      }
    })])])], 2), e._v(" "), e.showLoadingIndicator ? i("span", {
      class: e.suit("loadingIndicator"),
      attrs: {
        hidden: !e.shouldShowLoadingIndicator
      }
    }, [e._t("loading-indicator", [i("svg", {
      class: e.suit("loadingIcon"),
      attrs: {
        role: "img",
        "aria-label": "Results are loading",
        width: "16",
        height: "16",
        xmlns: "http://www.w3.org/2000/svg",
        stroke: "#444",
        viewBox: "0 0 38 38"
      }
    }, [i("g", {
      attrs: {
        fill: "none",
        "fill-rule": "evenodd"
      }
    }, [i("g", {
      attrs: {
        transform: "translate(1 1)",
        "stroke-width": "2"
      }
    }, [i("circle", {
      attrs: {
        "stroke-opacity": ".5",
        cx: "18",
        cy: "18",
        r: "18"
      }
    }), e._v(" "), i("path", {
      attrs: {
        d: "M36 18c0-9.94-8.06-18-18-18"
      }
    }, [i("animateTransform", {
      attrs: {
        attributeName: "transform",
        type: "rotate",
        from: "0 18 18",
        to: "360 18 18",
        dur: "1s",
        repeatCount: "indefinite"
      }
    })], 1)])])])])], 2) : e._e()]);
  },
  staticRenderFns: [],
  name: "SearchInput",
  mixins: [createSuitMixin({
    name: "SearchBox"
  })],
  props: {
    placeholder: {
      type: String,
      default: "Search here…"
    },
    autofocus: {
      type: Boolean,
      default: !1
    },
    showLoadingIndicator: {
      type: Boolean,
      default: !1
    },
    shouldShowLoadingIndicator: {
      type: Boolean,
      default: !1
    },
    submitTitle: {
      type: String,
      default: "Search"
    },
    resetTitle: {
      type: String,
      default: "Clear"
    },
    value: {
      type: String,
      required: !1,
      default: void 0
    },
    modelValue: {
      type: String,
      required: !1,
      default: void 0
    }
  },
  emits: ["input", "update:modelValue", "blur", "focus", "reset"],
  data: function () {
    return {
      query: ""
    };
  },
  methods: {
    onFormSubmit: function () {
      this.$refs.input.blur();
    },
    onFormReset: function () {
      this.$emit("input", ""), this.$emit("update:modelValue", ""), this.$emit("reset");
    }
  }
},
    noop = function () {},
    RefinementList = {
  render: function () {
    var e,
        t = this,
        i = t.$createElement,
        n = t._self._c || i;
    return t.state ? n("div", {
      class: [t.suit(), !t.state.canRefine && t.suit("", "noRefinement")]
    }, [t._t("default", [t.searchable ? n("div", {
      class: t.suit("searchBox")
    }, [n("search-input", {
      attrs: {
        placeholder: t.searchablePlaceholder,
        "class-names": t.classNames
      },
      model: {
        value: t.searchForFacetValues,
        callback: function (e) {
          t.searchForFacetValues = e;
        },
        expression: "searchForFacetValues"
      }
    })], 1) : t._e(), t._v(" "), t.state.isFromSearch && 0 === t.items.length ? t._t("noResults", [n("div", {
      class: t.suit("noResults")
    }, [t._v("No results.")])], {
      query: t.searchForFacetValues
    }) : t._e(), t._v(" "), n("ul", {
      class: t.suit("list")
    }, t._l(t.items, function (e) {
      return n("li", {
        key: e.value,
        class: [t.suit("item"), e.isRefined && t.suit("item", "selected")]
      }, [t._t("item", [n("label", {
        class: t.suit("label")
      }, [n("input", {
        class: t.suit("checkbox"),
        attrs: {
          type: "checkbox"
        },
        domProps: {
          value: e.value,
          checked: e.isRefined
        },
        on: {
          change: function (i) {
            return t.refine(e.value);
          }
        }
      }), t._v(" "), t.searchable ? n("span", {
        class: t.suit("labelText")
      }, [n("ais-highlight", {
        attrs: {
          attribute: "item",
          hit: e
        }
      })], 1) : n("span", {
        class: t.suit("labelText")
      }, [t._v(t._s(e.label))]), t._v(" "), n("span", {
        class: t.suit("count")
      }, [t._v(t._s(e.count))])])], {
        item: e,
        refine: t.refine,
        createURL: t.state.createURL
      })], 2);
    }), 0), t._v(" "), t.showMore ? n("button", {
      class: [t.suit("showMore"), (e = {}, e[t.suit("showMore", "disabled")] = !t.state.canToggleShowMore, e)],
      attrs: {
        disabled: !t.state.canToggleShowMore
      },
      on: {
        click: t.toggleShowMore
      }
    }, [t._t("showMoreLabel", [t._v("Show " + t._s(t.state.isShowingMore ? "less" : "more"))], {
      isShowingMore: t.state.isShowingMore
    })], 2) : t._e()], {
      items: t.items,
      refine: t.refine,
      searchForItems: t.state.searchForItems,
      searchForItemsQuery: t.searchForFacetValuesQuery,
      toggleShowMore: t.toggleShowMore,
      canToggleShowMore: t.state.canToggleShowMore,
      isShowingMore: t.state.isShowingMore,
      createURL: t.state.createURL,
      isFromSearch: t.state.isFromSearch,
      canRefine: t.state.canRefine,
      sendEvent: t.state.sendEvent
    })], 2) : t._e();
  },
  staticRenderFns: [],
  name: "AisRefinementList",
  components: {
    SearchInput: SearchInput,
    AisHighlight: AisHighlight
  },
  mixins: [createSuitMixin({
    name: "RefinementList"
  }), createWidgetMixin({
    connector: connectors.connectRefinementList
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return Boolean(e.canRefine);
    }
  })],
  props: {
    attribute: {
      type: String,
      required: !0
    },
    searchable: {
      type: Boolean,
      default: void 0
    },
    searchablePlaceholder: {
      type: String,
      required: !1,
      default: "Search here…"
    },
    operator: {
      default: "or",
      validator: function (e) {
        return "and" === e || "or" === e;
      },
      required: !1
    },
    limit: {
      type: Number,
      required: !1,
      default: void 0
    },
    showMoreLimit: {
      type: Number,
      required: !1,
      default: void 0
    },
    showMore: {
      type: Boolean,
      required: !1,
      default: !1
    },
    sortBy: {
      type: [Array, Function],
      required: !1,
      default: void 0
    },
    transformItems: {
      type: Function,
      required: !1,
      default: void 0
    }
  },
  data: function () {
    return {
      searchForFacetValuesQuery: ""
    };
  },
  computed: {
    searchForFacetValues: {
      get: function () {
        return this.searchForFacetValuesQuery;
      },
      set: function (e) {
        this.state.searchForItems(e), this.searchForFacetValuesQuery = e;
      }
    },
    toggleShowMore: function () {
      return this.state.toggleShowMore || noop;
    },
    items: function () {
      return this.state.items.map(function (e) {
        return Object.assign({}, e, {
          _highlightResult: {
            item: {
              value: e.highlighted
            }
          }
        });
      });
    },
    widgetParams: function () {
      return {
        attribute: this.attribute,
        operator: this.operator,
        limit: this.limit,
        showMore: this.showMore,
        showMoreLimit: this.showMoreLimit,
        sortBy: this.sortBy,
        escapeFacetValues: !0,
        transformItems: this.transformItems
      };
    }
  },
  methods: {
    refine: function (e) {
      this.state.refine(e), this.searchForFacetValuesQuery = "";
    }
  }
},
    connectStateResults = function (e, t) {
  return void 0 === t && (t = function () {}), function (i) {
    return void 0 === i && (i = {}), {
      init: function (t) {
        var n = t.instantSearchInstance;
        e({
          state: void 0,
          results: void 0,
          instantSearchInstance: n,
          widgetParams: i
        }, !0);
      },
      render: function (t) {
        var n = t.results,
            s = t.instantSearchInstance,
            a = t.state,
            r = _objectSpread({}, n),
            o = _objectSpread({}, a);

        e({
          results: r,
          state: o,
          instantSearchInstance: s,
          widgetParams: i
        }, !1);
      },
      dispose: function () {
        t();
      }
    };
  };
},
    StateResults = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state && e.state.state && e.state.results ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("p", [e._v(" Use this component to have a different layout based on a certain state. ")]), e._v(" "), i("p", [e._v(" Fill in the slot, and get access to the following things: ")]), e._v(" "), i("pre", [e._v("results: " + e._s(Object.keys(e.state.results)))]), e._v(" "), i("pre", [e._v("state: " + e._s(Object.keys(e.state.state)))])], null, e.stateResults)], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisStateResults",
  mixins: [createWidgetMixin({
    connector: connectStateResults
  }), createSuitMixin({
    name: "StateResults"
  })],
  computed: {
    stateResults: function () {
      var e = this.state,
          t = e.state,
          i = e.results;
      return _objectSpread({}, i, {
        results: i,
        state: t
      });
    }
  }
},
    SearchBox = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("search-input", {
      attrs: {
        placeholder: e.placeholder,
        autofocus: e.autofocus,
        "show-loading-indicator": e.showLoadingIndicator,
        "should-show-loading-indicator": e.state.isSearchStalled,
        "submit-title": e.submitTitle,
        "reset-title": e.resetTitle,
        "class-names": e.classNames
      },
      on: {
        focus: function (t) {
          return e.$emit("focus", t);
        },
        blur: function (t) {
          return e.$emit("blur", t);
        },
        reset: function (t) {
          return e.$emit("reset");
        }
      },
      scopedSlots: e._u([e.isVue3 ? {
        key: "loading-indicator",
        fn: function (t) {
          return [e._t("loading-indicator")];
        }
      } : null, e.isVue3 ? {
        key: "submit-icon",
        fn: function (t) {
          return [e._t("submit-icon")];
        }
      } : null, e.isVue3 ? {
        key: "reset-icon",
        fn: function (t) {
          return [e._t("reset-icon")];
        }
      } : null], !0),
      model: {
        value: e.currentRefinement,
        callback: function (t) {
          e.currentRefinement = t;
        },
        expression: "currentRefinement"
      }
    }, [e._v(" "), e.isVue2 ? e._t("loading-indicator", null, {
      slot: "loading-indicator"
    }) : e._e(), e._v(" "), e._v(" "), e.isVue2 ? e._t("submit-icon", null, {
      slot: "submit-icon"
    }) : e._e(), e._v(" "), e._v(" "), e.isVue2 ? e._t("reset-icon", null, {
      slot: "reset-icon"
    }) : e._e()], 2)], {
      currentRefinement: e.currentRefinement,
      isSearchStalled: e.state.isSearchStalled,
      refine: e.state.refine
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisSearchBox",
  mixins: [createWidgetMixin({
    connector: connectors.connectSearchBox
  }), createSuitMixin({
    name: "SearchBox"
  })],
  components: {
    SearchInput: SearchInput
  },
  props: {
    placeholder: {
      type: String,
      default: "Search here…"
    },
    autofocus: {
      type: Boolean,
      default: !1
    },
    showLoadingIndicator: {
      type: Boolean,
      default: !1
    },
    submitTitle: {
      type: String,
      default: "Search"
    },
    resetTitle: {
      type: String,
      default: "Clear"
    },
    value: {
      type: String,
      default: void 0
    },
    modelValue: {
      type: String,
      default: void 0
    }
  },
  data: function () {
    return {
      localValue: "",
      isVue2: isVue2,
      isVue3: isVue3
    };
  },
  computed: {
    isControlled: function () {
      return void 0 !== this.value || void 0 !== this.modelValue;
    },
    model: function () {
      return this.value || this.modelValue;
    },
    currentRefinement: {
      get: function () {
        return this.isControlled && this.model !== this.localValue && (this.localValue = this.model, this.$emit("input", this.model), this.$emit("update:modelValue", this.model), this.state.refine(this.model)), this.model || this.state.query || "";
      },
      set: function (e) {
        this.localValue = e, this.state.refine(e), this.isControlled && (this.$emit("input", e), this.$emit("update:modelValue", e));
      }
    }
  }
},
    Snippet = {
  render: function () {
    var e = this.$createElement;
    return (this._self._c || e)("ais-highlighter", {
      attrs: {
        hit: this.hit,
        attribute: this.attribute,
        "highlighted-tag-name": this.highlightedTagName,
        suit: this.suit,
        "highlight-property": "_snippetResult",
        "pre-tag": "<mark>",
        "post-tag": "</mark>"
      }
    });
  },
  staticRenderFns: [],
  name: "AisSnippet",
  mixins: [createSuitMixin({
    name: "Snippet"
  })],
  components: {
    AisHighlighter: AisHighlighter
  },
  props: {
    hit: {
      type: Object,
      required: !0
    },
    attribute: {
      type: String,
      required: !0
    },
    highlightedTagName: {
      type: String,
      default: "mark"
    }
  }
},
    SortBy = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("select", {
      class: e.suit("select"),
      on: {
        change: function (t) {
          return e.state.refine(t.currentTarget.value);
        }
      }
    }, e._l(e.state.options, function (t) {
      return i("option", {
        key: t.value,
        class: e.suit("option"),
        domProps: {
          value: t.value,
          selected: t.value === e.state.currentRefinement
        }
      }, [e._v(e._s(t.label))]);
    }), 0)], {
      items: e.state.options,
      hasNoResults: e.state.hasNoResults,
      refine: e.state.refine,
      currentRefinement: e.state.currentRefinement
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisSortBy",
  mixins: [createSuitMixin({
    name: "SortBy"
  }), createWidgetMixin({
    connector: connectors.connectSortBy
  }), createPanelConsumerMixin({
    mapStateToCanRefine: function (e) {
      return !1 === e.hasNoResults;
    }
  })],
  props: {
    items: {
      type: Array,
      required: !0
    },
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        items: this.items,
        transformItems: this.transformItems
      };
    }
  }
},
    Stats = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("span", {
      class: e.suit("text")
    }, [e.state.areHitsSorted ? [e._v(e._s(e.state.nbSortedHits.toLocaleString()) + " relevant results sorted out of " + e._s(e.state.nbHits.toLocaleString()))] : [e._v(e._s(e.state.nbHits.toLocaleString()) + " results")], e._v(" found in " + e._s(e.state.processingTimeMS.toLocaleString()) + "ms")], 2)], {
      results: e.state.instantSearchInstance.helper.lastResults
    }, e.state)], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisStats",
  mixins: [createWidgetMixin({
    connector: connectors.connectStats
  }), createSuitMixin({
    name: "Stats"
  })],
  computed: {
    widgetParams: function () {
      return {};
    }
  }
},
    mapStateToCanRefine$2 = function (e) {
  return Boolean(e.value && e.value.count);
},
    ToggleRefinement = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: [e.suit(), !e.canRefine && e.suit("", "noRefinement")]
    }, [e._t("default", [i("label", {
      class: e.suit("label")
    }, [i("input", {
      class: e.suit("checkbox"),
      attrs: {
        type: "checkbox",
        name: e.state.value.name
      },
      domProps: {
        value: e.on,
        checked: e.state.value.isRefined
      },
      on: {
        change: function (t) {
          return e.state.refine(e.state.value);
        }
      }
    }), e._v(" "), i("span", {
      class: e.suit("labelText")
    }, [e._v(e._s(e.label))]), e._v(" "), null !== e.state.value.count ? i("span", {
      class: e.suit("count")
    }, [e._v(e._s(e.state.value.count.toLocaleString()))]) : e._e()])], {
      value: e.state.value,
      canRefine: e.canRefine,
      refine: e.state.refine,
      createURL: e.state.createURL,
      sendEvent: e.state.sendEvent
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisToggleRefinement",
  mixins: [createSuitMixin({
    name: "ToggleRefinement"
  }), createWidgetMixin({
    connector: connectors.connectToggleRefinement
  }), createPanelConsumerMixin({
    mapStateToCanRefine: mapStateToCanRefine$2
  })],
  props: {
    attribute: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      required: !0
    },
    on: {
      type: [String, Number, Boolean, Array],
      required: !1,
      default: !0
    },
    off: {
      type: [String, Number, Boolean, Array],
      required: !1,
      default: void 0
    }
  },
  computed: {
    widgetParams: function () {
      return {
        attribute: this.attribute,
        label: this.label,
        on: this.on,
        off: this.off
      };
    },
    canRefine: function () {
      return mapStateToCanRefine$2(this.state);
    }
  }
},
    VoiceSearch = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("button", {
      class: e.suit("button"),
      attrs: {
        type: "button",
        title: e.state.isBrowserSupported ? e.buttonTitle : e.disabledButtonTitle,
        disabled: !e.state.isBrowserSupported
      },
      on: {
        click: e.handleClick
      }
    }, [e._t("buttonText", [e.errorNotAllowed ? i("svg", e._b({}, "svg", e.buttonSvgAttrs, !1), [i("line", {
      attrs: {
        x1: "1",
        y1: "1",
        x2: "23",
        y2: "23"
      }
    }), e._v(" "), i("path", {
      attrs: {
        d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
      }
    }), e._v(" "), i("path", {
      attrs: {
        d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"
      }
    }), e._v(" "), i("line", {
      attrs: {
        x1: "12",
        y1: "19",
        x2: "12",
        y2: "23"
      }
    }), e._v(" "), i("line", {
      attrs: {
        x1: "8",
        y1: "23",
        x2: "16",
        y2: "23"
      }
    })]) : i("svg", e._b({}, "svg", e.buttonSvgAttrs, !1), [i("path", {
      attrs: {
        d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z",
        fill: e.state.isListening ? "currentColor" : "none"
      }
    }), e._v(" "), i("path", {
      attrs: {
        d: "M19 10v2a7 7 0 0 1-14 0v-2"
      }
    }), e._v(" "), i("line", {
      attrs: {
        x1: "12",
        y1: "19",
        x2: "12",
        y2: "23"
      }
    }), e._v(" "), i("line", {
      attrs: {
        x1: "8",
        y1: "23",
        x2: "16",
        y2: "23"
      }
    })])], null, e.innerSlotProps)], 2), e._v(" "), i("div", {
      class: e.suit("status")
    }, [e._t("status", [i("p", [e._v(e._s(e.state.voiceListeningState.transcript))])], null, e.innerSlotProps)], 2)], null, e.rootSlotProps)], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisVoiceSearch",
  mixins: [createWidgetMixin({
    connector: connectors.connectVoiceSearch
  }), createSuitMixin({
    name: "VoiceSearch"
  })],
  props: {
    searchAsYouSpeak: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    buttonTitle: {
      type: String,
      required: !1,
      default: "Search by voice"
    },
    disabledButtonTitle: {
      type: String,
      required: !1,
      default: "Search by voice (not supported on this browser)"
    }
  },
  data: function () {
    return {
      buttonSvgAttrs: {
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    };
  },
  computed: {
    widgetParams: function () {
      return {
        searchAsYouSpeak: this.searchAsYouSpeak
      };
    },
    errorNotAllowed: function () {
      return "error" === this.state.voiceListeningState.status && "not-allowed" === this.state.voiceListeningState.errorCode;
    },
    rootSlotProps: function () {
      return {
        isBrowserSupported: this.state.isBrowserSupported,
        isListening: this.state.isListening,
        toggleListening: this.state.toggleListening,
        voiceListeningState: this.state.voiceListeningState
      };
    },
    innerSlotProps: function () {
      return {
        status: this.state.voiceListeningState.status,
        errorCode: this.state.voiceListeningState.errorCode,
        isListening: this.state.isListening,
        transcript: this.state.voiceListeningState.transcript,
        isSpeechFinal: this.state.voiceListeningState.isSpeechFinal,
        isBrowserSupported: this.state.isBrowserSupported
      };
    }
  },
  methods: {
    handleClick: function (e) {
      e.currentTarget.blur(), this.state.toggleListening();
    }
  }
},
    RelevantSort = {
  render: function () {
    var e = this,
        t = e.$createElement,
        i = e._self._c || t;
    return e.state && e.state.isVirtualReplica ? i("div", {
      class: e.suit()
    }, [e._t("default", [i("div", {
      class: e.suit("text")
    }, [e._t("text", null, {
      isRelevantSorted: e.state.isRelevantSorted
    })], 2), e._v(" "), i("button", {
      class: e.suit("button"),
      attrs: {
        type: "button"
      },
      on: {
        click: function (t) {
          return e.refine();
        }
      }
    }, [e._t("button", [e._v(e._s(e.state.isRelevantSorted ? "See all results" : "See relevant results"))], {
      isRelevantSorted: e.state.isRelevantSorted
    })], 2)], {
      isRelevantSorted: e.state.isRelevantSorted,
      refine: e.state.refine
    })], 2) : e._e();
  },
  staticRenderFns: [],
  name: "AisRelevantSort",
  mixins: [createSuitMixin({
    name: "RelevantSort"
  }), createWidgetMixin({
    connector: connectors.connectRelevantSort
  })],
  methods: {
    refine: function () {
      this.state.isRelevantSorted ? this.state.refine(0) : this.state.refine(void 0);
    }
  }
};

function getWidgetAttribute(e) {
  var t,
      i = e.componentOptions && e.componentOptions.propsData;

  if (i) {
    if (i.attribute) return i.attribute;
    if (Array.isArray(i.attributes)) return i.attributes[0];
  }

  if (t = e.componentOptions && e.componentOptions.children ? e.componentOptions.children : e.children, Array.isArray(t)) return t.reduce(function (e, t) {
    return e || getWidgetAttribute(t);
  }, void 0);
}

var DynamicWidgets = {
  name: "AisExperimentalDynamicWidgets",
  mixins: [createWidgetMixin({
    connector: connectors.connectDynamicWidgets
  }), createSuitMixin({
    name: "DynamicWidgets"
  })],
  props: {
    transformItems: {
      type: Function,
      default: void 0
    }
  },
  render: renderCompat(function (e) {
    var t = this,
        i = new Map();

    if ((getDefaultSlot(this) || []).forEach(function (n) {
      var s = getWidgetAttribute(n);
      s && i.set(s, e("div", {
        key: s,
        class: [t.suit("widget")]
      }, [n]));
    }), !this.state) {
      var n = [];
      return i.forEach(function (e) {
        return n.push(e);
      }), e("div", _objectSpread({
        class: [this.suit()]
      }, {
        attrs: {
          hidden: !0
        }
      }), n);
    }

    return e("div", {
      class: [this.suit()]
    }, this.state.attributesToRender.map(function (e) {
      return i.get(e);
    }));
  }),
  computed: {
    widgetParams: function () {
      return {
        transformItems: this.transformItems,
        widgets: []
      };
    }
  }
},
    widgets = Object.freeze({
  __proto__: null,
  AisAutocomplete: Autocomplete,
  AisBreadcrumb: Breadcrumb,
  AisClearRefinements: ClearRefinements,
  AisConfigure: Configure,
  AisExperimentalConfigureRelatedItems: ConfigureRelatedItems,
  AisCurrentRefinements: CurrentRefinements,
  AisHierarchicalMenu: HierarchicalMenu,
  AisHighlight: AisHighlight,
  AisHits: Hits,
  AisHitsPerPage: HitsPerPage,
  AisIndex: Index,
  AisInstantSearch: InstantSearch,
  AisInstantSearchSsr: InstantSearchSsr,
  AisInfiniteHits: InfiniteHits,
  AisMenu: Menu,
  AisMenuSelect: MenuSelect,
  AisNumericMenu: NumericMenu,
  AisPagination: Pagination,
  AisPanel: Panel,
  AisPoweredBy: PoweredBy,
  AisQueryRuleContext: QueryRuleContext,
  AisQueryRuleCustomData: QueryRuleCustomData,
  AisRangeInput: RangeInput,
  AisRatingMenu: RatingMenu,
  AisRefinementList: RefinementList,
  AisStateResults: StateResults,
  AisSearchBox: SearchBox,
  AisSnippet: Snippet,
  AisSortBy: SortBy,
  AisStats: Stats,
  AisToggleRefinement: ToggleRefinement,
  AisVoiceSearch: VoiceSearch,
  AisRelevantSort: RelevantSort,
  AisDynamicWidgets: DynamicWidgets
}),
    plugin = {
  install: function (e) {
    Object.keys(widgets).forEach(function (t) {
      e.component(widgets[t].name, widgets[t]);
    });
  }
},
    SearchResults = algoliaHelper.SearchResults,
    SearchParameters = algoliaHelper.SearchParameters;

function walkIndex(e, t) {
  return t(e), e.getWidgets().forEach(function (e) {
    "ais.index" === e.$$type && (t(e), walkIndex(e, t));
  });
}

function searchOnlyWithDerivedHelpers(e) {
  return new Promise(function (t, i) {
    e.searchOnlyWithDerivedHelpers(), e.derivedHelpers[0].on("result", function () {
      t();
    }), e.derivedHelpers.forEach(function (e) {
      return e.on("error", function (e) {
        i(e);
      });
    });
  });
}

function defaultCloneComponent(e, t) {
  void 0 === t && (t = {});
  var i = t.mixins;
  void 0 === i && (i = []);
  var n,
      s = {
    serverPrefetch: void 0,
    fetch: void 0,
    _base: void 0,
    name: "ais-ssr-root-component"
  };
  return s.router = e.$router, s.store = e.$store, (n = new (e.$vnode ? e.$vnode.componentOptions.Ctor.extend(s) : Vue2.component(Object.assign({}, e.$options, s)))({
    propsData: e.$options.propsData,
    mixins: [].concat(i)
  })).$slots = e.$slots, n.$root = e.$root, n.$options.serverPrefetch = [], n;
}

function augmentInstantSearch(e, t, i, n) {
  var s,
      a = algoliaHelper(t, i),
      r = instantsearch(e);
  return r.findResultsState = function (e) {
    var t,
        i,
        o = e.component,
        u = e.renderToString;
    if (!u) throw new Error("findResultsState requires `renderToString: (component) => Promise<string>` in the first argument.");
    return Promise.resolve().then(function () {
      t = n(o, {
        mixins: [{
          created: function () {
            i = this, this.instantsearch.helper = a, this.instantsearch.mainHelper = a, this.instantsearch.mainIndex.init({
              instantSearchInstance: this.instantsearch,
              parent: null,
              uiState: this.instantsearch._initialUiState
            });
          }
        }]
      });
    }).then(function () {
      return u(t);
    }).then(function () {
      return searchOnlyWithDerivedHelpers(a);
    }).then(function () {
      var e = {};
      return walkIndex(i.instantsearch.mainIndex, function (t) {
        e[t.getIndexId()] = t.getResults();
      }), r.hydrate(e), s = Object.keys(e).map(function (t) {
        var i = e[t],
            n = i._state,
            s = i._rawResults;
        return [t, {
          _state: Object.keys(n).reduce(function (e, t) {
            return e[t] = n[t], e;
          }, {}),
          _rawResults: s
        }];
      }).reduce(function (e, t) {
        var i = t[0],
            n = t[1];
        return e[i] = n, e;
      }, {
        __identifier: "stringified"
      }), r.getState();
    });
  }, r.getState = function () {
    if (!s) throw new Error("You need to wait for findResultsState to finish");
    return s;
  }, r.__forceRender = function (e, t) {
    var i = t.getHelper(),
        n = r.__initialSearchResults[t.getIndexId()];

    if (n) {
      var s = n._state;
      i.state = s, e.render({
        helper: i,
        results: n,
        scopedResults: t.getScopedResults().map(function (e) {
          return Object.assign(e, {
            results: r.__initialSearchResults[e.indexId]
          });
        }),
        parent: t,
        state: s,
        templatesConfig: {},
        createURL: t.createURL,
        instantSearchInstance: r,
        searchMetadata: {
          isSearchStalled: !1
        }
      });
    }
  }, r.hydrate = function (e) {
    if (e) {
      var t = "stringified" === e.__identifier ? Object.keys(e).reduce(function (t, i) {
        return "__identifier" === i ? t : (t[i] = new SearchResults(new SearchParameters(e[i]._state), e[i]._rawResults), t);
      }, {}) : e;
      r.__initialSearchResults = t, r.helper = a, r.mainHelper = a, r.mainIndex.init({
        instantSearchInstance: r,
        parent: null,
        uiState: r._initialUiState
      });
    } else warn("The result of `findResultsState()` needs to be passed to `hydrate()`.");
  }, r;
}

function createServerRootMixin(e) {
  void 0 === e && (e = {});
  var t = e.searchClient,
      i = e.indexName,
      n = e.$cloneComponent;
  if (void 0 === n && (n = defaultCloneComponent), !t || !i) throw new Error("createServerRootMixin requires `searchClient` and `indexName` in the first argument");
  var s = augmentInstantSearch(e, t, i, n);
  return {
    provide: function () {
      return {
        $_ais_ssrInstantSearchInstance: this.instantsearch
      };
    },
    data: function () {
      return {
        instantsearch: s
      };
    }
  };
}

exports.AisAutocomplete = Autocomplete, exports.AisBreadcrumb = Breadcrumb, exports.AisClearRefinements = ClearRefinements, exports.AisConfigure = Configure, exports.AisCurrentRefinements = CurrentRefinements, exports.AisDynamicWidgets = DynamicWidgets, exports.AisExperimentalConfigureRelatedItems = ConfigureRelatedItems, exports.AisHierarchicalMenu = HierarchicalMenu, exports.AisHighlight = AisHighlight, exports.AisHits = Hits, exports.AisHitsPerPage = HitsPerPage, exports.AisIndex = Index, exports.AisInfiniteHits = InfiniteHits, exports.AisInstantSearch = InstantSearch, exports.AisInstantSearchSsr = InstantSearchSsr, exports.AisMenu = Menu, exports.AisMenuSelect = MenuSelect, exports.AisNumericMenu = NumericMenu, exports.AisPagination = Pagination, exports.AisPanel = Panel, exports.AisPoweredBy = PoweredBy, exports.AisQueryRuleContext = QueryRuleContext, exports.AisQueryRuleCustomData = QueryRuleCustomData, exports.AisRangeInput = RangeInput, exports.AisRatingMenu = RatingMenu, exports.AisRefinementList = RefinementList, exports.AisRelevantSort = RelevantSort, exports.AisSearchBox = SearchBox, exports.AisSnippet = Snippet, exports.AisSortBy = SortBy, exports.AisStateResults = StateResults, exports.AisStats = Stats, exports.AisToggleRefinement = ToggleRefinement, exports.AisVoiceSearch = VoiceSearch, exports.createServerRootMixin = createServerRootMixin, exports.createSuitMixin = createSuitMixin, exports.createWidgetMixin = createWidgetMixin, exports.default = plugin;

/***/ }),

/***/ 350:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_InstantSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(364);
/* harmony import */ var _lib_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(313);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(391);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(392);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(393);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(394);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(395);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(397);
/* harmony import */ var _lib_infiniteHitsCache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(396);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(254);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(314);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_10__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_10__[key]; }) }(__WEBPACK_IMPORT_KEY__));





/**
 * InstantSearch is the main component of InstantSearch.js. This object
 * manages the widget and lets you add new ones.
 *
 * Two parameters are required to get you started with InstantSearch.js:
 *  - `indexName`: the main index that you will use for your new search UI
 *  - `searchClient`: the search client to plug to InstantSearch.js
 *
 * The [search client provided by Algolia](algolia.com/doc/api-client/getting-started/what-is-the-api-client/javascript/)
 * needs an `appId` and an `apiKey`. Those parameters can be found in your
 * [Algolia dashboard](https://www.algolia.com/api-keys).
 *
 * If you want to get up and running quickly with InstantSearch.js, have a
 * look at the [getting started](https://www.algolia.com/doc/guides/building-search-ui/getting-started/js/).
 */

var instantsearch = function instantsearch(options) {
  return new _lib_InstantSearch__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](options);
};

instantsearch.version = _lib_version__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"];
instantsearch.createInfiniteHitsSessionStorageCache = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_9__[/* deprecate */ "a"])(_lib_infiniteHitsCache__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], "import { createInfiniteHitsSessionStorageCache } from 'instantsearch.js/es/helpers'");
instantsearch.highlight = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_9__[/* deprecate */ "a"])(_helpers__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], "import { highlight } from 'instantsearch.js/es/helpers'");
instantsearch.reverseHighlight = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_9__[/* deprecate */ "a"])(_helpers__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], "import { reverseHighlight } from 'instantsearch.js/es/helpers'");
instantsearch.snippet = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_9__[/* deprecate */ "a"])(_helpers__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], "import { snippet } from 'instantsearch.js/es/helpers'");
instantsearch.reverseSnippet = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_9__[/* deprecate */ "a"])(_helpers__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], "import { reverseSnippet } from 'instantsearch.js/es/helpers'");
instantsearch.insights = _helpers__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"];
instantsearch.getInsightsAnonymousUserToken = _helpers__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"];
Object.defineProperty(instantsearch, 'widgets', {
  get: function get() {
    throw new ReferenceError("\"instantsearch.widgets\" are not available from the ES build.\n\nTo import the widgets:\n\nimport { searchBox } from 'instantsearch.js/es/widgets'");
  }
});
Object.defineProperty(instantsearch, 'connectors', {
  get: function get() {
    throw new ReferenceError("\"instantsearch.connectors\" are not available from the ES build.\n\nTo import the connectors:\n\nimport { connectSearchBox } from 'instantsearch.js/es/connectors'");
  }
});
/* harmony default export */ __webpack_exports__["default"] = (instantsearch);


/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfiniteHitsBlogs_vue_vue_type_style_index_0_id_c669df34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(329);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfiniteHitsBlogs_vue_vue_type_style_index_0_id_c669df34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfiniteHitsBlogs_vue_vue_type_style_index_0_id_c669df34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfiniteHitsBlogs_vue_vue_type_style_index_0_id_c669df34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InfiniteHitsBlogs_vue_vue_type_style_index_0_id_c669df34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "algoliasearch-helper"
var external_algoliasearch_helper_ = __webpack_require__(190);
var external_algoliasearch_helper_default = /*#__PURE__*/__webpack_require__.n(external_algoliasearch_helper_);

// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(230);
var external_events_default = /*#__PURE__*/__webpack_require__.n(external_events_);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/widgets/index/index.js
var index = __webpack_require__(312);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/version.js
var version = __webpack_require__(313);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/helpers/highlight.js
var helpers_highlight = __webpack_require__(391);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/helpers/reverseHighlight.js
var helpers_reverseHighlight = __webpack_require__(392);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/helpers/snippet.js
var helpers_snippet = __webpack_require__(393);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/helpers/reverseSnippet.js
var helpers_reverseSnippet = __webpack_require__(394);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/helpers/insights.js
var helpers_insights = __webpack_require__(395);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/createHelpers.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


function hoganHelpers(_ref) {
  var numberLocale = _ref.numberLocale;
  return {
    formatNumber: function formatNumber(value, render) {
      return Number(render(value)).toLocaleString(numberLocale);
    },
    highlight: function highlight(options, render) {
      try {
        var highlightOptions = JSON.parse(options);
        return render(Object(helpers_highlight["a" /* default */])(_objectSpread(_objectSpread({}, highlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\nThe highlight helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    reverseHighlight: function reverseHighlight(options, render) {
      try {
        var reverseHighlightOptions = JSON.parse(options);
        return render(Object(helpers_reverseHighlight["a" /* default */])(_objectSpread(_objectSpread({}, reverseHighlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\n  The reverseHighlight helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    snippet: function snippet(options, render) {
      try {
        var snippetOptions = JSON.parse(options);
        return render(Object(helpers_snippet["a" /* default */])(_objectSpread(_objectSpread({}, snippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\nThe snippet helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    reverseSnippet: function reverseSnippet(options, render) {
      try {
        var reverseSnippetOptions = JSON.parse(options);
        return render(Object(helpers_reverseSnippet["a" /* default */])(_objectSpread(_objectSpread({}, reverseSnippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\n  The reverseSnippet helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    insights: function insights(options, render) {
      try {
        var _JSON$parse = JSON.parse(options),
            method = _JSON$parse.method,
            payload = _JSON$parse.payload;

        return render(Object(helpers_insights["a" /* default */])(method, _objectSpread({
          objectIDs: [this.objectID]
        }, payload)));
      } catch (error) {
        throw new Error("\nThe insights helper expects a JSON object of the format:\n{ \"method\": \"method-name\", \"payload\": { \"eventName\": \"name of the event\" } }");
      }
    }
  };
}
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/documentation.js
var documentation = __webpack_require__(264);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/defer.js
var defer = __webpack_require__(307);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/noop.js
var noop = __webpack_require__(265);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/stateMappings/simple.js
function simple_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function simple_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      simple_ownKeys(Object(source), true).forEach(function (key) {
        simple_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      simple_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function simple_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function getIndexStateWithoutConfigure(uiState) {
  var configure = uiState.configure,
      trackedUiState = _objectWithoutProperties(uiState, ["configure"]);

  return trackedUiState;
} // technically a URL could contain any key, since users provide it,
// which is why the input to this function is UiState, not something
// which excludes "configure" as this function does.


function simpleStateMapping() {
  return {
    stateToRoute: function stateToRoute(uiState) {
      return Object.keys(uiState).reduce(function (state, indexId) {
        return simple_objectSpread(simple_objectSpread({}, state), {}, simple_defineProperty({}, indexId, getIndexStateWithoutConfigure(uiState[indexId])));
      }, {});
    },
    routeToState: function routeToState() {
      var routeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.keys(routeState).reduce(function (state, indexId) {
        return simple_objectSpread(simple_objectSpread({}, state), {}, simple_defineProperty({}, indexId, getIndexStateWithoutConfigure(routeState[indexId])));
      }, {});
    }
  };
}
// EXTERNAL MODULE: external "qs"
var external_qs_ = __webpack_require__(231);
var external_qs_default = /*#__PURE__*/__webpack_require__.n(external_qs_);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js
var safelyRunOnBrowser = __webpack_require__(302);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/routers/history.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function history_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}




var setWindowTitle = function setWindowTitle(title) {
  if (title) {
    // This function is only executed on browsers so we can disable this check.
    // eslint-disable-next-line no-restricted-globals
    window.document.title = title;
  }
};

var history_BrowserHistory = /*#__PURE__*/function () {
  /**
   * Initializes a new storage provider that syncs the search state to the URL
   * using web APIs (`window.location.pushState` and `onpopstate` event).
   */
  function BrowserHistory(_ref) {
    var _this = this;

    var windowTitle = _ref.windowTitle,
        _ref$writeDelay = _ref.writeDelay,
        writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay,
        createURL = _ref.createURL,
        parseURL = _ref.parseURL,
        getLocation = _ref.getLocation;

    _classCallCheck(this, BrowserHistory);

    history_defineProperty(this, "windowTitle", void 0);

    history_defineProperty(this, "writeDelay", void 0);

    history_defineProperty(this, "_createURL", void 0);

    history_defineProperty(this, "parseURL", void 0);

    history_defineProperty(this, "getLocation", void 0);

    history_defineProperty(this, "writeTimer", void 0);

    history_defineProperty(this, "shouldPushState", true);

    this.windowTitle = windowTitle;
    this.writeTimer = undefined;
    this.writeDelay = writeDelay;
    this._createURL = createURL;
    this.parseURL = parseURL;
    this.getLocation = getLocation;
    Object(safelyRunOnBrowser["a" /* safelyRunOnBrowser */])(function () {
      var title = _this.windowTitle && _this.windowTitle(_this.read());

      setWindowTitle(title);
    });
  }
  /**
   * Reads the URL and returns a syncable UI search state.
   */


  _createClass(BrowserHistory, [{
    key: "read",
    value: function read() {
      return this.parseURL({
        qsModule: external_qs_default.a,
        location: this.getLocation()
      });
    }
    /**
     * Pushes a search state into the URL.
     */

  }, {
    key: "write",
    value: function write(routeState) {
      var _this2 = this;

      Object(safelyRunOnBrowser["a" /* safelyRunOnBrowser */])(function (_ref2) {
        var window = _ref2.window;

        var url = _this2.createURL(routeState);

        var title = _this2.windowTitle && _this2.windowTitle(routeState);

        if (_this2.writeTimer) {
          clearTimeout(_this2.writeTimer);
        }

        _this2.writeTimer = setTimeout(function () {
          setWindowTitle(title);

          if (_this2.shouldPushState) {
            window.history.pushState(routeState, title || '', url);
          }

          _this2.shouldPushState = true;
          _this2.writeTimer = undefined;
        }, _this2.writeDelay);
      });
    }
    /**
     * Sets a callback on the `onpopstate` event of the history API of the current page.
     * It enables the URL sync to keep track of the changes.
     */

  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      var _this3 = this;

      this._onPopState = function (event) {
        if (_this3.writeTimer) {
          clearTimeout(_this3.writeTimer);
          _this3.writeTimer = undefined;
        }

        _this3.shouldPushState = false;
        var routeState = event.state; // At initial load, the state is read from the URL without update.
        // Therefore the state object is not available.
        // In this case, we fallback and read the URL.

        if (!routeState) {
          callback(_this3.read());
        } else {
          callback(routeState);
        }
      };

      Object(safelyRunOnBrowser["a" /* safelyRunOnBrowser */])(function (_ref3) {
        var window = _ref3.window;
        window.addEventListener('popstate', _this3._onPopState);
      });
    }
    /**
     * Creates a complete URL from a given syncable UI state.
     *
     * It always generates the full URL, not a relative one.
     * This allows to handle cases like using a <base href>.
     * See: https://github.com/algolia/instantsearch.js/issues/790
     */

  }, {
    key: "createURL",
    value: function createURL(routeState) {
      return this._createURL({
        qsModule: external_qs_default.a,
        routeState: routeState,
        location: this.getLocation()
      });
    }
    /**
     * Removes the event listener and cleans up the URL.
     */

  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;

      Object(safelyRunOnBrowser["a" /* safelyRunOnBrowser */])(function (_ref4) {
        var window = _ref4.window;

        if (_this4._onPopState) {
          window.removeEventListener('popstate', _this4._onPopState);
        }
      });

      if (this.writeTimer) {
        clearTimeout(this.writeTimer);
      }

      this.write({});
    }
  }]);

  return BrowserHistory;
}();

function historyRouter() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref5$createURL = _ref5.createURL,
      createURL = _ref5$createURL === void 0 ? function (_ref6) {
    var qsModule = _ref6.qsModule,
        routeState = _ref6.routeState,
        location = _ref6.location;
    var protocol = location.protocol,
        hostname = location.hostname,
        _location$port = location.port,
        port = _location$port === void 0 ? '' : _location$port,
        pathname = location.pathname,
        hash = location.hash;
    var queryString = qsModule.stringify(routeState);
    var portWithPrefix = port === '' ? '' : ":".concat(port); // IE <= 11 has no proper `location.origin` so we cannot rely on it.
    // IE <= 11 has no proper `location.origin` so we cannot rely on it.

    if (!queryString) {
      return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
    }

    return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
  } : _ref5$createURL,
      _ref5$parseURL = _ref5.parseURL,
      parseURL = _ref5$parseURL === void 0 ? function (_ref7) {
    var qsModule = _ref7.qsModule,
        location = _ref7.location; // `qs` by default converts arrays with more than 20 items to an object.
    // We want to avoid this because the data structure manipulated can therefore vary.
    // Setting the limit to `100` seems a good number because the engine's default is 100
    // (it can go up to 1000 but it is very unlikely to select more than 100 items in the UI).
    //
    // Using an `arrayLimit` of `n` allows `n + 1` items.
    //
    // See:
    //   - https://github.com/ljharb/qs#parsing-arrays
    //   - https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/

    return qsModule.parse(location.search.slice(1), {
      arrayLimit: 99
    });
  } : _ref5$parseURL,
      _ref5$writeDelay = _ref5.writeDelay,
      writeDelay = _ref5$writeDelay === void 0 ? 400 : _ref5$writeDelay,
      windowTitle = _ref5.windowTitle,
      _ref5$getLocation = _ref5.getLocation,
      getLocation = _ref5$getLocation === void 0 ? function () {
    return Object(safelyRunOnBrowser["a" /* safelyRunOnBrowser */])(function (_ref8) {
      var window = _ref8.window;
      return window.location;
    }, {
      fallback: function fallback() {
        throw new Error('You need to provide `getLocation` to the `history` router in environments where `window` does not exist.');
      }
    });
  } : _ref5$getLocation;

  return new history_BrowserHistory({
    createURL: createURL,
    parseURL: parseURL,
    writeDelay: writeDelay,
    windowTitle: windowTitle,
    getLocation: getLocation
  });
}
// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/lib/utils/isEqual.js
var isEqual = __webpack_require__(296);

// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/middlewares/createRouterMiddleware.js
function createRouterMiddleware_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function createRouterMiddleware_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      createRouterMiddleware_ownKeys(Object(source), true).forEach(function (key) {
        createRouterMiddleware_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      createRouterMiddleware_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function createRouterMiddleware_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}




var createRouterMiddleware_createRouterMiddleware = function createRouterMiddleware() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _props$router = props.router,
      router = _props$router === void 0 ? historyRouter() : _props$router,
      _props$stateMapping = props.stateMapping,
      stateMapping = _props$stateMapping === void 0 ? simpleStateMapping() : _props$stateMapping;
  return function (_ref) {
    var instantSearchInstance = _ref.instantSearchInstance;

    function topLevelCreateURL(nextState) {
      var uiState = Object.keys(nextState).reduce(function (acc, indexId) {
        return createRouterMiddleware_objectSpread(createRouterMiddleware_objectSpread({}, acc), {}, createRouterMiddleware_defineProperty({}, indexId, nextState[indexId]));
      }, instantSearchInstance.mainIndex.getWidgetUiState({}));
      var route = stateMapping.stateToRoute(uiState);
      return router.createURL(route);
    } // casting to UiState here to keep createURL unaware of custom UiState
    // (as long as it's an object, it's ok)


    instantSearchInstance._createURL = topLevelCreateURL;
    var lastRouteState = undefined;
    var initialUiState = instantSearchInstance._initialUiState;
    return {
      onStateChange: function onStateChange(_ref2) {
        var uiState = _ref2.uiState;
        var routeState = stateMapping.stateToRoute(uiState);

        if (lastRouteState === undefined || !Object(isEqual["a" /* default */])(lastRouteState, routeState)) {
          router.write(routeState);
          lastRouteState = routeState;
        }
      },
      subscribe: function subscribe() {
        instantSearchInstance._initialUiState = createRouterMiddleware_objectSpread(createRouterMiddleware_objectSpread({}, initialUiState), stateMapping.routeToState(router.read()));
        router.onUpdate(function (route) {
          instantSearchInstance.setUiState(stateMapping.routeToState(route));
        });
      },
      unsubscribe: function unsubscribe() {
        router.dispose();
      }
    };
  };
};
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/middlewares/createMetadataMiddleware.js


function extractPayload(widgets, instantSearchInstance, payload) {
  var parent = instantSearchInstance.mainIndex;
  var initOptions = {
    instantSearchInstance: instantSearchInstance,
    parent: parent,
    scopedResults: [],
    state: parent.getHelper().state,
    helper: parent.getHelper(),
    createURL: parent.createURL,
    uiState: instantSearchInstance._initialUiState,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    searchMetadata: {
      isSearchStalled: instantSearchInstance._isSearchStalled
    }
  };
  widgets.forEach(function (widget) {
    var widgetParams = {};

    if (widget.getWidgetRenderState) {
      var renderState = widget.getWidgetRenderState(initOptions);

      if (renderState && renderState.widgetParams) {
        // casting, as we just earlier checked widgetParams exists, and thus an object
        widgetParams = renderState.widgetParams;
      }
    } // since we destructure in all widgets, the parameters with defaults are set to "undefined"


    var params = Object.keys(widgetParams).filter(function (key) {
      return widgetParams[key] !== undefined;
    });
    payload.widgets.push({
      type: widget.$$type,
      widgetType: widget.$$widgetType,
      params: params
    });

    if (widget.$$type === 'ais.index') {
      extractPayload(widget.getWidgets(), instantSearchInstance, payload);
    }
  });
}

function isMetadataEnabled() {
  return Object(safelyRunOnBrowser["a" /* safelyRunOnBrowser */])(function (_ref) {
    var window = _ref.window;
    return window.navigator.userAgent.indexOf('Algolia Crawler') > -1;
  }, {
    fallback: function fallback() {
      return false;
    }
  });
}
/**
 * Exposes the metadata of mounted widgets in a custom
 * `<meta name="instantsearch:widgets" />` tag. The metadata per widget is:
 * - applied parameters
 * - widget name
 * - connector name
 */

function createMetadataMiddleware() {
  return function (_ref2) {
    var instantSearchInstance = _ref2.instantSearchInstance;
    var payload = {
      widgets: []
    };
    var payloadContainer = document.createElement('meta');
    var refNode = document.querySelector('head');
    payloadContainer.name = 'instantsearch:widgets';
    return {
      onStateChange: function onStateChange() {},
      subscribe: function subscribe() {
        // using setTimeout here to delay extraction until widgets have been added in a tick (e.g. Vue)
        setTimeout(function () {
          var client = instantSearchInstance.client;
          payload.ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
          extractPayload(instantSearchInstance.mainIndex.getWidgets(), instantSearchInstance, payload);
          payloadContainer.content = JSON.stringify(payload);
          refNode.appendChild(payloadContainer);
        }, 0);
      },
      unsubscribe: function unsubscribe() {
        payloadContainer.remove();
      }
    };
  };
}
// CONCATENATED MODULE: ./node_modules/instantsearch.js/es/lib/InstantSearch.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function InstantSearch_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function InstantSearch_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      InstantSearch_ownKeys(Object(source), true).forEach(function (key) {
        InstantSearch_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      InstantSearch_ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function InstantSearch_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function InstantSearch_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function InstantSearch_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) InstantSearch_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) InstantSearch_defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function InstantSearch_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}









var withUsage = Object(documentation["b" /* createDocumentationMessageGenerator */])({
  name: 'instantsearch'
});

function defaultCreateURL() {
  return '#';
}
/**
 * Global options for an InstantSearch instance.
 */

/**
 * The actual implementation of the InstantSearch. This is
 * created using the `instantsearch` factory function.
 * It emits the 'render' event every time a search is done
 */


var InstantSearch_InstantSearch = /*#__PURE__*/function (_EventEmitter) {
  _inherits(InstantSearch, _EventEmitter);

  var _super = _createSuper(InstantSearch);

  function InstantSearch(options) {
    var _this;

    InstantSearch_classCallCheck(this, InstantSearch);

    _this = _super.call(this);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "client", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "indexName", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "insightsClient", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "onStateChange", null);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "helper", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "mainHelper", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "mainIndex", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "started", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "templatesConfig", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "renderState", {});

    InstantSearch_defineProperty(_assertThisInitialized(_this), "_stalledSearchDelay", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "_searchStalledTimer", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "_isSearchStalled", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "_initialUiState", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "_createURL", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "_searchFunction", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "_mainHelperSearch", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "middleware", []);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "sendEventToInsights", void 0);

    InstantSearch_defineProperty(_assertThisInitialized(_this), "scheduleSearch", Object(defer["a" /* default */])(function () {
      if (_this.started) {
        _this.mainHelper.search();
      }
    }));

    InstantSearch_defineProperty(_assertThisInitialized(_this), "scheduleRender", Object(defer["a" /* default */])(function () {
      if (!_this.mainHelper.hasPendingRequests()) {
        clearTimeout(_this._searchStalledTimer);
        _this._searchStalledTimer = null;
        _this._isSearchStalled = false;
      }

      _this.mainIndex.render({
        instantSearchInstance: _assertThisInitialized(_this)
      });

      _this.emit('render');
    }));

    InstantSearch_defineProperty(_assertThisInitialized(_this), "onInternalStateChange", Object(defer["a" /* default */])(function () {
      var nextUiState = _this.mainIndex.getWidgetUiState({});

      _this.middleware.forEach(function (_ref) {
        var instance = _ref.instance;
        instance.onStateChange({
          uiState: nextUiState
        });
      });
    }));

    var _options$indexName = options.indexName,
        indexName = _options$indexName === void 0 ? null : _options$indexName,
        numberLocale = options.numberLocale,
        _options$initialUiSta = options.initialUiState,
        initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta,
        _options$routing = options.routing,
        routing = _options$routing === void 0 ? null : _options$routing,
        searchFunction = options.searchFunction,
        _options$stalledSearc = options.stalledSearchDelay,
        stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc,
        _options$searchClient = options.searchClient,
        searchClient = _options$searchClient === void 0 ? null : _options$searchClient,
        _options$insightsClie = options.insightsClient,
        insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie,
        _options$onStateChang = options.onStateChange,
        onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang;

    if (indexName === null) {
      throw new Error(withUsage('The `indexName` option is required.'));
    }

    if (searchClient === null) {
      throw new Error(withUsage('The `searchClient` option is required.'));
    }

    if (typeof searchClient.search !== 'function') {
      throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
    }

    if (typeof searchClient.addAlgoliaAgent === 'function') {
      searchClient.addAlgoliaAgent("instantsearch.js (".concat(version["a" /* default */], ")"));
    }

     false ? undefined : void 0;

    if (insightsClient && typeof insightsClient !== 'function') {
      throw new Error(withUsage('The `insightsClient` option should be a function.'));
    }

     false ? undefined : void 0;
    _this.client = searchClient;
    _this.insightsClient = insightsClient;
    _this.indexName = indexName;
    _this.helper = null;
    _this.mainHelper = null;
    _this.mainIndex = Object(index["default"])({
      indexName: indexName
    });
    _this.onStateChange = onStateChange;
    _this.started = false;
    _this.templatesConfig = {
      helpers: hoganHelpers({
        numberLocale: numberLocale
      }),
      compileOptions: {}
    };
    _this._stalledSearchDelay = stalledSearchDelay;
    _this._searchStalledTimer = null;
    _this._isSearchStalled = false;
    _this._createURL = defaultCreateURL;
    _this._initialUiState = initialUiState;

    if (searchFunction) {
      _this._searchFunction = searchFunction;
    }

    _this.sendEventToInsights = noop["a" /* default */];

    if (routing) {
      var routerOptions = typeof routing === 'boolean' ? undefined : routing;

      _this.use(createRouterMiddleware_createRouterMiddleware(routerOptions));
    }

    if (isMetadataEnabled()) {
      _this.use(createMetadataMiddleware());
    }

    return _this;
  }
  /**
   * Hooks a middleware into the InstantSearch lifecycle.
   */


  InstantSearch_createClass(InstantSearch, [{
    key: "use",
    value: function use() {
      var _this2 = this;

      for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
        middleware[_key] = arguments[_key];
      }

      var newMiddlewareList = middleware.map(function (fn) {
        var newMiddleware = InstantSearch_objectSpread({
          subscribe: noop["a" /* default */],
          unsubscribe: noop["a" /* default */],
          onStateChange: noop["a" /* default */]
        }, fn({
          instantSearchInstance: _this2
        }));

        _this2.middleware.push({
          creator: fn,
          instance: newMiddleware
        });

        return newMiddleware;
      }); // If the instance has already started, we directly subscribe the
      // middleware so they're notified of changes.

      if (this.started) {
        newMiddlewareList.forEach(function (m) {
          m.subscribe();
        });
      }

      return this;
    }
    /**
     * Removes a middleware from the InstantSearch lifecycle.
     */

  }, {
    key: "unuse",
    value: function unuse() {
      for (var _len2 = arguments.length, middlewareToUnuse = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        middlewareToUnuse[_key2] = arguments[_key2];
      }

      this.middleware.filter(function (m) {
        return middlewareToUnuse.includes(m.creator);
      }).forEach(function (m) {
        return m.instance.unsubscribe();
      });
      this.middleware = this.middleware.filter(function (m) {
        return !middlewareToUnuse.includes(m.creator);
      });
      return this;
    } // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now

  }, {
    key: "EXPERIMENTAL_use",
    value: function EXPERIMENTAL_use() {
       false ? undefined : void 0;
      return this.use.apply(this, arguments);
    }
    /**
     * Adds a widget to the search instance.
     * A widget can be added either before or after InstantSearch has started.
     * @param widget The widget to add to InstantSearch.
     *
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
     */

  }, {
    key: "addWidget",
    value: function addWidget(widget) {
       false ? undefined : void 0;
      return this.addWidgets([widget]);
    }
    /**
     * Adds multiple widgets to the search instance.
     * Widgets can be added either before or after InstantSearch has started.
     * @param widgets The array of widgets to add to InstantSearch.
     */

  }, {
    key: "addWidgets",
    value: function addWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `addWidgets` method expects an array of widgets. Please use `addWidget`.'));
      }

      if (widgets.some(function (widget) {
        return typeof widget.init !== 'function' && typeof widget.render !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `render` and/or an `init` method.'));
      }

      this.mainIndex.addWidgets(widgets);
      return this;
    }
    /**
     * Removes a widget from the search instance.
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
     * @param widget The widget instance to remove from InstantSearch.
     *
     * The widget must implement a `dispose()` method to clear its state.
     */

  }, {
    key: "removeWidget",
    value: function removeWidget(widget) {
       false ? undefined : void 0;
      return this.removeWidgets([widget]);
    }
    /**
     * Removes multiple widgets from the search instance.
     * @param widgets Array of widgets instances to remove from InstantSearch.
     *
     * The widgets must implement a `dispose()` method to clear their states.
     */

  }, {
    key: "removeWidgets",
    value: function removeWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `removeWidgets` method expects an array of widgets. Please use `removeWidget`.'));
      }

      if (widgets.some(function (widget) {
        return typeof widget.dispose !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `dispose` method.'));
      }

      this.mainIndex.removeWidgets(widgets);
      return this;
    }
    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search. This method should be called after all widgets have been added
     * to the instance of InstantSearch.js. InstantSearch.js also supports adding and removing
     * widgets after the start as an **EXPERIMENTAL** feature.
     */

  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      if (this.started) {
        throw new Error(withUsage('The `start` method has already been called once.'));
      } // This Helper is used for the queries, we don't care about its state. The
      // states are managed at the `index` level. We use this Helper to create
      // DerivedHelper scoped into the `index` widgets.
      // In Vue InstantSearch' hydrate, a main helper gets set before start, so
      // we need to respect this helper as a way to keep all listeners correct.


      var mainHelper = this.mainHelper || external_algoliasearch_helper_default()(this.client, this.indexName);

      mainHelper.search = function () {
        // This solution allows us to keep the exact same API for the users but
        // under the hood, we have a different implementation. It should be
        // completely transparent for the rest of the codebase. Only this module
        // is impacted.
        return mainHelper.searchOnlyWithDerivedHelpers();
      };

      if (this._searchFunction) {
        // this client isn't used to actually search, but required for the helper
        // to not throw errors
        var fakeClient = {
          search: function search() {
            return new Promise(noop["a" /* default */]);
          }
        };
        this._mainHelperSearch = mainHelper.search.bind(mainHelper);

        mainHelper.search = function () {
          var mainIndexHelper = _this3.mainIndex.getHelper();

          var searchFunctionHelper = external_algoliasearch_helper_default()(fakeClient, mainIndexHelper.state.index, mainIndexHelper.state);
          searchFunctionHelper.once('search', function (_ref2) {
            var state = _ref2.state;
            mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);

            _this3._mainHelperSearch();
          }); // Forward state changes from `searchFunctionHelper` to `mainIndexHelper`

          searchFunctionHelper.on('change', function (_ref3) {
            var state = _ref3.state;
            mainIndexHelper.setState(state);
          });

          _this3._searchFunction(searchFunctionHelper);

          return mainHelper;
        };
      } // Only the "main" Helper emits the `error` event vs the one for `search`
      // and `results` that are also emitted on the derived one.


      mainHelper.on('error', function (_ref4) {
        var error = _ref4.error;

        _this3.emit('error', {
          error: error
        });
      });
      this.mainHelper = mainHelper;
      this.middleware.forEach(function (_ref5) {
        var instance = _ref5.instance;
        instance.subscribe();
      });
      this.mainIndex.init({
        instantSearchInstance: this,
        parent: null,
        uiState: this._initialUiState
      });
      this.scheduleSearch(); // Keep the previous reference for legacy purpose, some pattern use
      // the direct Helper access `search.helper` (e.g multi-index).

      this.helper = this.mainIndex.getHelper(); // track we started the search if we add more widgets,
      // to init them directly after add

      this.started = true;
    }
    /**
     * Removes all widgets without triggering a search afterwards. This is an **EXPERIMENTAL** feature,
     * if you find an issue with it, please
     * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20dispose).
     * @return {undefined} This method does not return anything
     */

  }, {
    key: "dispose",
    value: function dispose() {
      this.scheduleSearch.cancel();
      this.scheduleRender.cancel();
      clearTimeout(this._searchStalledTimer);
      this.removeWidgets(this.mainIndex.getWidgets());
      this.mainIndex.dispose(); // You can not start an instance two times, therefore a disposed instance
      // needs to set started as false otherwise this can not be restarted at a
      // later point.

      this.started = false; // The helper needs to be reset to perform the next search from a fresh state.
      // If not reset, it would use the state stored before calling `dispose()`.

      this.removeAllListeners();
      this.mainHelper.removeAllListeners();
      this.mainHelper = null;
      this.helper = null;
      this.middleware.forEach(function (_ref6) {
        var instance = _ref6.instance;
        instance.unsubscribe();
      });
    }
  }, {
    key: "scheduleStalledRender",
    value: function scheduleStalledRender() {
      var _this4 = this;

      if (!this._searchStalledTimer) {
        this._searchStalledTimer = setTimeout(function () {
          _this4._isSearchStalled = true;

          _this4.scheduleRender();
        }, this._stalledSearchDelay);
      }
    }
  }, {
    key: "setUiState",
    value: function setUiState(uiState) {
      if (!this.mainHelper) {
        throw new Error(withUsage('The `start` method needs to be called before `setUiState`.'));
      } // We refresh the index UI state to update the local UI state that the
      // main index passes to the function form of `setUiState`.


      this.mainIndex.refreshUiState();
      var nextUiState = typeof uiState === 'function' ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;

      var setIndexHelperState = function setIndexHelperState(indexWidget) {
        var nextIndexUiState = nextUiState[indexWidget.getIndexId()] || {};

        if (false) {}

        indexWidget.getHelper().setState(indexWidget.getWidgetSearchParameters(indexWidget.getHelper().state, {
          uiState: nextIndexUiState
        }));
        indexWidget.getWidgets().filter(index["isIndexWidget"]).forEach(setIndexHelperState);
      };

      setIndexHelperState(this.mainIndex);
      this.scheduleSearch();
      this.onInternalStateChange();
    }
  }, {
    key: "getUiState",
    value: function getUiState() {
      if (this.started) {
        // We refresh the index UI state to make sure changes from `refine` are taken in account
        this.mainIndex.refreshUiState();
      }

      return this.mainIndex.getWidgetUiState({});
    }
  }, {
    key: "createURL",
    value: function createURL() {
      var nextState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.started) {
        throw new Error(withUsage('The `start` method needs to be called before `createURL`.'));
      }

      return this._createURL(nextState);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.mainHelper) {
        throw new Error(withUsage('The `start` method needs to be called before `refresh`.'));
      }

      this.mainHelper.clearCache().search();
    }
  }]);

  return InstantSearch;
}(external_events_default.a);

/* harmony default export */ var lib_InstantSearch = __webpack_exports__["a"] = (InstantSearch_InstantSearch);

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/InfiniteHitsBlogs.vue?vue&type=template&id=c669df34&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.state)?_c('div',{staticClass:"contenedor"},[_vm._l((_vm.state.hits),function(hit){return _c('v-card',{key:hit.objectID,staticClass:"item-blog"},[_c('v-card-text',[_c('div',[_vm._v("\n                Jekuaapy blog\n            ")]),_vm._v(" "),_c('p',{staticClass:"text-h4 titulo mt-3"},[_c('nuxt-link',{staticStyle:{"color":"#683bce"},attrs:{"to":("/blog/" + (hit.referencia))}},[_vm._v("\n                    "+_vm._s(hit.titulo)+"\n                ")])],1),_vm._v(" "),(hit.seccion)?_c('p',[_c('nuxt-link',{staticStyle:{"color":"#777777"},attrs:{"to":("/blogs/" + (hit.seccion))}},[_vm._v("\n                    "+_vm._s(_vm.mostrarNombre('seccion', {seccion: hit.seccion}))+"\n                ")]),_vm._v("\n                /\n                "),_c('nuxt-link',{staticStyle:{"color":"#777777"},attrs:{"to":("/blogs/" + (hit.seccion) + "/" + (hit.categoria))}},[_vm._v("\n                    "+_vm._s(_vm.mostrarNombre('categoria', {seccion: hit.seccion, categoria: hit.categoria}))+"\n                ")])],1):_vm._e(),_vm._v(" "),(hit.seccion)?_c('p',_vm._l((hit.subCategorias),function(subCategoria,index){return _c('v-chip',{key:index,staticClass:"mr-2 pl-4 pr-4",attrs:{"color":"#683bce","text-color":"white","to":("/blogs/" + (hit.seccion) + "/" + (hit.categoria) + "/" + subCategoria)}},[_c('v-icon',{attrs:{"left":""}},[_vm._v("\n                        mdi-book-open\n                    ")]),_vm._v("\n                    "+_vm._s(_vm.mostrarNombre('subCategoria', {seccion: hit.seccion, categoria: hit.categoria, subCategoria: subCategoria}))+"\n                ")],1)}),1):_c('p',[_vm._v("\n                Blog normal\n            ")]),_vm._v(" "),_c('div',{staticClass:"text--primary"},[_vm._v("\n                "+_vm._s(hit.descripcion)+"\n            ")])]),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{attrs:{"text":"","color":"#683bce","to":("/blog/" + (hit.referencia))}},[_vm._v("\n                Ver blog\n            ")])],1)],1)}),_vm._ssrNode(" "),_c('div',{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:(_vm.visibilityChanged),expression:"visibilityChanged"}]},[])],2):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/blogs/InfiniteHitsBlogs.vue?vue&type=template&id=c669df34&scoped=true&

// EXTERNAL MODULE: ./node_modules/vue-instantsearch/vue2/cjs/index.js
var cjs = __webpack_require__(333);

// EXTERNAL MODULE: ./node_modules/instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits.js
var connectInfiniteHits = __webpack_require__(273);

// EXTERNAL MODULE: external "vue-observe-visibility"
var external_vue_observe_visibility_ = __webpack_require__(200);

// EXTERNAL MODULE: ./helpers/informacionSecciones.js
var informacionSecciones = __webpack_require__(251);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/InfiniteHitsBlogs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var InfiniteHitsBlogsvue_type_script_lang_js_ = ({
  data() {
    return {
      informacionSecciones: informacionSecciones["a" /* default */]
    };
  },

  mixins: [Object(cjs["createWidgetMixin"])({
    connector: connectInfiniteHits["a" /* default */]
  })],
  directives: {
    ObserveVisibility: external_vue_observe_visibility_["ObserveVisibility"]
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible && !this.state.isLastPage) {
        this.state.showMore();
      }
    },

    mostrarNombre(tipo, opciones) {
      let nombre;

      if (tipo === 'seccion') {
        nombre = this.informacionSecciones[opciones.seccion].nombre;
      } else if (tipo === 'categoria') {
        nombre = this.informacionSecciones[opciones.seccion].categorias[opciones.categoria].nombre;
      } else {
        nombre = this.informacionSecciones[opciones.seccion].categorias[opciones.categoria].subCategorias[opciones.subCategoria].nombre;
      }

      return nombre;
    }

  }
});
// CONCATENATED MODULE: ./components/blogs/InfiniteHitsBlogs.vue?vue&type=script&lang=js&
 /* harmony default export */ var blogs_InfiniteHitsBlogsvue_type_script_lang_js_ = (InfiniteHitsBlogsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(9);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VChip/VChip.js
var VChip = __webpack_require__(258);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// CONCATENATED MODULE: ./components/blogs/InfiniteHitsBlogs.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(359)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  blogs_InfiniteHitsBlogsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "c669df34",
  "e29ad1fe"
  
)

/* harmony default export */ var InfiniteHitsBlogs = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */







installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardText: components_VCard["c" /* VCardText */],VChip: VChip["a" /* default */],VIcon: VIcon["a" /* default */]})


/***/ }),

/***/ 371:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_buscador_infinito_blogs_vue_vue_type_style_index_0_id_05e6f222_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(350);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_buscador_infinito_blogs_vue_vue_type_style_index_0_id_05e6f222_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_buscador_infinito_blogs_vue_vue_type_style_index_0_id_05e6f222_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_buscador_infinito_blogs_vue_vue_type_style_index_0_id_05e6f222_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_buscador_infinito_blogs_vue_vue_type_style_index_0_id_05e6f222_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/buscador-infinito-blogs.vue?vue&type=template&id=05e6f222&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div class=\"container\" data-v-05e6f222>","</div>",[_c('ais-instant-search',{attrs:{"search-client":_vm.searchClient,"index-name":_vm.indexName}},[_c('div',{staticClass:"search-panel"},[_c('div',{staticClass:"search-panel__results"},[_c('ais-search-box',{staticClass:"searchbox",attrs:{"placeholder":"Busque los blogs"}}),_vm._v(" "),_c('app-infinite-hits-blogs',{scopedSlots:_vm._u([{key:"item",fn:function(ref){
var item = ref.item;
return [_c('ais-highlight',{attrs:{"hit":item,"attribute":"titulo"}})]}}])})],1)])])],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/blogs/buscador-infinito-blogs.vue?vue&type=template&id=05e6f222&scoped=true&

// EXTERNAL MODULE: ./node_modules/vue-instantsearch/vue2/cjs/index.js
var cjs = __webpack_require__(333);

// EXTERNAL MODULE: external "algoliasearch/lite"
var lite_ = __webpack_require__(232);
var lite_default = /*#__PURE__*/__webpack_require__.n(lite_);

// EXTERNAL MODULE: ./node_modules/instantsearch.css/themes/algolia-min.css
var algolia_min = __webpack_require__(371);

// EXTERNAL MODULE: ./components/blogs/InfiniteHitsBlogs.vue + 4 modules
var InfiniteHitsBlogs = __webpack_require__(366);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/buscador-infinito-blogs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var buscador_infinito_blogsvue_type_script_lang_js_ = ({
  components: {
    'app-infinite-hits-blogs': InfiniteHitsBlogs["default"],
    'ais-instant-search': cjs["AisInstantSearch"],
    'ais-search-box': cjs["AisSearchBox"],
    'ais-highlight': cjs["AisHighlight"]
  },

  data() {
    return {
      searchClient: lite_default()('RNRNTDZS3N', 'af4d4e9d36a7ceb75e258007c3ceccf2'),
      indexName:  true ? 'blogs_prod' : undefined
    };
  },

  created() {}

});
// CONCATENATED MODULE: ./components/blogs/buscador-infinito-blogs.vue?vue&type=script&lang=js&
 /* harmony default export */ var blogs_buscador_infinito_blogsvue_type_script_lang_js_ = (buscador_infinito_blogsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// CONCATENATED MODULE: ./components/blogs/buscador-infinito-blogs.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(372)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  blogs_buscador_infinito_blogsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "05e6f222",
  "51392cea"
  
)

/* harmony default export */ var buscador_infinito_blogs = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return highlight; });
/* harmony import */ var _lib_suit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(255);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(303);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(249);


var suit = Object(_lib_suit__WEBPACK_IMPORTED_MODULE_0__[/* component */ "a"])('Highlight');
function highlight(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

  var _ref2 = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(hit._highlightResult, attribute) || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  return attributeValue.replace(new RegExp(_lib_utils__WEBPACK_IMPORTED_MODULE_2__[/* TAG_REPLACEMENT */ "b"].highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_lib_utils__WEBPACK_IMPORTED_MODULE_2__[/* TAG_REPLACEMENT */ "b"].highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reverseHighlight; });
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(303);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(308);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(310);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(309);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(249);
/* harmony import */ var _lib_suit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(255);


var suit = Object(_lib_suit__WEBPACK_IMPORTED_MODULE_5__[/* component */ "a"])('ReverseHighlight');
function reverseHighlight(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

  var _ref2 = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(hit._highlightResult, attribute) || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  var reverseHighlightedValue = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[/* TAG_REPLACEMENT */ "b"].highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[/* TAG_REPLACEMENT */ "b"].highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return snippet; });
/* harmony import */ var _lib_suit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(255);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(303);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(249);


var suit = Object(_lib_suit__WEBPACK_IMPORTED_MODULE_0__[/* component */ "a"])('Snippet');
function snippet(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

  var _ref2 = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(hit._snippetResult, attribute) || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  return attributeValue.replace(new RegExp(_lib_utils__WEBPACK_IMPORTED_MODULE_2__[/* TAG_REPLACEMENT */ "b"].highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_lib_utils__WEBPACK_IMPORTED_MODULE_2__[/* TAG_REPLACEMENT */ "b"].highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reverseSnippet; });
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(303);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(308);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(310);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(309);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(249);
/* harmony import */ var _lib_suit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(255);


var suit = Object(_lib_suit__WEBPACK_IMPORTED_MODULE_5__[/* component */ "a"])('ReverseSnippet');
function reverseSnippet(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

  var _ref2 = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(hit._snippetResult, attribute) || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  var reverseHighlightedValue = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[/* TAG_REPLACEMENT */ "b"].highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_lib_utils__WEBPACK_IMPORTED_MODULE_4__[/* TAG_REPLACEMENT */ "b"].highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export readDataAttributes */
/* unused harmony export hasDataAttributes */
/* unused harmony export writeDataAttributes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return insights; });
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(253);
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}


function readDataAttributes(domElement) {
  var method = domElement.getAttribute('data-insights-method');
  var serializedPayload = domElement.getAttribute('data-insights-payload');

  if (typeof serializedPayload !== 'string') {
    throw new Error('The insights helper expects `data-insights-payload` to be a base64-encoded JSON string.');
  }

  try {
    var payload = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__[/* deserializePayload */ "a"])(serializedPayload);
    return {
      method: method,
      payload: payload
    };
  } catch (error) {
    throw new Error('The insights helper was unable to parse `data-insights-payload`.');
  }
}
function hasDataAttributes(domElement) {
  return domElement.hasAttribute('data-insights-method');
}
function writeDataAttributes(_ref) {
  var method = _ref.method,
      payload = _ref.payload;

  if (_typeof(payload) !== 'object') {
    throw new Error("The insights helper expects the payload to be an object.");
  }

  var serializedPayload;

  try {
    serializedPayload = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__[/* serializePayload */ "b"])(payload);
  } catch (error) {
    throw new Error("Could not JSON serialize the payload object.");
  }

  return "data-insights-method=\"".concat(method, "\" data-insights-payload=\"").concat(serializedPayload, "\"");
}
/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 */

function insights(method, payload) {
   false ? undefined : void 0;
  return writeDataAttributes({
    method: method,
    payload: payload
  });
}

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createInfiniteHitsSessionStorageCache; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(302);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(296);
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}



function getStateWithoutPage(state) {
  var _ref = state || {},
      page = _ref.page,
      rest = _objectWithoutProperties(_ref, ["page"]);

  return rest;
}

var KEY = 'ais.infiniteHits';
function createInfiniteHitsSessionStorageCache() {
  return {
    read: function read(_ref2) {
      var state = _ref2.state;
      var sessionStorage = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* safelyRunOnBrowser */ "a"])(function (_ref3) {
        var window = _ref3.window;
        return window.sessionStorage;
      });

      if (!sessionStorage) {
        return null;
      }

      try {
        var cache = JSON.parse( // @ts-expect-error JSON.parse() requires a string, but it actually accepts null, too.
        sessionStorage.getItem(KEY));
        return cache && Object(_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(cache.state, getStateWithoutPage(state)) ? cache.hits : null;
      } catch (error) {
        if (error instanceof SyntaxError) {
          try {
            sessionStorage.removeItem(KEY);
          } catch (err) {// do nothing
          }
        }

        return null;
      }
    },
    write: function write(_ref4) {
      var state = _ref4.state,
          hits = _ref4.hits;
      var sessionStorage = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* safelyRunOnBrowser */ "a"])(function (_ref5) {
        var window = _ref5.window;
        return window.sessionStorage;
      });

      if (!sessionStorage) {
        return;
      }

      try {
        sessionStorage.setItem(KEY, JSON.stringify({
          state: getStateWithoutPage(state),
          hits: hits
        }));
      } catch (error) {// do nothing
      }
    }
  };
}

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ANONYMOUS_TOKEN_COOKIE_KEY */
/* unused harmony export getInsightsAnonymousUserTokenInternal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getInsightsAnonymousUserToken; });

var ANONYMOUS_TOKEN_COOKIE_KEY = '_ALGOLIA';

function getCookie(name) {
  var prefix = "".concat(name, "=");
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];

    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(prefix) === 0) {
      return cookie.substring(prefix.length, cookie.length);
    }
  }

  return undefined;
}

function getInsightsAnonymousUserTokenInternal() {
  return getCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
}
/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 */

function getInsightsAnonymousUserToken() {
   false ? undefined : void 0;
  return getInsightsAnonymousUserTokenInternal();
}

/***/ })

};;
//# sourceMappingURL=blogs-buscador-infinito-blogs.js.map