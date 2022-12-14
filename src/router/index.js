import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Catalogue from "../views/CatalogueView.vue";
import TestView from "../views/TestView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import GameDetailsView from "../views/GameDetailsView.vue";
import AdminView from "../views/AdminView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/catalogue",
            name: "catalogue",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Catalogue,
        },
        {
            path: "/game",
            name: "gameDetails",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: GameDetailsView,
            // props: (route) => ({ query: route.query.id }),
        },
        {
            path: "/contact",
            name: "contact",
            component: TestView,
        },
        {
            path: "/account/register",
            name: "register",
            component: RegisterView,
        },
        {
            path: "/account/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/admin",
            name: "admin",
            component: AdminView,
        },
    ],
});

export default router;
