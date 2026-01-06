import { createSlice } from '@reduxjs/toolkit';

const savedUnit = localStorage.getItem('weatherApp_unit');
const savedTheme = localStorage.getItem('weatherApp_theme');

const initialState = {
    unit: savedUnit || 'metric',
    theme: savedTheme || 'dark',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleUnit: (state) => {
            state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
            localStorage.setItem('weatherApp_unit', state.unit);
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('weatherApp_theme', state.theme);
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('weatherApp_theme', state.theme);
        }
    },
});

export const { toggleUnit, toggleTheme, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;