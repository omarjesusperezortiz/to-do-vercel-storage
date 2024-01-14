import axios from 'axios';

const API_URL = import.meta.env.POSTGRES_URL

export const getTasks = async () => {
    return await axios.get(`${API_URL}get`);
};

export const addTask = async (task) => {
    return await axios.post(`${API_URL}post`, task);
};

export const updateTask = async (id, updatedTask) => {
    return await axios.put(`${API_URL}put`, { id, ...updatedTask });
};

export const deleteTask = async (id) => {
    return await axios.delete(`${API_URL}delete`, { data: { id } });
};
