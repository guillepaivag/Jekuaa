exports.ids = [19];
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

/***/ 416:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "videos/videoPresentacion.b631d49.mp4";

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/pantallaPresentacion.f238a7e.jpg";

/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/presentacion1.cd77e1b.jpg";

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/presentacion3.705d370.jpg";

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7aa60b4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(416);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7aa60b4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7aa60b4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7aa60b4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a7aa60b4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 440:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=a7aa60b4&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_vm._ssrNode("<section class=\"container presentacion\" data-v-a7aa60b4>","</section>",[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',{staticClass:"contenedor-i",attrs:{"cols":"12","md":"7"}},[_c('div',{staticClass:"main-i"},[_c('h1',{staticClass:"titulo"},[_vm._v("¡Bienvenido a Jekuaapy!")]),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('div',{staticClass:"mt-10 descripcion"},[_vm._v("\n                        Bienvenidos a Jekuaapy, una plataforma educativa para que \n                        aprendas sobre los temas y contenidos que te gusten, \n                        de manera rápida y divertida!\n                    ")]),_vm._v(" "),_c('div',{staticClass:"mt-5"},[_c('v-btn',{attrs:{"color":"#ff1d89","outlined":"","to":"/blogs"}},[_c('v-icon',{attrs:{"left":"","dark":""}},[_vm._v("\n                                mdi-alpha-j-box\n                            ")]),_vm._v("\n                            ¡Descubre más contenido!\n                        ")],1)],1)],1)]),_vm._v(" "),_c('v-col',{staticClass:"contenedor-d",attrs:{"cols":"12","md":"5"}},[_c('div',{staticClass:"main-d"},[_c('video',{attrs:{"src":__webpack_require__(435),"autoplay":"","loop":"","muted":"","type":"mp"},domProps:{"muted":true}}),_vm._v(" "),_c('img',{staticClass:"mask",attrs:{"src":__webpack_require__(436)}})])])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"container contenedor-descripciones\" data-v-a7aa60b4>","</div>",[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',{attrs:{"cols":"12","md":"7"}},[_c('v-img',{attrs:{"height":"270px","src":__webpack_require__(437)}})],1),_vm._v(" "),_c('v-col',{staticClass:"contenedor-descripcion",attrs:{"cols":"12","md":"5"}},[_c('div',{staticClass:"font-weight-bold contenedor-descripcion-titulo contenedor-descripcion-titulo-d"},[_vm._v("\n                    ¡Jekuaapy blogs!\n                ")]),_vm._v(" "),_c('div',{staticClass:"font-weight contenedor-descripcion-mensaje"},[_vm._v("\n                    ¡Puedes aprender sobre varios temas como programación, desarrollo web, linux y más en Jekuaapy blogs!\n                ")])])],1)],1),_vm._ssrNode(" "),_c('v-divider'),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"container contenedor-descripciones\" style=\"padding-bottom: 50px;\" data-v-a7aa60b4>","</div>",[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',{staticClass:"contenedor-descripcion",attrs:{"cols":"12","md":"5"}},[_c('div',{staticClass:"font-weight-bold contenedor-descripcion-titulo contenedor-descripcion-titulo-i"},[_vm._v("\n                    ¡Diversos temas!\n                ")]),_vm._v(" "),_c('div',{staticClass:"font-weight contenedor-descripcion-mensaje contenedor-descripcion-mensaje-i"},[_vm._v("\n                    En Jekuaapy existen secciones, que se dividen en:\n                ")])]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"7"}},[_c('v-expansion-panels',{attrs:{"focusable":""}},_vm._l((_vm.listaSecciones),function(seccion,i){return _c('v-expansion-panel',{key:i},[_c('v-expansion-panel-header',[_c('div',{staticStyle:{"font-size":"22px"}},[_vm._v("\n                            "+_vm._s(seccion.nombre)+"\n                        ")])]),_vm._v(" "),_c('v-expansion-panel-content',[_c('div',{staticClass:"mt-3",staticStyle:{"font-size":"18px"}},[_vm._v("\n                            "+_vm._s(seccion.descripcion)+"\n                        ")])])],1)}),1)],1)],1)],1),_vm._ssrNode(" "),_c('v-divider'),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"container contenedor-descripciones\" data-v-a7aa60b4>","</div>",[_c('v-row',{attrs:{"no-gutters":""}},[_c('v-col',{attrs:{"cols":"12","md":"7"}},[_c('v-img',{attrs:{"height":"270px","src":__webpack_require__(438)}})],1),_vm._v(" "),_c('v-col',{staticClass:"contenedor-descripcion",attrs:{"cols":"12","md":"5"}},[_c('div',{staticClass:"font-weight-bold contenedor-descripcion-titulo contenedor-descripcion-titulo-d"},[_vm._v("\n                    ¡Forma parte de la comunidad Jekuaapy!\n                ")]),_vm._v(" "),_c('div',{staticClass:"font-weight contenedor-descripcion-mensaje"},[_vm._v("\n                    Puedes create una cuenta gratis en Jekuaapy y comenzar con esta ¡aventura de conocimiento!\n                ")])])],1)],1),_vm._ssrNode(" "),_c('v-divider'),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"container mt-10 mb-10\" data-v-a7aa60b4>","</div>",[_vm._ssrNode("<div style=\"text-align: center;\" data-v-a7aa60b4>","</div>",[_vm._ssrNode("<h1 class=\"titulo\" data-v-a7aa60b4>Preguntas frecuentes</h1> "),_c('v-divider',{staticClass:"mb-7"})],2),_vm._ssrNode(" "),_c('v-expansion-panels',{attrs:{"focusable":""}},_vm._l((_vm.listaPreguntasFrecuentes),function(item,i){return _c('v-expansion-panel',{key:i},[_c('v-expansion-panel-header',[_c('div',{staticStyle:{"font-size":"22px"}},[_vm._v("\n                    "+_vm._s(item.nombre)+"\n                ")])]),_vm._v(" "),_c('v-expansion-panel-content',[_c('div',{staticClass:"mt-3",staticStyle:{"font-size":"18px"}},[_vm._v("\n                    "+_vm._s(item.descripcion)+"\n                ")])])],1)}),1)],2)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=a7aa60b4&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=script&lang=js&
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
/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_js_ = ({
  name: '',

  data() {
    return {
      listaSecciones: [{
        nombre: 'Informática',
        descripcion: 'Tienes alguna duda sobre un lenguaje de programación, comando, operadores, modelos de programación o aprender sobre algún algoritmo? En Jekuaapy lo tienes y ¡con códigos de ejemplo! 👩🏻‍💻'
      }, {
        nombre: 'Matemática',
        descripcion: '¿Deseas aprender cálculo, física, geometría, analítica y comprender todo lo relacionado a la matemática? Con Jekuaapy blogs puedes aprender! 🚀'
      }],
      listaPreguntasFrecuentes: [{
        nombre: '¿Qué es Jekuaapy?',
        descripcion: 'Jekuaapy es una plataforma de enseñanza de varios temas, ahora mismo la plataforma cuenta con blogs, vamos ir agregando y actualizando funcionalidades, cursos, retos y de esa forma ir formando a los futuros estudiantes de Jekuaapy y ¡divulgar información! 🌎'
      }]
    };
  }

});
// CONCATENATED MODULE: ./pages/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pagesvue_type_script_lang_js_ = (lib_vue_loader_options_pagesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(9);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(256);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/groupable/index.js
var groupable = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/registrable/index.js
var registrable = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VExpansionPanel/VExpansionPanel.js
// Mixins

 // Utilities



/* harmony default export */ var VExpansionPanel = (Object(mixins["a" /* default */])(Object(groupable["a" /* factory */])('expansionPanels', 'v-expansion-panel', 'v-expansion-panels'), Object(registrable["b" /* provide */])('expansionPanel', true)
/* @vue/component */
).extend({
  name: 'v-expansion-panel',
  props: {
    disabled: Boolean,
    readonly: Boolean
  },

  data() {
    return {
      content: null,
      header: null,
      nextIsActive: false
    };
  },

  computed: {
    classes() {
      return {
        'v-expansion-panel--active': this.isActive,
        'v-expansion-panel--next-active': this.nextIsActive,
        'v-expansion-panel--disabled': this.isDisabled,
        ...this.groupClasses
      };
    },

    isDisabled() {
      return this.expansionPanels.disabled || this.disabled;
    },

    isReadonly() {
      return this.expansionPanels.readonly || this.readonly;
    }

  },
  methods: {
    registerContent(vm) {
      this.content = vm;
    },

    unregisterContent() {
      this.content = null;
    },

    registerHeader(vm) {
      this.header = vm;
      vm.$on('click', this.onClick);
    },

    unregisterHeader() {
      this.header = null;
    },

    onClick(e) {
      if (e.detail) this.header.$el.blur();
      this.$emit('click', e);
      this.isReadonly || this.isDisabled || this.toggle();
    },

    toggle() {
      this.$nextTick(() => this.$emit('change'));
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-expansion-panel',
      class: this.classes,
      attrs: {
        'aria-expanded': String(this.isActive)
      }
    }, Object(helpers["p" /* getSlot */])(this));
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/transitions/index.js + 2 modules
var transitions = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/bootable/index.js
var bootable = __webpack_require__(58);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js
var colorable = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VExpansionPanel/VExpansionPanelContent.js
 // Mixins



 // Utilities



const baseMixins = Object(mixins["a" /* default */])(bootable["a" /* default */], colorable["a" /* default */], Object(registrable["a" /* inject */])('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel'));
/* @vue/component */

/* harmony default export */ var VExpansionPanelContent = (baseMixins.extend().extend({
  name: 'v-expansion-panel-content',
  data: () => ({
    isActive: false
  }),
  computed: {
    parentIsActive() {
      return this.expansionPanel.isActive;
    }

  },
  watch: {
    parentIsActive: {
      immediate: true,

      handler(val, oldVal) {
        if (val) this.isBooted = true;
        if (oldVal == null) this.isActive = val;else this.$nextTick(() => this.isActive = val);
      }

    }
  },

  created() {
    this.expansionPanel.registerContent(this);
  },

  beforeDestroy() {
    this.expansionPanel.unregisterContent();
  },

  render(h) {
    return h(transitions["a" /* VExpandTransition */], this.showLazyContent(() => [h('div', this.setBackgroundColor(this.color, {
      staticClass: 'v-expansion-panel-content',
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }), [h('div', {
      class: 'v-expansion-panel-content__wrap'
    }, Object(helpers["p" /* getSlot */])(this))])]));
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/index.js
var VIcon = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/directives/ripple/index.js
var ripple = __webpack_require__(25);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VExpansionPanel/VExpansionPanelHeader.js
// Components

 // Mixins


 // Directives

 // Utilities



const VExpansionPanelHeader_baseMixins = Object(mixins["a" /* default */])(colorable["a" /* default */], Object(registrable["a" /* inject */])('expansionPanel', 'v-expansion-panel-header', 'v-expansion-panel'));
/* harmony default export */ var VExpansionPanelHeader = (VExpansionPanelHeader_baseMixins.extend().extend({
  name: 'v-expansion-panel-header',
  directives: {
    ripple: ripple["a" /* default */]
  },
  props: {
    disableIconRotate: Boolean,
    expandIcon: {
      type: String,
      default: '$expand'
    },
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    }
  },
  data: () => ({
    hasMousedown: false
  }),
  computed: {
    classes() {
      return {
        'v-expansion-panel-header--active': this.isActive,
        'v-expansion-panel-header--mousedown': this.hasMousedown
      };
    },

    isActive() {
      return this.expansionPanel.isActive;
    },

    isDisabled() {
      return this.expansionPanel.isDisabled;
    },

    isReadonly() {
      return this.expansionPanel.isReadonly;
    }

  },

  created() {
    this.expansionPanel.registerHeader(this);
  },

  beforeDestroy() {
    this.expansionPanel.unregisterHeader();
  },

  methods: {
    onClick(e) {
      this.$emit('click', e);
    },

    genIcon() {
      const icon = Object(helpers["p" /* getSlot */])(this, 'actions') || [this.$createElement(VIcon["a" /* default */], this.expandIcon)];
      return this.$createElement(transitions["c" /* VFadeTransition */], [this.$createElement('div', {
        staticClass: 'v-expansion-panel-header__icon',
        class: {
          'v-expansion-panel-header__icon--disable-rotate': this.disableIconRotate
        },
        directives: [{
          name: 'show',
          value: !this.isDisabled
        }]
      }, icon)]);
    }

  },

  render(h) {
    return h('button', this.setBackgroundColor(this.color, {
      staticClass: 'v-expansion-panel-header',
      class: this.classes,
      attrs: {
        tabindex: this.isDisabled ? -1 : null,
        type: 'button',
        'aria-expanded': this.isActive
      },
      directives: [{
        name: 'ripple',
        value: this.ripple
      }],
      on: { ...this.$listeners,
        click: this.onClick,
        mousedown: () => this.hasMousedown = true,
        mouseup: () => this.hasMousedown = false
      }
    }), [Object(helpers["p" /* getSlot */])(this, 'default', {
      open: this.isActive
    }, true), this.hideActions || this.genIcon()]);
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VExpansionPanel/VExpansionPanel.sass
var VExpansionPanel_VExpansionPanel = __webpack_require__(440);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VItemGroup/VItemGroup.js
var VItemGroup = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/console.js
var console = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VExpansionPanel/VExpansionPanels.js
// Styles
 // Components

 // Utilities


/* @vue/component */

/* harmony default export */ var VExpansionPanels = (VItemGroup["a" /* BaseItemGroup */].extend({
  name: 'v-expansion-panels',

  provide() {
    return {
      expansionPanels: this
    };
  },

  props: {
    accordion: Boolean,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean,
    readonly: Boolean,
    tile: Boolean
  },
  computed: {
    classes() {
      return { ...VItemGroup["a" /* BaseItemGroup */].options.computed.classes.call(this),
        'v-expansion-panels': true,
        'v-expansion-panels--accordion': this.accordion,
        'v-expansion-panels--flat': this.flat,
        'v-expansion-panels--hover': this.hover,
        'v-expansion-panels--focusable': this.focusable,
        'v-expansion-panels--inset': this.inset,
        'v-expansion-panels--popout': this.popout,
        'v-expansion-panels--tile': this.tile
      };
    }

  },

  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('expand')) {
      Object(console["a" /* breaking */])('expand', 'multiple', this);
    }
    /* istanbul ignore next */


    if (Array.isArray(this.value) && this.value.length > 0 && typeof this.value[0] === 'boolean') {
      Object(console["a" /* breaking */])(':value="[true, false, true]"', ':value="[0, 2]"', this);
    }
  },

  methods: {
    updateItem(item, index) {
      const value = this.getValue(item, index);
      const nextValue = this.getValue(item, index + 1);
      item.isActive = this.toggleMethod(value);
      item.nextIsActive = this.toggleMethod(nextValue);
    }

  }
}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon_VIcon = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(257);

// CONCATENATED MODULE: ./pages/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(439)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pagesvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "a7aa60b4",
  "7c3ed795"
  
)

/* harmony default export */ var pages = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */











installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCol: VCol["a" /* default */],VDivider: VDivider["a" /* default */],VExpansionPanel: VExpansionPanel,VExpansionPanelContent: VExpansionPanelContent,VExpansionPanelHeader: VExpansionPanelHeader,VExpansionPanels: VExpansionPanels,VIcon: VIcon_VIcon["a" /* default */],VImg: VImg["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=index.js.map