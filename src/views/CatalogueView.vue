<script setup>
import GameCard from "../components/GameCard.vue";
import axios from "axios";
</script>

<template>
    <main>
        <div v-if="isAdmin" class="form">
            <el-form :model="form" label-width="120px">
                <el-form-item label="Last Name">
                    <el-input class="input" v-model="form.name" />
                </el-form-item>
                <el-form-item label="First Name">
                    <el-input class="input" v-model="form.fname" />
                </el-form-item>
                <el-form-item label="Email">
                    <el-input class="input" v-model="form.email" />
                </el-form-item>
                <el-form-item label="Password">
                    <el-input class="input" v-model="form.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit"
                        >Signup</el-button
                    >
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <GameCard v-bind:game="game1" :avis="avis1" />
            <GameCard :game="game2" :avis="avis2" />
            <button @click="fetchGames"></button>
        </div>
    </main>
</template>

<script>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
    name: "",
    fname: "",
    email: "",
    password: "",
});

const onSubmit = () => {
    if (
        form.name === "" ||
        form.fname === "" ||
        form.email === "" ||
        form.password === ""
    ) {
        alert("Please fill all the fields");
    } else {
        axios
            .post("http://localhost:8080/signup/", {
                firstName: form.fname,
                lastName: form.name,
                email: form.email,
                password: form.password,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
};
export default {
    name: "Catalogue",
    setup() {
        const state = reactive({
            games: [],
        });

        const fetchGames = () => {
            axios
                .get("http://localhost:8080/games/")
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    state.games = response.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        };
        fetchGames();
    },
    components: {
        GameCard,
    },
    data() {
        return {
            isAdmin: false,
            game1: {
                id: 1,
                name: "Shadow Hunter",
                description: "A game of deception and betrayal",
                players: "5-8",
                time: "30-60 minutes",
                image: "./shadow.jpg",
            },
            game2: {
                id: 2,
                name: "Secret Hitler",
                description:
                    "A game of nazism and deception.\nKill Hitler before he kills you!",
                players: "5-10",
                time: "2 years",
                image: "./hitler.jpg",
            },
            avis1: {
                note: 9,
                comment: "This game is great!",
            },
            avis2: {
                note: 0,
                comment: "This game is terrible!",
            },
        };
    },
    methods: {
        fetchGames() {
            axios
                .get("http://localhost:8080/games/")
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    // state.games = response.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped>
.input {
    width: 50vw;
}
.form {
    margin-top: 20px;
}
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
