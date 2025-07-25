// Common API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Auth types
export interface LoginRequest {
  id: string;
  email: string;
  name: string;
  picture: string;
  token: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  name: string;
  role: string;
  picture: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Product types (based on your existing components)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
} 