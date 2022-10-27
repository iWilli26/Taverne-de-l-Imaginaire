<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { axiosPublic } from "../auth";
import { useUserStore } from "../stores/user";
</script>
<template>
    <div class="content">
        <h1>{{ game.name }}</h1>
        <img v-bind:src="src" />
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
        <div class="commentsContainer">
            <h2>Commentaires</h2>
            <div>
                <el-form v-model="form">
                    <el-rate allow-half v-model="form.value" :colors="colors" />
                    <el-form-item>
                        <el-input
                            class="input"
                            v-model="form.comment"
                            type="textarea"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()"
                            >Login</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
            <div class="comments">
                <div
                    class="comment"
                    v-for="comment in comments"
                    :key="comment.id"
                >
                    <div class="user">
                        <div class="name">
                            {{ comment.username }}
                        </div>
                    </div>
                    <div class="text">
                        {{ comment.text }}
                    </div>
                    <div>
                        <div class="rate">
                            <el-rate
                                allow-half
                                v-model="comment.note"
                                :colors="colors"
                                :disabled="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);
const form = reactive({
    comment: "",
    value: 0,
});
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const currentDate = `${day}-${month}-${year}`;
export default {
    data() {
        return {
            src: "./shadow.jpg",
            game: {},
            tags: [],
            form: {},
            comments: [],
        };
    },
    mounted() {
        const id = this.$route.query.id;
        axiosPublic.get(`/games/${id}`).then((res) => {
            this.game = res.data.data[0];
        });
        axiosPublic.get(`/tag/${id}`).then((res) => {
            this.tags = res.data.data;
        });
        axiosPublic.get(`/comment/${id}`).then((res) => {
            console.log(res.data.data);
            this.comments = res.data.data;
        });
    },
    methods: {
        onSubmit() {
            const id = this.$route.query.id;
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user);
            axiosPublic
                .post(`/comment/${id}`, {
                    user_id: user.user_id,
                    comment: form.comment,
                    date: currentDate,
                    value: form.value,
                })
                .then((res) => {
                    console.log(res);
                    this.comments.push({
                        username: user.username,
                        text: form.comment,
                        note: form.value,
                    });
                });
        },
    },
};
</script>
<style scoped>
img {
    width: 20vw;
    height: auto;
    margin: auto;
}
.el-form {
    width: 80vw;
}
.content {
    display: flex;
    flex-direction: column;
    padding: 2%;
}
.tags {
    display: flex;
    flex-direction: row;
}
.tag {
    margin-right: 1rem;
}
.comment {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 100%;
}
.rate {
    margin-left: auto;
}
</style>
