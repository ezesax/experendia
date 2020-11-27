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
                            label="Palabra"
                            required
                        ></v-text-field>
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
                        Palabras Prohibidas
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="newWord"
                        ><v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card>
                    <v-text-field
                        v-model="search"
                        append-icon="fas fa-search"
                        label="Buscar"
                        single-line
                        hide-details
                    >
                    </v-text-field>
                </v-card>
                <v-data-table
                    :headers="headers"
                    :items="items"
                    :footer-props="footerProps"
                    :search="search"
                    class="elevation-1"
                >
                    <template v-slot:item.id="{ item }">
                        <strong>{{item.id}}</strong>
                    </template>
                    <template v-slot:item.name="{ item }">
                        {{item.name}}
                    </template>
                    <template v-slot:item.status="{ item }">
                        <strong :class="status_colors[`${item.status}`]">{{item.status}}</strong>
                    </template>
                    <template v-slot:item.created_at="{ item }">
                        <strong class="info--text">{{item.created_at}}</strong>
                    </template>
                    <template v-slot:item.edit="{ item }">
                        <v-btn icon x-small @click="edit(item)" color="warning"
                            ><v-icon>fa fa-pencil-alt</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import Token from "../../config/Token";

export default {
    name: "ForbiddenWords",
    data: () => ({
        items: undefined,
        id: null,
        search: "",
        dialog: false,
        search: "",
        headers: [
            {
            text: 'Id',
            align: 'start',
            sortable: false,
            value: 'id',
            },
            { text: 'Nombre', value: 'name' },
            { text: 'Estado', value: 'status' },
            { text: 'Fecha de creación', value: 'created_at' },
            { text: '', value: 'edit' },
        ],
        footerProps: {
            'items-per-page-options': [25, 50, 100, 500, -1],
            'items-per-page': 25
        },
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
        this.getWords();
    },
    methods: {
        getWords() {
            this.$api.request
            .get("/admin/forbidden_words")
                .then(res => {
                    this.$data.items = this.formatDates(res.data.response);
                })
                .catch(err => console.log("err >>", err));
        },
        newWord() {
            this.reset();
            this.$data.action = "Crear Palabra";
            this.$data.id = null;
            this.$data.dialog = true;
        },
        formatDates(data) {
            return data.filter(i => {
                let date = new Date(i.created_at);
                let createdAt = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
                i.created_at = createdAt;

                return i;
            });
        },
        edit(word) {
            this.$data.action = "Editar Palabra";
            this.$data.name = word.name;
            this.$data.status = word.status;
            this.$data.id = word.id;
            this.$data.dialog = true;
        },
        save() {
            let data = {
                name: this.$data.name,
                status: this.$data.status
            };

            if (this.$data.id) {
                this.$api.request
                    .put(`/admin/forbidden_words/${this.$data.id}`, data)
                    .then(res => {
                        if(data.status == 'Eliminado')
                            this.delete(this.$data.id);
                            
                        this.alertType = 'success';
                        this.alertMsg = 'Palabra actualizada con exito';
                        this.alert = true;

                        setTimeout(() => {
                            this.reset();
                            this.getWords();
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
                    .post("/admin/forbidden_words", data)
                    .then(res => {
                        this.alertType = 'success';
                        this.alertMsg = 'Palabra creada con exito';
                        this.alert = true;
                        
                        setTimeout(() => {
                            this.reset();
                            this.getWords();
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
                .delete(`/admin/forbidden_words/${id}`)
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