import { useState } from "react";
import { router } from "@inertiajs/react";

export default function SearchBar({
    placeholder = "Search recipes",
    route: searchRoute,
    initialQuery = "",
}) {
    const [query, setQuery] = useState(initialQuery);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.get(searchRoute, { q: query });
        }
    };

    const handleClear = () => {
        setQuery("");
        router.get(searchRoute);
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full">
            <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-magical-pink text-base sm:text-lg">
                    🔍
                </div>

                {/* Input */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-8 sm:pl-10 pr-16 sm:pr-20 py-2 sm:py-3 border-2 border-magical-pink rounded-lg focus:border-magical-dark focus:ring-0 font-pixel text-[10px] sm:text-xs transition-colors"
                />

                {/* Clear Button */}
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm sm:text-base transition-colors"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}

                {/* Search Button */}
                <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-magical-pink text-white font-pixel text-[8px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-magical-dark transition-colors"
                >
                    <span className="hidden sm:inline">SEARCH</span>
                    <span className="sm:hidden">GO</span>
                </button>
            </div>
        </form>
    );
}
