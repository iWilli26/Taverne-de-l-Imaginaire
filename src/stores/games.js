import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useGamesStore = defineStore({
    id: "games",
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        games: [],
    }),
    actions: {
        async fetchGames() {
            try {
                const response = await axios.get(
                    "http://localhost:8080/games/"
                );
                this.games = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
});
