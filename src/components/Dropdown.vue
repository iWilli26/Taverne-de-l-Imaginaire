<template>
    <div
        class="menu-item"
        @click="isOpen = !isOpen"
        v-bind:class="{ active: isOpen }"
    >
        <div class="button">
            {{ title }}
            <svg viewBox="0 0 1030 638" width="10">
                <path
                    d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
                    fill="#000"
                ></path>
            </svg>
        </div>

        <div class="sub-menu" v-if="isOpen">
            <div v-for="(item, i) in items" :key="i" class="menu-item">
                <div
                    @click="$router.push({ path: item.link })"
                    class="sub-menu-item"
                >
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "dropdown",
    props: ["title", "items"],
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
nav .menu-item svg {
    position: relative;
    width: 10px;
    margin-left: 5px;
}
nav .menu-item .sub-menu {
    position: absolute;
    background-color: #f5f5f5;
    top: 73px;
    left: 0;
    width: 100%;
    border-radius: 0px 0px 16px 16px;
}
.menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    cursor: pointer;
    z-index: 10;
}
</style>
