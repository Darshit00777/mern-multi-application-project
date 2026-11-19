import React from "react";
import { Link } from "react-router-dom";

const Homeusestate = ({ products, addToCart, totalQty }) => {
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Products</h2>

                <Link to="/q3/usestate/cart" className="btn btn-primary">
                    Go To Cart ({totalQty})
                </Link>
            </div>

            <div className="row">
                {products.map((product) => (
                    <div className="col-md-3 mb-4" key={product._id}>
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <h4>{product.productName}</h4>

                                <h5 className="text-success mt-3">
                                    ₹{product.price}
                                </h5>

                                <button
                                    className="btn btn-success mt-3"
                                    onClick={() => addToCart(product)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <p className="text-center">No products found.</p>
            )}
        </div>
    );
};

export default Homeusestate;
