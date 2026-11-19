
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBlogs, insertBlog } from "../../../services/blogService.js";

// Get blogs from MongoDB
export const fetchBlogs = createAsyncThunk(
    "blog/fetchBlogs",
    async () => {
        const res = await getAllBlogs();
        return res.data;
    }
);

// Insert blog into MongoDB
export const addBlogToServer = createAsyncThunk(
    "blog/addBlogToServer",
    async (data) => {
        const res = await insertBlog(data);
        return res.data.blog;
    }
);

const initialState = {
    blogs: [],
    categories: ["React", "PHP", "C#", "DSA"],
    loading: false
};

const BlogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            if (
                action.payload.trim() &&
                !state.categories.includes(action.payload)
            ) {
                state.categories.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;

                // Add categories found in MongoDB
                action.payload.forEach((blog) => {
                    if (
                        blog.category &&
                        !state.categories.includes(blog.category)
                    ) {
                        state.categories.push(blog.category);
                    }
                });
            })
            .addCase(fetchBlogs.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addBlogToServer.fulfilled, (state, action) => {
                state.blogs.push(action.payload);

                if (
                    action.payload.category &&
                    !state.categories.includes(action.payload.category)
                ) {
                    state.categories.push(action.payload.category);
                }
            });
    }
});

export const { addCategory } = BlogSlice.actions;
export default BlogSlice.reducer;
