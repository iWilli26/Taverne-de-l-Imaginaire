
<template>
<el-main>
    <el-row>
        <el-form :model="formGames" :inline="true" class="overwrite-label">
                <el-form-item label="Game Name" >
                        <el-input v-model="formGames.name" style="--el-input-text-color: black"/>
                </el-form-item>
                <el-form-item label="Author Name" style="--el-input-text-color: black">
                        <el-input v-model="formGames.author" />
                </el-form-item>
                <el-form-item label="Editor Name" style="--el-input-text-color: black">
                        <el-input v-model="formGames.editor" />
                </el-form-item>
                <el-form-item label="Average Time" style="--el-input-text-color: black">
                    <el-input v-model="formGames.average_time"/>
                </el-form-item>
                <el-form-item label="Number of Player" style="--el-input-text-color: black">
                    <el-input v-model="formGames.number_of_player"/>
                </el-form-item>
                <el-col :span="24">
                    <el-form-item label="Description" class="description" >
                        <el-input v-model="formGames.descritpion" type="textarea" style="--el-input-text-color: black"/>    
                    </el-form-item>
                </el-col>
        </el-form>
    </el-row>
    
    <el-row>
        <el-col :span="24">
            <el-table
                :data="filterTableData"
                max-height="100vh"
                style="width: 100%"
                highlight-current-row
                class="overwrite-table"
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
        </el-col>
    </el-row>
</el-main>
</template>

<script>
import { useGamesStore } from "../stores/games.js";
import { computed, ref, reactive } from "vue";
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
        const formGames = reactive({
            name: '',
            author: '',
            editor: '',
            average_time:'',
            number_of_player:'',
            description:'',
        })

        return { state, search, filterTableData, formGames};
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
.el-form .description{
    width:100%;
}
.overwrite-label{
    --el-text-color-regular: #f8f8f8; 
    
}

</style>
