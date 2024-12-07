import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL of your backend

const api = axios.create({
  baseURL: API_URL,
});

// Add authorization token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

// API endpoints
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const fetchTrains = (params) => api.get('/trains', { params });
export const bookSeat = (data) => api.post('/bookings', data);
export const getBookingDetails = (id) => api.get(`/bookings/${id}`);
export const addTrain = (data, adminKey) =>
  api.post('/trains', data, { headers: { 'x-api-key': adminKey } });

export default api;
