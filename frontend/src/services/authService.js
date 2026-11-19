import axios from "axios";

const API = "http://localhost:5000/api/registration";

export const loginUser = (data) => {
    return axios.post(`${API}/login`, data);
};