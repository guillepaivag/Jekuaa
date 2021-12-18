exports.ids = [32];
exports.modules = {

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _components_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
// Extensions

/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (_components_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_0__[/* BaseItemGroup */ "a"].extend({
  name: 'button-group',

  provide() {
    return {
      btnToggle: this
    };
  },

  computed: {
    classes() {
      return _components_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_0__[/* BaseItemGroup */ "a"].options.computed.classes.call(this);
    }

  },
  methods: {
    // Isn't being passed down through types
    genData: _components_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_0__[/* BaseItemGroup */ "a"].options.methods.genData
  }
}));

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VBottomNavigation_VBottomNavigation_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(412);
/* harmony import */ var _src_components_VBottomNavigation_VBottomNavigation_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VBottomNavigation_VBottomNavigation_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* harmony import */ var _mixins_button_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(270);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _mixins_measurable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var _mixins_proxyable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(38);
/* harmony import */ var _mixins_scrollable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(73);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3);
// Styles
 // Mixins








 // Utilities



/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(Object(_mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])('bottom', ['height', 'inputValue']), _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_measurable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], Object(_mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__[/* factory */ "b"])('inputValue'), _mixins_proxyable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_scrollable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]
/* @vue/component */
).extend({
  name: 'v-bottom-navigation',
  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active'
    },
    backgroundColor: String,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: 56
    },
    hideOnScroll: Boolean,
    horizontal: Boolean,
    inputValue: {
      type: Boolean,
      default: true
    },
    mandatory: Boolean,
    shift: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },

  data() {
    return {
      isActive: this.inputValue
    };
  },

  computed: {
    canScroll() {
      return _mixins_scrollable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].options.computed.canScroll.call(this) && (this.hideOnScroll || !this.inputValue);
    },

    classes() {
      return {
        'v-bottom-navigation--absolute': this.absolute,
        'v-bottom-navigation--grow': this.grow,
        'v-bottom-navigation--fixed': !this.absolute && (this.app || this.fixed),
        'v-bottom-navigation--horizontal': this.horizontal,
        'v-bottom-navigation--shift': this.shift
      };
    },

    styles() {
      return { ...this.measurableStyles,
        transform: this.isActive ? 'none' : 'translateY(100%)'
      };
    }

  },

  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('active')) {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_10__[/* breaking */ "a"])('active.sync', 'value or v-model', this);
    }
  },

  methods: {
    thresholdMet() {
      this.isActive = !this.isScrollingUp;
      this.$emit('update:input-value', this.isActive);
    },

    updateApplication() {
      return this.$el ? this.$el.clientHeight : 0;
    },

    updateValue(val) {
      this.$emit('change', val);
    }

  },

  render(h) {
    const data = this.setBackgroundColor(this.backgroundColor, {
      staticClass: 'v-bottom-navigation',
      class: this.classes,
      style: this.styles,
      props: {
        activeClass: this.activeClass,
        mandatory: Boolean(this.mandatory || this.value !== undefined),
        tag: this.tag,
        value: this.internalValue
      },
      on: {
        change: this.updateValue
      }
    });

    if (this.canScroll) {
      data.directives = data.directives || [];
      data.directives.push({
        arg: this.scrollTarget,
        name: 'scroll',
        value: this.onScroll
      });
    }

    return h(_mixins_button_group__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], this.setTextColor(this.color, data), this.$slots.default);
  }

}));

/***/ }),

/***/ 412:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/perfil.vue?vue&type=template&id=27f7652e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-bottom-navigation',{attrs:{"color":"#683bce","grow":""}},[_c('v-btn',{attrs:{"to":"/perfil","exact":""}},[_c('span',[_vm._v("Perfil")]),_vm._v(" "),_c('v-icon',[_vm._v("mdi-account")])],1),_vm._v(" "),_c('v-btn',{attrs:{"to":"/perfil/informacion","exact":""}},[_c('span',[_vm._v("Mi información")]),_vm._v(" "),_c('v-icon',[_vm._v("mdi-bookshelf")])],1),_vm._v(" "),_c('v-btn',{attrs:{"to":"/perfil/seguridad","exact":""}},[_c('span',[_vm._v("Seguridad")]),_vm._v(" "),_c('v-icon',[_vm._v("mdi-key")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"container\">","</div>",[_c('nuxt-child')],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/perfil.vue?vue&type=template&id=27f7652e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/perfil.vue?vue&type=script&lang=js&
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
/* harmony default export */ var perfilvue_type_script_lang_js_ = ({
  name: 'Perfil',

  data() {
    return {
      user: {},
      userClaims: {}
    };
  },

  async mounted() {},

  methods: {}
});
// CONCATENATED MODULE: ./pages/perfil.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_perfilvue_type_script_lang_js_ = (perfilvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(10);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBottomNavigation/VBottomNavigation.js
var VBottomNavigation = __webpack_require__(385);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// CONCATENATED MODULE: ./pages/perfil.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_perfilvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "501d4699"
  
)

/* harmony default export */ var perfil = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */




installComponents_default()(component, {VBottomNavigation: VBottomNavigation["a" /* default */],VBtn: VBtn["a" /* default */],VIcon: VIcon["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=perfil.js.map