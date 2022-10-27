<template>
    <el-table
        :data="filterTableData"
        max-height="100vh"
        style="width: 100%"
        highlight-current-row
        class="overwrite-table"
        :row-class-name="tableRowClassName"
    >
        <el-table-column prop="game_id" label="Id" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="number_of_player" label="Number of Player" />
        <el-table-column prop="average_time" label="Average Time" />
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="author" label="Author" />
        <el-table-column prop="editor" label="Editor" />
        <el-table-column align="right">
            <template #header>
                <el-input
                    v-model="search"
                    size="small"
                    placeholder="Type to search"
                />
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { useGamesStore } from "../stores/games.js";
import { computed, ref } from "vue";
export default {
    name: "GamesTable",
    components: {},
    setup() {
        const state = useGamesStore();
        state.fetchGames();

        const search = ref("");

        const filterTableData = computed(() =>
            state.games.filter(
                (data) =>
                    !search.value ||
                    data.name.toLowerCase().includes(search.value.toLowerCase())
            )
        );

        return { state, search, filterTableData };
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped>
.overwrite-table {
    --el-table-header-bg-color: #626567;
    --el-text-color-regular: #f8f8f8;
    --el-text-color-secondary: #f8f8f8;
    --el-table-tr-bg-color: #909497;
    --el-table-row-hover-bg-color: #797D7F;
    --el-table-current-row-bg-color: #B11100;
    --el-table-border-color: transparent;
}
</style>
