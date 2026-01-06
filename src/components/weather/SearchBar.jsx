import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 relative">
            <input
                type="text"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
