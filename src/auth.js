import axios from "axios";
import * as conf from "../conf_front.json"
export const axiosPrivate = axios.create({
    baseURL: conf.Back.address + ":" + conf.Back.port,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const axiosPublic = axios.create({
    baseURL: conf.Back.address + ":" + conf.Back.port,
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
