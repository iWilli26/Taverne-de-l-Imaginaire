import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { axiosPublic } from "../auth";
export const useGamesStore = defineStore({
    id: "games",
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        games: [],
    }),
    actions: {
        async fetchGames() {
            try {
                const response = await axiosPublic.get(
                    "/games/"
                );

                this.games = response.data.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
});
