<script setup>
import { useUserStore } from "../stores/user.js";
</script>

<template>
    <div
        class="menu-item"
        @click="isOpen = !isOpen"
        v-bind:class="{ active: isOpen }"
    >
        <div class="button">
            Profile
            <svg viewBox="0 0 1030 638" width="10">
                <path
                    d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
                    fill="#000"
                ></path>
            </svg>
        </div>

        <div class="sub-menu" v-if="isOpen">
            <div
                v-if="!useUserStore().isLogged"
                @click="$router.push({ path: '/account/register' })"
                class="sub-menu-item menu-item"
            >
                Register
            </div>
            <div
                v-if="!useUserStore().isLogged"
                @click="$router.push({ path: '/account/login' })"
                class="sub-menu-item menu-item"
            >
                Login
            </div>
            <div
                v-if="useUserStore().isLogged"
                @click="$router.push({ path: '/account/' })"
                class="sub-menu-item menu-item"
            >
                Mon Profil
            </div>
            <div
                v-if="useUserStore().isLogged"
                @click="logout"
                class="sub-menu-item menu-item"
            >
                Logout
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "dropdown",
    setup() {
        // const userStore = useUserStore();
        // return {
        //     isLogged: userStore.isLogged,
        //     logout: userStore.logout,
        // };
    },
    data() {
        return {
            isOpen: false,
        };
    },
};
</script>

<style>
.active {
    background-color: #f5f5f5;
}
.menu-item svg {
    position: relative;
    width: 10px;
    margin-left: 5px;
}
.menu-item .sub-menu {
    position: absolute;
    background-color: #f5f5f5;
    top: 73px;
    left: 0;
    width: 100%;
}
.menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    cursor: pointer;
    z-index: 10;
}
.menu-item:hover {
    cursor: pointer;
    background-color: #dcdcdc;
}
</style>
