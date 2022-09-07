exports.ids = [9];
exports.modules = {

/***/ 422:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"horizontal_slider": "jsbPKXMXe8FutprLKcxhEA==",
	"slider_container": "bbOdDo2Y-GPlqoBek43Yfg==",
	"item": "_4rZt82FKGde-a6EFBlpj-Q==",
	"styleTitulo": "HUhrZiP16A8+tYBWanzEmQ==",
	"porqueVisteTitulo": "_3TlheV8IejojJpNfiXcUcQ=="
};


/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSimilitud_vue_vue_type_style_index_0_id_32c91ba0_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(422);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSimilitud_vue_vue_type_style_index_0_id_32c91ba0_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSimilitud_vue_vue_type_style_index_0_id_32c91ba0_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSimilitud_vue_vue_type_style_index_0_id_32c91ba0_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSimilitud_vue_vue_type_style_index_0_id_32c91ba0_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(65);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/RecomendacionPorSimilitud.vue?vue&type=template&id=32c91ba0&scoped=true&



var RecomendacionPorSimilitudvue_type_template_id_32c91ba0_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_vm._ssrNode("<div class=\"mb-3\" data-v-32c91ba0>", "</div>", [_vm._ssrNode("<h2 data-v-32c91ba0>", "</h2>", [_vm._ssrNode("\n            Blogs similares a \n            "), _vm.datosBlog ? _c('nuxt-link', {
    staticClass: "porqueVisteTitulo",
    attrs: {
      "to": `/blog/${_vm.datosBlog.referencia}`
    }
  }, [_vm._v("\n                " + _vm._s(_vm.datosBlog.titulo) + "\n            ")]) : _vm._e()], 2)]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"horizontal_slider\" data-v-32c91ba0>", "</div>", [_vm._ssrNode("<div class=\"slider_container\" data-v-32c91ba0>", "</div>", _vm._l(_vm.blogsRecomendados, function (blog, index) {
    return _c(VCard["a" /* default */], {
      key: index,
      staticClass: "item pl-4 pt-7 white--text",
      attrs: {
        "to": `/blog/${blog.referencia}`
      }
    }, [_c(VImg["a" /* default */], {
      staticStyle: {
        "display": "inline-block",
        "margin-bottom": "-12px"
      },
      attrs: {
        "height": "35",
        "max-width": "35",
        "src": __webpack_require__(122)
      }
    }), _vm._v(" "), _c('h2', {
      staticClass: "styleTitulo ml-2",
      staticStyle: {
        "display": "inline-block"
      },
      attrs: {
        "title": blog.titulo
      }
    }, [_vm._v("\n                    " + _vm._s(_vm.getTitulo(blog.titulo)) + "\n                ")])], 1);
  }), 1)])], 2);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/blogs/RecomendacionPorSimilitud.vue?vue&type=template&id=32c91ba0&scoped=true&

// EXTERNAL MODULE: ./plugins/firebase.js + 6 modules
var firebase = __webpack_require__(32);

// EXTERNAL MODULE: external "@algolia/recommend"
var recommend_ = __webpack_require__(243);
var recommend_default = /*#__PURE__*/__webpack_require__.n(recommend_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/RecomendacionPorSimilitud.vue?vue&type=script&lang=js&


const db = firebase["b" /* fb */].firestore();
const recommendClient = recommend_default()('RNRNTDZS3N', 'af4d4e9d36a7ceb75e258007c3ceccf2');
const indexName =  true ? 'prod_blogs' : undefined;
/* harmony default export */ var RecomendacionPorSimilitudvue_type_script_lang_js_ = ({
  name: '',

  data() {
    return {
      datosBlog: null,
      blogsRecomendados: []
    };
  },

  props: {
    uidBlog: {
      type: String,
      require: true
    }
  },
  methods: {
    getTitulo(titulo) {
      const maxLength = 35;

      if (titulo.length > maxLength) {
        return titulo.substring(0, maxLength) + '...';
      }

      return titulo;
    }

  },

  async created() {
    const doc = await db.collection('Blogs').doc(this.uidBlog).get();
    this.datosBlog = doc.data();
    const data = await recommendClient.getRelatedProducts([{
      indexName,
      objectID: this.uidBlog,
      maxRecommendations: 12
    }]);
    this.blogsRecomendados = data.results[0].hits;
  }

});
// CONCATENATED MODULE: ./components/blogs/RecomendacionPorSimilitud.vue?vue&type=script&lang=js&
 /* harmony default export */ var blogs_RecomendacionPorSimilitudvue_type_script_lang_js_ = (RecomendacionPorSimilitudvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/blogs/RecomendacionPorSimilitud.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(466)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  blogs_RecomendacionPorSimilitudvue_type_script_lang_js_,
  RecomendacionPorSimilitudvue_type_template_id_32c91ba0_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "32c91ba0",
  "d1fc3896"
  
)

/* harmony default export */ var RecomendacionPorSimilitud = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=blogs-recomendacion-por-similitud.js.map