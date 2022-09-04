exports.ids = [27];
exports.modules = {

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(18);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos/SinAccesoCurso.vue?vue&type=template&id=77a8d370&





var SinAccesoCursovue_type_template_id_77a8d370_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c(VCard["a" /* default */], {
    staticClass: "mx-auto",
    attrs: {
      "max-width": "470"
    }
  }, [_c(components_VCard["c" /* VCardText */], [_c('p', {
    staticClass: "text-h4 text--primary"
  }, [_vm._v("\n                Sin acceso\n            ")]), _vm._v(" "), _c('p', [_vm._v("\n                Jekuaapy\n            ")]), _vm._v(" "), _c('div', {
    staticClass: "text--primary"
  }, [_vm._v("\n                Para ver este contenido por favor compra el curso. "), _c('br'), _vm._v("\n                Y comienza con un mundo de aprendizaje 🚀\n            ")])]), _vm._v(" "), _c(components_VCard["a" /* VCardActions */], [_vm.curso.datosPrecio.precio === 0 ? _c(VBtn["a" /* default */], {
    attrs: {
      "outlined": "",
      "text": "",
      "color": "#683bce",
      "to": `/pedidos/nuevo/curso/${_vm.curso.uid}`
    }
  }, [_vm._v("\n                Reclamar gratis\n            ")]) : !_vm.estaEnDescuento(_vm.curso.datosPrecio.descuento) ? _c(VBtn["a" /* default */], {
    attrs: {
      "outlined": "",
      "text": "",
      "color": "#683bce",
      "to": `/pedidos/nuevo/curso/${_vm.curso.uid}`
    }
  }, [_vm._v("\n                Comprar\n            ")]) : _c(VBtn["a" /* default */], {
    attrs: {
      "outlined": "",
      "text": "",
      "color": "#683bce",
      "to": `/pedidos/nuevo/curso/${_vm.curso.uid}`
    }
  }, [_vm._v("\n                " + _vm._s(_vm.curso.datosPrecio.descuento.precio === 0 ? 'Reclamar gratis' : 'Comprar') + "\n            ")])], 1)], 1)], 1);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/cursos/SinAccesoCurso.vue?vue&type=template&id=77a8d370&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos/SinAccesoCurso.vue?vue&type=script&lang=js&
/* harmony default export */ var SinAccesoCursovue_type_script_lang_js_ = ({
  props: {
    curso: Object
  },
  methods: {
    estaEnDescuento(descuento) {
      if (!descuento) return false;
      const currentSecond = Date.now() / 1000;
      return currentSecond >= descuento.fechaInicio.seconds && currentSecond < descuento.fechaFin.seconds;
    }

  }
});
// CONCATENATED MODULE: ./components/cursos/SinAccesoCurso.vue?vue&type=script&lang=js&
 /* harmony default export */ var cursos_SinAccesoCursovue_type_script_lang_js_ = (SinAccesoCursovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/cursos/SinAccesoCurso.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  cursos_SinAccesoCursovue_type_script_lang_js_,
  SinAccesoCursovue_type_template_id_77a8d370_render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "5a5af588"
  
)

/* harmony default export */ var SinAccesoCurso = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=cursos-sin-acceso-curso.js.map