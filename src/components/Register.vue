<script setup>
import GameCard from "../components/GameCard.vue";
import axios from "axios";
import { useUserStore } from "../stores/user";
import { reactive } from "vue";
</script>

<template>
    <main>
        <div class="form">
            <el-form :model="form" label-width="120px">
                <el-form-item label="Last Name">
                    <el-input class="input" v-model="form.name" />
                </el-form-item>
                <el-form-item label="First Name">
                    <el-input class="input" v-model="form.fname" />
                </el-form-item>
                <el-form-item label="Username">
                    <el-input class="input" v-model="form.username" />
                </el-form-item>
                <el-form-item label="Email">
                    <el-input class="input" v-model="form.email" />
                </el-form-item>
                <el-form-item label="Password">
                    <el-input
                        class="input"
                        type="password"
                        v-model="form.password"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit"
                        >Signup</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>

<script>
// do not use same name with ref
const form = reactive({
    name: "",
    fname: "",
    username: "",
    email: "",
    password: "",
});
const ValidateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
        return true;
    }
    return false;
};
const onSubmit = () => {
    if (
        form.name === "" ||
        form.fname === "" ||
        form.email === "" ||
        form.password === "" ||
        form.username === ""
    ) {
        alert("Please fill all the fields");
    } else if (ValidateEmail() === false) {
        alert("Please enter a valid email address");
    } else {
        axios
            .post("http://localhost:8080/signup/", {
                firstName: form.fname,
                lastName: form.name,
                username: form.username,
                email: form.email,
                password: form.password,
            })
            .then(function (response) {
                if (response.data.error !== undefined) {
                    alert(response.data.error);
                } else {
                    alert("User created");
                    useUserStore().login({
                        email: form.email,
                        password: form.password,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        setTimeout(() => {
            if (useUserStore().isLogged) {
                window.location.href = "/";
            }
        }, 1000);
    }
};
export default {
    name: "Register",
    mounted() {
        if (useUserStore().isLogged) {
            this.$router.push({ path: "/" });
        }
    },
};
</script>

<style scoped>
.input {
    width: 50vw;
}
.form {
    margin-top: 20px;
}
html,
body {
    margin: 0px !important;
    padding: 0px !important;
}
#app {
    padding: 0px !important;
    margin: 0px !important;
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
