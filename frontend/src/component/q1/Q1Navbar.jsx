import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Q1Navbar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/q1/login");
    };
  return (
    <nav className="navbar navbar-expand navbar-light bg-light border rounded mb-4 px-3">
            <Link className="navbar-brand" to="/q1/login">
                Q1 Menu
            </Link>

            <div className="navbar-nav me-auto">
                <Link className="nav-link" to="/q1/login">
                    Login
                </Link>

                <Link className="nav-link" to="/q1/registration">
                    Registration
                </Link>
            </div>

            <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav>
  )
}

export default Q1Navbar