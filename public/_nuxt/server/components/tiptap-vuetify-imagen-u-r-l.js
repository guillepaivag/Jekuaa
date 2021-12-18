exports.ids = [13];
exports.modules = {

/***/ 381:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImagenURL_vue_vue_type_style_index_0_id_9151d25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(381);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImagenURL_vue_vue_type_style_index_0_id_9151d25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImagenURL_vue_vue_type_style_index_0_id_9151d25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImagenURL_vue_vue_type_style_index_0_id_9151d25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImagenURL_vue_vue_type_style_index_0_id_9151d25c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/tiptap/vuetify/ImagenURL.vue?vue&type=template&id=9151d25c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mt-5 mb-5 container"},[_c('v-divider',{staticClass:"mb-5"}),_vm._ssrNode(" "),_c('v-text-field',{attrs:{"label":"Ingresa la URL de tu imagen","required":""},model:{value:(_vm.imageUrl),callback:function ($$v) {_vm.imageUrl=$$v},expression:"imageUrl"}}),_vm._ssrNode(" "),_c('v-text-field',{attrs:{"label":"Ingresa el ALT de tu imagen","required":""},model:{value:(_vm.imageAlt),callback:function ($$v) {_vm.imageAlt=$$v},expression:"imageAlt"}}),_vm._ssrNode(" "),_c('v-btn',{staticClass:"mt-5 btnImage",attrs:{"color":"#ff1d89","block":""},on:{"click":_vm.selectImage}},[_vm._v("\n          Seleccionar\n      ")]),_vm._ssrNode(" "),_c('v-divider',{staticClass:"mt-5"})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/tiptap/vuetify/ImagenURL.vue?vue&type=template&id=9151d25c&scoped=true&

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(63);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/tiptap/vuetify/ImagenURL.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * Example of a custom Image selector
 * Key is to emit a select-file event when a file needs to be added
 */

/* harmony default export */ var ImagenURLvue_type_script_lang_js_ = ({
  name: "ImagenURL",
  components: {
    VImg: VImg["a" /* default */]
  },

  data() {
    // Some public domain images from wikimedia.
    return {
      imageUrl: '',
      imageAlt: ''
    };
  },

  methods: {
    selectImage() {
      this.$emit('select-file', {
        src: this.imageUrl,
        alt: this.imageAlt
      });
    }

  }
});
// CONCATENATED MODULE: ./components/tiptap/vuetify/ImagenURL.vue?vue&type=script&lang=js&
 /* harmony default export */ var vuetify_ImagenURLvue_type_script_lang_js_ = (ImagenURLvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(10);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(210);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTextField/VTextField.js
var VTextField = __webpack_require__(201);

// CONCATENATED MODULE: ./components/tiptap/vuetify/ImagenURL.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(425)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  vuetify_ImagenURLvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "9151d25c",
  "6e72bd3b"
  
)

/* harmony default export */ var ImagenURL = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */




installComponents_default()(component, {VBtn: VBtn["a" /* default */],VDivider: VDivider["a" /* default */],VTextField: VTextField["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=tiptap-vuetify-imagen-u-r-l.js.map