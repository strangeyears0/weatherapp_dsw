import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherByCity, getForecastByCity } from '../../services/weatherApi';

// Thunk to fetch weather for a single city
export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city, { rejectWithValue }) => {
        try {
            const response = await getWeatherByCity(city);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch weather');
        }
    }
);

// Thunk to fetch forecast for a single city
export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async (city, { rejectWithValue }) => {
        try {
            const response = await getForecastByCity(city);
            // Filter for 5 days (e.g. 12:00 PM for each day) to simplify, or just return list
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch forecast');
        }
    }
);

// Thunk to fetch weather for multiple cities (for the home page list)
export const fetchHomeWeather = createAsyncThunk(
    'weather/fetchHomeWeather',
    async (cities, { dispatch, rejectWithValue }) => {
        try {
            const promises = cities.map((city) => getWeatherByCity(city));
            const responses = await Promise.all(promises);
            return responses.map((res) => res.data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        list: [], // For Home page list
        selectedCity: null, // For Details page current weather
        forecast: null, // For Details page forecast
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedCity: (state) => {
            state.selectedCity = null;
            state.forecast = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Home Weather (List)
            .addCase(fetchHomeWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchHomeWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Single Weather
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCity = action.payload;
                // Optional: Update list if item exists
                const index = state.list.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Forecast
            .addCase(fetchForecast.pending, (state) => {
                // Keep loading true if concurrent, or separate loading state
                // state.loading = true; 
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.forecast = action.payload;
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearError, clearSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;
