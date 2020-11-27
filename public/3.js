(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/users/Users.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/users/Users.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_Token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/Token */ "./resources/js/config/Token.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_toast_notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-toast-notification */ "./node_modules/vue-toast-notification/dist/index.min.js");
/* harmony import */ var vue_toast_notification__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_toast_notification__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_toast_notification_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-toast-notification/dist/theme-default.css */ "./node_modules/vue-toast-notification/dist/theme-default.css");
/* harmony import */ var vue_toast_notification_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_toast_notification_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(vue_toast_notification__WEBPACK_IMPORTED_MODULE_2___default.a);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Users",
  data: function data() {
    return {
      imageSrcShow: false,
      imageSrc: '',
      page: 1,
      pageCount: 0,
      path: "",
      itemsPerPage: 25,
      perPageOptions: [25, 50, 100, 500, 'Todos'],
      items: undefined,
      id: null,
      search: "",
      dialog: false,
      editPasswordDialog: false,
      roles: null,
      headers: [{
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id'
      }, {
        text: 'Nombre',
        value: 'firstname'
      }, {
        text: 'Apellido',
        value: 'lastname'
      }, {
        text: 'Email',
        value: 'email'
      }, {
        text: 'Rol',
        value: 'rol'
      }, {
        text: 'Sexo',
        value: 'sex'
      }, {
        text: 'Estado',
        value: 'status'
      }, {
        text: 'Fecha de creación',
        value: 'created_at'
      }, {
        text: '',
        value: 'edit'
      }, {
        text: '',
        value: 'password_edit'
      }],
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
      footerProps: {
        'items-per-page-options': [25, 50, 100, 500, -1],
        'items-per-page': 25
      },
      status_list: [{
        name: "Desactivado"
      }, {
        name: "Activo"
      }, {
        name: "Eliminado"
      }],
      status_colors: {
        Desactivado: "accent--text",
        Activo: "primary--text",
        Eliminado: "error--text"
      },
      passwordRequired: true,
      firstname: null,
      lastname: null,
      email: null,
      profilePicture: null,
      password: null,
      rePassword: null,
      allZones: null,
      countries: null,
      country: null,
      countryId: null,
      provinces: [],
      province: null,
      rol: null,
      profilePublic: false,
      status: null,
      alert: false,
      alertType: null,
      alertMsg: '',
      action: ""
    };
  },
  mounted: function mounted() {
    _config_Token__WEBPACK_IMPORTED_MODULE_0__["default"].isExpired();
    this.getRoles();
    this.getZones();
    this.getUsers();
  },
  methods: {
    getRoles: function getRoles() {
      var _this = this;

      this.$api.request.get("/admin/user_get_all_roles").then(function (res) {
        var data = [];
        var a = res.data.response;

        for (var key in a) {
          if (a.hasOwnProperty(key)) {
            var element = a[key];
            data.push({
              id: element.id,
              name: element.name
            });
          }
        }

        _this.$data.roles = data;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    getZones: function getZones() {
      var _this2 = this;

      this.$api.request.get("/admin/zones").then(function (res) {
        var data = [];
        var a = res.data.response;
        _this2.$data.allZones = a;

        for (var key in a) {
          if (a.hasOwnProperty(key)) {
            var element = a[key];
            data.push({
              id: element.id,
              name: element.name
            });
          }
        }

        _this2.$data.countries = data;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    getUsers: function getUsers() {
      var _this3 = this;

      this.$api.request.get("/admin/users_withProfiles?page=1&perPage=" + this.$data.itemsPerPage).then(function (res) {
        _this3.$data.items = _this3.formatDates(res.data.response.data);
        _this3.$data.pageCount = res.data.response.last_page;
        _this3.$data.path = res.data.response.path;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    getUsersPage: function getUsersPage(page) {
      var _this4 = this;

      this.$api.request.get(page).then(function (res) {
        _this4.$data.items = _this4.formatDates(res.data.response.data);
        _this4.$data.pageCount = res.data.response.last_page;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    populateProvinces: function populateProvinces() {
      var _this5 = this;

      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.$data.province = null;
      var c = this.$data.allZones.filter(function (i) {
        return i.id == (value != 0 ? value : _this5.$data.countryId);
      });
      this.$data.provinces = c[0].children;
    },
    setUserZone: function setUserZone(user) {
      var zones = this.$data.allZones;
      var userZone = user.profile.zone_id;
      var filterZones = zones.filter(function (i) {
        return i.id == userZone;
      });

      if (filterZones.length > 0) {
        var z = filterZones[0];
        this.$data.country = z.id;
        this.$data.countryId = z.id;
        this.populateProvinces();
        return;
      } else {
        var country = null;

        for (var j in zones) {
          country = zones[j].id;

          if (zones[j].children != undefined) {
            var filterChildren = zones[j].children.filter(function (i) {
              return i.id == userZone;
            });

            if (filterChildren.length > 0) {
              var p = filterChildren[0];
              this.$data.country = country;
              this.$data.countryId = country;
              this.populateProvinces();
              this.$data.province = p.id;
              return;
            }
          }
        }
      }
    },
    newUser: function newUser() {
      this.$data.id = null;
      this.$data.passwordRequired = true;
      this.reset();
      this.$data.action = "Crear Usuario";
      this.$data.id = null;
      this.imageSrcShow = false;
      this.imageSrc = '';
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
    edit: function edit(user) {
      this.$data.action = "Editar Usuario";
      this.$data.id = user.id;
      this.$data.passwordRequired = false;
      this.$data.firstname = user.profile.firstname;
      this.$data.lastname = user.profile.lastname;
      this.$data.email = user.email;
      this.$data.password = user.password;
      this.setUserZone(user);
      this.$data.rol = user.roles[0].name;
      this.$data.status = user.status;
      this.$data.profilePublic = user.profile["public"];
      this.$data.dialog = true;

      if (user.profile.photo != "") {
        this.imageSrcShow = true;
        this.imageSrc = user.profile.photo;
      } else {
        this.imageSrcShow = false;
        this.imageSrc = '';
      }
    },
    editPassword: function editPassword(user) {
      this.$data.id = user.id;
      this.$data.editPasswordDialog = true;
    },
    save: function save() {
      var _this6 = this;

      if (!this.validateUser()) return;
      var publicProfile = this.$data.profilePublic == true ? 1 : 0;
      var data = new FormData();
      data.append('email', this.$data.email);
      data.append('password', this.$data.password);
      data.append('status', this.$data.status);
      data.append('firstname', this.$data.firstname);
      data.append('lastname', this.$data.lastname);
      data.append('country', this.$data.country);
      data.append('province', this.$data.province);
      data.append('isPublic', publicProfile);
      data.append('role', this.$data.rol);
      data.append('photo', this.$data.profilePicture);
      data.append('origin', 'back');

      if (this.$data.id) {
        data.append('_method', 'put');
        data.append('id', this.$data.id);
        this.$api.request.post("/admin/users/".concat(this.$data.id), data).then(function (res) {
          if (data.status == 'Eliminado') _this6["delete"](_this6.$data.id);
          vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.success('Usuario actualizado con exito', {
            position: 'top'
          });
          setTimeout(function () {
            _this6.reset();

            _this6.getUsers();

            _this6.alert = false;
            _this6.$data.dialog = false;
            _this6.$data.profilePublic = false;
          }, 2000);
        })["catch"](function (reason) {
          vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Ha ocurrido un error inesperado', {
            position: 'top'
          });
        });
      } else {
        this.$api.request.post("/ui/user_manual_register", data).then(function (res) {
          vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.success('Usuario creado con exito', {
            position: 'top'
          });
          setTimeout(function () {
            _this6.reset();

            _this6.getUsers();

            _this6.alert = false;
            _this6.$data.dialog = false;
            _this6.$data.profilePublic = false;
          }, 2000);
        })["catch"](function (reason) {
          vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Ha ocurrido un error inesperado', {
            position: 'top'
          });
        });
      }
    },
    saveNewPassword: function saveNewPassword() {
      var _this7 = this;

      var data = {
        user: this.$data.id,
        password: this.$data.password
      };
      this.$data.id = null;
      this.$api.request.post("/admin/change_password", data).then(function (res) {
        vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.success('Password actualizada con exito', {
          position: 'top'
        });
        setTimeout(function () {
          _this7.reset();

          _this7.alert = false;
          _this7.$data.editPasswordDialog = false;
        }, 2000);
      })["catch"](function (reason) {
        vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Ha ocurrido un error inesperado', {
          position: 'top'
        });
      });
    },
    "delete": function _delete(id) {
      this.$api.request["delete"]("/admin/users/".concat(id)).then(function (res) {
        console.log('Recurso eliminado');
      })["catch"](function (reason) {
        return console.log(reason.error);
      });
    },
    reset: function reset() {
      if (this.$refs.form) this.$refs.form.reset();
      if (this.$refs.passForm) this.$refs.passForm.reset();
      this.$data.id = null;
      this.profilePublic = false;
    },
    gotoPage: function gotoPage() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (value == 0) value = this.$data.page;
      var page = this.$data.path + "?page=" + value + "&perPage=" + this.$data.itemsPerPage;
      this.$data.page = value;
      this.getUsersPage(page);
    },
    changePerPage: function changePerPage() {
      var i = this.$data.itemsPerPage;
      var p = this.$data.page;
      var page = this.$data.path + "?page=" + p + "&perPage=" + i;
      this.getUsersPage(page);
    },
    hasData: function hasData(data) {
      if (data != "" && data != null && data != undefined) return true;
      return false;
    },
    validateUser: function validateUser() {
      if (!this.hasData(this.firstname) || !this.hasData(this.email) || !this.hasData(this.password) && this.passwordRequired || !this.hasData(this.country) || !this.hasData(this.status) || !this.hasData(this.rol)) {
        if (!this.hasData(this.firstname)) vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Complete el campo Nombre', {
          position: 'top'
        });
        if (!this.hasData(this.email)) vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Complete el campo Email', {
          position: 'top'
        });
        if (!this.hasData(this.password) && this.passwordRequired) vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Complete el Password', {
          position: 'top'
        });
        if (!this.hasData(this.country)) vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Complete el campo País', {
          position: 'top'
        });
        if (!this.hasData(this.status)) vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Complete el campo Estado', {
          position: 'top'
        });
        if (!this.hasData(this.rol)) vue__WEBPACK_IMPORTED_MODULE_1___default.a.$toast.error('Complete el campo Rol', {
          position: 'top'
        });
        return false;
      }

      return true;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-toast-notification/dist/theme-default.css":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vue-toast-notification/dist/theme-default.css ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@keyframes fadeOut{from{opacity:1}to{opacity:0}}.fadeOut{animation-name:fadeOut}@keyframes fadeInDown{from{opacity:0;transform:translate3d(0, -100%, 0)}to{opacity:1;transform:none}}.fadeInDown{animation-name:fadeInDown}@keyframes fadeInUp{from{opacity:0;transform:translate3d(0, 100%, 0)}to{opacity:1;transform:none}}.fadeInUp{animation-name:fadeInUp}.fade-enter-active,.fade-leave-active{transition:opacity 150ms ease-out}.fade-enter,.fade-leave-to{opacity:0}.v-notices{position:fixed;display:flex;top:0;bottom:0;left:0;right:0;padding:2em;overflow:hidden;z-index:1052;pointer-events:none}.v-notices .v-toast{display:inline-flex;align-items:center;animation-duration:150ms;margin:.5em 0;box-shadow:0 1px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);border-radius:.25em;pointer-events:auto;opacity:.92;color:#fff;min-height:3em;cursor:pointer}.v-notices .v-toast .v-toast-text{margin:0;padding:.5em 1em;word-break:break-word}.v-notices .v-toast .v-toast-icon{display:none}.v-notices .v-toast-success{background-color:#28a745}.v-notices .v-toast-info{background-color:#17a2b8}.v-notices .v-toast-warning{background-color:#ffc107}.v-notices .v-toast-error{background-color:#dc3545}.v-notices .v-toast-default{background-color:#343a40}.v-notices .v-toast.is-top,.v-notices .v-toast.is-bottom{align-self:center}.v-notices .v-toast.is-top-right,.v-notices .v-toast.is-bottom-right{align-self:flex-end}.v-notices .v-toast.is-top-left,.v-notices .v-toast.is-bottom-left{align-self:flex-start}.v-notices.is-top{flex-direction:column}.v-notices.is-bottom{flex-direction:column-reverse}.v-notices.is-custom-parent{position:absolute}@media screen and (max-width: 768px){.v-notices{padding:0;position:fixed !important}}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/users/Users.vue?vue&type=template&id=70b9a3c8&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/users/Users.vue?vue&type=template&id=70b9a3c8& ***!
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
    { attrs: { justify: "center" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { width: "600" },
          model: {
            value: _vm.editPasswordDialog,
            callback: function($$v) {
              _vm.editPasswordDialog = $$v
            },
            expression: "editPasswordDialog"
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
              _c("v-card-title", [_vm._v("Cambiar contraseña")]),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-form",
                    { ref: "passForm" },
                    [
                      _c("v-text-field", {
                        attrs: {
                          type: "password",
                          rules: _vm.passwordRules,
                          label: "Password",
                          "aria-autocomplete": "false",
                          required: ""
                        },
                        model: {
                          value: _vm.password,
                          callback: function($$v) {
                            _vm.password = $$v
                          },
                          expression: "password"
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
                    {
                      attrs: { color: "primary" },
                      on: { click: _vm.saveNewPassword }
                    },
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
                          value: _vm.firstname,
                          callback: function($$v) {
                            _vm.firstname = $$v
                          },
                          expression: "firstname"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: { label: "Apellido" },
                        model: {
                          value: _vm.lastname,
                          callback: function($$v) {
                            _vm.lastname = $$v
                          },
                          expression: "lastname"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          label: "Email",
                          rules: _vm.emailRules,
                          required: ""
                        },
                        model: {
                          value: _vm.email,
                          callback: function($$v) {
                            _vm.email = $$v
                          },
                          expression: "email"
                        }
                      }),
                      _vm._v(" "),
                      _vm.imageSrcShow
                        ? _c("img", {
                            staticStyle: { width: "50%", "margin-left": "25%" },
                            attrs: { src: _vm.imageSrc, alt: "" }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("v-file-input", {
                        attrs: { label: "Foto de Perfil", accept: "image/*" },
                        model: {
                          value: _vm.profilePicture,
                          callback: function($$v) {
                            _vm.profilePicture = $$v
                          },
                          expression: "profilePicture"
                        }
                      }),
                      _vm._v(" "),
                      _vm.passwordRequired
                        ? _c("v-text-field", {
                            attrs: {
                              type: "password",
                              rules: _vm.passwordRules,
                              label: "Password",
                              "aria-autocomplete": "false",
                              required: ""
                            },
                            model: {
                              value: _vm.password,
                              callback: function($$v) {
                                _vm.password = $$v
                              },
                              expression: "password"
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          items: _vm.countries,
                          "item-text": "name",
                          "item-value": "id",
                          label: "País",
                          required: ""
                        },
                        on: { change: _vm.populateProvinces },
                        model: {
                          value: _vm.country,
                          callback: function($$v) {
                            _vm.country = $$v
                          },
                          expression: "country"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          items: _vm.provinces,
                          "item-text": "name",
                          "item-value": "id",
                          label: "Provincia"
                        },
                        model: {
                          value: _vm.province,
                          callback: function($$v) {
                            _vm.province = $$v
                          },
                          expression: "province"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          items: _vm.roles,
                          "item-text": "name",
                          "item-value": "name",
                          label: "Rol"
                        },
                        model: {
                          value: _vm.rol,
                          callback: function($$v) {
                            _vm.rol = $$v
                          },
                          expression: "rol"
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
                      }),
                      _vm._v(" "),
                      _vm.rol == "User"
                        ? _c("v-checkbox", {
                            attrs: { label: "Es Perfil Público" },
                            model: {
                              value: _vm.profilePublic,
                              callback: function($$v) {
                                _vm.profilePublic = $$v
                              },
                              expression: "profilePublic"
                            }
                          })
                        : _vm._e()
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
                    _vm._v("\n                    Usuarios\n                ")
                  ]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { icon: "" }, on: { click: _vm.newUser } },
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
                  search: _vm.search,
                  page: _vm.page,
                  "items-per-page": _vm.itemsPerPage,
                  "hide-default-footer": ""
                },
                on: {
                  "update:page": function($event) {
                    _vm.page = $event
                  }
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
                    key: "item.firstname",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.profile.firstname) +
                            "\n                "
                        )
                      ]
                    }
                  },
                  {
                    key: "item.lastname",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.profile.lastname) +
                            "\n                "
                        )
                      ]
                    }
                  },
                  {
                    key: "item.email",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.email) +
                            "\n                "
                        )
                      ]
                    }
                  },
                  {
                    key: "item.rol",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.roles[0].name) +
                            "\n                "
                        )
                      ]
                    }
                  },
                  {
                    key: "item.sex",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.profile.sex) +
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
                  },
                  {
                    key: "item.password_edit",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _c(
                          "v-btn",
                          {
                            attrs: { icon: "", "x-small": "", color: "info" },
                            on: {
                              click: function($event) {
                                return _vm.editPassword(item)
                              }
                            }
                          },
                          [_c("v-icon", [_vm._v("fas fa-key")])],
                          1
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("v-pagination", {
                attrs: { length: _vm.pageCount },
                on: { input: _vm.gotoPage },
                model: {
                  value: _vm.page,
                  callback: function($$v) {
                    _vm.page = $$v
                  },
                  expression: "page"
                }
              }),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  items: _vm.perPageOptions,
                  "item-text": "item",
                  "item-value": "item",
                  label: "Elementos por página",
                  width: "600"
                },
                on: { change: _vm.changePerPage },
                model: {
                  value: _vm.itemsPerPage,
                  callback: function($$v) {
                    _vm.itemsPerPage = $$v
                  },
                  expression: "itemsPerPage"
                }
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

/***/ "./node_modules/vue-toast-notification/dist/index.min.js":
/*!***************************************************************!*\
  !*** ./node_modules/vue-toast-notification/dist/index.min.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js")):undefined}("undefined"!=typeof self?self:this,(function(e){return function(e){var t={};function s(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=e,s.c=t,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(o,n,function(t){return e[t]}.bind(null,n));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=3)}([function(t,s){t.exports=e},,,function(e,t,s){"use strict";s.r(t),s.d(t,"Component",(function(){return a})),s.d(t,"Positions",(function(){return n}));class o{constructor(e,t){this.startedAt=Date.now(),this.callback=e,this.delay=t,this.timer=setTimeout(e,t)}pause(){this.stop(),this.delay-=Date.now()-this.startedAt}resume(){this.stop(),this.startedAt=Date.now(),this.timer=setTimeout(this.callback,this.delay)}stop(){clearTimeout(this.timer)}}var n=Object.freeze({TOP_RIGHT:"top-right",TOP:"top",TOP_LEFT:"top-left",BOTTOM_RIGHT:"bottom-right",BOTTOM:"bottom",BOTTOM_LEFT:"bottom-left"}),i=s(0);var r=new(s.n(i).a);var a=function(e,t,s,o,n,i,r,a){var u,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=s,c._compiled=!0),o&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),r?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},c._ssrRegister=u):n&&(u=a?function(){n.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:n),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(e,t){return u.call(t),l(e,t)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,u):[u]}return{exports:e,options:c}}({name:"toast",props:{message:{type:String,required:!0},type:{type:String,default:"success"},position:{type:String,default:n.BOTTOM_RIGHT,validator:e=>Object.values(n).includes(e)},duration:{type:Number,default:3e3},dismissible:{type:Boolean,default:!0},onClose:{type:Function,default:()=>{}},onClick:{type:Function,default:()=>{}},queue:Boolean,pauseOnHover:{type:Boolean,default:!0}},data:()=>({isActive:!1,parentTop:null,parentBottom:null,isHovered:!1}),beforeMount(){this.setupContainer()},mounted(){this.showNotice(),r.$on("toast.clear",this.close)},methods:{setupContainer(){if(this.parentTop=document.querySelector(".v-notices.is-top"),this.parentBottom=document.querySelector(".v-notices.is-bottom"),this.parentTop&&this.parentBottom)return;this.parentTop||(this.parentTop=document.createElement("div"),this.parentTop.className="v-notices is-top"),this.parentBottom||(this.parentBottom=document.createElement("div"),this.parentBottom.className="v-notices is-bottom");const e=document.body;e.appendChild(this.parentTop),e.appendChild(this.parentBottom)},shouldQueue(){return!!this.queue&&(this.parentTop.childElementCount>0||this.parentBottom.childElementCount>0)},close(){this.timer.stop(),clearTimeout(this.queueTimer),this.isActive=!1,setTimeout(()=>{var e;this.onClose.apply(null,arguments),this.$destroy(),void 0!==(e=this.$el).remove?e.remove():e.parentNode.removeChild(e)},150)},showNotice(){this.shouldQueue()?this.queueTimer=setTimeout(this.showNotice,250):(this.correctParent.insertAdjacentElement("afterbegin",this.$el),this.isActive=!0,this.timer=new o(this.close,this.duration))},whenClicked(){this.dismissible&&(this.onClick.apply(null,arguments),this.close())},toggleTimer(e){this.pauseOnHover&&(e?this.timer.pause():this.timer.resume())}},computed:{correctParent(){switch(this.position){case n.TOP:case n.TOP_RIGHT:case n.TOP_LEFT:return this.parentTop;case n.BOTTOM:case n.BOTTOM_RIGHT:case n.BOTTOM_LEFT:return this.parentBottom}},transition(){switch(this.position){case n.TOP:case n.TOP_RIGHT:case n.TOP_LEFT:return{enter:"fadeInDown",leave:"fadeOut"};case n.BOTTOM:case n.BOTTOM_RIGHT:case n.BOTTOM_LEFT:return{enter:"fadeInUp",leave:"fadeOut"}}}},beforeDestroy(){r.$off("toast.clear",this.close)}},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("transition",{attrs:{"enter-active-class":e.transition.enter,"leave-active-class":e.transition.leave}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"isActive"}],staticClass:"v-toast",class:["v-toast-"+e.type,"is-"+e.position],attrs:{role:"alert"},on:{mouseover:function(t){return e.toggleTimer(!0)},mouseleave:function(t){return e.toggleTimer(!1)},click:e.whenClicked}},[s("div",{staticClass:"v-toast-icon"}),e._v(" "),s("p",{staticClass:"v-toast-text",domProps:{innerHTML:e._s(e.message)}})])])}),[],!1,null,null,null).exports;var u=(e,t={})=>({open(s){let o;"string"==typeof s&&(o=s);const n={message:o},i=Object.assign({},n,t,s);return new(e.extend(a))({el:document.createElement("div"),propsData:i})},clear(){r.$emit("toast.clear")},success(e,t={}){return this.open(Object.assign({},{message:e,type:"success"},t))},error(e,t={}){return this.open(Object.assign({},{message:e,type:"error"},t))},info(e,t={}){return this.open(Object.assign({},{message:e,type:"info"},t))},warning(e,t={}){return this.open(Object.assign({},{message:e,type:"warning"},t))},default(e,t={}){return this.open(Object.assign({},{message:e,type:"default"},t))}});a.install=(e,t={})=>{let s=u(e,t);e.$toast=s,e.prototype.$toast=s};t.default=a}]).default}));

/***/ }),

/***/ "./node_modules/vue-toast-notification/dist/theme-default.css":
/*!********************************************************************!*\
  !*** ./node_modules/vue-toast-notification/dist/theme-default.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader??ref--5-1!../../postcss-loader/src??ref--5-2!./theme-default.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-toast-notification/dist/theme-default.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./resources/js/pages/users/Users.vue":
/*!********************************************!*\
  !*** ./resources/js/pages/users/Users.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_vue_vue_type_template_id_70b9a3c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue?vue&type=template&id=70b9a3c8& */ "./resources/js/pages/users/Users.vue?vue&type=template&id=70b9a3c8&");
/* harmony import */ var _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.vue?vue&type=script&lang=js& */ "./resources/js/pages/users/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Users_vue_vue_type_template_id_70b9a3c8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Users_vue_vue_type_template_id_70b9a3c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/users/Users.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/users/Users.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/users/Users.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/users/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/users/Users.vue?vue&type=template&id=70b9a3c8&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/users/Users.vue?vue&type=template&id=70b9a3c8& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_70b9a3c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=template&id=70b9a3c8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/users/Users.vue?vue&type=template&id=70b9a3c8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_70b9a3c8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_70b9a3c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=3.js.map