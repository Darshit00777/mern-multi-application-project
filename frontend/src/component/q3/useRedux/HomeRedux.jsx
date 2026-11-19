import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./cartSlice";
import { getProducts } from "../../../services/cartservice.js";

const HomeRedux = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    const cart = useSelector(
        (state) => state.cart.cart
    );

    const totalQty = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    useEffect(() => {
        getProducts()
            .then((res) => setProducts(res.data))
            .catch((err) => {
                console.log(err);
                alert("Error loading products");
            });
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        alert(product.productName + " added to cart!");
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>Products</h2>

                <Link
                    to="/q3/useredux/cart"
                    className="btn btn-primary"
                >
                    Go To Cart ({totalQty})
                </Link>
            </div>

            <div className="row">
                {products.map((product) => (
                    <div
                        className="col-md-3 mb-4"
                        key={product._id}
                    >
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <h4>
                                    {product.productName}
                                </h4>

                                <h5 className="text-success mt-3">
                                    ₹{product.price}
                                </h5>

                                <button
                                    className="btn btn-success mt-3"
                                    onClick={() =>
                                        handleAddToCart(product)
                                    }
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <p className="text-center">
                    No products available. Add products to MongoDB first.
                </p>
            )}
        </div>
    );
};

export default HomeRedux;
