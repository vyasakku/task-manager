import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/authSlice"; // Import registerUser action
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false); // Toggle between Login/Register

    const { error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form refresh

        if (isRegister) {
            dispatch(registerUser({ email, password }))
            .unwrap()
            .then(()=>navigate("/login"))
            .catch((err)=>console.log(err,"Error")); // Register User
        } else {
            dispatch(loginUser({ email, password })); // Login User
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">{isRegister ? "Register" : "Login"}</h2>
                {error && <p className="error-message">{error}</p>}

                <form className="auth-form" onSubmit={handleSubmit}>
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
                    <button className="auth-button" type="submit">
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>

                <p className="toggle-auth">
                    {isRegister ? "Already have an account? " : "Don't have an account? "}
                    <button 
    className="toggle-button btn btn-outline-primary w-100 fw-bold" 
    onClick={() => setIsRegister(!isRegister)}
    style={{
        border:"none",
        background: "transparent", 
        borderRadius: "5px", 
        padding: "10px"
    }}
    type="submit"
>
    {!isRegister ? "Register" : "Login"}
</button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
