import React from 'react';
import { getIconUrl } from '../../utils/weatherUtils';
import { useTemperature } from '../../hooks/useTemperature';

const ForecastList = ({ forecast }) => {
    const { formatTemperature } = useTemperature();
    if (!forecast || forecast.length === 0) return null;

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Forecast</h2>
            <div className="space-y-4">
                {forecast.map((item) => (
                    <div key={item.dt} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors">
                        <div>
                            <p className="font-semibold">{new Date(item.dt * 1000).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            {item.weather?.[0]?.icon && <img src={getIconUrl(item.weather[0].icon)} alt="icon" className="w-10 h-10" />}
                            <span className="capitalize hidden md:block">{item.weather?.[0]?.description}</span>
                            <span className="font-bold text-lg">{formatTemperature(item.main?.temp)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastList;
