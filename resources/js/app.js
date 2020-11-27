import Vue from "vue";
import App from "./App.vue";
import router from "./main-router";
import store from "./main-store";
import vuetify from "./config/vuetify";
import Api from "./config/Api";

Vue.config.productionTop = false;

const ApiPlugin = {
    install(Vue) {
        Vue.prototype.$api = Api;
    }
};

Vue.use(ApiPlugin);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    beforeMount() {
        this.$store.dispatch("loadUser");
    }
}).$mount("#app");
