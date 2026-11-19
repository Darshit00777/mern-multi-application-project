
import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";

import Q2Navbar from "./Q2Navbar";
import Home from "./useState/Home";
import HomeReducer from "./useRedux/HomeReducer";

const Q2 = () => {
    return (
        <>
            <Q2Navbar />

            <Routes>
                <Route
                    path="usestate/*"
                    element={<Home />}
                />

                <Route
                    path="useredux/*"
                    element={<HomeReducer />}
                />
            </Routes>
        </>
    );
};

export default Q2;
