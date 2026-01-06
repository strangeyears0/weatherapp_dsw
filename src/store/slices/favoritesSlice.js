import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
    try {
        const serializedState = localStorage.getItem('weatherApp_favorites');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

const saveFavorites = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('weatherApp_favorites', serializedState);
    } catch {
        // ignore
    }
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: loadFavorites(),
    reducers: {
        addFavorite: (state, action) => {
            // Avoid duplicates
            if (!state.find(city => city.id === action.payload.id)) {
                state.push(action.payload);
                saveFavorites(state);
            }
        },
        removeFavorite: (state, action) => {
            const newState = state.filter(city => city.id !== action.payload);
            saveFavorites(newState);
            return newState;
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
