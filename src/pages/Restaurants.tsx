import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

interface Restaurant {
    restaurant_id: number;
    restaurant_name: string;
    restaurant_address: string;
    restaurant_phone: string;
    restaurant_created_date: string;
}

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/restaurant/get")
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке ресторанов:", error);
            });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Список ресторанов</h1>
            <button
                onClick={() => navigate("/")}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Назад на главную
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurants.map((restaurant) => (
                    <div
                        key={restaurant.restaurant_id}
                        className="border p-4 rounded-lg shadow-lg"
                    >
                        <h2 className="text-xl font-semibold">{restaurant.restaurant_name}</h2>
                        <p className="text-gray-600">{restaurant.restaurant_address}</p>
                        <p className="text-gray-800 font-medium">{restaurant.restaurant_phone}</p>
                        <p className="text-gray-500 text-sm">
                            Дата добавления: {new Date(restaurant.restaurant_created_date).toLocaleDateString()}
                        </p>
                        <button
                            onClick={() => navigate(`/restaurant/${restaurant.restaurant_id}/floors`)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                            Выбрать этаж
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}