import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUnit } from '../../store/slices/settingsSlice';

const UnitToggle = () => {
    const dispatch = useDispatch();
    const unit = useSelector((state) => state.settings.unit);

    const handleToggle = () => {
        dispatch(toggleUnit());
    };

    return (
        <button
            onClick={handleToggle}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
        >
            {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
        </button>
    );
};

export default UnitToggle;
