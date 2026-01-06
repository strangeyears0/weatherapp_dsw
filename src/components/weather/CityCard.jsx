import React from 'react';
import { Link } from 'react-router-dom';
import { getIconUrl } from '../../utils/weatherUtils';
import { useTemperature } from '../../hooks/useTemperature';

const CityCard = ({ city }) => {
    const { formatTemperature } = useTemperature();
    const icon = city.weather?.[0]?.icon;

    return (
        <Link to={`/details/${city.name}`} className="block">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 capitalize">{city.weather?.[0]?.description}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                    {icon && <img src={getIconUrl(icon)} alt="icon" className="w-16 h-16" />}
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatTemperature(city.main?.temp)}</p>
                </div>
            </div>
        </Link>
    );
};

export default CityCard;
