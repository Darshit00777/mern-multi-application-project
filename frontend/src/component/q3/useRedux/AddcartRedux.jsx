import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
    increaseQty,
    decreaseQty,
    removeFromCart
} from "./cartSlice";

const AddcartRedux = () => {
    const dispatch = useDispatch();

    const cart = useSelector(
        (state) => state.cart.cart
    );

    const totalQty = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    const finalTotal = cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>My Cart</h2>

                <Link
                    to="/q3/useredux"
                    className="btn btn-primary"
                >
                    Continue Shopping
                </Link>
            </div>

            {cart.length === 0 ? (
                <div className="alert alert-warning text-center">
                    <h4>Cart is Empty</h4>

                    <Link
                        to="/q3/useredux"
                        className="btn btn-success mt-2"
                    >
                        Shop Now
                    </Link>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.productName}</td>
                                        <td>₹{item.price}</td>

                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    dispatch(
                                                        decreaseQty(item._id)
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span className="mx-3 fw-bold">
                                                {item.qty}
                                            </span>

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() =>
                                                    dispatch(
                                                        increaseQty(item._id)
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </td>

                                        <td>
                                            ₹{item.price * item.qty}
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    dispatch(
                                                        removeFromCart(item._id)
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row justify-content-end">
                        <div className="col-md-5">
                            <div className="card shadow">
                                <div className="card-header bg-dark text-white">
                                    <h4 className="mb-0">
                                        Cart Summary
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <span>Total Quantity</span>
                                        <strong>{totalQty}</strong>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between">
                                        <span>Final Total</span>
                                        <strong className="text-success fs-4">
                                            ₹{finalTotal}
                                        </strong>
                                    </div>

                                    <button
                                        className="btn btn-success w-100 mt-3"
                                        onClick={() =>
                                            alert("Order placed successfully!")
                                        }
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddcartRedux;
