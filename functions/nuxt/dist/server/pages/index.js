exports.ids = [1];
exports.modules = {

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(204);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("33e76c04", content, true, context)
};

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/FirebaseUI.vue?vue&type=template&id=3a4046aa&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div id=\"firebaseui-auth-container\"></div>\n  I am here\n")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/FirebaseUI.vue?vue&type=template&id=3a4046aa&

// EXTERNAL MODULE: ./plugins/firebase.js + 3 modules
var firebase = __webpack_require__(28);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/FirebaseUI.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var FirebaseUIvue_type_script_lang_js_ = ({
  name: 'FirebaseUI',

  mounted() {
    if (false) {}
  },

  methods: {
    signInResult() {
      this.openAppPage();
      return false;
    },

    openAppPage() {
      this.$router.push({
        path: '/seller/products/create'
      });
    }

  }
});
// CONCATENATED MODULE: ./components/FirebaseUI.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FirebaseUIvue_type_script_lang_js_ = (FirebaseUIvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// CONCATENATED MODULE: ./components/FirebaseUI.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_FirebaseUIvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "371dc143"
  
)

/* harmony default export */ var FirebaseUI = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15548240_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(185);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15548240_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15548240_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15548240_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_15548240_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".message[data-v-15548240]{text-align:center;padding-top:40px}.cta-message[data-v-15548240]{text-align:center;padding-top:80px}.login-container[data-v-15548240]{margin:0 auto;min-height:100vh;flex-direction:column;display:flex;justify-content:center;align-items:center}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SocialHead.vue?vue&type=template&id=51b6d8c6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (false)?undefined:_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/SocialHead.vue?vue&type=template&id=51b6d8c6&

// EXTERNAL MODULE: external "core-js/modules/es.symbol.description.js"
var es_symbol_description_js_ = __webpack_require__(58);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SocialHead.vue?vue&type=script&lang=js&

//
//
//
//
// Test on: https://cards-dev.twitter.com/validator
// Test on: https://developers.facebook.com/tools/debug/
/* harmony default export */ var SocialHeadvue_type_script_lang_js_ = ({
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://nuxtjs.org/nuxt-card.png'
    }
  },

  head() {
    return {
      meta: [{
        hid: 'twitter:title',
        name: 'twitter:title',
        content: this.title
      }, {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: this.description
      }, {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: this.image
      }, {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: this.title
      }, {
        hid: 'og:title',
        property: 'og:title',
        content: this.title
      }, {
        hid: 'og:description',
        property: 'og:description',
        content: this.description
      }, {
        hid: 'og:image',
        property: 'og:image',
        content: this.image
      }, {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: this.image
      }, {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: this.title
      }]
    };
  }

});
// CONCATENATED MODULE: ./components/SocialHead.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SocialHeadvue_type_script_lang_js_ = (SocialHeadvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// CONCATENATED MODULE: ./components/SocialHead.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SocialHeadvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "3468ac55"
  
)

/* harmony default export */ var SocialHead = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=15548240&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"login-container"},[_vm._ssrNode("<div class=\"display-1\" data-v-15548240>Thimbly</div> "),_c('SocialHead',{attrs:{"title":_vm.landing.title,"description":_vm.landing.description}}),_vm._ssrNode(" <div class=\"message mx-10\" data-v-15548240>\n    Fastest way for artists and makers to start selling their products.\n  </div> <div class=\"cta-message mx-10\" data-v-15548240>Login to create your first product page</div> "),_c('client-only',{attrs:{"placeholder":"Loading..."}},[_c('firebase-ui',{ref:"firebaseui"})],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=15548240&scoped=true&

// EXTERNAL MODULE: ./components/FirebaseUI.vue + 4 modules
var FirebaseUI = __webpack_require__(186);

// EXTERNAL MODULE: external "firebase"
var external_firebase_ = __webpack_require__(57);

// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__(23);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_js_ = ({
  layout: 'loggedout_default',
  components: {
    FirebaseUI: FirebaseUI["default"]
  },

  data() {
    return {
      landing: {
        title: 'Welcome to Thimbly',
        description: 'Fastest way for artists and makers to start selling their products.'
      }
    };
  },

  mounted() {
    this.initClientOnlyComp();
  },

  methods: {
    initClientOnlyComp(count = 10) {
      this.$nextTick(() => {
        if (this.$refs.firebaseui) {
          //...
          console.log('here');
        } else if (count > 0) {
          this.initClientOnlyComp(count - 1);
        }
      });
    }

  }
});
// CONCATENATED MODULE: ./pages/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pagesvue_type_script_lang_js_ = (lib_vue_loader_options_pagesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// CONCATENATED MODULE: ./pages/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(203)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pagesvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "15548240",
  "59761894"
  
)

/* harmony default export */ var pages = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {SocialHead: __webpack_require__(205).default,FirebaseUi: __webpack_require__(186).default})


/***/ })

};;
//# sourceMappingURL=index.js.map