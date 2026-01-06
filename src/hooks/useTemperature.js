import { useSelector } from 'react-redux';

export const useTemperature = () => {
    const unit = useSelector((state) => state.settings.unit);

    const formatTemperature = (tempCelsius) => {
        if (tempCelsius === undefined || tempCelsius === null) return '--';

        if (unit === 'imperial') { // 'imperial' usually means F in OpenWeatherMap checks, but here we do manual conversion if API is metric
            // API is configured to 'metric' (Celsius)
            const tempF = (tempCelsius * 9 / 5) + 32;
            return `${Math.round(tempF)}°F`;
        }
        return `${Math.round(tempCelsius)}°C`;
    };

    return { unit, formatTemperature };
};
