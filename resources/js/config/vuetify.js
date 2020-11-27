import Vue from "vue";
import Vuetify from "vuetify";
import es from "vuetify/es5/locale/es";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: "#00a3a6",
                secondary: "#F39325",
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107",
            },
        },
    },
    lang: {
        locales: { es },
        current: "es",
    },
    icons: {
        iconfont: "fa",
    },
});
