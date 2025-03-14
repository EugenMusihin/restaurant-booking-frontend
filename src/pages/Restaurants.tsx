import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngBounds, LatLngExpression } from "leaflet";
import API from "../api";
import "leaflet/dist/leaflet.css";

// Интерфейс ресторана
interface Restaurant {
    restaurant_id: number;
    restaurant_name: string;
    restaurant_address: string;
    restaurant_phone: string;
    restaurant_created_date: string;
    latitude: number;
    longitude: number;
}

// 📍 Иконка маркера (Leaflet не загружает стандартные)
const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// 📌 Компонент для центрирования карты
function MapAutoFit({ restaurants }: { restaurants: Restaurant[] }) {
    const map = useMap();

    useEffect(() => {
        if (restaurants.length > 0) {
            const bounds = new LatLngBounds(
                restaurants.map(({ latitude, longitude }) => [latitude, longitude] as LatLngExpression)
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [restaurants, map]);

    return null;
}

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const navigate = useNavigate();
    const mapRef = useRef<never>(null);

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 🏠 Список ресторанов */}
                <div className="space-y-4">
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

                {/* 🗺️ Карта с ресторанами */}
                <div className="border p-4 rounded-lg shadow-lg mb-6">
                    <MapContainer
                        center={[55.7558, 37.6173]} // Начальный центр (Москва)
                        zoom={10}
                        style={{ height: "400px", width: "100%" }}
                        ref={mapRef}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapAutoFit restaurants={restaurants} />
                        {restaurants.map((restaurant) =>
                            restaurant.latitude && restaurant.longitude ? (
                                <Marker
                                    key={restaurant.restaurant_id}
                                    position={[restaurant.latitude, restaurant.longitude] as LatLngExpression}
                                    icon={customIcon}
                                >
                                    <Popup>
                                        <strong>{restaurant.restaurant_name}</strong> <br />
                                        📍 {restaurant.restaurant_address}
                                    </Popup>
                                </Marker>
                            ) : null
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
