<template>
    <div class="wrapper">
        <img v-bind:src="game.image" />
        <div class="gameCard">
            <h2>
                {{ game.name }}
            </h2>
            <p>
                {{ game.description }}
            </p>
            <p>{{ game.players }} players {{ game.time }}</p>
        </div>
    </div>
    <button v-on:click="boom"></button>
</template>

<script>
export default {
    props: {
        game: {
            type: Object,
            default: () => ({}),
        },
    },
    mounted() {},
    methods: {
        boom() {
            this.game.description = "lol";
            console.log(this.game);
        },
    },
    // data() {
    //     return {
    //         game: this.game,
    //     };
    // },
};
</script>
<style scoped>
button {
    background-color: red;
    width: 100px;
    height: 10px;
}
img {
    width: 15vw;
    border-radius: 10px;
}
.gameCard {
    width: 65vw;
    display: flex;
    flex-direction: column;
    margin-left: 2%;
}
.wrapper {
    width: 80vw;
    display: flex;
    flex-direction: row;
    border: 2px;
    border-style: solid;
    border-color: white;
    border-radius: 10px;
}
</style>
