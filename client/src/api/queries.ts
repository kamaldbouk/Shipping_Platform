import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),

  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

export const shipmentAPI = {
  createShipment: (customerName: string, customerPhone: string, customerAddress: string) =>
    api.post('/shipments', { customerName, customerPhone, customerAddress }),

  getShipments: (status?: string, search?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return api.get(`/shipments?${params.toString()}`);
  },

  getShipmentById: (id: number) =>
    api.get(`/shipments/${id}`),

  updateShipment: (id: number, data: {
    customerName?: string;
    customerPhone?: string;
    customerAddress?: string;
    status?: string;
  }) =>
    api.put(`/shipments/${id}`, data),

  deleteShipment: (id: number) =>
    api.delete(`/shipments/${id}`),
};
