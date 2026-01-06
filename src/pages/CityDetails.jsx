import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchForecast, clearSelectedCity } from '../store/slices/weatherSlice';
import Layout from '../components/layout/Layout';

const CityDetails = () => {
    const { cityName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { unit } = useSelector((state) => state.settings);
    const { selectedCity, forecast, loading, error } = useSelector((state) => state.weather);

    // Helper to convert C to F
    const toF = (celsius) => (celsius * 9 / 5) + 32;

    const displayTemp = (temp) => unit === 'metric' ? Math.round(temp) : Math.round(toF(temp));
    const unitSymbol = unit === 'metric' ? '°C' : '°F';
    const unitSymbolShort = '°';

    useEffect(() => {
        if (cityName) {
            dispatch(fetchWeather(cityName));
            dispatch(fetchForecast(cityName));
        }
        return () => {
            dispatch(clearSelectedCity());
        }
    }, [dispatch, cityName]);

    if (loading && !selectedCity) return <Layout><p className="text-center mt-10">Ładowanie...</p></Layout>;
    if (error) return <Layout><p className="text-center mt-10 text-red-500">{error}</p></Layout>;
    if (!selectedCity) return null;

    // Helper for icons
    const getMainIcon = (weatherMain) => {
        switch (weatherMain) {
            case 'Clear': return 'sunny';
            case 'Clouds': return 'partly_cloudy_day';
            case 'Rain': return 'rainy';
            case 'Thunderstorm': return 'thunderstorm';
            case 'Snow': return 'ac_unit';
            default: return 'cloud';
        }
    };
    const mainIcon = getMainIcon(selectedCity.weather?.[0]?.main);

    return (
        <Layout>
            <div className="flex flex-col min-h-screen pb-24">
                {/* Top App Bar */}
                <header className="flex items-center p-4">
                    <button onClick={() => navigate(-1)} className="flex items-center justify-center size-12 cursor-pointer hover:bg-black/5 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-3xl">arrow_back</span>
                    </button>
                    <h1 className="flex-1 text-2xl font-bold text-center">{selectedCity.name}</h1>
                    <button className="flex items-center justify-center size-12">
                        <span className="material-symbols-outlined text-3xl">star</span>
                    </button>
                </header>

                <main className="flex-grow px-4 space-y-6">
                    {/* Current Weather Card */}
                    <section className="bg-card-light dark:bg-card-dark border-2 border-neobrutal-border-light dark:border-neobrutal-border-dark p-6 rounded shadow-neobrutal-light dark:shadow-neobrutal-dark flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-8xl text-primary">{mainIcon}</span>
                        <p className="text-7xl font-bold my-2">{displayTemp(selectedCity.main?.temp)}{unitSymbol}</p>
                        <p className="text-xl font-medium capitalized">{selectedCity.weather?.[0]?.description}</p>
                        <p className="text-base mt-2 opacity-80">
                            Odczuwalna: {displayTemp(selectedCity.main?.feels_like)}{unitSymbol},
                            Max: {displayTemp(selectedCity.main?.temp_max)}{unitSymbol},
                            Min: {displayTemp(selectedCity.main?.temp_min)}{unitSymbol}
                        </p>
                    </section>

                    {/* Detailed Info Grid */}
                    <section className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2 p-4 bg-card-light dark:bg-card-dark border-2 border-neobrutal-border-light dark:border-neobrutal-border-dark rounded shadow-neobrutal-light dark:shadow-neobrutal-dark">
                            <span className="material-symbols-outlined text-primary">air</span>
                            <p className="text-sm opacity-80">Wiatr</p>
                            <p className="text-lg font-bold">{Math.round(selectedCity.wind?.speed * 3.6)} km/h</p>
                        </div>
                        <div className="flex flex-col gap-2 p-4 bg-card-light dark:bg-card-dark border-2 border-neobrutal-border-light dark:border-neobrutal-border-dark rounded shadow-neobrutal-light dark:shadow-neobrutal-dark">
                            <span className="material-symbols-outlined text-primary">humidity_percentage</span>
                            <p className="text-sm opacity-80">Wilgotność</p>
                            <p className="text-lg font-bold">{selectedCity.main?.humidity}%</p>
                        </div>
                        <div className="flex flex-col gap-2 p-4 bg-card-light dark:bg-card-dark border-2 border-neobrutal-border-light dark:border-neobrutal-border-dark rounded shadow-neobrutal-light dark:shadow-neobrutal-dark">
                            <span className="material-symbols-outlined text-primary">compress</span>
                            <p className="text-sm opacity-80">Ciśnienie</p>
                            <p className="text-lg font-bold">{selectedCity.main?.pressure} hPa</p>
                        </div>
                        {/* We don't have UV Index in standard OpenWeatherMap free API usually, using Cloudiness as placeholder or mock text "Wysoki" as per design */}
                        <div className="flex flex-col gap-2 p-4 bg-card-light dark:bg-card-dark border-2 border-neobrutal-border-light dark:border-neobrutal-border-dark rounded shadow-neobrutal-light dark:shadow-neobrutal-dark">
                            <span className="material-symbols-outlined text-primary">wb_sunny</span>
                            <p className="text-sm opacity-80">Zachmurzenie</p>
                            <p className="text-lg font-bold">{selectedCity.clouds?.all}%</p>
                        </div>
                    </section>

                    {/* Hourly Forecast Section (Mocked logic from forecast list which is 3-hourly) */}
                    {forecast?.list && (
                        <section>
                            <h2 className="text-xl font-bold mb-3">PROGNOZA GODZINOWA</h2>
                            <div className="flex overflow-x-auto pb-4 gap-3 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {forecast.list.slice(0, 8).map((item, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center p-4 min-w-24 bg-card-light dark:bg-card-dark border-2 border-neobrutal-border-light dark:border-neobrutal-border-dark rounded shadow-neobrutal-light dark:shadow-neobrutal-dark">
                                        <p className="text-sm font-medium">{new Date(item.dt * 1000).getHours()}:00</p>
                                        <span className="material-symbols-outlined text-3xl my-2 text-primary">{getMainIcon(item.weather[0].main)}</span>
                                        <p className="text-lg font-bold">{displayTemp(item.main.temp)}{unitSymbolShort}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Daily Forecast Section (Mock logic: taking one entry per day) */}
                    {forecast?.list && (
                        <section>
                            <h2 className="text-xl font-bold mb-3">PROGNOZA 5-DNIOWA</h2>
                            <div className="space-y-3">
                                {forecast.list.filter((_, i) => i % 8 === 0).map((item, index) => (
                                    <div key={index} className="flex items-center p-3 bg-card-light dark:bg-card-dark border-2 border-neobrutal-border-light dark:border-neobrutal-border-dark rounded shadow-neobrutal-light dark:shadow-neobrutal-dark">
                                        <p className="font-bold flex-1">
                                            {new Date(item.dt * 1000).toLocaleDateString('pl-PL', { weekday: 'long' })}
                                        </p>
                                        <span className="material-symbols-outlined text-3xl mx-4 text-primary">{getMainIcon(item.weather[0].main)}</span>
                                        <p className="font-bold w-24 text-right">
                                            {displayTemp(item.main.temp_max)}{unitSymbolShort} / {displayTemp(item.main.temp_min)}{unitSymbolShort}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </Layout>
    );
};

export default CityDetails;
