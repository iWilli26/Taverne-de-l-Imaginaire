
<template>
<el-main>
    <el-row>
        <el-form :model="formGames" :inline="true" class="overwrite-label">
                <el-form-item label="Game Name" style="--el-text-color-regular: #f8f8f8">
                        <el-input v-model="formGames.name" style="--el-input-text-color: black"/>
                </el-form-item>
                <el-form-item label="Author Name" style="--el-text-color-regular: #f8f8f8" >
                        <el-input v-model="formGames.author" style="--el-input-text-color: black"/>
                </el-form-item>
                <el-form-item label="Editor Name"  style="--el-text-color-regular: #f8f8f8">
                        <el-input v-model="formGames.editor" style="--el-input-text-color: black"/>
                </el-form-item>
                <el-form-item label="Average Time" style="--el-text-color-regular: #f8f8f8">
                    <el-input v-model="formGames.average_time" style="--el-input-text-color: black"/>
                </el-form-item>
                <el-form-item label="Number of Player"  style="--el-text-color-regular: #f8f8f8">
                    <el-input v-model="formGames.number_of_player" style="--el-input-text-color: black"/>
                </el-form-item>
                <el-col :span="24">
                    <el-form-item label="Description" class="description" style="--el-text-color-regular: #f8f8f8" >
                        <el-input v-model="formGames.description" type="textarea" style="--el-input-text-color: black"/>    
                    </el-form-item>
                </el-col>
                <el-row>
                    <el-col :span="8">
                        <el-form-item class="item-center">
                            <el-button @click="createGame" type="primary" class="item-center">
                                ADD GAME
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="item-center">
                            <el-button @click="editGame" type="primary" class="item-center">
                                EDIT GAME
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="item-center">
                            <el-button @click="deleteGame" type="primary" class="item-center">
                                DELETE GAME
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
        </el-form>
    </el-row>
    
    <el-row>
        <el-col :span="24">
            <el-table
                :data="filterTableData"
                max-height="100vh"
                style="width: 100%"
                highlight-current-row
                @current-change="selectGame"
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
import axios from "axios";
export default {
    name: "GamesTable",
    components: {},
    setup() {
        var state = useGamesStore();
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
            id:'',
        })

        const createGame = () => {
            axios
                .post(
                    "http://localhost:8080/games/create",
                    {
                        name: formGames.name,
                        editor: formGames.editor,
                        author: formGames.author,
                        average_time: formGames.average_time,
                        number_of_player: formGames.number_of_player,
                        description: formGames.description
                    }
                )
                .then((response)=>{ 
                    state = useGamesStore();
                    state.fetchGames();
                    console.log(response);
                    
                })
                .catch((error) => console.log(error));
        }

        const selectGame = (val) => {
            if( val ) {
                console.log(val);
                formGames.name = val.name;
                formGames.author = val.author;
                formGames.editor = val.editor;
                formGames.number_of_player = val.number_of_player;
                formGames.average_time = val.average_time;
                formGames.id = val.game_id;
                formGames.description = val.description;
            }
        }

        const deleteGame= () =>{
            axios
                .post(
                    "http://localhost:8080/games/delete",
                    {
                        id: formGames.id
                    }
                )
                .then((response)=>{ 
                    state = useGamesStore();
                    state.fetchGames();
                    console.log(response);
                    
                })
                .catch((error) => console.log(error));
        }

        const editGame = () =>{

        }

        return { state, search, filterTableData, formGames, createGame, editGame, deleteGame, selectGame};
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
.item-center{
    width: 100%;
}
</style>
