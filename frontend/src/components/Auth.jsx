import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

const Auth = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { error } = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent form refresh
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="auth-form" onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="auth-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
