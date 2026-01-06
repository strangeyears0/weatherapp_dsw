import React from 'react';
import CityCard from './CityCard';

const CityList = ({ cities }) => {
    if (!cities || cities.length === 0) {
        return <p className="text-center text-gray-500">No cities to display.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
                <CityCard key={city.id} city={city} />
            ))}
        </div>
    );
};

export default CityList;
