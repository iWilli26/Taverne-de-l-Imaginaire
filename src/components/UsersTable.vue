
<template>
    <el-main>
        <el-row>
            <el-form :model="formUsers" :inline="true" class="overwrite-label">
                    <el-form-item label="Last Name" style="--el-text-color-regular: #f8f8f8">
                            <el-input v-model="formUsers.last_name" style="--el-input-text-color: black"/>
                    </el-form-item>
                    <el-form-item label="First Name" style="--el-text-color-regular: #f8f8f8" >
                            <el-input v-model="formUsers.first_name" style="--el-input-text-color: black"/>
                    </el-form-item>
                    <el-form-item label="Userame"  style="--el-text-color-regular: #f8f8f8">
                            <el-input v-model="formUsers.username" style="--el-input-text-color: black"/>
                    </el-form-item>
                    <el-form-item label="Email Address" style="--el-text-color-regular: #f8f8f8">
                        <el-input v-model="formUsers.email_address" style="--el-input-text-color: black"/>
                    </el-form-item>
                    <el-form-item label="Admin"  style="--el-text-color-regular: #f8f8f8">
                        <el-checkbox v-model="formUsers.is_admin" />
                    </el-form-item>
                    <el-col :span="24">
                        <el-form-item label="Password" style="--el-text-color-regular: #f8f8f8" >
                            <el-input v-model="formUsers.password" type="textarea" style="--el-input-text-color: black"/>    
                        </el-form-item>
                    </el-col>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="createGame" type="primary" class="item-center">
                                    ADD GAME
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="editGame" type="primary" class="item-center">
                                    EDIT GAME
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="deleteGame" type="primary" class="item-center">
                                    DELETE GAME
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
                    @current-change="selectUser"
                    class="overwrite-table"
                >
                    <el-table-column prop="user_id" label="Id" />
                    <el-table-column prop="last_name" label="Last Name" />
                    <el-table-column prop="first_name" label="First Name" />
                    <el-table-column prop="username" label="Username" />
                    <el-table-column prop="email_address" label="Email" />
                    <el-table-column prop="is_admin" label="Admin" />
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
    import axios from "axios";
    export default {
        name: "GamesTable",
        components: {},
        mounted() {
            axios
                .get('http://localhost:8080/users')
                .then((response) => {
                    this.users=response.data;
                })
                

        },
        setup() {
            const search = ref("");

            const formUsers = reactive({
                first_name: '',
                last_name: '',
                username: '',
                password:'',
                email_address:'',
                is_admin: false,
                id:'',
            })

    
            const createUsers = () => {
                axios
                    .post(
                        "http://localhost:8080/games/create",
                        {
                            name: formGames.name,
                            editor: formGames.editor,
                            author: formGames.author,
                            average_time: formGames.average_time,
                            number_of_player: formGames.number_of_player,
                            description: formGames.description
                        }
                    )
                    .then((response)=>{ 
                        state = useGamesStore();
                        state.fetchGames();
                        console.log(response);
                        
                    })
                    .catch((error) => console.log(error));
            }
    
            const selectUsers = (val) => {
                if( val ) {
                    console.log(val);
                    formGames.name = val.name;
                    formGames.author = val.author;
                    formGames.editor = val.editor;
                    formGames.number_of_player = val.number_of_player;
                    formGames.average_time = val.average_time;
                    formGames.id = val.game_id;
                    formGames.description = val.description;
                }
            }
    
            const deleteUsers= () =>{
                axios
                    .post(
                        "http://localhost:8080/users/delete",
                        {
                            id: formUsers.id
                        }
                    )
                    .then((response)=>{ 
                        state = useGamesStore();
                        state.fetchGames();
                        console.log(response);
                        
                    })
                    .catch((error) => console.log(error));
            }
    
            const editGame = () =>{
                axios
                    .post(
                        "http://localhost:8080/games/update",
                        {
                            name: formGames.name,
                            editor: formGames.editor,
                            author: formGames.author,
                            average_time: formGames.average_time,
                            number_of_player: formGames.number_of_player,
                            description: formGames.description,
                            id: formGames.id
                        }
                    )
                    .then((response)=>{ 
                        state = useGamesStore();
                        state.fetchGames();
                        console.log(response);
                        
                    })
                    .catch((error) => console.log(error));
                }
            return { search, formUsers, createUsers, editGame, deleteUsers};
        },
        data() {
            return {
                users : [],
                filterDataTable: []
            };
        },
        methods: {},
        computed: {
            filterTable() {
                console.log(this.search);
                this.filterDataTable=this.users.filter(
                        (data) =>
                            !this.search || data.username.toLowerCase().includes(this.search.toLowerCase())
                )

            }
        }
    };
    </script>
    
    <style scoped>
    .overwrite-table {
        --el-table-header-bg-color: #626567;
        --el-text-color-regular: #f8f8f8;
        --el-text-color-secondary: #f8f8f8;
        --el-table-tr-bg-color: #909497;
        --el-table-row-hover-bg-color: #797D7F;
        --el-table-current-row-bg-color: #B11100;
        --el-table-border-color: transparent;
    }
    .item-center{
        width: 100%;
    }
    </style>
    