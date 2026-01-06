import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import settingsReducer from './slices/settingsSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        settings: settingsReducer,
        favorites: favoritesReducer,
    },
});
