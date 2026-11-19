import express from "express";

import {
    insertExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} from "../controller/expenseController.js";

const router = express.Router();

router.post("/", insertExpense);
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
