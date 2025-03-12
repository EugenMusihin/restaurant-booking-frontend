import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

interface Table {
    table_id: number;
    table_number: string;
    table_capacity: number;
    floor_id: number;
}

interface BookingData {
    booking_date: string;
    booking_start_hours: number;
    booking_end_hours: number;
    booking_start_minutes: number;
    booking_end_minutes: number;
    table_id: number;
    user_id: number;
    booking_status_id: number;
    booking_created_date: string;
    floor_id: number;
}

const BookingForm = () => {
    const { floor_id } = useParams();
    const [formData, setFormData] = useState<BookingData>({
        booking_date: "",
        booking_start_hours: 0,
        booking_end_hours: 0,
        booking_start_minutes: 0,
        booking_end_minutes: 0,
        table_id: 0,
        user_id: 2,
        booking_status_id: 1,
        booking_created_date: new Date().toISOString().split("T")[0],
        floor_id: Number(floor_id),
    });

    const [tables, setTables] = useState<Table[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!formData.booking_date) return;

        const fetchTables = async () => {
            try {
                const response = await API.get(`/table/floor/${floor_id}`, {
                    params: {
                        booking_date: formData.booking_date,
                        booking_start_hours: formData.booking_start_hours,
                        booking_start_minutes: formData.booking_start_minutes,
                        booking_end_hours: formData.booking_end_hours,
                        booking_end_minutes: formData.booking_end_minutes,
                    },
                });
                setTables(response.data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Ошибка загрузки столов");
            }
        };

        fetchTables();
    }, [floor_id, formData.booking_date, formData.booking_start_hours, formData.booking_start_minutes, formData.booking_end_hours, formData.booking_end_minutes]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await API.post("/booking/post", formData);
            alert("Бронирование успешно создано");
        } catch (err) {
            setError("Ошибка при бронировании стола");
        }
    };

    return (
        <div>
            <h2>Бронирование стола</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input type="date" name="booking_date" onChange={handleChange} required />
                <input type="number" name="booking_start_hours" placeholder="Часы начала" onChange={handleChange} required />
                <input type="number" name="booking_start_minutes" placeholder="Минуты начала" onChange={handleChange} required />
                <input type="number" name="booking_end_hours" placeholder="Часы конца" onChange={handleChange} required />
                <input type="number" name="booking_end_minutes" placeholder="Минуты конца" onChange={handleChange} required />
                <select name="table_id" onChange={handleChange} required>
                    <option value="">Выберите стол</option>
                    {tables.map((table) => (
                        <option key={table.table_id} value={table.table_id}>
                            {table.table_number} (вместимость: {table.table_capacity})
                        </option>
                    ))}
                </select>
                <button type="submit">Забронировать</button>
            </form>
        </div>
    );
};

export default BookingForm;
