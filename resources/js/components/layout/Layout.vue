<template>
    <v-app>
        <Header @showSidebar="showSidebar" />
        <v-navigation-drawer app clipped color="primary" v-model="drawer">
            <Sidebar />
            <template v-slot:append>
                <v-list>
                    <v-list-item link @click="logout">
                        <v-list-item-action>
                            <v-icon>fa-lock</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Salir</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Token from "../../config/Token";

export default {
    name: "Layout",
    components: { Header, Sidebar },
    data: () => ({
        drawer: true,
    }),
    methods: {
        showSidebar() {
            this.$data.drawer = !this.$data.drawer;
        },
        logout() {
            this.$api.request.get("/auth/logout").then(async () => {
                await Token.clear();
                await this.$store.dispatch("loadUser");

                this.$router.push("/admin/login");
            });
        },
    },
};
</script>

<style></style>
