import { useState } from "react";
import API from "../api";
import styles from "../styles/RegisterForm.module.css";// Подключаем стили

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают!");
            return;
        }

        try {
            const response = await API.post("/auth/register", formData);
            console.log("Регистрация успешна:", response.data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ошибка регистрации");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" name="name" placeholder="Имя" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Телефон" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Повторите пароль" onChange={handleChange} required />
            {error && <p>{error}</p>}
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default RegisterForm;
