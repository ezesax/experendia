<template>
    <v-app>
        <v-content class="primary">
            <v-container class="fill-height">
                <v-row justify="center" align="center">
                    <v-col sm="6">
                        <v-card color="light">
                            <v-form
                                ref="form"
                                v-model="valid"
                                :lazy-validation="lazy"
                                class="pa-8"
                            >
                                <v-card-title class="justify-center"
                                    >EXPERENDIA</v-card-title
                                >
                                <v-alert
                                    type="error"
                                    icon="fa-exclamation"
                                    border="left"
                                    prominent
                                    dismissible
                                    v-if="errors"
                                >
                                    <h4>{{ errors.title }}</h4>
                                    <v-divider />
                                    <p
                                        v-for="(error, i) in errors.msg"
                                        :key="i"
                                    >
                                        {{ error }}
                                    </p>
                                </v-alert>
                                <v-text-field
                                    v-model="credentials.email"
                                    :rules="emailRules"
                                    label="Email"
                                    aria-autocomplete="false"
                                    required
                                ></v-text-field>

                                <v-text-field
                                    v-model="credentials.password"
                                    type="password"
                                    :rules="passwordRules"
                                    label="Password"
                                    aria-autocomplete="false"
                                    required
                                ></v-text-field>

                                <v-checkbox
                                    v-model="credentials.remember_me"
                                    label="Recuerdame"
                                ></v-checkbox>

                                <v-row>
                                    <v-btn
                                        large
                                        :disabled="!valid || submit"
                                        color="success"
                                        class="mx-auto px-12"
                                        @click="validate"
                                    >
                                        Ingresar
                                    </v-btn>
                                </v-row>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Token from "../../config/Token";

export default {
    name: "Login",
    data: () => ({
        credentials: {
            email: undefined,
            password: undefined,
            remember_me: false
        },
        submit: false,
        valid: true,
        errors: undefined,
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
        lazy: false
    }),
    mounted() {
        console.log(this.$api);
    },
    methods: {
        validate() {
            const valid = this.$refs.form.validate();
            if (valid && !this.submit) {
                this.submit = true;
                this.$api.request
                    .post("/auth/login", this.credentials)
                    .then(async res => {
                        const { data } = res;
                        console.log(data);
                        this.storageData(data.user);
                        await Token.set(data.token);
                        await this.$store.dispatch("loadUser");
                        await this.createLog();
                        const redirect = this.$route.query.redirect;
                        this.$router.push(redirect || "/", () => {
                            window.location.reload();
                        });
                    })
                    .catch(reason => (this.errors = reason.error))
                    .finally(() => (this.submit = false));
            }
        },
        storageData(user){
            localStorage.userEmail = user.email;
            localStorage.userFirstname = user.profile.firstname;
            localStorage.userLastname = user.profile.lastname;
            localStorage.userPublic = user.profile.public;
        },
        createLog() {
            let data = {
                device: 1,
                useragent: navigator.userAgent,
                action: 'login'
            }
            this.$api.request
                .post("/logs/create_user_access_log", data)
                .then(async res => {
                    console.log(res);
                    localStorage.login = true;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        }
    }
};
</script>

<style scoped></style>
