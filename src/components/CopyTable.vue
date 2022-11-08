
<template>
    <el-main>
        <el-row>
            <el-form :model="formCopy" :inline="true" class="overwrite-label">
                    <el-form-item label="Game">
                        <el-select v-model="formCopy.game_id" class="m-2" placeholder="Select">
                            <el-option
                            v-for="item in games"
                            :key="item.game_id"
                            :label="item.name"
                            :value="item.game_id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Localisation">
                        <el-select v-model="formCopy.localisation_id" class="m-2" placeholder="Select">
                            <el-option
                            v-for="item in localisations"
                            :key="item.localisation_id"
                            :label="item.name"
                            :value="item.localisation_id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Available"  style="--el-text-color-regular: #f8f8f8">
                        <el-checkbox v-model="formCopy.is_available" />
                    </el-form-item>
                    <el-col :span="24">
                        <el-form-item label="Description" style="--el-text-color-regular: #f8f8f8" >
                            <el-input v-model="formCopy.description" type="textarea" style="--el-input-text-color: black"/>    
                        </el-form-item>
                    </el-col>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="createCopy" type="primary" class="item-center">
                                    ADD COPY
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="editCopy" type="primary" class="item-center">
                                    EDIT COPY
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="deleteCopy" type="primary" class="item-center">
                                    DELETE COPY
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
                    @current-change="selectCopy"
                    class="overwrite-table"
                >
                    <el-table-column prop="copy_id" label="Id" />
                    <el-table-column prop="game_name" label="Game Name" />
                    <el-table-column prop="localisation" label="Localisation" />
                    <el-table-column prop="is_available" label="Available" />
                    <el-table-column prop="description" label="Description" />
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
    import { ref, reactive } from "vue";
    import axios from "axios";
    export default {
        name: "GamesTable",
        components: {},
        mounted() {
            axios
                .get('http://localhost:8080/copy/getTransfo')
                .then((response) => {
                    this.copy=response.data;
                })
            axios
                .get('http://localhost:8080/games')
                .then((response)=>{
                    this.games=response.data;
                })
            axios
                .get('http://localhost:8080/localisation')
                .then((response)=>{
                    this.localisations= response.data
                })

        },
        setup() {
            const search = ref("");

            const formCopy = reactive({
                is_available: true,
                description: '',
                id:'',
                localisation_id:'',
                game_id:''
            })
    
            const selectCopy = (val) => {
                if( val ) {
                    console.log(val);
                    formCopy.description = val.description;
                    formCopy.is_available = val.is_available;
                    formCopy.id = val.copy_id;
                    formCopy.game_id = val.game_id;
                    formCopy.localisation_id= val.localisation_id;
                }
            }
    
            return { search, formCopy, selectCopy};
        },
        data() {
            return {
                copy : [],
                filterDataTable: [],
                games: [],
                localisations: []
            };
        },
        methods: {
            createCopy(){
                console.log(this.formCopy);
                axios
                    .post(
                        "http://localhost:8080/copy/create",
                        {
                            localisation_id: this.formCopy.localisation_id,
                            game_id: this.formCopy.game_id,
                            description: this.formCopy.description,
                            is_available: this.formCopy.is_available,
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axios
                            .get('http://localhost:8080/copy/getTransfo')
                            .then((response) => {
                                this.copy=response.data          
                            })
                        
                    })
                    .catch((error) => console.log(error));
            },

            deleteCopy(){
                axios
                    .post(
                        "http://localhost:8080/copy/delete",
                        {
                            id: this.formCopy.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axios
                            .get('http://localhost:8080/copy/getTransfo')
                            .then((response) => {
                                this.copy=response.data
                            })
                        
                    })
                    .catch((error) => console.log(error));
            },

            editCopy(){
                axios
                    .post(
                        "http://localhost:8080/copy/update",
                        {
                            localisation_id: this.formCopy.localisation_id,
                            game_id: this.formCopy.game_id,
                            description: this.formCopy.description,
                            is_available: this.formCopy.is_available,
                            id: this.formCopy.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axios
                            .get('http://localhost:8080/copy/getTransfo')
                            .then((response) => {
                                this.copy=response.data
                            })
                        
                    })
                    .catch((error) => console.log(error));
                }
        },
        computed: {
            filterTable() {
                console.log(this.search);
                this.filterDataTable=this.copy.filter(
                        (data) =>
                            !this.search || data.game_name.toLowerCase().includes(this.search.toLowerCase())
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
    