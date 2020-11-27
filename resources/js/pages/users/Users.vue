<template>
    <v-row justify="center">
        <v-dialog v-model="editPasswordDialog" width="600">
            <v-card>
                <v-alert :type="alertType" v-model="alert" dismissible>
                    {{alertMsg}}
                </v-alert>
                <v-card-title>Cambiar contraseña</v-card-title>
                <v-card-text>                    
                    <v-form ref="passForm">
                        <v-text-field
                            v-model="password"
                            type="password"
                            :rules="passwordRules"
                            label="Password"
                            aria-autocomplete="false"
                            required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveNewPassword">Guardar</v-btn>
                    <v-btn @click="reset">Reset</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                            v-model="firstname"
                            label="Nombre"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="lastname"
                            label="Apellido"
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            label="Email"
                            :rules="emailRules"
                            required
                        ></v-text-field>
                        <img v-if="imageSrcShow" :src="imageSrc" style="width:50%;margin-left:25%" alt="">
                        <v-file-input v-model="profilePicture" label="Foto de Perfil" accept="image/*"/>
                        <v-text-field
                            v-model="password"
                            type="password"
                            :rules="passwordRules"
                            label="Password"
                            aria-autocomplete="false"
                            required
                            v-if="passwordRequired"
                        ></v-text-field>
                        <v-select
                            :items="countries"
                            @change="populateProvinces"
                            v-model="country"
                            item-text="name"
                            item-value="id"
                            label="País"
                            required
                        ></v-select>
                        <v-select
                            :items="provinces"
                            v-model="province"
                            item-text="name"
                            item-value="id"
                            label="Provincia"
                        ></v-select>
                        <v-select
                            :items="roles"
                            v-model="rol"
                            item-text="name"
                            item-value="name"
                            label="Rol"
                        ></v-select>
                        <v-select
                            :items="status_list"
                            v-model="status"
                            item-text="name"
                            item-value="name"
                            label="Estatus"
                            required
                        ></v-select>
                        <v-checkbox v-if="rol == 'User'"
                            v-model="profilePublic"
                            label="Es Perfil Público"
                        ></v-checkbox>
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
                        Usuarios
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="newUser"
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
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                >
                    <template v-slot:item.id="{ item }">
                        <strong>{{item.id}}</strong>
                    </template>
                    <template v-slot:item.firstname="{ item }">
                        {{item.profile.firstname}}
                    </template>
                    <template v-slot:item.lastname="{ item }">
                        {{item.profile.lastname}}
                    </template>
                    <template v-slot:item.email="{ item }">
                        {{item.email}}
                    </template>
                    <template v-slot:item.rol="{ item }">
                        {{item.roles[0].name}}
                    </template>
                    <template v-slot:item.sex="{ item }">
                        {{item.profile.sex}}
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
                    <template v-slot:item.password_edit="{ item }">
                        <v-btn icon x-small @click="editPassword(item)" color="info"
                            ><v-icon>fas fa-key</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
                <v-pagination
                    v-model="page"
                    :length="pageCount"
                    @input="gotoPage"
                ></v-pagination>
                <v-select
                    :items="perPageOptions"
                    @change="changePerPage"
                    v-model="itemsPerPage"
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
import Token from "../../config/Token";
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
Vue.use(VueToast);

export default {
    name: "Users",
    data: () => ({
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
        headers: [
            {
                text: 'Id',
                align: 'start',
                sortable: false,
                value: 'id',
            },
            { text: 'Nombre', value: 'firstname' },
            { text: 'Apellido', value: 'lastname' },
            { text: 'Email', value: 'email' },
            { text: 'Rol', value: 'rol' },
            { text: 'Sexo', value: 'sex' },
            { text: 'Estado', value: 'status' },
            { text: 'Fecha de creación', value: 'created_at' },
            { text: '', value: 'edit' },
            { text: '', value: 'password_edit' }
        ],
        passwordRules: [
            v => !!v || "Contraseña es requerida",
            v =>
                (v && v.length >= 6) ||
                "Contraseña debe tener minimo 6 caracteres"
        ],
        emailRules: [
            v => !!v || "E-mail es requerido",
            v => /.+@.+\..+/.test(v) || "E-mail debe ser valido"
        ],
        footerProps: {
            'items-per-page-options': [25, 50, 100, 500, -1],
            'items-per-page': 25
        },
        status_list: [
            { name: "Desactivado" },
            { name: "Activo" },
            { name: "Eliminado" }
        ],
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
    }),
    mounted(){
        Token.isExpired();
        this.getRoles();
        this.getZones();
        this.getUsers();
    },
    methods: {
        getRoles() {
            this.$api.request
            .get("/admin/user_get_all_roles")
                .then(res => {
                    let data = [];

                    let a = res.data.response;

                    for (const key in a) {
                        if (a.hasOwnProperty(key)) {
                            const element = a[key];
                            data.push({ id: element.id, name: element.name });
                        }
                    }

                    this.$data.roles = data;
                })
                .catch(err => console.log("err >>", err));
        },
        getZones() {
            this.$api.request
                .get("/admin/zones")
                .then(res => {
                    let data = [];

                    let a = res.data.response;
                    this.$data.allZones = a;

                    for (const key in a) {
                        if (a.hasOwnProperty(key)) {
                            const element = a[key];
                            data.push({ id: element.id, name: element.name });
                        }
                    }

                    this.$data.countries = data;
                })
                .catch(err => console.log("err >>", err));
        },
        getUsers() {
            this.$api.request
            .get("/admin/users_withProfiles?page=1&perPage="+this.$data.itemsPerPage)
                .then(res => {
                    this.$data.items = this.formatDates(res.data.response.data);
                    this.$data.pageCount = res.data.response.last_page;
                    this.$data.path = res.data.response.path;
                })
                .catch(err => console.log("err >>", err));
        },
        getUsersPage(page){
            this.$api.request
            .get(page)
                .then(res => {
                    this.$data.items = this.formatDates(res.data.response.data);
                    this.$data.pageCount = res.data.response.last_page;
                })
                .catch(err => console.log("err >>", err));
        },
        populateProvinces(value = 0) {
            this.$data.province = null;
            let c = this.$data.allZones.filter((i) => {
                return i.id == (value != 0 ? value : this.$data.countryId);
            });
            this.$data.provinces = c[0].children;
        },
        setUserZone(user) {
            let zones = this.$data.allZones;
            let userZone = user.profile.zone_id;

            let filterZones = zones.filter((i) => {
                return i.id == userZone;
            });

            if(filterZones.length > 0){
                let z = filterZones[0];

                this.$data.country = z.id;
                this.$data.countryId = z.id;
                this.populateProvinces();

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
        newUser() {
            this.$data.id = null;
            this.$data.passwordRequired = true;
            this.reset();
            this.$data.action = "Crear Usuario";
            this.$data.id = null;
            this.imageSrcShow = false;
            this.imageSrc = '';
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
        edit(user) {
            this.$data.action = "Editar Usuario";
            this.$data.id = user.id;
            this.$data.passwordRequired = false;
            this.$data.firstname = user.profile.firstname;
            this.$data.lastname = user.profile.lastname;
            this.$data.email = user.email;
            this.$data.password = user.password;
            this.setUserZone(user);
            this.$data.rol = user.roles[0].name
            this.$data.status = user.status;
            this.$data.profilePublic = user.profile.public;
            this.$data.dialog = true;

            if(user.profile.photo != ""){
                this.imageSrcShow = true;
                this.imageSrc = user.profile.photo;
            }else{
                this.imageSrcShow = false;
                this.imageSrc = '';
            }
        },
        editPassword(user) {
            this.$data.id = user.id;
            this.$data.editPasswordDialog = true;
        },
        save() {
            if(!this.validateUser())
                return;
            
            let publicProfile = this.$data.profilePublic == true ? 1 : 0;
            const data = new FormData();
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
                this.$api.request
                    .post(`/admin/users/${this.$data.id}`, data)
                    .then(res => {
                        if(data.status == 'Eliminado')
                            this.delete(this.$data.id);
                        
                        Vue.$toast.success('Usuario actualizado con exito', {position: 'top'});

                        setTimeout(() => {
                            this.reset();
                            this.getUsers();
                            this.alert = false;
                            this.$data.dialog = false;
                            this.$data.profilePublic = false;
                        }, 2000);
                    })
                    .catch(reason => {
                        Vue.$toast.error('Ha ocurrido un error inesperado', {position: 'top'});
                    });
            } else {
                this.$api.request
                    .post("/ui/user_manual_register", data)
                    .then(res => {
                        Vue.$toast.success('Usuario creado con exito', {position: 'top'});
                        
                        setTimeout(() => {
                            this.reset();
                            this.getUsers();
                            this.alert = false;
                            this.$data.dialog = false;
                            this.$data.profilePublic = false;
                        }, 2000);
                    })
                    .catch(reason => {
                        Vue.$toast.error('Ha ocurrido un error inesperado', {position: 'top'});
                    });
            }
        },
        saveNewPassword() {
            let data = {
                user: this.$data.id,
                password: this.$data.password
            }
            this.$data.id = null;

            this.$api.request
                    .post("/admin/change_password", data)
                    .then(res => {
                        Vue.$toast.success('Password actualizada con exito', {position: 'top'});
                        
                        setTimeout(() => {
                            this.reset();
                            this.alert = false;
                            this.$data.editPasswordDialog = false;
                        }, 2000);
                    })
                    .catch(reason => {
                        Vue.$toast.error('Ha ocurrido un error inesperado', {position: 'top'});
                    });
        },
        delete(id) {
            this.$api.request
                .delete(`/admin/users/${id}`)
                .then(res => {
                    console.log('Recurso eliminado');
                })
                .catch(reason => console.log(reason.error));
        },
        reset() {
            if(this.$refs.form)
                this.$refs.form.reset();
            if(this.$refs.passForm)
                this.$refs.passForm.reset();
            this.$data.id = null;
            this.profilePublic = false;
        },
        gotoPage(value = 0) {
            if(value == 0)
                value = this.$data.page;

            let page = this.$data.path + "?page=" + value + "&perPage=" + this.$data.itemsPerPage;
            this.$data.page = value;
            this.getUsersPage(page);
        },
        changePerPage() {
            let i = this.$data.itemsPerPage;
            let p = this.$data.page;

            let page = this.$data.path + "?page=" + p + "&perPage=" + i;
            this.getUsersPage(page);
        },
        hasData(data) {
            if(data != "" && data != null && data != undefined)
                return true;
            
            return false;
        },
        validateUser() {
            if(!this.hasData(this.firstname) || !this.hasData(this.email) ||
            (!this.hasData(this.password) && this.passwordRequired) || !this.hasData(this.country) ||
            !this.hasData(this.status) || !this.hasData(this.rol)){
                if(!this.hasData(this.firstname))
                    Vue.$toast.error('Complete el campo Nombre', {position: 'top'});
                
                if(!this.hasData(this.email))
                    Vue.$toast.error('Complete el campo Email', {position: 'top'});

                if(!this.hasData(this.password) && this.passwordRequired)
                    Vue.$toast.error('Complete el Password', {position: 'top'});

                if(!this.hasData(this.country))
                    Vue.$toast.error('Complete el campo País', {position: 'top'});

                if(!this.hasData(this.status))
                    Vue.$toast.error('Complete el campo Estado', {position: 'top'});
                
                if(!this.hasData(this.rol))
                    Vue.$toast.error('Complete el campo Rol', {position: 'top'});

                return false;
            }

            return true;
        }
    }
};
</script>