(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_Token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/Token */ "./resources/js/config/Token.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "MotivesDenounces",
  data: function data() {
    return {
      items: undefined,
      id: null,
      parent_id: null,
      search: "",
      dialog: false,
      motives_list: [],
      status_list: [{
        name: "Pendiente"
      }, {
        name: "Desactivado"
      }, {
        name: "Activo"
      }, {
        name: "Eliminado"
      }],
      status_colors: {
        Pendiente: "warning--text",
        Desactivado: "accent--text",
        Activo: "primary--text",
        Eliminado: "error--text"
      },
      name: null,
      description: null,
      status: null,
      alert: false,
      alertType: null,
      alertMsg: '',
      action: ""
    };
  },
  mounted: function mounted() {
    _config_Token__WEBPACK_IMPORTED_MODULE_0__["default"].isExpired();
    this.getMotives();
    this.getMotivesList();
  },
  methods: {
    getMotives: function getMotives() {
      var _this = this;

      this.$api.request.get("/admin/motives_denounces").then(function (res) {
        _this.$data.items = res.data.response;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    getMotivesList: function getMotivesList() {
      var _this2 = this;

      this.$api.request.get("/admin/motives_denounces/get_motives_denounces_list").then(function (res) {
        var data = [];
        var a = res.data.response;

        for (var key in a) {
          if (a.hasOwnProperty(key)) {
            var element = a[key];
            data.push({
              id: parseInt(key),
              name: element
            });
          }
        }

        _this2.$data.motives_list = data;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    newMotive: function newMotive() {
      this.reset();
      this.$data.action = "Crear Motivo de Denuncia";
      this.$data.id = null;
      this.$data.dialog = true;
    },
    edit: function edit(motive) {
      this.$data.action = "Editar Motivo de Denuncia";
      this.$data.name = motive.name;
      this.$data.parent_id = motive.parent_id;
      this.$data.status = motive.status;
      this.$data.id = motive.id;
      this.$data.description = motive.description;
      this.$data.dialog = true;
    },
    save: function save() {
      var _this3 = this;

      var data = {
        parent_id: this.$data.parent_id,
        name: this.$data.name,
        description: this.$data.description,
        status: this.$data.status
      };

      if (this.$data.id) {
        this.$api.request.put("/admin/motives_denounces/".concat(this.$data.id), data).then(function (res) {
          if (data.status == 'Eliminado') _this3["delete"](_this3.$data.id);
          _this3.alertType = 'success';
          _this3.alertMsg = 'Motivo actualizado con exito';
          _this3.alert = true;
          setTimeout(function () {
            _this3.reset();

            _this3.getMotives();

            _this3.getMotivesList();

            _this3.alert = false;
            _this3.$data.dialog = false;
          }, 2000);
        })["catch"](function (reason) {
          _this3.alertType = 'error';
          _this3.alertMsg = 'Ha ocurrido un error inesperado';
          _this3.alert = true;
        });
      } else {
        this.$api.request.post("/admin/motives_denounces", data).then(function (res) {
          _this3.alertType = 'success';
          _this3.alertMsg = 'Motivo creado con exito';
          _this3.alert = true;
          setTimeout(function () {
            _this3.reset();

            _this3.getMotives();

            _this3.getMotivesList();

            _this3.alert = false;
            _this3.$data.dialog = false;
          }, 2000);
        })["catch"](function (reason) {
          _this3.alertType = 'error';
          _this3.alertMsg = 'Ha ocurrido un error inesperado';
          _this3.alert = true;
        });
      }
    },
    "delete": function _delete(id) {
      this.$api.request["delete"]("/admin/motives_denounces/".concat(id)).then(function (res) {
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=template&id=2fd059d6&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=template&id=2fd059d6& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
                        attrs: { label: "Nombre", required: "" },
                        model: {
                          value: _vm.name,
                          callback: function($$v) {
                            _vm.name = $$v
                          },
                          expression: "name"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: { label: "Descripcion" },
                        model: {
                          value: _vm.description,
                          callback: function($$v) {
                            _vm.description = $$v
                          },
                          expression: "description"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-autocomplete", {
                        attrs: {
                          items: _vm.motives_list,
                          "item-text": "name",
                          "item-value": "id",
                          label: "Padre"
                        },
                        model: {
                          value: _vm.parent_id,
                          callback: function($$v) {
                            _vm.parent_id = $$v
                          },
                          expression: "parent_id"
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
                      "\n                    Motivos de Denuncia\n                "
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { icon: "" }, on: { click: _vm.newMotive } },
                    [_c("v-icon", [_vm._v("fa fa-plus")])],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-treeview", {
                attrs: {
                  items: _vm.items,
                  "open-on-click": "",
                  "expand-icon": ""
                },
                scopedSlots: _vm._u([
                  {
                    key: "prepend",
                    fn: function(ref) {
                      var item = ref.item
                      var open = ref.open
                      return [
                        item.children
                          ? _c("v-icon", { attrs: { size: "small" } }, [
                              _vm._v(
                                "\n                        fa fa-" +
                                  _vm._s(open ? "minus" : "plus") +
                                  "\n                    "
                              )
                            ])
                          : _vm._e()
                      ]
                    }
                  },
                  {
                    key: "label",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.name) +
                            "\n                    "
                        ),
                        _c(
                          "small",
                          { class: _vm.status_colors["" + item.status] },
                          [
                            _vm._v("\n                        ("),
                            _c("strong", [_vm._v(_vm._s(item.status))]),
                            _vm._v(")\n                    ")
                          ]
                        )
                      ]
                    }
                  },
                  {
                    key: "append",
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

/***/ "./resources/js/pages/motivesDenounces/MotivesDenounces.vue":
/*!******************************************************************!*\
  !*** ./resources/js/pages/motivesDenounces/MotivesDenounces.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MotivesDenounces_vue_vue_type_template_id_2fd059d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MotivesDenounces.vue?vue&type=template&id=2fd059d6& */ "./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=template&id=2fd059d6&");
/* harmony import */ var _MotivesDenounces_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MotivesDenounces.vue?vue&type=script&lang=js& */ "./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MotivesDenounces_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MotivesDenounces_vue_vue_type_template_id_2fd059d6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MotivesDenounces_vue_vue_type_template_id_2fd059d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/motivesDenounces/MotivesDenounces.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MotivesDenounces_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MotivesDenounces.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MotivesDenounces_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=template&id=2fd059d6&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=template&id=2fd059d6& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MotivesDenounces_vue_vue_type_template_id_2fd059d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MotivesDenounces.vue?vue&type=template&id=2fd059d6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/motivesDenounces/MotivesDenounces.vue?vue&type=template&id=2fd059d6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MotivesDenounces_vue_vue_type_template_id_2fd059d6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MotivesDenounces_vue_vue_type_template_id_2fd059d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=9.js.map