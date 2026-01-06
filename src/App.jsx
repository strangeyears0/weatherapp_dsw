import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';
import Favorites from './pages/Favorites'; // Keeping for reference/fallback but functionality moved to Home/Settings
import Search from './pages/Search';
import Settings from './pages/Settings';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/details/:cityName" element={<CityDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<div className="p-10 text-center">404 - Nie znaleziono strony</div>} />
        </Routes>
    );
};

export default App;