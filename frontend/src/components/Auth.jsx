import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from '../redux/authSlice';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const darkMode = useSelector((state) => state.tasks.darkMode);

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = isRegistering ? registerUser : loginUser;
        dispatch(action({ email, password })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/tasks');
            }
        });
    };

    return (
        <Container className={`mt-5 ${darkMode ? 'dark-mode' : ''}`}>
            <h2 className={`title ${darkMode ? 'dark-mode' : ''}`}>
                {isRegistering ? 'Register' : 'Login'}
            </h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className={`label ${darkMode ? 'dark-mode' : ''}`}>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className={darkMode ? 'dark-mode' : ''}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={`label ${darkMode ? 'dark-mode' : ''}`}>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className={darkMode ? 'dark-mode' : ''}
                    />
                </Form.Group>
                <Button type="submit" className={`mt-3 custom-button ${darkMode ? 'dark-mode' : ''}`}>
                    {isRegistering ? 'Register' : 'Login'}
                </Button>
            </Form>
            <Button variant="link" className={`mt-2 ${darkMode ? 'dark-mode' : ''}`} onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
            </Button>
        </Container>
    );
};

export default Auth;
