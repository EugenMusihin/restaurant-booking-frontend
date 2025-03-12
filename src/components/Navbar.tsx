import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/register">Регистрация</Link></li>
                <li><Link to="/login">Вход</Link></li>
                <li><Link to="/booking">Бронирование</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
