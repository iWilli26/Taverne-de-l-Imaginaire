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
                <el-checkbox-group v-model="checkBox" size="small">
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
        axiosPublic.get("/tag/").then((response) => {
            this.tags = response.data.data;
        });
        axiosPublic
            .get("/tag/games")
            .then((response) => {
                this.tagsGame = response.data.data;
            })
            .then(() => {
                axiosPublic.get("/games").then((response) => {
                    this.games = response.data.data;
                    for (let i = 0; i < this.games.length; i++) {
                        let temp = [];
                        for (let j = 0; j < this.tagsGame.length; j++) {
                            if (
                                this.games[i].game_id ===
                                this.tagsGame[j].game_id
                            ) {
                                temp.push(this.tagsGame[j].name);
                            }
                            this.games[i].tags = temp;
                        }
                    }
                    this.catalogue = this.games;
                });
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
            tagsGame: [],
        };
    },
    methods: {
        handleChange() {
            if (this.checkBox.length == 0) {
                this.catalogue = this.games;
            } else {
                this.catalogue = this.games.filter((game) => {
                    return this.checkBox.every((tag) => {
                        return game.tags.includes(tag);
                    });
                });
            }
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
