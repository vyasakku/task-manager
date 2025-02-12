import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Container, Button, Navbar, Nav, Form } from 'react-bootstrap';
import { logout } from './redux/authSlice';
import { toggleDarkMode } from './redux/taskSlice';
import Auth from './components/Auth';
import TaskManager from './components/TaskManager';
import './styles/App.css';
import './index.css';

// Memoized selector
const selectAuth = createSelector(
    (state) => state.auth,
    (auth) => ({ token: auth?.token || null, user: auth?.user || {} }) // Ensure user is always an object
);

const selectDarkMode = (state) => state.tasks.darkMode;

const App = () => {
    const { token, user } = useSelector(selectAuth);
    const darkMode = useSelector(selectDarkMode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Apply dark mode to the entire document body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            document.getElementById('root')?.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.getElementById('root')?.classList.remove("dark-mode");
        }
        if (token) {
            navigate('/tasks'); // Redirects to TaskManager when logged in
        }
    }, [darkMode, token, navigate]);

    // Redirect to login if logged out
    useEffect(() => {
        if (!token) navigate('/');
    }, [token, navigate]);

    return (
        <>
            <Navbar 
                bg={darkMode ? 'dark' : 'light'} 
                variant={darkMode ? 'dark' : 'light'} 
                expand="lg" 
                fixed="top" 
                className="mb-4"
            >
                <Container>
                    <Navbar.Brand 
                        href="/" 
                        className={darkMode ? 'text-light' : 'text-dark'}
                    >
                        Task Manager
                    </Navbar.Brand>
                    <Nav className="ms-auto d-flex align-items-center">
                        <Form.Check
                            type="switch"
                            id="dark-mode-toggle"
                            label={
                                <span style={{ color: darkMode ? 'white' : 'black' }}>
                                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                                </span>
                            }
                            checked={darkMode}
                            onChange={() => dispatch(toggleDarkMode())}
                            className="me-3"
                        />
                        {token && user?.email && (
                            <span 
                                className="user-info me-3" 
                                style={{ color: darkMode ? 'white' : 'black' }}
                            >
                                {user.email}
                            </span>
                        )}
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
        </>
    );
};

export default App;
