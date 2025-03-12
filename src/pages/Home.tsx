import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="p-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Добро пожаловать в сервис бронирования!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Выберите ресторан, этаж и столик для комфортного отдыха.
            </p>

            <div className="flex flex-col gap-4 max-w-md mx-auto">
                <button
                    onClick={() => navigate("/restaurants")}
                    className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    Список ресторанов
                </button>
                <button
                    onClick={() => navigate("/profile")}
                    className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    Личный кабинет
                </button>
                <button
                    onClick={() => navigate("/about")}
                    className="px-6 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
                >
                    О нас
                </button>
            </div>
        </div>
    );
}
