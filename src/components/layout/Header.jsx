import React from 'react';
import { Link } from 'react-router-dom';
import UnitToggle from '../common/UnitToggle';

const Header = () => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Weather App
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
                    <Link to="/favorites" className="hover:text-blue-500 transition-colors">Favorites</Link>
                    <UnitToggle />
                </nav>
            </div>
        </header>
    );
};

export default Header;
