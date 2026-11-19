
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

import connectDB from "./config/db.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Display uploaded images
app.use("/uploads", express.static("uploads"));

app.use("/api/registration", registrationRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/product", productRoutes);
app.use("/api/expense", expenseRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
