import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Container, Button, Navbar, Nav, Form } from 'react-bootstrap';
import { logout } from './redux/authSlice';
import { toggleDarkMode } from './redux/taskSlice';
import Auth from './components/Auth';
import TaskManager from './components/TaskManager';
import './styles/App.css';

// Memoized selector
const selectAuth = createSelector(
    (state) => state.auth,
    (auth) => ({ token: auth?.token || null, user: auth?.user || {} })
);

const selectDarkMode = (state) => state.tasks.darkMode;

const App = () => {
    const { token, user } = useSelector(selectAuth);
    const darkMode = useSelector(selectDarkMode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redirect to login if logged out
    useEffect(() => {
        if (!token) navigate('/');
    }, [token, navigate]);

    return (
        <Router>
            <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" fixed="top" className="mb-4">
                <Container>
                    <Navbar.Brand href="/">Task Manager</Navbar.Brand>
                    <Nav className="ms-auto d-flex align-items-center">
                        <Form.Check
                            type="switch"
                            id="dark-mode-toggle"
                            label={darkMode ? 'Light Mode' : 'Dark Mode'}
                            checked={darkMode}
                            onChange={() => dispatch(toggleDarkMode())}
                            className="me-3"
                        />
                        {token && <span className="user-info me-3">{user?.email}</span>}
                        {token && (
                            <Button className="custom-button" onClick={() => dispatch(logout())}>
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>
            <Container className="app-container">
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/tasks" element={token ? <TaskManager /> : <Navigate to="/" />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
