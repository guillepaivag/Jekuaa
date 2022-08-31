exports.ids = [29];
exports.modules = {

/***/ 291:
/***/ (function(module, exports) {

// Exports
module.exports = {
	"video-js-responsive-container": "xYT4DtgQGrW-AOdJUVYJjw==",
	"vjs-hd": "zkguybiCwAIgmsadKgmjZA==",
	"vjs-sd": "LIOZArpyFZeAU6KO1PhyKg==",
	"video-js": "OvG5zg2ip-KjjBdNeK0-kg=="
};


/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualizadorVideo_vue_vue_type_style_index_0_id_590e079e_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(291);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualizadorVideo_vue_vue_type_style_index_0_id_590e079e_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualizadorVideo_vue_vue_type_style_index_0_id_590e079e_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualizadorVideo_vue_vue_type_style_index_0_id_590e079e_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VisualizadorVideo_vue_vue_type_style_index_0_id_590e079e_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos/VisualizadorVideo.vue?vue&type=template&id=590e079e&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "video-js-responsive-container vjs-hd"
  }, [_vm._ssrNode("<video id=\"my-video\" controls=\"controls\" poster=\"MY_VIDEO_POSTER.jpg\" data-setup=\"{ \"aspectRatio\":\"16:9\", \"playbackRates\": [1, 1.5, 2] }\" class=\"video-js vjs-theme-forest\" data-v-590e079e><p class=\"vjs-no-js\" data-v-590e079e>\n        To view this video please enable JavaScript, and consider upgrading to a\n        web browser that\n        <a href=\"https://videojs.com/html5-video-support/\" target=\"_blank\" data-v-590e079e>supports HTML5 video</a></p></video>")]);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./components/cursos/VisualizadorVideo.vue?vue&type=template&id=590e079e&scoped=true&

// EXTERNAL MODULE: external "video.js"
var external_video_js_ = __webpack_require__(245);
var external_video_js_default = /*#__PURE__*/__webpack_require__.n(external_video_js_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/cursos/VisualizadorVideo.vue?vue&type=script&lang=js&

/* harmony default export */ var VisualizadorVideovue_type_script_lang_js_ = ({
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,

      default() {
        return {};
      }

    }
  },

  data() {
    return {
      player: null
    };
  },

  mounted() {
    this.player = external_video_js_default()(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this);
    });
  },

  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

});
// CONCATENATED MODULE: ./components/cursos/VisualizadorVideo.vue?vue&type=script&lang=js&
 /* harmony default export */ var cursos_VisualizadorVideovue_type_script_lang_js_ = (VisualizadorVideovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/cursos/VisualizadorVideo.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(301)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  cursos_VisualizadorVideovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "590e079e",
  "41f5d6c8"
  
)

/* harmony default export */ var VisualizadorVideo = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=cursos-visualizador-video.js.map