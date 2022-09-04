exports.ids = [101];
exports.modules = {

/***/ 442:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"letra": "_3egY6jLbJzWyolYD3JAEsg=="
};


/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_uidUsuario_vue_vue_type_style_index_0_id_2716851f_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(442);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_uidUsuario_vue_vue_type_style_index_0_id_2716851f_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_uidUsuario_vue_vue_type_style_index_0_id_2716851f_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_uidUsuario_vue_vue_type_style_index_0_id_2716851f_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_uidUsuario_vue_vue_type_style_index_0_id_2716851f_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 606:
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
var VDivider = __webpack_require__(212);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/verificacion-email/_uidUsuario.vue?vue&type=template&id=2716851f&scoped=true&







var _uidUsuariovue_type_template_id_2716851f_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "container"
  }, [_c(VCard["a" /* default */], {
    staticClass: "mx-auto text-center mt-10",
    attrs: {
      "max-width": "500"
    }
  }, [_c(components_VCard["c" /* VCardText */], [_c('p', {
    staticClass: "text-h6 text--primary"
  }, [_vm._v("\n                ¡Solo falta un paso para despegar! 🚀\n            ")]), _vm._v(" "), _c(VDivider["a" /* default */]), _vm._v(" "), _c('div', {
    staticClass: "letra mt-5"
  }, [_vm._v("¡Tu cuenta ha sido creada! Pero aún tu correo no a sido verificado.")]), _vm._v(" "), _c('div', {
    staticClass: "text--primary mt-3"
  }, [_c('p', {
    staticClass: "letra"
  }, [_vm._v("Muchas gracias por formar parte de Jekuaapy. Esperamos que tengas una buena experiencia.")]), _vm._v(" "), _c('p', {
    staticClass: "letra"
  }, [_vm._v("Solo falta verificar tu correo para acceder a Jekuaapy y poder utilizar los servicios.")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "17px"
    }
  }, [_vm._v("¡Te esperamos " + _vm._s(_vm.email) + "!")])])], 1), _vm._v(" "), _c(components_VCard["a" /* VCardActions */], [_c(VBtn["a" /* default */], {
    attrs: {
      "text": "",
      "block": "",
      "color": "deep-purple accent-4"
    },
    on: {
      "click": _vm.reeviarCorreoVerificacion
    }
  }, [_vm.estadoCorreoVerificacion === 'reenviando' ? _c('div', [_c(VIcon["a" /* default */], {
    attrs: {
      "left": ""
    }
  }, [_vm._v("\n                        mdi-loading\n                    ")]), _vm._v("\n\n                    Reenviando\n                ")], 1) : _vm._e(), _vm._v(" "), _vm.estadoCorreoVerificacion === 'reenviado' ? _c('div', [_c(VIcon["a" /* default */], {
    attrs: {
      "left": ""
    }
  }, [_vm._v("\n                        mdi-checkbox-marked-circle-outline\n                    ")]), _vm._v("\n\n                    Reenviado\n                ")], 1) : _vm._e(), _vm._v(" "), _vm.estadoCorreoVerificacion === '' ? _c('div', [_vm._v("\n                    Reenviar correo de verificación\n                ")]) : _vm._e()])], 1)], 1)], 1);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/verificacion-email/_uidUsuario.vue?vue&type=template&id=2716851f&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/verificacion-email/_uidUsuario.vue?vue&type=script&lang=js&
/* harmony default export */ var _uidUsuariovue_type_script_lang_js_ = ({
  name: '',
  middleware: 'accesoAutenticado',

  data() {
    return {
      estadoCorreoVerificacion: ''
    };
  },

  methods: {
    async reeviarCorreoVerificacion() {
      try {
        this.estadoCorreoVerificacion = 'reenviando';
        let token = this.$firebase.auth().currentUser;
        token = token ? await token.getIdToken() : '';
        await this.$store.dispatch('modules/usuarios/setTOKEN', token);
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const respuesta = await this.$axios.$get(`/serviceUsuario/reeviarCorreoVerificacion`, config);
        this.estadoCorreoVerificacion = 'reenviado';
      } catch (error) {
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error);
      }
    }

  },

  async asyncData({
    isDev,
    $firebase,
    $axios,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    let uidUsuario = params.uidUsuario;
    let config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let response = await $axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${uidUsuario}`, config);
    if (response.resultado.emailVerified) redirect('/');
    return {
      uid: response.resultado.uid,
      email: response.resultado.email,
      emailVerified: response.resultado.emailVerified
    };
  }

});
// CONCATENATED MODULE: ./pages/verificacion-email/_uidUsuario.vue?vue&type=script&lang=js&
 /* harmony default export */ var verificacion_email_uidUsuariovue_type_script_lang_js_ = (_uidUsuariovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./pages/verificacion-email/_uidUsuario.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(528)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  verificacion_email_uidUsuariovue_type_script_lang_js_,
  _uidUsuariovue_type_template_id_2716851f_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "2716851f",
  "1e42538d"
  
)

/* harmony default export */ var _uidUsuario = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=_uidUsuario.js.map