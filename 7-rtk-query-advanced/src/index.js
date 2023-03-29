import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from "./app/store";
import { Provider } from 'react-redux';
import { extendedApiSlice } from './features/postsSlice';
// import
import { usersApiSlice } from './features/usersSlice';

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
//set
store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

