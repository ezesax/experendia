<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="600">
            <new-tag @dialogDismiss="dialogNewTagDismiss"></new-tag>
        </v-dialog>
        <v-dialog v-model="dialogTree" width="600">
            <new-tag-tree
                @dialogDismiss="dialogNewTreeDismiss"
                :parent-id="parentId"
            ></new-tag-tree>
        </v-dialog>
        <!--Search Single Tag Modal-->
        <v-dialog v-model="dialogSearchTag" width="600" @click:outside="dialogSearchTagDismiss()">
            <template>
                <v-card>
                    <v-card-title>Buscar Tag</v-card-title>
                    <v-card-text>
                        <v-autocomplete
                            v-model="tag_search"
                            :items="tagCloud"
                            item-text="text"
                            item-value="value"
                            @change="showEditBtn = true"
                            outlined
                            dense
                            chips
                            small-chips
                            label="Tags"
                            required
                        ></v-autocomplete>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" class="float-right" @click="showEditTagForm()" v-model="showEditBtn">
                                Editar
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </template>
        </v-dialog>
        <!--Tag Edit Modal-->
        <v-dialog v-model="dialogEdit" width="600" @click:outside="dialogEditTagDismiss()">
            <template v-click-outside="dialogEditTagDismiss()">
                <v-card>
                    <v-card-title>Editar Tag</v-card-title>
                    <v-alert :type="alertType" v-show="alert" dismissible>{{alertMsg}}</v-alert>
                    <v-form ref="editForm" @submit="update($event)">
                        <v-card-text>
                            <v-text-field
                                v-model="name"
                                label="Nombre"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="description"
                                label="Descripcion"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="keywords"
                                label="Keywords"
                            ></v-text-field>

                            <v-select
                                :items="types"
                                v-model="tag_type"
                                label="Tipos"
                                multiple
                                chips
                                hint="Selecciona los tipos de tag"
                                persistent-hint
                                required
                            ></v-select>

                            <v-select
                                :items="status_list"
                                v-model="status"
                                item-text="name"
                                item-value="name"
                                label="Estatus"
                                required
                            ></v-select>
                        </v-card-text>
                        <v-card-text>
                            <div
                                v-for="branch in branches"
                                :key="branch"
                            >
                                <p class="primary--text">{{branch}}</p>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" type="submit" ref="btnSub"
                                >Guardar</v-btn
                            >
                        </v-card-actions>
                    </v-form>
                </v-card>
            </template>
        </v-dialog>
        <v-dialog v-model="dialogAlias" width="600">
            <v-card>
                <v-card-title>Alias - {{activeTag}}</v-card-title>
                <v-form ref="form" @submit="saveAlias($event)">
                    <v-card-text>
                        <v-text-field
                            v-model="aliasName"
                            label="Nombre"
                            required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" type="submit">Guardar</v-btn>
                    </v-card-actions>
                </v-form>
                <v-list>
                    <v-list-item
                        v-for="(alias, index) in aliases"
                        :key="alias.id"
                    >
                        {{ `${index + 1}  ${alias.name}` }}
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
        <v-col md="8">
            <v-toolbar color="primary" dark>
                <v-toolbar-title>Tags</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogSearchTag = !dialogSearchTag">
                    <v-icon>fas fa-search</v-icon>
                </v-btn>
                <v-btn icon @click="dialog = !dialog">
                    <v-icon>fas fa-plus-circle</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list>
                <!-- father alias -->
                <v-list-group
                    v-for="tag in tags"
                    :key="tag.tags.id"
                    v-model="tag.active"
                    no-action
                    class="teal mb-2"
                    color="white"
                    @click="deleteAll()"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class="white--text title">
                                <!-- menu father alias -->
                                <v-menu bottom left open-on-hover>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on">
                                            <v-icon size="small">fas fa-ellipsis-v</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item @click="toggleAlias(tag)">
                                            <v-icon size="small" color="blue" left>fas fa-check-circle</v-icon>
                                            Alias
                                        </v-list-item>

                                        <v-list-item
                                            v-if="tag.status != 'Activo'"
                                            @click="updateTree(tag, 'Activo')"
                                        >
                                            <v-icon size="small" color="success" left>fas fa-check-circle</v-icon>
                                            Activar
                                        </v-list-item>
                                        <v-list-item
                                            v-if="tag.status === 'Activo'"
                                            @click="updateTree(tag, 'Desactivado')"
                                        >
                                            <v-icon size="small" color="warning" left>fas fa-times</v-icon>
                                            Desactivar
                                        </v-list-item>
                                        <v-list-item
                                            @click="showEditTagForm(tag.tags.id)"
                                        >
                                            <v-icon size="small" color="warning" left>fas fa-pencil-alt</v-icon>
                                            Editar
                                        </v-list-item>
                                        <v-list-item
                                            @click="treeDelete(tag.id)"
                                        >
                                            <v-icon size="small" color="red" left>fas fa-trash</v-icon>
                                            Eliminar
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                {{ tag.tags.name }}
                                ({{tag.children ? tag.children.length : 0}})
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <!-- firts rows alias -->
                    <div :ref="`div-${tag.id}`" :id="`div-${tag.id}`">
                        <v-list-item style="background-color: white;">
                            <v-list-item-content>
                                <div class="text-center">
                                    <!-- Btn new tree -->
                                    <v-btn icon class="float-right" @click="showNewTreeForm(tag.id)">
                                        <v-icon color="teal">fas fa-plus-circle</v-icon>
                                    </v-btn>
                                    <!-- chip what contains alias name -->
                                    <v-chip
                                        :class="`ma-2 ${children.status == 'Desactivado' ? 'desactivado' : ''}`"
                                        :color="children.status == 'Desactivado' ? '#F4F5F7' : ''"
                                        v-for="children in tag.children"
                                        :key="children.id"
                                        :ref="`chip-${children.id}`"
                                        :id="`chip-${children.id}`"
                                        @click="handleChildrens(children,  0, true, `div-${tag.id}`,`chip-${children.id}`)"
                                        >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span v-bind="attrs" v-on="on">
                                                    <!-- nombre -->
                                                    {{ children.tags.name }}
                                                    <!-- childrens count -->
                                                    ({{children.children ? children.children.length : 0}})  
                                                </span>
                                            </template>
                                            <span>
                                                <p v-for="alias in children.aliases" :key="alias.id">{{alias.name}}</p>
                                            </span>
                                        </v-tooltip>
                                        <!-- menu button -->
                                        <v-menu bottom right open-on-hover>
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon v-on="on">
                                                    <v-icon size="small">fas fa-ellipsis-v</v-icon>
                                                </v-btn>
                                            </template>
                                            <!-- menu actions -->
                                            <v-list>
                                                <v-list-item
                                                    @click="toggleAlias(children)">
                                                    <v-icon size="small" color="blue" left >fas fa-check-circle</v-icon>
                                                    Alias
                                                </v-list-item>

                                                <v-list-item
                                                    v-if="children.status != 'Activo'"
                                                    @click="updateTree( children,'Activo')">
                                                    <v-icon size="small" color="success" left>fas fa-check-circle</v-icon>
                                                    Activar
                                                </v-list-item>
                                                <v-list-item
                                                    v-if="children.status === 'Activo'"
                                                    @click="updateTree(children,'Desactivado')"
                                                >
                                                    <v-icon size="small" color="warning" left>fas fa-times</v-icon>Desactivar
                                                </v-list-item>
                                                <v-list-item
                                                    @click="showEditTagForm(children.tags.id)"
                                                >
                                                    <v-icon size="small" color="warning" left>fas fa-pencil-alt</v-icon>
                                                    Editar
                                                </v-list-item>
                                                <v-list-item
                                                    @click="treeDelete(children.id)"
                                                >
                                                    <v-icon size="small" color="red" left>fas fa-trash</v-icon>
                                                    Eliminar
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>     
                                    </v-chip>    
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </div>

                    <div id="childrens">
                        <div v-for="(l_child, i) in list_childrens" :key="(l_child.id)" :id="'div-' + (l_child.id)" :ref="'div-' + (l_child.id)">
                            <v-divider :inset="true" class="teal"></v-divider>
                            <v-divider :inset="true" class="teal"></v-divider>
                            <v-list-item style="background-color: white;">
                                <v-list-item-content>
                                    <div class="text-center">
                                        <!-- btn new tree -->
                                        <v-btn icon class="float-right" @click="showNewTreeForm(l_child.id)">
                                            <v-icon color="teal">fas fa-plus-circle</v-icon>
                                        </v-btn>
                                        <v-chip
                                            :color="c.status == 'Desactivado' ? '#F4F5F7' : ''"
                                            :class="`ma-2 ${c.status == 'Desactivado' ? 'desactivado' : ''}`"
                                            v-for="c in l_child.children"
                                            :key="c.id"
                                            @click="handleChildrens(c, i, false, `div-${l_child.id}`, `chip-${c.id}`)"
                                            :ref="`chip-${c.id}`"
                                            :id="`chip-${c.id}`"
                                        >
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <span v-bind="attrs" v-on="on">
                                                        <!-- nombre -->
                                                        {{ c.tags.name }}
                                                        <!-- childrens count -->
                                                        ({{c.children ? c.children.length : 0}})  
                                                    </span>
                                                </template>
                                                <span>
                                                    <p v-for="alias in c.aliases" :key="alias.id">{{alias.name}}</p>
                                                </span>
                                            </v-tooltip>
                                            <v-menu bottom right open-on-hover>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn icon v-on="on">
                                                        <v-icon size="small">fas fa-ellipsis-v</v-icon>
                                                    </v-btn>
                                                </template>

                                                <v-list>
                                                    <v-list-item
                                                        @click="toggleAlias(c)"
                                                    >
                                                        <v-icon size="small" color="blue" left>fas fa-check-circle</v-icon>
                                                        Alias
                                                    </v-list-item>

                                                    <v-list-item
                                                        v-if="c.status != 'Activo'"
                                                        @click="updateTree(c,'Activo')"
                                                    >
                                                        <v-icon size="small" color="success" left >fas fa-check-circle</v-icon>
                                                        Activar
                                                    </v-list-item>
                                                    <v-list-item
                                                        v-if="c.status === 'Activo'"
                                                        @click="updateTree(c,'Desactivado')"
                                                    >
                                                        <v-icon size="small" color="warning" left>fas fa-times</v-icon>
                                                        Desactivar
                                                    </v-list-item>
                                                    <v-list-item
                                                        @click="showEditTagForm(c.tags.id)"
                                                    >
                                                        <v-icon size="small" color="warning" left>fas fa-pencil-alt</v-icon>
                                                        Editar
                                                    </v-list-item>
                                                    <v-list-item @click="treeDelete(c.id)">
                                                        <v-icon size="small" color="red" left>fas fa-trash</v-icon>
                                                        Eliminar
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-chip>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </div>
                    </div>
                </v-list-group>
                <v-divider></v-divider>
            </v-list>
        </v-col>
    </v-row>
</template>

<script>
import Token from "../../config/Token";
import NewTag from "../../components/tag/NewTag";
import NewTagTree from "../../components/tag/NewTagTree";

export default {
    name: "Tags",
    components: {
        "new-tag": NewTag,
        "new-tag-tree": NewTagTree
    },
    data: () => ({
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
        status_list: [
            { name: "Pendiente" },
            { name: "Desactivado" },
            { name: "Activo" },
            { name: "Eliminado" }
        ],
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
    }),
    mounted() {
        Token.isExpired();
        this.getTags();
        this.getTagCloud();
    },
    methods: {
        getTags() {
            this.$api.request
                .get("/admin/tags_tree")
                .then(res => {
                    this.$data.tags = res.data.response;
                })
                .catch(err => console.log("err >>", err));
        },
        getTagCloud() {
            this.$api.request
                .get("/admin/tags")
                .then(res => {
                    let tags = res.data.data;
                    for (let i in tags) {
                        this.tagCloud.push({
                            value: tags[i].id,
                            text: tags[i].name
                        })
                    }
                })
                .catch(err => console.log("err >>", err));
        },
        getTypes() {
            this.$api.request
                .get("/admin/tags/get_tag_types")
                .then(res => {
                    const { response } = res.data;
                    for (const key in response) {
                        if (response.hasOwnProperty(key)) {
                            const element = response[key];
                            this.$data.types.push({
                                value: key,
                                text: element
                            });
                        }
                    }
                })
                .catch(err => console.error(err));
        },
        getTag() {
            this.$api.request
                .get("/admin/tags/"+this.tagId)
                .then(res => {
                    let tag = res.data.response;

                    this.$data.name = tag.name;
                    this.$data.description = tag.description;
                    this.$data.keywords = tag.keywords;
                    this.$data.status = tag.status;
                    this.$data.id = this.tagId;

                    for (const key in tag.tag_type) {
                        if (tag.tag_type.hasOwnProperty(key)) {
                            const element = tag.tag_type[key];
                            this.$data.tag_type.push(
                                String(element.id)
                            );
                        }
                    }
                    //this.$data.tag_type = tag.tag_type;

                })
                .catch(err => console.error(err));
        },
        getAllTagBranches(tagId) {
            this.$api.request
                .get(`/admin/tags_tree/get_tag_all_branches/${tagId}`)
                .then(res => {
                    let { response } = res.data;
                    for (const key in response) {
                        if (response.hasOwnProperty(key)) {
                            const element = response[key];
                            this.branches.push(element.tree);
                        }
                    }
                })
                .catch(err => console.error(err));
        },
        handleChildrens(tag, i, parent = false, div, chip) {
            const vChip = this.$refs[chip][0];
            const vDiv = this.$refs[div][0];

            const vChildrens =
                vDiv.children[parent ? 0 : 2].children[0].children[0].children;

            this.removeActiveClass(vChildrens, vChip.$el.id);


            const isActive = vChip.$el.classList.contains("teal");

            console.log(isActive)

            vChip.$el.classList.toggle("teal");
            vChip.$el.classList.toggle("white--text");

            vChip.$el.classList.contains('desactivado') ? vChip.$el.classList.contains('teal') ? vChip.$el.classList.remove("blue-grey", "lighten-5") : vChip.$el.classList.add("blue-grey", "lighten-5") : '';


            if (parent && isActive) this.deleteAll(tag.id);
            else if (parent && !isActive) this.addChildren(tag, i, parent);
            else if (!parent && !isActive) this.addChildren(tag, i, false);
            else if (!parent && isActive) this.removeChildrens(tag, i);
        },
        addChildren(tag, i, parent = false) {
            if (this.$data.list_childrens.length > i) {
                i = parent ? 0 : i + 1;

                this.$data.list_childrens = this.$data.list_childrens.slice(
                    0,
                    i
                );
            }

            if (tag.children) {
                this.$data.list_childrens.push(tag);
            } else {
              this.list_childrens.push(tag);
            }
        },
        removeChildrens(tag, i) {
            this.$data.list_childrens = this.$data.list_childrens.slice(
                0,
                i + 1
            );
        },

        removeActiveClass(childrens, id) {
            for (let index = 0; index < childrens.length; index++) {
                if (childrens[index].id !== id) {
                    childrens[index].classList.remove("teal", "white--text");
                    childrens[index].classList.contains('desactivado') ? childrens[index].classList.add("blue-grey", "lighten-5") : ''
                }
            }
        },
        deleteAll(currentTagId) {
            this.$data.list_childrens = [];
        },
        dialogNewTagDismiss() {
            this.getTags();
            this.dialog = false;
        },
        dialogNewTreeDismiss() {
            this.getTags();
            this.dialogTree = false;
        },
        dialogEditTagDismiss() {
            this.branches = [];
            this.dialogEdit = false;
        },
        dialogSearchTagDismiss() {
            this.dialogSearchTag = false;
            this.showEditBtn = false;
            this.tag_search = [];
        },
        showNewTreeForm(parentId) {
            this.parentId = parentId;
            this.dialogTree = true;
        },
        showEditTagForm(id = null) {
            id = id != null ? id : this.tag_search;
            this.tagId = id;
            this.dialogEdit = true;
            this.flushEditForm();
            this.getTypes();
            this.getTag();
            this.getAllTagBranches(id);
        },
        flushEditForm() {
            this.$data.name = "";
            this.$data.description = "";
            this.$data.keywords = "";
            this.$data.status = "";
            this.$data.tag_type = [];
        },
        toggleAlias(item) {
            this.$api.request
                .get(`/admin/tags_tree/${item.id}/tag_aliases`)
                .then(res => {
                    this.activeTag = item.tags.name
                    this.aliases = res.data.data;
                    this.treeAlias = item.id;
                    this.dialogAlias = true;
                    this.aliasName = res.data.data.map(e => e.name).join(";");
                })
                .catch(err => console.log(err));
        },
        updateTree(item, status) {
            const { tag_id, tree, branch, level, parent_id } = item;
            const data = { tag_id, tree, branch, level, parent_id, status };

            const confirm = window.confirm("Estas seguro?");

            if (confirm) {
                this.$api.request
                    .put(`/admin/tags_tree/${item.id}`, data)
                    .then(res => {
                        this.getTags();
                    })
                    .catch(err => console.error(err));
            }
        },
        update(event) {
            event.preventDefault();
            const data = {
                name: this.$data.name,
                description: this.$data.description,
                keywords: this.$data.keywords,
                tag_type: this.$data.tag_type,
                status: this.$data.status
            };

            this.$api.request
                .put(`/admin/tags/${this.$data.id}`, data)
                .then(res => {
                    this.alert = true;
                    this.alertType = 'success';
                    this.alertMsg = 'Tag actualizado con exito';
                    this.$data.id = null;
                    setTimeout(() => {
                        this.$emit("dialogDismiss");
                        this.alert = false;
                        this.dialogEdit = false;
                        this.getTags();
                    }, 1000);
                })
                .catch(err => {
                    if(err.response.status == 400) {
                        this.alert = true;
                        this.alertType = 'warning';
                        this.alertMsg = 'Hay campos incorrectos o faltantes';
                        this.$data.id = null;
                        setTimeout(() => {
                            this.alert = false;
                        }, 2000);
                    } else {
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertMsg = 'Ocurrio un error inesperado';
                        this.$data.id = null;
                        setTimeout(() => {
                            this.alert = false;
                        }, 2000);
                    }
                });
        },
        saveAlias(event) {
            event.preventDefault();
            this.$api.request
                .post(`/admin/tags_tree/${this.treeAlias}/tag_aliases`, {
                    name: this.aliasName,
                    status: "Activo"
                })
                .then(res => {
                    this.aliasName = null;
                    this.dialogAlias = false;
                    this.getTags();
                })
                .catch(err => console.log(err));
        },
        treeDelete(id) {
            const confirm = window.confirm("Estas seguro?");
            if (confirm) {
                this.$api.request
                    .delete(`/admin/tags_tree/${id}`)
                    .then(res => {
                        console.log(res);
                        this.getTags();
                    })
                    .catch(err => console.error(err));
            }
        },
        test() {
            alert('Funciona');
        }
    }
};
</script>
