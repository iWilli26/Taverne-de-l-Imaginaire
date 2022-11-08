<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { axiosPublic } from "../auth";
import { useUserStore } from "../stores/user";
import { InfoFilled, Delete, Edit, Calendar } from "@element-plus/icons-vue";
</script>
<template>
    <div class="content">
        <div class="imgCreator">
            <!-- <img v-bind:src="src" style="padding: 1%" /> -->
            <div>
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
                <p>
                    {{ game.number_of_player }}
                    <br />
                    {{ game.average_time }}
                </p>
            </div>
        </div>
        <div class="borrowContainer">
            <h2>Exemplaires existants</h2>

            <div v-for="copy in copies" :key="copy.copy_id">
                <div class="copyWrapper">
                    <div
                        v-bind:class="{
                            dispo: copy.is_available,
                            indisp: !copy.is_available,
                        }"
                        style="
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                        "
                    >
                        <div class="copyContent" style="">
                            <p style="width: 25vw; font-size: min(3vw, 1.5rem)">
                                {{ copy.name }}
                            </p>
                            <el-scrollbar max-height="10vh">
                                <p
                                    style="
                                        width: 25vw;
                                        font-size: min(2vw, 1rem);
                                    "
                                >
                                    {{ copy.description }}
                                </p>
                            </el-scrollbar>

                            <p style="width: 20vw; font-size: min(3vw, 1.5rem)">
                                {{ copy.available }}
                            </p>
                            <el-button
                                v-if="copy.is_available"
                                style="width: 10vw; font-size: min(3vw, 1.5rem)"
                                link
                                type="primary"
                                size="small"
                                @click="
                                    dialogFormVisible = true;
                                    borrowId = copy.copy_id;
                                "
                                >Emprunter</el-button
                            >
                            <div
                                style="width: 10vw"
                                v-if="!copy.is_available"
                            ></div>
                        </div>
                    </div>
                    <el-divider style="margin: 0" />
                </div>
            </div>
            <el-dialog
                v-model="dialogFormVisible"
                title="Emprunt de jeu"
                center
            >
                <p style="display: flex; flex-wrap: wrap; padding-bottom: 10px">
                    Vous ne pouvez emprunter un jeu que pour une semaine maximum
                    <br />
                    2 jeux maximum par personne
                </p>
                <el-form :model="formBorrow">
                    <el-form-item
                        label="Date d'emprunt"
                        :suffix-icon="Calendar"
                    >
                        <el-input
                            :suffix-icon="Calendar"
                            v-model="formBorrow.borrowDate"
                            autocomplete="off"
                            style="width: 15vw"
                            type="date"
                        />
                    </el-form-item>
                    <el-form-item label="Date de retour">
                        <el-input
                            :suffix-icon="Calendar"
                            v-model="formBorrow.returnDate"
                            autocomplete="off"
                            style="width: 15vw"
                            type="date"
                        />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false"
                            >Cancel</el-button
                        >
                        <el-button
                            type="primary"
                            @click="
                                dialogFormVisible = false;
                                handleBorrow();
                            "
                        >
                            Confirmer
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div class="commentsContainer">
            <h2>Commentaires</h2>
            <div>
                <el-form v-model="formComment">
                    <el-rate v-model="formComment.value" :colors="colors" />
                    <el-form-item>
                        <el-input
                            class="input"
                            v-model="formComment.comment"
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
                        <div class="userDate">
                            <p style="font-weight: bold">
                                {{ comment.username }}
                            </p>
                            <p style="font-size: 1rem">
                                &nbsp; {{ comment.date }}
                            </p>
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
                        <el-scrollbar v-else max-height="15vh">
                            {{ comment.text }}
                        </el-scrollbar>
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
const colors = ["#99A9BF", "#F7BA2A", "#FF9900"];
const formComment = reactive({
    comment: "",
    value: 0,
});
const formBorrow = reactive({
    borrowDate: "",
    returnDate: "",
});
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const currentDate = `${day}-${month}-${year}`;

export default {
    setup() {},
    data() {
        return {
            borrowId: 0,
            user: JSON.parse(localStorage.getItem("user")),
            src: "./shadow.jpg",
            game: {},
            tags: [],
            formComment: {},
            copies: [],
            comments: [],
            isEditing: false,
            commentToEdit: 0,
            dialogFormVisible: false,
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
        axiosPublic.get(`/copy/${id}`).then((res) => {
            this.copies = res.data.data;
            for (let i = 0; i < this.copies.length; i++) {
                if (this.copies[i].is_available === true) {
                    this.copies[i].available = "Disponible";
                } else {
                    this.copies[i].available = "Indisponible";
                }
            }
        });
    },
    methods: {
        handleBorrow() {
            const borrow = {
                copy_id: this.borrowId,
                user_id: this.user.user_id,
                borrow_date: formBorrow.borrowDate,
                return_date: formBorrow.returnDate,
            };
            if (borrow.borrow_date === "" || borrow.return_date === "") {
                alert("Veuillez remplir les champs");
            } else {
                let date1 = new Date(borrow.borrow_date);
                let date2 = new Date(borrow.return_date);
                let difference =
                    (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
                if (difference > 7) {
                    alert(
                        "Vous ne pouvez pas emprunter un jeu pour plus de 7 jours"
                    );
                } else {
                    axiosPublic.post("/borrow", borrow).then((res) => {
                        if (res.data.data !== undefined) {
                            for (let i = 0; i < this.copies.length; i++) {
                                if (this.copies[i].copy_id === borrow.copy_id) {
                                    this.copies[i].available = "Indisponible";
                                    this.copies[i].is_available = false;
                                }
                            }
                            alert("Emprunt effectué");
                        } else {
                            alert(res.data.error);
                        }
                    });
                }
            }
        },
        refreshComments() {
            const id = this.$route.query.id;
            axiosPublic.get(`/comment/${id}`).then((res) => {
                this.comments = res.data.data;
            });
        },
        onSubmit() {
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
.dispo {
    background-color: #3e6b27;
}
.indisp {
    background-color: #262727;
}
.copyWrapper {
    display: flex;
    flex-direction: column;
}
.copyContent {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 10vh;
}
.userDate {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.borrowContainer {
    margin-top: 5%;
    margin-bottom: 5%;
}

.el-table {
    margin: 0;
    --el-table-tr-bg-color: none;
    --el-table-bg-color: none;
    --el-table-header-bg-color: none;
    --el-table-row-hover-bg-color: none;
    color: var(--color-text);
}

h1 {
    font-size: 2rem;
}
p {
    font-size: 1.2rem;
}
.info {
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
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
