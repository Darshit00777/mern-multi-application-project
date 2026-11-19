
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Blogpage from "./Blogpage";
import Addblog from "./Addblog";
import { getAllBlogs } from "../../../services/blogService.js";

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getAllBlogs()
            .then((res) => {
                setBlogs(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Error loading blogs. Check backend.");
            });
    }, []);

    const categories = [
        ...new Set(blogs.map((blog) => blog.category))
    ];

    return (
        <Routes>
            <Route
                path="/"
                element={<Blogpage blogs={blogs} />}
            />

            <Route
                path="addblog"
                element={
                    <Addblog
                        blogs={blogs}
                        setBlogs={setBlogs}
                        categories={categories}
                    />
                }
            />
        </Routes>
    );
};

export default Home;
