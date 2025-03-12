import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [query, setQuery] = useState("");

    return (
        <div>
            <input
                type="text"
                placeholder="Введите название ресторана..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => onSearch(query)}>🔍 Поиск</button>
        </div>
    );
};

export default SearchBar;
