<template>
    <el-main>
        <el-row>
            <el-form
                :model="formGameTags"
                :inline="true"
                class="overwrite-label"
            >
                <el-form-item label="Tags">
                    <el-select
                        v-model="formGameTags.tags"
                        multiple
                        class="m-2"
                        placeholder="Select"
                    >
                        <el-option
                            v-for="tag in tags"
                            :key="tag.tag_id"
                            :label="tag.name"
                            :value="tag.tag_id"
                        />
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item class="item-center">
                            <el-button
                                @click="editGameTags"
                                type="primary"
                                class="item-center"
                            >
                                EDIT TAGS OF GAME
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table
                    :data="filterDataTable"
                    max-height="100vh"
                    style="width: 100%"
                    highlight-current-row
                    @current-change="selectGame"
                    class="overwrite-table"
                >
                    <el-table-column prop="game_id" label="Id" />
                    <el-table-column prop="name" label="Name" />
                    <el-table-column prop="tags" label="Tags" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input
                                @change="filterTable"
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
import { computed, ref, reactive } from "vue";
import { axiosPublic } from "../auth";
export default {
    name: "GamesTable",
    components: {},
    mounted() {
        axiosPublic.get("/tag/").then((response) => {
            this.tags = response.data.data;
            console.log(this.tags);
        });
        axiosPublic.get("/tag/games").then((response) => {
            const tagsGame = response.data.data;
            axiosPublic.get("/games").then((response) => {
                this.games = response.data.data;
                for (let i = 0; i < this.games.length; i++) {
                    let tempName = [];
                    let tempId = [];
                    for (let j = 0; j < tagsGame.length; j++) {
                        if (this.games[i].game_id === tagsGame[j].game_id) {
                            tempName.push(tagsGame[j].name);
                            tempId.push(tagsGame[j].tag_id);
                        }
                        this.games[i].tags = tempName;
                        this.games[i].ids = tempId;
                    }
                }
                console.log(this.games);
            });
        });
    },
    setup() {
        const search = ref("");

        const formGameTags = reactive({
            tags: [],
            game_id: "",
            name: "",
        });

        const selectGame = (val) => {
            if (val) {
                console.log(val.ids);
                formGameTags.tags = val.ids;
                formGameTags.name = val.name;
                formGameTags.game_id = val.game_id;
            }
        };

        return { search, formGameTags, selectGame };
    },
    data() {
        return {
            games: [],
            tags: [],
            filterDataTable: [],
        };
    },
    methods: {
        editGameTags() {
            console.log(this.formGameTags.tags);
            axiosPublic
                .post("/gametags/deleteGameTags", {
                    game_id: this.formGameTags.game_id,
                })
                .then((response) => {
                    axiosPublic
                        .post("/gametags/createGameTags", {
                            game_id: this.formGameTags.game_id,
                            ids: this.formGameTags.tags
                    })
                    .then((response =>{
                        console.log(response);

                        axiosPublic.get("/tag/games").then((response) => {
                            const tagsGame = response.data.data;
                            axiosPublic.get("/games").then((response) => {
                                this.games = response.data.data;
                                for (let i = 0; i < this.games.length; i++) {
                                    let tempName = [];
                                    let tempId = [];
                                    for (let j = 0; j < tagsGame.length; j++) {
                                        if (this.games[i].game_id === tagsGame[j].game_id) {
                                            tempName.push(tagsGame[j].name);
                                            tempId.push(tagsGame[j].tag_id);
                                        }
                                        this.games[i].tags = tempName;
                                        this.games[i].ids = tempId;
                                    }
                                }
                                console.log(this.games);
                            });
                        });
                    }))

                    console.log(response);
                })
                .catch((error) => console.log(error));
        },
    },
    computed: {
        filterTable() {
            this.filterDataTable = this.games.filter(
                (data) =>
                    !this.search ||
                    data.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
};
</script>

<style scoped>
.overwrite-table {
    --el-table-header-bg-color: #626567;
    --el-text-color-regular: #f8f8f8;
    --el-text-color-secondary: #f8f8f8;
    --el-table-tr-bg-color: #909497;
    --el-table-row-hover-bg-color: #797d7f;
    --el-table-current-row-bg-color: #b11100;
    --el-table-border-color: transparent;
}
.item-center {
    width: 100%;
}
</style>
