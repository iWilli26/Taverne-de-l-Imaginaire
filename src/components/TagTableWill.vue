<template>
    <el-main>
        <el-row>
            <el-form :model="formUsers" :inline="true" class="overwrite-label">
                <el-form-item>
                </el-form-item>
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
                <el-row>
                    <el-col :span="8">
                        <el-form-item class="item-center">
                            <el-button
                                @click="createTag"
                                type="primary"
                                class="item-center"
                            >
                                CREATE TAG
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
                    @current-change="selectUsers"
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
        });
        axiosPublic.get("/tag/games").then((response) => {
            const tagsGame = response.data.data;
            axiosPublic.get("/games").then((response) => {
                this.games = response.data.data;
                for (let i = 0; i < this.games.length; i++) {
                    let temp = [];
                    for (let j = 0; j < tagsGame.length; j++) {
                        if (this.games[i].game_id === tagsGame[j].game_id) {
                            temp.push(tagsGame[j].name);
                        }
                        this.games[i].tags = temp;
                    }
                }
                console.log(this.games);
            });
        });
    },
    setup() {
        const drawer = ref(false);
        const search = ref("");

        const form = reactive({
            name: "",
        });

        const selectUsers = (val) => {
            if (val) {
                formUsers.first_name = val.first_name;
                formUsers.last_name = val.last_name;
                formUsers.username = val.username;
                formUsers.email_address = val.email_address;
                formUsers.is_admin = val.is_admin;
                formUsers.id = val.user_id;
            }
        };

        return { search, form, selectUsers, drawer };
    },
    data() {
        return {
            checkBox: [],
            games: [],
            tags: [],
            users: [],
            filterDataTable: [],
        };
    },
    methods: {
        createUser() {
            axiosPublic
                .post("/users/create", {
                    lastName: this.formUsers.last_name,
                    firstName: this.formUsers.first_name,
                    username: this.formUsers.username,
                    email: this.formUsers.email_address,
                    isAdmin: this.formUsers.is_admin,
                    password: this.formUsers.password,
                })
                .then((response) => {
                    console.log(response);
                    axiosPublic.get("/users").then((response) => {
                        this.users = response.data;
                    });
                })
                .catch((error) => console.log(error));
        },

        deleteUser() {
            axiosPublic
                .post("/users/delete", {
                    id: this.formUsers.id,
                })
                .then((response) => {
                    console.log(response);
                    axiosPublic.get("/users").then((response) => {
                        this.users = response.data;
                    });
                })
                .catch((error) => console.log(error));
        },

        editUser() {
            axiosPublic
                .post("/users/update", {
                    lastName: this.formUsers.last_name,
                    firstName: this.formUsers.first_name,
                    username: this.formUsers.username,
                    email: this.formUsers.email_address,
                    isAdmin: this.formUsers.is_admin,
                    id: this.formUsers.id,
                })
                .then((response) => {
                    console.log(response);
                    axiosPublic.get("/users").then((response) => {
                        this.users = response.data;
                    });
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
