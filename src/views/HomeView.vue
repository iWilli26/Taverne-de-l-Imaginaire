<script setup>
import GameCard from "../components/GameCard.vue";
</script>

<template>
    <main>
        <div class="content">HAHAHAHAHAHAHAHAHAHAHHAHAHAHAHA</div>
    </main>
</template>

<script>
export default {
    name: "Home",
    components: {
        GameCard,
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
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
