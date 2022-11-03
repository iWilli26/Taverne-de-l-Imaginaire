<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { axiosPublic } from "../auth";
import { useUserStore } from "../stores/user";
import { InfoFilled, Delete, Edit } from "@element-plus/icons-vue";
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
                    <el-rate v-model="form.value" :colors="colors" />
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
                        <div style="font-weight: bold">
                            {{ comment.username }}
                        </div>
                        <div
                            v-if="
                                isEditing &&
                                comment.comment_id === commentToEdit
                            "
                            class="text"
                        >
                            <el-input v-model="comment.text" type="textarea" />
                        </div>
                        <div v-else>
                            {{ comment.text }}
                        </div>
                    </div>
                    <div>
                        <div class="rate">
                            <el-rate
                                v-if="!isEditing"
                                v-model="comment.note"
                                :colors="colors"
                                :disabled="true"
                            /><el-rate
                                v-if="isEditing"
                                v-model="comment.note"
                                :colors="colors"
                            />
                            <div v-if="comment.user_id === user.user_id">
                                <el-button
                                    @click="onEdit(comment)"
                                    type="primary"
                                    :icon="Edit"
                                    circle
                                />
                                <el-popconfirm
                                    confirm-button-text="OK"
                                    cancel-button-text="No, Thanks"
                                    :icon="InfoFilled"
                                    icon-color="#626AEF"
                                    title="Are you sure to delete this?"
                                    @confirm="onDelete(comment.comment_id)"
                                >
                                    <template #reference>
                                        <el-button
                                            type="danger"
                                            :icon="Delete"
                                            circle
                                        />
                                    </template>
                                </el-popconfirm>
                            </div>
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
            user: JSON.parse(localStorage.getItem("user")),
            src: "./shadow.jpg",
            game: {},
            tags: [],
            form: {},
            comments: [],
            isEditing: false,
            commentToEdit: 0,
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
        refreshComments() {
            const id = this.$route.query.id;
            axiosPublic.get(`/comment/${id}`).then((res) => {
                this.comments = res.data.data;
            });
        },
        onSubmit() {
            console.log(this.comments);
            console.log(this.user);
            const id = this.$route.query.id;
            axiosPublic
                .post(`/comment/${id}`, {
                    user_id: this.user.user_id,
                    comment: form.comment,
                    date: currentDate,
                    value: form.value,
                })
                .then((res) => {
                    if (res.data.error !== undefined) {
                        alert(res.data.error);
                    }
                    this.refreshComments();
                });
        },
        onDelete(id) {
            axiosPublic.delete(`/comment/delete/${id}`).then((res) => {
                if (res.data.error !== undefined) {
                    alert(res.data.error);
                }
                this.refreshComments();
            });
        },
        onEdit(comment) {
            if (this.isEditing) {
                axiosPublic
                    .patch(`/comment/edit/${comment.comment_id}`, {
                        text: comment.text,
                        note: comment.note,
                    })
                    .then((res) => {
                        if (res.data.error !== undefined) {
                            alert(res.data.error);
                        }
                        this.refreshComments();
                    });
            }
            this.isEditing = !this.isEditing;
            this.commentToEdit = comment.comment_id;
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
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 100%;
    min-height: 80px;
    justify-content: space-between;
    border: 2px;
    border-style: solid;
    border-color: white;
    border-radius: 10px;
}

.userText {
    display: flex;
    flex-direction: column;
    width: 70vw;
}
</style>
