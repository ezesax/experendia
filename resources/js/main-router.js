import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "./components/layout/Layout.vue";
import Error404 from "./components/errors/Error404";
import AuthRouter from "./pages/auth/router";
import HomeRouter from "./pages/home/router";
import ZonesRouter from "./pages/zones/router";
import TagsRouter from "./pages/tags/router";
import ExperienceRouter from "./pages/experience/router";
import ChannelsRouter from "./pages/channels/router";
import MotivesDenouncesRouter from "./pages/motivesDenounces/router";
import ActivitiesRouter from "./pages/activities/router"
import ForbiddenWordsRouter from "./pages/forbiddenWords/router";
import UsersRouter from "./pages/users/router";

// Capturar datos de usuario
import Token from "./config/Token";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Inicio",
        redirect: "home",
        component: Layout,
        beforeEnter: (to, from, next) => {
            if (!Token.get()) {
                next({
                    path: "/login",
                    query: { redirect: to.fullPath }
                });
            }

            next();
        },
        children: []
            .concat(HomeRouter)
            .concat(ZonesRouter)
            .concat(TagsRouter)
            .concat(ExperienceRouter)
            .concat(ChannelsRouter)
            .concat(MotivesDenouncesRouter)
            .concat(ActivitiesRouter)
            .concat(ForbiddenWordsRouter)
            .concat(UsersRouter)
    }
]
    .concat(AuthRouter)

    .concat([
        {
            path: "*",
            name: "Error",
            component: Error404
        }
    ]);
if (process.env.VUE_APP_DEBUG) console.log(routes);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.permission)) {
        const currentUser = Token.getData();

        const can = currentUser.permissions.includes(to.meta.permission);
        can ? next() : next(false);
    } else if (to.path == "/login" && Token.get()) {
        next({
            path: "/"
        });
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;
