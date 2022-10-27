<template>
    <div>
        <div class="content">
            <div class="games">
                <GameCard
                    v-for="game in state.games.data"
                    :key="game.game_id"
                    :game="game"
                    @click="$router.push(`/game?id=${game.game_id}`)"
                />
            </div>
        </div>
    </div>
</template>
<script>
import GameCard from "./GameCard.vue";
import { useGamesStore } from "../stores/games.js";
export default {
    components: {
        GameCard,
    },
    setup() {
        const state = useGamesStore();
        state.fetchGames();
        return { state };
    },
};
</script>
