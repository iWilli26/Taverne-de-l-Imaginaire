import axios from "axios";

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const axiosPublic = axios.create({
    baseURL: "http://localhost:8080",
});
axiosPrivate.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);
