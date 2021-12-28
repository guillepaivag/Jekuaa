exports.ids = [18];
exports.modules = {

/***/ 248:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(177);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(178);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(179);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(180);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(181);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(182);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(183);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(184);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(185);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(186);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(187);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(188);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(189);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(248);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(28);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(0);
















 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();

const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['offset' + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_16__[/* upperFirst */ "z"])(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['order' + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_16__[/* upperFirst */ "z"])(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};

function breakpointClass(type, prop, val) {
  let className = type;

  if (val == null || val === false) {
    return undefined;
  }

  if (prop) {
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  } // .order-md-6


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_14___default.a.extend({
  name: 'v-col',
  functional: true,
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: str => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str)
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  render(h, {
    props,
    data,
    children,
    parent
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `col`, `offset`, `order` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      const hasColClasses = classList.some(className => className.startsWith('col-'));
      classList.push({
        // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
        col: !hasColClasses || !props.cols,
        [`col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(data, {
      class: classList
    }), children);
  }

}));

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(177);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(178);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(179);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(180);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(181);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(182);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(183);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(184);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(185);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(186);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(187);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(188);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(189);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(248);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(28);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(0);
















 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];
const ALIGNMENT = ['start', 'end', 'center'];

function makeProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    props[prefix + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_16__[/* upperFirst */ "z"])(val)] = def();
    return props;
  }, {});
}

const alignValidator = str => [...ALIGNMENT, 'baseline', 'stretch'].includes(str);

const alignProps = makeProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator
}));

const justifyValidator = str => [...ALIGNMENT, 'space-between', 'space-around'].includes(str);

const justifyProps = makeProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));

const alignContentValidator = str => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str);

const alignContentProps = makeProps('alignContent', () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: 'align',
  justify: 'justify',
  alignContent: 'align-content'
};

function breakpointClass(type, prop, val) {
  let className = classMap[type];

  if (val == null) {
    return undefined;
  }

  if (prop) {
    // alignSm -> Sm
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // .align-items-sm-center


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_14___default.a.extend({
  name: 'v-row',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps
  },

  render(h, {
    props,
    data,
    children
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `align`, `justify`, `alignContent` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      classList.push({
        'no-gutters': props.noGutters,
        'row--dense': props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(data, {
      staticClass: 'row',
      class: classList
    }), children);
  }

}));

/***/ }),

/***/ 354:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/portada-usuario.899fd65.jpg";

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VParallax/VParallax.sass
var VParallax = __webpack_require__(354);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(1);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/translatable/index.js

/* harmony default export */ var translatable = (external_vue_default.a.extend({
  name: 'translatable',
  props: {
    height: Number
  },
  data: () => ({
    elOffsetTop: 0,
    parallax: 0,
    parallaxDist: 0,
    percentScrolled: 0,
    scrollTop: 0,
    windowHeight: 0,
    windowBottom: 0
  }),
  computed: {
    imgHeight() {
      return this.objHeight();
    }

  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.translate, false);
    window.removeEventListener('resize', this.translate, false);
  },

  methods: {
    calcDimensions() {
      const offset = this.$el.getBoundingClientRect();
      this.scrollTop = window.pageYOffset;
      this.parallaxDist = this.imgHeight - this.height;
      this.elOffsetTop = offset.top + this.scrollTop;
      this.windowHeight = window.innerHeight;
      this.windowBottom = this.scrollTop + this.windowHeight;
    },

    listeners() {
      window.addEventListener('scroll', this.translate, false);
      window.addEventListener('resize', this.translate, false);
    },

    /** @abstract **/
    objHeight() {
      throw new Error('Not implemented !');
    },

    translate() {
      this.calcDimensions();
      this.percentScrolled = (this.windowBottom - this.elOffsetTop) / (parseInt(this.height) + this.windowHeight);
      this.parallax = Math.round(this.parallaxDist * this.percentScrolled);
    }

  }
}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VParallax/VParallax.js
// Style
 // Mixins



const baseMixins = Object(mixins["a" /* default */])(translatable);
/* @vue/component */

/* harmony default export */ var VParallax_VParallax = __webpack_exports__["a"] = (baseMixins.extend().extend({
  name: 'v-parallax',
  props: {
    alt: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: 500
    },
    src: String,
    srcset: String
  },
  data: () => ({
    isBooted: false
  }),
  computed: {
    styles() {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: `translate(-50%, ${this.parallax}px)`
      };
    }

  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const img = this.$refs.img;
      if (!img) return;

      if (img.complete) {
        this.translate();
        this.listeners();
      } else {
        img.addEventListener('load', () => {
          this.translate();
          this.listeners();
        }, false);
      }

      this.isBooted = true;
    },

    objHeight() {
      return this.$refs.img.naturalHeight;
    }

  },

  render(h) {
    const imgData = {
      staticClass: 'v-parallax__image',
      style: this.styles,
      attrs: {
        src: this.src,
        srcset: this.srcset,
        alt: this.alt
      },
      ref: 'img'
    };
    const container = h('div', {
      staticClass: 'v-parallax__image-container'
    }, [h('img', imgData)]);
    const content = h('div', {
      staticClass: 'v-parallax__content'
    }, this.$slots.default);
    return h('div', {
      staticClass: 'v-parallax',
      style: {
        height: `${this.height}px`
      },
      on: this.$listeners
    }, [container, content]);
  }

}));

/***/ }),

/***/ 414:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nombreUsuario_vue_vue_type_style_index_0_id_6def1cc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(414);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nombreUsuario_vue_vue_type_style_index_0_id_6def1cc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nombreUsuario_vue_vue_type_style_index_0_id_6def1cc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nombreUsuario_vue_vue_type_style_index_0_id_6def1cc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_nombreUsuario_vue_vue_type_style_index_0_id_6def1cc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 433:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/estudiante/_nombreUsuario.vue?vue&type=template&id=6def1cc9&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[(_vm.existeUsuario)?_vm._ssrNode("<div data-v-6def1cc9>","</div>",[_c('v-parallax',{attrs:{"dark":"","src":__webpack_require__(373),"height":"300"}},[_c('v-row',{attrs:{"align":"center","justify":"center"}},[_c('v-col',{staticClass:"text-center",attrs:{"cols":"12"}},[_c('v-avatar',{staticClass:"mb-10",attrs:{"color":"#683bce","size":"150"}},[(!!_vm.authUsuario.photoURL)?_c('v-img',{attrs:{"src":_vm.authUsuario.photoURL}}):_c('span',{staticClass:"white--text headline inicialNombreUsuario"},[_vm._v("\n                            "+_vm._s(_vm.inicialNombreUsuario)+"\n                        ")])],1),_vm._v(" "),_c('h4',{staticClass:"subheading"},[_vm._v("\n                        "+_vm._s(_vm.datosUsuario.nombreCompleto)+"\n                    ")])],1)],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"container\" data-v-6def1cc9>","</div>",[_c('v-row',{staticClass:"mt-2",attrs:{"no-gutters":""}},[_c('v-col',{attrs:{"cols":"12","md":"7"}},[_c('v-card',{staticClass:"componente componente-i cardInformacion"},[_c('h3',[_c('strong',[_vm._v(_vm._s(_vm.informacionUsuario.rolDescriptivo))])]),_vm._v(" "),_c('v-divider',{staticClass:"mt-3 mb-3"}),_vm._v(" "),_c('p',[_c('strong',[_vm._v("Nombre usuario:")]),_vm._v(" "+_vm._s(_vm.datosUsuario.nombreUsuario))]),_vm._v(" "),(_vm.datosUsuario.nombreCompleto)?_c('p',[_c('strong',[_vm._v("Nombre completo:")]),_vm._v(" "+_vm._s(_vm.datosUsuario.nombreCompleto))]):_vm._e(),_vm._v(" "),(_vm.datosUsuario.fechaNacimiento)?_c('p',[_c('strong',[_vm._v("Fecha de nacimiento:")]),_vm._v(" "+_vm._s(_vm.fechaNacimientoString))]):_vm._e(),_vm._v(" "),_c('p',[_c('strong',[_vm._v("Comenzó en Jekuaapy:")]),_vm._v(" "+_vm._s(_vm.authUsuario.metadata.creationTime))]),_vm._v(" "),_c('p',[_c('strong',[_vm._v("Ultima vez:")]),_vm._v(" "+_vm._s(_vm.authUsuario.metadata.lastSignInTime))]),_vm._v(" "),(_vm.datosUsuario.instructor)?_c('p',[_c('v-icon',{staticClass:"align--center mr-1 mb-3",attrs:{"size":"35px","color":"#683bce"}},[_vm._v("\n                                mdi-theater\n                            ")]),_vm._v("\n                            Soy instructor de Jekuaapy\n                        ")],1):_vm._e()],1)],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"5"}},[(_vm.informacionUsuario.redesSociales.length)?_c('div',{staticClass:"componente componente-d"},_vm._l((_vm.informacionUsuario.redesSociales),function(redSocial,index){return _c('div',{key:index},[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-icon',{staticClass:"align--center ml-2 mr-2 mb-3",attrs:{"size":"40px","color":"#683bce"}},[_vm._v(_vm._s(_vm.getRedSocialPorCodigo(redSocial.redSocial).icon))]),_vm._v(" "),_c('v-text-field',{attrs:{"readonly":"","value":redSocial.urlPerfil,"label":_vm.getRedSocialPorCodigo(redSocial.redSocial).texto}})],1)],1)}),0):_vm._e()])],1)],1),_vm._ssrNode(" "),_c('v-divider'),_vm._ssrNode(" "),(_vm.informacionUsuario.descripcion)?_vm._ssrNode("<div class=\"container mt-4 mb-4\" data-v-6def1cc9>","</div>",[_vm._ssrNode("<h2 class=\"subtitulos\" data-v-6def1cc9> ¡Me presento! </h2> "),_c('v-divider',{staticClass:"mt-3 mb-3"}),_vm._ssrNode(" <p data-v-6def1cc9>"+(_vm._s(_vm.toHTML(_vm.informacionUsuario.descripcion)))+"</p>")],2):_vm._e(),_vm._ssrNode(" "),_c('v-divider'),_vm._ssrNode(" "),(_vm.informacionUsuario.especializaciones || _vm.informacionUsuario.intereses)?_vm._ssrNode("<div class=\"container\" data-v-6def1cc9>","</div>",[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',{attrs:{"cols":"12","md":"6"}},[_c('div',{staticClass:"componente componente-i"},[_c('div',[(_vm.informacionUsuario.especializaciones)?_c('h2',{staticClass:"subtitulos"},[_vm._v(" ¡Mis especializaciones! ")]):_vm._e(),_vm._v(" "),_c('v-divider',{staticClass:"mt-3 mb-3"}),_vm._v(" "),_c('p',{domProps:{"innerHTML":_vm._s(_vm.toHTML(_vm.informacionUsuario.especializaciones))}})],1),_vm._v(" "),(_vm.ultimosBlogs.length)?_c('div',{staticClass:"mt-15"},[(_vm.informacionUsuario.intereses)?_c('h2',{staticClass:"subtitulos"},[_vm._v(" ¡Mis intereses! ")]):_vm._e(),_vm._v(" "),_c('v-divider',{staticClass:"mt-3 mb-3"}),_vm._v(" "),_c('p',{domProps:{"innerHTML":_vm._s(_vm.toHTML(_vm.informacionUsuario.intereses))}})],1):_vm._e()])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"6"}},[(_vm.ultimosBlogs.length)?_c('div',{staticClass:"componente componente-d"},[_c('h2',{staticClass:"subtitulos"},[_vm._v(" ¡Ultimos blogs! ")]),_vm._v(" "),_c('v-divider',{staticClass:"mt-3 mb-3"}),_vm._v(" "),_c('v-timeline',{attrs:{"reverse":true,"dense":_vm.$vuetify.breakpoint.smAndDown}},_vm._l((_vm.ultimosBlogs),function(blog,index){return _c('v-timeline-item',{key:index,attrs:{"color":"#683bce"}},[_c('span',{attrs:{"slot":"opposite"},slot:"opposite"},[_c('nuxt-link',{staticClass:"titulo-link",attrs:{"to":("/blog/" + (blog.referencia))}},[_vm._v("\n                                        "+_vm._s(_vm.mostrarFechaCreacionBlog(blog.fechaCreacion))+"\n                                    ")])],1),_vm._v(" "),_c('v-card',{staticClass:"elevation-2"},[_c('v-card-title',{staticClass:"text-h6 v-card-title-color"},[_c('nuxt-link',{staticClass:"titulo-link",attrs:{"to":("/blog/" + (blog.referencia))}},[_vm._v("\n                                            "+_vm._s(_vm.mostrarTituloBlog(blog.titulo))+"\n                                        ")])],1),_vm._v(" "),_c('v-card-text',[_vm._v("\n                                        "+_vm._s(_vm.mostrarDescripcionBlog(blog.descripcion))+"\n                                    ")])],1)],1)}),1)],1):_c('div',{staticClass:"componente componente-d"},[_c('div',{},[_c('h2',{staticClass:"subtitulos"},[_vm._v(" ¡Mis intereses! ")]),_vm._v(" "),_c('v-divider',{staticClass:"mt-3 mb-3"}),_vm._v(" "),_c('p',{domProps:{"innerHTML":_vm._s(_vm.toHTML(_vm.informacionUsuario.intereses))}})],1)])])],1)],1):_vm._e()],2):_vm._ssrNode(("<div class=\"container\" data-v-6def1cc9>\n        No existe el usuario :(\n    </div>"))])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/estudiante/_nombreUsuario.vue?vue&type=template&id=6def1cc9&scoped=true&

// EXTERNAL MODULE: external "showdown"
var external_showdown_ = __webpack_require__(199);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/estudiante/_nombreUsuario.vue?vue&type=script&lang=js&
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

/* harmony default export */ var _nombreUsuariovue_type_script_lang_js_ = ({
  data() {
    return {
      listaRedesSociales: [{
        icon: 'mdi-github',
        texto: 'GitHub',
        codigo: 'github'
      }, {
        icon: 'mdi-instagram',
        texto: 'Instagram',
        codigo: 'instagram'
      }, {
        icon: 'mdi-facebook',
        texto: 'Facebook',
        codigo: 'facebook'
      }, {
        icon: 'mdi-twitter',
        texto: 'Twitter',
        codigo: 'twitter'
      }, {
        icon: 'mdi-twitch',
        texto: 'Twitch',
        codigo: 'twitch'
      }, {
        icon: 'mdi-linkedin',
        texto: 'LinkedIn',
        codigo: 'linkedin'
      }, {
        icon: 'mdi-web',
        texto: 'Mi sitio web',
        codigo: 'web'
      }]
    };
  },

  methods: {
    getRedSocialPorCodigo(codigo) {
      return this.listaRedesSociales.find(x => x.codigo === codigo);
    },

    toHTML(texto) {
      var find = '\\n';
      var re = new RegExp(find, 'g');
      return texto.replace(re, '<br>');
    },

    mostrarTituloBlog(texto) {
      let MAX = 20;
      if (texto.length > MAX) return texto.substr(0, MAX) + '...';
      return texto;
    },

    mostrarDescripcionBlog(texto) {
      let MAX = 70;
      if (texto.length > MAX) return texto.substr(0, MAX) + '...';
      return texto;
    },

    mostrarFechaCreacionBlog(timestapm) {
      const fecha = new Date(timestapm._seconds * 1000);
      return new Date(fecha.getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
    }

  },
  computed: {
    inicialNombreUsuario() {
      return this.datosUsuario && this.datosUsuario.nombreUsuario ? this.datosUsuario.nombreUsuario[0].toUpperCase() : '';
    },

    fechaNacimientoString() {
      if (!this.datosUsuario.fechaNacimiento) return '';
      const fecha = new Date(this.datosUsuario.fechaNacimiento._seconds * 1000);
      return new Date(fecha.getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
    }

  },

  async asyncData({
    isDev,
    route,
    $axios,
    $firebase,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    // Variables 
    let datosUsuario = null;
    let authUsuario = null;
    let informacionUsuario = null;
    let ultimosBlogs = null;
    let existeUsuario = true;
    const db = $firebase.firestore();
    const nombreUsuario = params.nombreUsuario;

    try {
      let body = {
        nombreUsuario
      };
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }; // Obtener datos de usuario

      let response = {};
      response.datosUsuario = await $axios.$post(`/usuarios/estudiante/datosUsuario`, body, config);
      response.authUsuario = await $axios.$post(`/usuarios/estudiante/authUsuario`, body, config);
      response.informacionUsuario = await $axios.$post(`/usuarios/estudiante/informacionUsuario`, body, config);
      response.ultimosBlogs = await $axios.$get(`/blog/estudiante/ultimosBlogsPorPublicador/${response.datosUsuario.resultado.uid}`, body, config);
      datosUsuario = response.datosUsuario.resultado;
      authUsuario = response.authUsuario.resultado;
      informacionUsuario = response.informacionUsuario.resultado;
      ultimosBlogs = response.ultimosBlogs.resultado;
    } catch (error) {
      console.log('error - perfil usuario', error);
      const accion = await store.dispatch('modules/sistema/errorHandler', error);
      existeUsuario = false;
    }

    return {
      datosUsuario,
      authUsuario,
      informacionUsuario,
      ultimosBlogs,
      existeUsuario
    };
  }

});
// CONCATENATED MODULE: ./pages/estudiante/_nombreUsuario.vue?vue&type=script&lang=js&
 /* harmony default export */ var estudiante_nombreUsuariovue_type_script_lang_js_ = (_nombreUsuariovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(9);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VAvatar/VAvatar.js
var VAvatar = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(256);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VParallax/VParallax.js + 1 modules
var VParallax = __webpack_require__(401);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(257);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.js + 3 modules
var VTextField = __webpack_require__(196);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VTimeline/VTimeline.sass
var VTimeline = __webpack_require__(433);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/themeable/index.js
var themeable = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VTimeline/VTimeline.js
// Styles

 // Mixins


/* harmony default export */ var VTimeline_VTimeline = (Object(mixins["a" /* default */])(themeable["a" /* default */]
/* @vue/component */
).extend({
  name: 'v-timeline',

  provide() {
    return {
      timeline: this
    };
  },

  props: {
    alignTop: Boolean,
    dense: Boolean,
    reverse: Boolean
  },
  computed: {
    classes() {
      return {
        'v-timeline--align-top': this.alignTop,
        'v-timeline--dense': this.dense,
        'v-timeline--reverse': this.reverse,
        ...this.themeClasses
      };
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-timeline',
      class: this.classes
    }, this.$slots.default);
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/index.js
var components_VIcon = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js
var colorable = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VTimeline/VTimelineItem.js
// Types

 // Mixins



const baseMixins = Object(mixins["a" /* default */])(colorable["a" /* default */], themeable["a" /* default */]
/* @vue/component */
);
/* harmony default export */ var VTimelineItem = (baseMixins.extend().extend({
  name: 'v-timeline-item',
  inject: ['timeline'],
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    fillDot: Boolean,
    hideDot: Boolean,
    icon: String,
    iconColor: String,
    large: Boolean,
    left: Boolean,
    right: Boolean,
    small: Boolean
  },
  computed: {
    hasIcon() {
      return !!this.icon || !!this.$slots.icon;
    }

  },
  methods: {
    genBody() {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__body'
      }, this.$slots.default);
    },

    genIcon() {
      if (this.$slots.icon) {
        return this.$slots.icon;
      }

      return this.$createElement(components_VIcon["a" /* default */], {
        props: {
          color: this.iconColor,
          dark: !this.theme.isDark,
          small: this.small
        }
      }, this.icon);
    },

    genInnerDot() {
      const data = this.setBackgroundColor(this.color);
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__inner-dot',
        ...data
      }, [this.hasIcon && this.genIcon()]);
    },

    genDot() {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__dot',
        class: {
          'v-timeline-item__dot--small': this.small,
          'v-timeline-item__dot--large': this.large
        }
      }, [this.genInnerDot()]);
    },

    genDivider() {
      const children = [];
      if (!this.hideDot) children.push(this.genDot());
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__divider'
      }, children);
    },

    genOpposite() {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__opposite'
      }, this.$slots.opposite);
    }

  },

  render(h) {
    const children = [this.genBody(), this.genDivider()];
    if (this.$slots.opposite) children.push(this.genOpposite());
    return h('div', {
      staticClass: 'v-timeline-item',
      class: {
        'v-timeline-item--fill-dot': this.fillDot,
        'v-timeline-item--before': this.timeline.reverse ? this.right : this.left,
        'v-timeline-item--after': this.timeline.reverse ? this.left : this.right,
        ...this.themeClasses
      }
    }, children);
  }

}));
// CONCATENATED MODULE: ./pages/estudiante/_nombreUsuario.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(432)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  estudiante_nombreUsuariovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "6def1cc9",
  "7a6578b3"
  
)

/* harmony default export */ var _nombreUsuario = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */














installComponents_default()(component, {VAvatar: VAvatar["a" /* default */],VCard: VCard["a" /* default */],VCardText: components_VCard["c" /* VCardText */],VCardTitle: components_VCard["d" /* VCardTitle */],VCol: VCol["a" /* default */],VDivider: VDivider["a" /* default */],VIcon: VIcon["a" /* default */],VImg: VImg["a" /* default */],VParallax: VParallax["a" /* default */],VRow: VRow["a" /* default */],VTextField: VTextField["a" /* default */],VTimeline: VTimeline_VTimeline,VTimelineItem: VTimelineItem})


/***/ })

};;
//# sourceMappingURL=_nombreUsuario.js.map