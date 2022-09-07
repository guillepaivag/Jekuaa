exports.ids = [45];
exports.modules = {

/***/ 520:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"vistaClase": "S7dyaAdzbpKSGG7u2iP6Ug==",
	"tituloClase": "VL19g6FHWzZVa-9S2wI1tA==",
	"btnAgregarListaClases": "dLnE1rC8yf7VkWkyQ9z+Hw=="
};


/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_continuar_vue_vue_type_style_index_0_id_081297ae_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_continuar_vue_vue_type_style_index_0_id_081297ae_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_continuar_vue_vue_type_style_index_0_id_081297ae_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_continuar_vue_vue_type_style_index_0_id_081297ae_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_continuar_vue_vue_type_style_index_0_id_081297ae_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/curso/_codigo/continuar.vue?vue&type=template&id=081297ae&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "vistaClase"
  }, [_vm._ssrNode("\n    Cargando..\n")]);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/curso/_codigo/continuar.vue?vue&type=template&id=081297ae&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/curso/_codigo/continuar.vue?vue&type=script&lang=js&
/* harmony default export */ var continuarvue_type_script_lang_js_ = ({
  name: '',
  layout: '',
  middleware: '',

  async asyncData({
    app,
    store,
    $firebase,
    $axios,
    redirect,
    params
  }) {
    /**
     * ########################################################################################
     * ########################################################################################
     */
    function obtenerUidClaseParaRedireccionar(unidades, listaProgresos) {
      for (const unidad of unidades) {
        for (const clase of unidad.clases) {
          const datosClase = clase.data;
          const existe = listaProgresos.find(v => v.uidClase === datosClase.uid);
          if (!existe) return datosClase.uid;
        }
      }
    }
    /**
     * ########################################################################################
     * ########################################################################################
     */


    const db = $firebase.firestore();
    const codigo = params.codigo;
    const snapshotCurso = await db.collection('CursosPublicado').where('codigo', '==', codigo).get();
    if (snapshotCurso.empty) return redirect('/cursos');
    const uidCurso = snapshotCurso.docs[0].id; // Lista unidades/clases

    const snapshotUnidades = await db.collection('CursosPublicado').doc(uidCurso).collection('UnidadesPublicado').orderBy('ordenUnidad').get();
    let i = 0;
    const unidades = [];

    for (const doc1 of snapshotUnidades.docs) {
      unidades.push({
        data: doc1.data(),
        clases: []
      });
      const snapshot2 = await db.collection('CursosPublicado').doc(uidCurso).collection('UnidadesPublicado').doc(doc1.id).collection('ClasesPublicado').orderBy('ordenClase').get();

      for (const doc2 of snapshot2.docs) {
        unidades[i].clases.push({
          data: doc2.data(),
          contenido: null
        });
      }

      i++;
    }

    const usuario = store.state.modules.usuarios;
    const snapshotProgresoClase = await db.collection('Usuarios').doc(usuario.uid).collection('MisCursos').doc(uidCurso).collection('ProgresosClases').get();
    const listaProgresos = [];

    for (const docProgresoClase of snapshotProgresoClase.docs) {
      listaProgresos.push(docProgresoClase.data());
    }

    const uidClase = obtenerUidClaseParaRedireccionar(unidades, listaProgresos);
    return redirect(`/curso/${codigo}/clase/${uidClase}`);
  }

});
// CONCATENATED MODULE: ./pages/curso/_codigo/continuar.vue?vue&type=script&lang=js&
 /* harmony default export */ var _codigo_continuarvue_type_script_lang_js_ = (continuarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./pages/curso/_codigo/continuar.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(607)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _codigo_continuarvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "081297ae",
  "7d7470d2"
  
)

/* harmony default export */ var continuar = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=continuar.js.map