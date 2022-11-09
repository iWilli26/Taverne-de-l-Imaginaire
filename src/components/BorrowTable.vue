
<template>
    <el-main>
        <el-row>
            <el-form :model="formBorrow" :inline="true" class="overwrite-label">
                    <el-col :span="24">
                        <el-form-item label="Description" style="--el-text-color-regular: #f8f8f8" >
                            <el-input v-model="formBorrow.description" type="textarea" style="--el-input-text-color: black"/>    
                        </el-form-item>
                    </el-col>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="confirmReturn" type="primary">
                                    CONFIRM RETURN
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
                    @current-change="selectBorrow"
                    class="overwrite-table"
                >
                    <el-table-column prop="borrow_id" label="Id" />
                    <el-table-column prop="copy_id" label="Copy ID"/>
                    <el-table-column prop="game_name" label="Game Name" />
                    <el-table-column prop="user_id" label="User Id" />
                    <el-table-column prop="username" label="Username" />
                    <el-table-column prop="borrowing_date" label="Borrowing Date"/>
                    <el-table-column prop="return_date" label="Return Date" />
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
    import { ref, reactive } from "vue";
    import { axiosPublic } from "../auth";
    export default {
        name: "BorrowTable",
        components: {},
        mounted() {
            axiosPublic
                .get('/borrow/getTransfo')
                .then((response) => {
                    this.borrows=response.data;
                })
        },
        setup() {
            const search = ref("");

            const formBorrow = reactive({
                description: '',
                id:'',
                borrow_id:''
            })
    
            const selectBorrow = (val) => {
                if( val ) {
                    formBorrow.id = val.copy_id;
                    formBorrow.borrow_id=val.borrow_id
                }
            }
    
            return { search, formBorrow, selectBorrow};
        },
        data() {
            return {
                borrows : [],
                filterDataTable: [],
            };
        },
        methods: {
            confirmReturn(){
                axiosPublic
                    .post(
                        "/copy/updateAvailableAtTrue",
                        {
                            description: this.formBorrow.description,
                            id: this.formBorrow.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/borrow/getTransfo')
                            .then((response) => {
                                this.borrows=response.data
                            })
                        
                    })
                    .catch((error) => console.log(error));
                
                axiosPublic
                    .post(
                        "/borrow/updateDescription",
                        {
                            borrow_id: this.formBorrow.borrow_id,
                            description: this.formBorrow.description
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/borrow/getTransfo')
                            .then((response) => {
                                this.borrows=response.data
                            })
                        
                    })
                    .catch((error) => console.log(error));
            }
        },
        computed: {
            filterTable() {
                this.filterDataTable=this.borrows.filter(
                        (data) =>
                            !this.search || data.id.toLowerCase().includes(this.search.toLowerCase())
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
    