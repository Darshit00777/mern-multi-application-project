import express from "express";

import {
    insertBlog,
    getAllBlogs
} from "../controller/blogController.js";

const router = express.Router();

// Insert Blog
router.post("/", insertBlog);

// Display All Blogs
router.get("/", getAllBlogs);

export default router;