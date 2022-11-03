<script setup>
import NavbarAdmin from "../components/NavbarAdmin.vue"
import GamesTable from "../components/GamesTable.vue"
import UsersTable from "../components/UsersTable.vue"
</script>

<template>
    <main>
        <el-container class="container">
            <NavbarAdmin />
                <GamesTable v-if="$route.query.type === 'games'"/>
                <UsersTable v-if="$route.query.type === 'users'"/>
        </el-container>
    </main>

</template>

<style scoped>

.container{
    height: 100vh;
    width:100%;
    background-color: none;
}
</style>