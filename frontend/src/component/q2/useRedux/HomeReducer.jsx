import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Blogpageredux from "./Blogpageredux";
import Addblogredux from "./Addblogredux";
import { fetchBlogs } from "./blogslice";

const HomeReducer = () => {
    const dispatch = useDispatch();

    const blogs = useSelector((state) => state.blog.blogs);
    const categories = useSelector((state) => state.blog.categories);
    const loading = useSelector((state) => state.blog.loading);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    if (loading && blogs.length === 0) {
        return <h3 className="text-center mt-5">Loading blogs...</h3>;
    }

    return (
        <Routes>
            <Route
                path="/"
                element={<Blogpageredux blogs={blogs} />}
            />

            <Route
                path="addblog"
                element={<Addblogredux categories={categories} />}
            />
        </Routes>
    );
};

export default HomeReducer;
