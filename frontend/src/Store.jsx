import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./component/q2/useRedux/blogslice";
import cartReducer from "./component/q3/useRedux/cartSlice";

const store = configureStore({
    reducer: {
        blog: blogReducer,
        cart: cartReducer
    }
});

export default store;
