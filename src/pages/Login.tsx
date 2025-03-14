import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api";
import LoginForm from "../components/LoginForm.tsx";

interface User {
    user_id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_created_date: string;
}

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserProfile().then((data) => {
            if (data) {
                setUser(data);
            } else {
                navigate("/login");
            }
        });
    }, [navigate]);

    if (!user) {
        return <LoginForm />;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Личный кабинет</h1>
            <button
                onClick={() => navigate("/")}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Назад на главную
            </button>
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

