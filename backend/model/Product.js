import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
