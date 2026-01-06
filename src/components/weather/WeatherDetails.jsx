import React from 'react';
import { getIconUrl } from '../../utils/weatherUtils';
import { useTemperature } from '../../hooks/useTemperature';

const WeatherDetails = ({ weather }) => {
    const { formatTemperature } = useTemperature();
    if (!weather) return null;

    const { main, wind, clouds, rain, weather: weatherInfo } = weather;
    const icon = weatherInfo?.[0]?.icon;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6 transition-colors">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                Current Details
                {icon && <img src={getIconUrl(icon)} alt="Weather icon" className="w-12 h-12 ml-2" />}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                    <p className="text-lg font-semibold">{formatTemperature(main?.temp)}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Condition</p>
                    <p className="text-lg font-semibold capitalize">{weatherInfo?.[0]?.description}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
                    <p className="text-lg font-semibold">{wind?.speed} m/s</p>
                    <p className="text-xs text-gray-400">Dir: {wind?.deg}°</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Clouds</p>
                    <p className="text-lg font-semibold">{clouds?.all}%</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Rain (1h)</p>
                    <p className="text-lg font-semibold">{rain ? rain['1h'] : 0} mm</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                    <p className="text-lg font-semibold">{main?.humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails;
