<script setup>
import NavbarAdmin from "../components/NavbarAdmin.vue"
import GamesTable from "../components/GamesTable.vue"
import UsersTable from "../components/UsersTable.vue"
import CopyTable from "../components/CopyTable.vue";
import LocalisationTable from "../components/LocalisationTable.vue";
</script>

<template>
    <main>
        <el-container class="container">
            <NavbarAdmin />
                <GamesTable v-if="$route.query.type === 'games'"/>
                <UsersTable v-if="$route.query.type === 'users'"/>
                <CopyTable v-if="$route.query.type === 'copy'"/>
                <LocalisationTable v-if="$route.query.type === 'localisation'"/>
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