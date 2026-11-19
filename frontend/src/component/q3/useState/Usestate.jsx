import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import Homeusestate from "./Homeusestate";
import Addcartusestate from "./Addcartusestate";
import { getProducts } from "../../../services/cartservice.js";

const UseState = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getProducts()
            .then((res) => setProducts(res.data))
            .catch((err) => {
                console.log(err);
                alert("Error loading products. Check backend.");
            });
    }, []);

    const addToCart = (product) => {
        setCart((oldCart) => {
            const existing = oldCart.find(
                (item) => item._id === product._id
            );

            if (existing) {
                return oldCart.map((item) =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...oldCart, { ...product, qty: 1 }];
        });
    };

    const increaseQty = (id) => {
        setCart((oldCart) =>
            oldCart.map((item) =>
                item._id === id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCart((oldCart) =>
            oldCart
                .map((item) =>
                    item._id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    const removeFromCart = (id) => {
        setCart((oldCart) =>
            oldCart.filter((item) => item._id !== id)
        );
    };

    const totalQty = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    const finalTotal = cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link to="/q3/usestate" className="navbar-brand">
                        Shopping Cart
                    </Link>

                    <div>
                        <Link
                            to="/q3/usestate"
                            className="btn btn-outline-light me-2"
                        >
                            Home
                        </Link>

                        <Link
                            to="/q3/usestate/cart"
                            className="btn btn-warning"
                        >
                            Cart ({totalQty})
                        </Link>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <Homeusestate
                            products={products}
                            addToCart={addToCart}
                            totalQty={totalQty}
                        />
                    }
                />

                <Route
                    path="cart"
                    element={
                        <Addcartusestate
                            cart={cart}
                            increaseQty={increaseQty}
                            decreaseQty={decreaseQty}
                            removeFromCart={removeFromCart}
                            totalQty={totalQty}
                            finalTotal={finalTotal}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default UseState;
