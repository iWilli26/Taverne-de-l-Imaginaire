<template>
    <nav>
        <img
            @click="$router.push({ path: '/' })"
            id="logo"
            src="../assets/dragon.jpg"
            alt="my-logo"
        />
        <div @click="$router.push({ path: '/' })" class="menu-item">Home</div>
        <div @click="$router.push({ path: '/catalogue' })" class="menu-item">
            Catalogue
        </div>
        <div @click="$router.push({ path: '/contact' })" class="menu-item">
            Contact
        </div>
        <Dropdown title="Profile" :items="profiles" />
    </nav>
</template>

<script>
import router from "@/router";
import Dropdown from "./Dropdown.vue";
import logo from "@/assets/logo.svg";
export default {
    name: "navbar",
    components: {
        Dropdown,
    },
    setup() {
        return {
            logo,
        };
    },
    data() {
        return {
            profiles: [
                {
                    title: "Login",
                    link: "/",
                },
                {
                    title: "Mon Profil",
                    link: "/about",
                },
                {
                    title: "Logout",
                    link: "/contact",
                },
            ],
        };
    },
    methods: {},
};
</script>

<style scoped>
#logo {
    width: 75px;
    margin-right: auto;
    cursor: pointer;
}
nav {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
nav .menu-item {
    color: #000;
    /* height: 100%; */
    padding: 25px 15px;
    position: relative;
    text-align: center;
    border-bottom: 3px solid transparent;
    display: flex;
    transition: 0.4s;
}
nav .menu-item.active,
nav .menu-item:hover {
    cursor: pointer;
    background-color: #f1f1f1;
    border-bottom-color: #ff5858;
}
nav .menu-item a {
    color: inherit;
    text-decoration: none;
}
</style>
