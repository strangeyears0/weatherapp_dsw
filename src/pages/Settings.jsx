import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/slices/favoritesSlice';
import { toggleUnit, setTheme } from '../store/slices/settingsSlice';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const Settings = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const { unit, theme } = useSelector((state) => state.settings);

    // Theme Side Effect (ensure it runs here too in case user lands directly or reloads)
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <Layout>
            <div className="relative flex h-auto w-full flex-col p-4">
                {/* Header */}
                <header className="sticky top-0 z-10 border-b-2 border-black bg-background-light dark:border-white dark:bg-background-dark p-4 flex items-center justify-between mb-6">
                    <div className="size-10"></div>
                    <h1 className="flex-1 text-center text-2xl font-bold uppercase text-black dark:text-white">Ustawienia</h1>
                    <div className="size-10"></div>
                </header>

                {/* Temperature Units Section */}
                <section className="mb-8">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-black dark:text-white">Temperatura</h2>
                    <div className="flex h-12 w-full items-center justify-center rounded neobrutalist-border bg-background-light dark:bg-background-dark p-1 neobrutalist-shadow">
                        <label
                            className={`flex h-full flex-1 cursor-pointer items-center justify-center rounded transition-colors ${unit === 'metric' ? 'bg-primary text-white' : 'text-black dark:text-white'}`}
                            onClick={() => unit !== 'metric' && dispatch(toggleUnit())}
                        >
                            <input checked={unit === 'metric'} readOnly className="sr-only" name="temperature" type="radio" value="celsius" />
                            <span className="text-lg font-bold">°C</span>
                        </label>
                        <label
                            className={`flex h-full flex-1 cursor-pointer items-center justify-center rounded transition-colors ${unit === 'imperial' ? 'bg-primary text-white' : 'text-black dark:text-white'}`}
                            onClick={() => unit !== 'imperial' && dispatch(toggleUnit())}
                        >
                            <input checked={unit === 'imperial'} readOnly className="sr-only" name="temperature" type="radio" value="fahrenheit" />
                            <span className="text-lg font-bold">°F</span>
                        </label>
                    </div>
                </section>

                {/* Theme Section */}
                <section className="mb-8">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-black dark:text-white">Motyw</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label
                            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded p-4 text-center neobrutalist-border neobrutalist-shadow bg-background-light dark:bg-background-dark text-black dark:text-white ${theme === 'light' ? 'bg-primary text-white border-primary' : ''}`}
                            onClick={() => dispatch(setTheme('light'))}
                        >
                            <input
                                checked={theme === 'light'}
                                readOnly
                                className="sr-only" name="theme" type="radio" value="light"
                            />
                            <span className="material-symbols-outlined text-3xl">light_mode</span>
                            <span className="font-bold">Jasny</span>
                        </label>
                        <label
                            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded p-4 text-center neobrutalist-border neobrutalist-shadow bg-background-light dark:bg-background-dark text-black dark:text-white ${theme === 'dark' ? 'bg-primary text-white border-primary' : ''}`}
                            onClick={() => dispatch(setTheme('dark'))}
                        >
                            <input
                                checked={theme === 'dark'}
                                readOnly
                                className="sr-only" name="theme" type="radio" value="dark"
                            />
                            <span className="material-symbols-outlined text-3xl">dark_mode</span>
                            <span className="font-bold">Ciemny</span>
                        </label>
                    </div>
                </section>

                {/* Favorite Cities Section */}
                <section>
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-black dark:text-white">Ulubione Miasta</h2>
                    <div className="space-y-4">
                        {favorites.map(city => (
                            <div key={city.id} className="flex items-center justify-between rounded p-4 neobrutalist-border neobrutalist-shadow bg-background-light dark:bg-background-dark">
                                <span className="text-lg font-bold text-black dark:text-white">{city.name}</span>
                                <button
                                    onClick={() => dispatch(removeFavorite(city.id))}
                                    className="flex size-8 items-center justify-center rounded neobrutalist-border bg-background-light dark:bg-background-dark text-black dark:text-white hover:bg-red-500 hover:text-white dark:hover:border-red-500 hover:shadow-none transition-all"
                                >
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        ))}

                        {favorites.length === 0 && <p className="text-center opacity-50">Brak ulubionych miast</p>}

                        {/* Add City Button */}
                        <Link to="/search" className="flex w-full items-center justify-center gap-2 rounded p-4 neobrutalist-border neobrutalist-shadow bg-primary text-white hover:bg-blue-700 active:translate-x-1 active:translate-y-1 active:shadow-none dark:active:shadow-none transition-all">
                            <span className="material-symbols-outlined">add</span>
                            <span className="font-bold uppercase">Dodaj Nowe Miasto</span>
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Settings;
