
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { insertBlog } from "../../../services/blogService.js";

const Addblog = ({ blogs, setBlogs, categories }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        let finalCategory = category;

        if (category === "Add New") {
            finalCategory = newCategory.trim();
        }

        if (!finalCategory) {
            alert("Please select or enter a category");
            return;
        }

        const newBlog = {
            title,
            description,
            author,
            date,
            category: finalCategory
        };

        try {
            const res = await insertBlog(newBlog);

            // Add saved blog returned by backend
            setBlogs([...blogs, res.data.blog]);

            alert("Blog Added Successfully!");

            setTitle("");
            setDescription("");
            setAuthor("");
            setDate("");
            setCategory("");
            setNewCategory("");

            navigate("/q2/usestate");
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Error adding blog. Check backend."
            );
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/q2/usestate" className="navbar-brand">
                        Blog List
                    </Link>

                    <Link to="/q2/usestate" className="btn btn-warning">
                        Home
                    </Link>
                </div>
            </nav>

            <div className="container-fluid mt-4 px-4">
                <div className="card shadow p-4 w-100">
                    <h2 className="text-center mb-4">Add New Blog</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Blog Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Blog Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Author Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Author Name"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>

                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}

                                <option value="Add New">
                                    Add New Category
                                </option>
                            </select>
                        </div>

                        {category === "Add New" && (
                            <div className="mb-3">
                                <label className="form-label">
                                    New Category
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter New Category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <button type="submit" className="btn btn-success w-100">
                            Add Blog
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addblog;
