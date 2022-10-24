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
        async login({ email, password }) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/login/",
                    {
                        email: email,
                        password: password,
                    }
                );
                if (response.data.error === undefined) {
                    this.user = response.data.data;
                    this.isLogged = response.data.data ? true : false;
                    this.isAdmin = response.data.data.is_admin;
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data)
                    );
                } else {
                    alert(response.data.error);
                }
            } catch (error) {}
        },
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
