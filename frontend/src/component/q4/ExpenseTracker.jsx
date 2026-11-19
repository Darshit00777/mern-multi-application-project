import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseTable from "./ExpenseTable";
import ExpenseReport from "./ExpenseReport";
import MonthlyBarChart from "./MonthlyBarChart";

import {
    getExpenses,
    addExpense as createExpense,
    updateExpense as updateExpenseApi,
    deleteExpense as deleteExpenseApi
} from "../../services/expenseService.js";

const emptyForm = {
    title: "",
    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
    description: ""
};

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [monthFilter, setMonthFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [sortBy, setSortBy] = useState("");

    const [reportMonth, setReportMonth] = useState("");
    const [reportYear, setReportYear] = useState("");

    // Load expenses from MongoDB
    const loadExpenses = async () => {
        try {
            const response = await getExpenses();
            setExpenses(response.data);
        } catch (error) {
            console.error(error);
            alert("Could not load expenses. Check your backend server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    // ADD EXPENSE
    const addExpense = async (data) => {
        try {
            const response = await createExpense({
                ...data,
                amount: Number(data.amount)
            });

            setExpenses((previous) => [
                response.data.expense,
                ...previous
            ]);

            setFormData(emptyForm);
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Unable to add expense."
            );
            throw error;
        }
    };

    // UPDATE EXPENSE
    const updateExpense = async (data) => {
        try {
            const response = await updateExpenseApi(editId, {
                ...data,
                amount: Number(data.amount)
            });

            setExpenses((previous) =>
                previous.map((expense) =>
                    expense._id === editId
                        ? response.data.expense
                        : expense
                )
            );

            setEditId(null);
            setFormData(emptyForm);
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Unable to update expense."
            );
            throw error;
        }
    };

    // EDIT EXPENSE
    const editExpense = (expense) => {
        setEditId(expense._id);

        setFormData({
            title: expense.title,
            amount: String(expense.amount),
            category: expense.category,
            date: expense.date
                ? String(expense.date).slice(0, 10)
                : "",
            paymentMethod: expense.paymentMethod,
            description: expense.description || ""
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // DELETE EXPENSE
    const deleteExpense = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) {
            return;
        }

        try {
            await deleteExpenseApi(id);

            setExpenses((previous) =>
                previous.filter((expense) => expense._id !== id)
            );

            if (editId === id) {
                setEditId(null);
                setFormData(emptyForm);
            }
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Unable to delete expense."
            );
        }
    };

    // SEARCH AND FILTER
    let filteredExpenses = [...expenses];

    if (search.trim() !== "") {
        const text = search.toLowerCase();

        filteredExpenses = filteredExpenses.filter(
            (expense) =>
                expense.title.toLowerCase().includes(text) ||
                expense.category.toLowerCase().includes(text)
        );
    }

    if (categoryFilter !== "") {
        filteredExpenses = filteredExpenses.filter(
            (expense) => expense.category === categoryFilter
        );
    }

    if (paymentFilter !== "") {
        filteredExpenses = filteredExpenses.filter(
            (expense) => expense.paymentMethod === paymentFilter
        );
    }

    if (monthFilter !== "") {
        filteredExpenses = filteredExpenses.filter(
            (expense) =>
                new Date(expense.date).getMonth() + 1 ===
                Number(monthFilter)
        );
    }

    if (yearFilter !== "") {
        filteredExpenses = filteredExpenses.filter(
            (expense) =>
                new Date(expense.date).getFullYear() ===
                Number(yearFilter)
        );
    }

    if (sortBy === "newest") {
        filteredExpenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }

    if (sortBy === "oldest") {
        filteredExpenses.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
    }

    if (sortBy === "amountAsc") {
        filteredExpenses.sort((a, b) => a.amount - b.amount);
    }

    if (sortBy === "amountDesc") {
        filteredExpenses.sort((a, b) => b.amount - a.amount);
    }

    // RESET FILTERS
    const resetFilters = () => {
        setSearch("");
        setCategoryFilter("");
        setPaymentFilter("");
        setMonthFilter("");
        setYearFilter("");
        setSortBy("");
    };

    return (
        <div className="container py-4">
            <h1 className="text-center mb-4 text-dark">
                Expense Tracker
            </h1>

            <ExpenseForm
                formData={formData}
                setFormData={setFormData}
                addExpense={addExpense}
                updateExpense={updateExpense}
                editId={editId}
                setEditId={setEditId}
            />

            <ExpenseFilter
                search={search}
                setSearch={setSearch}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                paymentFilter={paymentFilter}
                setPaymentFilter={setPaymentFilter}
                monthFilter={monthFilter}
                setMonthFilter={setMonthFilter}
                yearFilter={yearFilter}
                setYearFilter={setYearFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                resetFilters={resetFilters}
            />

            {loading ? (
                <p className="text-center">Loading expenses...</p>
            ) : (
                <ExpenseTable
                    expenses={filteredExpenses}
                    deleteExpense={deleteExpense}
                    editExpense={editExpense}
                />
            )}

            <ExpenseReport
                expenses={expenses}
                reportMonth={reportMonth}
                setReportMonth={setReportMonth}
                reportYear={reportYear}
                setReportYear={setReportYear}
            />

            <MonthlyBarChart
                expenses={expenses}
                reportYear={reportYear}
            />
        </div>
    );
};

export default ExpenseTracker;
