import axios from 'axios';

const API_KEY = '9ac096d05f422b2255ace00515bf9d2a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        units: 'metric', // default
    },
});

export const getWeatherByCity = (city) => weatherApi.get(`/weather?q=${city}`);
export const getForecastByCity = (city) => weatherApi.get(`/forecast?q=${city}`);
export const getWeatherById = (id) => weatherApi.get(`/weather?id=${id}`);

export default weatherApi;
