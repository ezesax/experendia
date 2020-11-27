<template>
    <v-card>
        <v-card-title>Nuevo Elemento</v-card-title>
        <v-alert :type="alertType" v-show="alert" dismissible v-on:close="close">{{alertMsg}}</v-alert>
        <v-form ref="form" @submit="save($event)">
            <v-card-text>
                <v-autocomplete v-model="tag_id" :items="tags"></v-autocomplete>
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
    name: "NewTagTree",
    data: () => ({
        tag_id: null,
        tags: [],
        status_list: [
            { name: "Pendiente" },
            { name: "Desactivado" },
            { name: "Activo" },
            { name: "Eliminado" }
        ],
        status: "",
        alertType: "",
        alertMsg: "",
        alert: false
    }),
    props: ["parentId"],
    mounted() {
        this.getTagList();
    },
    methods: {
        getTagList() {
            this.$api.request.get("/admin/tags/get_tag_list").then(res => {
                const { response } = res.data;

                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        const element = response[key];
                        this.$data.tags.push({ value: key, text: element });
                    }
                }
            });
        },
        save(event) {
            event.preventDefault();
            const data = {
                tag_id: this.$data.tag_id,
                tree: 1,
                branch: 1,
                level: 1,
                parent_id: this.parentId,
                status: this.$data.status
            };

            this.$api.request
                .post("/admin/tags_tree", data)
                .then(res => {
                    this.$data.alert = true;
                    this.$data.alertType = 'success';
                    this.$data.alertMsg = 'Tag guardado con exito';
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
                        this.$data.alertMsg = 'El tag ya se encuentra en esta rama';
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
        }
    }
};
</script>

<style></style>
