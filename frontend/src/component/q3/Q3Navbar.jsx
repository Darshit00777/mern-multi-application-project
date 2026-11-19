import { Link } from "react-router-dom";

function Q3Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light border rounded mb-4 px-3">
            <span className="navbar-brand">Q3 Shopping Cart</span>

            <div className="navbar-nav">
                <Link className="nav-link" to="/q3/usestate">
                    useState
                </Link>

                <Link className="nav-link" to="/q3/useredux">
                    useRedux
                </Link>
            </div>
        </nav>
    );
}

export default Q3Navbar;