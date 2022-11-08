<template>
    <div>
        <div class="content">
            <el-button
                type="primary"
                style="margin-left: 16px"
                @click="drawer = true"
            >
                open
            </el-button>
            <el-drawer v-model="drawer" title="Select tags">
                <el-checkbox-group
                    v-model="checkBox"
                    size="small"
                    @change="handleChange"
                >
                    <el-checkbox-button
                        v-for="tag in tags"
                        :key="tag"
                        :label="tag.name"
                        style="margin: 5px"
                        >{{ tag.name }}</el-checkbox-button
                    >
                </el-checkbox-group>
            </el-drawer>
            <el-input
                class="search-bar"
                v-model="search"
                placeholder="Search"
                @input="searchProducts"
            ></el-input>
            <div class="games">
                <GameCard
                    v-for="game in catalogue"
                    class="game"
                    :key="game.game_id"
                    :game="game"
                    @click="$router.push(`/game?id=${game.game_id}`)"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { axiosPublic } from "../auth";
import GameCard from "./GameCard.vue";
import { ref } from "vue";

export default {
    mounted() {
        axiosPublic.get("/games").then((response) => {
            this.games = response.data.data;
            this.catalogue = response.data.data;
        });
        axiosPublic.get("/tag").then((response) => {
            this.tags = response.data.data;
        });
    },
    components: {
        GameCard,
    },
    data() {
        return {
            checkBox: [],
            drawer: false,
            search: "",
            games: [],
            catalogue: [],
            tags: [],
        };
    },
    methods: {
        handleChange() {
            //filter games by tags
            console.log(this.checkBox);
            if (this.checkBox.length == 0) {
                this.catalogue = this.games;
            } else {
                this.catalogue = this.games.filter((game) => {
                    for (let i = 0; i < this.checkBox.length; i++) {
                        console.log(game);
                    }
                    return false;
                });
            }
            console.log(this.catalogue);
        },
        searchProducts() {
            if (this.search == "") {
                this.catalogue = this.games;
            } else {
                this.catalogue = this.games.filter((game) => {
                    return game.name
                        .toLowerCase()
                        .includes(this.search.toLowerCase());
                });
            }
        },
    },
};
</script>
<style scoped>
.search-bar {
    padding: 1%;
    width: 84vw;
}
.game {
    transition: transform 0.3s;
}
.game:hover {
    transform: scale(1.05);
    cursor: pointer;
}
</style>
