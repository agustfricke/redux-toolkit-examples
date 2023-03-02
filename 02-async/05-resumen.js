import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/usersSlice';

// Okey ahora lo que queremos hacer es despachar los usarios cuando carge la aplicacion, asi que vamos a 
// ponerlo aqui en el index que es como la raiz de nuestro proyecto

store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);


