import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import HomeRedux from "./HomeRedux";
import AddcartRedux from "./AddcartRedux";

const Useredux = () => {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link
                        to="/q3/useredux"
                        className="navbar-brand"
                    >
                        Shopping Cart Redux
                    </Link>

                    <div>
                        <Link
                            to="/q3/useredux"
                            className="btn btn-outline-light me-2"
                        >
                            Home
                        </Link>

                        <Link
                            to="/q3/useredux/cart"
                            className="btn btn-warning"
                        >
                            Cart
                        </Link>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<HomeRedux />} />
                <Route path="cart" element={<AddcartRedux />} />
            </Routes>
        </>
    );
};

export default Useredux;
