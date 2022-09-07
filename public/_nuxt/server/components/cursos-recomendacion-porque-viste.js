exports.ids = [27];
exports.modules = {

/***/ 523:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"horizontal_slider": "fP8CjXF6YaqWcWhgvdIDQg==",
	"slider_container": "sdaggdVyOYjze+DqqD202g==",
	"item": "_3mBE7MbJv6mGC2hJvp0vUw=="
};


/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorqueViste_vue_vue_type_style_index_0_id_770b9ba5_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(523);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorqueViste_vue_vue_type_style_index_0_id_770b9ba5_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorqueViste_vue_vue_type_style_index_0_id_770b9ba5_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorqueViste_vue_vue_type_style_index_0_id_770b9ba5_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorqueViste_vue_vue_type_style_index_0_id_770b9ba5_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(65);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos/RecomendacionPorqueViste.vue?vue&type=template&id=770b9ba5&scoped=true&


var RecomendacionPorqueVistevue_type_template_id_770b9ba5_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm.datosCurso ? _c('div', [_vm._ssrNode("<h2 class=\"mb-3\" data-v-770b9ba5>Porque viste <b style=\"color: #ff1d89;\" data-v-770b9ba5>" + _vm._ssrEscape(_vm._s(_vm.datosCurso.titulo)) + "</b></h2> "), _vm._ssrNode("<div class=\"horizontal_slider\" data-v-770b9ba5>", "</div>", [_vm._ssrNode("<div class=\"slider_container\" data-v-770b9ba5>", "</div>", _vm._l(_vm.cursosRecomendados, function (curso, index) {
    return _vm._ssrNode("<div class=\"item\" data-v-770b9ba5>", "</div>", [_c(VImg["a" /* default */], {
      attrs: {
        "width": "350",
        "src": curso.fotoPerfil
      }
    })], 1);
  }), 0)])], 2) : _vm._e();
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/cursos/RecomendacionPorqueViste.vue?vue&type=template&id=770b9ba5&scoped=true&

// EXTERNAL MODULE: ./plugins/firebase.js + 6 modules
var firebase = __webpack_require__(32);

// EXTERNAL MODULE: external "@algolia/recommend"
var recommend_ = __webpack_require__(243);
var recommend_default = /*#__PURE__*/__webpack_require__.n(recommend_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos/RecomendacionPorqueViste.vue?vue&type=script&lang=js&


const db = firebase["b" /* fb */].firestore();
const recommendClient = recommend_default()('RNRNTDZS3N', 'af4d4e9d36a7ceb75e258007c3ceccf2');
const indexName =  true ? 'prod_cursos_publicado' : undefined;
/* harmony default export */ var RecomendacionPorqueVistevue_type_script_lang_js_ = ({
  name: '',

  data() {
    return {
      datosCurso: null,
      cursosRecomendados: []
    };
  },

  props: {
    uidCurso: {
      type: String,
      require: true
    }
  },
  methods: {},

  async created() {
    const doc = await db.collection('CursosPublicado').doc(this.uidCurso).get();
    this.datosCurso = doc.data();
    const data = await recommendClient.getRelatedProducts([{
      indexName,
      objectID: this.uidCurso,
      maxRecommendations: 12
    }]);
    this.cursosRecomendados = data.results[0].hits;
  }

});
// CONCATENATED MODULE: ./components/cursos/RecomendacionPorqueViste.vue?vue&type=script&lang=js&
 /* harmony default export */ var cursos_RecomendacionPorqueVistevue_type_script_lang_js_ = (RecomendacionPorqueVistevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/cursos/RecomendacionPorqueViste.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(613)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  cursos_RecomendacionPorqueVistevue_type_script_lang_js_,
  RecomendacionPorqueVistevue_type_template_id_770b9ba5_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "770b9ba5",
  "f36dcc56"
  
)

/* harmony default export */ var RecomendacionPorqueViste = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=cursos-recomendacion-porque-viste.js.map