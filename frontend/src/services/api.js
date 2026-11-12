import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
  update: async (id, packageData) => {
    const response = await api.put(`/packages/${id}`, packageData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/packages/${id}`);
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
  updateStatus: async (id, status) => {
    const response = await api.put(`/contacts/${id}/status`, { status });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
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

export const operationService = {
  getAll: async (status = '') => {
    const query = status && status !== 'ALL' ? `?status=${encodeURIComponent(status)}` : '';
    const response = await api.get(`/operations${query}`);
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/operations/${id}`);
    return response.data;
  },
  create: async (operationData) => {
    const response = await api.post('/operations', operationData);
    return response.data;
  },
  update: async (id, operationData) => {
    const response = await api.put(`/operations/${id}`, operationData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/operations/${id}`);
    return response.data;
  },
  addMilestone: async (id, milestoneData) => {
    const response = await api.post(`/operations/${id}/milestone`, milestoneData);
    return response.data;
  },
  updatePassengerStatus: async (id, passengerIndex, checkInStatus, boardingPoint = '') => {
    const response = await api.put(`/operations/${id}/passenger-checkin`, {
      passengerIndex,
      checkInStatus,
      boardingPoint,
    });
    return response.data;
  },
  assignBooking: async (id, bookingId, seatNumbers = []) => {
    const response = await api.post(`/operations/${id}/assign-booking`, {
      bookingId,
      seatNumbers,
    });
    return response.data;
  },
};

export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  getExportUrl: (type = 'bookings') => {
    return `${API_BASE_URL}/admin/export/${type}`;
  },
};

// Real-time Server-Sent Events (SSE) connector
export const subscribeRealtimeSSE = (onEvent, onError) => {
  const url = `${API_BASE_URL}/realtime`;
  const eventSource = new EventSource(url);

  eventSource.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      if (onEvent) onEvent(data);
    } catch (err) {
      console.warn('Realtime SSE JSON parse error:', err);
    }
  };

  eventSource.onerror = (err) => {
    if (onError) onError(err);
  };

  return () => {
    eventSource.close();
  };
};

export default api;
