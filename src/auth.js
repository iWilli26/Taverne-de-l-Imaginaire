import axios from "axios";
export const axiosPrivate = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
});

export const axiosPublic = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
});