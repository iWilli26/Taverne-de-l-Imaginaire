<script setup>
import { useUserStore } from "../stores/user.js";
</script>

<template>
    <main>
        <div class="form">
            <el-form :model="form" label-width="120px">
                <el-form-item label="Email">
                    <el-input
                        @keyup.enter="onSubmit"
                        class="input"
                        v-model="form.email"
                    />
                </el-form-item>
                <el-form-item label="Password">
                    <el-input
                        class="input"
                        type="password"
                        @keyup.enter="onSubmit"
                        v-model="form.password"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()"
                        >Login</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>

<script>
import { reactive } from "vue";

const form = reactive({
    email: "",
    password: "",
});
const ValidateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
        return true;
    }
    return false;
};

export default {
    name: "Login",
    setup() {},
    components: {},
    data() {
        return {};
    },
    methods: {
        redirect() {
            this.$router.push("/");
        },
        onSubmit() {
            if (form.email === "" || form.password === "") {
                alert("Please fill all the fields");
            } else if (ValidateEmail() === false) {
                alert("Please enter a valid email address");
            } else {
                useUserStore().login({
                    email: form.email,
                    password: form.password,
                });
            }
        },
    },
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
