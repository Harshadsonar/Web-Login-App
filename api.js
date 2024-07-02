import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = async (username, password) => {
  return axios.post(`${API_URL}/sign-up`, { username, password });
};

export const loginUser = async (username, password) => {
  return axios.post(`${API_URL}/sign-in`, { username, password });
};

export const getProfile = async (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
