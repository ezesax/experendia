(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/EditTag.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/tag/EditTag.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "EditTag",
  data: function data() {
    return {
      name: "",
      description: "",
      keywords: "",
      tag_type: [],
      status_list: [{
        name: "Pendiente"
      }, {
        name: "Desactivado"
      }, {
        name: "Activo"
      }, {
        name: "Eliminado"
      }],
      status: "",
      types: [],
      alertType: "success",
      alertMsg: "",
      alert: false
    };
  },
  props: ["tagId"],
  mounted: function mounted() {
    this.reset();
    this.getTypes();
    this.getTag();
  },
  methods: {
    reset: function reset() {
      this.$refs.form.reset();
    },
    getTypes: function getTypes() {
      var _this = this;

      this.$api.request.get("/admin/tags/get_tag_types").then(function (res) {
        var response = res.data.response;

        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            var element = response[key];

            _this.$data.types.push({
              value: key,
              text: element
            });
          }
        }
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    getTag: function getTag() {
      var _this2 = this;

      this.$api.request.get("/admin/tags/" + this.tagId).then(function (res) {
        var tag = res.data.response;
        _this2.$data.name = tag.name;
        _this2.$data.description = tag.description;
        _this2.$data.keywords = tag.keywords;
        _this2.$data.status = tag.status; //this.$data.tag_type = tag.tag_type;
      })["catch"](function (err) {
        return console.error(err);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/NewTag.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/tag/NewTag.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewTagTree_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewTagTree.vue */ "./resources/js/components/tag/NewTagTree.vue");
/* harmony import */ var _EditTag_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditTag.vue */ "./resources/js/components/tag/EditTag.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "NewTag",
  data: function data() {
    return {
      name: "",
      description: "",
      keywords: "",
      tag_type: [],
      status_list: [{
        name: "Pendiente"
      }, {
        name: "Desactivado"
      }, {
        name: "Activo"
      }, {
        name: "Eliminado"
      }],
      status: "",
      types: [],
      root: false,
      alertType: "success",
      alertMsg: "",
      alert: false
    };
  },
  mounted: function mounted() {
    this.getTypes();
  },
  methods: {
    getTypes: function getTypes() {
      var _this = this;

      this.$api.request.get("/admin/tags/get_tag_types").then(function (res) {
        var response = res.data.response;

        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            var element = response[key];

            _this.$data.types.push({
              value: key,
              text: element
            });
          }
        }
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    save: function save(event) {
      var _this2 = this;

      event.preventDefault(); // this.$refs.btnSub.$el.disabled = true;

      var data = {
        name: this.$data.name,
        description: this.$data.description,
        keywords: this.$data.keywords,
        tag_type: this.$data.tag_type,
        status: this.$data.status
      };
      this.$api.request.post("/admin/tags", data).then(function (res) {
        if (_this2.$data.root) {
          _this2.saveRoot(res.data.response.id);
        } else {
          _this2.alert = true;
          _this2.alertType = 'success';
          _this2.alertMsg = 'Tag creado con exito';

          _this2.$refs.form.reset();

          setTimeout(function () {
            _this2.$emit("dialogDismiss");

            _this2.alert = false;
          }, 1000);
        }
      })["catch"](function (err) {
        if (err.response.status == 400) {
          _this2.alert = true;
          _this2.alertType = 'warning';
          _this2.alertMsg = 'El tag ya existe';
          setTimeout(function () {
            _this2.alert = false;
          }, 2000);
        } else {
          _this2.alert = true;
          _this2.alertType = 'error';
          _this2.alertMsg = 'Ocurrio un error inesperado';
          setTimeout(function () {
            _this2.alert = false;
          }, 2000);
        }
      });
    },
    saveRoot: function saveRoot(tagId) {
      var _this3 = this;

      var data = {
        tag_id: tagId,
        tree: 1,
        branch: 1,
        level: 1,
        parent_id: null,
        status: this.$data.status
      };
      this.$api.request.post("/admin/tags_tree", data).then(function (res) {
        _this3.$data.alert = true;
        _this3.$data.alertType = 'success';
        _this3.$data.alertMsg = 'Tag padre creado con exito';

        _this3.$refs.form.reset();

        setTimeout(function () {
          _this3.$emit("dialogDismiss");

          _this3.$data.alert = false;
        }, 1000);
      })["catch"](function (err) {
        if (err.response.status == 400) {
          _this3.$data.alert = true;
          _this3.$data.alertType = 'warning';
          _this3.$data.alertMsg = 'Ya hay un tag padre con el mismo nombre';
          setTimeout(function () {
            _this3.$data.alert = false;
          }, 2000);
        } else {
          _this3.$data.alert = true;
          _this3.$data.alertType = 'error';
          _this3.$data.alertMsg = 'Ocurrio un error inesperado';
          setTimeout(function () {
            _this3.$data.alert = false;
          }, 2000);
        }
      });
    },
    reset: function reset() {
      this.$refs.form.reset();
      this.$data.root = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/NewTagTree.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/tag/NewTagTree.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "NewTagTree",
  data: function data() {
    return {
      tag_id: null,
      tags: [],
      status_list: [{
        name: "Pendiente"
      }, {
        name: "Desactivado"
      }, {
        name: "Activo"
      }, {
        name: "Eliminado"
      }],
      status: "",
      alertType: "",
      alertMsg: "",
      alert: false
    };
  },
  props: ["parentId"],
  mounted: function mounted() {
    this.getTagList();
  },
  methods: {
    getTagList: function getTagList() {
      var _this = this;

      this.$api.request.get("/admin/tags/get_tag_list").then(function (res) {
        var response = res.data.response;

        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            var element = response[key];

            _this.$data.tags.push({
              value: key,
              text: element
            });
          }
        }
      });
    },
    save: function save(event) {
      var _this2 = this;

      event.preventDefault();
      var data = {
        tag_id: this.$data.tag_id,
        tree: 1,
        branch: 1,
        level: 1,
        parent_id: this.parentId,
        status: this.$data.status
      };
      this.$api.request.post("/admin/tags_tree", data).then(function (res) {
        _this2.$data.alert = true;
        _this2.$data.alertType = 'success';
        _this2.$data.alertMsg = 'Tag guardado con exito';

        _this2.$refs.form.reset();

        setTimeout(function () {
          _this2.$emit("dialogDismiss");

          _this2.$data.alert = false;
        }, 1000);
      })["catch"](function (err) {
        if (err.response.status == 400) {
          _this2.$data.alert = true;
          _this2.$data.alertType = 'warning';
          _this2.$data.alertMsg = 'El tag ya se encuentra en esta rama';
          setTimeout(function () {
            _this2.$data.alert = false;
          }, 2000);
        } else {
          _this2.$data.alert = true;
          _this2.$data.alertType = 'error';
          _this2.$data.alertMsg = 'Ocurrio un error inesperado';
          setTimeout(function () {
            _this2.$data.alert = false;
          }, 2000);
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/tags/Tags.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/tags/Tags.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_Token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/Token */ "./resources/js/config/Token.js");
/* harmony import */ var _components_tag_NewTag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/tag/NewTag */ "./resources/js/components/tag/NewTag.vue");
/* harmony import */ var _components_tag_NewTagTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/tag/NewTagTree */ "./resources/js/components/tag/NewTagTree.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Tags",
  components: {
    "new-tag": _components_tag_NewTag__WEBPACK_IMPORTED_MODULE_1__["default"],
    "new-tag-tree": _components_tag_NewTagTree__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      tags: [],
      dialog: false,
      dialogTree: false,
      dialogEdit: false,
      list_childrens: [],
      tagId: null,
      parentId: null,
      aliases: [],
      aliasName: undefined,
      treeAlias: undefined,
      dialogAlias: false,
      activeTag: '',
      id: null,
      name: "",
      description: "",
      keywords: "",
      tag_type: [],
      status_list: [{
        name: "Pendiente"
      }, {
        name: "Desactivado"
      }, {
        name: "Activo"
      }, {
        name: "Eliminado"
      }],
      status: "",
      types: [],
      alertType: "success",
      alertMsg: "",
      alert: false,
      dialogSearchTag: false,
      tag_search: [],
      tagCloud: [],
      tagToEdit: "",
      branches: [],
      showEditBtn: false
    };
  },
  mounted: function mounted() {
    _config_Token__WEBPACK_IMPORTED_MODULE_0__["default"].isExpired();
    this.getTags();
    this.getTagCloud();
  },
  methods: {
    getTags: function getTags() {
      var _this = this;

      this.$api.request.get("/admin/tags_tree").then(function (res) {
        _this.$data.tags = res.data.response;
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    getTagCloud: function getTagCloud() {
      var _this2 = this;

      this.$api.request.get("/admin/tags").then(function (res) {
        var tags = res.data.data;

        for (var i in tags) {
          _this2.tagCloud.push({
            value: tags[i].id,
            text: tags[i].name
          });
        }
      })["catch"](function (err) {
        return console.log("err >>", err);
      });
    },
    getTypes: function getTypes() {
      var _this3 = this;

      this.$api.request.get("/admin/tags/get_tag_types").then(function (res) {
        var response = res.data.response;

        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            var element = response[key];

            _this3.$data.types.push({
              value: key,
              text: element
            });
          }
        }
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    getTag: function getTag() {
      var _this4 = this;

      this.$api.request.get("/admin/tags/" + this.tagId).then(function (res) {
        var tag = res.data.response;
        _this4.$data.name = tag.name;
        _this4.$data.description = tag.description;
        _this4.$data.keywords = tag.keywords;
        _this4.$data.status = tag.status;
        _this4.$data.id = _this4.tagId;

        for (var key in tag.tag_type) {
          if (tag.tag_type.hasOwnProperty(key)) {
            var element = tag.tag_type[key];

            _this4.$data.tag_type.push(String(element.id));
          }
        } //this.$data.tag_type = tag.tag_type;

      })["catch"](function (err) {
        return console.error(err);
      });
    },
    getAllTagBranches: function getAllTagBranches(tagId) {
      var _this5 = this;

      this.$api.request.get("/admin/tags_tree/get_tag_all_branches/".concat(tagId)).then(function (res) {
        var response = res.data.response;

        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            var element = response[key];

            _this5.branches.push(element.tree);
          }
        }
      })["catch"](function (err) {
        return console.error(err);
      });
    },
    handleChildrens: function handleChildrens(tag, i) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var div = arguments.length > 3 ? arguments[3] : undefined;
      var chip = arguments.length > 4 ? arguments[4] : undefined;
      var vChip = this.$refs[chip][0];
      var vDiv = this.$refs[div][0];
      var vChildrens = vDiv.children[parent ? 0 : 2].children[0].children[0].children;
      this.removeActiveClass(vChildrens, vChip.$el.id);
      var isActive = vChip.$el.classList.contains("teal");
      console.log(isActive);
      vChip.$el.classList.toggle("teal");
      vChip.$el.classList.toggle("white--text");
      vChip.$el.classList.contains('desactivado') ? vChip.$el.classList.contains('teal') ? vChip.$el.classList.remove("blue-grey", "lighten-5") : vChip.$el.classList.add("blue-grey", "lighten-5") : '';
      if (parent && isActive) this.deleteAll(tag.id);else if (parent && !isActive) this.addChildren(tag, i, parent);else if (!parent && !isActive) this.addChildren(tag, i, false);else if (!parent && isActive) this.removeChildrens(tag, i);
    },
    addChildren: function addChildren(tag, i) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.$data.list_childrens.length > i) {
        i = parent ? 0 : i + 1;
        this.$data.list_childrens = this.$data.list_childrens.slice(0, i);
      }

      if (tag.children) {
        this.$data.list_childrens.push(tag);
      } else {
        this.list_childrens.push(tag);
      }
    },
    removeChildrens: function removeChildrens(tag, i) {
      this.$data.list_childrens = this.$data.list_childrens.slice(0, i + 1);
    },
    removeActiveClass: function removeActiveClass(childrens, id) {
      for (var index = 0; index < childrens.length; index++) {
        if (childrens[index].id !== id) {
          childrens[index].classList.remove("teal", "white--text");
          childrens[index].classList.contains('desactivado') ? childrens[index].classList.add("blue-grey", "lighten-5") : '';
        }
      }
    },
    deleteAll: function deleteAll(currentTagId) {
      this.$data.list_childrens = [];
    },
    dialogNewTagDismiss: function dialogNewTagDismiss() {
      this.getTags();
      this.dialog = false;
    },
    dialogNewTreeDismiss: function dialogNewTreeDismiss() {
      this.getTags();
      this.dialogTree = false;
    },
    dialogEditTagDismiss: function dialogEditTagDismiss() {
      this.branches = [];
      this.dialogEdit = false;
    },
    dialogSearchTagDismiss: function dialogSearchTagDismiss() {
      this.dialogSearchTag = false;
      this.showEditBtn = false;
      this.tag_search = [];
    },
    showNewTreeForm: function showNewTreeForm(parentId) {
      this.parentId = parentId;
      this.dialogTree = true;
    },
    showEditTagForm: function showEditTagForm() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      id = id != null ? id : this.tag_search;
      this.tagId = id;
      this.dialogEdit = true;
      this.flushEditForm();
      this.getTypes();
      this.getTag();
      this.getAllTagBranches(id);
    },
    flushEditForm: function flushEditForm() {
      this.$data.name = "";
      this.$data.description = "";
      this.$data.keywords = "";
      this.$data.status = "";
      this.$data.tag_type = [];
    },
    toggleAlias: function toggleAlias(item) {
      var _this6 = this;

      this.$api.request.get("/admin/tags_tree/".concat(item.id, "/tag_aliases")).then(function (res) {
        _this6.activeTag = item.tags.name;
        _this6.aliases = res.data.data;
        _this6.treeAlias = item.id;
        _this6.dialogAlias = true;
        _this6.aliasName = res.data.data.map(function (e) {
          return e.name;
        }).join(";");
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    updateTree: function updateTree(item, status) {
      var _this7 = this;

      var tag_id = item.tag_id,
          tree = item.tree,
          branch = item.branch,
          level = item.level,
          parent_id = item.parent_id;
      var data = {
        tag_id: tag_id,
        tree: tree,
        branch: branch,
        level: level,
        parent_id: parent_id,
        status: status
      };
      var confirm = window.confirm("Estas seguro?");

      if (confirm) {
        this.$api.request.put("/admin/tags_tree/".concat(item.id), data).then(function (res) {
          _this7.getTags();
        })["catch"](function (err) {
          return console.error(err);
        });
      }
    },
    update: function update(event) {
      var _this8 = this;

      event.preventDefault();
      var data = {
        name: this.$data.name,
        description: this.$data.description,
        keywords: this.$data.keywords,
        tag_type: this.$data.tag_type,
        status: this.$data.status
      };
      this.$api.request.put("/admin/tags/".concat(this.$data.id), data).then(function (res) {
        _this8.alert = true;
        _this8.alertType = 'success';
        _this8.alertMsg = 'Tag actualizado con exito';
        _this8.$data.id = null;
        setTimeout(function () {
          _this8.$emit("dialogDismiss");

          _this8.alert = false;
          _this8.dialogEdit = false;

          _this8.getTags();
        }, 1000);
      })["catch"](function (err) {
        if (err.response.status == 400) {
          _this8.alert = true;
          _this8.alertType = 'warning';
          _this8.alertMsg = 'Hay campos incorrectos o faltantes';
          _this8.$data.id = null;
          setTimeout(function () {
            _this8.alert = false;
          }, 2000);
        } else {
          _this8.alert = true;
          _this8.alertType = 'error';
          _this8.alertMsg = 'Ocurrio un error inesperado';
          _this8.$data.id = null;
          setTimeout(function () {
            _this8.alert = false;
          }, 2000);
        }
      });
    },
    saveAlias: function saveAlias(event) {
      var _this9 = this;

      event.preventDefault();
      this.$api.request.post("/admin/tags_tree/".concat(this.treeAlias, "/tag_aliases"), {
        name: this.aliasName,
        status: "Activo"
      }).then(function (res) {
        _this9.aliasName = null;
        _this9.dialogAlias = false;

        _this9.getTags();
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    treeDelete: function treeDelete(id) {
      var _this10 = this;

      var confirm = window.confirm("Estas seguro?");

      if (confirm) {
        this.$api.request["delete"]("/admin/tags_tree/".concat(id)).then(function (res) {
          console.log(res);

          _this10.getTags();
        })["catch"](function (err) {
          return console.error(err);
        });
      }
    },
    test: function test() {
      alert('Funciona');
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/EditTag.vue?vue&type=template&id=4a25fd20&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/tag/EditTag.vue?vue&type=template&id=4a25fd20& ***!
  \**************************************************************************************************************************************************************************************************************/
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
    "v-card",
    [
      _c("v-card-title", [_vm._v("Editar Tag")]),
      _vm._v(" "),
      _c(
        "v-alert",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.alert,
              expression: "alert"
            }
          ],
          attrs: { type: _vm.alertType, dismissible: "" }
        },
        [_vm._v(_vm._s(_vm.alertMsg))]
      ),
      _vm._v(" "),
      _c(
        "v-form",
        {
          ref: "form",
          on: {
            submit: function($event) {
              return _vm.save($event)
            }
          }
        },
        [
          _c(
            "v-card-text",
            [
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
                attrs: { label: "Descripcion", required: "" },
                model: {
                  value: _vm.description,
                  callback: function($$v) {
                    _vm.description = $$v
                  },
                  expression: "description"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: { label: "Keywords" },
                model: {
                  value: _vm.keywords,
                  callback: function($$v) {
                    _vm.keywords = $$v
                  },
                  expression: "keywords"
                }
              }),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  items: _vm.types,
                  label: "Tipos",
                  multiple: "",
                  chips: "",
                  hint: "Selecciona los tipos de tag",
                  "persistent-hint": "",
                  required: ""
                },
                model: {
                  value: _vm.tag_type,
                  callback: function($$v) {
                    _vm.tag_type = $$v
                  },
                  expression: "tag_type"
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
          ),
          _vm._v(" "),
          _c(
            "v-card-actions",
            [
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                { ref: "btnSub", attrs: { color: "primary", type: "submit" } },
                [_vm._v("Guardar")]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/NewTag.vue?vue&type=template&id=2be7271a&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/tag/NewTag.vue?vue&type=template&id=2be7271a& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    "v-card",
    [
      _c("v-card-title", [_vm._v("Nuevo Tag")]),
      _vm._v(" "),
      _c(
        "v-alert",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.alert,
              expression: "alert"
            }
          ],
          attrs: { type: _vm.alertType, dismissible: "" }
        },
        [_vm._v(_vm._s(_vm.alertMsg))]
      ),
      _vm._v(" "),
      _c(
        "v-form",
        {
          ref: "form",
          on: {
            submit: function($event) {
              return _vm.save($event)
            }
          }
        },
        [
          _c(
            "v-card-text",
            [
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
                attrs: { label: "Descripcion", required: "" },
                model: {
                  value: _vm.description,
                  callback: function($$v) {
                    _vm.description = $$v
                  },
                  expression: "description"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: { label: "Keywords" },
                model: {
                  value: _vm.keywords,
                  callback: function($$v) {
                    _vm.keywords = $$v
                  },
                  expression: "keywords"
                }
              }),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  items: _vm.types,
                  label: "Tipos",
                  multiple: "",
                  chips: "",
                  hint: "Selecciona los tipos de tag",
                  "persistent-hint": "",
                  required: ""
                },
                model: {
                  value: _vm.tag_type,
                  callback: function($$v) {
                    _vm.tag_type = $$v
                  },
                  expression: "tag_type"
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
              _c("v-checkbox", {
                attrs: { label: "Es tag padre" },
                model: {
                  value: _vm.root,
                  callback: function($$v) {
                    _vm.root = $$v
                  },
                  expression: "root"
                }
              })
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
                { ref: "btnSub", attrs: { color: "primary", type: "submit" } },
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/NewTagTree.vue?vue&type=template&id=f7f22250&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/tag/NewTagTree.vue?vue&type=template&id=f7f22250& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
    "v-card",
    [
      _c("v-card-title", [_vm._v("Nuevo Elemento")]),
      _vm._v(" "),
      _c(
        "v-alert",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.alert,
              expression: "alert"
            }
          ],
          attrs: { type: _vm.alertType, dismissible: "" },
          on: { close: _vm.close }
        },
        [_vm._v(_vm._s(_vm.alertMsg))]
      ),
      _vm._v(" "),
      _c(
        "v-form",
        {
          ref: "form",
          on: {
            submit: function($event) {
              return _vm.save($event)
            }
          }
        },
        [
          _c(
            "v-card-text",
            [
              _c("v-autocomplete", {
                attrs: { items: _vm.tags },
                model: {
                  value: _vm.tag_id,
                  callback: function($$v) {
                    _vm.tag_id = $$v
                  },
                  expression: "tag_id"
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
          ),
          _vm._v(" "),
          _c(
            "v-card-actions",
            [
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                { ref: "btnSub", attrs: { color: "primary", type: "submit" } },
                [_vm._v("Guardar")]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/tags/Tags.vue?vue&type=template&id=6b74c5d6&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/tags/Tags.vue?vue&type=template&id=6b74c5d6& ***!
  \*******************************************************************************************************************************************************************************************************/
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
        [_c("new-tag", { on: { dialogDismiss: _vm.dialogNewTagDismiss } })],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "600" },
          model: {
            value: _vm.dialogTree,
            callback: function($$v) {
              _vm.dialogTree = $$v
            },
            expression: "dialogTree"
          }
        },
        [
          _c("new-tag-tree", {
            attrs: { "parent-id": _vm.parentId },
            on: { dialogDismiss: _vm.dialogNewTreeDismiss }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "600" },
          on: {
            "click:outside": function($event) {
              return _vm.dialogSearchTagDismiss()
            }
          },
          model: {
            value: _vm.dialogSearchTag,
            callback: function($$v) {
              _vm.dialogSearchTag = $$v
            },
            expression: "dialogSearchTag"
          }
        },
        [
          [
            _c(
              "v-card",
              [
                _c("v-card-title", [_vm._v("Buscar Tag")]),
                _vm._v(" "),
                _c(
                  "v-card-text",
                  [
                    _c("v-autocomplete", {
                      attrs: {
                        items: _vm.tagCloud,
                        "item-text": "text",
                        "item-value": "value",
                        outlined: "",
                        dense: "",
                        chips: "",
                        "small-chips": "",
                        label: "Tags",
                        required: ""
                      },
                      on: {
                        change: function($event) {
                          _vm.showEditBtn = true
                        }
                      },
                      model: {
                        value: _vm.tag_search,
                        callback: function($$v) {
                          _vm.tag_search = $$v
                        },
                        expression: "tag_search"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "v-card-actions",
                      [
                        _c("v-spacer"),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            staticClass: "float-right",
                            attrs: { color: "primary" },
                            on: {
                              click: function($event) {
                                return _vm.showEditTagForm()
                              }
                            },
                            model: {
                              value: _vm.showEditBtn,
                              callback: function($$v) {
                                _vm.showEditBtn = $$v
                              },
                              expression: "showEditBtn"
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Editar\n                        "
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
          ]
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "600" },
          on: {
            "click:outside": function($event) {
              return _vm.dialogEditTagDismiss()
            }
          },
          model: {
            value: _vm.dialogEdit,
            callback: function($$v) {
              _vm.dialogEdit = $$v
            },
            expression: "dialogEdit"
          }
        },
        [
          [
            _c(
              "v-card",
              [
                _c("v-card-title", [_vm._v("Editar Tag")]),
                _vm._v(" "),
                _c(
                  "v-alert",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.alert,
                        expression: "alert"
                      }
                    ],
                    attrs: { type: _vm.alertType, dismissible: "" }
                  },
                  [_vm._v(_vm._s(_vm.alertMsg))]
                ),
                _vm._v(" "),
                _c(
                  "v-form",
                  {
                    ref: "editForm",
                    on: {
                      submit: function($event) {
                        return _vm.update($event)
                      }
                    }
                  },
                  [
                    _c(
                      "v-card-text",
                      [
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
                          attrs: { label: "Descripcion", required: "" },
                          model: {
                            value: _vm.description,
                            callback: function($$v) {
                              _vm.description = $$v
                            },
                            expression: "description"
                          }
                        }),
                        _vm._v(" "),
                        _c("v-text-field", {
                          attrs: { label: "Keywords" },
                          model: {
                            value: _vm.keywords,
                            callback: function($$v) {
                              _vm.keywords = $$v
                            },
                            expression: "keywords"
                          }
                        }),
                        _vm._v(" "),
                        _c("v-select", {
                          attrs: {
                            items: _vm.types,
                            label: "Tipos",
                            multiple: "",
                            chips: "",
                            hint: "Selecciona los tipos de tag",
                            "persistent-hint": "",
                            required: ""
                          },
                          model: {
                            value: _vm.tag_type,
                            callback: function($$v) {
                              _vm.tag_type = $$v
                            },
                            expression: "tag_type"
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
                    ),
                    _vm._v(" "),
                    _c(
                      "v-card-text",
                      _vm._l(_vm.branches, function(branch) {
                        return _c("div", { key: branch }, [
                          _c("p", { staticClass: "primary--text" }, [
                            _vm._v(_vm._s(branch))
                          ])
                        ])
                      }),
                      0
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
                            ref: "btnSub",
                            attrs: { color: "primary", type: "submit" }
                          },
                          [_vm._v("Guardar")]
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
          ]
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "600" },
          model: {
            value: _vm.dialogAlias,
            callback: function($$v) {
              _vm.dialogAlias = $$v
            },
            expression: "dialogAlias"
          }
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", [_vm._v("Alias - " + _vm._s(_vm.activeTag))]),
              _vm._v(" "),
              _c(
                "v-form",
                {
                  ref: "form",
                  on: {
                    submit: function($event) {
                      return _vm.saveAlias($event)
                    }
                  }
                },
                [
                  _c(
                    "v-card-text",
                    [
                      _c("v-text-field", {
                        attrs: { label: "Nombre", required: "" },
                        model: {
                          value: _vm.aliasName,
                          callback: function($$v) {
                            _vm.aliasName = $$v
                          },
                          expression: "aliasName"
                        }
                      })
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
                        { attrs: { color: "primary", type: "submit" } },
                        [_vm._v("Guardar")]
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list",
                _vm._l(_vm.aliases, function(alias, index) {
                  return _c("v-list-item", { key: alias.id }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(index + 1 + "  " + alias.name) +
                        "\n                "
                    )
                  ])
                }),
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
        { attrs: { md: "8" } },
        [
          _c(
            "v-toolbar",
            { attrs: { color: "primary", dark: "" } },
            [
              _c("v-toolbar-title", [_vm._v("Tags")]),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { icon: "" },
                  on: {
                    click: function($event) {
                      _vm.dialogSearchTag = !_vm.dialogSearchTag
                    }
                  }
                },
                [_c("v-icon", [_vm._v("fas fa-search")])],
                1
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { icon: "" },
                  on: {
                    click: function($event) {
                      _vm.dialog = !_vm.dialog
                    }
                  }
                },
                [_c("v-icon", [_vm._v("fas fa-plus-circle")])],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list",
            [
              _vm._l(_vm.tags, function(tag) {
                return _c(
                  "v-list-group",
                  {
                    key: tag.tags.id,
                    staticClass: "teal mb-2",
                    attrs: { "no-action": "", color: "white" },
                    on: {
                      click: function($event) {
                        return _vm.deleteAll()
                      }
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "activator",
                          fn: function() {
                            return [
                              _c(
                                "v-list-item-content",
                                [
                                  _c(
                                    "v-list-item-title",
                                    { staticClass: "white--text title" },
                                    [
                                      _c(
                                        "v-menu",
                                        {
                                          attrs: {
                                            bottom: "",
                                            left: "",
                                            "open-on-hover": ""
                                          },
                                          scopedSlots: _vm._u(
                                            [
                                              {
                                                key: "activator",
                                                fn: function(ref) {
                                                  var on = ref.on
                                                  return [
                                                    _c(
                                                      "v-btn",
                                                      _vm._g(
                                                        { attrs: { icon: "" } },
                                                        on
                                                      ),
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            attrs: {
                                                              size: "small"
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "fas fa-ellipsis-v"
                                                            )
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ]
                                                }
                                              }
                                            ],
                                            null,
                                            true
                                          )
                                        },
                                        [
                                          _vm._v(" "),
                                          _c(
                                            "v-list",
                                            [
                                              _c(
                                                "v-list-item",
                                                {
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.toggleAlias(
                                                        tag
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "v-icon",
                                                    {
                                                      attrs: {
                                                        size: "small",
                                                        color: "blue",
                                                        left: ""
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        "fas fa-check-circle"
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(
                                                    "\n                                        Alias\n                                    "
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              tag.status != "Activo"
                                                ? _c(
                                                    "v-list-item",
                                                    {
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.updateTree(
                                                            tag,
                                                            "Activo"
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "v-icon",
                                                        {
                                                          attrs: {
                                                            size: "small",
                                                            color: "success",
                                                            left: ""
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            "fas fa-check-circle"
                                                          )
                                                        ]
                                                      ),
                                                      _vm._v(
                                                        "\n                                        Activar\n                                    "
                                                      )
                                                    ],
                                                    1
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              tag.status === "Activo"
                                                ? _c(
                                                    "v-list-item",
                                                    {
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.updateTree(
                                                            tag,
                                                            "Desactivado"
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "v-icon",
                                                        {
                                                          attrs: {
                                                            size: "small",
                                                            color: "warning",
                                                            left: ""
                                                          }
                                                        },
                                                        [_vm._v("fas fa-times")]
                                                      ),
                                                      _vm._v(
                                                        "\n                                        Desactivar\n                                    "
                                                      )
                                                    ],
                                                    1
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _c(
                                                "v-list-item",
                                                {
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.showEditTagForm(
                                                        tag.tags.id
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "v-icon",
                                                    {
                                                      attrs: {
                                                        size: "small",
                                                        color: "warning",
                                                        left: ""
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        "fas fa-pencil-alt"
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(
                                                    "\n                                        Editar\n                                    "
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-list-item",
                                                {
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.treeDelete(
                                                        tag.id
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "v-icon",
                                                    {
                                                      attrs: {
                                                        size: "small",
                                                        color: "red",
                                                        left: ""
                                                      }
                                                    },
                                                    [_vm._v("fas fa-trash")]
                                                  ),
                                                  _vm._v(
                                                    "\n                                        Eliminar\n                                    "
                                                  )
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(tag.tags.name) +
                                          "\n                            (" +
                                          _vm._s(
                                            tag.children
                                              ? tag.children.length
                                              : 0
                                          ) +
                                          ")\n                        "
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          },
                          proxy: true
                        }
                      ],
                      null,
                      true
                    ),
                    model: {
                      value: tag.active,
                      callback: function($$v) {
                        _vm.$set(tag, "active", $$v)
                      },
                      expression: "tag.active"
                    }
                  },
                  [
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        ref: "div-" + tag.id,
                        refInFor: true,
                        attrs: { id: "div-" + tag.id }
                      },
                      [
                        _c(
                          "v-list-item",
                          { staticStyle: { "background-color": "white" } },
                          [
                            _c("v-list-item-content", [
                              _c(
                                "div",
                                { staticClass: "text-center" },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "float-right",
                                      attrs: { icon: "" },
                                      on: {
                                        click: function($event) {
                                          return _vm.showNewTreeForm(tag.id)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "v-icon",
                                        { attrs: { color: "teal" } },
                                        [_vm._v("fas fa-plus-circle")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _vm._l(tag.children, function(children) {
                                    return _c(
                                      "v-chip",
                                      {
                                        key: children.id,
                                        ref: "chip-" + children.id,
                                        refInFor: true,
                                        class:
                                          "ma-2 " +
                                          (children.status == "Desactivado"
                                            ? "desactivado"
                                            : ""),
                                        attrs: {
                                          color:
                                            children.status == "Desactivado"
                                              ? "#F4F5F7"
                                              : "",
                                          id: "chip-" + children.id
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.handleChildrens(
                                              children,
                                              0,
                                              true,
                                              "div-" + tag.id,
                                              "chip-" + children.id
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "v-tooltip",
                                          {
                                            attrs: { bottom: "" },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "activator",
                                                  fn: function(ref) {
                                                    var on = ref.on
                                                    var attrs = ref.attrs
                                                    return [
                                                      _c(
                                                        "span",
                                                        _vm._g(
                                                          _vm._b(
                                                            {},
                                                            "span",
                                                            attrs,
                                                            false
                                                          ),
                                                          on
                                                        ),
                                                        [
                                                          _vm._v(
                                                            "\n                                                " +
                                                              _vm._s(
                                                                children.tags
                                                                  .name
                                                              ) +
                                                              "\n                                                "
                                                          ),
                                                          _vm._v(
                                                            "\n                                                (" +
                                                              _vm._s(
                                                                children.children
                                                                  ? children
                                                                      .children
                                                                      .length
                                                                  : 0
                                                              ) +
                                                              ")  \n                                            "
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              true
                                            )
                                          },
                                          [
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              _vm._l(children.aliases, function(
                                                alias
                                              ) {
                                                return _c(
                                                  "p",
                                                  { key: alias.id },
                                                  [_vm._v(_vm._s(alias.name))]
                                                )
                                              }),
                                              0
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-menu",
                                          {
                                            attrs: {
                                              bottom: "",
                                              right: "",
                                              "open-on-hover": ""
                                            },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "activator",
                                                  fn: function(ref) {
                                                    var on = ref.on
                                                    return [
                                                      _c(
                                                        "v-btn",
                                                        _vm._g(
                                                          {
                                                            attrs: { icon: "" }
                                                          },
                                                          on
                                                        ),
                                                        [
                                                          _c(
                                                            "v-icon",
                                                            {
                                                              attrs: {
                                                                size: "small"
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "fas fa-ellipsis-v"
                                                              )
                                                            ]
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              true
                                            )
                                          },
                                          [
                                            _vm._v(" "),
                                            _c(
                                              "v-list",
                                              [
                                                _c(
                                                  "v-list-item",
                                                  {
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.toggleAlias(
                                                          children
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c(
                                                      "v-icon",
                                                      {
                                                        attrs: {
                                                          size: "small",
                                                          color: "blue",
                                                          left: ""
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          "fas fa-check-circle"
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(
                                                      "\n                                                Alias\n                                            "
                                                    )
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                children.status != "Activo"
                                                  ? _c(
                                                      "v-list-item",
                                                      {
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.updateTree(
                                                              children,
                                                              "Activo"
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            attrs: {
                                                              size: "small",
                                                              color: "success",
                                                              left: ""
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "fas fa-check-circle"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(
                                                          "\n                                                Activar\n                                            "
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                children.status === "Activo"
                                                  ? _c(
                                                      "v-list-item",
                                                      {
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.updateTree(
                                                              children,
                                                              "Desactivado"
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            attrs: {
                                                              size: "small",
                                                              color: "warning",
                                                              left: ""
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "fas fa-times"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(
                                                          "Desactivar\n                                            "
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "v-list-item",
                                                  {
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.showEditTagForm(
                                                          children.tags.id
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c(
                                                      "v-icon",
                                                      {
                                                        attrs: {
                                                          size: "small",
                                                          color: "warning",
                                                          left: ""
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          "fas fa-pencil-alt"
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(
                                                      "\n                                                Editar\n                                            "
                                                    )
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "v-list-item",
                                                  {
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.treeDelete(
                                                          children.id
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c(
                                                      "v-icon",
                                                      {
                                                        attrs: {
                                                          size: "small",
                                                          color: "red",
                                                          left: ""
                                                        }
                                                      },
                                                      [_vm._v("fas fa-trash")]
                                                    ),
                                                    _vm._v(
                                                      "\n                                                Eliminar\n                                            "
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
                                  })
                                ],
                                2
                              )
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { attrs: { id: "childrens" } },
                      _vm._l(_vm.list_childrens, function(l_child, i) {
                        return _c(
                          "div",
                          {
                            key: l_child.id,
                            ref: "div-" + l_child.id,
                            refInFor: true,
                            attrs: { id: "div-" + l_child.id }
                          },
                          [
                            _c("v-divider", {
                              staticClass: "teal",
                              attrs: { inset: true }
                            }),
                            _vm._v(" "),
                            _c("v-divider", {
                              staticClass: "teal",
                              attrs: { inset: true }
                            }),
                            _vm._v(" "),
                            _c(
                              "v-list-item",
                              { staticStyle: { "background-color": "white" } },
                              [
                                _c("v-list-item-content", [
                                  _c(
                                    "div",
                                    { staticClass: "text-center" },
                                    [
                                      _c(
                                        "v-btn",
                                        {
                                          staticClass: "float-right",
                                          attrs: { icon: "" },
                                          on: {
                                            click: function($event) {
                                              return _vm.showNewTreeForm(
                                                l_child.id
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _c(
                                            "v-icon",
                                            { attrs: { color: "teal" } },
                                            [_vm._v("fas fa-plus-circle")]
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _vm._l(l_child.children, function(c) {
                                        return _c(
                                          "v-chip",
                                          {
                                            key: c.id,
                                            ref: "chip-" + c.id,
                                            refInFor: true,
                                            class:
                                              "ma-2 " +
                                              (c.status == "Desactivado"
                                                ? "desactivado"
                                                : ""),
                                            attrs: {
                                              color:
                                                c.status == "Desactivado"
                                                  ? "#F4F5F7"
                                                  : "",
                                              id: "chip-" + c.id
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.handleChildrens(
                                                  c,
                                                  i,
                                                  false,
                                                  "div-" + l_child.id,
                                                  "chip-" + c.id
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "v-tooltip",
                                              {
                                                attrs: { bottom: "" },
                                                scopedSlots: _vm._u(
                                                  [
                                                    {
                                                      key: "activator",
                                                      fn: function(ref) {
                                                        var on = ref.on
                                                        var attrs = ref.attrs
                                                        return [
                                                          _c(
                                                            "span",
                                                            _vm._g(
                                                              _vm._b(
                                                                {},
                                                                "span",
                                                                attrs,
                                                                false
                                                              ),
                                                              on
                                                            ),
                                                            [
                                                              _vm._v(
                                                                "\n                                                    " +
                                                                  _vm._s(
                                                                    c.tags.name
                                                                  ) +
                                                                  "\n                                                    "
                                                              ),
                                                              _vm._v(
                                                                "\n                                                    (" +
                                                                  _vm._s(
                                                                    c.children
                                                                      ? c
                                                                          .children
                                                                          .length
                                                                      : 0
                                                                  ) +
                                                                  ")  \n                                                "
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      }
                                                    }
                                                  ],
                                                  null,
                                                  true
                                                )
                                              },
                                              [
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  _vm._l(c.aliases, function(
                                                    alias
                                                  ) {
                                                    return _c(
                                                      "p",
                                                      { key: alias.id },
                                                      [
                                                        _vm._v(
                                                          _vm._s(alias.name)
                                                        )
                                                      ]
                                                    )
                                                  }),
                                                  0
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-menu",
                                              {
                                                attrs: {
                                                  bottom: "",
                                                  right: "",
                                                  "open-on-hover": ""
                                                },
                                                scopedSlots: _vm._u(
                                                  [
                                                    {
                                                      key: "activator",
                                                      fn: function(ref) {
                                                        var on = ref.on
                                                        return [
                                                          _c(
                                                            "v-btn",
                                                            _vm._g(
                                                              {
                                                                attrs: {
                                                                  icon: ""
                                                                }
                                                              },
                                                              on
                                                            ),
                                                            [
                                                              _c(
                                                                "v-icon",
                                                                {
                                                                  attrs: {
                                                                    size:
                                                                      "small"
                                                                  }
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "fas fa-ellipsis-v"
                                                                  )
                                                                ]
                                                              )
                                                            ],
                                                            1
                                                          )
                                                        ]
                                                      }
                                                    }
                                                  ],
                                                  null,
                                                  true
                                                )
                                              },
                                              [
                                                _vm._v(" "),
                                                _c(
                                                  "v-list",
                                                  [
                                                    _c(
                                                      "v-list-item",
                                                      {
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.toggleAlias(
                                                              c
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            attrs: {
                                                              size: "small",
                                                              color: "blue",
                                                              left: ""
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "fas fa-check-circle"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(
                                                          "\n                                                    Alias\n                                                "
                                                        )
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    c.status != "Activo"
                                                      ? _c(
                                                          "v-list-item",
                                                          {
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.updateTree(
                                                                  c,
                                                                  "Activo"
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "v-icon",
                                                              {
                                                                attrs: {
                                                                  size: "small",
                                                                  color:
                                                                    "success",
                                                                  left: ""
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "fas fa-check-circle"
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(
                                                              "\n                                                    Activar\n                                                "
                                                            )
                                                          ],
                                                          1
                                                        )
                                                      : _vm._e(),
                                                    _vm._v(" "),
                                                    c.status === "Activo"
                                                      ? _c(
                                                          "v-list-item",
                                                          {
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.updateTree(
                                                                  c,
                                                                  "Desactivado"
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "v-icon",
                                                              {
                                                                attrs: {
                                                                  size: "small",
                                                                  color:
                                                                    "warning",
                                                                  left: ""
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "fas fa-times"
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(
                                                              "\n                                                    Desactivar\n                                                "
                                                            )
                                                          ],
                                                          1
                                                        )
                                                      : _vm._e(),
                                                    _vm._v(" "),
                                                    _c(
                                                      "v-list-item",
                                                      {
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.showEditTagForm(
                                                              c.tags.id
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            attrs: {
                                                              size: "small",
                                                              color: "warning",
                                                              left: ""
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "fas fa-pencil-alt"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(
                                                          "\n                                                    Editar\n                                                "
                                                        )
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "v-list-item",
                                                      {
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.treeDelete(
                                                              c.id
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            attrs: {
                                                              size: "small",
                                                              color: "red",
                                                              left: ""
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "fas fa-trash"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(
                                                          "\n                                                    Eliminar\n                                                "
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
                                      })
                                    ],
                                    2
                                  )
                                ])
                              ],
                              1
                            )
                          ],
                          1
                        )
                      }),
                      0
                    )
                  ]
                )
              }),
              _vm._v(" "),
              _c("v-divider")
            ],
            2
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

/***/ "./resources/js/components/tag/EditTag.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/tag/EditTag.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditTag_vue_vue_type_template_id_4a25fd20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditTag.vue?vue&type=template&id=4a25fd20& */ "./resources/js/components/tag/EditTag.vue?vue&type=template&id=4a25fd20&");
/* harmony import */ var _EditTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditTag.vue?vue&type=script&lang=js& */ "./resources/js/components/tag/EditTag.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditTag_vue_vue_type_template_id_4a25fd20___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditTag_vue_vue_type_template_id_4a25fd20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/tag/EditTag.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/tag/EditTag.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/tag/EditTag.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditTag.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/EditTag.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/tag/EditTag.vue?vue&type=template&id=4a25fd20&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/tag/EditTag.vue?vue&type=template&id=4a25fd20& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTag_vue_vue_type_template_id_4a25fd20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditTag.vue?vue&type=template&id=4a25fd20& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/EditTag.vue?vue&type=template&id=4a25fd20&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTag_vue_vue_type_template_id_4a25fd20___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditTag_vue_vue_type_template_id_4a25fd20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/tag/NewTag.vue":
/*!************************************************!*\
  !*** ./resources/js/components/tag/NewTag.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewTag_vue_vue_type_template_id_2be7271a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewTag.vue?vue&type=template&id=2be7271a& */ "./resources/js/components/tag/NewTag.vue?vue&type=template&id=2be7271a&");
/* harmony import */ var _NewTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewTag.vue?vue&type=script&lang=js& */ "./resources/js/components/tag/NewTag.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewTag_vue_vue_type_template_id_2be7271a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewTag_vue_vue_type_template_id_2be7271a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/tag/NewTag.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/tag/NewTag.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/tag/NewTag.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewTag.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/NewTag.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTag_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/tag/NewTag.vue?vue&type=template&id=2be7271a&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/tag/NewTag.vue?vue&type=template&id=2be7271a& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTag_vue_vue_type_template_id_2be7271a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewTag.vue?vue&type=template&id=2be7271a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/NewTag.vue?vue&type=template&id=2be7271a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTag_vue_vue_type_template_id_2be7271a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTag_vue_vue_type_template_id_2be7271a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/tag/NewTagTree.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/tag/NewTagTree.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewTagTree_vue_vue_type_template_id_f7f22250___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewTagTree.vue?vue&type=template&id=f7f22250& */ "./resources/js/components/tag/NewTagTree.vue?vue&type=template&id=f7f22250&");
/* harmony import */ var _NewTagTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewTagTree.vue?vue&type=script&lang=js& */ "./resources/js/components/tag/NewTagTree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewTagTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewTagTree_vue_vue_type_template_id_f7f22250___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewTagTree_vue_vue_type_template_id_f7f22250___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/tag/NewTagTree.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/tag/NewTagTree.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/tag/NewTagTree.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTagTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewTagTree.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/NewTagTree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTagTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/tag/NewTagTree.vue?vue&type=template&id=f7f22250&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/tag/NewTagTree.vue?vue&type=template&id=f7f22250& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTagTree_vue_vue_type_template_id_f7f22250___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewTagTree.vue?vue&type=template&id=f7f22250& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/tag/NewTagTree.vue?vue&type=template&id=f7f22250&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTagTree_vue_vue_type_template_id_f7f22250___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewTagTree_vue_vue_type_template_id_f7f22250___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/tags/Tags.vue":
/*!******************************************!*\
  !*** ./resources/js/pages/tags/Tags.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tags_vue_vue_type_template_id_6b74c5d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags.vue?vue&type=template&id=6b74c5d6& */ "./resources/js/pages/tags/Tags.vue?vue&type=template&id=6b74c5d6&");
/* harmony import */ var _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tags.vue?vue&type=script&lang=js& */ "./resources/js/pages/tags/Tags.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tags_vue_vue_type_template_id_6b74c5d6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tags_vue_vue_type_template_id_6b74c5d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/tags/Tags.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/tags/Tags.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/tags/Tags.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Tags.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/tags/Tags.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/tags/Tags.vue?vue&type=template&id=6b74c5d6&":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/tags/Tags.vue?vue&type=template&id=6b74c5d6& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_6b74c5d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Tags.vue?vue&type=template&id=6b74c5d6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/tags/Tags.vue?vue&type=template&id=6b74c5d6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_6b74c5d6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_6b74c5d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=0.js.map