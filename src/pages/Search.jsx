import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../store/slices/weatherSlice';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import Layout from '../components/layout/Layout';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const { selectedCity, loading, error } = useSelector((state) => state.weather);
    const favorites = useSelector((state) => state.favorites);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            dispatch(fetchWeather(query));
        }
    };

    const isFavorite = (city) => favorites.some(fav => fav.id === city.id);

    const handleToggleFavorite = (city) => {
        if (isFavorite(city)) {
            dispatch(removeFavorite(city.id));
        } else {
            dispatch(addFavorite(city));
        }
    };

    return (
        <Layout>
            <div className="relative flex h-full w-full flex-col group/design-root overflow-hidden">
                <div className="flex-1 flex flex-col">
                    {/* Top App Bar */}
                    <div className="flex items-center p-4 pb-4 bg-background-light dark:bg-background-dark">
                        <h1 className="text-black dark:text-text-dark text-2xl font-bold tracking-tight flex-1">Szukaj miasta</h1>
                    </div>

                    {/* Search Bar */}
                    <div className="px-4 py-3">
                        <div className="relative flex items-center">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="flex w-full h-14 min-w-0 flex-1 resize-none overflow-hidden text-black dark:text-text-dark focus:outline-none focus:ring-0 border-2 border-black bg-background-light dark:bg-background-dark placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 pl-12 text-lg font-normal neobrutalist-shadow neobrutalist-border"
                                placeholder="Wpisz nazwę miasta..."
                            />
                            <div className="text-black dark:text-text-dark absolute left-4 flex items-center justify-center">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                        </div>
                    </div>

                    {/* Result List */}
                    <div className="flex flex-1 flex-col overflow-y-auto px-4 gap-4 py-4">
                        {loading && <p className="text-center">Szukam...</p>}
                        {error && <p className="text-center text-red-500">{error}</p>}

                        {selectedCity && !loading && (
                            <div className="flex items-center gap-4 bg-background-light dark:bg-background-dark p-4 neobrutalist-border neobrutalist-shadow transition-all">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="text-black dark:text-text-dark flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-3xl">location_city</span>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-black dark:text-text-dark text-lg font-bold leading-normal line-clamp-1">{selectedCity.name}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal line-clamp-2">{selectedCity.sys?.country || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <button
                                        onClick={() => handleToggleFavorite(selectedCity)}
                                        className={`text-black dark:text-text-dark flex size-10 items-center justify-center ${isFavorite(selectedCity) ? 'text-neobrutal-accent dark:text-neobrutal-accent' : ''}`}
                                    >
                                        <span className={`material-symbols-outlined ${isFavorite(selectedCity) ? 'material-symbols-bold text-yellow-500' : ''}`}>star</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {!selectedCity && !loading && (
                            <div className="flex flex-1 flex-col items-center justify-center text-center p-8 opacity-50">
                                <span className="material-symbols-outlined text-6xl mb-4">travel_explore</span>
                                <p className="text-lg">Wpisz nazwę i naciśnij Enter</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
