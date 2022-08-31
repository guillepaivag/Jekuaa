exports.ids = [30];
exports.modules = {

/***/ 287:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"v-dialog": "Gpde2KyX0sUMpqt-EP98Tg==",
	"v-dialog--fullscreen": "CSYuSLUtHqJEdx8B42aRTA==",
	"v-card": "oTpVKhoFUQa8j8zL3tutbg==",
	"v-card__title": "RWWBMVjNWtx3zLoNjNDUlg==",
	"v-card__subtitle": "J6O+IH11leoUh3qVb6Cayg==",
	"v-card__text": "pEl-72xxgv-L7JDqTa8Y8Q==",
	"v-card__actions": "NVJsK3v4UBFi+GuCw1wPdw==",
	"v-dialog__content": "tk1xvbXJGpuzmiWSLivysg==",
	"v-dialog__container": "q4MbqxqcDx8DQVoQtAc+Lw==",
	"v-dialog__container--attached": "RNgDJZb9X7Tb5ufmTZoDsw==",
	"v-dialog--animated": "gjETknxTNkaARbp4oAdV2g==",
	"animate-dialog": "ibXG4ldfYif5IaHNBlfJtg==",
	"v-dialog--scrollable": "_7c967umLxpUats-1rvQnLg=="
};


/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(287);
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(264);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94);
/* harmony import */ var _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(95);
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92);
/* harmony import */ var _mixins_stackable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(93);
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(59);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(0);
// Styles
 // Components

 // Mixins






 // Directives

 // Helpers




const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(_mixins_dependent__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _mixins_stackable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], _mixins_activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend({
  name: 'v-dialog',
  directives: {
    ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]
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
      var _a;

      if (val) {
        this.show();
        this.hideScroll();
      } else {
        this.removeOverlay();
        this.unbind();
        (_a = this.previousActiveElement) === null || _a === void 0 ? void 0 : _a.focus();
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
      Object(_util_console__WEBPACK_IMPORTED_MODULE_10__[/* removed */ "e"])('full-width', this);
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
          var _a, _b;

          if (!((_a = this.$refs.dialog) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement))) {
            this.previousActiveElement = document.activeElement;
            (_b = this.$refs.dialog) === null || _b === void 0 ? void 0 : _b.focus();
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
      if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_11__[/* keyCodes */ "t"].esc && !this.getOpenDependents().length) {
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

      if (!!target && this.$refs.dialog && // It isn't the document or the dialog body
      ![document, this.$refs.dialog].includes(target) && // It isn't inside the dialog body
      !this.$refs.dialog.contains(target) && // We're the topmost dialog
      this.activeZIndex >= this.getMaxZIndex() && // It isn't inside a dependent element (like a menu)
      !this.getOpenDependentElements().some(el => el.contains(target)) // So we must have focused something outside the dialog and its children
      ) {
        // Find and focus the first available element inside the dialog
        const focusable = this.$refs.dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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
          role: 'dialog',
          'aria-modal': this.hideOverlay ? undefined : 'true',
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
        attrs: {
          tabindex: this.isActive ? 0 : undefined
        },
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
          maxWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_11__[/* convertToUnit */ "g"])(this.maxWidth),
          width: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_11__[/* convertToUnit */ "g"])(this.width)
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
      }
    }, [this.genActivator(), this.genContent()]);
  }

}));

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(URL) {/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'FotoPerfil',

  data() {
    return {
      saving: false,
      saved: false,
      deleting: false,
      deleted: false,
      errorDialog: null,
      errorText: '',
      uploadFieldName: 'file',
      maxSize: 1024,
      fotoPerfil: '',
      formData: null,
      imageFile: null
    };
  },

  props: {},
  watch: {},
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },

    onFileChange(fieldName, files) {
      const {
        maxSize
      } = this;
      this.saved = false;
      this.deleted = false;
      this.formData = null;
      this.imageFile = files[0];

      if (files.length === 1) {
        let size = this.imageFile.size / maxSize / maxSize;

        if (!this.imageFile.type.match('image.png') && !this.imageFile.type.match('image.jpg') && !this.imageFile.type.match('image.jpeg')) {
          // check whether the upload is an image
          this.errorDialog = true;
          this.errorText = 'Se debe elegir un archivo imagen jpg o png.';
          this.formData = null;
          this.imageFile = null;
          return;
        }

        if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true;
          this.errorText = 'El archivo es muy grande, favor elegir un archivo de hasta 1MB.';
          this.formData = null;
          this.imageFile = null;
          return;
        } // Append file into FormData and turn file into image URL


        this.formData = new FormData();
        this.formData.append('image', this.imageFile);
        this.fotoPerfil = URL.createObjectURL(this.imageFile);
      } else {
        this.formData = null;
        this.imageFile = null; // Mostrar error

        this.errorDialog = true;
        this.errorText = 'Solo se puede subir una foto.';
      }
    },

    reiniciarImagen() {
      const fotoPerfil = this.$store.state.modules.usuarios.fotoPerfil;
      this.fotoPerfil = fotoPerfil ? fotoPerfil : '';
      this.formData = null;
      this.imageFile = null;
    },

    async actualizarFotoPerfil() {
      this.saving = true;
      const usuario = this.$store.state.modules.usuarios;

      try {
        const storageRef = this.$firebaseFotoPerfil.storage().ref();
        const uploadTask = storageRef.child(`${usuario.uid}/verificacion/${this.imageFile.name}`).put(this.imageFile); // Listen for state changes, errors, and completion of the upload.

        uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          console.log('Upload is ' + progress + '% done');

          switch (snapshot.state) {
            case this.$firebase.storage.TaskState.PAUSED:
              // or 'paused'
              console.log('Upload is paused');
              break;

            case this.$firebase.storage.TaskState.RUNNING:
              // or 'running'
              console.log('Upload is running');
              break;
          }
        }, error => {
          console.log(error); // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors

          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.$store.commit('modules/usuarios/setFotoPerfil', downloadURL);
            this.saved = true;
            this.saving = false;
            this.reiniciarImagen();
          });
        });
      } catch (error) {
        console.log('error', error);
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error);
        this.saving = false;
        this.reiniciarImagen();
      }
    },

    async eliminarFotoPerfil() {
      const condicion = !this.formData && this.fotoPerfil;
      if (!condicion) return;
      this.deleting = true;

      try {
        let token = this.$firebase.auth().currentUser;
        token = token ? await token.getIdToken() : '';
        await this.$store.dispatch('modules/usuarios/setTOKEN', token);
        let config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        await this.$axios.$delete(`/serviceUsuario/eliminarFotoPerfil`, config);
        this.$store.commit('modules/usuarios/setFotoPerfil', null);
        this.deleted = true;
      } catch (error) {
        console.log('error', error);
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error);
      } finally {
        this.deleting = false;
        this.reiniciarImagen();
      }
    }

  },

  created() {
    const fotoPerfil = this.$store.state.modules.usuarios.fotoPerfil;
    this.fotoPerfil = fotoPerfil ? fotoPerfil : '';
  }

});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(246)["URL"]))

/***/ }),

/***/ 334:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"avatar-img": "hjXCXWvR3lvcdgvWbvQ+Lw=="
};


/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FotoPerfil_vue_vue_type_style_index_0_id_2816a24d_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(334);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FotoPerfil_vue_vue_type_style_index_0_id_2816a24d_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FotoPerfil_vue_vue_type_style_index_0_id_2816a24d_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FotoPerfil_vue_vue_type_style_index_0_id_2816a24d_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FotoPerfil_vue_vue_type_style_index_0_id_2816a24d_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VAvatar/VAvatar.js
var VAvatar = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(296);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(262);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/directives/ripple/index.js
var ripple = __webpack_require__(27);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/FotoPerfil.vue?vue&type=template&id=2816a24d&scoped=true&









var FotoPerfilvue_type_template_id_2816a24d_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_vm._ssrNode("<div data-v-2816a24d>", "</div>", [_vm._ssrNode("<div slot=\"activator\" data-v-2816a24d>", "</div>", [!_vm.fotoPerfil ? _c(VAvatar["a" /* default */], {
    directives: [{
      def: ripple["a" /* default */],
      name: "ripple",
      rawName: "v-ripple"
    }],
    staticClass: "mb-3 avatar-img",
    attrs: {
      "size": "210px"
    },
    on: {
      "click": function ($event) {
        return _vm.launchFilePicker();
      }
    }
  }, [_c('span', {
    staticClass: "white--text"
  }, [_vm._v("\n                    Agregue una foto de perfil\n                ")])]) : _c(VAvatar["a" /* default */], {
    directives: [{
      def: ripple["a" /* default */],
      name: "ripple",
      rawName: "v-ripple"
    }],
    staticClass: "mb-3 avatar-img",
    attrs: {
      "size": "210px"
    },
    on: {
      "click": function ($event) {
        return _vm.launchFilePicker();
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.fotoPerfil,
      "alt": ""
    }
  })])], 1)]), _vm._ssrNode(" <input type=\"file\"" + _vm._ssrAttr("name", _vm.uploadFieldName) + " style=\"display:none\" data-v-2816a24d> "), _c(VDialog["a" /* default */], {
    attrs: {
      "max-width": "300"
    },
    model: {
      value: _vm.errorDialog,
      callback: function ($$v) {
        _vm.errorDialog = $$v;
      },
      expression: "errorDialog"
    }
  }, [_c(VCard["a" /* default */], [_c(components_VCard["c" /* VCardText */], {
    staticClass: "subheading"
  }, [_vm._v("\n                " + _vm._s(_vm.errorText) + "\n            ")]), _vm._v(" "), _c(components_VCard["a" /* VCardActions */], [_c(VSpacer["a" /* default */]), _vm._v(" "), _c(VBtn["a" /* default */], {
    attrs: {
      "flat": ""
    },
    on: {
      "click": function ($event) {
        _vm.errorDialog = false;
      }
    }
  }, [_vm._v("Got it!")])], 1)], 1)], 1), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"mt-5\" data-v-2816a24d>", "</div>", [_vm.formData ? _c(VBtn["a" /* default */], {
    staticClass: "mt-1 mb-1",
    attrs: {
      "block": "",
      "text": "",
      "color": "#683bce",
      "loading": _vm.saving || _vm.deleting,
      "disabled": !_vm.formData
    },
    on: {
      "click": _vm.actualizarFotoPerfil
    }
  }, [_vm._v("Actualizar foto de perfil")]) : _vm._e(), _vm._ssrNode(" "), _vm.formData ? _c(VBtn["a" /* default */], {
    staticClass: "mt-1 mb-1",
    attrs: {
      "block": "",
      "disabled": _vm.saving || _vm.deleting,
      "text": "",
      "color": "#ff1d89"
    },
    on: {
      "click": _vm.reiniciarImagen
    }
  }, [_vm._v("Reiniciar")]) : _vm._e(), _vm._ssrNode(" "), !_vm.formData && _vm.fotoPerfil ? _c(VBtn["a" /* default */], {
    staticClass: "mt-1 mb-1",
    attrs: {
      "block": "",
      "disabled": _vm.saving || _vm.deleting,
      "text": "",
      "color": "red"
    },
    on: {
      "click": _vm.eliminarFotoPerfil
    }
  }, [_vm._v("Borrar foto de perfil")]) : _vm._e()], 2)], 2);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/FotoPerfil.vue?vue&type=template&id=2816a24d&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/FotoPerfil.vue?vue&type=script&lang=js&
var FotoPerfilvue_type_script_lang_js_ = __webpack_require__(323);

// CONCATENATED MODULE: ./components/FotoPerfil.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FotoPerfilvue_type_script_lang_js_ = (FotoPerfilvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/FotoPerfil.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(376)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_FotoPerfilvue_type_script_lang_js_,
  FotoPerfilvue_type_template_id_2816a24d_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "2816a24d",
  "3730a8cd"
  
)

/* harmony default export */ var FotoPerfil = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=foto-perfil.js.map