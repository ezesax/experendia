<template>
    <v-row>
        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-alert type="error" v-model="alert" dismissible>
                    {{msg}}
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
                            v-model="denomination"
                            label="Denomicacion"
                        ></v-text-field>

                        <v-text-field
                            v-model="latitude"
                            label="Latitude"
                        ></v-text-field>
                        <v-text-field
                            v-model="longitude"
                            label="Longitud"
                        ></v-text-field>

                        <v-select
                            :items="zones_list"
                            v-model="parent_id"
                            item-text="name"
                            item-value="id"
                            label="Zona Padre"
                        ></v-select>

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
                        ZONAS
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="nuevo"
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
                        <small class="primary--text">
                            (<strong>{{item.denomination}},
                            <span :class="status_colors[`${item.status}`]">{{item.status}}</span></strong>)
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
    name: "Zones",
    data: () => ({
        items: undefined,
        id: null,
        parent_id: null,
        search: "",
        dialog: false,
        zones_list: [],
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
        denomination: null,
        latitude: null,
        longitude: null,
        status: null,
        alert: false,
        msg: '',
        action: ""
    }),
    mounted() {
        Token.isExpired();
        this.getZones();
        this.getListZones();
    },
    methods: {
        getZones() {
            this.$api.request
                .get("/admin/zones")
                .then(res => {
                    this.$data.items = res.data.response;
                })
                .catch(err => console.log("err >>", err));
        },
        getListZones() {
            this.$api.request
                .get("/admin/zones/get_zone_list")
                .then(res => {
                    let data = [];

                    let a = res.data.response;

                    for (const key in a) {
                        if (a.hasOwnProperty(key)) {
                            const element = a[key];
                            data.push({ id: parseInt(key), name: element });
                        }
                    }

                    this.$data.zones_list = data;
                })
                .catch(err => console.log(err));
        },
        save() {
            let data = {
                parent_id: this.$data.parent_id,
                name: this.$data.name,
                denomination: this.$data.denomination,
                latitude: this.$data.latitude,
                longitude: this.$data.longitude,
                status: this.$data.status
            };

            if (this.$data.id) {
                this.$api.request
                    .put(`/admin/zones/${this.$data.id}`, data)
                    .then(res =>{
                        if(data.status == 'Eliminado')
                            this.delete(this.$data.id);

                        console.log(res);
                        this.reset();
                        this.getZones();
                        this.getListZones();
                        this.$data.dialog = false;
                    })
                    .catch(reason => console.log(reason.error));
            } else {
                this.$api.request
                    .post("/admin/zones", data)
                    .then(res => {
                        console.log(res);
                        this.reset();
                        this.getZones();
                        this.getListZones();
                        this.$data.dialog = false;
                    })
                    .catch(error => {
                        console.error(error.response)
                        if(error.response.data.response == 'there is already a record with that combination') {
                            this.alert = true;
                            this.msg = 'Ya existe una zona con esta combinación'
                        }
                    });
            }
        },
        nuevo() {
            this.action = "Crear Zona"
            this.$data.dialog = true;
            this.reset();
        },
        edit(item) {
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
        delete(id) {
            this.$api.request
                .delete(`/admin/zones/${id}`)
                .then(res => {
                    console.log('Recurso eliminado');
                })
                .catch(reason => console.log(reason.error));
        },
        reset() {
            this.$refs.form.reset();
            this.$data.id = null;
        }
    }
};
</script>

<style></style>
