<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { axiosPublic } from "../auth";
import { useUserStore } from "../stores/user";
</script>
<template>
    <div class="content">
        <div class="imgCreator">
            <img v-bind:src="src" />
            <div style="padding-left: 1%">
                <h1>{{ game.name }}</h1>
                <p>
                    Created by {{ game.author }} <br />
                    Edited by {{ game.editor }}
                </p>
            </div>
        </div>
        <div class="details">
            <div class="tags">
                <p>Tags :&nbsp;</p>
                <div class="tag" v-for="tag in tags" :key="tag.id">
                    <p>
                        {{ tag.name }}
                    </p>
                </div>
            </div>
            <div class="description">
                <p>
                    Description :
                    {{ game.description }}
                </p>
            </div>
            <div class="info">
                <p>{{ game.number_of_player }}</p>
                <p>{{ game.average_time }}</p>
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
                            >Send</el-button
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
                    <div class="userText">
                        <div class="user">
                            {{ comment.username }}
                        </div>
                        <div class="text">
                            {{ comment.text }}
                        </div>
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
h1 {
    font-size: 2rem;
}
p {
    font-size: 1.2rem;
}
.info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.imgCreator {
    display: flex;
    flex-direction: row;
}
img {
    width: 20vw;
    height: auto;
    margin: 0;
}
.el-form {
    width: 94vw;
}
.content {
    display: flex;
    flex-direction: column;
    margin: 2%;
    margin-bottom: 0;
}
.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.tag {
    margin-right: 1rem;
}
.comment {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 100%;
    justify-content: space-between;
    border: 2px;
    border-style: solid;
    border-color: white;
    border-radius: 10px;
}

.userText {
    display: flex;
    flex-direction: column;
}
</style>
