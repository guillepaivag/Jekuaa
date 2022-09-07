exports.ids = [36];
exports.modules = {

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/portada_usuario.25caae9.png";

/***/ }),

/***/ 424:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"titulo-presentacion": "yNO++CBI9SYxxk+k2XpFjw==",
	"texto-nombreCompleto": "_1YS7PKKI8CK82X+4LfzDZA=="
};


/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CartaPresentacionInstructor_vue_vue_type_style_index_0_id_62b977b7_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(424);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CartaPresentacionInstructor_vue_vue_type_style_index_0_id_62b977b7_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CartaPresentacionInstructor_vue_vue_type_style_index_0_id_62b977b7_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CartaPresentacionInstructor_vue_vue_type_style_index_0_id_62b977b7_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CartaPresentacionInstructor_vue_vue_type_style_index_0_id_62b977b7_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 538:
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

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(215);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/transitions/index.js + 2 modules
var transitions = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(262);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/usuarios/CartaPresentacionInstructor.vue?vue&type=template&id=62b977b7&scoped=true&












var CartaPresentacionInstructorvue_type_template_id_62b977b7_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm.usuario && _vm.informacionUsuario ? _c('div', {
    staticClass: "container"
  }, [_vm._ssrNode("<h3 class=\"mb-5 titulo-presentacion\" data-v-62b977b7>\n        Presentación del instructor:\n    </h3> "), _vm._ssrNode("<div data-v-62b977b7>", "</div>", [_c(VCard["a" /* default */], {
    staticClass: "mx-auto"
  }, [_c(VImg["a" /* default */], {
    attrs: {
      "src": __webpack_require__(388),
      "height": "200px"
    }
  }), _vm._v(" "), _c(components_VCard["d" /* VCardTitle */], [_vm._v("\n                ¡Hola, soy "), _c('b', {
    staticClass: "texto-nombreCompleto ml-1"
  }, [_vm._v(" " + _vm._s(_vm.usuario.nombreCompleto) + "!")])]), _vm._v(" "), _c(components_VCard["b" /* VCardSubtitle */], [_vm._v("\n                " + _vm._s(_vm.usuario.nombreUsuario) + " - " + _vm._s(_vm.getRolDescriptivo(_vm.informacionUsuario.rolDescriptivo)) + "\n            ")]), _vm._v(" "), _c(components_VCard["a" /* VCardActions */], [_c(VBtn["a" /* default */], {
    attrs: {
      "color": "#683bce",
      "text": "",
      "to": `/estudiante/${_vm.usuario.nombreUsuario}`
    }
  }, [_vm._v("\n                Mi perfil\n            ")]), _vm._v(" "), _c(VSpacer["a" /* default */]), _vm._v(" "), _c(VBtn["a" /* default */], {
    attrs: {
      "color": "#683bce",
      "text": ""
    },
    on: {
      "click": function ($event) {
        _vm.show = !_vm.show;
      }
    }
  }, [_c('b', [_vm._v("Información")]), _vm._v(" "), _c(VIcon["a" /* default */], [_vm._v(_vm._s(_vm.show ? 'mdi-chevron-up' : 'mdi-chevron-down'))])], 1)], 1), _vm._v(" "), _c(transitions["a" /* VExpandTransition */], [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.show,
      expression: "show"
    }]
  }, [_c(VDivider["a" /* default */]), _vm._v(" "), _c(components_VCard["c" /* VCardText */], {
    domProps: {
      "innerHTML": _vm._s(_vm.descripcion)
    }
  })], 1)])], 1)], 1)], 2) : _vm._e();
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/usuarios/CartaPresentacionInstructor.vue?vue&type=template&id=62b977b7&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/usuarios/CartaPresentacionInstructor.vue?vue&type=script&lang=js&
/* harmony default export */ var CartaPresentacionInstructorvue_type_script_lang_js_ = ({
  name: 'carta-presentacion',

  data() {
    return {
      informacionUsuario: null,
      usuario: null,
      show: false
    };
  },

  props: {
    uidUsuario: String
  },
  methods: {
    getRolDescriptivo(rolDescriptivo) {
      if (rolDescriptivo === 'estudiante') {
        return 'Estudiante de Jekuaapy';
      }

      return rolDescriptivo;
    }

  },
  computed: {
    descripcion() {
      return this.informacionUsuario.descripcion.replace(/\n/g, '<br>');
    }

  },

  async created() {
    const ref = this.$firebase.firestore().collection('Usuarios').doc(this.uidUsuario);
    const doc = await ref.get();
    this.usuario = doc.data();
    let config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const respuesta = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${this.uidUsuario}`, config);
    this.usuario.nombreCompleto = respuesta.resultado.displayName;
    const refInformacionUsuario = this.$firebase.firestore().collection('InformacionUsuarios').doc(this.uidUsuario);
    const docInformacionUsuario = await refInformacionUsuario.get();
    this.informacionUsuario = docInformacionUsuario.data();
  }

});
// CONCATENATED MODULE: ./components/usuarios/CartaPresentacionInstructor.vue?vue&type=script&lang=js&
 /* harmony default export */ var usuarios_CartaPresentacionInstructorvue_type_script_lang_js_ = (CartaPresentacionInstructorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/usuarios/CartaPresentacionInstructor.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(468)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  usuarios_CartaPresentacionInstructorvue_type_script_lang_js_,
  CartaPresentacionInstructorvue_type_template_id_62b977b7_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "62b977b7",
  "5bc8235c"
  
)

/* harmony default export */ var CartaPresentacionInstructor = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=usuarios-carta-presentacion-instructor.js.map