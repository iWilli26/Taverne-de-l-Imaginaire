<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";
import { axiosPublic } from "../auth";
import { useGamesStore } from "../stores/games";
</script>
<template>
    <h1>{{ game.name }}</h1>
    <div class="details">
        <div class="tags">
            Tags :&nbsp;
            <div class="tag" v-for="tag in tags" :key="tag.id">
                {{ tag.name }}
            </div>
        </div>
        <div class="description">
            Description :
            {{ game.description }}
        </div>
        <div class="info">
            <p>{{ game.number_of_player }} <br />{{ game.average_time }}</p>
        </div>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            game: {},
            tags: [],
        };
    },
    mounted() {
        const id = this.$route.query.id;
        axiosPublic.get(`/games/${id}`).then((res) => {
            this.game = res.data.data[0];
        });
        axiosPublic.get(`/tag/${id}`).then((res) => {
            this.tags = res.data.data;
            console.log(res.data.data);
        });
    },
};
</script>
<style scoped>
.tags {
    display: flex;
    flex-direction: row;
}
.tag {
    margin-right: 1rem;
}
</style>
