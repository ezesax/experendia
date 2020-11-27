(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/auth/Login.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/auth/Login.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_Token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/Token */ "./resources/js/config/Token.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Login",
  data: function data() {
    return {
      credentials: {
        email: undefined,
        password: undefined,
        remember_me: false
      },
      submit: false,
      valid: true,
      errors: undefined,
      passwordRules: [function (v) {
        return !!v || "Contraseña es requerida";
      }, function (v) {
        return v && v.length >= 6 || "Contraseña debe tener minimo 6 caracteres";
      }],
      emailRules: [function (v) {
        return !!v || "E-mail es requerido";
      }, function (v) {
        return /.+@.+\..+/.test(v) || "E-mail debe ser valido";
      }],
      lazy: false
    };
  },
  mounted: function mounted() {
    console.log(this.$api);
  },
  methods: {
    validate: function validate() {
      var _this = this;

      var valid = this.$refs.form.validate();

      if (valid && !this.submit) {
        this.submit = true;
        this.$api.request.post("/auth/login", this.credentials).then( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(res) {
            var data, redirect;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    data = res.data;
                    console.log(data);

                    _this.storageData(data.user);

                    _context.next = 5;
                    return _config_Token__WEBPACK_IMPORTED_MODULE_1__["default"].set(data.token);

                  case 5:
                    _context.next = 7;
                    return _this.$store.dispatch("loadUser");

                  case 7:
                    _context.next = 9;
                    return _this.createLog();

                  case 9:
                    redirect = _this.$route.query.redirect;

                    _this.$router.push(redirect || "/", function () {
                      window.location.reload();
                    });

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }())["catch"](function (reason) {
          return _this.errors = reason.error;
        })["finally"](function () {
          return _this.submit = false;
        });
      }
    },
    storageData: function storageData(user) {
      localStorage.userEmail = user.email;
      localStorage.userFirstname = user.profile.firstname;
      localStorage.userLastname = user.profile.lastname;
      localStorage.userPublic = user.profile["public"];
    },
    createLog: function createLog() {
      var data = {
        device: 1,
        useragent: navigator.userAgent,
        action: 'login'
      };
      this.$api.request.post("/logs/create_user_access_log", data).then( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(res) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  console.log(res);
                  localStorage.login = true;

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }())["catch"](function (err) {
        console.log(err);
      });
    },
    reset: function reset() {
      this.$refs.form.reset();
    },
    resetValidation: function resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/auth/Login.vue?vue&type=template&id=42c42d6a&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/auth/Login.vue?vue&type=template&id=42c42d6a&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c(
        "v-content",
        { staticClass: "primary" },
        [
          _c(
            "v-container",
            { staticClass: "fill-height" },
            [
              _c(
                "v-row",
                { attrs: { justify: "center", align: "center" } },
                [
                  _c(
                    "v-col",
                    { attrs: { sm: "6" } },
                    [
                      _c(
                        "v-card",
                        { attrs: { color: "light" } },
                        [
                          _c(
                            "v-form",
                            {
                              ref: "form",
                              staticClass: "pa-8",
                              attrs: { "lazy-validation": _vm.lazy },
                              model: {
                                value: _vm.valid,
                                callback: function($$v) {
                                  _vm.valid = $$v
                                },
                                expression: "valid"
                              }
                            },
                            [
                              _c(
                                "v-card-title",
                                { staticClass: "justify-center" },
                                [_vm._v("EXPERENDIA")]
                              ),
                              _vm._v(" "),
                              _vm.errors
                                ? _c(
                                    "v-alert",
                                    {
                                      attrs: {
                                        type: "error",
                                        icon: "fa-exclamation",
                                        border: "left",
                                        prominent: "",
                                        dismissible: ""
                                      }
                                    },
                                    [
                                      _c("h4", [
                                        _vm._v(_vm._s(_vm.errors.title))
                                      ]),
                                      _vm._v(" "),
                                      _c("v-divider"),
                                      _vm._v(" "),
                                      _vm._l(_vm.errors.msg, function(
                                        error,
                                        i
                                      ) {
                                        return _c("p", { key: i }, [
                                          _vm._v(
                                            "\n                                    " +
                                              _vm._s(error) +
                                              "\n                                "
                                          )
                                        ])
                                      })
                                    ],
                                    2
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c("v-text-field", {
                                attrs: {
                                  rules: _vm.emailRules,
                                  label: "Email",
                                  "aria-autocomplete": "false",
                                  required: ""
                                },
                                model: {
                                  value: _vm.credentials.email,
                                  callback: function($$v) {
                                    _vm.$set(_vm.credentials, "email", $$v)
                                  },
                                  expression: "credentials.email"
                                }
                              }),
                              _vm._v(" "),
                              _c("v-text-field", {
                                attrs: {
                                  type: "password",
                                  rules: _vm.passwordRules,
                                  label: "Password",
                                  "aria-autocomplete": "false",
                                  required: ""
                                },
                                model: {
                                  value: _vm.credentials.password,
                                  callback: function($$v) {
                                    _vm.$set(_vm.credentials, "password", $$v)
                                  },
                                  expression: "credentials.password"
                                }
                              }),
                              _vm._v(" "),
                              _c("v-checkbox", {
                                attrs: { label: "Recuerdame" },
                                model: {
                                  value: _vm.credentials.remember_me,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.credentials,
                                      "remember_me",
                                      $$v
                                    )
                                  },
                                  expression: "credentials.remember_me"
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "v-row",
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "mx-auto px-12",
                                      attrs: {
                                        large: "",
                                        disabled: !_vm.valid || _vm.submit,
                                        color: "success"
                                      },
                                      on: { click: _vm.validate }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    Ingresar\n                                "
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/auth/Login.vue":
/*!*******************************************!*\
  !*** ./resources/js/pages/auth/Login.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_42c42d6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=42c42d6a&scoped=true& */ "./resources/js/pages/auth/Login.vue?vue&type=template&id=42c42d6a&scoped=true&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/pages/auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_42c42d6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_42c42d6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "42c42d6a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/auth/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/auth/Login.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/pages/auth/Login.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/auth/Login.vue?vue&type=template&id=42c42d6a&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./resources/js/pages/auth/Login.vue?vue&type=template&id=42c42d6a&scoped=true& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_42c42d6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=42c42d6a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/auth/Login.vue?vue&type=template&id=42c42d6a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_42c42d6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_42c42d6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=5.js.map