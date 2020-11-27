<template>
    <!-- <v-navigation-drawer app clipped color="primary" v-model="drawer"> -->

    <div>
        <v-list dense dark>
            <v-list-item
                link
                v-for="(item, i) in items"
                :key="i"
                router-link
                :to="item.path"
                :disabled="!can(item)"
            >
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>

    <!-- </v-navigation-drawer> -->
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItems from "./sidebarItems.js";
import Token from "../../../config/Token";

export default {
    name: "Sidebar",
    props: ["drawer"],
    data: () => ({
        items: sidebarItems
    }),
    computed: {
        ...mapGetters(["user"])
    },
    methods: {
        can(item) {
            console.log(item);
            if (item.permission) {
                return this.user.permissions.includes(item.permission);
            }
            return true;
        },
        logout() {
            this.$api.get("api/auth/logout").then(async () => {
                await Token.clear();
                await this.$store.dispatch("loadUser");

                this.$router.push("/admin/login");
            });
        }
    },
    watch: {
        drawer(value) {
            this.$emit("showSidebar");
        }
    }
};
</script>

<style scoped></style>
