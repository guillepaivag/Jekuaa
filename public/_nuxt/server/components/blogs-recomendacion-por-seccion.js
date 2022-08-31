exports.ids = [8];
exports.modules = {

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let secciones = {}; // Secciones

agregarSecciones([{
  uid: 'informatica',
  nombre: 'Informática'
}, {
  uid: 'matematica',
  nombre: 'Matemática'
}]); // Categorias

agregarCategorias([{
  uid: 'algoritmos',
  nombre: 'Algoritmos'
}, {
  uid: 'desarrollo-web',
  nombre: 'Desarrollo Web'
}, {
  uid: 'redes',
  nombre: 'Redes'
}], 'informatica');
agregarCategorias([{
  uid: 'calculo',
  nombre: 'Cálculo'
}], 'matematica');
/* harmony default export */ __webpack_exports__["a"] = (secciones); // Funciones para agregar varios elementos

function agregarSecciones(secciones) {
  for (let i = 0; i < secciones.length; i++) {
    const seccion = secciones[i];
    agregarSeccion(seccion);
  }
}

function agregarCategorias(categorias, idSeccion) {
  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i];
    agregarCategoria(categoria, idSeccion);
  }
} // Funciones para agregar un elemento


function agregarSeccion(seccion) {
  secciones[seccion.uid] = { ...seccion,
    categorias: {}
  };
}

function agregarCategoria(categoria, idSeccion) {
  secciones[idSeccion].categorias[categoria.uid] = categoria;
}
/*
 * Estructura: 
 * 
*/
// let secciones = {
//     informatica: {
//         uid: 'informatica',
//         nombre: 'Informática',
//         categorias: {
//             algoritmos: {
//                 uid: 'algoritmos',
//                 nombre: 'Algoritmos',
//             },
//         }
//     },
// }

/***/ }),

/***/ 331:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"horizontal_slider": "xVukcaUVYYDg10je8nle8w==",
	"slider_container": "w41-16iy3Ja01lln-Pvl3A==",
	"item": "mxJ70XZHs-T2MUqNU3uLZg==",
	"styleTitulo": "c4+kxhlLIL+7RPgCE37RjA=="
};


/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSeccion_vue_vue_type_style_index_0_id_e6d27fca_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(331);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSeccion_vue_vue_type_style_index_0_id_e6d27fca_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSeccion_vue_vue_type_style_index_0_id_e6d27fca_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSeccion_vue_vue_type_style_index_0_id_e6d27fca_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecomendacionPorSeccion_vue_vue_type_style_index_0_id_e6d27fca_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(65);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/RecomendacionPorSeccion.vue?vue&type=template&id=e6d27fca&scoped=true&



var RecomendacionPorSeccionvue_type_template_id_e6d27fca_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_vm._ssrNode("<div class=\"mb-3\" data-v-e6d27fca>" + (_vm.seccion ? "<h2 data-v-e6d27fca>\n            Blogs recomendados de  \n            <b style=\"color: #ff1d89;\" data-v-e6d27fca>" + _vm._ssrEscape("\n                " + _vm._s(_vm.getNombreSeccion(_vm.seccion)) + "\n            ") + "</b></h2>" : "<h2 data-v-e6d27fca>\n            Otros blogs \n            <b style=\"color: #ff1d89;\" data-v-e6d27fca>\n                recomendados\n            </b></h2>") + "</div> "), _vm._ssrNode("<div class=\"horizontal_slider\" data-v-e6d27fca>", "</div>", [_vm._ssrNode("<div class=\"slider_container\" data-v-e6d27fca>", "</div>", _vm._l(_vm.blogsRecomendados, function (blog, index) {
    return _c(VCard["a" /* default */], {
      key: index,
      staticClass: "item pl-4 pt-7 white--text",
      attrs: {
        "to": `/blog/${blog.referencia}`
      }
    }, [_c(VImg["a" /* default */], {
      staticStyle: {
        "display": "inline-block",
        "margin-bottom": "-12px"
      },
      attrs: {
        "height": "35",
        "max-width": "35",
        "src": __webpack_require__(122)
      }
    }), _vm._v(" "), _c('h2', {
      staticClass: "styleTitulo ml-2",
      staticStyle: {
        "display": "inline-block"
      },
      attrs: {
        "title": blog.titulo
      }
    }, [_vm._v("\n                    " + _vm._s(_vm.getTitulo(blog.titulo)) + "\n                ")])], 1);
  }), 1)])], 2);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/blogs/RecomendacionPorSeccion.vue?vue&type=template&id=e6d27fca&scoped=true&

// EXTERNAL MODULE: ./plugins/firebase.js + 6 modules
var firebase = __webpack_require__(32);

// EXTERNAL MODULE: external "@algolia/recommend"
var recommend_ = __webpack_require__(243);
var recommend_default = /*#__PURE__*/__webpack_require__.n(recommend_);

// EXTERNAL MODULE: ./helpers/informacionSecciones.js
var informacionSecciones = __webpack_require__(272);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/RecomendacionPorSeccion.vue?vue&type=script&lang=js&



const db = firebase["b" /* fb */].firestore();
const recommendClient = recommend_default()('RNRNTDZS3N', 'af4d4e9d36a7ceb75e258007c3ceccf2');
const indexName =  true ? 'prod_blogs' : undefined;
/* harmony default export */ var RecomendacionPorSeccionvue_type_script_lang_js_ = ({
  name: '',

  data() {
    return {
      blogsRecomendados: []
    };
  },

  props: {
    seccion: {
      type: String,
      require: true
    }
  },
  methods: {
    getNombreSeccion(uid) {
      return informacionSecciones["a" /* default */][uid].nombre;
    },

    getTitulo(titulo) {
      const maxLength = 35;

      if (titulo.length > maxLength) {
        return titulo.substring(0, maxLength) + '...';
      }

      return titulo;
    }

  },

  async created() {
    const snapshot = await db.collection('Blogs').where('seccion', '==', this.seccion).where('publicado', '==', true).where('habilitado', '==', true).orderBy('cantidadMeGusta', 'desc').limit(1).get();
    const uidBlogConMasMG = snapshot.docs[0].id;
    const data = await recommendClient.getRelatedProducts([{
      indexName,
      objectID: uidBlogConMasMG,
      maxRecommendations: 12
    }]);
    this.blogsRecomendados = data.results[0].hits;
  }

});
// CONCATENATED MODULE: ./components/blogs/RecomendacionPorSeccion.vue?vue&type=script&lang=js&
 /* harmony default export */ var blogs_RecomendacionPorSeccionvue_type_script_lang_js_ = (RecomendacionPorSeccionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/blogs/RecomendacionPorSeccion.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(372)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  blogs_RecomendacionPorSeccionvue_type_script_lang_js_,
  RecomendacionPorSeccionvue_type_template_id_e6d27fca_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "e6d27fca",
  "793982a4"
  
)

/* harmony default export */ var RecomendacionPorSeccion = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=blogs-recomendacion-por-seccion.js.map