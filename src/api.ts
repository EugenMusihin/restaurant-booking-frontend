import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",  // Базовый URL бекенда
    withCredentials: true,  // Если используется авторизация с cookies
});
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


