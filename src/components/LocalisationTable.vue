
<template>
    <el-main>
        <el-row>
            <el-form :model="formLocalisation" :inline="true" class="overwrite-label">
                    <el-form-item label="Name" style="--el-text-color-regular: #f8f8f8">
                            <el-input v-model="formLocalisation.name" style="--el-input-text-color: black"/>
                    </el-form-item>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="createLocalisation" type="primary" class="item-center">
                                    ADD LOCALISATION
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="editLocalisation" type="primary" class="item-center">
                                    EDIT LOCALISATION
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="item-center">
                                <el-button @click="deleteLocalisation" type="primary" class="item-center">
                                    DELETE LOCALISATION
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
                    @current-change="selectLocalisation"
                    class="overwrite-table"
                >
                    <el-table-column prop="localisation_id" label="Id" />
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
        name: "LocalisationTable",
        components: {},
        mounted() {
            axiosPublic
                .get('/localisation')
                .then((response) => {
                    this.localisations=response.data;
                })
                

        },
        setup() {
            const search = ref("");

            const formLocalisation = reactive({
                name: '',
                id:'',
            })
    
            const selectLocalisation = (val) => {
                if( val ) {
                    formLocalisation.name = val.name;
                    formLocalisation.id = val.localisation_id;
                }
            }
    
            return { search, formLocalisation, selectLocalisation};
        },
        data() {
            return {
                localisations : [],
                filterDataTable: []
            };
        },
        methods: {
            createLocalisation(){
                axiosPublic
                    .post(
                        "/localisation/create",
                        {
                            name: this.formLocalisation.name
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/localisation')
                            .then((response) => {
                                this.localisations=response.data          
                            })
                        
                    })
                    .catch((error) => console.log(error));
            },

            deleteLocalisation(){
                axiosPublic
                    .post(
                        "/localisation/delete",
                        {
                            id: this.formLocalisation.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/localisation')
                            .then((response) => {
                                this.localisations=response.data
                            })
                        
                    })
                    .catch((error) => console.log(error));
            },

            editLocalisation(){
                axiosPublic
                    .post(
                        "/localisation/update",
                        {
                            name: this.formLocalisation.name,
                            id: this.formLocalisation.id
                        }
                    )
                    .then((response)=>{ 
                        console.log(response);
                        axiosPublic
                            .get('/localisation')
                            .then((response) => {
                                this.localisations=response.data
                            })
                        
                    })
                    .catch((error) => console.log(error));
                }
        },
        computed: {
            filterTable() {
                this.filterDataTable=this.localisations.filter(
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
    