import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  checkAuth: () => api.get('/auth/check'),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  googleLogin: () => {
    window.location.href = `${API_URL}/auth/google`;
  },
  githubLogin: () => {
    window.location.href = `${API_URL}/auth/github`;
  },
};

export default api;
