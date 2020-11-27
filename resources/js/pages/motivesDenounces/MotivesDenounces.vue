<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-alert :type="alertType" v-model="alert" dismissible>
                    {{alertMsg}}
                </v-alert>
                <v-card-title>{{action}}</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <input type="hidden" v-model="id" />
                        <v-text-field
                            v-model="name"
                            label="Nombre"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="description"
                            label="Descripcion"
                        ></v-text-field>
                        <v-autocomplete
                            :items="motives_list"
                            v-model="parent_id"
                            item-text="name"
                            item-value="id"
                            label="Padre"
                            
                        ></v-autocomplete>
                        <v-select
                            :items="status_list"
                            v-model="status"
                            item-text="name"
                            item-value="name"
                            label="Estatus"
                            required
                        ></v-select>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="save">Guardar</v-btn>
                    <v-btn @click="reset">Reset</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-col>
            <v-card elevation="4">
                <v-toolbar color="primary" dark>
                    <v-toolbar-title>
                        Motivos de Denuncia
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="newMotive"
                        ><v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-treeview :items="items" open-on-click expand-icon="">
                    <template #prepend="{item, open}">
                        <v-icon v-if="item.children" size="small">
                            fa fa-{{ open ? "minus" : "plus" }}
                        </v-icon>
                    </template>
                    <template #label="{item}">
                        {{item.name}}
                        <small :class="status_colors[`${item.status}`]">
                            (<strong>{{item.status}}</strong>)
                        </small>
                    </template>
                    <template #append="{item}">
                        <v-btn icon x-small @click="edit(item)" color="warning"
                            ><v-icon>fa fa-pencil-alt</v-icon>
                        </v-btn>
                    </template>
                </v-treeview>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import Token from "../../config/Token";

export default {
    name: "MotivesDenounces",
    data: () => ({
        items: undefined,
        id: null,
        parent_id: null,
        search: "",
        dialog: false,
        motives_list: [],
        status_list: [
            { name: "Pendiente" },
            { name: "Desactivado" },
            { name: "Activo" },
            { name: "Eliminado" }
        ],
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
    }),
    mounted(){
        Token.isExpired();
        this.getMotives();
        this.getMotivesList();
    },
    methods: {
        getMotives() {
            this.$api.request
            .get("/admin/motives_denounces")
                .then(res => {
                    this.$data.items = res.data.response;
                })
                .catch(err => console.log("err >>", err));
        },
        getMotivesList() {
            this.$api.request
            .get("/admin/motives_denounces/get_motives_denounces_list")
                .then(res => {
                    let data = [];

                    let a = res.data.response;

                    for (const key in a) {
                        if (a.hasOwnProperty(key)) {
                            const element = a[key];
                            data.push({ id: parseInt(key), name: element });
                        }
                    }

                    this.$data.motives_list = data;
                })
                .catch(err => console.log("err >>", err));
        },
        newMotive() {
            this.reset();
            this.$data.action = "Crear Motivo de Denuncia";
            this.$data.id = null;
            this.$data.dialog = true;
        },
        edit(motive) {
            this.$data.action = "Editar Motivo de Denuncia";
            this.$data.name = motive.name;
            this.$data.parent_id = motive.parent_id;
            this.$data.status = motive.status;
            this.$data.id = motive.id;
            this.$data.description = motive.description;
            this.$data.dialog = true;
        },
        save() {
            let data = {
                parent_id: this.$data.parent_id,
                name: this.$data.name,
                description: this.$data.description,
                status: this.$data.status
            };

            if (this.$data.id) {
                this.$api.request
                    .put(`/admin/motives_denounces/${this.$data.id}`, data)
                    .then(res => {
                        if(data.status == 'Eliminado')
                            this.delete(this.$data.id);
                            
                        this.alertType = 'success';
                        this.alertMsg = 'Motivo actualizado con exito';
                        this.alert = true;

                        setTimeout(() => {
                            this.reset();
                            this.getMotives();
                            this.getMotivesList();
                            this.alert = false;
                            this.$data.dialog = false;
                        }, 2000);
                    })
                    .catch(reason => {
                        this.alertType = 'error';
                        this.alertMsg = 'Ha ocurrido un error inesperado';
                        this.alert = true;
                    });
            } else {
                this.$api.request
                    .post("/admin/motives_denounces", data)
                    .then(res => {
                        this.alertType = 'success';
                        this.alertMsg = 'Motivo creado con exito';
                        this.alert = true;
                        
                        setTimeout(() => {
                            this.reset();
                            this.getMotives();
                            this.getMotivesList();
                            this.alert = false;
                            this.$data.dialog = false;
                        }, 2000);
                    })
                    .catch(reason => {
                        this.alertType = 'error';
                        this.alertMsg = 'Ha ocurrido un error inesperado';
                        this.alert = true;
                    });
            }
        },
        delete(id) {
            this.$api.request
                .delete(`/admin/motives_denounces/${id}`)
                .then(res => {
                    console.log('Recurso eliminado');
                })
                .catch(reason => console.log(reason.error));
        },
        reset() {
            if(this.$refs.form)
                this.$refs.form.reset();
            this.$data.id = null;
        }
    }
};
</script>