import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Importujemy nasz sklep (Redux store), który stworzyliśmy przed chwilą
import { store } from './store';
import App from './App';

// Opcjonalnie: import styli globalnych (np. Tailwind lub zwykły CSS)
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        {/* 1. Provider udostępnia Reduxa (jednostki C/F, ulubione miasta) w całej apce */}
        <Provider store={store}>
            {/* 2. BrowserRouter pozwala na nawigację między stronami (Lista <-> Szczegóły) */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);