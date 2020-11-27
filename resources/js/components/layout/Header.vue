<template>
    <v-app-bar app color="white" clipped-left >
        <v-app-bar-nav-icon  @click="showSidebar"/>
        <v-toolbar-title>Experienda</v-toolbar-title>
        <v-spacer />
        <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" class="mr-3">
                    <v-badge color="info" overlap content="6">
                        <v-icon>fa fa-bell</v-icon>
                    </v-badge>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                    <v-list-item-title>Option {{ n }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-btn icon class="mr-3">
            <v-icon>fa fa-cogs</v-icon>
        </v-btn>
        <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" class="mr-1">
                    <v-icon>fa fa-ellipsis-v</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                    <v-list-item-title>Option {{ n }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    name: "Header",
    methods: {
        showSidebar() {
            this.$emit("showSidebar");
        },
    },
};
</script>

<style scoped></style>
