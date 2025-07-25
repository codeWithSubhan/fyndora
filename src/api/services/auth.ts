import api from '../axios';
import { LoginRequest, LoginResponse, User, ApiResponse } from '../types';
import { AxiosResponse } from 'axios';

export const authService = {
  // Login user
  async login(credentials: LoginRequest) {
    return await api.post<ApiResponse<LoginResponse>>('/auth/google', credentials);
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Even if logout fails, clear local storage
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  // Refresh token
  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<ApiResponse<LoginResponse>>('/auth/refresh', {
      refreshToken,
    });
    return response.data.data;
  },

  // Register user
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/register', userData);
    return response.data.data;
  },

  // Change password
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await api.post('/auth/change-password', data);
  },

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  // Reset password
  async resetPassword(data: {
    token: string;
    newPassword: string;
  }): Promise<void> {
    await api.post('/auth/reset-password', data);
  },
}; 