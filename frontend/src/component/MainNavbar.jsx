import React from 'react'
import { Link } from "react-router-dom";


const MainNavbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">
                Assignment-2
            </Link>

            <div className="d-flex gap-2">
                <Link className="btn btn-outline-light" to="/q1/login">
                    Q1
                </Link>

                <Link className="btn btn-outline-light" to="/q2">
                    Q2
                </Link>

                <Link className="btn btn-outline-light" to="/q3">
                    Q3
                </Link>

                <Link className="btn btn-outline-light" to="/q4">
                    Q4
                </Link>
            </div>
        </nav>
  )
}

export default MainNavbar