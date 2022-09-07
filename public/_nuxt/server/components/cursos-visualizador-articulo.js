exports.ids = [29];
exports.modules = {

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos/VisualizadorArticulo.vue?vue&type=template&id=2ffd41a0&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "ProseMirror",
    domProps: {
      "innerHTML": _vm._s(_vm.contenido)
    }
  }, []);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/cursos/VisualizadorArticulo.vue?vue&type=template&id=2ffd41a0&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos/VisualizadorArticulo.vue?vue&type=script&lang=js&
/* harmony default export */ var VisualizadorArticulovue_type_script_lang_js_ = ({
  name: 'visualizador-articulo',
  props: {
    contenido: String
  },

  mounted() {
    const collection = document.querySelectorAll('pre code');

    for (let i = 0; i < collection.length; i++) {
      const element = collection[i];
      collection[i].innerHTML = hljs.highlightAuto(element.textContent).value;
    }
  }

});
// CONCATENATED MODULE: ./components/cursos/VisualizadorArticulo.vue?vue&type=script&lang=js&
 /* harmony default export */ var cursos_VisualizadorArticulovue_type_script_lang_js_ = (VisualizadorArticulovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/cursos/VisualizadorArticulo.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  cursos_VisualizadorArticulovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "2ffd41a0",
  "fed5dc86"
  
)

/* harmony default export */ var VisualizadorArticulo = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=cursos-visualizador-articulo.js.map