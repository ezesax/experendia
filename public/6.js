(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/channels/Channels.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/channels/Channels.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Channels",
  data: function data() {
    return {
      items: undefined,
      id: null,
      parent_id: null,
      search: "",
      dialog: false,
      channels_list: [],
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
      status: null,
      alert: false,
      alertType: "",
      msg: '',
      action: ""
    };
  },
  mounted: function mounted() {
    _config_Token__WEBPACK_IMPORTED_MODULE_0__["default"].isExpired();
    this.getChannels();
    this.getChannelsList();
  },
  methods: {
    getChannels: function getChannels() {
      var _this = this;

      this.$api.request.get("/admin/channels").then(function (res) {
        _this.$data.items = res.data.response;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    getChannelsList: function getChannelsList() {
      var _this2 = this;

      this.$api.request.get("/admin/channels/get_channels_list").then(function (res) {
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

        _this2.$data.channels_list = data;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    newChannel: function newChannel() {
      this.reset();
      this.$data.action = "Crear Canal";
      this.$data.id = null;
      this.$data.dialog = true;
    },
    edit: function edit(channel) {
      this.$data.action = "Editar Canal";
      this.$data.name = channel.name;
      this.$data.parent_id = channel.parent_id;
      this.$data.status = channel.status;
      this.$data.id = channel.id;
      this.$data.dialog = true;
    },
    save: function save() {
      var _this3 = this;

      var data = {
        parent_id: this.$data.parent_id,
        name: this.$data.name,
        status: this.$data.status
      };

      if (this.$data.id) {
        this.$api.request.put("/admin/channels/".concat(this.$data.id), data).then(function (res) {
          if (data.status == 'Eliminado') _this3["delete"](_this3.$data.id);
          _this3.alertType = 'success';
          _this3.msg = 'Canal actualizado con exito';
          _this3.alert = true;
          setTimeout(function () {
            _this3.reset();

            _this3.getChannels();

            _this3.getChannelsList();

            _this3.alert = false;
            _this3.$data.dialog = false;
          }, 2000);
        })["catch"](function (reason) {
          return console.log(reason.error);
        });
      } else {
        this.$api.request.post("/admin/channels", data).then(function (res) {
          _this3.alertType = 'success';
          _this3.msg = 'Canal creado con exito';
          _this3.alert = true;
          setTimeout(function () {
            _this3.reset();

            _this3.getChannels();

            _this3.getChannelsList();

            _this3.alert = false;
            _this3.$data.dialog = false;
          }, 2000);
        })["catch"](function (reason) {
          return console.log(reason.error);
        });
      }
    },
    "delete": function _delete(id) {
      this.$api.request["delete"]("/admin/channels/".concat(id)).then(function (res) {
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/channels/Channels.vue?vue&type=template&id=19e58c94&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/channels/Channels.vue?vue&type=template&id=19e58c94& ***!
  \***************************************************************************************************************************************************************************************************************/
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
                      _c("v-autocomplete", {
                        attrs: {
                          items: _vm.channels_list,
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
                    _vm._v("\n                    Canales\n                ")
                  ]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { icon: "" }, on: { click: _vm.newChannel } },
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

/***/ "./resources/js/pages/channels/Channels.vue":
/*!**************************************************!*\
  !*** ./resources/js/pages/channels/Channels.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Channels_vue_vue_type_template_id_19e58c94___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Channels.vue?vue&type=template&id=19e58c94& */ "./resources/js/pages/channels/Channels.vue?vue&type=template&id=19e58c94&");
/* harmony import */ var _Channels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Channels.vue?vue&type=script&lang=js& */ "./resources/js/pages/channels/Channels.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Channels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Channels_vue_vue_type_template_id_19e58c94___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Channels_vue_vue_type_template_id_19e58c94___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/channels/Channels.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/channels/Channels.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/channels/Channels.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Channels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Channels.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/channels/Channels.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Channels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/channels/Channels.vue?vue&type=template&id=19e58c94&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/channels/Channels.vue?vue&type=template&id=19e58c94& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Channels_vue_vue_type_template_id_19e58c94___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Channels.vue?vue&type=template&id=19e58c94& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/channels/Channels.vue?vue&type=template&id=19e58c94&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Channels_vue_vue_type_template_id_19e58c94___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Channels_vue_vue_type_template_id_19e58c94___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=6.js.map