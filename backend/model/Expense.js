
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    description: { type: String, default: "" }
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
