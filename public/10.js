(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/zones/Zones.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/zones/Zones.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
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
//
//
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
  name: "Zones",
  data: function data() {
    return {
      items: undefined,
      id: null,
      parent_id: null,
      search: "",
      dialog: false,
      zones_list: [],
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
      denomination: null,
      latitude: null,
      longitude: null,
      status: null,
      alert: false,
      msg: '',
      action: ""
    };
  },
  mounted: function mounted() {
    _config_Token__WEBPACK_IMPORTED_MODULE_0__["default"].isExpired();
    this.getZones();
    this.getListZones();
  },
  methods: {
    getZones: function getZones() {
      var _this = this;

      this.$api.request.get("/admin/zones").then(function (res) {
        _this.$data.items = res.data.response;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    getListZones: function getListZones() {
      var _this2 = this;

      this.$api.request.get("/admin/zones/get_zone_list").then(function (res) {
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

        _this2.$data.zones_list = data;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    save: function save() {
      var _this3 = this;

      var data = {
        parent_id: this.$data.parent_id,
        name: this.$data.name,
        denomination: this.$data.denomination,
        latitude: this.$data.latitude,
        longitude: this.$data.longitude,
        status: this.$data.status
      };

      if (this.$data.id) {
        this.$api.request.put("/admin/zones/".concat(this.$data.id), data).then(function (res) {
          if (data.status == 'Eliminado') _this3["delete"](_this3.$data.id);
          console.log(res);

          _this3.reset();

          _this3.getZones();

          _this3.getListZones();

          _this3.$data.dialog = false;
        })["catch"](function (reason) {
          return console.log(reason.error);
        });
      } else {
        this.$api.request.post("/admin/zones", data).then(function (res) {
          console.log(res);

          _this3.reset();

          _this3.getZones();

          _this3.getListZones();

          _this3.$data.dialog = false;
        })["catch"](function (error) {
          console.error(error.response);

          if (error.response.data.response == 'there is already a record with that combination') {
            _this3.alert = true;
            _this3.msg = 'Ya existe una zona con esta combinación';
          }
        });
      }
    },
    nuevo: function nuevo() {
      this.action = "Crear Zona";
      this.$data.dialog = true;
      this.reset();
    },
    edit: function edit(item) {
      this.action = "Editar Zona";
      console.log(item);
      this.$data.parent_id = item.parent_id;
      this.$data.name = item.name;
      this.$data.denomination = item.denomination;
      this.$data.latitude = item.latitude;
      this.$data.longitude = item.longitude;
      this.$data.status = item.status;
      this.$data.id = item.id;
      this.$data.dialog = true;
    },
    "delete": function _delete(id) {
      this.$api.request["delete"]("/admin/zones/".concat(id)).then(function (res) {
        console.log('Recurso eliminado');
      })["catch"](function (reason) {
        return console.log(reason.error);
      });
    },
    reset: function reset() {
      this.$refs.form.reset();
      this.$data.id = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/zones/Zones.vue?vue&type=template&id=96481bf4&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/zones/Zones.vue?vue&type=template&id=96481bf4& ***!
  \*********************************************************************************************************************************************************************************************************/
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
                  attrs: { type: "error", dismissible: "" },
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
                    "\n                " + _vm._s(_vm.msg) + "\n            "
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
                        attrs: { label: "Denomicacion" },
                        model: {
                          value: _vm.denomination,
                          callback: function($$v) {
                            _vm.denomination = $$v
                          },
                          expression: "denomination"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: { label: "Latitude" },
                        model: {
                          value: _vm.latitude,
                          callback: function($$v) {
                            _vm.latitude = $$v
                          },
                          expression: "latitude"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: { label: "Longitud" },
                        model: {
                          value: _vm.longitude,
                          callback: function($$v) {
                            _vm.longitude = $$v
                          },
                          expression: "longitude"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          items: _vm.zones_list,
                          "item-text": "name",
                          "item-value": "id",
                          label: "Zona Padre"
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
                    _vm._v("\n                    ZONAS\n                ")
                  ]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { icon: "" }, on: { click: _vm.nuevo } },
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
                        _c("small", { staticClass: "primary--text" }, [
                          _vm._v("\n                        ("),
                          _c("strong", [
                            _vm._v(
                              _vm._s(item.denomination) +
                                ",\n                        "
                            ),
                            _c(
                              "span",
                              { class: _vm.status_colors["" + item.status] },
                              [_vm._v(_vm._s(item.status))]
                            )
                          ]),
                          _vm._v(")\n                    ")
                        ])
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

/***/ "./resources/js/pages/zones/Zones.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/zones/Zones.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Zones_vue_vue_type_template_id_96481bf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Zones.vue?vue&type=template&id=96481bf4& */ "./resources/js/pages/zones/Zones.vue?vue&type=template&id=96481bf4&");
/* harmony import */ var _Zones_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Zones.vue?vue&type=script&lang=js& */ "./resources/js/pages/zones/Zones.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Zones_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Zones_vue_vue_type_template_id_96481bf4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Zones_vue_vue_type_template_id_96481bf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/zones/Zones.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/zones/Zones.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/zones/Zones.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Zones_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Zones.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/zones/Zones.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Zones_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/zones/Zones.vue?vue&type=template&id=96481bf4&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/zones/Zones.vue?vue&type=template&id=96481bf4& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Zones_vue_vue_type_template_id_96481bf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Zones.vue?vue&type=template&id=96481bf4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/zones/Zones.vue?vue&type=template&id=96481bf4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Zones_vue_vue_type_template_id_96481bf4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Zones_vue_vue_type_template_id_96481bf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=10.js.map