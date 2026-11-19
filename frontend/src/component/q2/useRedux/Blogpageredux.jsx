import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blogpageredux = ({ blogs }) => {

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");


  const categories = [
    "All",
    ...new Set(
      blogs.map((blog) => blog.category)
    ),
  ];


  const filterBlogs = blogs.filter((blog) => {

    const authorMatch = blog.author
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      blog.category === category;

    return authorMatch && categoryMatch;

  });


  return (

    <div>

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark">

        <div className="container-fluid">

          <Link to="/q2/useredux" className="navbar-brand">
            Blog List
          </Link>

          <Link to="/q2/useredux/addblog" className="btn btn-success">
            Add Blog
          </Link>

        </div>

      </nav>


      {/* Main */}

      <div className="container-fluid mt-4 px-4">

        <h2 className="text-center mb-4">
          Blog List
        </h2>


        {/* Categories */}

        <div className="mb-4">

          {categories.map((cat) => (

            <button
              key={cat}
              className={
                category === cat
                  ? "btn btn-primary me-2"
                  : "btn btn-outline-primary me-2"
              }
              onClick={() =>
                setCategory(cat)
              }
            >
              {cat}
            </button>

          ))}

        </div>


        {/* Search */}

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by Author Name"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        {/* Cards */}

        <div className="row">

          {filterBlogs.length > 0 ? (

            filterBlogs.map((blog) => (

              <div
                className="col-12 col-md-4 mb-4"
                key={blog._id}
              >

                <div className="card shadow w-100">

                  <div className="card-body">

                    <h4 className="card-title">
                      {blog.title}
                    </h4>

                    <h6 className="text-primary">
                      {blog.category}
                    </h6>

                    <p className="card-text">
                      {blog.description}
                    </p>

                  </div>

                  <div className="card-footer">

                    <p className="mb-2">
                      <b>Author :</b>{" "}
                      {blog.author}
                    </p>

                    <p className="mb-0">
                      <b>Date :</b>{" "}
                      {blog.date}
                    </p>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="col-12">

              <h3 className="text-center text-danger">
                No Blog Found
              </h3>

            </div>

          )}

        </div>

      </div>

    </div>

  );
};

export default Blogpageredux;