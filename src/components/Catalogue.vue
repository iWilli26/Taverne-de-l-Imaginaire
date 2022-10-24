<template>
    <div>
        <div class="content">
            <div class="title">
                <!-- {{ state.games }} -->
            </div>
            <div class="games">
                <GameCard
                    v-for="game in state.games"
                    :key="game.game_id"
                    :game="{
                        name: game.name,
                        description: game.description,
                        time: game.average_time,
                        players: game.number_of_player,
                    }"
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
