exports.ids = [15];
exports.modules = {

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VList.js
var VList = __webpack_require__(76);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItem.js
var VListItem = __webpack_require__(53);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItemAction.js
var VListItemAction = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/index.js + 1 modules
var components_VList = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItemGroup.js
var VListItemGroup = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(262);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos-borrador/miembro/ListaUnidadesClases.vue?vue&type=template&id=7724681c&










var ListaUnidadesClasesvue_type_template_id_7724681c_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c(VList["a" /* default */], {
    staticStyle: {
      "height": "50vh",
      "overflow-y": "scroll"
    }
  }, _vm._l(_vm.unidades, function (elementUnidad, index) {
    return _c('div', {
      key: index,
      staticClass: "mb-8"
    }, [_c('h4', {
      staticClass: "tituloUnidad mb-1"
    }, [_vm._v(" " + _vm._s(elementUnidad.data.nombreUnidad) + " ")]), _vm._v(" "), _c(VListItemGroup["a" /* default */], {
      attrs: {
        "color": "primary"
      }
    }, _vm._l(elementUnidad.clases, function (elementClase, index) {
      return _c('div', {
        key: index
      }, [_c(VListItem["a" /* default */], {
        attrs: {
          "to": `/miembro/curso-borrador/vista-previa/${_vm.uidCurso}/clase/${elementClase.data.uid}`
        }
      }, [_c(components_VList["a" /* VListItemContent */], [_c(components_VList["c" /* VListItemTitle */], {
        staticClass: "tituloClase"
      }, [elementClase.data.tipoClase === 'video' ? _c(VIcon["a" /* default */], {
        attrs: {
          "size": "18",
          "color": "#683bce"
        }
      }, [_vm._v("\n                                    mdi-play-circle\n                                ")]) : elementClase.data.tipoClase === 'articulo' ? _c(VIcon["a" /* default */], {
        attrs: {
          "size": "18",
          "color": "#683bce"
        }
      }, [_vm._v("\n                                    mdi-file-multiple\n                                ")]) : _c(VIcon["a" /* default */], {
        attrs: {
          "size": "22",
          "color": "red"
        }
      }, [_vm._v("\n                                    mdi-alert-octagon\n                                ")]), _vm._v(" "), _c('p', {
        staticStyle: {
          "display": "inline",
          "margin-left": "5px !important"
        }
      }, [_vm._v(_vm._s(elementClase.data.titulo))])], 1)], 1), _vm._v(" "), _c(VSpacer["a" /* default */]), _vm._v(" "), _c('p', {
        staticStyle: {
          "display": "inline",
          "font-size": "13px",
          "margin-top": "16px",
          "margin-right": "-8px"
        }
      }, [_vm._v("\n                            " + _vm._s(_vm.secondsToString(elementClase.data.duracion)) + "\n                        ")]), _vm._v(" "), _c(VListItemAction["a" /* default */], [_c(VIcon["a" /* default */], {
        attrs: {
          "color": "gray"
        }
      }, [_vm._v("\n                                mdi-star\n                            ")])], 1)], 1), _vm._v(" "), _c(VDivider["a" /* default */])], 1);
    }), 0)], 1);
  }), 0)], 1);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/cursos-borrador/miembro/ListaUnidadesClases.vue?vue&type=template&id=7724681c&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos-borrador/miembro/ListaUnidadesClases.vue?vue&type=script&lang=js&
/* harmony default export */ var ListaUnidadesClasesvue_type_script_lang_js_ = ({
  name: '',
  props: {
    uidCurso: String,
    unidades: Array
  },
  methods: {
    secondsToString(seconds) {
      var hour = Math.floor(seconds / 3600);
      hour = hour < 10 ? '0' + hour : hour;
      var minute = Math.floor(seconds / 60 % 60);
      minute = minute < 10 ? '0' + minute : minute;
      var second = seconds % 60;
      second = second < 10 ? '0' + second : second;
      return hour + ':' + minute + ':' + String(second).split('.')[0];
    }

  }
});
// CONCATENATED MODULE: ./components/cursos-borrador/miembro/ListaUnidadesClases.vue?vue&type=script&lang=js&
 /* harmony default export */ var miembro_ListaUnidadesClasesvue_type_script_lang_js_ = (ListaUnidadesClasesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/cursos-borrador/miembro/ListaUnidadesClases.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  miembro_ListaUnidadesClasesvue_type_script_lang_js_,
  ListaUnidadesClasesvue_type_template_id_7724681c_render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "75f6cb20"
  
)

/* harmony default export */ var ListaUnidadesClases = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=cursos-borrador-miembro-lista-unidades-clases.js.map