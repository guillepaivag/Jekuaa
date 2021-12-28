exports.ids = [11];
exports.modules = {

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./informatica.webp": 281,
	"./sinSeccion.webp": 282,
	"./sinSeccion1.webp": 283,
	"./sinSeccion2.webp": 284
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

module.exports = __webpack_require__.p + "img/informatica.292d832.webp";

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sinSeccion.4de0f3c.webp";

/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sinSeccion1.0b4ce86.webp";

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sinSeccion2.42c6954.webp";

/***/ }),

/***/ 354:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 367:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentacion_vue_vue_type_style_index_0_id_48724b08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentacion_vue_vue_type_style_index_0_id_48724b08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentacion_vue_vue_type_style_index_0_id_48724b08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentacion_vue_vue_type_style_index_0_id_48724b08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentacion_vue_vue_type_style_index_0_id_48724b08_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Presentacion.vue?vue&type=template&id=48724b08&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-parallax',{attrs:{"src":__webpack_require__(262)("./" + (_vm.seccion ? _vm.seccion : 'sinSeccion') + ".webp"),"height":"100%"}},[_c('div',{staticClass:"contenedor_contenido"},[_c('h1',{staticClass:"titulo"},[_vm._v("\n            "+_vm._s(_vm.titulo)+"\n        ")]),_vm._v(" "),_c('div',{staticClass:"descripcion"},[_vm._v("\n            "+_vm._s(_vm.descripcion)+"\n        ")]),_vm._v(" "),_c('v-btn',{staticClass:"verInformacion",attrs:{"color":"#ffffff"}},[_c('v-icon',[_vm._v("\n                mdi-book-open-variant\n            ")]),_vm._v(" "),_c('span',{staticClass:"ml-3"},[_vm._v("Ver información")])],1),_vm._v(" "),_c('v-btn',{staticClass:"verContenido",attrs:{"color":"#ffffff","to":_vm.to}},[_c('v-icon',[_vm._v("\n                mdi-book-open-variant\n            ")]),_vm._v(" "),_c('span',{staticClass:"ml-3"},[_vm._v("Ver contenido")])],1)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/Presentacion.vue?vue&type=template&id=48724b08&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Presentacion.vue?vue&type=script&lang=js&
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
/* harmony default export */ var Presentacionvue_type_script_lang_js_ = ({
  name: "Presentacion",

  data() {
    return {};
  },

  props: {
    titulo: String,
    descripcion: String,
    to: String,
    seccion: String
  },
  components: {}
});
// CONCATENATED MODULE: ./components/Presentacion.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Presentacionvue_type_script_lang_js_ = (Presentacionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(9);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VParallax/VParallax.js + 1 modules
var VParallax = __webpack_require__(401);

// CONCATENATED MODULE: ./components/Presentacion.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(388)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Presentacionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "48724b08",
  "27cdae68"
  
)

/* harmony default export */ var Presentacion = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */




installComponents_default()(component, {VBtn: VBtn["a" /* default */],VIcon: VIcon["a" /* default */],VParallax: VParallax["a" /* default */]})


/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VParallax/VParallax.sass
var VParallax = __webpack_require__(354);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(1);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/translatable/index.js

/* harmony default export */ var translatable = (external_vue_default.a.extend({
  name: 'translatable',
  props: {
    height: Number
  },
  data: () => ({
    elOffsetTop: 0,
    parallax: 0,
    parallaxDist: 0,
    percentScrolled: 0,
    scrollTop: 0,
    windowHeight: 0,
    windowBottom: 0
  }),
  computed: {
    imgHeight() {
      return this.objHeight();
    }

  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.translate, false);
    window.removeEventListener('resize', this.translate, false);
  },

  methods: {
    calcDimensions() {
      const offset = this.$el.getBoundingClientRect();
      this.scrollTop = window.pageYOffset;
      this.parallaxDist = this.imgHeight - this.height;
      this.elOffsetTop = offset.top + this.scrollTop;
      this.windowHeight = window.innerHeight;
      this.windowBottom = this.scrollTop + this.windowHeight;
    },

    listeners() {
      window.addEventListener('scroll', this.translate, false);
      window.addEventListener('resize', this.translate, false);
    },

    /** @abstract **/
    objHeight() {
      throw new Error('Not implemented !');
    },

    translate() {
      this.calcDimensions();
      this.percentScrolled = (this.windowBottom - this.elOffsetTop) / (parseInt(this.height) + this.windowHeight);
      this.parallax = Math.round(this.parallaxDist * this.percentScrolled);
    }

  }
}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VParallax/VParallax.js
// Style
 // Mixins



const baseMixins = Object(mixins["a" /* default */])(translatable);
/* @vue/component */

/* harmony default export */ var VParallax_VParallax = __webpack_exports__["a"] = (baseMixins.extend().extend({
  name: 'v-parallax',
  props: {
    alt: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: 500
    },
    src: String,
    srcset: String
  },
  data: () => ({
    isBooted: false
  }),
  computed: {
    styles() {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: `translate(-50%, ${this.parallax}px)`
      };
    }

  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const img = this.$refs.img;
      if (!img) return;

      if (img.complete) {
        this.translate();
        this.listeners();
      } else {
        img.addEventListener('load', () => {
          this.translate();
          this.listeners();
        }, false);
      }

      this.isBooted = true;
    },

    objHeight() {
      return this.$refs.img.naturalHeight;
    }

  },

  render(h) {
    const imgData = {
      staticClass: 'v-parallax__image',
      style: this.styles,
      attrs: {
        src: this.src,
        srcset: this.srcset,
        alt: this.alt
      },
      ref: 'img'
    };
    const container = h('div', {
      staticClass: 'v-parallax__image-container'
    }, [h('img', imgData)]);
    const content = h('div', {
      staticClass: 'v-parallax__content'
    }, this.$slots.default);
    return h('div', {
      staticClass: 'v-parallax',
      style: {
        height: `${this.height}px`
      },
      on: this.$listeners
    }, [container, content]);
  }

}));

/***/ })

};;
//# sourceMappingURL=presentacion.js.map