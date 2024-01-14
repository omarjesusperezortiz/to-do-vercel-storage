import axios from 'axios';

const API_URL = import.meta.env.POSTGRES_URL

export const fetchUser = async () => {
    return await axios.get(`${API_URL}/users/me`); // Endpoint to get user info
};

export const login = async (credentials) => {
    return await axios.post(`${API_URL}/users/login`, credentials);
};

export const register = async (userData) => {
    return await axios.post(`${API_URL}/users/register`, userData);
};
