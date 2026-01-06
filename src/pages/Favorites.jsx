import React from 'react';
import { useSelector } from 'react-redux';
import CityList from '../components/weather/CityList';

const Favorites = () => {
    const favorites = useSelector((state) => state.favorites);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Favorite Cities</h1>
            {favorites.length > 0 ? (
                <CityList cities={favorites} />
            ) : (
                <p className="text-center text-gray-500">No favorites added yet.</p>
            )}
        </div>
    );
};

export default Favorites;
