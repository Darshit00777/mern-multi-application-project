import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;

            const existing = state.cart.find(
                (item) => item._id === product._id
            );

            if (existing) {
                existing.qty += 1;
            } else {
                state.cart.push({
                    ...product,
                    qty: 1
                });
            }
        },

        increaseQty: (state, action) => {
            const item = state.cart.find(
                (item) => item._id === action.payload
            );

            if (item) {
                item.qty += 1;
            }
        },

        decreaseQty: (state, action) => {
            const item = state.cart.find(
                (item) => item._id === action.payload
            );

            if (item) {
                item.qty -= 1;
            }

            state.cart = state.cart.filter(
                (item) => item.qty > 0
            );
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item._id !== action.payload
            );
        }
    }
});

export const {
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
