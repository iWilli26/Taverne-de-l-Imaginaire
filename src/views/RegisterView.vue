<script setup>
import Login from "../components/Login.vue";
</script>

<template>
    <main>
        <Login />
    </main>
</template>

<script>
export default {
    name: "Login",
    components: {
        Login,
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
