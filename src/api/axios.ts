import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        params: config.params,
      });
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    
    return response;
  },
  (error: AxiosError) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      // Forbidden - handle accordingly
      console.error('Access forbidden');
    }
    
    if (error.response?.status >= 500) {
      // Server error - show generic error message
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default api; 