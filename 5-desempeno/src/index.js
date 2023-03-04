import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/usersSlice';
import { fetchPosts } from './features/postsSlice';
// Importamos 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
);

