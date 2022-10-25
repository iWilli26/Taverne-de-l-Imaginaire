<template>
    <el-container class="container">
        <el-aside>
            <el-menu
                active-text-color="#B11100"
                background-color="#282828"
                text-color="#f8f8f8"
                default-active="3"
                class="el-menu-vertical-admin"
            >
                <el-menu-item @click="$router.push({ path: '/admin', query: { type: 'users' } })" index="2">
                    <span>USERS</span>
                </el-menu-item>

                <el-menu-item @click="$router.push({ path: '/admin', query: { type: 'games' }})" index="3">
                    <span>GAMES</span>
                </el-menu-item>

                <el-menu-item @click="$router.push({ path: '/admin', query: { test: 'copy' }})" index="4">
                    <span>COPY</span>
                </el-menu-item>

            </el-menu>
        </el-aside>
    </el-container>
    
</template>

<script>
export default {
    name: "NavbarAdmin",
    components: {
    },
    setup() {
        return {
        };
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped>
.container{
    height: 100vh;
    width:100%;
    background-color: none;
}
.container .el-aside{
    height: 100%;
    width:15%;
}
.container .el-menu{
    height: 100%;
    background-color: none;
    border : 0px;
}

</style>