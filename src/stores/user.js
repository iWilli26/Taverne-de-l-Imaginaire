import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem("user")),
        returnUrl: null,
        isLogged: JSON.parse(localStorage.getItem("user")) ? true : false,
        isAdmin: JSON.parse(localStorage.getItem("user"))
            ? JSON.parse(localStorage.getItem("user")).is_admin
            : false,
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
                    $router.push({ path: "/" });
                } else {
                    alert(response.data.error);
                }
            } catch (error) {}
        },
        logout() {
            this.user = null;
            this.isLogged = false;
            this.isAdmin = false;
            localStorage.removeItem("user");
        },
    },
});
