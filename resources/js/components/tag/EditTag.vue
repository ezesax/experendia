<template>
    <v-card>
        <v-card-title>Editar Tag</v-card-title>
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

<script>
export default {
    name: "EditTag",
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
        alertType: "success",
        alertMsg: "",
        alert: false
    }),
    props: ["tagId"],
    mounted() {
        this.reset();
        this.getTypes();
        this.getTag();
    },
    methods: {
        reset() {
            this.$refs.form.reset();
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
                    //this.$data.tag_type = tag.tag_type;

                })
                .catch(err => console.error(err));
        }
    }
}
</script>