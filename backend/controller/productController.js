import Product from "../model/Product.js";

// Insert product
export const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({
            message: "Product added successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

