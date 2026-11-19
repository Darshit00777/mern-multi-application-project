import React from 'react'
import { useState } from 'react';
import { loginUser } from "../../services/authService.js";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ username, password });
            setMessage(res.data.message);
            onLogin();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };
  return (
    <div className="container login-container">
            <div className="card shadow p-4 login-card">
                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                {message && (
                    <div className="alert alert-info mt-3 mb-0">
                        {message}
                    </div>
                )}

                <p className="text-muted mt-3 mb-0">
                    Username: admin
                    <br />
                    Password: admin123
                </p>
            </div>
        </div>
  )
}

export default Login