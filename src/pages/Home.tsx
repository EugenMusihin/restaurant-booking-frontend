import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

interface User {
    user_role_id: number;
}

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await API.get("/auth/profile");
                setUser(response.data);
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error);
            }
        };

        fetchUser();
    }, []);
    return (
        <div className="p-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Добро пожаловать в сервис бронирования!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Выберите ресторан, этаж и столик для комфортного отдыха.
            </p>

            <div className="flex flex-col gap-4 max-w-md mx-auto">
                {/* Кнопка "Личный кабинет" для всех пользователей */}
                <button
                    onClick={() => navigate("/profile")}
                    className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    Личный кабинет
                </button>
                {/* Для Обычного пользователя (user_role_id === 1) */}
                {user?.user_role_id === 1 && (
                    <>
                        <button
                            onClick={() => navigate("/restaurants")}
                            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                        >
                            Список ресторанов
                        </button>
                        <button
                            onClick={() => navigate("/about")}
                            className="px-6 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
                        >
                            О нас
                        </button>
                    </>
                )}
                {/* Для Администратора (user_role_id === 2) */}
                {user?.user_role_id === 2 && (
                    <button
                        onClick={() => navigate("/adminpanel")}
                        className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                        Панель администратора
                    </button>
                )}


            </div>
        </div>

    );
}
