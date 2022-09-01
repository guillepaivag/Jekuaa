exports.ids = [59];
exports.modules = {

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/loading1.87c5a9d.jpg";

/***/ }),

/***/ 421:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"container2": "ysC9e0embTTNPNVaqftXLw==",
	"contenedorFlex": "To9qmGG8SvksU-+Cir2HgQ==",
	"contenedorFlexAuxiliar": "y+kapqnN5eX+x-C2ZeI5+g=="
};


/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_auxiliares_vue_vue_type_style_index_0_id_1ffcb334_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(421);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_auxiliares_vue_vue_type_style_index_0_id_1ffcb334_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_auxiliares_vue_vue_type_style_index_0_id_1ffcb334_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_auxiliares_vue_vue_type_style_index_0_id_1ffcb334_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_auxiliares_vue_vue_type_style_index_0_id_1ffcb334_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 587:
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

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.js
var VProgressLinear = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(260);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/miembro/curso-borrador/_uidCurso/auxiliares.vue?vue&type=template&id=1ffcb334&scoped=true&










var auxiliaresvue_type_template_id_1ffcb334_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "container container2"
  }, [_vm.datosCurso ? _vm._ssrNode("<div class=\"contenedorFlex\" data-v-1ffcb334>", "</div>", _vm._l(_vm.auxiliares, function (auxiliar, index) {
    return _c(VCard["a" /* default */], {
      key: index,
      staticClass: "contenedorFlexAuxiliar",
      attrs: {
        "loading": !!auxiliar.proceso,
        "disabled": !!auxiliar.proceso
      }
    }, [_c('template', {
      slot: "progress"
    }, [_c(VProgressLinear["a" /* default */], {
      attrs: {
        "color": _vm.setColorVProgressLinear(auxiliar.proceso),
        "height": "10",
        "indeterminate": ""
      }
    })], 1), _vm._v(" "), auxiliar.photoURL ? _c(VImg["a" /* default */], {
      attrs: {
        "height": "200",
        "src": auxiliar.photoURL
      }
    }) : _c(VImg["a" /* default */], {
      attrs: {
        "height": "200",
        "src": __webpack_require__(359)
      }
    }), _vm._v(" "), _c(components_VCard["d" /* VCardTitle */], [_vm._v("\n                " + _vm._s(auxiliar.displayName ? auxiliar.displayName : 'Cargando...') + "\n            ")]), _vm._v(" "), _c(components_VCard["c" /* VCardText */], {
      staticStyle: {
        "margin-top": "-10px",
        "margin-bottom": "35px"
      }
    }, [_c('div', {
      staticClass: "text-subtitle-1"
    }, [_vm._v("\n                    Auxiliar\n                ")])]), _vm._v(" "), _c(VSpacer["a" /* default */]), _vm._v(" "), _c(components_VCard["a" /* VCardActions */], {
      staticStyle: {
        "position": "absolute",
        "bottom": "0"
      }
    }, [_c(VBtn["a" /* default */], {
      attrs: {
        "text": "",
        "color": "red lighten-2"
      },
      on: {
        "click": function ($event) {
          return _vm.quitarAuxiliar(auxiliar.uid);
        }
      }
    }, [_c(VIcon["a" /* default */], {
      attrs: {
        "left": ""
      }
    }, [_vm._v("\n                        mdi-delete\n                    ")]), _vm._v("\n                    Quitar\n                ")], 1)], 1)], 2);
  }), 1) : _vm._e()]);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/miembro/curso-borrador/_uidCurso/auxiliares.vue?vue&type=template&id=1ffcb334&scoped=true&

// EXTERNAL MODULE: ./plugins/firebase.js + 6 modules
var firebase = __webpack_require__(32);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/miembro/curso-borrador/_uidCurso/auxiliares.vue?vue&type=script&lang=js&

/* harmony default export */ var auxiliaresvue_type_script_lang_js_ = ({
  name: 'auxiliares',
  layout: 'miembro',
  middleware: 'esInstructor',

  data() {
    return {
      uidCurso: this.$route.params.uidCurso,
      datosCurso: null,
      auxiliares: []
    };
  },

  components: {},
  methods: {
    setColorVProgressLinear(proceso) {
      if (proceso === 'cargando') return '#683bce';else if (proceso === 'eliminando') return 'red';else if (proceso === false) return '';
    },

    async quitarAuxiliar(uidUsuario) {
      const index1 = this.datosCurso.auxiliares.findIndex(v => v == uidUsuario);
      const index2 = this.auxiliares.findIndex(v => v.uid == uidUsuario);

      try {
        this.auxiliares[index2].proceso = 'eliminando';
        let token = this.$firebase.auth().currentUser;
        token = token ? await token.getIdToken() : '';
        await this.$store.dispatch('modules/usuarios/setTOKEN', token);
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const respuesta = await this.$axios.$delete(`/serviceCursoBorrador/miembro/quitar-auxiliar/${this.uidCurso}/${uidUsuario}`, config);
        if (index1 !== -1) this.datosCurso.auxiliares.splice(index1, 1);
        if (index2 !== -1) this.auxiliares.splice(index2, 1);
      } catch (error) {
        console.log('error', error);
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error);
      } finally {}
    }

  },

  async created() {
    const doc = await firebase["b" /* fb */].firestore().collection('CursosBorrador').doc(this.$route.params.uidCurso).get();
    if (!doc.exists) this.$router.push('/miembro/cursos/mis-cursos/borrador');
    this.datosCurso = doc.data();

    for (const auxiliar of this.datosCurso.auxiliares) {
      this.auxiliares.push({
        uid: auxiliar,
        photoURL: '',
        displayName: '',
        proceso: 'cargando'
      });
    }

    const auxiliaresAux = [];

    for (const auxiliar of this.auxiliares) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const auth = await this.$axios.$get(`/serviceUsuario/obtenerAuthentication/uid/${auxiliar.uid}`, config);
      auxiliaresAux.push({
        uid: auxiliar.uid,
        photoURL: auth.resultado.photoURL ? auth.resultado.photoURL : '',
        displayName: auth.resultado.displayName,
        proceso: false
      });
    }

    this.auxiliares = auxiliaresAux;
  },

  beforeDestroy() {// alert('Hay cambios para guardar!')
  }

});
// CONCATENATED MODULE: ./pages/miembro/curso-borrador/_uidCurso/auxiliares.vue?vue&type=script&lang=js&
 /* harmony default export */ var _uidCurso_auxiliaresvue_type_script_lang_js_ = (auxiliaresvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./pages/miembro/curso-borrador/_uidCurso/auxiliares.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(497)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _uidCurso_auxiliaresvue_type_script_lang_js_,
  auxiliaresvue_type_template_id_1ffcb334_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "1ffcb334",
  "a5eaea70"
  
)

/* harmony default export */ var auxiliares = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=auxiliares.js.map