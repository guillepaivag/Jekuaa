exports.ids = [6];
exports.modules = {

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./informatica.webp": 281,
	"./matematica.webp": 282,
	"./sinSeccion.webp": 283
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 262;

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/informatica.3ab6971.webp";

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/matematica.8a0c5ca.webp";

/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sinSeccion.42c6954.webp";

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_lista_blogs_vue_vue_type_style_index_0_id_0fa8a992_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(348);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_lista_blogs_vue_vue_type_style_index_0_id_0fa8a992_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_lista_blogs_vue_vue_type_style_index_0_id_0fa8a992_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_lista_blogs_vue_vue_type_style_index_0_id_0fa8a992_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_lista_blogs_vue_vue_type_style_index_0_id_0fa8a992_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/lista-blogs.vue?vue&type=template&id=0fa8a992&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div class=\"flex-container\" data-v-0fa8a992>","</div>",_vm._l((_vm.blogs),function(blog,index){return _vm._ssrNode("<div class=\"flex-item\" data-v-0fa8a992>","</div>",[_c('v-card',{staticClass:"mx-auto carta-blog"},[_c('v-img',{staticClass:"white--text align-end",attrs:{"height":"200px","src":__webpack_require__(262)("./" + (blog.blog.seccion ? blog.blog.seccion : 'sinSeccion') + ".webp")}},[_c('v-card-title',[_vm._v("\n                        "+_vm._s(blog.blog.titulo)+"\n                    ")])],1),_vm._v(" "),_c('v-card-subtitle',{staticClass:"pb-0"},[_vm._v("\n                    "+_vm._s(blog.publicador.nombreUsuario)+"\n                ")]),_vm._v(" "),_c('v-card-text',{staticClass:"text--primary"},[_c('div',[_vm._v("\n                        "+_vm._s(blog.blog.descripcion)+"\n                    ")])]),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{attrs:{"color":"#683bce","text":"","block":"","to":_vm.getURL(blog.blog.referencia)}},[_vm._v("\n                        Ver blog\n                    ")])],1)],1)],1)}),0),_vm._ssrNode(" "),(_vm.buscando && _vm.existeMasDatos)?_vm._ssrNode("<div class=\"cargando\" data-v-0fa8a992>","</div>",[_c('v-progress-circular',{attrs:{"indeterminate":"","color":"#683bce","size":70,"width":7}})],1):_vm._e(),_vm._ssrNode(" "),(_vm.blogs.length)?_c('div',{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:(_vm.cargarBlogs),expression:"cargarBlogs"}],staticClass:"mt-15"},[]):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/blogs/lista-blogs.vue?vue&type=template&id=0fa8a992&scoped=true&

// EXTERNAL MODULE: external "vue-observe-visibility"
var external_vue_observe_visibility_ = __webpack_require__(200);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blogs/lista-blogs.vue?vue&type=script&lang=js&
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

/* harmony default export */ var lista_blogsvue_type_script_lang_js_ = ({
  name: '',
  directives: {
    ObserveVisibility: external_vue_observe_visibility_["ObserveVisibility"]
  },

  data() {
    return {};
  },

  props: {
    blogs: Array,
    existeMasDatos: Boolean,
    buscando: Boolean
  },
  methods: {
    cargarBlogs(visible) {
      if (!visible || this.buscando || !this.existeMasDatos) {
        return;
      }

      this.$emit('cargarBlogs', {
        visible
      });
    },

    getURL(referencia) {
      if (window.location.href.includes('miembro-jekuaa')) {
        return `/miembro-jekuaa/blog/${referencia}`;
      } else {
        return `/blog/${referencia}`;
      }
    }

  },
  watch: {},
  computed: {},

  mounted() {},

  created() {}

});
// CONCATENATED MODULE: ./components/blogs/lista-blogs.vue?vue&type=script&lang=js&
 /* harmony default export */ var blogs_lista_blogsvue_type_script_lang_js_ = (lista_blogsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(9);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js
var VProgressCircular = __webpack_require__(71);

// CONCATENATED MODULE: ./components/blogs/lista-blogs.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(369)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  blogs_lista_blogsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "0fa8a992",
  "5a94cf6b"
  
)

/* harmony default export */ var lista_blogs = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */









installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardSubtitle: components_VCard["b" /* VCardSubtitle */],VCardText: components_VCard["c" /* VCardText */],VCardTitle: components_VCard["d" /* VCardTitle */],VImg: VImg["a" /* default */],VProgressCircular: VProgressCircular["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=blogs-lista-blogs.js.map