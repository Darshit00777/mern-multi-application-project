import React from 'react'
import { Link } from "react-router-dom";

const Q2Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light border rounded mb-4 px-3">
            <span className="navbar-brand">Q2 Blog Menu</span>

            <div className="navbar-nav">
                <Link className="nav-link" to="/q2/usestate">
                    useState
                </Link>

                <Link className="nav-link" to="/q2/useredux">
                    useRedux
                </Link>
            </div>
        </nav>
  )
}

export default Q2Navbar