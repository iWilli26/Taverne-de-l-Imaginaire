<script setup>
import GameCard from "../components/GameCard.vue";
</script>

<template>
    <main>
        <div v-if="isAdmin" class="form">
            <el-form :model="form" label-width="120px">
                <el-form-item label="Activity name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                    <el-select
                        v-model="form.region"
                        placeholder="please select your zone"
                    >
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Activity time">
                    <el-col :span="11">
                        <el-date-picker
                            v-model="form.date1"
                            type="date"
                            placeholder="Pick a date"
                            style="width: 100%"
                        />
                    </el-col>
                    <el-col :span="2" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-time-picker
                            v-model="form.date2"
                            placeholder="Pick a time"
                            style="width: 100%"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label="Instant delivery">
                    <el-switch v-model="form.delivery" />
                </el-form-item>
                <el-form-item label="Activity type">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="Online activities" name="type" />
                        <el-checkbox label="Promotion activities" name="type" />
                        <el-checkbox label="Offline activities" name="type" />
                        <el-checkbox
                            label="Simple brand exposure"
                            name="type"
                        />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Resources">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="Sponsor" />
                        <el-radio label="Venue" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Activity form">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit"
                        >Create</el-button
                    >
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <GameCard v-bind:game="game1" :avis="avis1" />
            <GameCard :game="game2" :avis="avis2" />
        </div>
    </main>
</template>

<script>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: "",
});

const onSubmit = () => {
    console.log("submit!");
};
export default {
    name: "Catalogue",
    components: {
        GameCard,
    },
    data() {
        return {
            isAdmin: true,
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
    methods: {},
};
</script>

<style scoped>
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
