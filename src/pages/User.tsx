import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import LoginForm from "../components/LoginForm.tsx";

interface User {
    user_id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_created_date: string;
    user_role_id: number; // Добавили роль пользователя
}

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('123')
                const response = await API.get("/auth/profile");
                console.log("Ответ от API:", response.data); // Проверяем, что приходит
                setUser(response.data);
            } catch {
                navigate("/login"); // Если не авторизован, отправляем на страницу логина
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await API.post("/auth/logout"); // Отправляем запрос на сервер
        } catch (err) {
            console.error("Ошибка при выходе:", err);
        } finally {
            console.log("logout");
            localStorage.clear(); // Полностью очищаем localStorage
            sessionStorage.clear(); // Очистка sessionStorage на случай использования
            navigate("/login", { replace: true }); // Перенаправляем на страницу входа
            window.location.reload(); // Полностью перезагружаем страницу для очистки состояния
        }
    };

    if (!user) {
        return <LoginForm />;
    }

    return (

        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Личный кабинет</h1>

            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Назад на главную
                </button>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Выйти
                </button>
            </div>

            <div className="border p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold">{user.user_name}</h2>
                <p className="text-gray-600">Email: {user.user_email}</p>
                <p className="text-gray-800">Телефон: {user.user_phone}</p>
                <p className="text-gray-500 text-sm">
                    Дата регистрации: {new Date(user.user_created_date).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
