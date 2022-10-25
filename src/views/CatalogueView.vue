<script setup>
import GameCard from "../components/GameCard.vue";
import axios from "axios";
import Catalogue from "../components/Catalogue.vue";
</script>

<template>
    <main>
        <div class="content">
            <Catalogue />
        </div>
    </main>
</template>

<script>
import { reactive } from "vue";
export default {
    name: "Catalogue",
    setup() {
        const state = reactive({
            games: [],
        });
    },
    components: {
        GameCard,
    },
    data() {
        return {
            game1: {
                id: 1,
                name: "Shadow Hunter",
                description: "A game of deception and betrayal",
                players: "5-8",
                time: "30-60 minutes",
                image: "./shadow.jpg",
            },
            game2: {
                id: 2,
                name: "Secret Hitler",
                description:
                    "A game of nazism and deception.\nKill Hitler before he kills you!",
                players: "5-10",
                time: "2 years",
                image: "./hitler.jpg",
            },
            avis1: {
                note: 9,
                comment: "This game is great!",
            },
            avis2: {
                note: 0,
                comment: "This game is terrible!",
            },
        };
    },
    methods: {},
};
</script>

<style scoped>
.input {
    width: 50vw;
}
.form {
    margin-top: 20px;
}
html,
body {
    margin: 0px !important;
    padding: 0px !important;
}
#app {
    padding: 0px !important;
    margin: 0px !important;
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
