import axios from "axios";

const API = "http://localhost:5000/api/expense";

// Display all expenses
export const getExpenses = () => {
    return axios.get(API);
};

// Insert expense
export const addExpense = (data) => {
    return axios.post(API, data);
};

// Update expense
export const updateExpense = (id, data) => {
    return axios.put(`${API}/${id}`, data);
};

// Delete expense
export const deleteExpense = (id) => {
    return axios.delete(`${API}/${id}`);
};

export default API;
