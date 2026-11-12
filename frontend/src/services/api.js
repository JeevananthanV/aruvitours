import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.success && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const healthService = {
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export const packageService = {
  getAll: async () => {
    const response = await api.get('/packages');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },
  create: async (packageData) => {
    const response = await api.post('/packages', packageData);
    return response.data;
  },
};

export const bookingService = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  },
};

export const contactService = {
  submit: async (contactData) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/contacts');
    return response.data;
  },
};

export const departureService = {
  getAll: async () => {
    const response = await api.get('/departures');
    return response.data;
  },
  create: async (departureData) => {
    const response = await api.post('/departures', departureData);
    return response.data;
  },
};

export default api;

