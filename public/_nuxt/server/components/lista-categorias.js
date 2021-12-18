exports.ids = [11];
exports.modules = {

/***/ 276:
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
}], 'matematica'); // Subcategorias

agregarSubCategorias([{
  uid: 'busqueda',
  nombre: 'Busqueda'
}, {
  uid: 'eficiencia',
  nombre: 'Eficiencia'
}, {
  uid: 'ordenacion',
  nombre: 'Ordenación'
}], 'informatica', 'algoritmos');
agregarSubCategorias([{
  uid: 'disenho-web',
  nombre: 'Diseño web'
}, {
  uid: 'vuejs',
  nombre: 'Vue.js'
}], 'informatica', 'desarrollo-web');
agregarSubCategorias([{
  uid: 'tcp',
  nombre: 'TCP'
}], 'informatica', 'redes');
agregarSubCategorias([{
  uid: 'derivada',
  nombre: 'Derivada'
}], 'matematica', 'calculo');
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
}

function agregarSubCategorias(subCategorias, idSeccion, idCategoria) {
  for (let i = 0; i < subCategorias.length; i++) {
    const subCategoria = subCategorias[i];
    agregarSubCategoria(subCategoria, idSeccion, idCategoria);
  }
} // Funciones para agregar un elemento


function agregarSeccion(seccion) {
  secciones[seccion.uid] = { ...seccion,
    categorias: {}
  };
}

function agregarCategoria(categoria, idSeccion) {
  secciones[idSeccion].categorias[categoria.uid] = { ...categoria,
    subCategorias: {}
  };
}

function agregarSubCategoria(subCategoria, idSeccion, idCategoria) {
  secciones[idSeccion].categorias[idCategoria].subCategorias[subCategoria.uid] = subCategoria;
}

/***/ }),

/***/ 279:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(279);
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(128);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(97);
/* harmony import */ var _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(95);
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92);
/* harmony import */ var _mixins_stackable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(96);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(55);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(0);
// Styles
 // Components

 // Mixins







 // Directives

 // Helpers




const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(_mixins_activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _mixins_stackable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend({
  name: 'v-dialog',
  directives: {
    ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_9__[/* default */ "b"]
  },
  props: {
    dark: Boolean,
    disabled: Boolean,
    fullscreen: Boolean,
    light: Boolean,
    maxWidth: [String, Number],
    noClickAnimation: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    persistent: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    },
    width: [String, Number]
  },

  data() {
    return {
      activatedBy: null,
      animate: false,
      animateTimeout: -1,
      isActive: !!this.value,
      stackMinZIndex: 200,
      previousActiveElement: null
    };
  },

  computed: {
    classes() {
      return {
        [`v-dialog ${this.contentClass}`.trim()]: true,
        'v-dialog--active': this.isActive,
        'v-dialog--persistent': this.persistent,
        'v-dialog--fullscreen': this.fullscreen,
        'v-dialog--scrollable': this.scrollable,
        'v-dialog--animated': this.animate
      };
    },

    contentClasses() {
      return {
        'v-dialog__content': true,
        'v-dialog__content--active': this.isActive
      };
    },

    hasActivator() {
      return Boolean(!!this.$slots.activator || !!this.$scopedSlots.activator);
    }

  },
  watch: {
    isActive(val) {
      if (val) {
        this.show();
        this.hideScroll();
      } else {
        var _this$previousActiveE;

        this.removeOverlay();
        this.unbind();
        (_this$previousActiveE = this.previousActiveElement) == null ? void 0 : _this$previousActiveE.focus();
      }
    },

    fullscreen(val) {
      if (!this.isActive) return;

      if (val) {
        this.hideScroll();
        this.removeOverlay(false);
      } else {
        this.showScroll();
        this.genOverlay();
      }
    }

  },

  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('full-width')) {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_11__[/* removed */ "e"])('full-width', this);
    }
  },

  beforeMount() {
    this.$nextTick(() => {
      this.isBooted = this.isActive;
      this.isActive && this.show();
    });
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') this.unbind();
  },

  methods: {
    animateClick() {
      this.animate = false; // Needed for when clicking very fast
      // outside of the dialog

      this.$nextTick(() => {
        this.animate = true;
        window.clearTimeout(this.animateTimeout);
        this.animateTimeout = window.setTimeout(() => this.animate = false, 150);
      });
    },

    closeConditional(e) {
      const target = e.target; // Ignore the click if the dialog is closed or destroyed,
      // if it was on an element inside the content,
      // if it was dragged onto the overlay (#6969),
      // or if this isn't the topmost dialog (#9907)

      return !(this._isDestroyed || !this.isActive || this.$refs.content.contains(target) || this.overlay && target && !this.overlay.$el.contains(target)) && this.activeZIndex >= this.getMaxZIndex();
    },

    hideScroll() {
      if (this.fullscreen) {
        document.documentElement.classList.add('overflow-y-hidden');
      } else {
        _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].options.methods.hideScroll.call(this);
      }
    },

    show() {
      !this.fullscreen && !this.hideOverlay && this.genOverlay(); // Double nextTick to wait for lazy content to be generated

      this.$nextTick(() => {
        this.$nextTick(() => {
          if (!this.$refs.content.contains(document.activeElement)) {
            this.previousActiveElement = document.activeElement;
            this.$refs.content.focus();
          }

          this.bind();
        });
      });
    },

    bind() {
      window.addEventListener('focusin', this.onFocusin);
    },

    unbind() {
      window.removeEventListener('focusin', this.onFocusin);
    },

    onClickOutside(e) {
      this.$emit('click:outside', e);

      if (this.persistent) {
        this.noClickAnimation || this.animateClick();
      } else {
        this.isActive = false;
      }
    },

    onKeydown(e) {
      if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* keyCodes */ "B"].esc && !this.getOpenDependents().length) {
        if (!this.persistent) {
          this.isActive = false;
          const activator = this.getActivator();
          this.$nextTick(() => activator && activator.focus());
        } else if (!this.noClickAnimation) {
          this.animateClick();
        }
      }

      this.$emit('keydown', e);
    },

    // On focus change, wrap focus to stay inside the dialog
    // https://github.com/vuetifyjs/vuetify/issues/6892
    onFocusin(e) {
      if (!e || !this.retainFocus) return;
      const target = e.target;

      if (!!target && // It isn't the document or the dialog body
      ![document, this.$refs.content].includes(target) && // It isn't inside the dialog body
      !this.$refs.content.contains(target) && // We're the topmost dialog
      this.activeZIndex >= this.getMaxZIndex() && // It isn't inside a dependent element (like a menu)
      !this.getOpenDependentElements().some(el => el.contains(target)) // So we must have focused something outside the dialog and its children
      ) {
        // Find and focus the first available element inside the dialog
        const focusable = this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const el = [...focusable].find(el => !el.hasAttribute('disabled'));
        el && el.focus();
      }
    },

    genContent() {
      return this.showLazyContent(() => [this.$createElement(_VThemeProvider__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        props: {
          root: true,
          light: this.light,
          dark: this.dark
        }
      }, [this.$createElement('div', {
        class: this.contentClasses,
        attrs: {
          role: 'document',
          tabindex: this.isActive ? 0 : undefined,
          ...this.getScopeIdAttrs()
        },
        on: {
          keydown: this.onKeydown
        },
        style: {
          zIndex: this.activeZIndex
        },
        ref: 'content'
      }, [this.genTransition()])])]);
    },

    genTransition() {
      const content = this.genInnerContent();
      if (!this.transition) return content;
      return this.$createElement('transition', {
        props: {
          name: this.transition,
          origin: this.origin,
          appear: true
        }
      }, [content]);
    },

    genInnerContent() {
      const data = {
        class: this.classes,
        ref: 'dialog',
        directives: [{
          name: 'click-outside',
          value: {
            handler: this.onClickOutside,
            closeConditional: this.closeConditional,
            include: this.getOpenDependentElements
          }
        }, {
          name: 'show',
          value: this.isActive
        }],
        style: {
          transformOrigin: this.origin
        }
      };

      if (!this.fullscreen) {
        data.style = { ...data.style,
          maxWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* convertToUnit */ "i"])(this.maxWidth),
          width: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* convertToUnit */ "i"])(this.width)
        };
      }

      return this.$createElement('div', data, this.getContentSlot());
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-dialog__container',
      class: {
        'v-dialog__container--attached': this.attach === '' || this.attach === true || this.attach === 'attach'
      },
      attrs: {
        role: 'dialog'
      }
    }, [this.genActivator(), this.genContent()]);
  }

}));

/***/ }),

/***/ 301:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ListaCategorias.vue?vue&type=template&id=676b777a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div class=\"titulos\" data-v-676b777a><b class=\"titulo-text\" data-v-676b777a>"+_vm._ssrEscape(_vm._s(_vm.seccion.nombre)+" / ")+"</b> <b class=\"titulo-text categoria-text\" data-v-676b777a>"+_vm._ssrEscape("\n            "+_vm._s(_vm.categoriaSeleccionada.nombre)+"\n        ")+"</b></div> "),_c('v-dialog',{attrs:{"scrollable":"","max-width":"300px"},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-card',[_c('v-card-title',[_vm._v("Categorias: "+_vm._s(_vm.seccion.nombre))]),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-card-text',{staticStyle:{"height":"300px"}},_vm._l((_vm.categorias),function(categoria,index){return _c('div',{key:index,staticClass:"mt-1"},[_c('v-btn',{staticClass:"ma-2 white--text",attrs:{"color":"#683bce","block":"","disabled":_vm.categoriaSeleccionada.uid == categoria.uid},on:{"click":function($event){return _vm.seleccionarCategoria(categoria)},"mouseover":function($event){_vm.hoverCategoria = categoria.uid},"mouseleave":function($event){_vm.hoverCategoria = null}}},[(_vm.hoverCategoria === categoria.uid)?_c('v-icon',{staticClass:"mr-2",attrs:{"right":"","dark":""}},[_vm._v("\n                            mdi-check\n                        ")]):_vm._e(),_vm._v(" "),_c('p',{staticClass:"textoBotonLista"},[_vm._v("\n                            "+_vm._s(categoria.nombre)+"\n                        ")])],1)],1)}),0),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-card-actions',{staticClass:"justify-center"})],1)],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/ListaCategorias.vue?vue&type=template&id=676b777a&scoped=true&

// EXTERNAL MODULE: ./helpers/informacionSecciones.js
var informacionSecciones = __webpack_require__(276);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ListaCategorias.vue?vue&type=script&lang=js&
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
//
//
//
//
//

/* harmony default export */ var ListaCategoriasvue_type_script_lang_js_ = ({
  data: () => ({
    categorias: [],
    categoriaSeleccionada: {
      uid: '',
      nombre: ''
    },
    dialog: false,
    hoverCategoria: null,
    informacionSecciones: informacionSecciones["a" /* default */]
  }),
  props: {
    seccion: Object
  },
  components: {},
  computed: {},
  watch: {
    categoriaSeleccionada: function (nuevo, viejo) {
      if (nuevo.uid === viejo.uid) return;
      this.$emit('categoriaSeleccionada', nuevo);
    }
  },
  methods: {
    inicializarListaCategorias() {
      let arr = Object.keys(this.informacionSecciones[this.seccion.uid].categorias);

      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        this.categorias.push({
          uid: this.informacionSecciones[this.seccion.uid].categorias[element].uid,
          nombre: this.informacionSecciones[this.seccion.uid].categorias[element].nombre
        });
      }

      this.categoriaSeleccionada = this.categorias[0];
    },

    seleccionarCategoria(categoria) {
      this.categoriaSeleccionada = categoria;
      this.dialog = false;
    }

  },

  created() {
    this.inicializarListaCategorias();
  }

});
// CONCATENATED MODULE: ./components/ListaCategorias.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ListaCategoriasvue_type_script_lang_js_ = (ListaCategoriasvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(10);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(281);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(210);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// CONCATENATED MODULE: ./components/ListaCategorias.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(384)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ListaCategoriasvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "676b777a",
  "b925d9dc"
  
)

/* harmony default export */ var ListaCategorias = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */









installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["b" /* VCardActions */],VCardText: components_VCard["d" /* VCardText */],VCardTitle: components_VCard["e" /* VCardTitle */],VDialog: VDialog["a" /* default */],VDivider: VDivider["a" /* default */],VIcon: VIcon["a" /* default */]})


/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(301);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

};;
//# sourceMappingURL=lista-categorias.js.map