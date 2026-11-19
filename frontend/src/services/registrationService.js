import axios from "axios";

const API = "http://localhost:5000/api/registration";

export const insertRegistration = (data) => {
    return axios.post(API, data);
};

export const getAllRegistrations = () => {
    return axios.get(API);
};

export const searchRegistration = (key) => {
    return axios.get(`${API}/search/${encodeURIComponent(key)}`);
};

export const updateRegistration = (id, data) => {
    return axios.put(`${API}/${id}`, data);
};

export const deleteRegistration = (id) => {
    return axios.delete(`${API}/${id}`);
};