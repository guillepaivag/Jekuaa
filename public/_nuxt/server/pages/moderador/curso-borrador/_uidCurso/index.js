exports.ids = [81];
exports.modules = {

/***/ 430:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"cardAction": "gvFSzjLo+NyaQ-vALff1+w=="
};


/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15e90ae6_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(430);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15e90ae6_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15e90ae6_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15e90ae6_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15e90ae6_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 593:
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
var VDivider = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItem.js
var VListItem = __webpack_require__(53);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/index.js + 1 modules
var VList = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/moderador/curso-borrador/_uidCurso/index.vue?vue&type=template&id=15e90ae6&scoped=true&









var _uidCursovue_type_template_id_15e90ae6_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "container d-flex flex-wrap"
  }, _vm._l(_vm.items, function (item, index) {
    return _c(VCard["a" /* default */], {
      key: index,
      staticClass: "cardAction ma-3"
    }, [_c(VListItem["a" /* default */], {
      attrs: {
        "three-line": ""
      }
    }, [_c(VList["a" /* VListItemContent */], [_c(VList["c" /* VListItemTitle */], {
      staticClass: "text-h5 mb-1"
    }, [_vm._v("\n                    " + _vm._s(item.title) + "\n                ")]), _vm._v(" "), _c(VList["b" /* VListItemSubtitle */], {
      staticClass: "mt-5"
    }, [_vm._v("\n                    " + _vm._s(item.description) + "\n                ")])], 1)], 1), _vm._v(" "), _c(VDivider["a" /* default */], {
      staticClass: "mt-2 mb-3"
    }), _vm._v(" "), _c(components_VCard["a" /* VCardActions */], [_c(VBtn["a" /* default */], {
      attrs: {
        "loading": item.id === 'contenidos' && _vm.uidPrimeraClase === 'cargando',
        "disabled": item.id === 'contenidos' && _vm.uidPrimeraClase === 'sin-clase',
        "outlined": "",
        "rounded": "",
        "text": "",
        "block": "",
        "color": "#683bce",
        "to": item.to
      }
    }, [_vm._v("\n                Acceder\n            ")])], 1)], 1);
  }), 1);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/moderador/curso-borrador/_uidCurso/index.vue?vue&type=template&id=15e90ae6&scoped=true&

// EXTERNAL MODULE: ./plugins/firebase.js + 6 modules
var firebase = __webpack_require__(32);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/moderador/curso-borrador/_uidCurso/index.vue?vue&type=script&lang=js&

const db = firebase["b" /* fb */].firestore();
/* harmony default export */ var _uidCursovue_type_script_lang_js_ = ({
  name: '',
  layout: 'moderador',
  middleware: 'esModerador',

  data() {
    return {
      uidCurso: this.$route.params.uidCurso,
      items: [{
        id: 'auxiliares',
        title: 'Actualizar auxiliares',
        description: 'Agregar/eliminar ayudantes en este curso para facilitar las tareas.',
        to: `/moderador/curso-borrador/${this.uidCurso}/auxiliares`
      }, {
        id: 'contenidos',
        title: 'Verificar contenido',
        description: 'Verificar si el contenido del curso es válido.',
        to: ``
      }],
      uidPrimeraClase: 'cargando'
    };
  },

  async created() {
    const snapshotUnidad = await db.collection('CursosBorrador').doc(this.uidCurso).collection('UnidadesBorrador').where('ordenUnidad', '==', 1).get();

    if (snapshotUnidad.empty) {
      this.uidPrimeraClase = 'sin-clase';
      return;
    }

    const snapshotClase = await snapshotUnidad.docs[0].ref.collection('ClasesBorrador').where('ordenClase', '==', 1).get();

    if (snapshotClase.empty) {
      this.uidPrimeraClase = 'sin-clase';
      return;
    }

    this.uidPrimeraClase = snapshotClase.docs[0].id;
    const items = JSON.parse(JSON.stringify(this.items));
    items[1].to = `/moderador/curso-borrador/${this.uidCurso}/clase/${this.uidPrimeraClase}`;
    this.items = items;
  }

});
// CONCATENATED MODULE: ./pages/moderador/curso-borrador/_uidCurso/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var curso_borrador_uidCursovue_type_script_lang_js_ = (_uidCursovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./pages/moderador/curso-borrador/_uidCurso/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(511)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  curso_borrador_uidCursovue_type_script_lang_js_,
  _uidCursovue_type_template_id_15e90ae6_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "15e90ae6",
  "55d44d7e"
  
)

/* harmony default export */ var _uidCurso = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=index.js.map