<template>
  <v-row justify="center">
    <v-col md="8">
    <v-card v-if="user.show">
        <v-alert :type="toast.typeAlert" v-if="toast.showAlert" dismissible>
            {{toast.message}}
        </v-alert>
        <v-card-title>Datos de usuario</v-card-title>
        <v-card-text>
            <v-form ref="crawlerForm">
                <v-text-field v-model="user.firstname" label="Nombre" />
                <v-text-field v-model="user.lastname" label="Apellido" />
                <v-text-field v-model="user.email" label="Email" />
                <v-file-input v-model="user.profilePicture" label="Foto de Perfil" accept="image/*"/>
                <v-text-field v-model="user.urlReference" label="Url Referencia" reired />

                <v-select
                    :items="page.countries"
                    @change="populateProvinces"
                    v-model="user.country"
                    item-text="name"
                    item-value="id"
                    label="País"
                ></v-select>
                <v-select
                    :items="page.provinces"
                    v-model="user.province"
                    item-text="name"
                    item-value="id"
                    label="Provincia"
                ></v-select>
            </v-form>
        </v-card-text>
    </v-card>
      <v-card>
        <v-card-title>Experiencia</v-card-title>
        <v-form ref="form" @submit="save($event)">
          <v-card-text>
              <v-autocomplete
                v-if="page.selectUser"
                v-model="experience.userOwner"
                :items="page.activeUsers"
                @input="showUserData"
                item-text="name"
                item-value="id"
                outlined
                dense
                label="Usuario"
            ></v-autocomplete>
              <v-autocomplete
                v-model="experience.channel"
                :items="page.channels"
                item-text="text"
                item-value="value"
                outlined
                dense
                chips
                small-chips
                label="Canales"
                required
            ></v-autocomplete>
            <v-file-input v-model="experience.image" label="Imagen Principal" accept="image/*" required/>
            <v-text-field v-model="experience.title" label="Titulo" required />
            <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" @image-removed="handleImageRemoved" v-model="experience.description" style="height:500px"> </vue-editor>
            <div style="width:100%;height:100px"></div>
            <v-text-field v-model="experience.video" label="Video" type="url" placeholder="https://example.com"/>
            <v-autocomplete
                v-model="experience.tag_search"
                :items="page.tags"
                item-text="text"
                item-value="value"
                outlined
                dense
                chips
                small-chips
                label="Tags"
                multiple
                required
            ></v-autocomplete>
            <v-autocomplete
                v-model="experience.status"
                :items="experience.statusList"
                item-text="text"
                item-value="value"
                outlined
                dense
                label="Estado"
                required
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" ref="btnSub">Guardar</v-btn>
          </v-card-actions>
        </v-form>
        <v-data-table
            :headers="page.headers"
            :items="page.items"
            :footer-props="page.footerProps"
            :search="page.search"
            class="elevation-1"
            :page.sync="page.page"
            :items-per-page="page.itemsPerPage"
            hide-default-footer
        >
            <template v-slot:item.id="{ item }">
                <strong>{{item.id}}</strong>
            </template>
            <template v-slot:item.title="{ item }">
                {{item.title}}
            </template>
            <template v-slot:item.status="{ item }">
                <strong :class="page.status_colors[`${item.status}`]">{{page.statusList[item.status]}}</strong>
            </template>
            <template v-slot:item.user_id="{ item }">
                {{item.user.email}}
            </template>
            <template v-slot:item.created_at="{ item }">
                <strong>{{item.created_at}}</strong>
            </template>
            <template v-slot:item.edit="{ item }">
                <v-btn icon x-small @click="edit(item)" color="warning"
                    ><v-icon>fa fa-pencil-alt</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <v-pagination
            v-model="page.page"
            :length="page.pageCount"
            @input="gotoPage"
        ></v-pagination>
        <v-select
            :items="page.perPageOptions"
            @change="changePerPage"
            v-model="page.itemsPerPage"
            item-text="item"
            item-value="item"
            label="Elementos por página"
            width="600"
        ></v-select>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import { VueEditor, Quill } from "vue2-editor";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
Vue.use(VueToast);

export default {
    name: "Experience",
    components: {
        VueEditor
    },
    data: () => ({
        user: {
            show: false,
            id: null,
            firstname: "",
            lastname: "",
            email: "",
            urlReference: "",
            country: null,
            province: null,
            profilePicture: undefined
        },
        experience: {
            userOwner: 0,
            mode: 'create',
            id: null,
            title: '',
            description: '',
            image: undefined,
            incrustedImages: [],
            video: undefined,
            tag_search: [],
            channel: undefined,
            status: 1,
            statusList: [
                {value: 0, text: 'Pendiente' },
                {value: 1, text: 'Activo' },
                {value: 2, text: 'Desactivado' },
                {value: 3, text: 'Eliminado' }
            ]
        },
        page: {
            selectUser: false,
            allExperiences: undefined,
            activeUsers: [],
            allUsersData: undefined,
            tags: [],
            channels: [],
            countries: [],
            provinces: [],
            allZones: [],
            page: 1,
            pageCount: 0,
            path: "",
            itemsPerPage: 25,
            perPageOptions: [25, 50, 100, 500, 'Todos'],
            items: undefined,
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Título', value: 'title' },
                { text: 'Estado', value: 'status' },
                { text: 'Usuario', value: 'user_id' },
                { text: 'Fecha de creacíon', value: 'created_at' },
                { text: '', value: 'edit' }
            ],
            search: "",
            footerProps: {
                'items-per-page-options': [25, 50, 100, 500, -1],
                'items-per-page': 25
            },
            statusList: [
                'Pendiente',
                'Activo',
                'Desactivado',
                'Eliminado'
            ],
            status_colors: [
                "warning--text",
                "primary--text",
                "accent--text",
                "error--text"
            ]
        },
        toast: {
            showAlert: false,
            typeAlert: 'success',
            message: ''
        }
    }),
    mounted() {
        this.computeSections();
        this.getTags();
        this.getChannels();
        this.getZones();
        this.getUsers();
        this.getExperiences();
        //console.log(localStorage.user);
        //console.log(this.$store.getters.user);
        //console.log(localStorage.userEmail);
        //console.log(localStorage.userFirstname);
        //console.log(localStorage.userLastname);
        //console.log(localStorage.userPublic);
    },
    methods: {
        computeSections() {
            let roles = this.$store.getters.user.roles.map(i => i.name);
            this.page.selectUser = roles.indexOf('Admin') >= 0 ? true : false;

            this.user.show = false;
            if(localStorage.userPublic == 0)
                this.user.show = true;
            if(roles.indexOf('Admin') >= 0)
                this.user.show = false;
        },
        showUserData(item) {
            let user = this.allUsersData.filter(u => {return u.id == item})[0];
            this.user.show = user.profile.public == 0 ? true : false;
        },
        getTags() {
            this.$api.request.get('/admin/list_tag_search')
                .then(res => {
                    const {response} = res.data;
                    for (const key in response) {
                        if (response.hasOwnProperty(key)) {
                            this.page.tags.push({
                                value: key,
                                text: response[key]
                            })
                            
                        }
                    }
                })
                .catch(err => console.error(err))
        },
        getChannels() {
            this.$api.request.get('/admin/channels/get_channels_list')
                .then(res => {
                    
                    const {response} = res.data;
                    for (let key in response) {
                        if (response.hasOwnProperty(key)) {
                            this.page.channels.push({
                                value: key,
                                text: response[key]
                            })
                            
                        }
                    }
                })
                .catch(err => console.error(err))
        },
        getZones() {
            this.$api.request
                .get("/admin/zones")
                .then(res => {
                    let data = [];

                    let a = res.data.response;
                    this.page.allZones = a;

                    for (const key in a) {
                        if (a.hasOwnProperty(key)) {
                            const element = a[key];
                            data.push({ id: element.id, name: element.name });
                        }
                    }

                    this.page.countries = data;
                })
                .catch(err => console.log("err >>", err));
        },
        getUsers() {
            this.$api.request
                .get("/admin/get_all_active_users")
                .then(res => {
                    let data = [];

                    data.push({ id: 0, name: 'Actual' });

                    let a = res.data.response;
                    this.allUsersData = a;

                    for (const key in a) {
                        if (a.hasOwnProperty(key)) {
                            const element = a[key];

                            let value = element.email + " (" + (element.profile.public == 0 ? 'Perfil no público' : 'Perfil público') + ")";

                            data.push({ id: element.id, name: value });
                        }
                    }

                    this.page.activeUsers = data;
                })
                .catch(err => console.log("err >>", err));
        },
        getExperiences() {
            this.$api.request
            .get("/admin/experiences?page=1&perPage="+this.$data.page.itemsPerPage)
                .then(res => {
                    this.$data.page.items = this.formatDates(res.data.response.data);
                    this.page.allExperiences = this.$data.page.items;
                    this.$data.page.pageCount = res.data.response.last_page;
                    this.$data.page.path = res.data.response.path;
                })
                .catch(err => console.log("err >>", err));
        },
        getExperiencesPage(page) {
            this.$api.request
            .get(page)
                .then(res => {
                    this.$data.page.items = this.formatDates(res.data.response.data);
                    this.page.allExperiences = this.$data.page.items;
                    this.$data.page.pageCount = res.data.response.last_page;
                    this.$data.page.path = res.data.response.path;
                })
                .catch(err => console.log("err >>", err));
        },
        populateProvinces(value) {
            this.user.province = null;
            let c = this.page.allZones.filter((i) => {
                return i.id == value;
            });
            this.page.provinces = c[0].children;
        },
        save(event) {
            event.preventDefault();
            this.experience.userOwner;
            let data = new FormData();
                data.append('title', this.experience.title);
                data.append('description', this.experience.description);
                data.append('image', this.experience.image);
                data.append('incrustedImages', JSON.stringify(this.experience.incrustedImages))
                data.append('video', (this.experience.video =! undefined ? this.experience.video : ""));
                data.append('channel', this.experience.channel);
                data.append('status', this.experience.status);
                data.append('owner', this.experience.userOwner);
                for(let i = 0; i < this.experience.tag_search.length; i++ ) {
                    data.append('tag_search[]', this.experience.tag_search[i]);
                }
                if(this.hasCrawlerData()){
                    let userZone = this.user.province == null ?
                                this.user.country :
                                this.user.province;
                    data.append('userFirstname', this.user.firstname);
                    data.append('userLastname', this.user.lastname);
                    data.append('userEmail', this.user.email);
                    data.append('userUrlReference', this.user.urlReference);
                    data.append('userZone', userZone);
                    data.append('userProfilePicture', this.user.profilePicture);
                    data.append('userId', this.user.id);
                }

            if(this.experience.id == null) {
                this.experience.mode = 'store';
                if(this.validateExperience()){
                    this.$api.request.post('/admin/experiences', data)
                        .then(res => {
                            this.reset();
                            this.experience.description = "";
                            this.experience.id = null;
                            this.experience.mode = 'create';
                            this.user.id = null;
                            Vue.$toast.success('Experiencia guardada con exito', {position: 'top'});
                            this.getExperiences()
                        })
                        .catch(err => {
                            Vue.$toast.error('Ha ocurrido un error inesperado', {position: 'top'});
                            console.error(err);

                        });
                }
            }else{
                this.experience.mode = 'update';
                if(this.validateExperience()){
                    data.append('_method', 'put');
                    data.append('id', this.experience.id);
                    this.$api.request.post(`/admin/experiences/${this.experience.id}`, data)
                        .then(res => {
                            this.reset();
                            this.experience.description = "";
                            this.experience.id = null;
                            this.experience.mode = 'create';
                            this.user.id = null;
                            Vue.$toast.success('Experiencia guardada con exito', {position: 'top'});
                            this.getExperiences();
                        })
                        .catch(err => {
                            Vue.$toast.error('Ha ocurrido un error inesperado', {position: 'top'});
                            console.error(err);

                        });
                }
            }
        },
        setUserZone(zone_id) {
            let zones = this.page.allZones;
            let userZone = zone_id;

            let filterZones = zones.filter((i) => {
                return i.id == userZone;
            });

            if(filterZones.length > 0){
                let z = filterZones[0];

                this.user.country = z.id;
                this.populateProvinces(z.id);

                return;
            }else{
                let country = null;
                for(let j in zones){
                    country = zones[j].id;
                    if(zones[j].children != undefined){
                        let filterChildren = zones[j].children.filter((i) => {
                            return i.id == userZone;
                        });

                        if(filterChildren.length > 0){
                            let p = filterChildren[0];
                            this.user.country = country;
                            this.populateProvinces(country);
                            this.user.province = p.id;
                            return;
                        }
                    }
                }
            }
        },
        edit(item) {
            this.$api.request
            .get('admin/get_crawler_data?id='+item.id)
                .then(res => {
                    if(res.data.user != false){
                        let user = res.data.user;

                        this.user.firstname = user.firstname;
                        this.user.lastname = user.lastname;
                        this.user.email = user.email;
                        this.user.urlReference = user.referrer_url;
                        this.user.id = user.id;
                        this.setUserZone(user.zone_id);
                    }

                    let exp = this.page.allExperiences.filter(e => { return e.id == item.id })[0];
                    let tags = exp.tag_search.map(e => { return String(e.id)});

                    this.experience.channel = String(exp.channel_id);
                    this.experience.title = exp.title;
                    this.experience.description = exp.description;
                    this.experience.video = exp.video;
                    this.experience.tag_search = tags;
                    this.experience.status = exp.status;
                    this.experience.id = exp.id;
                    this.experience.userOwner = exp.user_id;
                    this.experience.mode = 'edit';
                })
                .catch(err => console.log("err >>", err));
        },
        gotoPage(value = 0) {
            if(value == 0)
                value = this.$data.page.page;

            let page = this.$data.page.path + "?page=" + value + "&perPage=" + this.$data.page.itemsPerPage;
            this.$data.page.page = value;
            this.getExperiencesPage(page);
        },
        changePerPage() {
            let i = this.$data.page.itemsPerPage;
            let p = this.$data.page.page;

            let page = this.$data.page.path + "?page=" + p + "&perPage=" + i;
            this.getExperiencesPage(page);
        },
        formatDates(data) {
            return data.filter(i => {
                let date = new Date(i.created_at);
                let createdAt = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
                i.created_at = createdAt;

                return i;
            });
        },
        handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
            formData.append("image", file);
            formData.append('title', this.experience.title);
            
            this.$api.request.post('/admin/save_experience_image', formData)
                .then(result => {
                    let url = result.data.url;
                    Editor.insertEmbed(cursorLocation, "image", url);
                    resetUploader();
                })
                .catch(err => console.error(err));
        },
        handleImageRemoved(image) {
            if(this.experience.mode == 'create' && this.experience.description.search(image) == -1 && this.experience.description.length > 0){
                this.$api.request.post('/admin/delete_experience_image', {path: image})
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => console.error(err));
            }
        },
        hasCrawlerData() {
            if(this.hasData(this.user.firstname)
                || this.hasData(this.user.lastname)
                || this.hasData(this.user.email)
                || this.hasData(this.user.urlReference)
                || this.hasData(this.user.country)
                || this.hasData(this.user.province)
                || this.hasData(this.profilePicture)
            )
                return true;

            return false;
        },
        hasData(data) {
            if(data != "" && data != null && data != undefined)
                return true;
            
            return false;
        },
        validateExperience() {
            if(!this.hasData(this.experience.title) || !this.hasData(this.experience.description) ||
            this.experience.tag_search.length == 0 || !this.hasData(this.experience.channel) ||
            (!this.hasData(this.experience.status) && this.experience.status != 0)){
                if(!this.hasData(this.experience.title))
                    Vue.$toast.error('Complete el campo Título', {position: 'top'});
                
                if(!this.hasData(this.experience.description))
                    Vue.$toast.error('Complete el campo Descripción', {position: 'top'});

                if(this.experience.tag_search.length == 0)
                    Vue.$toast.error('Complete el campo Tags', {position: 'top'});

                if(!this.hasData(this.experience.channel))
                    Vue.$toast.error('Complete el campo Canal', {position: 'top'});

                if(!this.hasData(this.experience.status) && this.experience.status != 0)
                    Vue.$toast.error('Complete el campo Estado', {position: 'top'});

                return false;
            }

            return true;
        },
        reset() {
            if(this.$refs.form)
                this.$refs.form.reset();
            if(this.$refs.crawlerForm)
                this.$refs.crawlerForm.reset();
        }
    }
};
</script>

<style>
    @import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
    @import "../../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
    @import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
    @import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
    @import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
    @import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
    @import "../../../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
</style>