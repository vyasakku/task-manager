import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Load state from localStorage
const savedToken = localStorage.getItem('token');
if (savedToken) {
    store.dispatch({ type: 'auth/loginUser/fulfilled', payload: { token: savedToken, user: null } });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router> 
            <App />
        </Router>
    </Provider>
);
