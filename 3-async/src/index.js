import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
// Ponemos los usuarios aqui para que cargen apenas nuestra app carge
import { fetchUsers } from './features/usersSlice';

store.dispatch(fetchUsers());
// Podemos hacer esto porque tenemos acceso al store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

