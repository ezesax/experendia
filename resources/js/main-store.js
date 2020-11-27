import Vue from "vue";
import Vuex from "vuex";
import Token from "./config/Token";

Vue.use(Vuex);

export default new Vuex.Store({
    namespace: true,
    state: {
        user: null
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
    mutations: {
        setUser(state) {
            state.user = Token.getData();
        }
    },
    actions: {
        loadUser({commit}) {
            commit("setUser");
        }
    }
});
