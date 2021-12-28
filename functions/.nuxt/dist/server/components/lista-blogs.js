exports.ids = [9,10];
exports.modules = {

/***/ 248:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 251:
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

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(177);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(178);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(179);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(180);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(181);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(182);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(183);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(184);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(185);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(186);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(187);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(188);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(189);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(248);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(28);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(0);
















 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();

const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['offset' + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_16__[/* upperFirst */ "z"])(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['order' + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_16__[/* upperFirst */ "z"])(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};

function breakpointClass(type, prop, val) {
  let className = type;

  if (val == null || val === false) {
    return undefined;
  }

  if (prop) {
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  } // .order-md-6


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_14___default.a.extend({
  name: 'v-col',
  functional: true,
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: str => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str)
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  render(h, {
    props,
    data,
    children,
    parent
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `col`, `offset`, `order` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      const hasColClasses = classList.some(className => className.startsWith('col-'));
      classList.push({
        // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
        col: !hasColClasses || !props.cols,
        [`col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(data, {
      class: classList
    }), children);
  }

}));

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(177);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(178);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(179);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(180);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(181);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(182);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(183);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(184);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(185);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(186);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(187);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(188);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(189);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(248);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(28);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(0);
















 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];
const ALIGNMENT = ['start', 'end', 'center'];

function makeProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    props[prefix + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_16__[/* upperFirst */ "z"])(val)] = def();
    return props;
  }, {});
}

const alignValidator = str => [...ALIGNMENT, 'baseline', 'stretch'].includes(str);

const alignProps = makeProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator
}));

const justifyValidator = str => [...ALIGNMENT, 'space-between', 'space-around'].includes(str);

const justifyProps = makeProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));

const alignContentValidator = str => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str);

const alignContentProps = makeProps('alignContent', () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: 'align',
  justify: 'justify',
  alignContent: 'align-content'
};

function breakpointClass(type, prop, val) {
  let className = classMap[type];

  if (val == null) {
    return undefined;
  }

  if (prop) {
    // alignSm -> Sm
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // .align-items-sm-center


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_14___default.a.extend({
  name: 'v-row',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps
  },

  render(h, {
    props,
    data,
    children
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `align`, `justify`, `alignContent` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      classList.push({
        'no-gutters': props.noGutters,
        'row--dense': props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(data, {
      staticClass: 'row',
      class: classList
    }), children);
  }

}));

/***/ }),

/***/ 259:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

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

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mixins_bootable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _mixins_groupable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
// Mixins

 // Directives

 // Utilities



const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(_mixins_bootable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], Object(_mixins_groupable__WEBPACK_IMPORTED_MODULE_1__[/* factory */ "a"])('windowGroup', 'v-window-item', 'v-window'));
/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend().extend().extend({
  name: 'v-window-item',
  directives: {
    Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]
  },
  props: {
    disabled: Boolean,
    reverseTransition: {
      type: [Boolean, String],
      default: undefined
    },
    transition: {
      type: [Boolean, String],
      default: undefined
    },
    value: {
      required: false
    }
  },

  data() {
    return {
      isActive: false,
      inTransition: false
    };
  },

  computed: {
    classes() {
      return this.groupClasses;
    },

    computedTransition() {
      if (!this.windowGroup.internalReverse) {
        return typeof this.transition !== 'undefined' ? this.transition || '' : this.windowGroup.computedTransition;
      }

      return typeof this.reverseTransition !== 'undefined' ? this.reverseTransition || '' : this.windowGroup.computedTransition;
    }

  },
  methods: {
    genDefaultSlot() {
      return this.$slots.default;
    },

    genWindowItem() {
      return this.$createElement('div', {
        staticClass: 'v-window-item',
        class: this.classes,
        directives: [{
          name: 'show',
          value: this.isActive
        }],
        on: this.$listeners
      }, this.genDefaultSlot());
    },

    onAfterTransition() {
      if (!this.inTransition) {
        return;
      } // Finalize transition state.


      this.inTransition = false;

      if (this.windowGroup.transitionCount > 0) {
        this.windowGroup.transitionCount--; // Remove container height if we are out of transition.

        if (this.windowGroup.transitionCount === 0) {
          this.windowGroup.transitionHeight = undefined;
        }
      }
    },

    onBeforeTransition() {
      if (this.inTransition) {
        return;
      } // Initialize transition state here.


      this.inTransition = true;

      if (this.windowGroup.transitionCount === 0) {
        // Set initial height for height transition.
        this.windowGroup.transitionHeight = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* convertToUnit */ "g"])(this.windowGroup.$el.clientHeight);
      }

      this.windowGroup.transitionCount++;
    },

    onTransitionCancelled() {
      this.onAfterTransition(); // This should have the same path as normal transition end.
    },

    onEnter(el) {
      if (!this.inTransition) {
        return;
      }

      this.$nextTick(() => {
        // Do not set height if no transition or cancelled.
        if (!this.computedTransition || !this.inTransition) {
          return;
        } // Set transition target height.


        this.windowGroup.transitionHeight = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* convertToUnit */ "g"])(el.clientHeight);
      });
    }

  },

  render(h) {
    return h('transition', {
      props: {
        name: this.computedTransition
      },
      on: {
        // Handlers for enter windows.
        beforeEnter: this.onBeforeTransition,
        afterEnter: this.onAfterTransition,
        enterCancelled: this.onTransitionCancelled,
        // Handlers for leave windows.
        beforeLeave: this.onBeforeTransition,
        afterLeave: this.onAfterTransition,
        leaveCancelled: this.onTransitionCancelled,
        // Enter handler for height transition.
        enter: this.onEnter
      }
    }, this.showLazyContent(() => [this.genWindowItem()]));
  }

}));

/***/ }),

/***/ 277:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


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

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ListaCategorias.vue?vue&type=template&id=676b777a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div class=\"titulos\" data-v-676b777a><b class=\"titulo-text\" data-v-676b777a>"+_vm._ssrEscape(_vm._s(_vm.seccion.nombre)+" / ")+"</b> <b class=\"titulo-text categoria-text\" data-v-676b777a>"+_vm._ssrEscape("\n            "+_vm._s(_vm.categoriaSeleccionada.nombre)+"\n        ")+"</b></div> "),_c('v-dialog',{attrs:{"scrollable":"","max-width":"300px"},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-card',[_c('v-card-title',[_vm._v("Categorias: "+_vm._s(_vm.seccion.nombre))]),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-card-text',{staticStyle:{"height":"300px"}},_vm._l((_vm.categorias),function(categoria,index){return _c('div',{key:index,staticClass:"mt-1"},[_c('v-btn',{staticClass:"ma-2 white--text",attrs:{"color":"#683bce","block":"","disabled":_vm.categoriaSeleccionada.uid == categoria.uid},on:{"click":function($event){return _vm.seleccionarCategoria(categoria)},"mouseover":function($event){_vm.hoverCategoria = categoria.uid},"mouseleave":function($event){_vm.hoverCategoria = null}}},[(_vm.hoverCategoria === categoria.uid)?_c('v-icon',{staticClass:"mr-2",attrs:{"right":"","dark":""}},[_vm._v("\n                            mdi-check\n                        ")]):_vm._e(),_vm._v(" "),_c('p',{staticClass:"textoBotonLista"},[_vm._v("\n                            "+_vm._s(categoria.nombre)+"\n                        ")])],1)],1)}),0),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-card-actions',{staticClass:"justify-center"})],1)],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/ListaCategorias.vue?vue&type=template&id=676b777a&scoped=true&

// EXTERNAL MODULE: ./helpers/informacionSecciones.js
var informacionSecciones = __webpack_require__(251);

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
var installComponents = __webpack_require__(9);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(347);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(72);

// CONCATENATED MODULE: ./components/ListaCategorias.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(335)
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









installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardText: components_VCard["c" /* VCardText */],VCardTitle: components_VCard["d" /* VCardTitle */],VDialog: VDialog["a" /* default */],VDivider: VDivider["a" /* default */],VIcon: VIcon["a" /* default */]})


/***/ }),

/***/ 287:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(277);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaCategorias_vue_vue_type_style_index_0_id_676b777a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

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

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(259);
/* harmony import */ var _src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VDialog_VDialog_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VThemeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(244);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90);
/* harmony import */ var _mixins_overlayable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92);
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(91);
/* harmony import */ var _mixins_stackable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(89);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
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
    ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]
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
      if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* keyCodes */ "t"].esc && !this.getOpenDependents().length) {
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
          maxWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* convertToUnit */ "g"])(this.maxWidth),
          width: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_12__[/* convertToUnit */ "g"])(this.width)
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

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaBlogs_vue_vue_type_style_index_0_id_374106cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(287);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaBlogs_vue_vue_type_style_index_0_id_374106cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaBlogs_vue_vue_type_style_index_0_id_374106cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaBlogs_vue_vue_type_style_index_0_id_374106cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListaBlogs_vue_vue_type_style_index_0_id_374106cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 356:
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ListaBlogs.vue?vue&type=template&id=374106cc&scoped=true&
var ListaBlogsvue_type_template_id_374106cc_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"newMovies mt-10 mb-10"},[_vm._ssrNode("<div data-v-374106cc>","</div>",[_c('client-only',[_c('ListaCategorias',{attrs:{"seccion":_vm.seccion},on:{"categoriaSeleccionada":function($event){_vm.categoria = $event}}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.mostrarCarga),expression:"mostrarCarga"}],staticClass:"mt-5 mb-5",attrs:{"id":"loadingMovie"}},[_c('Spinner')],1),_vm._v(" "),(!_vm.mostrarCarga && _vm.categoria.uid && _vm.listaDatosBlogs.length)?_c('div',{staticClass:"custom-carousel mt-5 mb-5"},[_c('v-carousel',{attrs:{"hide-delimiters":"","height":"auto"}},_vm._l((_vm.listaDatosBlogs),function(dato,i){return _c('v-carousel-item',{key:i},[_c('v-card',{staticClass:"carta-blog mx-auto mt-5 mb-5",attrs:{"max-width":"700"}},[_c('v-card-text',[_c('div',[_vm._v("Jekuaapy blog")]),_vm._v(" "),_c('p',{staticClass:"text-h4 text--primary"},[_vm._v("\n                  "+_vm._s(dato.blog.titulo)+"\n                ")]),_vm._v(" "),_c('div',{staticClass:"text--primary"},[_vm._v("\n                  "+_vm._s(dato.blog.descripcion)+"\n                ")]),_vm._v(" "),(dato.publicador.nombreUsuario)?_c('div',{staticClass:"mt-3"},[_c('nuxt-link',{attrs:{"to":("/estudiante/" + (dato.publicador.nombreUsuario))}},[_c('v-avatar',{attrs:{"color":"#ffffff"}},[(!!dato.publicador.fotoPerfil)?_c('v-img',{staticClass:"elevation-6",attrs:{"alt":"","src":dato.publicador.fotoPerfil}}):_c('span',{staticClass:"headline inicialNombreUsuario"},[_vm._v("\n                        "+_vm._s(_vm.inicialNombreUsuario(dato.publicador.nombreUsuario))+"\n                      ")])],1),_vm._v(" "),_c('b',{staticClass:"ml-3"},[_vm._v("\n                      "+_vm._s(dato.publicador.nombreUsuario)+" \n                    ")])],1)],1):_c('span',{staticClass:"headline inicialNombreUsuario"},[_vm._v("\n                  ...\n                ")])]),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{attrs:{"text":"","color":"#ff1d89"},on:{"click":function($event){return _vm.mostrarDatosBlog(i)}}},[_vm._v("\n                  Ver información\n                ")]),_vm._v(" "),_c('v-btn',{attrs:{"text":"","color":"#683bce","to":("/blog/" + (dato.blog.referencia))}},[_vm._v("\n                  Ver blog\n                ")])],1)],1)],1)}),1)],1):_vm._e(),_vm._v(" "),_c('v-dialog',{attrs:{"max-width":"800px"},model:{value:(_vm.dialogDatosBlog),callback:function ($$v) {_vm.dialogDatosBlog=$$v},expression:"dialogDatosBlog"}},[(_vm.datosBlog)?_c('v-card',[_c('v-img',{staticClass:"white--text",attrs:{"src":__webpack_require__(262)("./" + (_vm.datosBlog.blog.seccion ? _vm.datosBlog.blog.seccion : 'sinSeccion') + ".webp"),"height":"200px"}},[_c('v-card-title',[_c('span',[_vm._v("\n                "+_vm._s(_vm.datosBlog.blog.titulo)+"\n              ")]),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"icon":"","color":"white"},on:{"click":function($event){_vm.dialogDatosBlog = false}}},[_c('v-icon',[_vm._v("\n                  mdi-close\n                ")])],1)],1)],1),_vm._v(" "),_c('v-card-title',[_vm._v("\n            "+_vm._s(_vm.datosBlog.blog.titulo)+"\n          ")]),_vm._v(" "),_c('v-card-subtitle',[_vm._v("\n            "+_vm._s(_vm.datosBlog.blog.cantidadMeGusta)+" me gusta\n          ")]),_vm._v(" "),_c('v-card-text',[_c('div',{},[_c('v-row',{staticClass:"mb-6",attrs:{"no-gutters":""}},[_c('v-col',{attrs:{"lg":"8","md":"8"}},[_c('div',{staticClass:"mt-4 pb-3"},[_vm._v("\n                    "+_vm._s(_vm.datosBlog.blog.descripcion)+"\n                  ")]),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('div',{staticClass:"mt-5",staticStyle:{"display":"block"}},[_c('b',[_vm._v("Fecha creación: ")]),_vm._v(" "+_vm._s(_vm.timeAgo( _vm.datosBlog.blog.fechaCreacion ))+"\n                  ")]),_vm._v(" "),_c('div',{staticStyle:{"display":"block"}},[_c('b',[_vm._v("Fecha actualización: ")]),_vm._v(" "+_vm._s(_vm.timeAgo( _vm.datosBlog.blog.fechaActualizacion ))+"\n                  ")])],1),_vm._v(" "),_c('v-col',[_c('div',[_c('v-card-text',[_vm._v("\n                      Sección: "),_c('nuxt-link',{staticClass:"link-detalle",attrs:{"to":("/blogs/" + (_vm.seccion.uid))}},[_vm._v(" "+_vm._s(_vm.seccion.nombre)+" ")])],1),_vm._v(" "),_c('v-card-text',[_vm._v("\n                      Categoria: "),_c('nuxt-link',{staticClass:"link-detalle",attrs:{"to":("/blogs/" + (_vm.seccion.uid) + "/" + (_vm.categoria.uid))}},[_vm._v(" "+_vm._s(_vm.categoria.nombre)+" ")])],1),_vm._v(" "),_c('v-card-text',[_vm._v("\n                      Sub-categorias: "),_vm._l((_vm.datosBlog.blog.subCategorias),function(subCategoria,index){return _c('div',{key:index,staticStyle:{"display":"inline"}},[(index < _vm.datosBlog.blog.subCategorias.length - 1)?_c('nuxt-link',{staticClass:"link-detalle",attrs:{"to":("/blogs/" + (_vm.seccion.uid) + "/" + (_vm.categoria.uid) + "/" + subCategoria)}},[_vm._v("\n                          "+_vm._s(subCategoria)+", \n                        ")]):_c('nuxt-link',{staticClass:"link-detalle",attrs:{"to":("/blogs/" + (_vm.seccion.uid) + "/" + (_vm.categoria.uid) + "/" + subCategoria)}},[_vm._v("\n                          "+_vm._s(subCategoria)+"\n                        ")])],1)})],2)],1)])],1)],1)]),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"#683bce","text":"","to":("/blog/" + (_vm.datosBlog.blog.referencia))}},[_vm._v("\n              Ver blog\n            ")])],1)],1):_vm._e()],1)],1)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/ListaBlogs.vue?vue&type=template&id=374106cc&scoped=true&

// EXTERNAL MODULE: ./components/ListaCategorias.vue + 4 modules
var ListaCategorias = __webpack_require__(285);

// EXTERNAL MODULE: external "javascript-time-ago"
var external_javascript_time_ago_ = __webpack_require__(210);
var external_javascript_time_ago_default = /*#__PURE__*/__webpack_require__.n(external_javascript_time_ago_);

// EXTERNAL MODULE: external "javascript-time-ago/locale/es.json"
var es_json_ = __webpack_require__(211);
var es_json_default = /*#__PURE__*/__webpack_require__.n(es_json_);

// EXTERNAL MODULE: ./components/Spinner.vue + 4 modules
var Spinner = __webpack_require__(115);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ListaBlogs.vue?vue&type=script&lang=js&
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
//
//



external_javascript_time_ago_default.a.addLocale(es_json_default.a);
external_javascript_time_ago_default.a.setDefaultLocale('es');

/* harmony default export */ var ListaBlogsvue_type_script_lang_js_ = ({
  name: 'ListaBlogs',

  data() {
    return {
      listaDatosBlogs: [],
      mostrarCarga: true,
      paginationButtons: false,
      cantidadBlogs: 5,
      categoria: {
        uid: '',
        nombre: ''
      },
      dialogDatosBlog: false,
      datosBlog: null
    };
  },

  props: {
    seccion: Object
  },
  components: {
    Spinner: Spinner["default"],
    ListaCategorias: ListaCategorias["default"]
  },
  methods: {
    mostrarDatosBlog(index) {
      this.dialogDatosBlog = true;
      this.datosBlog = this.listaDatosBlogs[index];
    },

    timeAgo(timestamp) {
      const ta = new external_javascript_time_ago_default.a('es-ES');
      const taResult = ta.format(timestamp._seconds * 1000);
      return taResult;
    },

    inicialNombreUsuario(nombreUsuario) {
      return nombreUsuario ? nombreUsuario[0].toUpperCase() : '';
    }

  },
  computed: {
    listarSubCategorias: function () {
      const subCategorias = this.datosBlog.blog.subCategorias;
      let lista = '';

      for (let i = 0; i < subCategorias.length; i++) {
        const element = subCategorias[i];
        lista += `${element}`;

        if (i < subCategorias.length - 1) {
          lista += `, `;
        }
      }

      return lista;
    }
  },
  watch: {
    dialogDatosBlog: function (nuevo, viejo) {
      if (!nuevo) {
        this.datosBlog = null;
      }
    },
    categoria: async function (nuevo, viejo) {
      if (nuevo.uid === viejo.uid) return;

      try {
        this.mostrarCarga = true;
        let body = {
          seccion: this.seccion.uid,
          categoria: this.categoria.uid,
          cantidad: this.cantidadBlogs
        };
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        let response = await this.$axios.post('/blog/estudiante/listaBlogsPorMG', body, config);
        const listaDatosBlogs = response.data.resultado;
        let listaAux = [];

        for (let i = 0; i < listaDatosBlogs.length; i++) {
          const datosBlog = listaDatosBlogs[i];
          listaAux.push({
            blog: datosBlog,
            publicador: {
              fotoPerfil: '',
              nombreUsuario: ''
            }
          });
        }

        this.listaDatosBlogs = listaAux;
      } catch (error) {
        console.error(error);
        const accion = await this.$store.dispatch('modules/sistema/errorHandler', error);
      } finally {
        this.mostrarCarga = false;
      }
    },
    listaDatosBlogs: async function (n, v) {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      for (let i = 0; i < n.length; i++) {
        const infoBlog = n[i];
        const body = {
          uid: infoBlog.blog.publicador
        };
        const response = await this.$axios.post('/usuarios/estudiante/authUsuario', body, config);
        this.listaDatosBlogs[i].publicador.nombreUsuario = response.data.resultado.displayName;
        this.listaDatosBlogs[i].publicador.fotoPerfil = response.data.resultado.photoURL;
      }
    }
  },

  async mounted() {}

});
// CONCATENATED MODULE: ./components/ListaBlogs.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ListaBlogsvue_type_script_lang_js_ = (ListaBlogsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(9);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VAvatar/VAvatar.js
var VAvatar = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VCarousel/VCarousel.sass
var VCarousel = __webpack_require__(356);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VWindow/VWindow.js
var VWindow = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/index.js
var components_VBtn = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/index.js
var VIcon = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VProgressLinear/index.js + 1 modules
var VProgressLinear = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/button-group/index.js
var button_group = __webpack_require__(336);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/console.js
var util_console = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VCarousel/VCarousel.js
// Styles
 // Extensions

 // Components



 // Mixins
// TODO: Move this into core components v2.0

 // Utilities



/* harmony default export */ var VCarousel_VCarousel = (VWindow["a" /* default */].extend({
  name: 'v-carousel',
  props: {
    continuous: {
      type: Boolean,
      default: true
    },
    cycle: Boolean,
    delimiterIcon: {
      type: String,
      default: '$delimiter'
    },
    height: {
      type: [Number, String],
      default: 500
    },
    hideDelimiters: Boolean,
    hideDelimiterBackground: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: value => value > 0
    },
    mandatory: {
      type: Boolean,
      default: true
    },
    progress: Boolean,
    progressColor: String,
    showArrows: {
      type: Boolean,
      default: true
    },
    verticalDelimiters: {
      type: String,
      default: undefined
    }
  },

  // pass down the parent's theme
  provide() {
    return {
      parentTheme: this.theme
    };
  },

  data() {
    return {
      internalHeight: this.height,
      slideTimeout: undefined
    };
  },

  computed: {
    classes() {
      return { ...VWindow["a" /* default */].options.computed.classes.call(this),
        'v-carousel': true,
        'v-carousel--hide-delimiter-background': this.hideDelimiterBackground,
        'v-carousel--vertical-delimiters': this.isVertical
      };
    },

    isDark() {
      return this.dark || !this.light;
    },

    isVertical() {
      return this.verticalDelimiters != null;
    }

  },
  watch: {
    internalValue: 'restartTimeout',
    interval: 'restartTimeout',

    height(val, oldVal) {
      if (val === oldVal || !val) return;
      this.internalHeight = val;
    },

    cycle(val) {
      if (val) {
        this.restartTimeout();
      } else {
        clearTimeout(this.slideTimeout);
        this.slideTimeout = undefined;
      }
    }

  },

  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('hide-controls')) {
      Object(util_console["a" /* breaking */])('hide-controls', ':show-arrows="false"', this);
    }
  },

  mounted() {
    this.startTimeout();
  },

  methods: {
    genControlIcons() {
      if (this.isVertical) return null;
      return VWindow["a" /* default */].options.methods.genControlIcons.call(this);
    },

    genDelimiters() {
      return this.$createElement('div', {
        staticClass: 'v-carousel__controls',
        style: {
          left: this.verticalDelimiters === 'left' && this.isVertical ? 0 : 'auto',
          right: this.verticalDelimiters === 'right' ? 0 : 'auto'
        }
      }, [this.genItems()]);
    },

    genItems() {
      const length = this.items.length;
      const children = [];

      for (let i = 0; i < length; i++) {
        const child = this.$createElement(components_VBtn["a" /* default */], {
          staticClass: 'v-carousel__controls__item',
          attrs: {
            'aria-label': this.$vuetify.lang.t('$vuetify.carousel.ariaLabel.delimiter', i + 1, length)
          },
          props: {
            icon: true,
            small: true,
            value: this.getValue(this.items[i], i)
          }
        }, [this.$createElement(VIcon["a" /* default */], {
          props: {
            size: 18
          }
        }, this.delimiterIcon)]);
        children.push(child);
      }

      return this.$createElement(button_group["a" /* default */], {
        props: {
          value: this.internalValue,
          mandatory: this.mandatory
        },
        on: {
          change: val => {
            this.internalValue = val;
          }
        }
      }, children);
    },

    genProgress() {
      return this.$createElement(VProgressLinear["a" /* default */], {
        staticClass: 'v-carousel__progress',
        props: {
          color: this.progressColor,
          value: (this.internalIndex + 1) / this.items.length * 100
        }
      });
    },

    restartTimeout() {
      this.slideTimeout && clearTimeout(this.slideTimeout);
      this.slideTimeout = undefined;
      window.requestAnimationFrame(this.startTimeout);
    },

    startTimeout() {
      if (!this.cycle) return;
      this.slideTimeout = window.setTimeout(this.next, +this.interval > 0 ? +this.interval : 6000);
    }

  },

  render(h) {
    const render = VWindow["a" /* default */].options.render.call(this, h);
    render.data.style = `height: ${Object(helpers["g" /* convertToUnit */])(this.height)};`;
    /* istanbul ignore else */

    if (!this.hideDelimiters) {
      render.children.push(this.genDelimiters());
    }
    /* istanbul ignore else */


    if (this.progress || this.progressColor) {
      render.children.push(this.genProgress());
    }

    return render;
  }

}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VWindow/VWindowItem.js
var VWindowItem = __webpack_require__(263);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VImg/VImg.js
var VImg = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/routable/index.js
var routable = __webpack_require__(15);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VCarousel/VCarouselItem.js
// Extensions
 // Components

 // Utilities



 // Types

const baseMixins = Object(mixins["a" /* default */])(VWindowItem["a" /* default */], routable["a" /* default */]);
/* @vue/component */

/* harmony default export */ var VCarouselItem = (baseMixins.extend().extend({
  name: 'v-carousel-item',
  inject: {
    parentTheme: {
      default: {
        isDark: false
      }
    }
  },

  // pass down the parent's theme
  provide() {
    return {
      theme: this.parentTheme
    };
  },

  inheritAttrs: false,
  methods: {
    genDefaultSlot() {
      return [this.$createElement(VImg["a" /* default */], {
        staticClass: 'v-carousel__item',
        props: { ...this.$attrs,
          height: this.windowGroup.internalHeight
        },
        on: this.$listeners,
        scopedSlots: {
          placeholder: this.$scopedSlots.placeholder
        }
      }, Object(helpers["p" /* getSlot */])(this))];
    },

    genWindowItem() {
      const {
        tag,
        data
      } = this.generateRouteLink();
      data.staticClass = 'v-window-item';
      data.directives.push({
        name: 'show',
        value: this.isActive
      });
      return this.$createElement(tag, data, this.genDefaultSlot());
    }

  }
}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(256);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
var VDialog = __webpack_require__(347);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon_VIcon = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(257);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(242);

// CONCATENATED MODULE: ./components/ListaBlogs.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(355)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ListaBlogsvue_type_script_lang_js_,
  ListaBlogsvue_type_template_id_374106cc_scoped_true_render,
  staticRenderFns,
  false,
  injectStyles,
  "374106cc",
  "657887e2"
  
)

/* harmony default export */ var ListaBlogs = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents_default()(component, {ListaCategorias: __webpack_require__(285).default,Spinner: __webpack_require__(115).default})


/* vuetify-loader */

















installComponents_default()(component, {VAvatar: VAvatar["a" /* default */],VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCardSubtitle: components_VCard["b" /* VCardSubtitle */],VCardText: components_VCard["c" /* VCardText */],VCardTitle: components_VCard["d" /* VCardTitle */],VCarousel: VCarousel_VCarousel,VCarouselItem: VCarouselItem,VCol: VCol["a" /* default */],VDialog: VDialog["a" /* default */],VDivider: VDivider["a" /* default */],VIcon: VIcon_VIcon["a" /* default */],VImg: VImg["a" /* default */],VRow: VRow["a" /* default */],VSpacer: VSpacer["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=lista-blogs.js.map