<template>
 {{state}}

</template>


<script>
export default {
    name: "GamesTable",
    components: {
    },
    setup() {
        const state = useGamesStore();
        state.fetchGames();
        return { state };
    },
    data() {
        return {};
    },
    methods: {},
};
</script>