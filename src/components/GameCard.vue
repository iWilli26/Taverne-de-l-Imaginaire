<template>
    <div class="gameCard">
        <img v-bind:src="game.image" />
        <div class="description">
            <div class="test">
                <div class="title">
                    <h2>
                        {{ game.name }}
                    </h2>
                    {{ game.description }}
                </div>
                <div v-if="avis.note !== undefined" class="avis">
                    {{ avis.note }}
                    <Star :width="width" />
                </div>
            </div>
            <div class="info">
                <p>{{ game.players }} players {{ game.time }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Star from "@/components/icons/IconStar.vue";
export default {
    components: {
        Star,
    },
    props: {
        width: {
            type: [Number, String],
            default: 20,
        },
        game: {
            type: Object,
            default: () => ({}),
        },
        avis: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
<style scoped>
.test {
    display: flex;
    justify-content: space-between;
    white-space: pre-line;
}
.avis {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.info {
    margin-top: auto;
}
img {
    width: 10vw;
    height: auto;
    margin: auto;
    border-radius: 10px;
}
.description {
    width: 65vw;
    display: flex;
    flex-direction: column;
    margin-left: 2%;
}
.gameCard {
    margin: 2%;
    width: 80vw;
    display: flex;
    flex-direction: row;
    border: 2px;
    border-style: solid;
    border-color: white;
    border-radius: 10px;
}
</style>
