<script setup>
import Register from "../components/Register.vue";
</script>

<template>
    <main>
        <Register />
    </main>
</template>

<script>
export default {
    name: "Register",
    components: {
        Register,
    },
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
