
<template>
    <el-main>
        <el-row>
            <el-form :model="formTag" :inline="true" class="overwrite-label">
                    <el-form-item label="Name" style="--el-text-color-regular: #f8f8f8">
                            <el-input v-model="formTag.name" style="--el-input-text-color: black"/>
                    </el-form-item>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="createTag" type="primary" class="item-center">
                                    ADD TAG
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="editTag" type="primary" class="item-center">
                                    EDIT TAG
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="deleteTag" type="primary" class="item-center">
                                    DELETE TAG
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
                    @current-change="selectTag"
                    class="overwrite-table"
                >
                    <el-table-column prop="tag_id" label="Id" />
                    <el-table-column prop="name" label="Name" />
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
        name: "TagTable",
        components: {},
        mounted() {
            axiosPublic
                .get('/tag')
                .then((response) => {
                    this.tags=response.data.data;
                    console.log(this.tags)
                })
                

        },
        setup() {
            const search = ref("");

            const formTag = reactive({
                name: '',
                id:'',
            })
    
            const selectTag = (val) => {
                if( val ) {
                    formTag.name = val.name;
                    formTag.id = val.tag_id;
                }
            }
    
            return { search, formTag, selectTag};
        },
        data() {
            return {
                tags : [],
                filterDataTable: []
            };
        },
        methods: {
            createTag(){
                axiosPublic
                    .post(
                        "/tag/create",
                        {
                            name: this.formTag.name
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/tag')
                            .then((response) => {
                                this.tags=response.data.data          
                            })
                        
                    })
                    .catch((error) => console.log(error));
            },

            deleteTag(){
                axiosPublic
                    .post(
                        "/tag/delete",
                        {
                            id: this.formTag.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/tag')
                            .then((response) => {
                                this.tags=response.data.data 
                            })
                        
                    })
                    .catch((error) => console.log(error));
            },

            editTag(){
                axiosPublic
                    .post(
                        "/tag/update",
                        {
                            name: this.formTag.name,
                            id: this.formTag.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/tag')
                            .then((response) => {
                                this.tags=response.data.data 
                            })
                        
                    })
                    .catch((error) => console.log(error));
                }
        },
        computed: {
            filterTable() {
                this.filterDataTable=this.tags.filter(
                        (data) =>
                            !this.search || data.name.toLowerCase().includes(this.search.toLowerCase())
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
    