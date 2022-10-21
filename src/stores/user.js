import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem("user")),
        returnUrl: null,
    }),
    actions: {
        login({ email, password }) {
            axios
                .post("http://localhost:8080/login/", {
                    email: email,
                    password: password,
                })
                .then(function (response) {
                    console.log(response.data.error);
                    if (response.data.error !== undefined) {
                        alert(response.data.error);
                    } else {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.data)
                        );
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        logout() {
            this.user = null;
            localStorage.removeItem("user");
            router.push("/account/login");
        },
    },
});
