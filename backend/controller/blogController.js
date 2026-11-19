import Blog from "../model/Blog.js";

// Insert Blog
export const insertBlog = async (req, res) => {
    try {
        const blog = new Blog(req.body);

        await blog.save();

        res.status(201).json({
            message: "Blog inserted successfully",
            blog: blog
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Display All Blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};