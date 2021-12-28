exports.ids = [28];
exports.modules = {

/***/ 336:
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

/***/ 423:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 446:
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
var installComponents = __webpack_require__(9);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VBottomNavigation/VBottomNavigation.sass
var VBottomNavigation = __webpack_require__(423);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/applicationable/index.js
var applicationable = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/button-group/index.js
var button_group = __webpack_require__(336);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js
var colorable = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/measurable/index.js
var measurable = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/proxyable/index.js
var proxyable = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/scrollable/index.js
var scrollable = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/themeable/index.js
var themeable = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/toggleable/index.js
var toggleable = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/console.js
var console = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VBottomNavigation/VBottomNavigation.js
// Styles
 // Mixins








 // Utilities



/* harmony default export */ var VBottomNavigation_VBottomNavigation = (Object(mixins["a" /* default */])(Object(applicationable["a" /* default */])('bottom', ['height', 'inputValue']), colorable["a" /* default */], measurable["a" /* default */], Object(toggleable["b" /* factory */])('inputValue'), proxyable["a" /* default */], scrollable["a" /* default */], themeable["a" /* default */]
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
      return scrollable["a" /* default */].options.computed.canScroll.call(this) && (this.hideOnScroll || !this.inputValue);
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
      Object(console["a" /* breaking */])('active.sync', 'value or v-model', this);
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

    return h(button_group["a" /* default */], this.setTextColor(this.color, data), this.$slots.default);
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(47);

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




installComponents_default()(component, {VBottomNavigation: VBottomNavigation_VBottomNavigation,VBtn: VBtn["a" /* default */],VIcon: VIcon["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=perfil.js.map