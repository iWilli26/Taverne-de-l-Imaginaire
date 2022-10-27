<script setup>
import NavBar from "./components/Navbar.vue";
import { useUserStore } from "./stores/user.js";
import { axiosPrivate } from "./auth";
</script>

<template>
    <NavBar />
    <router-view />
</template>

<script>
export default {
    name: "App",
    components: {
        NavBar,
    },

    methods: {
        test() {
            axiosPrivate.get("/test").then((res) => {
                console.log(res.data);
            });
        },
    },
    mounted() {},
};
</script>

<style scoped>
html,
body {
    margin: 0px !important;
    padding: 0px !important;
}
#app {
    padding: 0px !important;
    margin: 0px !important;
}

/* @media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
} */
</style>
