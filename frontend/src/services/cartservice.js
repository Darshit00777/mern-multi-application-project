import axios from "axios";

const API = "http://localhost:5000/api/product";

export const getProducts = () => {
    return axios.get(API);
};

export const addProduct = (data) => {
    return axios.post(API, data);
};
