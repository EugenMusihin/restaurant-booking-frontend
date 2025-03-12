import { useEffect, useState } from "react";
import API from "../api";

interface Booking {
    booking_id: number;
    booking_date: string;
    booking_start_hours: number;
    booking_end_hours: number;
    table_id: number;
    user_id: number;
    booking_status_id: number;
}

const statusLabels: Record<number, string> = {
    1: "Ожидает подтверждения",
    2: "Оплачено",
    3: "Не оплачено",
};

export default function AdminPanel() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await API.get("/admin/booking/list");
                setBookings(response.data);
            } catch (err) {
                setError("Ошибка загрузки бронирований");
            }
        };

        fetchBookings();
    }, []);

    const updateStatus = async (booking_id: number, newStatus: number) => {
        try {
            await API.put(`/admin/booking/update-status/${booking_id}`, { booking_status_id: newStatus });
            setBookings((prev) => prev.map((b) => (b.booking_id === booking_id ? { ...b, booking_status_id: newStatus } : b)));
        } catch (err) {
            setError("Ошибка обновления статуса");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Административная панель</h1>
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Дата</th>
                    <th className="border p-2">Начало</th>
                    <th className="border p-2">Конец</th>
                    <th className="border p-2">Стол</th>
                    <th className="border p-2">Статус</th>
                    <th className="border p-2">Действие</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.booking_id} className="border">
                        <td className="border p-2">{booking.booking_date}</td>
                        <td className="border p-2">{booking.booking_start_hours}:00</td>
                        <td className="border p-2">{booking.booking_end_hours}:00</td>
                        <td className="border p-2">{booking.table_id}</td>
                        <td className="border p-2">{statusLabels[booking.booking_status_id]}</td>
                        <td className="border p-2">
                            <select
                                value={booking.booking_status_id}
                                onChange={(e) => updateStatus(booking.booking_id, Number(e.target.value))}
                                className="border p-1"
                            >
                                {Object.entries(statusLabels).map(([id, label]) => (
                                    <option key={id} value={id}>{label}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
