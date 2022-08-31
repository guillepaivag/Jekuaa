exports.ids = [13,32];
exports.modules = {

/***/ 295:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"botonesEditor": "_5X4++UsCoHbyWfjNcSL3Uw==",
	"botonEditor": "t00zA3jr7X-3bu2w7izjKQ==",
	"is-active": "O1m0q3qFl6qXuwuqkXFtpQ=="
};


/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(51);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Tiptap.vue?vue&type=template&id=2000a610&scoped=true&


var Tiptapvue_type_template_id_2000a610_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_vm.editor ? _vm._ssrNode("<div class=\"botonesEditor\" data-v-2000a610>", "</div>", [_c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().undo().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        undo\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().redo().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        redo\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('bold')
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleBold().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        format_bold\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('italic')
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleItalic().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        format_italic\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('strike')
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleStrike().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        format_strikethrough\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('code')
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleCode().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        data_object\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('codeBlock')
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleCodeBlock().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        code\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.addImage.apply(null, arguments);
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        link\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('heading', {
        level: 1
      })
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleHeading({
          level: 1
        }).run();
      }
    }
  }, [_vm._v("\n      H1\n    ")]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('heading', {
        level: 2
      })
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleHeading({
          level: 2
        }).run();
      }
    }
  }, [_vm._v("\n      H2\n    ")]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('heading', {
        level: 3
      })
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleHeading({
          level: 3
        }).run();
      }
    }
  }, [_vm._v("\n      H3\n    ")]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('heading', {
        level: 4
      })
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleHeading({
          level: 4
        }).run();
      }
    }
  }, [_vm._v("\n      H4\n    ")]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('heading', {
        level: 5
      })
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleHeading({
          level: 5
        }).run();
      }
    }
  }, [_vm._v("\n      H5\n    ")]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('heading', {
        level: 6
      })
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleHeading({
          level: 6
        }).run();
      }
    }
  }, [_vm._v("\n      H6\n    ")]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('bulletList')
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleBulletList().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        format_list_bulleted\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('orderedList')
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleOrderedList().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        format_list_numbered\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    class: {
      'is-active': _vm.editor.isActive('blockquote')
    },
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().toggleBlockquote().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        format_quote\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().setHorizontalRule().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        horizontal_rule\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().unsetAllMarks().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        format_clear\n      ")])]), _vm._ssrNode(" "), _c(VBtn["a" /* default */], {
    staticClass: "botonEditor",
    attrs: {
      "title": "Negrita",
      "fab": "",
      "dark": "",
      "small": "",
      "color": "#683bce"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();

        _vm.editor.chain().focus().clearNodes().run();
      }
    }
  }, [_c('span', {
    staticClass: "material-icons"
  }, [_vm._v("\n        layers_clear\n      ")])])], 2) : _vm._e(), _vm._ssrNode(" <div class=\"editor\" style=\"border-style: solid;\" data-v-2000a610></div>")], 2);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/Tiptap.vue?vue&type=template&id=2000a610&scoped=true&

// EXTERNAL MODULE: external "@tiptap/vue-2"
var vue_2_ = __webpack_require__(247);

// EXTERNAL MODULE: external "@tiptap/starter-kit"
var starter_kit_ = __webpack_require__(248);
var starter_kit_default = /*#__PURE__*/__webpack_require__.n(starter_kit_);

// EXTERNAL MODULE: external "@tiptap/extension-document"
var extension_document_ = __webpack_require__(249);
var extension_document_default = /*#__PURE__*/__webpack_require__.n(extension_document_);

// EXTERNAL MODULE: external "@tiptap/extension-paragraph"
var extension_paragraph_ = __webpack_require__(250);
var extension_paragraph_default = /*#__PURE__*/__webpack_require__.n(extension_paragraph_);

// EXTERNAL MODULE: external "@tiptap/extension-text"
var extension_text_ = __webpack_require__(251);
var extension_text_default = /*#__PURE__*/__webpack_require__.n(extension_text_);

// EXTERNAL MODULE: external "@tiptap/extension-image"
var extension_image_ = __webpack_require__(252);
var extension_image_default = /*#__PURE__*/__webpack_require__.n(extension_image_);

// EXTERNAL MODULE: external "@tiptap/extension-dropcursor"
var extension_dropcursor_ = __webpack_require__(253);
var extension_dropcursor_default = /*#__PURE__*/__webpack_require__.n(extension_dropcursor_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Tiptap.vue?vue&type=script&lang=js&







/* harmony default export */ var Tiptapvue_type_script_lang_js_ = ({
  components: {
    EditorContent: vue_2_["EditorContent"]
  },

  data() {
    return {
      editor: null
    };
  },

  props: {
    value: String,
    contenidoNuevo: String
  },
  methods: {
    addImage() {
      const url = window.prompt('URL');

      if (url) {
        this.editor.chain().focus().setImage({
          src: url
        }).run();
      }
    },

    actualizarHTML(html) {
      this.$emit('input', html);
    },

    setEditor() {
      let vm = this;
      this.editor = new vue_2_["Editor"]({
        element: document.querySelector('.editor'),
        extensions: [starter_kit_default.a, extension_document_default.a, extension_paragraph_default.a, extension_text_default.a, extension_image_default.a.configure({
          inline: true
        }), extension_dropcursor_default.a],
        editorProps: {
          attributes: {
            class: 'contenedor_editor'
          }
        },
        content: this.value,

        onUpdate({
          editor
        }) {
          vm.actualizarHTML(editor.getHTML());
        }

      });
    }

  },
  watch: {
    contenidoNuevo: function (n, v) {
      if (n !== v) {
        this.editor.destroy();
        this.value = this.contenidoNuevo;
        this.setEditor();
      }
    }
  },

  mounted() {
    this.setEditor();
  },

  created() {},

  beforeUnmount() {
    this.editor.destroy();
  }

});
// CONCATENATED MODULE: ./components/Tiptap.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Tiptapvue_type_script_lang_js_ = (Tiptapvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/Tiptap.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(313)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Tiptapvue_type_script_lang_js_,
  Tiptapvue_type_template_id_2000a610_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "2000a610",
  "c51bc6f6"
  
)

/* harmony default export */ var Tiptap = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tiptap_vue_vue_type_style_index_0_id_2000a610_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(295);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tiptap_vue_vue_type_style_index_0_id_2000a610_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tiptap_vue_vue_type_style_index_0_id_2000a610_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tiptap_vue_vue_type_style_index_0_id_2000a610_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tiptap_vue_vue_type_style_index_0_id_2000a610_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 356:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorArticulo_vue_vue_type_style_index_0_id_9a8895c6_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(356);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorArticulo_vue_vue_type_style_index_0_id_9a8895c6_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorArticulo_vue_vue_type_style_index_0_id_9a8895c6_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorArticulo_vue_vue_type_style_index_0_id_9a8895c6_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneradorArticulo_vue_vue_type_style_index_0_id_9a8895c6_prod_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(51);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos-borrador/miembro/GeneradorArticulo.vue?vue&type=template&id=9a8895c6&scoped=true&


var GeneradorArticulovue_type_template_id_9a8895c6_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_vm._ssrNode("<div class=\"mt-3 mb-7\" data-v-9a8895c6>", "</div>", [_c('Tiptap', {
    staticClass: "mt-5",
    attrs: {
      "contenidoNuevo": _vm.contenidoInicial
    },
    model: {
      value: _vm.articulo,
      callback: function ($$v) {
        _vm.articulo = $$v;
      },
      expression: "articulo"
    }
  })], 1), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"text-center\" data-v-9a8895c6>", "</div>", [_c(VBtn["a" /* default */], {
    attrs: {
      "disabled": !_vm.articulo,
      "color": "primary",
      "text": ""
    },
    on: {
      "click": _vm.sendArticulo
    }
  }, [_vm._v("\n            Subir articulo\n        ")])], 1)], 2);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/cursos-borrador/miembro/GeneradorArticulo.vue?vue&type=template&id=9a8895c6&scoped=true&

// EXTERNAL MODULE: ./components/Tiptap.vue + 4 modules
var Tiptap = __webpack_require__(303);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos-borrador/miembro/GeneradorArticulo.vue?vue&type=script&lang=js&

/* harmony default export */ var GeneradorArticulovue_type_script_lang_js_ = ({
  name: '',

  data() {
    return {
      articulo: ''
    };
  },

  components: {
    'Tiptap': Tiptap["default"]
  },
  props: {
    uidCurso: String,
    uidUnidad: String,
    uidClase: String,
    contenidoInicial: String
  },
  methods: {
    sendArticulo() {
      this.$emit('sendArticulo', {
        uidCurso: this.uidCurso,
        uidUnidad: this.uidUnidad,
        uidClase: this.uidClase,
        articulo: this.articulo
      });
    }

  },
  watch: {
    contenidoInicial: function (n, v) {
      this.articulo = this.contenidoInicial ? this.contenidoInicial : '';
    }
  },

  created() {
    this.articulo = this.contenidoInicial ? this.contenidoInicial : '';
  }

});
// CONCATENATED MODULE: ./components/cursos-borrador/miembro/GeneradorArticulo.vue?vue&type=script&lang=js&
 /* harmony default export */ var miembro_GeneradorArticulovue_type_script_lang_js_ = (GeneradorArticulovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/cursos-borrador/miembro/GeneradorArticulo.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(400)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  miembro_GeneradorArticulovue_type_script_lang_js_,
  GeneradorArticulovue_type_template_id_9a8895c6_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "9a8895c6",
  "f6ca3846"
  
)

/* harmony default export */ var GeneradorArticulo = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {Tiptap: __webpack_require__(303).default})


/***/ })

};;
//# sourceMappingURL=cursos-borrador-miembro-generador-articulo.js.map