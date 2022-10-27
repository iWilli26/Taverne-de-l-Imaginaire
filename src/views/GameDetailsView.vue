<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { axiosPublic } from "../auth";
import { useGamesStore } from "../stores/games";
</script>
<template>
    <h1>{{ game.name }}</h1>
    <div class="details">
        <div class="tags">
            Tags :&nbsp;
            <div class="tag" v-for="tag in tags" :key="tag.id">
                {{ tag.name }}
            </div>
        </div>
        <div class="description">
            Description :
            {{ game.description }}
        </div>
        <div class="info">
            <p>{{ game.number_of_player }} <br />{{ game.average_time }}</p>
        </div>
    </div>
    <div class="comment">
        <h2>Commentaires et avis</h2>
        <el-form :model="form">
            <el-form-item>
                <el-input
                    @keyup.enter="onSubmit"
                    class="input"
                    v-model="form.comment"
                    type="textarea"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit()">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
const form = reactive({
    email: "",
    password: "",
});
export default {
    data() {
        return {
            game: {},
            tags: [],
        };
    },
    mounted() {
        const id = this.$route.query.id;
        axiosPublic.get(`/games/${id}`).then((res) => {
            this.game = res.data.data[0];
        });
        axiosPublic.get(`/tag/${id}`).then((res) => {
            this.tags = res.data.data;
            console.log(res.data.data);
        });
    },
};
</script>
<style scoped>
.el-form {
    width: 80vw;
}
.tags {
    display: flex;
    flex-direction: row;
}
.tag {
    margin-right: 1rem;
}
</style>
