
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
                                <el-button @click="createUser" type="primary" class="item-center">
                                    ADD USER
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="editUser" type="primary" class="item-center">
                                    EDIT USER
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="deleteUser" type="primary" class="item-center">
                                    DELETE USER
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
                                style="--el-text-color-regular: black"
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
            axiosPublic
                .get('/users')
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
    
            const selectUsers = (val) => {
                if( val ) {
                    console.log(val);
                    formUsers.first_name = val.first_name;
                    formUsers.last_name = val.last_name;
                    formUsers.username = val.username;
                    formUsers.email_address = val.email_address;
                    formUsers.is_admin = val.is_admin;
                    formUsers.id = val.user_id;
                }
            }
    
            return { search, formUsers, selectUsers};
        },
        data() {
            return {
                users : [],
                filterDataTable: []
            };
        },
        methods: {
            createUser(){
                axiosPublic
                    .post(
                        "/users/create",
                        {
                            lastName: this.formUsers.last_name,
                            firstName: this.formUsers.first_name,
                            username: this.formUsers.username,
                            email: this.formUsers.email_address,
                            isAdmin: this.formUsers.is_admin,
                            password: this.formUsers.password
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/users')
                            .then((response) => {
                                this.users=response.data          
                            })
                        
                    })
                    .catch((error) => console.log(error));
            },

            deleteUser(){
                axiosPublic
                    .post(
                        "/users/delete",
                        {
                            id: this.formUsers.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/users')
                            .then((response) => {
                                this.users=response.data
                            })
                        
                    })
                    .catch((error) => console.log(error));
            },

            editUser(){
                axiosPublic
                    .post(
                        "/users/update",
                        {
                            lastName: this.formUsers.last_name,
                            firstName: this.formUsers.first_name,
                            username: this.formUsers.username,
                            email: this.formUsers.email_address,
                            isAdmin: this.formUsers.is_admin,
                            id: this.formUsers.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/users')
                            .then((response) => {
                                this.users=response.data
                            })
                        
                    })
                    .catch((error) => console.log(error));
                }
        },
        computed: {
            filterTable() {
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
    