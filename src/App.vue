<script setup>
import pog from "./components/pog.vue";
</script>

<template>
    <header>
        <pog v-bind:game="game1" />
        <pog :game="game2" />
    </header>
    
</template>
<script>
let game1 = {
    name: "Shadow Hunter",
    description: "A game of deception and betrayal",
    players: "5-8",
    time: "30-60 minutes",
    image: "./shadow.jpg",
};
let game2 = {
    name: "Secret Hitler",
    description: "A game of nazism and deception",
    players: "5-10",
    time: "2 years",
    image: "./hitler.jpg",
};
export default {
    name: "App",
    components: {
        pog,
    },
    data() {
        return {
            game1: game1,
            game2: game2,
        };
    },
    
};
</script>
<style scoped>

/* header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
} */
/* 
@media (min-width: 1024px) {
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
