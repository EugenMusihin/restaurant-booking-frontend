import axios from "axios";
// import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",  // Базовый URL бекенда
    withCredentials: true,  // Если используется авторизация с cookies
});

// API.interceptors.request.use(config => {
//     const token = Cookies.get('access_token'); // Get token from cookies
//     console.log(token);
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//
//     return config;
// }, error => Promise.reject(error));



export async function getUserProfile() {
    try {
        const response = await API.get("/user/me");
        return response.data;
    } catch (error) {
        console.error("Ошибка получения профиля:", error);
        return null;
    }
}

export default API;


