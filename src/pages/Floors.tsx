import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

interface Floor {
    floor_id: number;
    floor_name: string;
}

export default function Floors() {
    const { restaurant_id } = useParams();
    const [floors, setFloors] = useState<Floor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get(`/floor/restaurant/${restaurant_id}`)
            .then((response) => {
                setFloors(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке этажей:", error);
            });
    }, [restaurant_id]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Выберите этаж</h1>
            <button
                onClick={() => navigate("/restaurants")}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Назад к ресторанам
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {floors.map((floor) => (
                    <div key={floor.floor_id} className="border p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">Этаж {floor.floor_name}</h2>
                        <button
                            onClick={() => navigate(`/restaurant/${restaurant_id}/floor/${floor.floor_id}/booking`)}
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                            Забронировать
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
