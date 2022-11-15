<script setup>
import NavbarAdmin from "../components/NavbarAdmin.vue"
import GamesTable from "../components/GamesTable.vue"
import UsersTable from "../components/UsersTable.vue"
import CopyTable from "../components/CopyTable.vue";
import TagTable from "../components/TagTable.vue";
import BorrowTable from "../components/BorrowTable.vue";
import LocalisationTable from "../components/LocalisationTable.vue";
import GameTagTable from "../components/GameTagTable.vue";
</script>

<template>
    <main>
        <el-container class="container">
            <NavbarAdmin />
                <GamesTable v-if="$route.query.type === 'games'"/>
                <UsersTable v-if="$route.query.type === 'users'"/>
                <CopyTable v-if="$route.query.type === 'copy'"/>
                <TagTable v-if="$route.query.type === 'tag'"/>
                <LocalisationTable v-if="$route.query.type === 'localisation'"/>
                <BorrowTable v-if="$route.query.type == 'emprunt'"/>
                <GameTagTable v-if="$route.query.type == 'game_tag'"/>
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