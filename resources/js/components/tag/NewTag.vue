<template>
    <v-card>
        <v-card-title>Nuevo Tag</v-card-title>
        <v-alert :type="alertType" v-show="alert" dismissible>{{alertMsg}}</v-alert>
        <v-form ref="form" @submit="save($event)">
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

                <v-checkbox
                    v-model="root"
                    :label="`Es tag padre`"
                ></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" ref="btnSub"
                    >Guardar</v-btn
                >
                <v-btn @click="reset">Reset</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import NewTagTreeVue from './NewTagTree.vue';
import EditTag from "./EditTag.vue";
export default {
    name: "NewTag",
    data: () => ({
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
        root: false,
        alertType: "success",
        alertMsg: "",
        alert: false
    }),
    mounted() {
        this.getTypes();
    },
    methods: {
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
        save(event) {
            event.preventDefault();
            // this.$refs.btnSub.$el.disabled = true;
            const data = {
                name: this.$data.name,
                description: this.$data.description,
                keywords: this.$data.keywords,
                tag_type: this.$data.tag_type,
                status: this.$data.status
            };
            this.$api.request
                .post("/admin/tags", data)
                .then(res => {
                    if(this.$data.root){
                        this.saveRoot(res.data.response.id);
                    }else{
                        this.alert = true;
                        this.alertType = 'success';
                        this.alertMsg = 'Tag creado con exito';
                        this.$refs.form.reset()
                        setTimeout(() => {
                            this.$emit("dialogDismiss");
                            this.alert = false;
                        }, 1000);
                    }
                })
                .catch(err => {
                    if(err.response.status == 400) {
                        this.alert = true;
                        this.alertType = 'warning';
                        this.alertMsg = 'El tag ya existe';

                        setTimeout(() => {
                            this.alert = false;
                        }, 2000);
                    } else {
                        this.alert = true;
                        this.alertType = 'error';
                        this.alertMsg = 'Ocurrio un error inesperado';
                        setTimeout(() => {
                            this.alert = false;
                        }, 2000);
                    }
                });
        },
        saveRoot(tagId) {
            const data = {
                tag_id: tagId,
                tree: 1,
                branch: 1,
                level: 1,
                parent_id: null,
                status: this.$data.status
            };

            this.$api.request
                .post("/admin/tags_tree", data)
                .then(res => {
                    this.$data.alert = true;
                    this.$data.alertType = 'success';
                    this.$data.alertMsg = 'Tag padre creado con exito';
                    this.$refs.form.reset();
                    setTimeout(() => {
                        this.$emit("dialogDismiss");
                        this.$data.alert = false;
                    }, 1000);
                })
                .catch(err => {
                    if(err.response.status == 400) {
                        this.$data.alert = true;
                        this.$data.alertType = 'warning';
                        this.$data.alertMsg = 'Ya hay un tag padre con el mismo nombre';
                        setTimeout(() => {
                            this.$data.alert = false;
                        }, 2000);
                    } else {
                        this.$data.alert = true;
                        this.$data.alertType = 'error';
                        this.$data.alertMsg = 'Ocurrio un error inesperado';
                        setTimeout(() => {
                            this.$data.alert = false;
                        }, 2000);
                    }
                });
        },
        reset() {
            this.$refs.form.reset();
            this.$data.root = false;
        }
    }
};
</script>

<style></style>
