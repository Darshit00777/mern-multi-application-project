
import axios from "axios";

const API = "http://localhost:5000/api/blog";

// Insert Blog
export const insertBlog = (data) => axios.post(API, data);

// Display All Blogs
export const getAllBlogs = () => axios.get(API);
