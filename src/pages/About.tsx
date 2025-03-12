import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">О нашем сервисе</h1>
            <p className="text-lg text-gray-700 mb-4">
                Добро пожаловать в наш сервис бронирования столиков! Мы помогаем вам находить лучшие рестораны, выбирать удобные места и легко бронировать столики онлайн.
            </p>

            <h2 className="text-2xl font-semibold mb-2">Наши возможности</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Выбор ресторана по вашему вкусу</li>
                <li>Просмотр доступных этажей и столиков</li>
                <li>Удобное и быстрое бронирование</li>
                <li>Отслеживание своих броней в личном кабинете</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-2">Почему мы?</h2>
            <p className="text-gray-700 mb-4">
                Наш сервис позволяет вам экономить время и быть уверенными в том, что ваш столик будет ждать вас в выбранном ресторане.
                Простота, удобство и надежность – вот наши главные приоритеты!
            </p>

            <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Вернуться на главную
            </button>
        </div>
    );
}
