import { Routes, Route } from "react-router-dom";
import Q3Navbar from "./Q3Navbar";
import UseState from "./useState/Usestate";
//import Homeusestate from "./useState/Homeusestate";
import Useredux from "./useRedux/Useredux";

function Q3() {
    return (
        <>
            <Q3Navbar />

            <Routes>
                <Route path="usestate/*" element={<UseState />} />
                <Route path="useredux/*" element={<Useredux />} />
            </Routes>
        </>
    );
}

export default Q3;