import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Okey aqui importamos el store que acabamos de crear
import { store } from './app/store';
// Luego vamos a importar el Provider, que este va a proveer el estado global a nuestra aplicacion
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // basicamnete vamos a envolver nuestra app en este provider pasandole el estado de toda nuestra aplicacion
    <Provider store={store}>
    <App />
    </Provider>
);

