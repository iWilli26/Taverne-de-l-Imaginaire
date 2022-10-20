<script setup>
import GameCard from "./components/GameCard.vue";
import NavBar from "./components/Navbar.vue";
</script>

<template>
    <header>
        <NavBar />
        <router-view />
    </header>
</template>
<script>
export default {
    name: "App",
    components: {
        NavBar,
    },
    data() {
        return {};
    },
    methods: {},
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
