exports.ids = [14];
exports.modules = {

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(URL) {/* harmony default export */ __webpack_exports__["a"] = ({
  name: '',

  data() {
    return {
      file: null,
      urlVideo: ''
    };
  },

  components: {},
  props: {
    uidCurso: String,
    uidUnidad: String,
    uidClase: String
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },

    onFileChange(fieldName, files) {
      this.file = files[0];
      this.urlVideo = URL.createObjectURL(this.file);
    },

    sendVideo() {
      this.$emit('sendVideo', {
        uidCurso: this.uidCurso,
        uidUnidad: this.uidUnidad,
        uidClase: this.uidClase,
        file: this.file,
        urlVideo: this.urlVideo
      });
    }

  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(244)["URL"]))

/***/ }),

/***/ 355:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"contenedor_contenido_video": "ld2CInc5mKNC6d7-7JASFg==",
	"texto_sin_video": "Vo2WnNaoi7y8J-6pKZa9lA=="
};


/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorVideoClase_vue_vue_type_style_index_0_id_712056bb_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(355);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorVideoClase_vue_vue_type_style_index_0_id_712056bb_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorVideoClase_vue_vue_type_style_index_0_id_712056bb_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorVideoClase_vue_vue_type_style_index_0_id_712056bb_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorVideoClase_vue_vue_type_style_index_0_id_712056bb_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(51);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos-borrador/miembro/GeneradorVideoClase.vue?vue&type=template&id=712056bb&scoped=true&


var GeneradorVideoClasevue_type_template_id_712056bb_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "text-center"
  }, [_vm._ssrNode("<input type=\"file\" data-v-712056bb> <div class=\"my-7 contenedor_contenido_video\" data-v-712056bb>" + (_vm.file && _vm.urlVideo ? "<video controls=\"controls\" poster preload=\"auto\" data-setup=\"{}\" controlslist=\"nodownload\"" + _vm._ssrAttr("src", _vm.urlVideo) + " data-v-712056bb><p data-v-712056bb>\n                To view this video please enable JavaScript, and consider upgrading to a\n                web browser that supports HTML5 video\n            </p></video>" : "<div data-v-712056bb><p class=\"texto_sin_video\" data-v-712056bb>\n                Nos falta un video para continuar :c\n            </p></div>") + "</div> "), _c(VBtn["a" /* default */], {
    attrs: {
      "disabled": !_vm.file,
      "color": "primary",
      "text": ""
    },
    on: {
      "click": _vm.sendVideo
    }
  }, [_vm._v("\n        Subir video\n    ")])], 2);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/cursos-borrador/miembro/GeneradorVideoClase.vue?vue&type=template&id=712056bb&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos-borrador/miembro/GeneradorVideoClase.vue?vue&type=script&lang=js&
var GeneradorVideoClasevue_type_script_lang_js_ = __webpack_require__(324);

// CONCATENATED MODULE: ./components/cursos-borrador/miembro/GeneradorVideoClase.vue?vue&type=script&lang=js&
 /* harmony default export */ var miembro_GeneradorVideoClasevue_type_script_lang_js_ = (GeneradorVideoClasevue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/cursos-borrador/miembro/GeneradorVideoClase.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(399)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  miembro_GeneradorVideoClasevue_type_script_lang_js_,
  GeneradorVideoClasevue_type_template_id_712056bb_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "712056bb",
  "2d85cc31"
  
)

/* harmony default export */ var GeneradorVideoClase = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=cursos-borrador-miembro-generador-video-clase.js.map