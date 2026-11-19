import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addBlogToServer, addCategory } from "./blogslice";


const Addblogredux = ({ categories }) => {

  const dispatch = useDispatch();


  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [author, setAuthor] =
    useState("");

  const [date, setDate] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [newCategory, setNewCategory] =
    useState("");


  
async function handleSubmit(e) {
    e.preventDefault();

    let finalCategory = category;

    if (category === "Add New") {
        finalCategory = newCategory.trim();

        if (!finalCategory) {
            alert("Please enter a category");
            return;
        }

        if (!categories.includes(finalCategory)) {
            dispatch(addCategory(finalCategory));
        }
    }

    const newBlog = {
        title,
        description,
        author,
        date,
        category: finalCategory
    };

    try {
        await dispatch(addBlogToServer(newBlog)).unwrap();

        setTitle("");
        setDescription("");
        setAuthor("");
        setDate("");
        setCategory("");
        setNewCategory("");

        alert("Blog Added Successfully!");
    } catch (error) {
        console.log(error);
        alert("Error adding blog. Check backend.");
    }
}



  return (

    <div>

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark">

        <div className="container-fluid">

          <Link
            to="/q2/useredux"
            className="navbar-brand"
          >
            Blog List
          </Link>


          <Link
            to="/q2/useredux"
            className="btn btn-warning"
          >
            Home
          </Link>

        </div>

      </nav>


      {/* Form */}

      <div className="container-fluid mt-4 px-4">

        <div className="card shadow p-4 w-100">

          <h2 className="text-center mb-4">
            Add New Blog
          </h2>


          <form onSubmit={handleSubmit}>


            {/* Title */}

            <div className="mb-3">

              <label className="form-label">
                Blog Title
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Blog Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

            </div>


            {/* Description */}

            <div className="mb-3">

              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

            </div>


            {/* Author */}

            <div className="mb-3">

              <label className="form-label">
                Author Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) =>
                  setAuthor(e.target.value)
                }
                required
              />

            </div>


            {/* Date */}

            <div className="mb-3">

              <label className="form-label">
                Date
              </label>

              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                required
              />

            </div>


            {/* Category */}

            <div className="mb-3">

              <label className="form-label">
                Category
              </label>

              <select
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
              >

                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (

                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>

                ))}

                <option value="Add New">
                  Add New Category
                </option>

              </select>

            </div>


            {/* New Category */}

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
                  onChange={(e) =>
                    setNewCategory(e.target.value)
                  }
                  required
                />

              </div>

            )}


            {/* Button */}

            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Add Blog
            </button>

          </form>

        </div>

      </div>

    </div>

  );
};

export default Addblogredux;