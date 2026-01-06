import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { toggleUnit, setTheme } from '../store/slices/settingsSlice';

// Helper to convert C to F
const toF = (celsius) => (celsius * 9 / 5) + 32;

// Inline Neo-Brutal Card Component
const NeoCityCard = ({ city, weather, detailed, unit }) => {
    // Determine icon based on weather
    const icon = weather?.weather?.[0]?.main === 'Clear' ? 'sunny' :
        weather?.weather?.[0]?.main === 'Clouds' ? 'partly_cloudy_day' :
            weather?.weather?.[0]?.main === 'Rain' ? 'rainy' :
                weather?.weather?.[0]?.main === 'Thunderstorm' ? 'thunderstorm' :
                    weather?.weather?.[0]?.main === 'Snow' ? 'ac_unit' : 'cloud';

    const temp = unit === 'metric' ? Math.round(weather?.main?.temp || 0) : Math.round(toF(weather?.main?.temp || 0));
    const tempMax = unit === 'metric' ? Math.round(weather?.main?.temp_max || 0) : Math.round(toF(weather?.main?.temp_max || 0));
    const tempMin = unit === 'metric' ? Math.round(weather?.main?.temp_min || 0) : Math.round(toF(weather?.main?.temp_min || 0));
    const unitSymbol = unit === 'metric' ? '°C' : '°F';
    // Removed duplicate declaration

    return (
        <Link to={`/details/${city.name}`} className="block">
            <div className="flex flex-col gap-4 rounded border-2 border-neobrutal-border-light bg-card-light p-4 shadow-neobrutal-light dark:border-neobrutal-border-dark dark:bg-card-dark dark:shadow-neobrutal-dark transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                        <p className="text-2xl font-bold leading-tight">{city.name}</p>
                        <p className="text-sm font-normal leading-normal text-text-muted-light dark:text-text-muted-dark capitalized">
                            {weather?.weather?.[0]?.description || 'Brak danych'}
                        </p>
                    </div>
                    <p className="text-5xl font-bold leading-none">{temp}{unitSymbol}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className={`material-symbols-outlined !text-5xl text-neobrutal-accent`}>{icon}</span>
                    <p className="text-sm font-bold">
                        Max: {tempMax}{unitSymbol} Min: {tempMin}{unitSymbol}
                    </p>
                </div>

                {/* Detailed View Extras */}
                {detailed && (
                    <div className="mt-2 pt-4 border-t-2 border-dashed border-neobrutal-border-light dark:border-neobrutal-border-dark grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">air</span>
                            <span>{weather?.wind?.speed} m/s</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">humidity_percentage</span>
                            <span>{weather?.main?.humidity}%</span>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux State
    const { list, loading } = useSelector((state) => state.weather);
    const favorites = useSelector((state) => state.favorites);
    const { unit, theme } = useSelector((state) => state.settings);

    // Local UI State
    const [viewMode, setViewMode] = useState('Ogólny'); // 'Ogólny' | 'Szczegółowy'

    // Apply Theme Side Effect
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <Layout>
            <div className="p-4">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/search')}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded border-2 border-neobrutal-border-light bg-card-light p-0 shadow-neobrutal-light dark:border-neobrutal-border-dark dark:bg-card-dark dark:shadow-neobrutal-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                    >
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <h1 className="text-xl font-bold">Pogoda</h1>
                    <button
                        onClick={() => navigate('/settings')}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded border-2 border-neobrutal-border-light bg-card-light p-0 shadow-neobrutal-light dark:border-neobrutal-border-dark dark:bg-card-dark dark:shadow-neobrutal-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                    >
                        <span className="material-symbols-outlined">star</span>
                    </button>
                </header>

                {/* Toggles */}
                <div className="mb-6 flex flex-col gap-4">
                    {/* View Toggle */}
                    <div className="flex h-12 flex-1 items-center justify-center rounded border-2 border-neobrutal-border-light bg-card-dark p-1 dark:border-neobrutal-border-dark">
                        <button
                            onClick={() => setViewMode('Ogólny')}
                            className={`flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded text-sm font-bold transition-colors ${viewMode === 'Ogólny' ? 'bg-neobrutal-accent text-text-light' : 'text-white'}`}
                        >
                            Ogólny
                        </button>
                        <button
                            onClick={() => setViewMode('Szczegółowy')}
                            className={`flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded text-sm font-bold transition-colors ${viewMode === 'Szczegółowy' ? 'bg-neobrutal-accent text-text-light' : 'text-white'}`}
                        >
                            Szczegółowy
                        </button>
                    </div>

                    {/* Quick Settings Toggles */}
                    <div className="flex items-center justify-between gap-4">
                        {/* Unit Toggle */}
                        <div className="flex h-10 flex-1 items-center justify-center rounded border-2 border-neobrutal-border-light bg-card-dark p-1 dark:border-neobrutal-border-dark cursor-pointer" onClick={() => dispatch(toggleUnit())}>
                            <div className={`flex h-full grow items-center justify-center rounded text-sm font-bold px-2 transition-colors ${unit === 'metric' ? 'bg-neobrutal-accent text-text-light' : 'text-white'}`}>°C</div>
                            <div className={`flex h-full grow items-center justify-center text-sm font-bold px-2 transition-colors ${unit === 'imperial' ? 'bg-neobrutal-accent text-text-light' : 'text-white'}`}>°F</div>
                        </div>
                        {/* Theme Toggle */}
                        <div className="flex h-10 items-center justify-center rounded border-2 border-neobrutal-border-light bg-card-dark p-1 dark:border-neobrutal-border-dark">
                            <button
                                onClick={() => dispatch(setTheme('light'))}
                                className={`flex h-full items-center justify-center rounded px-2 transition-colors ${theme === 'light' ? 'bg-neobrutal-accent text-black' : 'text-white'}`}
                            >
                                <span className="material-symbols-outlined">light_mode</span>
                            </button>
                            <button
                                onClick={() => dispatch(setTheme('dark'))}
                                className={`flex h-full items-center justify-center rounded px-2 transition-colors ${theme === 'dark' ? 'bg-neobrutal-accent text-black' : 'text-white'}`}
                            >
                                <span className="material-symbols-outlined">dark_mode</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* City List */}
                <div className="flex flex-col gap-6">
                    {favorites.length > 0 && (
                        <>
                            <h2 className="font-bold text-lg mb-2">Ulubione</h2>
                            {favorites.map(city => (
                                <NeoCityCard
                                    key={city.id}
                                    city={city}
                                    weather={city}
                                    detailed={viewMode === 'Szczegółowy'}
                                    unit={unit}
                                />
                            ))}
                        </>
                    )}

                    {loading && <p className="text-center">Ładowanie...</p>}

                    {list.length > 0 && (
                        <>
                            {favorites.length > 0 && <h2 className="font-bold text-lg mb-2 mt-4">Polecane</h2>}
                            {!favorites.length && <h2 className="font-bold text-lg mb-2">Polecane Miasta</h2>}

                            {list.map(city => (
                                <NeoCityCard
                                    key={city.id}
                                    city={city}
                                    weather={city}
                                    detailed={viewMode === 'Szczegółowy'}
                                    unit={unit}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
