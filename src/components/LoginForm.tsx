import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.ts";

const LoginForm = () => {
    const [formData, setFormData] = useState({ login: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // ✅ Добавляем useNavigate

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await API.post("/auth/login", {
                email_or_phone: formData.login,
                password: formData.password,
            });

            // const { access_token } = response.data;
            // localStorage.setItem("token", access_token);

            console.log("Успешный вход:", response.data);

            navigate("/"); // ✅ После успешного входа переходим на главную
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ошибка входа");
            }
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="login" placeholder="Телефон или Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Войти</button>
            </form>

            <p>Нет аккаунта? <button onClick={() => navigate("/register")} style={{ color: "blue", textDecoration: "underline" }}>Зарегистрироваться</button></p>
        </div>
    );
};

export default LoginForm;
