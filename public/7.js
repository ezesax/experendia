(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_Token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/Token */ "./resources/js/config/Token.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ForbiddenWords",
  data: function data() {
    var _ref;

    return _ref = {
      items: undefined,
      id: null,
      search: "",
      dialog: false
    }, _defineProperty(_ref, "search", ""), _defineProperty(_ref, "headers", [{
      text: 'Id',
      align: 'start',
      sortable: false,
      value: 'id'
    }, {
      text: 'Nombre',
      value: 'name'
    }, {
      text: 'Estado',
      value: 'status'
    }, {
      text: 'Fecha de creación',
      value: 'created_at'
    }, {
      text: '',
      value: 'edit'
    }]), _defineProperty(_ref, "footerProps", {
      'items-per-page-options': [25, 50, 100, 500, -1],
      'items-per-page': 25
    }), _defineProperty(_ref, "status_list", [{
      name: "Pendiente"
    }, {
      name: "Desactivado"
    }, {
      name: "Activo"
    }, {
      name: "Eliminado"
    }]), _defineProperty(_ref, "status_colors", {
      Pendiente: "warning--text",
      Desactivado: "accent--text",
      Activo: "primary--text",
      Eliminado: "error--text"
    }), _defineProperty(_ref, "name", null), _defineProperty(_ref, "description", null), _defineProperty(_ref, "status", null), _defineProperty(_ref, "alert", false), _defineProperty(_ref, "alertType", null), _defineProperty(_ref, "alertMsg", ''), _defineProperty(_ref, "action", ""), _ref;
  },
  mounted: function mounted() {
    _config_Token__WEBPACK_IMPORTED_MODULE_0__["default"].isExpired();
    this.getWords();
  },
  methods: {
    getWords: function getWords() {
      var _this = this;

      this.$api.request.get("/admin/forbidden_words").then(function (res) {
        _this.$data.items = _this.formatDates(res.data.response);
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    newWord: function newWord() {
      this.reset();
      this.$data.action = "Crear Palabra";
      this.$data.id = null;
      this.$data.dialog = true;
    },
    formatDates: function formatDates(data) {
      return data.filter(function (i) {
        var date = new Date(i.created_at);
        var createdAt = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        i.created_at = createdAt;
        return i;
      });
    },
    edit: function edit(word) {
      this.$data.action = "Editar Palabra";
      this.$data.name = word.name;
      this.$data.status = word.status;
      this.$data.id = word.id;
      this.$data.dialog = true;
    },
    save: function save() {
      var _this2 = this;

      var data = {
        name: this.$data.name,
        status: this.$data.status
      };

      if (this.$data.id) {
        this.$api.request.put("/admin/forbidden_words/".concat(this.$data.id), data).then(function (res) {
          if (data.status == 'Eliminado') _this2["delete"](_this2.$data.id);
          _this2.alertType = 'success';
          _this2.alertMsg = 'Palabra actualizada con exito';
          _this2.alert = true;
          setTimeout(function () {
            _this2.reset();

            _this2.getWords();

            _this2.alert = false;
            _this2.$data.dialog = false;
          }, 2000);
        })["catch"](function (reason) {
          _this2.alertType = 'error';
          _this2.alertMsg = 'Ha ocurrido un error inesperado';
          _this2.alert = true;
        });
      } else {
        this.$api.request.post("/admin/forbidden_words", data).then(function (res) {
          _this2.alertType = 'success';
          _this2.alertMsg = 'Palabra creada con exito';
          _this2.alert = true;
          setTimeout(function () {
            _this2.reset();

            _this2.getWords();

            _this2.alert = false;
            _this2.$data.dialog = false;
          }, 2000);
        })["catch"](function (reason) {
          _this2.alertType = 'error';
          _this2.alertMsg = 'Ha ocurrido un error inesperado';
          _this2.alert = true;
        });
      }
    },
    "delete": function _delete(id) {
      this.$api.request["delete"]("/admin/forbidden_words/".concat(id)).then(function (res) {
        console.log('Recurso eliminado');
      })["catch"](function (reason) {
        return console.log(reason.error);
      });
    },
    reset: function reset() {
      if (this.$refs.form) this.$refs.form.reset();
      this.$data.id = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=template&id=cdcc1814&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=template&id=cdcc1814& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    "v-row",
    { attrs: { justify: "center" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { width: "600" },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-alert",
                {
                  attrs: { type: _vm.alertType, dismissible: "" },
                  model: {
                    value: _vm.alert,
                    callback: function($$v) {
                      _vm.alert = $$v
                    },
                    expression: "alert"
                  }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.alertMsg) +
                      "\n            "
                  )
                ]
              ),
              _vm._v(" "),
              _c("v-card-title", [_vm._v(_vm._s(_vm.action))]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-form",
                    { ref: "form" },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.id,
                            expression: "id"
                          }
                        ],
                        attrs: { type: "hidden" },
                        domProps: { value: _vm.id },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.id = $event.target.value
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: { label: "Palabra", required: "" },
                        model: {
                          value: _vm.name,
                          callback: function($$v) {
                            _vm.name = $$v
                          },
                          expression: "name"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          items: _vm.status_list,
                          "item-text": "name",
                          "item-value": "name",
                          label: "Estatus",
                          required: ""
                        },
                        model: {
                          value: _vm.status,
                          callback: function($$v) {
                            _vm.status = $$v
                          },
                          expression: "status"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { color: "primary" }, on: { click: _vm.save } },
                    [_vm._v("Guardar")]
                  ),
                  _vm._v(" "),
                  _c("v-btn", { on: { click: _vm.reset } }, [_vm._v("Reset")])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-col",
        [
          _c(
            "v-card",
            { attrs: { elevation: "4" } },
            [
              _c(
                "v-toolbar",
                { attrs: { color: "primary", dark: "" } },
                [
                  _c("v-toolbar-title", [
                    _vm._v(
                      "\n                    Palabras Prohibidas\n                "
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { icon: "" }, on: { click: _vm.newWord } },
                    [_c("v-icon", [_vm._v("fa fa-plus")])],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card",
                [
                  _c("v-text-field", {
                    attrs: {
                      "append-icon": "fas fa-search",
                      label: "Buscar",
                      "single-line": "",
                      "hide-details": ""
                    },
                    model: {
                      value: _vm.search,
                      callback: function($$v) {
                        _vm.search = $$v
                      },
                      expression: "search"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("v-data-table", {
                staticClass: "elevation-1",
                attrs: {
                  headers: _vm.headers,
                  items: _vm.items,
                  "footer-props": _vm.footerProps,
                  search: _vm.search
                },
                scopedSlots: _vm._u([
                  {
                    key: "item.id",
                    fn: function(ref) {
                      var item = ref.item
                      return [_c("strong", [_vm._v(_vm._s(item.id))])]
                    }
                  },
                  {
                    key: "item.name",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.name) +
                            "\n                "
                        )
                      ]
                    }
                  },
                  {
                    key: "item.status",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _c(
                          "strong",
                          { class: _vm.status_colors["" + item.status] },
                          [_vm._v(_vm._s(item.status))]
                        )
                      ]
                    }
                  },
                  {
                    key: "item.created_at",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _c("strong", { staticClass: "info--text" }, [
                          _vm._v(_vm._s(item.created_at))
                        ])
                      ]
                    }
                  },
                  {
                    key: "item.edit",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              icon: "",
                              "x-small": "",
                              color: "warning"
                            },
                            on: {
                              click: function($event) {
                                return _vm.edit(item)
                              }
                            }
                          },
                          [_c("v-icon", [_vm._v("fa fa-pencil-alt")])],
                          1
                        )
                      ]
                    }
                  }
                ])
              })
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

/***/ "./resources/js/pages/forbiddenWords/ForbiddenWords.vue":
/*!**************************************************************!*\
  !*** ./resources/js/pages/forbiddenWords/ForbiddenWords.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ForbiddenWords_vue_vue_type_template_id_cdcc1814___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForbiddenWords.vue?vue&type=template&id=cdcc1814& */ "./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=template&id=cdcc1814&");
/* harmony import */ var _ForbiddenWords_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForbiddenWords.vue?vue&type=script&lang=js& */ "./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ForbiddenWords_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForbiddenWords_vue_vue_type_template_id_cdcc1814___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ForbiddenWords_vue_vue_type_template_id_cdcc1814___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/forbiddenWords/ForbiddenWords.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForbiddenWords_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForbiddenWords.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForbiddenWords_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=template&id=cdcc1814&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=template&id=cdcc1814& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForbiddenWords_vue_vue_type_template_id_cdcc1814___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForbiddenWords.vue?vue&type=template&id=cdcc1814& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/forbiddenWords/ForbiddenWords.vue?vue&type=template&id=cdcc1814&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForbiddenWords_vue_vue_type_template_id_cdcc1814___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForbiddenWords_vue_vue_type_template_id_cdcc1814___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=7.js.map